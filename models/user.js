const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
});
userSchema.plugin(passportLocalMongoose); // automatical creates salting hashing  username and password and also some methods

module.exports = mongoose.model("user",userSchema);