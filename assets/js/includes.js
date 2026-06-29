(function () {
  var header = document.getElementById('header');
  if (header) {
    header.innerHTML = `
      <a href="/" class="logo">
        <img src="/images/logo-L-black.svg" alt="" height="24" />
        <strong>Leonardo</strong> Del Bino
      </a>
      <ul class="icons">
        <li><a href="https://www.linkedin.com/in/leonardodelbino/" class="icon brands fa-linkedin"><span class="label">LinkedIn</span></a></li>
        <li><a href="https://github.com/Lyonnard" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
        <li><a href="https://www.instagram.com/leonardodelbino/" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
      </ul>
    `;
  }

  var sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="inner">
        <nav id="menu">
          <header class="major">
            <h2>Menu</h2>
          </header>
          <ul>
            <li><a href="/">Homepage</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/bucket-list/">Bucket List</a></li>
          </ul>
        </nav>
        <section>
          <header class="major">
            <h2>Get in touch</h2>
          </header>
          <ul class="contact">
            <li class="icon solid fa-envelope"><a href="mailto:leonardo@akhetonics.com">leonardo@akhetonics.com</a></li>
            <li class="icon solid fa-home">80997 München,<br />Germany</li>
          </ul>
        </section>
        <footer id="footer">
          <p class="copyright">
            &copy; Leonardo Del Bino. All rights reserved.<br>
            Design adapted from: <a href="https://html5up.net">HTML5 UP</a>.
          </p>
        </footer>
      </div>
    `;
  }
})();
