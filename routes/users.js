var express = require('express');
var router = express.Router();
// const UsuarioModel = require("../app/models/UsuarioModel");
const LoginController = require("../app/controllers/LoginController")

/* GET users listing. */
router.get('/', async (req, res) => {
  
  // const usuarios = await UsuarioModel.getAll();
  const l = await LoginController.login("leone@teste.com","12345");
  

  // const treinosUsusuario = await UsuarioModel.getAllTreinosUsuario(2)
  // const usuarioEmail = await UsuarioModel.findUserEmail("leone@teste.com","123456")
  
  
  // console.table(treinosUsusuario);
  // console.table(usuarioEmail);
  console.log(l);

  // res.json(treinosUsusuario);
  // res.json(usuarioEmail);

  if (l) {
    res.render('index', {user: l[0] })
    
  } else {
    res.render('index', {user: "erro" })
  }
});

module.exports = router;
