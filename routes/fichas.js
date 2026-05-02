var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const FichaController = require("../app/controllers/FichaController")
const TreinoController = require("../app/controllers/TreinoController")

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


router.get('/treinosEdicao',auth,async (req, res) => {
  const idFichaRecebido = req.query.id; // Aqui está o ID que veio do clique!
  
  const fichaTreinos = await FichaController.visualizarTreinosFicha(req,idFichaRecebido)
  const exercicios = await TreinoController.getExercicios()

  // console.log("Editar ficha:", idFichaRecebido);
  // console.log("Ficha treinos:", fichaTreinos[0].treinos);
  console.log("Exercicios da ficha:", exercicios);

  res.render('treinosEdicao', {fichaTreinos: fichaTreinos, exercicios:exercicios});

});

module.exports = router;