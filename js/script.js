// Imagens do carrossel (use o mesmo caminho para todas)
const carouselImages = [
    "img/ImgSobre1.png",
    "img/ImgSobre2.png",
    "img/ImgSobre3.png",
    "img/ImgMain.png"
];

let currentIndex = 0;
const carouselImg = document.querySelector('.carousel-img');
const leftBtn = document.querySelector('.carousel-arrow-left');
const rightBtn = document.querySelector('.carousel-arrow-right');
let carouselInterval;

// Função para atualizar a imagem
function updateCarousel() {
    carouselImg.src = carouselImages[currentIndex];
}

// Função para ir para a próxima imagem
function nextImage() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
}

// Função para ir para a imagem anterior
function prevImage() {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
}

// Troca automática a cada 4 segundos
function startCarousel() {
    carouselInterval = setInterval(nextImage, 4000);
}

// Parar o carrossel automático ao interagir
function stopCarousel() {
    clearInterval(carouselInterval);
}

// Eventos dos botões
leftBtn.addEventListener('click', () => {
    stopCarousel();
    prevImage();
    startCarousel();
});

rightBtn.addEventListener('click', () => {
    stopCarousel();
    nextImage();
    startCarousel();
});

// Inicialização
updateCarousel();
startCarousel();