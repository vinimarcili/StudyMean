/* GET 'home' page */
module.exports.homeList = function (req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar :   "Looking for wifi and a seat? " +
                    "Loc8r helps you find places to work when out and about. " +
                    "Perhaps with coffee, cake or a pint? " +
                    "Let Loc8r help you find place you're looking for.",
        locations: [
            {
                name: 'Starcups',
                address: '125 DESCUBRA, Reading, RG6 1PS',
                rating: 3,
                facilities: [
                    'Lolzinho',
                    'Food',
                    'PC MONSTRO'
                ],
                distance: '100m'
            },
            {
                name: 'Cafe Hero',
                address: 'Próximo ao MIM ACHER',
                rating: 5,
                facilities: [
                    'Hot Drinks',
                    'Didico',
                    'Premium Wifi'
                ],
                distance: '200m'
            },
            {
                name: 'Burger Queen',
                address: 'Casa do caralho',
                rating: 2,
                facilities: [
                    'Hot Drinks',
                    'Didico'
                ],
                distance: '250m'
            }
        ]
    });
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
    res.render('locations-review-form', {title: 'Add review'});
};