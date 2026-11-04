/* Lesson 8: progressive enhancement; no account, requests or tracking. */
(() => {
  document.querySelectorAll('.lesson-eight .quiz-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let correct = 0;
      const fields = [...form.querySelectorAll('fieldset[data-answer]')];
      fields.forEach(fieldset => {
        const selected = fieldset.querySelector('input[type="radio"]:checked');
        const answer = fieldset.dataset.answer;
        const ok = selected?.value === answer;
        if (ok) correct++;
        fieldset.dataset.result = ok ? 'correct' : 'incorrect';
        fieldset.querySelector('.feedback').textContent = !selected
          ? `Please select an answer. Correct response: ${answer}.`
          : ok ? 'Correct!' : `Not quite. The correct response is ${answer}.`;
      });
      const score = form.querySelector('.quiz-score');
      if (score) score.textContent = `${correct} of ${fields.length} correct.`;
    });
    form.addEventListener('reset', () => queueMicrotask(() => {
      form.querySelectorAll('fieldset').forEach(f => {
        delete f.dataset.result;
        f.querySelector('.feedback').textContent = '';
      });
      const score = form.querySelector('.quiz-score');
      if (score) score.textContent = '';
    }));
  });
})();
