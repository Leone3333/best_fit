var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const TreinoController = require("../app/controllers/TreinoController")


router.post('/add', auth,async(req,res) => {
    
    try{

        const { exercicio_id, serie, rep, carga, idFicha } = req.body;
        console.log("Dados recebidos para adicionar treino:", { exercicio_id, serie, rep, carga, idFicha });
        
        
        const newTreino = await TreinoController.createTreino(exercicio_id, serie, rep, carga, idFicha)
        res.status(201).json({ 
            success: true, 
            message: "Treino adicionado!",
            data: newTreino     
        });
    }catch(error){
        res.status(500).json({ success: false, message: "Erro ao salvar" });
    }

})

module.exports = router;