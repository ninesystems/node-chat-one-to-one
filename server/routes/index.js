var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.user = req.session.user;
  console.log(res.locals.user, req.session.user)
  res.render('index', { title: 'Chat App' });
});

router.post('/', function(req, res, next) {
  res.locals.user = req.session.user = req.body.username;
  res.redirect("/")
});

module.exports = router;
