const Listing = require("../models/listing")
const mbxGeocoading=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken =process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoading({ accessToken: mapToken });


module.exports.index =async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings })

}

  module.exports.rendernewform=(req, res) => {
    console.log(req.user)
    res.render("./listings/new.ejs")
}



module.exports.showlistings=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"Reviews",
    populate:{path:"author"}})
    .populate("owner");
    if(!listing){
        req.flash("error","listing you are requested dose not exite!")
        res.redirect("/listings")
    }
    console.log(listing)
    res.render("./listings/show.ejs", { listing })

}

module.exports.createListings =async (req, res, next) => {
 let respones=  await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
       
       
   let url =  req.file.path;
   let filename = req.file.filename;
//    console.log(url,"..",filename)
    const newlisting = new Listing(req.body.listing);
    // console.log(req.user)
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry =respones.body.features[0].geometry;

  let savedlisting= await newlisting.save();
  console.log(savedlisting)
    req.flash( "success","new listing created")
    res.redirect("/listings");

}

module.exports.editForm=async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you are requested dose not exite!")
        res.redirect("/listings")
    }
     let originalurl=listing.image.url;
    originalurl= originalurl.replace("/upload","/upload/w_250")

    req.flash( "success","listing edited")
    res.render("./listings/edit.ejs", { listing ,originalurl})
}

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
     let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
     
     if(typeof req.file !== "undefined"){
   let url =  req.file.path;
   let filename = req.file.filename;
   listing.image={url,filename}
   await listing.save();
}
    req.flash( "success","listing updated")
    res.redirect(`/listings/${id}`)
}

module.exports.destoryListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash( "success","listing deleted")
    res.redirect("/listings")
};
