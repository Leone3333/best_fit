const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const models = initModels(sequelize)

class HistoricoFichaRepository {
    // Ajustado para receber apenas o ID do Usuário e a Divisão da Ficha (A, B ou C)
    static async addHistoricoFicha(idUsuarioFK, divisao) {
        try {
            const newHistoricoFicha = await models.historico_ficha.create({
                idusuarioFK: idUsuarioFK,    
                divisao: divisao,
                data_conclusao: new Date() 
            })
            
            console.log("Histórico de ficha concluída adicionado:", newHistoricoFicha)
            return newHistoricoFicha
        } catch (error) {
            console.log("Erro no repositório de histórico de ficha: " + error)
            throw error // Importante lançar o erro para o controller saber que falhou
        }
    }
}

module.exports = HistoricoFichaRepository