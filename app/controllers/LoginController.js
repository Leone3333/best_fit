const UsuarioModel = require("../models/UsuarioModel");

class LoginController {

    static async login(emailPost, senhaPost) {
        try {
            let login = await UsuarioModel.findUserEmail(emailPost, senhaPost);
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
        };

    };
};

module.exports = LoginController;