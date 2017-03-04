var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt'),
    auth = jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
    }),
    ctrlLocations = require('../controllers/locations'),
    ctrlReviews = require('../controllers/reviews'),
    ctrlAuth = require('../controllers/authentication');

/* Locations */
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/location/:locationid', ctrlLocations.locationsDeleteOne);
/* Locations */

/* Reviews */
router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);
/* Reviews */

/* Login */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
/* Login */

module.exports = router;