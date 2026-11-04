/* Lessons 9 and 10: simple offline-friendly self-check interactions.
   No storage, cookies, network requests or form submission. */
(() => {
  const root = document.querySelector('.lesson-nine, .lesson-ten');
  if (!root) return;
  for (const form of root.querySelectorAll('form.auto-quiz[data-mode]')) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let score = 0;
      const mode = form.dataset.mode;
      const questions = mode === 'radio'
        ? [...form.querySelectorAll('fieldset[data-answer]')]
        : [...form.querySelectorAll('input[type="text"][data-answer]')];
      for (const question of questions) {
        const input = mode === 'radio' ? question.querySelector('input:checked') : question;
        const expected = question.dataset.answer || '';
        const value = (input?.value || '').trim();
        const correct = value.toLocaleLowerCase('de') === expected.trim().toLocaleLowerCase('de');
        if (correct) score++;
        if (mode === 'radio') {
          question.dataset.result = correct ? 'correct' : 'incorrect';
          const feedback = question.querySelector('.feedback');
          if (feedback) feedback.textContent = correct ? 'Correct!' : `Correct answer: ${expected}.`;
        } else {
          question.setAttribute('aria-invalid', String(!correct));
          const feedback = question.parentElement.querySelector('.fill-feedback');
          if (feedback) feedback.textContent = correct ? 'Correct!' : `Correct form: ${expected}.`;
        }
      }
      const status = form.querySelector('.quiz-score');
      if (status) status.textContent = `${score} of ${questions.length} correct.`;
    });
    form.addEventListener('reset', () => queueMicrotask(() => {
      for (const fieldset of form.querySelectorAll('fieldset[data-answer]')) {
        delete fieldset.dataset.result;
        const feedback = fieldset.querySelector('.feedback');
        if (feedback) feedback.textContent = '';
      }
      for (const input of form.querySelectorAll('input[type="text"][data-answer]')) {
        input.removeAttribute('aria-invalid');
        const feedback = input.parentElement.querySelector('.fill-feedback');
        if (feedback) feedback.textContent = '';
      }
      const status = form.querySelector('.quiz-score');
      if (status) status.textContent = '';
    }));
  }
})();
