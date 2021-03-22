var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/whoami', function(req, res, next) {
    if(req.session.user){
        res.json(req.session.user);
    }else{
        res.json({"message":"Not Authorized", "result":"Error", "status":"401"})
    }
});

router.post('/login', function(req, res, next) {
    //get login data 

});
router.post('/signup', function(req, res, next) {
    //get login data 
    
});
router.post('/forget', function(req, res, next) {
    //get login data 
    
});
module.exports = router;