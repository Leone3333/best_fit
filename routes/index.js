var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const LoginController = require("../app/controllers/LoginController")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { user: null });
});


router.get('/logout', function (req, res, next) {
  // 1. Destrói a sessão no servidor
  req.session.destroy((err) => {
    if (err) {
      console.log("Erro ao destruir sessão:", err);
      return res.redirect('/home'); // Ou para onde desejar em caso de erro
    }
    
    // 2. Limpa o cookie do navegador (Opcional, mas boa prática)
    res.clearCookie('connect.sid'); 

    // 3. Redireciona para a rota de login (A URL vai mudar)
    res.redirect('/'); 
  });
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

      console.log("Sessão criada:", req.session.usuarioLogado);

      req.session.save(() => {

        res.render('home', { usuario: req.session.usuarioLogado });
      })

    } else {
      res.render('login', { user: "error" });
    };

  } catch (error) {
    console.log("Erro controller")
  }

});
router.get('/home', auth, async (req,res,next) => {
    res.render('home', { usuario: req.session.usuarioLogado });
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
