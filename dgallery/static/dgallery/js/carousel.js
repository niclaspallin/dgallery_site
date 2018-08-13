(function() {
    var $carouselUl = document.getElementById('z-carousel-list');
    
    var currentIndex = 0;
    var slideInterval = 2500;
    var count = $carouselUl.children.length;
    /*
    Array($carouselUl.children).forEach(function(item) {
        console.log('Item', item);
    });
    */

    var slides = $carouselUl.getElementsByClassName('z-carousel-item');

    var activeSlide = $carouselUl.children[currentIndex];
    
    activeSlide.classList.add('z-carousel-active');

    function showSlides() {
        if(++currentIndex > (count - 1)) {
            currentIndex = 0;
        }
        console.log('Change slide', (currentIndex) % count);
        activeSlide.classList.remove('z-carousel-active');
        // Next slide
        var nextSlide = $carouselUl.children[(currentIndex + 1) % count];
        nextSlide.classList.add('z-carousel-active');

        activeSlide = nextSlide;
    }

    setInterval(showSlides, slideInterval);
})();
