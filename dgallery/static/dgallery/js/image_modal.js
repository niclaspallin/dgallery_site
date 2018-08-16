(function() {

    var modal = document.getElementById('z-modal');
    var visibilityClass = 'z-modal-visible';


    modal.addEventListener('click', function(event) {
        modal.classList.remove(visibilityClass);
    });

    [].forEach.call(document.querySelectorAll('a.click-me'), function(el) {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            var imgSrc = this.getAttribute('data-value');
            console.log('this', imgSrc);
            modal.classList.add(visibilityClass);
            //modal.style.display = 'block';
            modal.innerHTML = '<div class="z-modal-body"><img src="' + imgSrc + '" style="max-height: 100%; max-width: 100%;" class="img-fit-contain"></div>';
        });
    })

})();
