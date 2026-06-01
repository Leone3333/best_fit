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

    static async getTonelagem(idUsuario,ano,mes) {
        
        try{
            return  await DashboardRepository.getTonelagemPorMesAno(idUsuario, ano, mes);
        }catch(error){
            console.error(`Erro no controller dashboard: ${error}`);
            return [];
        }
    }
    static async getTopFichas(idUsuario,ano,mes) {
        
        try{
            return  await DashboardRepository.getFrequenciaFichaPorMesAno(idUsuario, ano, mes);
        }catch(error){
            console.error(`Erro no controller dashboard: ${error}`);
            return [];
        }
    }
    static async getTopTreinos(idUsuario,ano,mes) {
        
        try{
            return  await DashboardRepository.getTopTreinosPorMesAno(idUsuario, ano, mes);
        }catch(error){
            console.error(`Erro no controller dashboard: ${error}`);
            return [];
        }
    }
}

module.exports = DashboardController;