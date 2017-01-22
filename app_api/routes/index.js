var express = require('express'),
    router = express.Router(),
    ctrlLocations = require('../controllers/locations'),
    ctrlReviews = require('../controllers/reviews');

/* Locations */
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/location/:locationid', ctrlLocations.locationsDeleteOne);
/* Locations */

/* Reviews */
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);
/* Reviews */

module.exports = router;