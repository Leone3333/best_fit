const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vw_dashboard_frequencia_fichas', {
    // Como Views não possuem chave primária real, definimos os campos identificadores 
    // como primaryKey para o Sequelize conseguir indexar a leitura sem se perder
    idusuarioFK: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    divisao: {
      type: DataTypes.CHAR(2),
      primaryKey: true
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sessoes_realizadas: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vw_dashboard_frequencia_fichas',
    timestamps: false
  });
};