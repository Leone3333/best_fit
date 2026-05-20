const DashboardRepository = require("../repository/DashboardRepository");

class DashboardController {
    static async dashboardOpcoesfiltro(idUsuario) {
        // const idUsuario = req.session.usuarioLogado.id;

        

        try {
            
            return await DashboardRepository.getFiltrosDisponiveis(idUsuario);

        } catch (error) {
            console.error(error);
            return []
        }

    }

    static async getTonelagemMesAno(idUsuario,mesAno) {
        const dadosTonelagem = await DashboardRepository.getTonelagemPorMesAno(idUsuario, anoSelecionado, mesSelecionado);

    }
}

module.exports = DashboardController;