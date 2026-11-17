document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const navigationLinks = [...navigation.querySelectorAll('a')];

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menu.hidden = false;
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigationLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  } 
});
window.matchMedia('(max-width: 640px)').addEventListener('change', closeMenu);

const backToTop = document.querySelector('.back-to-top');
function updateScroll() {
  // The optional back-to-top link may be commented out in index.html.
  backToTop?.classList.toggle('is-visible', window.scrollY > 250);
  // Follow the current section, including sections without a navigation item.
  let active = null;
  for (const section of document.querySelectorAll('main section[id]')) {
    if (section.getBoundingClientRect().top <= 100) active = section.id;
  }
  for (const link of navigationLinks) {
    if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scrollScheduled = false;
window.addEventListener('scroll', () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(() => {
    updateScroll();
    scrollScheduled = false;
  });
}, { passive: true });
updateScroll();
