var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const LoginController = require("../app/controllers/LoginController")
const DashboardController = require("../app/controllers/DashboardController")

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
    // console.log(user);

    if (user) {
      req.session.usuarioLogado = {
        id: user.idusuario,
        nome: user.nome,
      };

      // console.log("Sessão criada:", req.session.usuarioLogado);

      req.session.save(async () => {
        const dadosFiltro = await DashboardController.dashboardOpcoesfiltro(req.session.usuarioLogado.id);


        // // Pega o que foi selecionado ou define o mês/ano atual como padrão
        const hoje = new Date();
        const anoAtual = parseInt(req.query.ano) || hoje.getFullYear();
        const mesAtual = parseInt(req.query.mes) || (hoje.getMonth() + 1);

        const dadosTonelagem = await DashboardController.getTonelagem(req.session.usuarioLogado.id, anoAtual, mesAtual);
        const dadosFicha = await DashboardController.getTopFichas(req.session.usuarioLogado.id, anoAtual, mesAtual);
        const dadosTreinos = await DashboardController.getTopTreinos(req.session.usuarioLogado.id, anoAtual, mesAtual);

        console.log(`Dados tonelagem: ${dadosTonelagem.tonelagem_total}`)

        if (dadosFicha && dadosFicha.length > 0) {
          // Percorre cada objeto dentro do array de fichas
          dadosFicha.forEach((ficha, index) => {
            console.log(`Ficha [${index + 1}]: Divisão = ${ficha.divisao} | Sessões = ${ficha.sessoes_realizadas}`);
          });
        } else {
          console.log("Nenhum registro de ficha foi retornado para este mês/ano.");
        }
        

        console.log(`=================================`);

        if (dadosTreinos && dadosTreinos.length > 0) {
          // Percorre cada objeto dentro do array de treinos
          dadosTreinos.forEach((treino, index) => {
            console.log(`Treino [${index + 1}]: Exercicio = ${treino.exercicio} | Maior carga = ${treino.maior_carga}`);
          });
        } else {
          console.log("Nenhum registro de ficha foi retornado para este mês/ano.");
        }


        res.render('home', {
          usuario: req.session.usuarioLogado,
          tonelagem: dadosTonelagem ? dadosTonelagem.tonelagem_total : 0,
          anoSelecionado: anoAtual,
          mesSelecionado: mesAtual,
          dadosFiltro
        });
      })

    } else {
      res.render('login', { user: "error" });
    };

  } catch (error) {
    console.log("Erro controller")
  }

});

router.get('/home', auth, async (req, res, next) => {

  const dadosFiltro = await DashboardController.dashboardOpcoesfiltro(req.session.usuarioLogado.id);

  // // Pega o que foi selecionado ou define o mês/ano atual como padrão
  const hoje = new Date();
  const anoAtual = parseInt(req.query.ano) || hoje.getFullYear();
  const mesAtual = parseInt(req.query.mes) || (hoje.getMonth() + 1);

  console.log(dadosFiltro)
  res.render('home', {
    usuario: req.session.usuarioLogado,
    // tonelagem: dadosTonelagem ? dadosTonelagem.tonelagem_total : 0,
    anoSelecionado: anoAtual,
    mesSelecionado: mesAtual,
    dadosFiltro
  });
});


router.get('/home/filtrar', auth, async (req, res, next) => {
  try {
    // Captura os dados enviados pelo onchange
    const anoSelecionado = parseInt(req.query.ano);
    const mesSelecionado = parseInt(req.query.mes);

    console.log(`Filtrando dados para o Ano: ${anoSelecionado} e Mês: ${mesSelecionado}`);

    const dadosFiltro = await DashboardController.dashboardOpcoesfiltro(req.session.usuarioLogado.id);


    // Renderiza a mesma página home, mas passando os dados novos e os anos/meses que foram clicados
    res.render('home', {
      usuario: req.session.usuarioLogado,
      dadosFiltro,
      anoSelecionado, // Devolve para o EJS continuar com o ano certo marcado
      mesSelecionado  // Devolve para o EJS continuar com o mês certo marcado
    });

  } catch (error) {
    console.error("Erro ao filtrar dados da home", error);
    res.redirect('/home'); // Em caso de erro, joga ele de volta para a home padrão
  }
});
// router.get('/treinosEdicao', function (req, res, next) {
//   res.render('treinosEdicao');
// });

// router.get('/treinosSelecao', function (req, res, next) {
//   res.render('treinosSelecao');
// });


module.exports = router;
