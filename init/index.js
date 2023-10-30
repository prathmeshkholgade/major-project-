const mongoose = require("mongoose");
const intdata = require("./data.js");
const listing = require("../models/listing.js");
const initdata2 = require("./data2.js")
// const initdata3 = require("/data3.js");
const data3 = require("./data3.js");
// const Listing = require("../models/listing");

const mongoUlr='mongodb://127.0.0.1:27017/worderlust';
 main().then(()=>{
    console.log("connected to db")
 }).catch((err)=>{
    console.log("err")
 })
async function main(){
   await mongoose.connect(mongoUlr)
}
// const newdata = async ()=>{
//    await listing.deleteMany({});
//    data3.data= intdata.data.map((obj)=>({...obj,owner:"653226250ff5082de47ddaf8"}))
// //      await listing.insertMany(intdata.data);
//    await listing.insertMany(data3.data);

//    console.log("data was initialized")
// }
// newdata()
const initDb = async ()=>{
     await listing.deleteMany({});
   intdata.data= intdata.data.map((obj)=>({...obj,owner:"653226250ff5082de47ddaf8"}))
     await listing.insertMany(intdata.data);
     console.log("data was initialized")

};
initDb()

// const initdb2 = async ()=>{
   
//    await listing.insertMany(initdata2.data2);
//    console.log("data 2 is succesful initilized and old deleted")
// }
 
// const dlt = async ()=>{
//    let res =await listing.deleteOne({_id:"651e84845934e03259e7d7ef"});
//    console.log(res)
//    console.log("deleted")
// }
// dlt()