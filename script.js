class Carousel {
    index = 0
    
    carousel
    imageContainer
    progressContainer
    rightButton
    leftButton
    
    elementNumber = () => this.imageContainer.children.length;

    constructor(carousel) {
        this.carousel = carousel;
        this.imageContainer = this.carousel.querySelectorAll('.carousel-image-container')[0];
        this.progressContainer = this.carousel.querySelectorAll('.carousel-progress-container')[0];

        this.rightButton = this.carousel.querySelectorAll('.right-carousel-button')[0];
        this.leftButton = this.carousel.querySelectorAll('.left-carousel-button')[0];

        this.rightButton.addEventListener('click', this.rightAdvance)
        this.leftButton.addEventListener('click', this.leftAdvance)

        this.progressContainer.innerHTML = '';
        for (let i = 0; i < this.elementNumber(); i++) {
            const newProgress = document.createElement('div');
            newProgress.classList.add('carousel-progress-section');
            newProgress.addEventListener('click', (e) => { this.setIndex(i) });
            this.progressContainer.appendChild(newProgress);
        }

        window.addEventListener("keydown", (e) => 
            {
                if (e.key === "ArrowLeft"){
                    this.leftAdvance();
                } else if (e.key === "ArrowRight"){
                    this.rightAdvance();
                }
            }
        )
        this.updateImages();
    }

    updateImages = () => {
        for (let i = 0; i < this.elementNumber(); i++) {
            const image = this.imageContainer.children[i];
            image.style.display = i == this.index ? "flex" : "none";
            const progress = this.progressContainer.children[i];
            progress.style.backgroundColor = i == this.index ? "black" : "";
        }

    }
    rightAdvance = () => {
        this.index = this.index == this.elementNumber()-1 ? 0 : this.index + 1;
        this.updateImages();
    }
    leftAdvance = () => {
        this.index = this.index == 0 ? this.elementNumber()-1 : this.index - 1;
        this.updateImages();
    }
    setIndex = (newIndex) => {
        this.index = Math.max( 0, Math.min( newIndex, this.elementNumber()-1 ) );
        this.updateImages();
    }

}



document.addEventListener("DOMContentLoaded", function(e) 
    {
        new Carousel(document.getElementsByClassName('carousel-container')[0]);
    }
)