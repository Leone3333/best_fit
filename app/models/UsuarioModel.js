const db = require("../database/conection");


/*CONVEÇÕES
    Usar result para atualizações,deleção ou atualização
    Usar rows para selects
*/

class UsuarioModel {
    // CREATE - Onde sua TRIGGER de fichas será disparada no banco
    static async create(nome, email, senha) {
        
        const sql = "INSERT INTO usuario (nome,email,senha) VALUES (?,?,?)";
        const values = [nome, email, senha]

        const [rows] = await db.execute(sql, values);
        return rows.insertId;
    };

    // Busca todos usuarios
    static async getAll() {
        const sql = "SELECT * FROM usuario"

        const [rows] = await db.execute(sql);

        return rows;
    };

    // Deleta 1 usuario pelo id
    static async delet(idUsuario) {
        const sql = "DELETE FROM usuario WHERE idusuario = ?"

        const value = [idUsuario];

        const [result] = await db.execute(sql, value);

        return result.affectedRows
    };

    static async findUserEmail(email, senha) {
        const sql = "SELECT * FROM usuario WHERE email = ? and senha = ?"

        const values = [email, senha];

        const [rows] = await db.execute(sql, values);
        return rows;
    };

    // MÉTODO getAllFichasUsuario todas fichas do usuario

    static async getAllFichasUsuario(idUsuario) {

        const sql = "SELECT * FROM ficha WHERE idusuarioFk = ?";

        const value = [idUsuario];

        const [rows] = await db.execute(sql, value);

        return rows;
    };

    // Todos os treinos do usaurio getAllTreinosUsuario

    static async getAllTreinosUsuario(idUsuario) {
        
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

        const value = [idUsuario];

        const [rows] = await db.execute(sql, value);

        return rows;
    };
};

module.exports = UsuarioModel;