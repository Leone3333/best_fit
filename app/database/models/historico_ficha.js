const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historico_ficha', {
    idhistorico_ficha: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idusuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idusuario'
      }
    },
    divisao: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    data_conclusao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'historico_ficha',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idhistorico_ficha" },
        ]
      },
      {
        name: "fk_historico_ficha_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idusuarioFK" },
        ]
      }
    ]
  });
};