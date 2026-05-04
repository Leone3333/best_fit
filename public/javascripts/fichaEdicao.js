// Card com dados do treino
let div_exercise_create = document.querySelector('.exercise-create')
const btnAdd = document.querySelector(".btn-add-float");
const btnExit = document.querySelector(".btn-exit-float");

console.log(btnAdd)
let currentTempId = null;

// Métodos que manioulam treinos existentes no bd
const delete_treino = async (el) => {
    try {
        const card = el.closest('.exercise-row-card')

        const idTreino = card.dataset.id;
        console.log("ID para deletar:", idTreino);

        const response = await fetch('/treinos/remove', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ idTreino: idTreino })
        })

        if (response.ok) {
            console.log('chegou aqui')
            card.remove()
        }
    } catch (error) {
        console.log('Erro na deleção treino: ' + error)
    }
}

const update_treino = async (el) => {
    try {
        const card = el.closest('.exercise-row-card');

        const idTreino = card.dataset.id;
        console.log("ID para atualizar:", idTreino);

        // Busca o INPUT que está dentro de cada DIV de coluna
        // Usamos querySelector para procurar o 'input' dentro do ID da div
        const serie = card.querySelector('.serie input').value;
        const repeticao = card.querySelector('.rep input').value;
        const carga = card.querySelector('.carga input').value;

        // Para o SELECT, o .value pega o ID do exercício selecionado
        const idExercicio = card.querySelector('select').value;

        const response = await fetch('/treinos/update', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ idExercicio: idExercicio, serie: serie, repeticao: repeticao, carga: carga, idTreino: idTreino })
        })

        if (response.ok) {
            console.log('chegou aqui')
        }

    } catch (error) {
        console.log('Erro na atualização treino: ' + error)
    }
}

// Métodos que manipulam uma ficha que vira a ser 1 novo treino no banco
const add_treino = () => {

    console.log("ola")
    if (currentTempId) return;
    currentTempId = Date.now();

    const options = exerciciosDisponiveis.map(ex => `
        <option value="${ex.idexercicio}">${ex.nome}</option>
    `).join('');

    // console.log(home_icon)
    const new_exercise_component = `
        <div class="exercise-row-card" id="card-${currentTempId}">
            <!-- Coluna do Exercício com a mesma classe do Header -->
            <div class="cell col-ex">
                <select name="exercicio_id">
                    <option value="" disabled selected>Selecione...</option>
                    ${exerciciosDisponiveis.map(ex => `<option value="${ex.idexercicio}">${ex.nome}</option>`).join('')}
                </select>
            </div>

            <!-- Colunas Numéricas -->
            <div class="cell col-num"><input type="number" class="serie" placeholder="0"></div>
            <div class="cell col-num"><input type="number" class="rep" placeholder="0"></div>
            <div class="cell col-num"><input type="number" class="carga" placeholder="0"></div>

        </div>`;

        btnAdd.querySelector(".material-symbols-outlined").textContent = "check";

        btnAdd.onclick = () => salvarNovoTreino(currentTempId);

        btnExit.style.display = "flex"; 
        btnExit.onclick = () => removerCard(currentTempId);
    
        div_exercise_create.insertAdjacentHTML('beforeend', new_exercise_component);
}


const removerCard = (id) => {
    const card = document.getElementById(`card-${id}`);
    if (card) card.remove();

    // Resetar estado global
    currentTempId = null;

    btnAdd.querySelector(".material-symbols-outlined").textContent = "add";
    btnAdd.onclick = add_treino;

    btnExit.style.display = "none";
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
            
            currentTempId = null;
            // Opcional: transformar o card em "modo leitura" ou atualizar a página
            window.location.reload();
        }
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}

// No final do arquivo fichaEdicao.js
btnAdd.onclick = add_treino;