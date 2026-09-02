// Language detection/redirect/switcher for bilingual (EN/IT) blog posts.
// Driven entirely by data-post-* attributes on <html> — see CLAUDE.md.
(function () {
  var html = document.documentElement;
  var langs = (html.dataset.postLangs || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);

  function resolveLang(available, fallbackDefault) {
    if (!available || !available.length) return fallbackDefault;

    var stored = null;
    try { stored = localStorage.getItem('siteLang'); } catch (e) {}
    if (stored && available.indexOf(stored) !== -1) return stored;

    var browserLangs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || ''];
    for (var i = 0; i < browserLangs.length; i++) {
      var code = (browserLangs[i] || '').slice(0, 2).toLowerCase();
      if (available.indexOf(code) !== -1) return code;
    }

    return available.indexOf(fallbackDefault) !== -1 ? fallbackDefault : available[0];
  }

  window.LangUtil = { resolveLang: resolveLang };

  // Redirect stub (posts/<slug>/index.html for a dual-language post):
  // pick a language and hand off immediately. location.replace keeps the
  // stub out of browser history, so this is a single one-hop redirect —
  // en.html/it.html never redirect anywhere, so there is no loop.
  if (html.dataset.postStub === 'true' && langs.length) {
    var target = resolveLang(langs, html.dataset.postDefault || 'en');
    location.replace('./' + target + '.html');
    return;
  }

  // Switcher (only rendered on a post's own en.html/it.html when both exist).
  if (langs.length === 2) {
    document.addEventListener('DOMContentLoaded', function () {
      var mount = document.getElementById('lang-switch');
      if (!mount) return;

      var current = html.getAttribute('lang');
      var labels = { en: 'EN', it: 'IT' };

      mount.innerHTML = langs
        .map(function (lang) {
          return lang === current
            ? '<span class="current">' + labels[lang] + '</span>'
            : '<a href="./' + lang + '.html" data-lang="' + lang + '">' + labels[lang] + '</a>';
        })
        .join(' | ');

      mount.querySelectorAll('a[data-lang]').forEach(function (a) {
        a.addEventListener('click', function () {
          try { localStorage.setItem('siteLang', a.dataset.lang); } catch (e) {}
        });
      });
    });
  }
})();
