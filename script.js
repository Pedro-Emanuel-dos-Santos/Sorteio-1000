function spin() {
    loadCSV();
  
    const reels = document.querySelectorAll('.reel');
    const winnerInfo = document.getElementById('winnerInfo');
  
    function loadCSV() {
        fetch('sorteados.csv')
            .then(response => response.text())
            .then(data => {
                csvData = Papa.parse(data, { header: true }).data;
                console.log('Dados do CSV carregados com sucesso:', csvData);
                startSpinAnimation();
            })
            .catch(error => console.error('Erro ao carregar o CSV:', error.message));
    }
  
    function startSpinAnimation() {
        if (!csvData || csvData.length === 0) {
            console.error('Dados do CSV não carregados. Verifique se o arquivo CSV foi carregado corretamente.');
            return;
        }
  
        // Escolhe aleatoriamente um item do CSV
        const randomItem = csvData[Math.floor(Math.random() * csvData.length)];
        const targetNumbers = randomItem['NÚMEROS RESERVADO'].split('');
  
        // Simula a rotação da máquina
        let spinDuration = 2000; // Duração da animação em milissegundos
        let startTime = performance.now();
        let currentIndex = 0; // Índice atual na array de números
  
        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
  
            if (elapsedTime < spinDuration) {
                // Atualiza os números visíveis na roleta com números aleatórios
                reels.forEach(reel => {
                    const currentNumber = Math.floor(Math.random() * 10);
                    reel.innerHTML = `<div class="number">${currentNumber}</div>`;
                });
  
                requestAnimationFrame(animate);
            } else {
                // Exibe o ganhador e o número sorteado abaixo da máquina
                reels.forEach((reel, index) => {
                    reel.innerHTML = `<div class="number">${targetNumbers[index]}</div>`;
                });
  
                winnerInfo.innerHTML = `Ganhador: ${randomItem['NOME COMPRADOR']}, Número Sorteado: ${randomItem['NÚMEROS RESERVADO']}`;
            }
        }
  
        animate();
    }
}
