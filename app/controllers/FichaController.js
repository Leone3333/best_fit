const fichaRepository = require("../repository/FichaRepository");

class FichaController {

    static async visualizarFichas(req) {
        try {

            const idUsuario = req.session.usuarioLogado.id;
            let fichas = await fichaRepository.getFichasUser(idUsuario)
            
            console.table(fichas);

            return fichas
         
        } catch (error) {
            console.log("Erro na consulta");
            console.log(error);
        };

    };
};

module.exports = FichaController;