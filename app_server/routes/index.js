var express = require('express'),
    router = express.Router(),
    ctrlLocations = require('../controllers/locations'),
    ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);
/* Locations pages */

/* Other pages */
router.get('/about', ctrlOthers.about);
/* Other pages */

module.exports = router;
