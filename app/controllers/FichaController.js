const FichaRepository = require("../repository/FichaRepository");

class FichaController {

    static async fichaDados(idFicha){
        try{
            const ficha = await FichaRepository.getFichaId(idFicha)
            // console.log(ficha)
            return ficha
        }catch(error){
            console.log("Erro ao buscar ficha repositorio")
            console.log(error)
        }
    }
    static async visualizarFichas(req) {
        try {

            const idUsuario = req.session.usuarioLogado.id;
            let fichas = await FichaRepository.getFichasUser(idUsuario)

            let treinosFicha = await this.resetForcedFicha(fichas)

            // console.table(fichas);

            return fichas

        } catch (error) {
            console.log("Erro na consulta");
            console.log(error);
        };
    };

    static async resetForcedFicha(fichas) {
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
                await FichaRepository.updateStatusficha(ficha.idficha, 0);
            }
        }
        return fichasConcluidas;
    };


    static async visualizarTreinosFicha(req,idFicha) {
        const idUsuario = req.session.usuarioLogado.id;
        const fichaTreinos = await FichaRepository.getTreinosFicha(idFicha, idUsuario);

        // console.table(fichaTreinos[0].treinos);

        return fichaTreinos
    };


    static async checkFinishedFicha(idFicha) {
        const treinos = await FichaRepository.getTreinosFicha(idFicha);

        // Verifica se TODOS os treinos possuem status != 0
        const todosTreinosFeitos = treinos.every(t => t.status_treino != 0);

        if (todosTreinosFeitos) {
            await fichaRepository.updateStatusficha(idFicha, 1);
            return true;
        }
        return false;
    };
};

module.exports = FichaController;