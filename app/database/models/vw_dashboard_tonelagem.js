const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vw_dashboard_tonelagem', {
    idusuarioFK: {
      type: DataTypes.INTEGER,
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
    tonelagem_total: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vw_dashboard_tonelagem',
    timestamps: false
  });
};
