class Modal
{
    /**
     * @param {string} modalId Id of modal container
     */
    constructor(modalId) {
        this.visibilityClass = 'z-modal-visible';
        this.modalId = modalId || 'z-modal';

        this.modalElement = document.getElementById(this.modalId);
        this.modalElement.addEventListener('click', this.onModalClick.bind(this));

        [].forEach.call(document.querySelectorAll('a.click-me'), element => {
            element.addEventListener('click', this.openModal.bind(this));
        });
    }

    onModalClick() {
        this.modalElement.classList.remove(this.visibilityClass);
    }

    /**
     * Set the contents of the modal, the body
     * @param {string} modalBodyContent HTML that will remain inside the modal body, e.g. an image
     */
    setModalBody(modalBodyContent) {
        this.modalElement.innerHTML = '<div class="z-modal-body">' + modalBodyContent + 
        '<div class="z-modal-navigation"><button type="button" class="z-modal-btn-prev">&lt;</button>' + 
        '<button type="button" class="z-modal-btn-next">&gt;</button></div></div>';
    }

    openModal() {
        this.modalElement.classList.add(this.visibilityClass);

        let imgSrc = this.getAttribute('data-value');
        let content = '<img src="' + imgSrc + '" style="max-height: 100%; max-width: 100%;" class="img-fit-contain">';
        this.setModalBody(content);
    }
}

const modal = new Modal();
