const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const repositoryHistorico = require('../repository/HistoricoTreinoRepository')

const models = initModels(sequelize)

class TreinoRepository {
    static async getTreino(idTreino, idFicha) {
        const treino = await models.treino.findOne({
            where: { idtreino: idTreino, idfichaFK: idFicha },
        
            include:[{
                model:models.exercicio,
                as:'exercicio',
                attributes: [['nome', 'exercicio_nome'],['imagem','imagem_exercicio']]
            }],
            raw:true,nest:true
        })

        return treino 
    }

    static async addTreino(idExercicio,serie,repeticao,carga,idficha) {
        
        try{

            const newTreino = await models.treino.create({
                idexercicioFK:idExercicio,
                serie:serie,
                repeticoes:repeticao,
                carga:carga,
                status:0,
                idfichaFK:idficha
            })
            return newTreino
        }catch(error){
            console.log("Erro no repositorio treino " + error)
        }
            
    }

    static async updateTreino(idExercicio,serie,repeticao,carga,idTreino) {
        const treino = await models.treino.update(
            {
                idexercicioFK:idExercicio,
                serie:serie,
                repeticoes:repeticao,
                carga:carga
            },
            {
                where:{idtreino:idTreino}
            }
        )

        return treino
    }   

    static async removeTreino(idTreino) {
        const removeTreino = await models.treino.destroy({where: {idtreino:idTreino}})

        return removeTreino
    }   

    static async getExerciciosFicha(idFicha){
        const exercicios = await models.treino.findAll({
            where: { idfichaFK: idFicha, },
            include:[{
                model:models.exercicio,
                as:'exercicio',
                attributes: ['idexercicio',['nome', 'exercicio_nome'],['imagem','imagem_exercicio']]
            }],
            raw:true,
            nest:true
        })

        return exercicios.map(item => item.exercicio)
    }

    static async updateStatusTreino(idTreino,idUsuarioFK){
        const newStatusTreino = await models.treino.update({
            status: 1
        }, 
        {
            where:{idtreino:idTreino}
        }
        )

        return newStatusTreino
    }
}

module.exports = TreinoRepository