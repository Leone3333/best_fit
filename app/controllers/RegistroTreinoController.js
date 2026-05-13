const FichaRepository = require('../repository/FichaRepository')
const TreinoRepository = require('../repository/TreinoRepository')
const HistoricoTreinoRepository = require('../repository/HistoricoTreinoRepository')

class RegistroTreinoController {
    
    // este método recebe os dados do treino a se registrar e salva no banco
    static async registrarTreino(idTreino,cargaUsada,rep_feitas,idUsuarioFK,idExercicioFK,idFichaFK,serie_feita) {
        // console.log("chegou controller")
        try {
            const registrarTreino = await HistoricoTreinoRepository.addHistoricoTreino(cargaUsada,
                rep_feitas,
                idUsuarioFK,
                idExercicioFK,
                idFichaFK,
                serie_feita
            )

            const concluirTreino = await TreinoRepository.updateStatusTreino(idTreino,idFichaFK)
            
            if(concluirTreino){
                await this.checkFinishedFicha(idFichaFK,idUsuarioFK)
            }

            return registrarTreino
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }
    }

    // verifica se todos treinos da ficha são 1 se sim seta o status da ficha para 1
    static async checkFinishedFicha(idFicha, idUsuario) {
        const fichaTreinos = await FichaRepository.getTreinosFicha(idFicha, idUsuario);

        // Agora 'treinos' é realmente a lista: [ {status_treino: 1}, {status_treino: 0} ]
        if (fichaTreinos.length === 0) return false;

        const todosTreinosFeitos = fichaTreinos[0].treinos.every(t => t.status_treino != 0);
        // Nota: use .get('status_treino') se for um objeto do Sequelize ou apenas t.status_treino se for JSON puro

        if (todosTreinosFeitos) {
            await FichaRepository.updateStatusficha(idFicha, 1);
            return true;
        }
        return false;
    };
}

module.exports = RegistroTreinoController;