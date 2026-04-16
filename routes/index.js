var express = require('express');
var router = express.Router();
const LoginController = require("../app/controllers/LoginController")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { user: null });
});


router.post('/home', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await LoginController.login(email, password);
    console.log(user);

    if (user) {
      req.session.usuarioLogado = {
        id: user.idusuario,
        nome: user.nome,
      };
  
      res.render('home', { user: user[0] })
  
    } else {
      res.render('login', { user: "error" })
    }
    
  } catch (error) {
    console.log("Erro controller")
  }

});

router.get('/fichas', function (req, res, next) {
  res.render('fichas', { edicao: true });
});

router.get('/treinosEdicao', function (req, res, next) {
  res.render('treinosEdicao');
});

router.get('/treinosSelecao', function (req, res, next) {
  res.render('treinosSelecao');
});

router.get('/visualizarTreino', function (req, res, next) {
  res.render('visualizarTreino');
});
module.exports = router;
