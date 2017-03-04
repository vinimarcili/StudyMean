var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Loc = mongoose.model('Location');

/* Função para criar uma resposta padrão dos controladores */
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* Função para atutenticação */
var getAuthor = function(req, res, callback){
    if(req.payload && req.payload.email){
        User
            .findOne({
                email: req.payload.email
            })
            .exec(function(err, user){
                if(!user){
                    sendJSONresponse(res, 404, {
                       "message" : "User not found"
                    });
                    return;
                } else if(err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                callback(req, res, user.name);
            })
    } else {
        sendJSONresponse(res, 404, {
           "message" : "User not found"
        });
        return;
    }
};
/* Função para atutenticação */

/* Função para atualizar a média */
var doSetAverageRating = function(location) {
    var i,
        reviewCount,
        ratingAverage,
        ratingTotal;

    if(location.reviews && location.reviews.length > 0){
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for(i = 0; i < reviewCount; i++){
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        location.save(function(err) {
            if(err){
                console.log(err);
            }else{
                console.log("Average rating update to", ratingAverage);
            }
        });
    }
};

/* Função para localizar o documento com a média a ser atualizada */
var updateAverageRating = function(locationid) {
    Loc
        .findById(locationid)
        .select('rating reviews')
        .exec(function(err, location){
            if(!err){
                doSetAverageRating(location);
            }
        });
};

/* Função para adicionar uma nova Review */
var doAddReview = function(req, res, location, author){
    if(!location){
        sendJSONresponse(res, 404, {"message": "locationid not found"});
    }else{
        location.reviews.push({
            author: author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save(function(err, location){
            var thisReview;
            if(err){
                console.log(err);
                sendJSONresponse(res, 400, err);
            }else{
                updateAverageRating(location._id);
                thisReview = location.reviews[location.reviews.length - 1];
                sendJSONresponse(res, 201, thisReview);
            }
        });
    }
};

/* Create */
module.exports.reviewsCreate = function (req, res) {
    getAuthor(req, res, function(req, res, userName){
        var locationid = req.params.locationid;
        if(locationid){
            Loc
                .findById(req.params.locationid)
                .select('reviews')
                .exec(function(err, location) {
                    if(err){
                        sendJSONresponse(res, 400, err);
                    }else{
                        doAddReview(req, res, location);
                    }
                });
        }else{
            sendJSONresponse(res, 404, {"message" : "Not found, locationid required"});
        }
    });
};
/* Create */

/* Read */
module.exports.reviewsReadOne = function (req, res) {
    console.log('Finding location details', req.params);
    if (req.params && req.params.locationid) {
        Loc
            .findById(req.params.locationid)
            .select('name reviews')
            .exec(function(err, location) {
                var response, review;
                if (!location) {
                    sendJSONresponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                }else if (err){
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                if(location.reviews && location.reviews.length > 0){
                    review = location.reviews.id(req.params.reviewid);

                    if(!review){
                        sendJSONresponse(res, 404, {
                            "message" : "reviewid not found"
                        });
                    }else{
                        response = {
                            location : {
                                name: location.name,
                                id: req.params.locationid
                            },
                            review: review
                        };
                        console.log(response);
                        sendJSONresponse(res, 200, response);
                    }
                }else{
                    sendJSONresponse(res, 404, {
                        "message" : "No reviews found"
                    });
                }
            });
    }else{
        sendJSONresponse(res, 404, {
            "message": "Not found, locationid and reviewid are both required"
        });
    }
};
/* Read */

/* Update */
module.exports.reviewsUpdateOne = function (req, res) {
    if(!req.params.locationid || !req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found, locationid and reviewid are both required"});
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(function(err, location){
            var thisReview;
            if(!location){
                sendJSONresponse(res, 404, {"message":"locationid not found"});
                return;
            }else if(err){
                sendJSONresponse(res, 400, err);
                return;
            }
            if(location.reviews && location.reviews.length > 0){
                thisReview = location.reviews.id(req.params.reviewid);
                if(!thisReview){
                    sendJSONresponse(res, 404, {"message":"reviewid not found"});
                }else{
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    location.save(function(err, location){
                        if(err){
                            sendJSONresponse(res, 404, err);
                        }else{
                            updateAverageRating(location._id);
                            sendJSONresponse(res, 200, thisReview);
                        }
                    });
                }
            }else{
                sendJSONresponse(res, 404, {"message":"No review to update"});
            }
        });
};
/* Update */

/* Delete */
module.exports.reviewsDeleteOne = function (req, res) {
    if(!req.params.locationid || !req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found, locationid and reviewid are both required"});
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(function(err, location){
            if(!location){
                sendJSONresponse(res, 404, {"message":"locationid not found"});
                return;
            }else if(err){
                sendJSONresponse(res, 400, err);
                return;
            }
            if(location.reviews && location.reviews.length > 0){
                if(!location.reviews.id(req.params.reviewid)){
                    sendJSONresponse(res, 404, {"message":"reviewid not found"});
                }else{
                    location.reviews.id(req.params.reviewid).remove();
                    location.save(function(err){
                        if(err){
                            sendJSONresponse(res, 404, err);
                        }else{
                            updateAverageRating(location._id);
                            sendJSONresponse(res, 204, null);
                        }
                    });
                }
            }else{
                sendJSONresponse(res, 404, {"message":"No review to delete"});
            }
        });
};
/* Delete */