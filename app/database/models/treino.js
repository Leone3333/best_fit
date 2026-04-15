const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('treino', {
    idtreino: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    carga: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    repeticoes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idexercicioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exercicio',
        key: 'idexercicio'
      }
    },
    idfichaFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ficha',
        key: 'idficha'
      }
    },
    serie: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'treino',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idtreino" },
        ]
      },
      {
        name: "fk_treino_exercicio_idx",
        using: "BTREE",
        fields: [
          { name: "idexercicioFK" },
        ]
      },
      {
        name: "fk_treino_ficha1_idx",
        using: "BTREE",
        fields: [
          { name: "idfichaFK" },
        ]
      },
    ]
  });
};
