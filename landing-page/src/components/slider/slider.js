export const initSlider = () => {
    const sliderContainer = document.querySelector('.slider');
    const btnNext = document.querySelector('.slider_button--next');
    const btnPrev = document.querySelector('.slider_button--prev');
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelectorAll('.slider__indicator');

    if (!slides.length) {
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

    if (btnNext) btnNext.addEventListener('click', nextSlide);
    if (btnPrev) btnPrev.addEventListener('click', prevSlide);

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            index = i;
            activeSlide(index);
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeMinDistance = 40;

    const handleSwipe = () => {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance < -swipeMinDistance) {
            nextSlide();
        }
        
        if (swipeDistance > swipeMinDistance) {
            prevSlide();
        }
    };

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
    }
};