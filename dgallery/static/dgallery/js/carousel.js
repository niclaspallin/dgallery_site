class Carousel
{
    constructor() {
        this.SLIDE_INTERVAL = 2500;
        this.currentIndex = 0;

        // Carousel
        this.carouselElement = document.getElementById('z-carousel-list');
        this.activeCarouselClass = 'z-carousel-active';
        this.numSlides = this.carouselElement.children.length;
        this.activeSlide = this.carouselElement.children[this.currentIndex];

        // Dots
        this.dotsContainerElement = document.getElementById('z-dot-container');
        this.dotsActiveClass = 'z-dot-active';

        this.setDots();
    }

    setDots() {
        this.dotsContainerElement.innerHTML = this.createDots();
    }

    createDots() {
        let dots = '';
        for(let i = 0; i < this.numSlides; i++) {
            dots += '<div class="z-dot ' + (i == 0 ? this.dotsActiveClass : '') + '"></div>';
        }
        return dots;
    }
    /**
     * @param {number} index Index of the next dot to set as active
     */
    setActiveDotByIndex(index) {
        let dots = this.dotsContainerElement.children;
        for(let i = 0; i < dots.length; i++) {
            if(i == index) {
                dots[i].classList.add(this.dotsActiveClass);
            } else {
                dots[i].classList.remove(this.dotsActiveClass);
            }
        }
    }

    showSlides() {
        
        if(++this.currentIndex > (this.numSlides - 1)) {
            this.currentIndex = 0;
        }

        let nextSlideIndex = (this.currentIndex + 1) % this.numSlides;
        this.setSlideByIndex(nextSlideIndex);
        this.setActiveDotByIndex(nextSlideIndex);
    }
    /**
     * @param {number} index Index of the next slide to show
     */
    setSlideByIndex(index) {
        this.activeSlide.classList.remove(this.activeCarouselClass);
        
        // Next slide
        let nextSlide = this.carouselElement.children[index];
        nextSlide.classList.add(this.activeCarouselClass);
        this.activeSlide =  nextSlide;
    }
    /**
     * Fetch a list of html elements, where each child element is a slide. Then iterate with a set interval
     * @param {number} slideInterval (Optional) Interval of slide switching
     */
    run(slideInterval) {
        setInterval(this.showSlides.bind(this), slideInterval || this.SLIDE_INTERVAL);
    }
}

let carousel = new Carousel();
carousel.run();
