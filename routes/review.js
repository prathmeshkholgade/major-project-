const express = require("express");
const router = express.Router({ mergeParams: true });
const review = require("../models/Review.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const {validReviews, isloggedIn,isReviewAuthor} = require("../middleware.js");
const reviewControler = require("../controller/reviews.js");

// reviews 
// post review route
router.post("/", isloggedIn ,validReviews, wrapAsync(reviewControler.createReview))

// delete review route
router.delete("/:reviewId",isloggedIn,isReviewAuthor,reviewControler.destroyReview );


module.exports= router