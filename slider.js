import Slide from './slide.js';

const Slider = (() => {

    const slides = [
        Slide('https://wallpapercave.com/wp/1ZLpfHy.jpg', 'Sunset over the ocean'),
        Slide('http://www.pixelstalk.net/wp-content/uploads/2016/08/Cool-Nature-Background-Images-4523x2590.jpg', 'Palm trees hanging over the ocean'),
        Slide('http://wallpapercave.com/wp/20niwZQ.jpg', 'Niagara waterfall'),
        Slide('https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-HD-Beautiful-Backgrounds-For-PC.jpg', 'Red blue forest')
    ]

    const sliderFrameElement = document.querySelector('div.slider > div.frame > ul.slider-frame');

    const getSlideElements = () => [...document.querySelectorAll('div.slider li.slide')];

    const updateMarker = newMarkerIndex => {
        const markerElements = [...document.querySelectorAll('li.slide-marker')];
        for (const marker of markerElements) {
            marker.classList.remove('chosen');
        }
        markerElements[newMarkerIndex].classList.add('chosen');
        const sliderMarkerFrameElement = document.querySelector('div.slider > div.frame > ul.marker-frame');
        sliderMarkerFrameElement.replaceChildren(...markerElements);
    }
    const showNextSlide = () => {
        const slideImageElements = getSlideElements();
        const currentSlideImage = getCurrentSlideElement();
        const currentSlideIndex = slideImageElements.findIndex(slide => slide.firstChild.src === currentSlideImage.src);
        slideImageElements[currentSlideIndex].classList.remove('visible');
        const nextSlideIndex = ((currentSlideIndex + 1) % slideImageElements.length).toString();
        slideImageElements[nextSlideIndex].classList.add('visible');
        sliderFrameElement.replaceChildren(...slideImageElements);
        updateMarker(nextSlideIndex);
    }

    const showPreviousSlide = () => {
        const slideImageElements = getSlideElements();
        const currentSlideImage = getCurrentSlideElement();
        const currentSlideIndex = slideImageElements.findIndex(slide => slide.firstChild.src === currentSlideImage.src);
        slideImageElements[currentSlideIndex].classList.remove('visible');
        const previousSlideIndex = ((slideImageElements.length + currentSlideIndex - 1) % slideImageElements.length).toString();
        slideImageElements[previousSlideIndex].classList.add('visible');
        sliderFrameElement.replaceChildren(...slideImageElements);
        updateMarker(previousSlideIndex);
    }

    const showChosenSlide = event => {
        event.stopPropagation();
        const slideImageElements = getSlideElements();
        const currentSlideImage = getCurrentSlideElement();
        const currentSlideIndex = slideImageElements.findIndex(slide => slide.firstChild.src === currentSlideImage.src);
        const chosenSliderIndex = parseInt(event.currentTarget.getAttribute('data-slider-index'));
        slideImageElements[currentSlideIndex].classList.remove('visible');
        slideImageElements[chosenSliderIndex].classList.add('visible');
        sliderFrameElement.replaceChildren(...slideImageElements);
        updateMarker(chosenSliderIndex);
    }

    const getSlides = () => [...slides];


    const getCurrentSlideElement = () => document.querySelector('li.visible > img');

    return {showNextSlide, showPreviousSlide, showChosenSlide, getSlides}
})();

export default Slider;