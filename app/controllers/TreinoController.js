const TreinoRepository = require('../repository/TreinoRepository')
const ExercicioRepository = require('../repository/ExercicioRepository')

class TreinoController {

    static async visualizarTreino(idTreino,idFichaFK){

        try {
            const treino = await TreinoRepository.getTreino(idTreino,idFichaFK)
        
            return treino
        } catch (error) {
            console.log("Erro na consulta em treino controller");
            console.log(error);
        }
    }
    static async exerciciosFicha(idFicha) {
        try {
            const exercicios = await TreinoRepository.getExerciciosFicha(idFicha)

            // console.log(exercicios);

            return exercicios
        } catch (error) {
            console.log("Erro na consulta em treino controller");
            console.log(error);
        }
    }

    static async createTreino(idExercicio, serie, repeticao, carga, idficha) {
        try {
            const newTreino = await TreinoRepository.addTreino(idExercicio, serie, repeticao, carga, idficha)

            if (!newTreino) {
                throw new Error("O repositório não retornou os dados do treino criado.");
            }

            console.log("Treino criado com sucesso:", newTreino);

            return newTreino
        } catch (error) {
            console.log("Erro no controller treino: " + error)
            throw error
        }
    }

    static async updateTreino(idExercicio, serie, repeticao, carga, idTreino) {
        try {
            const updateTreino = await TreinoRepository.updateTreino(idExercicio, serie, repeticao, carga, idTreino)

            return updateTreino
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }
    }

    static async deleteTreino(idTreino) {
        try {
            const deleteTreino = await TreinoRepository.removeTreino(idTreino)

            return deleteTreino
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }

    }

    static async getExercicios() {
        try {
            const exercicios = await ExercicioRepository.getExercicios()

            return exercicios
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }
    }

    // este método seta status treino 1
    static async concluirTreino(treino,idUsuarioFK) {
        try {
            const concluir = await TreinoRepository.updateStatusTreino(treino,idUsuarioFK)

            return concluir
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }
    }
    
    // este método recebe os dados do treino a se registrar e salva no banco
    static async registrarTreino(cargaUsada,rep_feitas,idUsuarioFK,idExercicioFK,idFichaFK,serie_feita) {
        try {
            // const concluir = await TreinoRepository.updateStatusTreino(treino,idUsuarioFK)

            // return concluir
        } catch (error) {
            console.log("Erro no controller treino: " + error)
        }
    }

}

module.exports = TreinoController