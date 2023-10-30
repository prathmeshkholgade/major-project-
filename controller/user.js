const user = require("../models/user")
module.exports.signuprenderform=(req, res) => {
    res.render("users/signup.ejs")
}
module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const registerdUser = await user.register(newUser, password);
        console.log(registerdUser)
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", "welcome to wonderlust");
            res.redirect("/listings")
        })

    } catch (e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }


}

//login form
module.exports.renderloginform=(req, res) => {
    res.render("users/login.ejs")
};


module.exports.login=
async (req, res) => {
    req.flash("success", "welcome back to wonderlust");
    let redirectURl= res.locals.redirectUrl || "/listings";
    res.redirect( redirectURl)
}

module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", " you are logged in")
        res.redirect("/listings")
    })
}