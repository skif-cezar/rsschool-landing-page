export const initSmoothScroll = () => {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const hash = link.getAttribute('href');

    if (!hash || hash === '#') return;

    let target;

    try {
      target = document.querySelector(hash);
    } catch (e) {
      return;
    }

    if (!target) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    // Move focus to the target section so keyboard/screen-reader users
    // land where the page scrolled to, without triggering another jump.
    const hadTabIndex = target.hasAttribute('tabindex');
    if (!hadTabIndex) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (!hadTabIndex) {
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }

    if (history.pushState) {
      history.pushState(null, '', hash);
    } else {
      window.location.hash = hash;
    }
  });
};
