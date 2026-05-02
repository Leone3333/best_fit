const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const models = initModels(sequelize)

class FichaRepository {
    
    static async getFichaId(idFicha){
        const ficha = await models.ficha.findOne({
            where: {idficha:idFicha},
            raw:true
        })

        return ficha
    }
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
    static async getTreinosFicha(idFicha,idUsuario){
        const trenos = await models.ficha.findAll({
            where:{
                idficha: idFicha,
                idusuarioFK: idUsuario
            },
            include:[{
                model: models.treino,
                as: "treinos",
                attributes: ['idtreino', 'serie', 'carga', 'repeticoes', ['status', 'status_treino']],
                include:[{
                    model: models.exercicio,
                    as: "exercicio",
                    attributes: [['nome', 'exercicio_nome'], 'idexercicio']
                }]
            }],
        })

        return trenos.map(item => item.toJSON());
    }
}

module.exports = FichaRepository;