/* works.js – project list + project view (works.html). Needs lang.js loaded first. */
(() => {
  // ---- Edit this list: one entry per project. Leave year/zh empty if unknown. ----
  const PROJECTS = [
    { id: 'intimate-lover',        year: '2026', title: 'INTIMATE LOVER: A REFLEXIVE ARTIFICIAL', zh: '亲密爱人：一个自反的AI智能体' },
    { id: 'backroom-to-lingjing',  year: '', title: 'THE BACKROOM TO LINGJING', zh: '' },
    { id: 'trained-nihil',         year: '', title: 'TRAINED NIHIL',            zh: '' },
    { id: 'before-mom-comes-home', year: '', title: 'BEFORE MOM COMES HOME',    zh: '' },
    { id: 'just-a-trace',          year: '', title: 'JUST A TRACE',             zh: '' },
    { id: 'are-you-lost',          year: '', title: 'ARE YOU LOST',             zh: '' },
    { id: 'no-dawn-in-sight',      year: '', title: 'NO DAWN IN SIGHT',         zh: '' },
    { id: 'engulfed-sun',          year: '', title: 'ENGULFED SUN',             zh: '' },
  ].map((p, i) => ({
    ...p,
    n: String(i + 1).padStart(2, '0'),
    img: `images/works/${p.id}.jpg`,                                   // cover image
    path: `archive/works/${p.id.split('-').slice(0, 2).join('-')}`,    // caption text
    url: `projects/${p.id}.html`                                       // "open project" target
  }));

  const $list = document.getElementById('projects');
  const $main = document.getElementById('project');

  const currentId = () => (location.hash.match(/^#work\/(.+)$/) || [])[1] || PROJECTS[0].id;

  function render() {
    const p = PROJECTS.find(x => x.id === currentId()) || PROJECTS[0];
    const zh = SiteLang.get() === 'zh' && p.zh;      // Chinese title first when we have one
    const big = zh ? p.zh : p.title;
    const small = zh ? p.title : p.zh;

    $list.innerHTML = PROJECTS.map(x => `
      <li><a class="proj" href="#work/${x.id}" ${x.id === p.id ? 'aria-current="page"' : ''}>
        <span class="n">${x.n}</span><span class="t">${x.title}</span></a></li>`).join('');

    $main.innerHTML = `
      ${p.year ? `<div class="year">${p.year}</div>` : ''}
      <h1>${big}</h1>
      ${small ? `<p class="sub">${small}</p>` : ''}
      <div class="cover">
        <div class="frame"><img src="${p.img}" alt="${p.title}" onerror="this.remove()"></div>
        <div class="caption"><span>${p.path}</span><a href="${p.url}">[ ${SiteLang.t('open')} → ]</a></div>
      </div>`;
    document.title = `Chen Pengfan – ${p.title}`;
  }

  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
  SiteLang.onChange(render);
  render();
})();
