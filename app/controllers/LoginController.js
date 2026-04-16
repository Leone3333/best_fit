const UsuarioRepository = require("../repository/UsuarioRepository");

class LoginController {

    static async login(emailPost, senhaPost) {
        try {
            let user = await UsuarioRepository.findUserEmail(emailPost, senhaPost);
            console.log("Consulta realizada " + user.nome);

            if (user) {
             
                return user
            }else{
                return false
            }

        } catch (error) {
            console.log("Erro na consulta");
            console.log(error);
        };

    };
};

module.exports = LoginController;