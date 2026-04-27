let div_exercise_create = document.querySelector('.exercise-create')

const delete_treino = async (el) => {
    try{
        const card = el.closest('.exercise-card')

        const idTreino = card.dataset.id;
        console.log("ID para deletar:", idTreino);

        const response = await fetch('/treinos/remove', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({idTreino: idTreino})
        })
        
        if(response.ok){
            console.log('chegou aqui')
            card.remove()
        }
    }catch(error){
        console.log('Erro na deleção treino: ' + error)
    }
}

const update_treino = () => {
    let btn = document.querySelector(".btn-update");
    console.log(btn)
}

const add_treino = () => {

    const tempId = Date.now();

    let btn = document.querySelector(".btn-add-float");
    let home_icon = document.querySelector('.home-icon')

    const options = exerciciosDisponiveis.map(ex => `
        <option value="${ex.idexercicio}">${ex.exercicio_nome}</option>
    `).join('');

    // console.log(home_icon)
    const new_exercise_component = `
    <div class="exercise-card" id="card-${tempId}">
            <select name="exercicio_id">
                ${exerciciosDisponiveis.map(ex => `<option value="${ex.idexercicio}">${ex.exercicio_nome}</option>`).join('')}
            </select>
            <div class="col-sm"><input type="number" class="serie" placeholder="serie __"></div>
            <div class="col-sm"><input type="number" class="rep" placeholder="rep __"></div>
            <div class="col-sm"><input type="number" class="carga" placeholder="Carga __"></div>
        
        <div class="actions">
        <button type="button" onclick="removerCard(${tempId})" class="btn-cancel">
            <span class="material-symbols-outlined">delete</span>
        </button>
        <button type="button" onclick="salvarNovoTreino(${tempId})" class="btn-save">
            <span class="material-symbols-outlined">save</span>
        </button>
        
            </div>
    </div> `;

    div_exercise_create.insertAdjacentHTML('beforeend', new_exercise_component)
}


const removerCard = (id) => {
    const card = document.getElementById(`card-${id}`);
    if (card) card.remove();
}

const salvarNovoTreino = async (id) => {
    const card = document.getElementById(`card-${id}`);

    // Captura os dados apenas deste card
    const dados = {
        exercicio_id: card.querySelector('select').value,
        serie: card.querySelector('.serie').value || 0,
        rep: card.querySelector('.rep').value || 0,
        carga: card.querySelector('.carga').value || 0,
        idFicha: new URLSearchParams(window.location.search).get('id') // Pega o ID da ficha da URL
    };

    // console.log(dados);
    try {
        const response = await fetch('/treinos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert("Treino salvo com sucesso!");
            // Opcional: transformar o card em "modo leitura" ou atualizar a página
            window.location.reload()
        }
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}
