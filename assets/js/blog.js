// Renders the .posts grid (homepage preview + /blog/ full listing) from
// window.POSTS (assets/js/posts-data.js). Requires lang.js for LangUtil.
(function () {
  function renderPosts(mount, posts) {
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

  function renderEmptyMessage(mount) {
    mount.innerHTML = '';
    var p = document.createElement('p');
    p.className = 'blog-filters-empty';
    p.textContent = 'No articles found.';
    mount.appendChild(p);
  }

  function matchesFilter(post, activeCategories) {
    if (!activeCategories.length) return true;
    var postCategories = post.categories || [];
    return activeCategories.some(function (cat) {
      return postCategories.indexOf(cat) !== -1;
    });
  }

  function renderFilterBar(bar, allPosts, onChange) {
    var usedCategories = (window.BLOG_CATEGORIES || []).filter(function (cat) {
      return allPosts.some(function (post) {
        return (post.categories || []).indexOf(cat) !== -1;
      });
    });

    var active = [];

    bar.innerHTML = '';

    if (!usedCategories.length) {
      onChange(active);
      return;
    }

    var buttonsWrap = document.createElement('div');
    buttonsWrap.className = 'blog-filters-buttons';

    var countEl = document.createElement('span');
    countEl.className = 'blog-filters-count';

    var resetBtn = document.createElement('a');
    resetBtn.href = '#';
    resetBtn.className = 'blog-filters-reset';
    resetBtn.textContent = 'Reset';

    function update() {
      buttons.forEach(function (btn) {
        var isActive = active.indexOf(btn.dataset.category) !== -1;
        btn.classList.toggle('active', isActive);
      });
      resetBtn.style.display = active.length ? '' : 'none';
      onChange(active, countEl);
    }

    var buttons = usedCategories.map(function (cat) {
      var btn = document.createElement('a');
      btn.href = '#';
      btn.className = 'blog-filters-button';
      btn.textContent = cat;
      btn.dataset.category = cat;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var i = active.indexOf(cat);
        if (i === -1) active.push(cat); else active.splice(i, 1);
        update();
      });
      buttonsWrap.appendChild(btn);
      return btn;
    });

    resetBtn.addEventListener('click', function (e) {
      e.preventDefault();
      active = [];
      update();
    });

    bar.appendChild(buttonsWrap);
    bar.appendChild(countEl);
    bar.appendChild(resetBtn);

    update();
  }

  function renderGrid(mount, opts) {
    if (!mount || !window.POSTS) return;
    opts = opts || {};

    var posts = window.POSTS.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
    if (opts.limit) posts = posts.slice(0, opts.limit);

    function draw(activeCategories, countEl) {
      var visible = posts.filter(function (post) {
        return matchesFilter(post, activeCategories);
      });

      if (countEl) {
        countEl.textContent = visible.length + (visible.length === 1 ? ' article' : ' articles') + ' found';
      }

      if (visible.length) {
        renderPosts(mount, visible);
      } else {
        renderEmptyMessage(mount);
      }
    }

    if (opts.filters) {
      var bar = document.createElement('div');
      bar.className = 'blog-filters';
      mount.parentNode.insertBefore(bar, mount);
      renderFilterBar(bar, posts, draw);
    } else {
      draw([]);
    }
  }

  window.renderGrid = renderGrid;
})();
