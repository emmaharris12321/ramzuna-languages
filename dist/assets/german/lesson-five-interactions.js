// Accessible, locally checked replacements for H5P activities in saved source pages.
// Each exercise can be retried; answers stay on the learner's device.

document.querySelectorAll('.lesson-five form.auto-quiz').forEach(form => {
  const fields = [...form.querySelectorAll('fieldset[data-answer]')];
  const score = form.querySelector('.quiz-score');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let correctCount = 0;
    fields.forEach(field => {
      const selected = field.querySelector('input:checked');
      const right = selected?.value === field.dataset.answer;
      if (right) correctCount++;
      field.dataset.result = !selected ? 'empty' : right ? 'correct' : 'incorrect';
      const message = field.querySelector('.feedback');
      if (message) message.textContent = !selected
        ? 'Select an answer first.'
        : `${right ? 'Correct.' : 'Not quite.'} ${field.dataset.explanation ?? ''}`;
    });
    if (score) score.textContent = `${correctCount} of ${fields.length} correct. Review the feedback and try again if you like.`;
  });

  form.addEventListener('reset', () => {
    fields.forEach(field => {
      delete field.dataset.result;
      const message = field.querySelector('.feedback');
      if (message) message.textContent = '';
    });
    if (score) score.textContent = '';
  });
});

document.querySelectorAll('.lesson-five form.fill-quiz').forEach(form => {
  const inputs = [...form.querySelectorAll('input[data-answer]')];
  const score = form.querySelector('.quiz-score');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let correctCount = 0;
    inputs.forEach(input => {
      const expected = (input.dataset.answer ?? '').trim().toLocaleLowerCase('de');
      const response = input.value.trim().toLocaleLowerCase('de');
      const isNumber = /^[0-9]+$/.test(expected);
      const normalized = isNumber ? response.replace(/[\s,.]/g, '') : response;
      const right = normalized === expected;
      if (right) correctCount++;
      input.setAttribute('aria-invalid', String(!right));
      const feedback = document.getElementById(input.getAttribute('aria-describedby') ?? '');
      if (feedback) feedback.textContent = !response
        ? 'Please enter an answer.'
        : right ? '✓ Correct' : `Answer: ${input.dataset.answer}`;
    });
    if (score) score.textContent = `${correctCount} of ${inputs.length} correct.`;
  });
  form.addEventListener('reset', () => {
    inputs.forEach(input => {
      input.removeAttribute('aria-invalid');
      const feedback = document.getElementById(input.getAttribute('aria-describedby') ?? '');
      if (feedback) feedback.textContent = '';
    });
    if (score) score.textContent = '';
  });
});

const markExercise = document.querySelector('#sein-mark');
if (markExercise) {
  const words = [...markExercise.querySelectorAll('.mark-word')];
  const score = markExercise.querySelector('#sein-score');
  const correctCount = words.filter(word => word.dataset.correct === 'true').length;
  words.forEach(word => {
    word.addEventListener('click', () => {
      word.setAttribute('aria-pressed', String(word.getAttribute('aria-pressed') !== 'true'));
      word.removeAttribute('data-result');
      if (score) score.textContent = '';
    });
  });
  markExercise.querySelector('#check-sein')?.addEventListener('click', () => {
    const found = words.filter(w => w.dataset.correct === 'true' && w.getAttribute('aria-pressed') === 'true').length;
    const mistaken = words.filter(w => w.dataset.correct === 'false' && w.getAttribute('aria-pressed') === 'true').length;
    words.forEach(word => {
      const chosen = word.getAttribute('aria-pressed') === 'true';
      word.dataset.result = chosen ? word.dataset.correct === 'true' ? 'correct' : 'incorrect' : 'plain';
    });
    if (score) score.textContent = `You found ${found} of ${correctCount} forms of sein${mistaken ? `, with ${mistaken} other verb${mistaken === 1 ? '' : 's'} selected` : ''}.`;
  });
  markExercise.querySelector('#reset-sein')?.addEventListener('click', () => {
    words.forEach(word => { word.setAttribute('aria-pressed', 'false'); word.removeAttribute('data-result'); });
    if (score) score.textContent = '';
  });
}

// Only one of the original remote number recordings plays at a time.
const audios = [...document.querySelectorAll('.lesson-five audio')];
audios.forEach(audio => audio.addEventListener('play', () => {
  audios.forEach(other => { if (other !== audio) other.pause(); });
}));
