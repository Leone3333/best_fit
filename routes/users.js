var express = require('express');
var router = express.Router();
const UsuarioRepositiry = require("../app/repository/UsuarioRepository");
const LoginController = require("../app/controllers/LoginController")

/* GET users listing. */
router.get('/', async (req, res) => {
  
  // const usuarios = await UsuarioModel.getAll();

  let l = false;
  try{
    l = await LoginController.login("adm@gmail.com","adm123");
  }catch(error){
    console.log("Erro controller")
  }
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
