const FichaRepository = require('../repository/FichaRepository')
const TreinoRepository = require('../repository/TreinoRepository')
const HistoricoTreinoRepository = require('../repository/HistoricoTreinoRepository')
const HistoricoFichaRepository = require('../repository/HistoricoFichaRepository');

class RegistroTreinoController {

    // este método recebe os dados do treino a se registrar e salva no banco
    static async registrarTreino(idTreino, cargaUsada, rep_feitas, idUsuarioFK, idExercicioFK, idFichaFK, serie_feita) {
        try {
            // 1. Salva o exercício no histórico de treinos (Gráficos de barra/linha)
            const registrarTreino = await HistoricoTreinoRepository.addHistoricoTreino(
                cargaUsada,
                rep_feitas,
                idUsuarioFK,
                idExercicioFK,
                idFichaFK,
                serie_feita
            );

            // 2. Seta o status desse exercício específico para concluído (status = 1)
            const concluirTreino = await TreinoRepository.updateStatusTreino(idTreino, idFichaFK, 1);
            console.log("Status do treino individual atualizado:", concluirTreino);

            if (concluirTreino) {
                // 🚀 CORREÇÃO 1: Busca todas as fichas do usuário para mapear o status real da ficha atual
                const fichasUsuarioStatus = await FichaRepository.getFichasUser(idUsuarioFK);
                const dadosFichaAtual = fichasUsuarioStatus.find(f => f.idficha == idFichaFK);

                console.log(`fichas usuario ${fichasUsuarioStatus}`);
                console.log(`Dados da ficha analisada ${dadosFichaAtual}`);

                // 🚀 CORREÇÃO 2: Só entra na lógica se a ficha ainda estiver aberta (status_ficha === 0)
                if (dadosFichaAtual && dadosFichaAtual.status_ficha == 0) {

                    console.log("entrou na ficha")
                    // Verifica se ESSA ação concluiu o último exercício que faltava para a ficha
                    let verificaTreinosConcluidos = await this.checkFinishedFicha(idFichaFK, idUsuarioFK);

                    if (verificaTreinosConcluidos) {
                        // Seta o status da ficha para concluída (status_ficha = 1)
                        await this.concluirFicha(idFichaFK);

                        try {
                            // Busca os dados da ficha para extrair a divisão (A, B, C)
                            const dadosFicha = await FichaRepository.getTreinosFicha(idFichaFK, idUsuarioFK);
                            if (dadosFicha && dadosFicha.length > 0) {
                                const divisaoFicha = dadosFicha[0].divisao;

                                // Registra o carimbo na tabela do gráfico de pizza
                                await HistoricoFichaRepository.addHistoricoFicha(idUsuarioFK, divisaoFicha);
                                console.log(`Histórico de conclusão da Ficha ${divisaoFicha} gerado com sucesso.`);
                            }
                        } catch (histError) {
                            console.log("Falhou ao gravar o histórico de pizza: ", histError);
                        }
                    } else {
                        console.log("Treino registrado, mas ainda restam exercícios pendentes nesta ficha.");
                    }
                } else {
                    console.log("Treino registrado. A ficha mãe já estava concluída neste ciclo, ignorando duplo histórico.");
                }

                // 3. Verifica se o ciclo completo ABC fechou e realiza o reset forçado se necessário
                let fichasParaReset = await FichaRepository.getFichasUser(idUsuarioFK);
                let resetFichas = await this.checkResetForcedFichas(fichasParaReset, idUsuarioFK);
                console.log("Ciclo de fichas resetado? " + resetFichas);
            }

            return registrarTreino;
        } catch (error) {
            console.log("Erro no controller Historico treino: " + error);
            throw error; // Propaga o erro para não mascarar falhas críticas na resposta HTTP
        }
    }

    // verifica se todos treinos da ficha são 1 se sim seta o status da ficha para 1
    static async checkFinishedFicha(idFicha, idUsuario) {
        const fichaTreinos = await FichaRepository.getTreinosFicha(idFicha, idUsuario);

        if (fichaTreinos.length === 0) return false;

        const todosTreinosFeitos = fichaTreinos[0].treino.every(t => t.status_treino != 0);
        // Nota: use .get('status_treino') se for um objeto do Sequelize ou apenas t.status_treino se for JSON puro

        if (todosTreinosFeitos) {
            return true;
        }
        return false;
    };

    static async concluirFicha(idFicha) {
        let fichaConcluida = await FichaRepository.updateStatusficha(idFicha, 1);
        return fichaConcluida;
    }


    // reseta todas as fichas para 0 caso todas tenha status 1 irei adicionar os treinos tambem
    static async checkResetForcedFichas(fichas, idUsuarioFK) {

        let fichasConcluidas = true;

        for (let ficha of fichas) {
            if (ficha.status_ficha == 0) {
                fichasConcluidas = false;
                console.log(ficha + "teste fichas")
                break;
            }
        }

        if (fichasConcluidas && fichas.length > 0) {
            console.log("Ciclo completo! Resetando fichas...");
            for (let ficha of fichas) {
                let treinosFicha = await FichaRepository.getTreinosFicha(ficha.idficha, idUsuarioFK);
                console.log("Treinos ficha para atualizar: ", treinosFicha[0])

                for (let treino of treinosFicha[0].treino) {
                    await TreinoRepository.updateStatusTreino(treino.idtreino, idUsuarioFK, 0)
                    console.log("Treino encontrado", treino)
                }
                await FichaRepository.updateStatusficha(ficha.idficha, 0);
            }
        }
        return fichasConcluidas;
    };
}

module.exports = RegistroTreinoController;