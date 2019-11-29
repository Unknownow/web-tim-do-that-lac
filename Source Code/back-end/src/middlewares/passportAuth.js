const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: "510271762909351",
    clientSecret: "e04549a74aa911336f373b71e9fcbec8",
    callbackURL: "http://localhost:8002/user/login/facebook/callback",
    profileFields: ["email", "name"]
},
    function (accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name, id } = profile._json;
        const name = first_name + " " + last_name;
        const userData = {
            "id": id,
            "email": email,
            "name": name
        };
        done(null, userData);
    }
));

module.exports = passport;