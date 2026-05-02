const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const models = initModels(sequelize)

class ExercicioRepository {
 
 // retorna todos os exercicios
    static async getExercicios(){
        const fichas = await models.exercicio.findAll({raw:true})

        return fichas
    }
}

module.exports = ExercicioRepository