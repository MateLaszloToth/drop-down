import Slider from "./slider.js";

const Controller = (() => {

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
        const markerElements = [...document.querySelector('ul.slide-markers > li')];
        for (const marker of markerElements) {
            marker.addEventListener('click', e => Slider.showChosenSlide(e))
        }
    }

    const initializeSlideShow = () => {
        addEventListenerToArrows();
        addEventListenerToMarkers();
        startSlideShow();
    }

    return {initializeSlideShow};
})();

export default Controller;