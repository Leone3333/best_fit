var DataTypes = require("sequelize").DataTypes;
var _exercicio = require("./exercicio");
var _ficha = require("./ficha");
var _historico_treino = require("./historico_treino");
var _treino = require("./treino");
var _usuario = require("./usuario");


// hasMany tem muitos espelhados por ai
// BelongTo pertence a algeum(algo) especifico

function initModels(sequelize) {
  var exercicio = _exercicio(sequelize, DataTypes);
  var ficha = _ficha(sequelize, DataTypes);
  var historico_treino = _historico_treino(sequelize, DataTypes);
  var treino = _treino(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  historico_treino.belongsTo(exercicio, { as: "exercicio", foreignKey: "idexercicioFK"});
  historico_treino.belongsTo(ficha, { as: "ficha", foreignKey: "idfichaFK"});
  historico_treino.belongsTo(usuario, { as: "usuario", foreignKey: "idusuarioFK"});

  exercicio.hasMany(historico_treino, { as: "historico_treinos", foreignKey: "idexercicioFK"});
  exercicio.hasMany(treino, { as: "treinos", foreignKey: "idexercicioFK"});
  
  treino.belongsTo(exercicio, { as: "exercicio", foreignKey: "idexercicioFK"});
  treino.belongsTo(ficha, { as: "ficha", foreignKey: "idfichaFK"});
  
  ficha.hasMany(historico_treino, { as: "historico_treinos", foreignKey: "idfichaFK"});
  ficha.hasMany(treino, { as: "treinos", foreignKey: "idfichaFK"});  
  ficha.belongsTo(usuario, { as: "usuario", foreignKey: "idusuarioFK"});
  
  usuario.hasMany(ficha, { as: "fichas", foreignKey: "idusuarioFK"});
  usuario.hasMany(historico_treino, { as: "historico_treinos", foreignKey: "idusuarioFK"});

  return {
    exercicio,
    ficha,
    historico_treino,
    treino,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
