var express = require('express');
var router = express.Router();
const UsuarioRepositiry = require("../app/repository/UsuarioRepository");
const LoginController = require("../app/controllers/LoginController");

router.get('/1', async (req,res) => {

  // funciona
  // let create = UsuarioRepositiry.create('Manu','manu123@gmail.com','123')
  
  // funciona
  let user = await UsuarioRepositiry.findUserEmail('manu123@gmail.com','123')
  
  // funciona
  let fichasUser = await UsuarioRepositiry.getAllFichasUsuario(4)
  
  // funciona
  let treinosUser = await UsuarioRepositiry.getAllTreinosUsuario(4)
  
  console.log(treinosUser)
  res.render('index', {user: fichasUser })

});
