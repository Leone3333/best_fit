


    const ctxPizza = document.getElementById('graficoFichasPizza').getContext('2d');
    new Chart(ctxPizza, {
        type: 'pie',
        data: {
            labels: labelsFichas.length ? labelsFichas : ['Sem registros'],
            datasets: [{
                label: 'Sessões Concluídas',
                data: valoresFichas.length ? valoresFichas : [0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        // CONFIGURAÇÃO DE VISIBILIDADE DOS LABELS
                        color: '#ffffff', // Força o texto a ficar branco puro (ou use #333333 se seu fundo for claro)
                        font: {
                            size: 14,       // Aumenta o tamanho da fonte para 14px
                            weight: 'bold'  // Deixa o texto em negrito
                        },
                        padding: 20         // Dá um espaçamento extra entre os quadradinhos coloridos
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