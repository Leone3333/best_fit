const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const models = initModels(sequelize)

class HistoricoTreinoRepository{
    static async addHistoricoTreino(cargaUsada,rep_feitas,idUsuarioFK,idExercicioFK,idFichaFK,serie_feita) {
        
        try{
            const newHistoricoTreino = await models.historico_treino.create({
                carga_usada:cargaUsada,
                rep_feitas:rep_feitas,
                data_conclusao: new Date(),
                idusuarioFK:idUsuarioFK,    
                idexercicioFK:idExercicioFK,
                idfichaFK:idFichaFK,
                serie_feita:serie_feita
            })
            console.log("historico adicionado")
            return newHistoricoTreino
        }catch(error){
            console.log("Erro no repositorio treino " + error)
        }
            
    }

}

module.exports = HistoricoTreinoRepository