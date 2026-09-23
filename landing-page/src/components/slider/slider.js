export const initSlider = () => {
    const btnNext = document.querySelector('.slider_button--next');
    const btnPrev = document.querySelector('.slider_button--prev');
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelectorAll('.slider__indicator');

    if (!slides.length || !btnNext || !btnPrev) {
        return;
    }

    let index = 0;

    const activeSlide = (n) => {
        slides.forEach((slide) => slide.classList.remove('active'));
        slides[n].classList.add('active');

        if (indicators.length) {
            indicators.forEach((indicator) => indicator.classList.remove('active'));
            indicators[n].classList.add('active');
        }
    };

    const nextSlide = () => {
        index = (index === slides.length - 1) ? 0 : index + 1;
        activeSlide(index);
    };

    const prevSlide = () => {
        index = (index === 0) ? slides.length - 1 : index - 1;
        activeSlide(index);
    };

    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            index = i;
            activeSlide(index);
        });
    });
};