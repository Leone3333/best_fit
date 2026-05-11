var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const TreinoController = require("../app/controllers/TreinoController")


router.get('/visualizar/ficha/:idFicha/treino/:idTreino', auth, async (req, res, next) => {
  
    let { idFicha, idTreino } = req.params;
    
    let treinoSelecionado = await TreinoController.visualizarTreino(idTreino,idFicha)
    console.log(treinoSelecionado);    
    res.render('visualizarTreino', { treinoSelecionado: treinoSelecionado });
});


// router.post('/add', auth,async(req,res) => {
    
//     try{
//         const { exercicio_id, serie, rep, carga, idFicha } = req.body;
//         console.log("Dados recebidos para adicionar treino:", { exercicio_id, serie, rep, carga, idFicha });
        
        
//         const newTreino = await TreinoController.createTreino(exercicio_id, serie, rep, carga, idFicha)
//         res.status(201).json({ 
//             success: true, 
//             message: "Treino adicionado!",
//             data: newTreino     
//         });
//     }catch(error){
//         res.status(500).json({ success: false, message: "Erro ao salvar" });
//     }

// })

module.exports = router; // Certifique-se de que exportou o objeto router