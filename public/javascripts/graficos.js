


const ctxPizza = document.getElementById('graficoFichasPizza').getContext('2d');

// 1. Defina um dicionário com as cores fixas para cada divisão de ficha
const mapeamentoCores = {
    'A': 'rgba(255, 99, 132, 0.8)',  // Vermelho fixo para Ficha A
    'B': 'rgba(54, 162, 235, 0.8)',  // Azul fixo para Ficha B
    'C': 'rgba(255, 206, 86, 0.8)',  // Amarelo fixo para Ficha C
    'D': 'rgba(75, 192, 192, 0.8)'   // Verde fixo para Ficha D (se houver)
};

// 2. Gere o array de cores dinamicamente com base nas labels que vieram do banco
// Se a label contiver "A", ela ganha a cor da Ficha A, e assim por diante.
const coresOrdenadas = labelsFichas.map(label => {
    // Procura se a label contém a letra da divisão (funciona mesmo se a label for "Ficha A", "Divisão A", etc.)
    if (label.includes('A')) return mapeamentoCores['A'];
    if (label.includes('B')) return mapeamentoCores['B'];
    if (label.includes('C')) return mapeamentoCores['C'];
    if (label.includes('D')) return mapeamentoCores['D'];
    return 'rgba(201, 203, 207, 0.8)'; // Cor cinza padrão caso não identifique
});

// 3. Inicialize o Chart.js usando as cores mapeadas
new Chart(ctxPizza, {
    type: 'pie',
    data: {
        labels: labelsFichas.length ? labelsFichas : ['Sem registros'],
        datasets: [{
            label: 'Sessões Concluídas',
            data: valoresFichas.length ? valoresFichas : [0],
            // 🚀 Usando o array de cores que respeita as divisões!
            backgroundColor: labelsFichas.length ? coresOrdenadas : ['rgba(201, 203, 207, 0.8)'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            }
        }
    }
});
// 3. CONFIGURAÇÃO DO GRÁFICO DE BARRAS VERTICAIS (Top 5 Exercícios)
// Extrai os nomes dos exercícios para o eixo X e os valores para o eixo Y
// (Ajuste .nome_exercicio e .maior_carga de acordo com as colunas reais da sua VIEW)
// 1. GARANTE APENAS OS 5 PRIMEIROS REGISTROS (Corta o array no Top 5)
// 3. CONFIGURAÇÃO DO GRÁFICO DE BARRAS VERTICAIS (Top 5 Exercícios)
// Corta o array para garantir no máximo 5 registros

const ctxBarras = document.getElementById('graficoTreinosBarras').getContext('2d');
new Chart(ctxBarras, {
    type: 'bar', // Mantém 'bar'
    data: {
        labels: labelsExercicios.length ? labelsExercicios : ['Nenhum treino'],
        datasets: [{
            label: 'Carga Máxima (kg)',
            data: valoresExercicios.length ? valoresExercicios : [0],
            backgroundColor: 'rgba(153, 102, 255, 0.8)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y', // <-- A MÁGICA ESTÁ AQUI: Gira o gráfico para a horizontal!
        responsive: true,
        scales: {
            x: { // Agora o eixo X é a escala numérica (kg)
                beginAtZero: true,
                ticks: {
                    color: '#ffffff',
                    font: { size: 12, weight: 'bold' }
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: { // Agora o eixo Y são os nomes dos exercícios
                ticks: {
                    color: '#ffffff',
                    font: { size: 12, weight: 'bold' },
                    mirror: false // Mantém o texto alinhado perfeitamente ao lado da barra
                },
                grid: { display: false } // Oculta linhas verticais para limpar o visual
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});