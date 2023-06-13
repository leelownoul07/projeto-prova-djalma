document.addEventListener('DOMContentLoaded', () => {
  // Configurações do jogo
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  const gridSize = 10;
  const gridWidth = canvas.width / gridSize;
  const gridHeight = canvas.height / gridSize;

  // Estado do jogo
  let snake = [{ x: 10, y: 10 }];
  let direction = 'right';
  let food = { x : 5, y: 5 };
  

  // Função para atualizar o estado do jogo
  function update() {
    // Movimentar a cobrinha
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case 'up':
        head.y --;
        break;
      case 'down':
        head.y ++ ;
        break;
      case 'left':
        head.x -- ;
        break;
      case 'right':
        head.x ++;
        break;
    }

    // Verificar colisão com as bordas do tabuleiro
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
      gameOver();
      return;
    }
	
	   // Verificar colisão com a própria cobrinha
    if (snake.some(segment => segment.x === head.x && segment.y === head.y && segment !== head)) {
      gameOver();
      return;
    }


    snake.unshift(head);

    // Verificar se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
      // Gerar nova posição para a comida
      food = generateFoodPosition();
    
      // Não remover o último segmento da cobra (a cobra cresce)
    } else {
      // Remover o último segmento da cobra
      snake.pop();
    }
 
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a cobrinha
    context.fillStyle = 'black';
    snake.forEach(segment => {
      context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
      // Desenhar a comida
    context.fillStyle = 'yellow';
    context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
 

    // Agendar a próxima atualização
    setTimeout(update, 1000 / 20);
  }
    // Função para gerar uma nova posição para a comida
    function generateFoodPosition() {
      const x = Math.floor(Math.random() * gridWidth);
      const y = Math.floor(Math.random() * gridHeight);
      return { x, y };
    }

  // Função para lidar com as teclas pressionadas
  function handleKeyPress(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
  }

  // Função para encerrar o jogo
  function gameOver() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Exibir mensagem de fim de jogo
    context.fillStyle = 'red';
    context.font = '30px Arial';
    context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
  }

  // Adicionar o evento de pressionar tecla
  document.addEventListener('keydown', handleKeyPress);

  // Iniciar o jogo
  update();
});

