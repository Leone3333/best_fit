const fichaRepository = require("../repository/FichaRepository");

class FichaController {

    static async visualizarFichas(req) {
        try {

            const idUsuario = req.session.usuarioLogado.id;
            let fichas = await fichaRepository.getFichasUser(idUsuario)

            let treinosFicha = await this.resetForcedFicha(fichas)

            console.table(fichas);
           
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
                await fichaRepository.updateStatusficha(ficha.idficha, 0);
            }
        }
        return fichasConcluidas;
    };

    static async checkFinishedFicha(idFicha) {
        const treinos = await fichaRepository.getTreinosFicha(idFicha);

        // Verifica se TODOS os treinos possuem status != 0
        const todosTreinosFeitos = treinos.every(t => t.status_treino != 0);

        if (todosTreinosFeitos) {
            await fichaRepository.updateStatusficha(idFicha, 1);
            return true;
        }
        return false;
    }
};

module.exports = FichaController;