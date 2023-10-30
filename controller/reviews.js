const Listing = require("../models/listing");
const review= require("../models/Review");

module.exports.createReview =async (req, res) => {
    console.log(req.params.id)
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review)
     newReview.author=req.user._id;
    listing.Reviews.push(newReview)

    await newReview.save()
    await listing.save()
    req.flash( "success"," new review created")
    res.redirect(`/listings/${listing._id}`)

}
module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash( "success"," review deleted  ")
    res.redirect(`/listings/${id}`)

}