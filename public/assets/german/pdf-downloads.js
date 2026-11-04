/* Non-blocking PDF downloads. Progressive enhancement: <a href download> remains usable
   without JavaScript. PDF resources are hosted on the same origin at /resources/pdfs/. */
(() => {
  const controllers = new WeakMap();
  const formatSize = bytes => `${Math.max(1, Math.round(bytes / 1024))} KB`;

  document.addEventListener('click', async event => {
    const link = event.target.closest('a[data-async-pdf]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!window.fetch || !window.AbortController || !window.URL?.createObjectURL) return; // native link fallback
    const url = new URL(link.href, document.baseURI);
    if (url.origin !== location.origin || url.protocol !== 'https:' && url.protocol !== 'http:') return; // avoid CORS/credential surprises
    event.preventDefault();
    const item = link.closest('[data-pdf-resource]');
    if (!item || controllers.has(item)) return;
    const status = item.querySelector('[data-pdf-status]');
    const cancel = item.querySelector('[data-pdf-cancel]');
    const abort = new AbortController();
    controllers.set(item, abort);
    link.setAttribute('aria-disabled', 'true');
    cancel.hidden = false;
    const update = text => { if (status) status.textContent = text; };
    update('Starting download…');
    let objectUrl = null;
    try {
      const response = await fetch(url.href, { signal: abort.signal, credentials: 'same-origin' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const total = Number(response.headers.get('content-length')) || 0;
      const parts = [];
      let received = 0;
      if (response.body?.getReader) {
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          parts.push(value); received += value.byteLength;
          update(total ? `Downloading… ${Math.min(100, Math.round(received / total * 100))}%` : `Downloading… ${formatSize(received)}`);
        }
      } else {
        const body = await response.blob();
        parts.push(body); received = body.size;
      }
      if (abort.signal.aborted) return;
      objectUrl = URL.createObjectURL(new Blob(parts, { type: 'application/pdf' }));
      const temporary = document.createElement('a');
      temporary.href = objectUrl;
      temporary.download = link.getAttribute('download') || url.pathname.split('/').pop() || 'resource.pdf';
      temporary.style.display = 'none';
      document.body.append(temporary);
      temporary.click(); temporary.remove();
      update(`Ready · ${formatSize(received)}. Your PDF download has started.`);
    } catch (error) {
      if (error.name === 'AbortError') update('Download cancelled. You can try again.');
      else update('The download could not complete. Use “Direct PDF link” below instead.');
    } finally {
      controllers.delete(item);
      link.removeAttribute('aria-disabled');
      cancel.hidden = true;
      // Release memory after the browser has had time to start the save.
      if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    }
  });

  document.addEventListener('click', event => {
    const cancel = event.target.closest('[data-pdf-cancel]');
    if (!cancel) return;
    const item = cancel.closest('[data-pdf-resource]');
    controllers.get(item)?.abort();
  });
})();
