// middlewares/auth.js
function verificarAutenticacao(req, res, next) {
  if (req.session.usuarioLogado) {
    // Se a sessão existe, o "próximo" (next) da rota é executado
    return next();
  }

  // Se não existir, limpa qualquer vestígio e volta para o login
  res.clearCookie('connect.sid');
  res.redirect('/');
}
module.exports = verificarAutenticacao;