var express = require('express');
var router = express.Router();
const UsuarioModel = require("../app/models/UsuarioModel");


/* GET users listing. */
router.get('/', async (req, res) => {
  
  const usuarios = await UsuarioModel.getAll();
  
  console.log("--- RESULTADO DO GETALL ---");
  console.table(usuarios);

  res.json(usuarios);
});

module.exports = router;
