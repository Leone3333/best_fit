var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const FichaController = require("../app/controllers/FichaController")

router.get('/', auth, async (req, res, next) => {

  const fichas = await FichaController.visualizarFichas(req) 
  
  res.render('fichas', {fichas:fichas, edicao: false });
});

router.get('/edit', auth, async (req, res, next) => {

  const fichas = await FichaController.visualizarFichas(req) 
  
  res.render('fichas', {fichas:fichas, edicao: true });
});

module.exports = router;