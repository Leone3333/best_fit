var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const FichaController = require("../app/controllers/FichaController")

router.get('/', auth, async (req, res, next) => {

  const fichas = await FichaController.visualizarFichas(req)

  res.render('fichas', { fichas: fichas, edicao: false });
});

router.get('/edit', auth, async (req, res, next) => {

  const fichas = await FichaController.visualizarFichas(req)

  res.render('fichas', { fichas: fichas, edicao: true });
});

router.get('/treinosSelecao', auth,async (req, res) => {
  const idFichaRecebido = req.query.id; // Aqui está o ID que veio do clique!

  console.log("Ficha:", idFichaRecebido);

  const fichaTreinos = await FichaController.visualizarTreinosFicha(req,idFichaRecebido)
  res.render('treinosSelecao', {fichaTreinos: fichaTreinos});
});


router.get('/treinosEdicao', (req, res) => {
  const idFichaRecebido = req.query.id; // Aqui está o ID que veio do clique!

  console.log("Editar ficha:", idFichaRecebido);

  res.render('treinosEdicao');

});

module.exports = router;