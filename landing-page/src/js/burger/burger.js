export const initBurger = () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');

    burger.addEventListener('click', () => {
        const isOpen = burger.classList.toggle('is-active');
        menu.classList.toggle('is-open');

        burger.setAttribute('aria-expanded', isOpen);
        burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });
}