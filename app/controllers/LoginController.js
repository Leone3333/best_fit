const UsuarioRepositiry = require("../repository/UsuarioRepository");

class LoginController {

    static async login(emailPost, senhaPost) {
        try {
            let login = await UsuarioRepositiry.findUserEmail(emailPost, senhaPost);
            console.log("Consulta realizada");

            let session = false;

            if (login.length > 0) {
                session = true;
            }

            if (session) {
                return login;
            }else{
                return session;
            }
        } catch (error) {
            console.log("Erro na consulta");
            console.log(error);
        };

    };
};

module.exports = LoginController;