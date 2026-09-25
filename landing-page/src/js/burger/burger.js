export const initBurger = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const body = document.body;
  const breakpoint = window.matchMedia('(max-width: 768px)');

  if (!burger || !nav) return;

  const openMenu = () => {
    burger.classList.add('is-active');
    nav.classList.add('is-open');
    body.classList.add('is-lock');

    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
  };

  const closeMenu = () => {
    burger.classList.remove('is-active');
    nav.classList.remove('is-open');
    body.classList.remove('is-lock');

    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  };

  const toggleMenu = () => {
    const isOpen = burger.classList.contains('is-active');
    isOpen ? closeMenu() : openMenu();
  };

  burger.addEventListener('click', toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (burger.classList.contains('is-active')) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burger.classList.contains('is-active')) {
      closeMenu();
    }
  });

  const handleBreakpointChange = (e) => {
    if (!e.matches && burger.classList.contains('is-active')) {
      closeMenu();
    }
  };

  breakpoint.addEventListener('change', handleBreakpointChange);
};