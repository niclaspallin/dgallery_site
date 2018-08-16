(function() {
    /**
     * Fetch a list of html elements, where each child element is a slide. Then iterate with a set interval
     */
    var SLIDE_INTERVAL = 2500;

    var $carouselUl = document.getElementById('z-carousel-list');
    var $dotContainer = document.getElementById('z-dot-container');
    var dotActiveClass = 'z-dot-active';
    
    var currentIndex = 0;
    var numSlides = $carouselUl.children.length;

    
    $dotContainer.innerHTML = createDots(dotActiveClass, numSlides);

    var activeSlide = $carouselUl.children[currentIndex];
    
    activeSlide.classList.add('z-carousel-active');

    function createDots(activeClass, numSlides) {
        var dots = '';
        for(var i = 0; i < numSlides; i++) {
            dots += '<div class="z-dot ' + (i == 0 ? activeClass : '') + '"></div>';
        }
        return dots;
    }

    function showSlides() {
        if(++currentIndex > (numSlides - 1)) {
            currentIndex = 0;
        }

        var nextSlideIndex = (currentIndex + 1) % numSlides;
        activeSlide = nextSlide(activeSlide, nextSlideIndex, numSlides);
        setActiveDot($dotContainer.children, nextSlideIndex);
    }

    function nextSlide(activeSlide, nextSlideIndex, numSlides) {
        activeSlide.classList.remove('z-carousel-active');
        
        // Next slide
        var nextSlide = $carouselUl.children[nextSlideIndex];
        nextSlide.classList.add('z-carousel-active');
        return nextSlide;
    }

    function setActiveDot(dots, activeIndex) {
        for(var j = 0; j < dots.length; j++) {
            if(j == activeIndex) {
                dots[j].classList.add(dotActiveClass);
            } else {
                dots[j].classList.remove(dotActiveClass);
            }
        }
    }

    setInterval(showSlides, SLIDE_INTERVAL);
})();
