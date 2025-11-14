  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');

  let randomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);

      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    });
  });

  function createConfetti() {
    for (let i = 0; i < 50; i++) {
      const conf = document.createElement('div');
      conf.classList.add('confetti');
      conf.style.left = Math.random() * 100 + "vw";
      conf.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
      conf.style.animationDuration = (Math.random()*2 + 3) + "s";
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 5000);
    }
  }

  document.getElementById('checkBtn').addEventListener('click', () => {
    const guess = Number(document.getElementById('guess').value);
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');

    if (!guess || guess < 1 || guess > 100) {
      message.textContent = 'Введите число от 1 до 100!';
      message.style.color = 'red';
      return;
    }

    attempts++;
    document.getElementById('attemptsText').textContent = `Попытки: ${attempts}`;

    if (guess === randomNumber) {
      message.textContent = `🎉 Победа! Загаданное число ${randomNumber}!`;
      message.classList.add('win');

      restartBtn.style.display = 'inline-block';

      createConfetti(); 
    } 
    else if (guess < randomNumber) {
      message.textContent = '📈 Загаданное число больше';
      message.style.color = '#f39c12';
    } 
    else {
      message.textContent = '📉 Загаданное число меньше';
      message.style.color = '#f39c12';
    }
  });

  document.getElementById('restartBtn').addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('attemptsText').textContent = 'Попытки: 0';
    document.getElementById('message').textContent = '';
    document.getElementById('message').classList.remove('win');
    document.getElementById('guess').value = '';
    document.getElementById('restartBtn').style.display = 'none';
  });