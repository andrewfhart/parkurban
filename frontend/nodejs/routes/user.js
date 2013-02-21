var schema   = require('../schema');
var auth     = require('../auth');
var util     = require('util');


exports.register_get = function (req, res) {
    res.render('user/register.jade', {
    
    });
};

exports.register_post = function (req, res) {
    var u = new schema.User();
    u.mail = req.body.mail;
    u.password = req.body.password;
    console.log(req.body);
    console.log(util.inspect(u));
    u.save(function (err) {
        if (err)
            res.send(err);
        else
            res.redirect('/login');
    });
};

exports.login_get = function (req, res) {
    if (req.isAuthenticated())
        res.redirect('/search');
    else 
        res.render('user/login.jade',{});
};

/*
exports.login_post = function (req, res) {

    auth.passport.authenticate('local', function(err, user) {
        console.log('Inside exports.login_post, auth.passport.authenticate',err,user);
        if (err) res.end(err);
        if (!user) { return res.redirect('/login') }
        console.log('Redirecting good user to /home');
        return res.redirect('/home');
    })(req,res);

};
*/

