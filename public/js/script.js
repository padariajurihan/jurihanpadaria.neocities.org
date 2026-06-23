const carouselImage = document.getElementById('profile-carousel-image');
const carouselTitle = document.getElementById('profile-carousel-title');
const carouselText = document.getElementById('profile-carousel-text');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

const slideElements = Array.from(document.querySelectorAll('.waifu-carousel .carousel-slide'));
const profileSlides = slideElements.map((slideEl) =>{
  const img = slideEl.querySelector('img');
  return{
    image: img ? img.src : '',
    alt: img ? img.alt : '',
    game: slideEl.dataset.game || '',
    text: slideEl.dataset.text || '',
  };
});

let currentSlideIndex = 0;

function showSlide(index){
    const slide = profileSlides[index];

    if(!slide){
    return;
    }

  carouselImage.src = slide.image;
  carouselImage.alt = slide.alt;
  carouselTitle.textContent = slide.game;
  carouselText.textContent = slide.text;
}

let waifuIndex = null;
const KNOWN_WAIFU_INDEX_PATHS = [
  '../waifus.html',
  'waifus.html',
  './waifus.html',
  '/waifulist/waifus.html',
  '/public/waifulist/waifus.html'
];

async function loadWaifuIndex(){
  if(Array.isArray(waifuIndex)) return waifuIndex;
  const parser = new DOMParser();

  for(const path of KNOWN_WAIFU_INDEX_PATHS){
    try{
      const response = await fetch(path, { cache: 'no-store' });
      if(!response.ok) continue;
      const html = await response.text();
      const doc = parser.parseFromString(html, 'text/html');
      const links = Array.from(doc.querySelectorAll('.waifu-wiki .content-section ul li a'));
      if(links.length > 0){
        waifuIndex = links.map(link => ({
          text: link.textContent.trim(),
          href: new URL(link.getAttribute('href') || '', response.url).href
        }));
        return waifuIndex;
      }
    }catch(e){
      continue;
    }
  }

  waifuIndex = [];
  return waifuIndex;
}

async function getWaifuLinks(){
  const localLinks = Array.from(document.querySelectorAll('.waifu-wiki .content-section ul li a'))
    .map(link => ({
      text: link.textContent.trim(),
      href: link.getAttribute('href') || ''
    }));

  return localLinks.length > 0 ? localLinks : await loadWaifuIndex();
}

function getOrCreateSuggestionsContainer(){
  let suggestions = document.getElementById('searchSuggestions');
  if(suggestions) return suggestions;

  const searchBar = document.getElementById('searchBar');
  if(!searchBar) return null;

  const wrapper = document.createElement('div');
  wrapper.id = 'searchSuggestions';
  wrapper.className = 'search-suggestions';
  wrapper.setAttribute('aria-live', 'polite');

  if(searchBar.parentNode){
    if(searchBar.parentNode.classList.contains('search-wrapper')){
      searchBar.parentNode.appendChild(wrapper);
    }else{
      const container = document.createElement('div');
      container.className = 'search-wrapper';
      searchBar.parentNode.insertBefore(container, searchBar);
      container.appendChild(searchBar);
      container.appendChild(wrapper);
    }
  }

  return wrapper;
}

// Navbar hamburger toggle for mobile
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  if(navToggle && navMenu){
    navToggle.addEventListener('click', function(e){
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function(){
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function(e){
      if(!navMenu.contains(e.target) && !navToggle.contains(e.target)){
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const searchBar = document.getElementById('searchBar');
  if(searchBar){
    searchBar.addEventListener('input', filtrarWaifus);
    getOrCreateSuggestionsContainer();
  }
});

function changeSlide(direction){
  currentSlideIndex = (currentSlideIndex + direction + profileSlides.length) % profileSlides.length;
  showSlide(currentSlideIndex);
}

if(prevButton && nextButton && carouselImage && carouselTitle && carouselText){
  prevButton.addEventListener('click', () => changeSlide(-1));
  nextButton.addEventListener('click', () => changeSlide(1));
  document.addEventListener('keydown', (event) =>{
    if(event.key === 'ArrowLeft'){
        changeSlide(-1);
    }else if(event.key === 'ArrowRight'){
        changeSlide(1);
    }
  });
  showSlide(currentSlideIndex);
}

async function filtrarWaifus(){
    const searchBar = document.getElementById('searchBar');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if(!searchBar || !suggestionsContainer) return;

    const input = searchBar.value.trim().toLowerCase();
    const waifuLists = document.querySelectorAll('.waifu-wiki .content-section ul');
    const waifuLinks = await getWaifuLinks();

    waifuLists.forEach(ul =>{
        const itens = ul.getElementsByTagName('li');
        let itensVisiveisNaLista = 0;

        for(let i = 0; i < itens.length; i++){
            const link = itens[i].getElementsByTagName('a')[0];
            const textoLink = link ? (link.textContent || link.innerText) : '';

            if(input === "" || textoLink.toLowerCase().includes(input)){
                itens[i].style.display = "";
                itensVisiveisNaLista++;
            }else{
                itens[i].style.display = "none";
            }
        }

        const tituloLista = ul.previousElementSibling;
        if(tituloLista && tituloLista.tagName === 'H3'){
            tituloLista.style.display = (itensVisiveisNaLista === 0 && input !== "") ? 'none' : '';
        }
    });

    if(input === ""){
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.classList.remove('active');
        return;
    }

    const suggestions = waifuLinks
        .filter(item => item.text.toLowerCase().includes(input))
        .slice(0, 8);

    if(suggestions.length === 0){
        suggestionsContainer.innerHTML = '<div class="no-results">No matching waifus found.</div>';
        suggestionsContainer.classList.add('active');
        return;
    }

    suggestionsContainer.innerHTML = suggestions
        .map(item => `<a href="${item.href}" class="suggestion-item">${item.text}</a>`)
        .join('');
    suggestionsContainer.classList.add('active');
}
