const TreinoRepository = require('../repository/TreinoRepository')

class TreinoController {

    static async exerciciosFicha(idFicha){
        try{
            const exercicios = TreinoRepository.getExerciciosFicha(idFicha)

            console.log(exercicios);

            return exercicios
        }catch(error){
            console.log("Erro na consulta em treino repositorio");
            console.log(error);
        }
    }
}

module.exports = TreinoController