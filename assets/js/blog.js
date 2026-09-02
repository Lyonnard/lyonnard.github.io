// Renders the .posts grid (homepage preview + /blog/ full listing) from
// window.POSTS (assets/js/posts-data.js). Requires lang.js for LangUtil.
(function () {
  function renderGrid(mount, opts) {
    if (!mount || !window.POSTS) return;
    opts = opts || {};

    var posts = window.POSTS.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
    if (opts.limit) posts = posts.slice(0, opts.limit);

    mount.innerHTML = '';

    posts.forEach(function (post) {
      var langKeys = Object.keys(post.langs);
      var lang = (window.LangUtil && window.LangUtil.resolveLang(langKeys, 'en')) || langKeys[0];
      var entry = post.langs[lang] || post.langs[langKeys[0]];
      var url = '/posts/' + post.slug + '/';

      var article = document.createElement('article');

      if (post.image) {
        var link = document.createElement('a');
        link.href = url;
        link.className = 'image';
        var img = document.createElement('img');
        img.src = post.image;
        img.alt = '';
        link.appendChild(img);
        article.appendChild(link);
      }

      var h3 = document.createElement('h3');
      h3.textContent = entry.title;
      article.appendChild(h3);

      var p = document.createElement('p');
      p.textContent = entry.excerpt;
      article.appendChild(p);

      var actions = document.createElement('ul');
      actions.className = 'actions';
      var li = document.createElement('li');
      var more = document.createElement('a');
      more.href = url;
      more.className = 'button';
      more.textContent = 'More';
      li.appendChild(more);
      actions.appendChild(li);
      article.appendChild(actions);

      mount.appendChild(article);
    });
  }

  window.renderGrid = renderGrid;
})();
