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

/* GET 'Location info' page */
module.exports.locationInfo = function (req, res) {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: 'is on Loc8r because EU QUERO',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please fuck yourself.'
        },
        location: {
            name: 'Starcups',
            address: '125 Descubra Street, Reading, RG6 1PS',
            rating: 4,
            facilities: [
                'Lolzinho',
                'Food',
                'PC MONSTRO'
            ],
            coords: {
                lat: -23.6530225,
                lng: -46.6041381
            },
            openingTimes: [
                {
                    days: 'Monday - Friday',
                    opening: '7:00am',
                    closing: '7:00pm',
                    closed: false
                },
                {
                    days: 'Saturday',
                    opening: '8:00am',
                    closing: '5:00pm',
                    closed: false
                },
                {
                    days: 'Sunday',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Descubra',
                    rating: 5,
                    timestamp: '25 December 2016',
                    reviewText: "Quem deveria estar fazendo isso não é o Soap?"
                },
                {
                    author: 'Grande Cervo',
                    rating: 3,
                    timestamp: '24 Descubra 1900',
                    reviewText: "Découvrez"
                }
            ]
        }
    });
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