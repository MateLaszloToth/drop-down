import Slide from './slide.js';

export default (() => {

    const pictures = [
        Slide('https://wallpapercave.com/wp/1ZLpfHy.jpg', 'Sunset over the ocean'),
        Slide('http://www.pixelstalk.net/wp-content/uploads/2016/08/Cool-Nature-Background-Images-4523x2590.jpg', 'Palm trees hanging over the ocean'),
        Slide('http://wallpapercave.com/wp/20niwZQ.jpg', 'Niagara waterfall'),
        Slide('https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-HD-Beautiful-Backgrounds-For-PC.jpg', 'Red blue forest')
    ]

    const markers = [...document.querySelectorAll('li.slide-marker')];

    const updateMarker = newMarkerIndex => {
        for(const marker of markers) { marker.classList.remove('chosen'); }
        markers.find(it => it.getAttribute('data-slider-index') === newMarkerIndex).classList.add('chosen');
    }
    const showNextSlide = () => {
        const currentSlide = getCurrentSlide();
        currentSlide.classList.remove('visible');
        const currentSlideIndex = (pictures.findIndex(slide => slide.url === currentSlide.url)).toString();
        const nextSlideIndex = ((currentSlideIndex + 1) % pictures.length).toString();
        pictures[nextSlideIndex].classList.add('visible');
        updateMarker(nextSlideIndex);
    }

    const showPreviousSlide = () => {
        const currentSlide = getCurrentSlide();
        currentSlide.classList.remove('visible');
        const currentSlideIndex = (pictures.findIndex(slide => slide.url === currentSlide.url)).toString();
        const previousSlideIndex = ((pictures.length + currentSlideIndex - 1) % pictures.length).toString();
        pictures[previousSlideIndex].classList.add('visible');
        updateMarker(previousSlideIndex);
    }

    const showChosenSlide = event => {
        const currentSlide = getCurrentSlide();
        currentSlide.classList.remove('visible');
        const chosenSliderIndex = event.currentTarget.getAttribute('data-slider-index');
        pictures[chosenSliderIndex].classList.add('visible');
        updateMarker(chosenSliderIndex);
    }

    const getCurrentSlide = () => document.querySelector('div.visible');

    return {showNextSlide, showPreviousSlide, showChosenSlide}
})();