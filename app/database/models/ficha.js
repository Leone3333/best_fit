const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ficha', {
    idficha: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    divisao: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    status_ficha: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idusuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idusuario'
      }
    }
  }, {
    sequelize,
    tableName: 'ficha',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idficha" },
        ]
      },
      {
        name: "fk_ficha_usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idusuarioFK" },
        ]
      },
    ]
  });
};
