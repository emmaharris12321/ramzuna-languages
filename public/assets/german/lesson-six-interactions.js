/* Plain-JavaScript practice checks for lesson 6. No tracking or server requests. */
(() => {
  document.querySelectorAll('.lesson-six .quiz-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const questions = Array.from(form.querySelectorAll('fieldset[data-answer]'));
      let correct = 0;
      questions.forEach(fieldset => {
        const checked = fieldset.querySelector('input[type="radio"]:checked');
        const answer = fieldset.dataset.answer;
        const passed = checked?.value === answer;
        if (passed) correct++;
        fieldset.dataset.result = passed ? 'correct' : 'incorrect';
        fieldset.querySelector('.feedback').textContent = !checked
          ? `Choose an answer. Correct response: ${answer}.`
          : passed ? 'Correct!' : `Try again. Correct response: ${answer}.`;
      });
      form.querySelector('.quiz-score').textContent = `You answered ${correct} of ${questions.length} correctly.`;
    });
    form.addEventListener('reset', () => {
      queueMicrotask(() => {
        form.querySelectorAll('fieldset').forEach(fieldset => {
          delete fieldset.dataset.result;
          fieldset.querySelector('.feedback').textContent = '';
        });
        form.querySelector('.quiz-score').textContent = '';
      });
    });
  });
})();
