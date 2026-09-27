/**
 * Lightweight, DOM-based romantic confetti and floating heart effect
 */
export function fireConfetti(count = 45) {
  const container = document.body;
  const colors = ['#ff758f', '#ffb3c1', '#ffd166', '#ff4d6d', '#ff9ebb', '#c9184a', '#ffe5ec'];
  const symbols = ['🌸', '✨', '💖', '🎀', '🍬', '❤️'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const isSymbol = Math.random() > 0.6;

    el.style.position = 'fixed';
    el.style.left = `${Math.random() * 98}vw`;
    el.style.top = '-24px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.transition = 'transform 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2.6s linear';
    el.style.opacity = '1';

    if (isSymbol) {
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.fontSize = `${Math.random() * 14 + 14}px`;
    } else {
      const size = Math.random() * 10 + 6;
      el.style.width = `${size}px`;
      el.style.height = `${size * 1.4}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = '3px';
    }

    container.appendChild(el);

    const fallDistance = window.innerHeight + 60;
    const sway = (Math.random() - 0.5) * 220;
    const rotate = Math.random() * 720 - 360;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${sway}px, ${fallDistance}px) rotate(${rotate}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2800);
  }
}
