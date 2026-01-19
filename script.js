(() => {
  const codeEl = document.getElementById('refCode');
  const btn = document.getElementById('copyBtn');
  const toast = document.getElementById('toast');

  function show(msg) {
    toast.textContent = msg;
    clearTimeout(show._t);
    show._t = setTimeout(() => {
      toast.textContent = '';
    }, 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e2) {
        return false;
      }
    }
  }

  btn.addEventListener('click', async () => {
    const text = codeEl.textContent.trim();
    const ok = await copyText(text);
    if (ok) {
      btn.textContent = 'Copied!';
      show(`Copied: KEZ1586`);
      setTimeout(() => (btn.textContent = 'Copy'), 1200);
    } else {
      show('Copy failed. Please select and copy manually.');
    }
  });
})();
