const carouselImage = document.getElementById('profile-carousel-image');
const carouselTitle = document.getElementById('profile-carousel-title');
const carouselText = document.getElementById('profile-carousel-text');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

const slideElements = Array.from(document.querySelectorAll('.waifu-carousel .carousel-slide'));
const profileSlides = slideElements.map((slideEl) => {
  const img = slideEl.querySelector('img');
  return {
    image: img ? img.src : '',
    alt: img ? img.alt : '',
    game: slideEl.dataset.game || '',
    text: slideEl.dataset.text || '',
  };
});

let currentSlideIndex = 0;

function showSlide(index){
    const slide = profileSlides[index];

    if (!slide){
    return;
    }

  carouselImage.src = slide.image;
  carouselImage.alt = slide.alt;
  carouselTitle.textContent = slide.game;
  carouselText.textContent = slide.text;
}

function changeSlide(direction) {
  currentSlideIndex = (currentSlideIndex + direction + profileSlides.length) % profileSlides.length;
  showSlide(currentSlideIndex);
}

if (prevButton && nextButton && carouselImage && carouselTitle && carouselText){
  prevButton.addEventListener('click', () => changeSlide(-1));
  nextButton.addEventListener('click', () => changeSlide(1));
  document.addEventListener('keydown', (event) =>{
    if(event.key === 'ArrowLeft'){
        changeSlide(-1);
    }else if (event.key === 'ArrowRight'){
        changeSlide(1);
    }
  });
  showSlide(currentSlideIndex);
}
