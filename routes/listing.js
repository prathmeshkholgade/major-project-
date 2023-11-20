const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isowner,validatelisting} =require("../middleware.js")
const listingscontrol = require("../controller/listings.js");

const multer  = require('multer');
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage});

router
.route("/")
.get(wrapAsync(listingscontrol.index)) // index route
.post(
 isloggedIn,
  
  upload.single('listing[image]'),
  validatelisting,
    wrapAsync(listingscontrol.createListings));// create route

// .post( upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file)
// })
// new route
router.get("/new",isloggedIn,listingscontrol.rendernewform );

router.route("/:id")
.get( wrapAsync(listingscontrol.showlistings))// show route
.put( 
    isloggedIn,
    isowner,
    upload.single('listing[image]'),
    validatelisting,
     wrapAsync(listingscontrol.updateListing))// update route


.delete(isloggedIn,isowner, wrapAsync(listingscontrol.destoryListing))


    // edit route
router.get("/:id/edit",isloggedIn,isowner, wrapAsync(listingscontrol.editForm));


    module.exports= router