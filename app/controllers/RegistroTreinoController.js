const FichaRepository = require('../repository/FichaRepository')
const TreinoRepository = require('../repository/TreinoRepository')
const HistoricoTreinoRepository = require('../repository/HistoricoTreinoRepository')

class RegistroTreinoController {

    // este método recebe os dados do treino a se registrar e salva no banco
    static async registrarTreino(idTreino, cargaUsada, rep_feitas, idUsuarioFK, idExercicioFK, idFichaFK, serie_feita) {
        // console.log("chegou controller")
        try {
            const registrarTreino = await HistoricoTreinoRepository.addHistoricoTreino(cargaUsada,
                rep_feitas,
                idUsuarioFK,
                idExercicioFK,
                idFichaFK,
                serie_feita
            )

            const concluirTreino = await TreinoRepository.updateStatusTreino(idTreino, idFichaFK, 1)

            console.log(concluirTreino)
            // verifica se todos os treinos de 1 ficha foram concluidos e seta a ficha para concluida se for o caso

            if (concluirTreino) {
                let verificaTreinosConcluidos = await this.checkFinishedFicha(idFichaFK, idUsuarioFK)
                if (verificaTreinosConcluidos) {
                    await this.concluirFicha(idFichaFK)
                }

                let fichasUsuario = await FichaRepository.getFichasUser(idUsuarioFK)
                let resetFichas = await this.checkResetForcedFichas(fichasUsuario, idUsuarioFK)
                console.log("Fichas resetadas? " + resetFichas)
            }

            return registrarTreino
        } catch (error) {
            console.log("Erro no controller Historico treino: " + error)
        }
    }

    // verifica se todos treinos da ficha são 1 se sim seta o status da ficha para 1
    static async checkFinishedFicha(idFicha, idUsuario) {
        const fichaTreinos = await FichaRepository.getTreinosFicha(idFicha, idUsuario);

        if (fichaTreinos.length === 0) return false;

        const todosTreinosFeitos = fichaTreinos[0].treinos.every(t => t.status_treino != 0);
        // Nota: use .get('status_treino') se for um objeto do Sequelize ou apenas t.status_treino se for JSON puro

        if (todosTreinosFeitos) {
            return true;
        }
        return false;
    };

    static async concluirFicha(idFicha) {
        let fichaConcluida = await FichaRepository.updateStatusficha(idFicha, 1);
        return fichaConcluida;
    }


    // reseta todas as fichas para 0 caso todas tenha status 1 irei adicionar os treinos tambem
    static async checkResetForcedFichas(fichas, idUsuarioFK) {

        let fichasConcluidas = true;

        for (let ficha of fichas) {
            if (ficha.status_ficha == 0) {
                fichasConcluidas = false;
                console.log(ficha + "teste fichas")
                break;
            }
        }

        if (fichasConcluidas && fichas.length > 0) {
            console.log("Ciclo completo! Resetando fichas...");
            for (let ficha of fichas) {
                let treinosFicha = await FichaRepository.getTreinosFicha(ficha.idficha, idUsuarioFK);
                console.log("Treinos ficha para atualizar: ", treinosFicha[0])

                for (let treino of treinosFicha[0].treinos) {
                    await TreinoRepository.updateStatusTreino(treino.idtreino, idUsuarioFK, 0)
                    console.log("Treino encontrado", treino)
                }
                await FichaRepository.updateStatusficha(ficha.idficha, 0);
            }
        }
        return fichasConcluidas;    
    };
}

module.exports = RegistroTreinoController;