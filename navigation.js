const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
const header = menuButton.closest('header');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('path').setAttribute('d', open ? 'M5 5l14 14M19 5L5 19' : 'M2 5h20M2 12h20M2 19h20');
}

menuButton.hidden = false;
menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', () => setMenuOpen(false));
document.addEventListener('click', event => {
  if (!header.contains(event.target)) setMenuOpen(false);
});
header.addEventListener('focusout', event => {
  if (!header.contains(event.relatedTarget)) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});
window.matchMedia('(max-width: 960px)').addEventListener('change', () => setMenuOpen(false));
