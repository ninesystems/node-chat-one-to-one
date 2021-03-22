var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/whoami', function(req, res, next) {
    let resData = {"message":"Not Authorized", "result":"Error", "status":"401", "data":{}};
    if(req.session.user){
        resData.message = "Welcome "+req.session.user.username;
        resData.data = req.session.user;
        resData.status = "200";
        resData.result = "OK";
        res.json(resData);
    }else{
        res.json(resData)
    }
});
router.get('/login', function(req, res, next) {
    //Render login page from server
    res.render("login");
});
router.post('/login', function(req, res, next) {
    //process login data 
    let resData = {"message":"Not Authorized", "result":"Error", "status":"401", "data":{}};
    let username = req.body.username;
    let passwd = req.body.passwd;
    // right now i am just testing, you can retrieve it from database to check if it exists or not
    if(username && passwd){
        // once authorized, you can save the data in session to start retrieving from React app.
        req.session.user = req.body;
        resData.message = "Welcome "+username;
        resData.status = "200";
        resData.result = "OK";
        res.json(resData);
    }else{
        // if nothing right, you can redirect to server page to login
        res.redirect("/auth/login");
    }
});
router.post('/signup', function(req, res, next) {
    //get signup data & put that into the database
    
});
router.post('/forget', function(req, res, next) {
    //get user data from database, & fire an email
    
});
module.exports = router;