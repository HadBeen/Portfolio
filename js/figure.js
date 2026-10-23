/* figure.js – the figure leans toward whatever you hover (index.html) */
(() => {
  const figure = document.getElementById('figure');
  if (!figure) return;
  const root = document.documentElement;

  // Elements that make the figure react. Add data-move="x,y,rotate,scale" to any element
  // for a custom pose, e.g. data-move="-12,6,-2,1.02".
  const TARGETS = 'a, button, .exh li, .section-title, .label, .content p';

  const MAX_SHIFT = 14;   // px
  const MAX_ROT = 1.6;    // deg
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function setPose(x = 0, y = 0, r = 0, s = 1) {
    root.style.setProperty('--fx', x + 'px');
    root.style.setProperty('--fy', y + 'px');
    root.style.setProperty('--fr', r + 'deg');
    root.style.setProperty('--fs', s);
  }

  function poseFor(el) {
    const custom = el.closest('[data-move]');
    if (custom) {
      const [x, y, r, s] = custom.dataset.move.split(',').map(Number);
      return [x || 0, y || 0, r || 0, s || 1];
    }
    const b = el.getBoundingClientRect();
    const fb = figure.getBoundingClientRect();
    const nx = clamp(((b.left + b.width / 2) - (fb.left + fb.width / 2)) / window.innerWidth, -1, 1);
    const ny = clamp(((b.top + b.height / 2) - window.innerHeight / 2) / window.innerHeight * 2, -1, 1);
    return [nx * MAX_SHIFT, ny * MAX_SHIFT * 0.5, nx * MAX_ROT, 1.01];
  }

  document.addEventListener('mouseover', e => {
    const el = e.target.closest(TARGETS);
    if (el) setPose(...poseFor(el));
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(TARGETS) && !(e.relatedTarget && e.relatedTarget.closest(TARGETS))) setPose();
  });
})();
