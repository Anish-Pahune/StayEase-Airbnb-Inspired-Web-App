const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utilities/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controller/review.js")

// Create Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createReview))

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync (reviewController.deleteReview))

module.exports = router;