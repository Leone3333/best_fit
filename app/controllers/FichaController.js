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
            console.log(fichas)
            const resetar = await this.resetForcedFicha(fichas)

            console.log("Treinos da ficha: " + resetar);
            return fichas

        } catch (error) {
            console.log("Erro na consulta no controller");
            console.log(error);
        };
    };

    // reseta todas as fichas para 0 caso todas tenha status 1 irei adicionar os treinos tambem
    static async resetForcedFicha(fichas) {
        
    
        /*
        let fichasConcluidas = true;

        for (let ficha of fichas) {
            if (ficha.status_ficha == 0) {
                fichasConcluidas = false;
                break;
            }
        }

        if (fichasConcluidas && fichas.length > 0) {
            console.log("Ciclo completo! Resetando fichas...");
            for (let ficha of fichas) {
                // for()
                await FichaRepository.updateStatusficha(ficha.idficha, 0);
            }
        }
        return fichasConcluidas;
        */
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