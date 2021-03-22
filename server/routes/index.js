var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.user = req.session.user;
  // serve the react app here..
  res.render('index', { title: 'Chat App' });
});
module.exports = router;
