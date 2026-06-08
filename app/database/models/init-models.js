var DataTypes = require("sequelize").DataTypes;
var _exercicio = require("./exercicio");
var _ficha = require("./ficha");
var _historico_treino = require("./historico_treino");
var _treino = require("./treino");
var _usuario = require("./usuario");
var _historico_ficha = require("./historico_ficha"); 
var _vw_dashboard_frequencia_fichas = require("./vw_dashboard_frequencia_fichas");
var _vw_dashboard_tonelagem = require("./vw_dashboard_tonelagem");
var _vw_dashboard_top_cargas = require("./vw_dashboard_top_cargas");

function initModels(sequelize) {
  var exercicio = _exercicio(sequelize, DataTypes);
  var ficha = _ficha(sequelize, DataTypes);
  var historico_treino = _historico_treino(sequelize, DataTypes);
  var treino = _treino(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var historico_ficha = _historico_ficha(sequelize, DataTypes); 
  var vw_dashboard_frequencia_fichas = _vw_dashboard_frequencia_fichas(sequelize, DataTypes);
  var vw_dashboard_tonelagem = _vw_dashboard_tonelagem(sequelize, DataTypes);
  var vw_dashboard_top_cargas = _vw_dashboard_top_cargas(sequelize, DataTypes);

  // -----------------------------------------------------------------
  // BELONGSTO (Relacionamentos de Chave Estrangeira - Mantidos no Singular)
  // -----------------------------------------------------------------
  historico_treino.belongsTo(exercicio, { as: "exercicio", foreignKey: "idexercicioFK"});
  historico_treino.belongsTo(ficha, { as: "ficha", foreignKey: "idfichaFK"});
  historico_treino.belongsTo(usuario, { as: "usuario", foreignKey: "idusuarioFK"});

  historico_ficha.belongsTo(usuario, { as: "usuario", foreignKey: "idusuarioFK"});
  
  treino.belongsTo(exercicio, { as: "exercicio", foreignKey: "idexercicioFK"});
  treino.belongsTo(ficha, { as: "ficha", foreignKey: "idfichaFK"});
  
  ficha.belongsTo(usuario, { as: "usuario", foreignKey: "idusuarioFK"});

  // -----------------------------------------------------------------
  // HASMANY (Modificados para SINGULAR para não quebrar o escopo global da Model)
  // -----------------------------------------------------------------
  
  // 🚀 CORREÇÃO: Mudado de "historico_fichas" para "historico_ficha"
  usuario.hasMany(historico_ficha, { as: "historico_ficha", foreignKey: "idusuarioFK"}); 

  // 🚀 CORREÇÃO: Mudado de "historico_treinos" para "historico_treino"
  exercicio.hasMany(historico_treino, { as: "historico_treino", foreignKey: "idexercicioFK"});
  exercicio.hasMany(treino, { as: "treino", foreignKey: "idexercicioFK"});
  
  // 🚀 CORREÇÃO: Mudado de "historico_treinos" para "historico_treino"
  ficha.hasMany(historico_treino, { as: "historico_treino", foreignKey: "idfichaFK"});
  ficha.hasMany(treino, { as: "treino", foreignKey: "idfichaFK"});  
  
  usuario.hasMany(ficha, { as: "ficha", foreignKey: "idusuarioFK"});
  
  // 🚀 CORREÇÃO: Mudado de "historico_treinos" para "historico_treino"
  usuario.hasMany(historico_treino, { as: "historico_treino", foreignKey: "idusuarioFK"});
  
  return {
    exercicio,
    ficha,
    historico_treino,
    treino,
    usuario,
    historico_ficha, 
    vw_dashboard_frequencia_fichas,
    vw_dashboard_tonelagem,
    vw_dashboard_top_cargas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;