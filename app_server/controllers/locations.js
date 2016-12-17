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
                    'Hot Drinks',
                    'Food',
                    'Premium Wifi'
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
    res.render('location-info', {title: 'Location Info'});
};

/* GET 'home' page */
module.exports.addReview = function (req, res) {
    res.render('locations-review-form', {title: 'Add review'});
};