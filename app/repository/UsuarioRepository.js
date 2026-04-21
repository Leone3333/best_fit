// Importa a conexão e a função que inicializa os modelos
const sequelize = require("../database/conection");
const initModels = require('../database/models/init-models');

// Inicializa os modelos para ter acesso às tabelas
const models = initModels(sequelize);

class UsuarioRepository {
    // CREATE - Onde sua TRIGGER de fichas será disparada no banco
    static async create(nome, email, senha) {

        const novoUsuario = await models.usuario.create({
            nome: nome,
            email: email,
            senha: senha
        });

        return novoUsuario;
    };

    // Busca todos usuarios
    static async getAll() {
        const users = await models.usuario.findAll({raw:true});

        return users;
    };

    // Deleta 1 usuario pelo id
    static async delet(idUsuario) {

        const removeUser = await models.usuario.destroy({ where: { idusuario: idUsuario } })

        return removeUser;
    };

    static async findUserEmail(email, senha) {

        const user = await models.usuario.findOne({
            where: {
                email: email,
                senha: senha
            },
            raw:true
        });

        return user;
    };

    // MÉTODO getAllFichasUsuario todas fichas do usuario

    static async getAllFichasUsuario(idUsuario) {

        const fichasUsuario = await models.ficha.findAll({ where: { idusuarioFK: idUsuario },raw:true });

        return fichasUsuario;
    };

    // Todos os treinos do usaurio getAllTreinosUsuario

    static async getAllTreinosUsuario(idUsuario) {

        /*
        const sql = `SELECT 
            f.divisao AS ficha_nome,
            e.nome AS exercicio_nome,
            e.imagem,
            t.idtreino,
            t.serie,
            t.carga,
            t.repeticoes,
            t.status as status_treino
        FROM ficha f
        INNER JOIN treino t ON t.idfichaFK = f.idficha
        INNER JOIN exercicio e ON t.idexercicioFK = e.idexercicio
        WHERE f.idusuarioFK = ?
        ORDER BY f.divisao`;
        */

        // CORREÇÃO: Estrutura de Include Aninhado (Ficha -> Treino -> Exercicio)
        // SOU OBRIGADO escrever o include de forma aninhada
        const treinosUsuario = await models.ficha.findAll({
            attributes: [
                [sequelize.col('divisao'), 'ficha_nome']
            ],
            where: { idusuarioFK: idUsuario },
            include: [{
                model: models.treino,
                as: 'treinos',
                attributes: ['idtreino', 'serie', 'carga', 'repeticoes', ['status', 'status_treino']],
                include: [{
                    model: models.exercicio,
                    as: 'exercicio',
                    attributes: [['nome', 'exercicio_nome'], 'imagem']
                }]
            }],

            order: [['divisao', 'ASC']],
            raw:true
        });

        return treinosUsuario;
    };
};

module.exports = UsuarioRepository;