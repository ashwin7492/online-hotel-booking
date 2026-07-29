const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("user/signup.ejs")
};

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", " User registered and logged in successfully");
            res.redirect('/listings');
        })

    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.loginFn = async (req, res) => {
    redirectedUrl = res.locals.redirectUrl || "/listings";
    req.flash("success", `Hi  ${req.user.username} welcome Back!`);
    res.redirect(redirectedUrl);
};

module.exports.destroyUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect('/listings');
    })
};