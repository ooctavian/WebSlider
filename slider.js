const fadeIn = [
  { opacity: '0' },
  { opacity: '1' }
];

const fadeOut = [
  { opacity: '1' },
  { opacity: '0' }
];


const animationTime = {
  duration: 2000,
  iterations: 1,
}

const ImageSlider = class {
  constructor() {
    this.Images = document.querySelectorAll(".slider .imageContainer img");
    this.currentImage = 0;
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.Images[this.currentImage].style.visibility = "visible";
  }
  changeImage(index) {
    let previousImage = this.currentImage;
    let animation = this.Images[this.currentImage].animate(fadeOut, animationTime);
    this.currentImage = index;
    this.Images[this.currentImage].style.visibility = "visible";
    this.Images[this.currentImage].animate(fadeIn, animationTime);
    animation.addEventListener("finish", () =>
      this.Images[previousImage].style.visibility = "hidden"
    )
    console.log(this.currentImage);
  }
  nextImage() {
    this.changeImage((this.currentImage + 1) % this.Images.length);
  }
  previousImage() {
    if (this.currentImage === 0)
      this.changeImage(this.Images.length - 1);
    else
      this.changeImage(this.currentImage - 1);
  }

}

let slider = new ImageSlider();

nextBtn = document.getElementById("next");
previousBtn = document.getElementById("previous");

nextBtn.addEventListener("click", slider.nextImage);
previousBtn.addEventListener("click", slider.previousImage);
