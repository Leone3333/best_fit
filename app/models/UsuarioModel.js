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
    }

    // Busca todos usuarios
    static async getAll() {
        const sql = "SELECT * FROM usuario"

        const [result] = await db.execute(sql);

        return result
    }

    // Deleta 1 usuario pelo id
    static async delet(idUsuario) {
        const sql = "DELETE FROM usuario WHERE idusuario = ?"

        const value = idUsuario;

        const [result] = await db.execute(sql, value);

        return result
    }

    static async findUserEmail(email, senha) {
        const sql = "SELECT * FROM usuario WHERE email = ? and senha = ?"

        const values = [email, senha];

        const [rows] = await db.execute(sql, values);
        return rows.length > 0 ? result[0]:null;
    }

    // CRIAR MÉTODOS getAllFichasInfos e getAllTreinosUsuario
}

module.exports = UsuarioModel;