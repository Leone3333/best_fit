var express = require('express');
var router = express.Router();
const UsuarioModel = require("../app/models/UsuarioModel");


/* GET users listing. */
router.get('/', async (req, res) => {
  
  // const usuarios = await UsuarioModel.getAll();
  
  const treinosUsusuario = await UsuarioModel.getAllTreinosUsuario(2)

  console.log("--- RESULTADO DO GETALL ---");
  console.table(treinosUsusuario);

  res.json(treinosUsusuario);
});

module.exports = router;
