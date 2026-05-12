const alterarValor = (delta) => {
    // Seleciona o elemento que contém o número
    const spanSerie = document.getElementById('serie-value');
    
    // Converte o texto atual para número
    let valorAtual = parseInt(spanSerie.textContent);
    
    // Calcula o novo valor
    let novoValor = valorAtual + delta;
    
    // Validação: não deixa o número ser menor que 0 ou 1 (depende da sua regra)
    if (novoValor <= 0) {
        novoValor = 1;
    }
    
    // Atualiza o texto na tela
    spanSerie.textContent = novoValor;
};

const conferiDados = (rep,carga) => {

    let validar = false;
     
    if(rep <= 0 ){
        alert("Repetições não podem ser negativas")
        return validar
    }
    
    if(carga < 0 ){
        alert("Carga não pode ser negativa")
        return validar
    }

    validar = true
    return validar
}

const finalizarTreino = async () => {
    // Captura os dados dos elementos
    const dados = {
        idTreino: dadosIniciais.idTreino, 
        idFichaFK: dadosIniciais.idFichaFK,
        idExercicioFK: dadosIniciais.idExercicioFK,
        
        // Captura os valores dos inputs/span
        serie: document.getElementById('serie-value').textContent.trim(),
        rep: document.querySelector('.rep-selector input').value || document.querySelector('.rep-selector input').placeholder,
        carga: document.querySelector('.control-item:last-child input').value || document.querySelector('.control-item:last-child input').placeholder
    };

    console.log("Dados front: " + JSON.stringify(dados))
    let validar = conferiDados(dados.rep,dados.carga);

    if(!validar){
        location.reload();
    }else{
        console.log("Dados capturados no Front:", dados);
        try {
            const response = await fetch('/registroTreinos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            
            console.log(response)
            if (response.ok) {
                // Em vez de history.back(), você pode redirecionar para a lista de treinos
                history.back()
            }
        } catch (error) {
            alert("Erro ao salvar treino");
        }
    }
};