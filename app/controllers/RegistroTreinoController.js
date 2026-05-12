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

            return registrarTreino
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }
    }
}

module.exports = RegistroTreinoController;