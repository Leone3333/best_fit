const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vw_dashboard_top_cargas', {
    idusuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercicio: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maior_carga: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vw_dashboard_top_cargas',
    timestamps: false
  });
};
