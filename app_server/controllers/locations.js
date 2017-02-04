var request = require('request'),
    apiOptions = {
        server: "http://localhost:3000"
    };

    if(process.env.NODE_ENV === 'production'){
        apiOptions.server = "https://loc8r-vini.herokuapp.com/";
    }

/* Verify if is Number */
var _isNumeric = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

/* Format distance */
var _formatDistance = function(distance){
    var numDistance,
        unit;

    if (distance && _isNumeric(distance)) {
        if (distance > 1) {
            numDistance = parseFloat(distance).toFixed(1);
            unit = 'km';
        } else {
            numDistance = parseInt(distance * 1000, 10);
            unit = 'm';
        }
        return numDistance + unit;
    } else {
        return "?";
    }
};

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
var renderHomepage = function(req, res, responseBody){
    var message;
    if(!(responseBody instanceof Array)){
        message = "API lookup error";
        responseBody = [];
    } else {
        if(!responseBody.length){
            message = "Não há lugares próximos :/";
        }
    }

    res.render('locations-list', {
        title: 'Loc8r - DESCUBRA um Wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar :   "Looking for wifi and a seat? " +
        "Loc8r helps you find places to work when out and about. " +
        "Perhaps with coffee, cake or a pint? " +
        "Let Loc8r help you find place you're looking for.",
        locations: responseBody,
        message: message
    });
};

/* GET 'home' page */
module.exports.homeList = function (req, res) {
    var requestOptions,
        path;

    path = '/api/locations';

    requestOptions = {
        url     : apiOptions.server + path,
        method  : "GET",
        json    : {},
        qs      : {
                    lng         : -46.5781567,
                    lat         : -23.6176051,
                    maxDistance : 20
                }
    };

    request(
        requestOptions,
        function(err, response, body) {
            var i,
                data = body;

            if(response.statusCode === 200 && data.length) {
                for (i = 0; i < data.length; i++) {
                    data[i].distance = _formatDistance(data[i].distance);
                }
            }

            renderHomepage(req, res, data);
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
            var data= body;

            if(response.statusCode == 200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };

                renderDetailPage(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* GET 'home' page */
module.exports.addReview = function (req, res) {
    res.render('locations-review-form', {
        title: 'Review Starcups on Loc8r',
        pageHeader: {
            title: 'Review Starcups'
        }
    });
};