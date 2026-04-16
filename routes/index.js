var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});


router.post('/home', function (req, res, next){
  const { email, password } = req.body;

  res.render('home');
});

router.get('/fichas', function (req,res,next){
  res.render('fichas', {edicao:true});
});

router.get('/treinosEdicao', function (req,res,next){
  res.render('treinosEdicao');
});

router.get('/treinosSelecao', function (req,res,next){
  res.render('treinosSelecao');
});

router.get('/visualizarTreino', function (req,res,next){
  res.render('visualizarTreino');
});
module.exports = router;
