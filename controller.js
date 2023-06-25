import Slider from "./slider.js";

const Controller = (() => {
    const sliderFrame = document.querySelector('div.slider > div.frame > ul.slider-frame');
    const slideMarkers = document.querySelector('div.slider > div.frame > ul.marker-frame');

    const SECOND_IN_MILLIS = 1000;
    const startSlideShow = () => {
        setTimeout(() => {
            Slider.showNextSlide();
            startSlideShow();
        }, 5 * SECOND_IN_MILLIS)
    }

    const addEventListenerToArrows = () => {
        const backButtonElement = document.querySelector('div.slider > button.back');
        backButtonElement.addEventListener('click', Slider.showPreviousSlide);

        const nextButtonElement = document.querySelector('div.slider > button.next');
        nextButtonElement.addEventListener('click', Slider.showNextSlide);
    }

    const addEventListenerToMarkers = () => {
        const markerElements = [...slideMarkers.children];
        for (const marker of markerElements) {
            marker.addEventListener('click', e => Slider.showChosenSlide(e))
        }
    }

    const createSlideElements = () => {
        const slides = Slider.getSlides().map(slide => {
                const img = document.createElement('img');
                img.alt = slide.alt;
                img.src = slide.url

                const li = document.createElement('li');
                li.classList.add('slide');
                li.append(img);
                return li;
            }
        )
        slides[0].classList.add('visible');
        return slides;
    }

    const createSlideMarkerElements = () => {
        const markers = Slider.getSlides().map((_, index) => {
            const marker = document.createElement('li');
            marker.classList.add('slide-marker');
            marker.setAttribute('data-slider-index', index);
            return marker;
        })
        markers[0].classList.add('chosen');
        return markers;
    }

    const initializeSlideShow = () => {
        sliderFrame.replaceChildren(...createSlideElements());
        slideMarkers.replaceChildren(...createSlideMarkerElements());
        addEventListenerToArrows();
        addEventListenerToMarkers();
        startSlideShow();
    }

    return {initializeSlideShow};
})();

export default Controller;