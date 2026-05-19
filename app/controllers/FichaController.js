const FichaRepository = require("../repository/FichaRepository");
const TreinoRepository = require("../repository/TreinoRepository");

class FichaController {

    static async fichaDados(idFicha) {
        try {
            const ficha = await FichaRepository.getFichaId(idFicha)
            // console.log(ficha)
            return ficha
        } catch (error) {
            console.log("Erro ao buscar ficha repositorio")
            console.log(error)
        }
    }
    static async visualizarFichas(req) {
        try {

            const idUsuario = req.session.usuarioLogado.id;
            let fichas = await FichaRepository.getFichasUser(idUsuario)
            // console.log("Id do usuario: " + idUsuario)
            // console.log(fichas)
            // const resetar = await this.resetForcedFicha(fichas)

            // console.log("Treinos da ficha: " + resetar);
            return fichas

        } catch (error) {
            console.log("Erro na consulta no controller");
            console.log(error);
        };
    };


    // envia todas os treinos de 1 idficha especifico
    static async visualizarTreinosFicha(req, idFicha) {
        const idUsuario = req.session.usuarioLogado.id;
        const fichaTreinos = await FichaRepository.getTreinosFicha(idFicha, idUsuario);

        // console.table("Treinos da ficha: "+ fichaTreinos);

        return fichaTreinos
    };



};

module.exports = FichaController;