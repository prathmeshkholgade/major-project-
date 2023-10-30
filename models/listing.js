const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./Review.js")

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    

    },
    description:String,
    image:{
        url:String,
        filename:String,
        // type:String,
        // default:"https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        // set:(v) => v===""? "https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" :v,
    },
    price:Number,
    location:String,
    country:String,
    Reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          },
      }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in: listing.Reviews}})
    }
    
})

const Listing = mongoose.model("Listing",listingSchema );
module.exports= Listing;

