(function () {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      closeNav();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var terminalLines = [
    { prompt: '$ ', text: 'whoami' },
    { prompt: '> ', text: 'Diego Venancio — dev freelancer', isOutput: true },
    { prompt: '', text: '' },
    { prompt: '$ ', text: 'cat missao.txt' },
    { prompt: '> ', text: 'sites e sistemas de gestao', isOutput: true },
    { prompt: '> ', text: 'sob medida p/ pequenas empresas', isOutput: true },
    { prompt: '', text: '' },
    { prompt: '$ ', text: 'ls habilidades/' },
    { prompt: '> ', text: 'html css js python fastapi sql git', isOutput: true }
  ];

  var codeEl = document.getElementById('terminalCode');
  var cursorEl = document.getElementById('terminalCursor');

  function renderStatic() {
    var html = '';
    terminalLines.forEach(function (line) {
      var span = line.isOutput ? 'terminal-output' : 'terminal-prompt';
      html += '<span class="' + span + '">' + line.prompt + line.text + '</span>\n';
    });
    codeEl.innerHTML = html;
  }

  function typeLines(lines, lineIndex, charIndex) {
    if (lineIndex >= lines.length) {
      return;
    }

    var line = lines[lineIndex];
    var span = line.isOutput ? 'terminal-output' : 'terminal-prompt';

    if (charIndex === 0) {
      var wrapper = document.createElement('span');
      wrapper.className = span;
      wrapper.id = 'typing-line-' + lineIndex;
      codeEl.appendChild(wrapper);
      codeEl.appendChild(document.createTextNode('\n'));
    }

    var fullText = line.prompt + line.text;
    var current = document.getElementById('typing-line-' + lineIndex);

    if (charIndex <= fullText.length) {
      current.textContent = fullText.slice(0, charIndex);
      setTimeout(function () {
        typeLines(lines, lineIndex, charIndex + 1);
      }, line.isOutput ? 12 : 28);
    } else {
      setTimeout(function () {
        typeLines(lines, lineIndex + 1, 0);
      }, line.text ? 220 : 40);
    }
  }

  if (reduceMotion) {
    renderStatic();
  } else {
    typeLines(terminalLines, 0, 0);
  }
})();
