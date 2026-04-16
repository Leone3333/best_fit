const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vw_dashboard_frequencia_fichas', {
    mes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idusuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    divisao: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sessoes_realizadas: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'vw_dashboard_frequencia_fichas',
    timestamps: false
  });
};
