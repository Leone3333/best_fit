var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const TreinoController = require("../app/controllers/TreinoController")
const RegistroTreinoController = require("../app/controllers/RegistroTreinoController")


router.get('/visualizar/ficha/:idFicha/treino/:idTreino', auth, async (req, res, next) => {
  
    let { idFicha, idTreino } = req.params;
    
    let treinoSelecionado = await TreinoController.visualizarTreino(idTreino,idFicha)
    console.log(treinoSelecionado);    
    res.render('visualizarTreino', { treinoSelecionado: treinoSelecionado });
});


router.post('/', auth,async(req,res) => {
    
    try{
        console.log(req.body);
        const { idTreino, idFichaFK, idExercicioFK, serie, rep, carga } = req.body;
        
        if (!req.session.usuarioLogado) {
            return res.status(401).json({ success: false, message: "Sessão expirada. Faça login novamente." });
        }else{
            console.log(req.session.usuarioLogado)
        }

        const usuarioId = req.session.usuarioLogado.id;

        const registrarTreino = await RegistroTreinoController.registrarTreino(idTreino, 
            carga, 
            rep,
            usuarioId,
            idExercicioFK,
            idFichaFK,
            serie)
            
        console.log("Dados para registrar treino: " + registrarTreino)

        res.status(201).json({ 
            success: true, 
            message: "Treino registrado!",
            data: registrarTreino     
        });
    }catch(error){
        res.status(500).json({ success: false, message: "Erro ao salvar" });
    }

})

module.exports = router; 