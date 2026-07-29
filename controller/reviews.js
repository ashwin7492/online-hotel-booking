const Review = require("../models/review");
const Listing = require("../models/listing");


module.exports.createReview = async (req, res) => {

    let list = await Listing.findById(req.params.id);
    console.log(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview.author);
    await newReview.save();

    list.reviews.push(newReview);

    await list.save();
    req.flash("success", "Review added successfully");

    res.redirect(`/listings/${list._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // pull operator to remove object from the array
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", " Review Deleted successfully");
    res.redirect(`/listings/${id}`);
};