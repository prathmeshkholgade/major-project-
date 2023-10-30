  const Listing = require("./models/listing")
  const expressError = require("./utils/expressError.js");
  const { listingSchema,reviewSchema } = require("./schema.js");
  const Review = require("./models/Review");
  

  
  module.exports.isloggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
      // information redirect url
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","frist you must be logged in")
        return res.redirect("/login")


    }
    next()

  } 
   module.exports.saveRediretUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
   
    }
    next();
   }
   
    module.exports.isowner= async (req,res,next)=>{
      let {id} = req.params;
      let listing = await Listing.findById(id);
      if( !listing.owner.equals(res.locals.curruser._id)){
       req.flash("error","you are not owner of this listing");
      return res.redirect(`/listings/${id}`)
      }
      next()

    }
/// listing validate
  module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new expressError(404, errMsg)
    } else {
        next()
    }
}
//  Review validate
module.exports.validReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",")
      throw new expressError(404, errMsg)
  } else {
      next()
  }
}

// dlt user
module.exports.isReviewAuthor= async (req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if( !review.author.equals(res.locals.curruser._id)){
   req.flash("error","you are not author of this review");
  return res.redirect(`/listings/${id}`)
  }
  next()

}