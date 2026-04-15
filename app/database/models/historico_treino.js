const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historico_treino', {
    idhistorico_treino: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    carga_usada: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    rep_feitas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    data_conclusao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    idusuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idusuario'
      }
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
    serie_feita: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'historico_treino',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idhistorico_treino" },
        ]
      },
      {
        name: "idhistorico_treino_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idhistorico_treino" },
        ]
      },
      {
        name: "fk_historico_treino_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idusuarioFK" },
        ]
      },
      {
        name: "fk_historico_treino_exercicio1_idx",
        using: "BTREE",
        fields: [
          { name: "idexercicioFK" },
        ]
      },
      {
        name: "fk_historico_treino_ficha1_idx",
        using: "BTREE",
        fields: [
          { name: "idfichaFK" },
        ]
      },
    ]
  });
};
