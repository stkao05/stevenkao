(async function () {
  const editor = document.querySelector("[data-type-writer]");

  function setCursor(pos) {
    var setpos = document.createRange();
    var set = window.getSelection();

    if (editor.childNodes.length > 0) {
      setpos.setStart(editor.childNodes[0], pos);
    }

    setpos.collapse(true);
    set.removeAllRanges();
    set.addRange(setpos);

    // Set cursor on focus
    editor.focus();
  }

  function cursorToEnd() {
    setCursor(editor.textContent.length);
  }

  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  async function type(text) {
    for (let i = 0; i <= text.length; i++) {
      editor.textContent = text.substring(0, i);
      setCursor(editor.textContent.length);
      await wait(100);
    }
  }

  async function clear() {
    const len = editor.textContent.length;

    for (let i = 0; i < len; i++) {
      editor.textContent = editor.textContent.substring(
        0,
        editor.textContent.length - 1
      );
      setCursor(editor.textContent.length);
      await wait(50);
    }
  }

  let off;
  async function messageRotation() {
    const messages = [
      "a web developer",
      "a trail runner",
      "a student of classical piano",
      "Steven Kao",
    ];
    let messageIndex = 0;
    while (true) {
      await wait(1000);
      if (off) {
        continue;
      }

      const msg = messages[messageIndex % messages.length];
      await clear();
      await type(msg);
      messageIndex += 1;
    }
  }

  editor.addEventListener("focus", () => {
    off = false;
  });

  editor.addEventListener("blur", () => {
    off = true;
  });

      await wait(3000);
  cursorToEnd();
  messageRotation();
})();
