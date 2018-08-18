class ImageModal
{
    /**
     * @param {string} modalId Id of modal container
     */
    constructor(modalId) {
        this.BASE_URI = 'http://localhost:8000/gallery/api/pictures/';

        this.visibilityClass = 'z-modal-visible';
        this.modalId = modalId || 'z-modal';
        this.imageList = [];
        this.currentIndex = 0;

        this.modalElement = document.getElementById(this.modalId);
        this.modalElement.addEventListener('click', this.onModalClick.bind(this));

        [].forEach.call(document.querySelectorAll('a.click-me'), element => {
            element.addEventListener('click', triggerElement => {
                this.openModal(triggerElement);
            });
        });

        this.getImages(1)
            .then(images => {
                console.log('Images', images);
                this.imageList = images;
            });
    }

    onModalClick(event) {
        if(event.target.type !== 'button') {
            this.close();
        }
    }

    close() {
        this.modalElement.classList.remove(this.visibilityClass);
    }

    getImages(album_id) {
        return fetch(this.BASE_URI + album_id)
            .then(response => response.json())
            .catch(error => console.error('Error retrieving images', error));
            
    }

    /**
     * Set the contents of the modal, the body
     * @param {string} modalBodyContent HTML that will remain inside the modal body, e.g. an image
     */
    setModalBody(modalBodyContent) {
        this.modalElement.innerHTML = '<div class="z-modal-body">' + modalBodyContent + 
        '<div class="z-modal-navigation"><button type="button" class="z-modal-btn-prev" id="z-modal-btn-prev">&lt;</button>' + 
        '<button type="button" class="z-modal-btn-next" id="z-modal-btn-next">&gt;</button></div></div>';

        let modalNextElement = document.getElementById('z-modal-btn-next');
        modalNextElement.addEventListener('click', event => {
            event.preventDefault();
            this.showNextImage();
        });

        let modalPrevElement = document.getElementById('z-modal-btn-prev');
        modalPrevElement.addEventListener('click', event => {
            event.preventDefault();
            this.showPreviousmage();
        });
    }
    /**
     * 
     * @param {HTMLElement} triggerElement Element that triggers modal open, it's required to have the "data-value" attribute attached to it, the value being the image source of image to show
     */
    createImage(imgSrc) {
        return '<img src="' + imgSrc + '" style="max-height: 100%; max-width: 100%;" class="img-fit-contain">';
    }

    openModal(triggerElement) {
        // Set the modal to visible
        this.modalElement.classList.add(this.visibilityClass);
        // Set the contents of modal to an image
        let imgSrc = triggerElement.currentTarget.getAttribute('data-value');
        this.setModalBody(this.createImage(imgSrc));
    }

    showNextImage() {
        let nextImageIndex = (this.currentIndex + 1) % this.imageList.length;
        this.currentIndex = nextImageIndex;
        let imgSrc = this.imageList[nextImageIndex].image;
        this.setModalBody(this.createImage('/media/' + imgSrc));
    }

    showPreviousmage() {
        let previousIndex = this.currentIndex - 1;
        if(previousIndex < 0) {
            previousIndex = this.imageList.length - 1;
        }
        this.currentIndex = previousIndex;
        let imgSrc = this.imageList[previousIndex].image;
        this.setModalBody(this.createImage('/media/' + imgSrc));
    }
}

const modal = new ImageModal();
