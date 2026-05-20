const sequelize = require('../database/conection')
const initModels = require("../database/models/init-models")

const models = initModels(sequelize)

class DashboardRepository {

    // Busca todos os anos e meses que o usuário tem treinos registrados (para os Selects)
    static async getFiltrosDisponiveis(idUsuario) {
        return await models.vw_dashboard_tonelagem.findAll({
            attributes: ['ano', 'mes'], // Selecionamos apenas o ano e o mês
            where: { idusuarioFK: idUsuario },
            group: ['ano', 'mes'], // O 'group' junta tudo o que for igual, eliminando duplicatas!
            order: [
                ['ano', 'DESC'],
                ['mes', 'DESC']
            ],
            raw: true
        });
    }

    // Traz apenas a tonelagem do mês e ano selecionados
    static async getTonelagemPorMesAno(idUsuario, ano, mes) {
        return await models.vw_dashboard_tonelagem.findOne({
            where: {
                idusuarioFK: idUsuario,
                ano: ano,
                mes: mes
            },
            raw: true
        });
    }


}

module.exports = DashboardRepository;
