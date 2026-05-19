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

router.delete('/remove/:id', auth,async (req,res) => {
    try{
        const idTreino = req.params.id;
        console.log("ID do treino a ser removido:", idTreino);

        const removeTreino = await TreinoController.deleteTreino(idTreino);

        console.log(removeTreino);

        res.status(201).json({
            sucess:true,
            message:"Treino removido",
            data:removeTreino
        })
    }catch(error){
        res.status(500).json({ success: false, message: "Erro ao remover treino" });
    }
})

router.put('/update/:id', auth, async (req,res) => {
    try{
        const idTreino = req.params.id
        const {idExercicio,serie,repeticao,carga} = req.body;
        console.log("ID do treino a ser atualizado:", idTreino);

        const updateTreino = await TreinoController.updateTreino(idExercicio,serie,repeticao,carga,idTreino);

        console.log(updateTreino);

        res.status(201).json({
            sucess:true,
            message:"Treino atualizado",
            data:updateTreino 
        })
    }catch(error){
        res.status(500).json({sucess:false,message: "Erro ao atualizar treino"});
    }
});

router.post('/updateTodosTreinos', auth, async (req, res, next) => {
  
    res.redirect('/fichas');
});


module.exports = router;