document.querySelectorAll('.answer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    answer.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.textContent = isOpen ? 'Show answer' : 'Hide answer';
  });
});
