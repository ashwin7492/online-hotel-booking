const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLogin,
  isReviewOwner,
  validateReview,
} = require("../utils/middleware.js");
const reviewController = require("../controller/reviews.js");

// Review routes
// post reoute
router
  .route("/")
  .post(isLogin, validateReview, wrapAsync(reviewController.createReview));

// delete review route
router
  .route("/:reviewId")
  .delete(isLogin, isReviewOwner, wrapAsync(reviewController.destroyReview));

module.exports = router;

// * note -> const router = express.Router(mergeParams = true); is compulsory as mergeParams uses to pass params which left in app.js
