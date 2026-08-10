const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const assetVersion = '20260810';
document.querySelectorAll('img[src^="assets/"]').forEach((image) => {
  const source = image.getAttribute('src');
  if (source && !source.includes('?')) image.setAttribute('src', `${source}?v=${assetVersion}`);
});

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !siteNav.classList.contains('open')) return;
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  });
}
