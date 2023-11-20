if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

// console.log(process.env.API)
// console.log(process.env.KEY)
const Listing = require("./models/listing")
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const expressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport")
const localStrategy = require("passport-local");
const user = require("./models/user.js");

const wrapAsync = require("./utils/wrapAsync.js");
const  {validatelisting}  = require("./middleware.js")
// const { listingSchema , reviewSchema} = require("./schema.js");
// const review = require("./models/Review.js");


const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const userRoutes = require("./routes/user.js")


const dbURL =process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect(dbURL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store =MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24* 3600,
});

store.on("error",()=>{
    console.log("error in mongo store",err)
})

const sessionOptions ={
    store,
    secret:process.env.SECRET, 
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() +7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }

};
// app.get("/", (req, res) => {
//     res.send("hyy i am root")
// })

app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser= req.user;
    next();
});

// app.get("/demouser", async (req,res)=>{
//    let fakeuser = new user({
//     email:"student.js",
//     username:"delta-student"
//    })
//    let fristuser=  await user.register(fakeuser,"prathmesh");
//    res.send(fristuser)
// })


app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)

app.use("/",userRoutes)

// for searcing listings in our website
app.get("/search",wrapAsync( async(req,res)=>{
    let searchFild = req.query.search;
   let allListings = await Listing.find({location:{ $regex:searchFild,$options: 'i'}});
  
    if(allListings.length === 0){
        req.flash("error","listing you are requested dose not exite!")
        res.redirect("/listings")
} else{
    res.render("./listings/index.ejs",{allListings})
}

}))


app.all("*", (req, res, next) => {
    next(new expressError(404, "page not found !"))

})
app.use((err, req, res, next) => {
    let { statuscode = 500, message = "something wrong" } = err;
    res.status(statuscode).render("error.ejs", { err })
    // res.status(statuscode).send(message)

    // res.send("something went wrong bro")
})



app.listen(8080, () => {
    console.log("server is listing to port 8080")
})











