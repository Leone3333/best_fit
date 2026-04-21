const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const models = initModels(sequelize)

class FichaRepository {

    // retorna todas fichas do usuario
    static async getFichasUser(idUsuario){
        const fichas = await models.ficha.findAll({
            where:{
                idusuarioFK: idUsuario
            },
            raw:true
        })

        return fichas
    }
    
    // atualiza o status 
    static async updateStatusficha(idFicha,newStatusFicha){
        const ficha = await models.ficha.update(
            { status_ficha: newStatusFicha },
            {where: { idficha: idFicha }}
        )

        return ficha
    }
    
    // retorna todos os treinos associados ao idFicha
    static async getTreinosFicha(idFicha){
        const fichas = await models.ficha.findAll({
            where:{
                idficha: idFicha
            },
            include:[{
                model: models.treino,
                as: "treino",
                attributes: ['idtreino', 'serie', 'carga', 'repeticoes', ['status', 'status_treino']],
                include:[{
                    model: models.exercicio,
                    as: "exercicio",
                    attributes: [['nome', 'exercicio_nome']]
                }]
            }],
            raw:true
        })

        return fichas
    }
}

module.exports = FichaRepository;