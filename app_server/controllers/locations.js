var request = require('request'),
    apiOptions = {
        server: "http://localhost:3000"
    };

    if(process.env.NODE_ENV === 'production'){
        apiOptions.server = "https://loc8r-vini.herokuapp.com/";
    }

/* Errors */
var _showError = function(req, res, status){
    var title,
        content;

    if(status === 404){
        title = "404, página não encontrada";
        content = "Parece que não encontramos o que você queria :/";
    } else {
        title = status + ", deu ruim";
        content = "DESCUBRA";
    }
    res.status(status);
    res.render('generic-text',{
       title: title,
       content: content
    });
};

/* render 'home' page */
var renderHomepage = function(req, res){
    res.render('locations-list', {
        title: 'Loc8r - DESCUBRA um Wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar :   "Looking for wifi and a seat? " +
        "Loc8r helps you find places to work when out and about. " +
        "Perhaps with coffee, cake or a pint? " +
        "Let Loc8r help you find place you're looking for."
    });
};

/* GET 'home' page */
module.exports.homeList = function (req, res) {
    renderHomepage(req, res);
};

/* GET to general location info */
var getLocationInfo = function(req, res, callback){
    var requestOptions,
        path;

        path = "/api/locations/" + req.params.locationid;

    requestOptions = {
        url     : apiOptions.server + path,
        method  : "GET",
        json    : {}
    };

    request(
        requestOptions,
        function(err, response, body){
            var data = body;
            if(response.statusCode === 200){
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* render 'Location info' page */
var renderDetailPage = function(req, res, locDetail){
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: 'is on Loc8r because EU QUERO',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please fuck yourself.'
        },
        location: locDetail
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = function (req, res) {

    getLocationInfo(req, res, function(req, res, responseData){
        renderDetailPage(req, res, responseData);
    });

};

/* render 'new review' page */
var renderReviewForm = function(req, res, locDetail){
    res.render('locations-review-form', {
        title: 'Review' + locDetail.name + ' on Loc8r',
        pageHeader: {
            title: 'Review ' + locDetail.name
        },
        error: req.query.err,
        url: req.originalUrl
    });
};

/* GET 'new review' page */
module.exports.addReview = function (req, res) {

    getLocationInfo(req, res, function(req, res, responseData){
        renderReviewForm(req, res, responseData);
    });

};

/* POST 'new review' page */
module.exports.doAddReview = function (req, res) {
    var requestOptions,
        path,
        locationid,
        postdata;

    locationid = req.params.locationid;

    path = "/api/locations/" + locationid + "/reviews";

    postdata = {
        author      : req.body.name,
        rating      : parseInt(req.body.rating, 10),
        reviewText  : req.body.review
    };

    requestOptions = {
        url     : apiOptions.server + path,
        method  : "POST",
        json    :   postdata
    };

    if(!postdata.author || !postdata.rating || !postdata.reviewText){
        res.redirect('/location/' + locationid + '/reviews/new?err=val');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/location/' + locationid);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/location/' + locationid + "/reviews/new?err=val");
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};