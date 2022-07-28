let animationOut = undefined;
let animationIn = undefined;

const animationTime = {
  duration: 500,
  iterations: 1,
}

const ImageSlider = class {
  constructor() {
    this.Images = document.querySelectorAll(".slider .imageContainer img");
    this.currentImage = 0;
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.Images[this.currentImage].style.visibility = "visible";
    this.animation = undefined;
    this.animation2 = undefined;
  }

  changeImage(index) {
    this.Images[index].style.visibility = "visible";
    if (typeof this.animation !== "undefined") this.animation.finish();
    if (typeof this.animation2 !== "undefined") this.animation2.finish();
    let previousImage = this.currentImage;
    let animation = this.Images[this.currentImage].animate(animationOut, animationTime);
    this.currentImage = index;
    this.animation2 = this.Images[this.currentImage].animate(animationIn, animationTime);
    animation.addEventListener("finish", () =>
      this.Images[previousImage].style.visibility = "hidden"
    )
    console.log(this.currentImage);
  }

  nextImage() {
    animationOut = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-100%)' }
    ];

    animationIn = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(0)' }
    ];

    this.changeImage((this.currentImage + 1) % this.Images.length);
  }

  previousImage() {
    // Changing animation type because scrolling needs 2 different animations for next and previous image
    animationIn = [
      { transform: 'translateX(-100%)' },
      { transform: 'translateX(0)' }
    ];

    animationOut = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(100%)' }
    ];

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
