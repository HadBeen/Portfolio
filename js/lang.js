/* lang.js – shared language toggle. Load first on every page.
 *
 * Markup it understands:
 *   <button data-lang="zh">中文</button> <button data-lang="en">EN</button>
 *   <a data-i18n="about">…</a>             (text replaced from the dictionary)
 *
 * Pages can add their own strings:   SiteLang.extend({ en: { key: '…' }, zh: { key: '…' } })
 * and react to changes with:         SiteLang.onChange(lang => …)
 */
(() => {
  const DEFAULT_LANG = 'zh';
  const KEY = 'lang';
  const dict = {
    en: { about: 'about', works: 'works', open: 'open project' },
    zh: { about: '关于',  works: '作品',  open: '打开项目' }
  };
  const listeners = [];

  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const write = v => { try { localStorage.setItem(KEY, v); } catch (e) {} };

  const saved = read();
  let lang = saved in dict ? saved : DEFAULT_LANG;

  function t(key) { return (dict[lang] && dict[lang][key]) || dict.en[key] || key; }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    listeners.forEach(fn => fn(lang));
  }

  function set(next) {
    if (!(next in dict) || next === lang) return;
    lang = next; write(lang); apply();
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) set(b.dataset.lang);
  });

  window.SiteLang = {
    get: () => lang,
    set, t,
    extend(extra) { for (const l in extra) dict[l] = { ...dict[l], ...extra[l] }; apply(); },
    onChange(fn) { listeners.push(fn); }
  };

  apply();
})();
