/* ==========================================================================
   GALLERY IMAGE VIEWER
   ========================================================================== */

class GalleryViewer {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createViewer();
        this.bindEvents();
        this.collectImages();
    }

    createViewer() {
        // Criar o container do visualizador com as novas imagens das setas
        const viewerHTML = `
            <div id="gallery-viewer" class="gallery-viewer">
                <div class="gallery-viewer-overlay"></div>
                <div class="gallery-viewer-container">
                    <button class="gallery-viewer-close" aria-label="Fechar visualizador">&times;</button>
                    <button class="gallery-viewer-prev" aria-label="Imagem anterior">
                        <img src="img/SetaEsquerdaCarousel.png" alt="Seta esquerda">
                    </button>
                    <button class="gallery-viewer-next" aria-label="Próxima imagem">
                        <img src="img/SetaDireitaCarousel.png" alt="Seta direita">
                    </button>
                    <div class="gallery-viewer-content">
                        <img id="gallery-viewer-image" src="" alt="">
                        <div class="gallery-viewer-counter">
                            <span id="gallery-current">1</span> / <span id="gallery-total">32</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', viewerHTML);
        this.viewer = document.getElementById('gallery-viewer');
        this.viewerImage = document.getElementById('gallery-viewer-image');
        this.currentCounter = document.getElementById('gallery-current');
        this.totalCounter = document.getElementById('gallery-total');
    }

    collectImages() {
        // Coletar todas as imagens da galeria
        const photoItems = document.querySelectorAll('.photo-item img');
        this.images = Array.from(photoItems).map(img => ({
            src: img.src,
            alt: img.alt
        }));
        
        // Atualizar contador total
        this.totalCounter.textContent = this.images.length;

        // Adicionar event listeners para abrir o visualizador
        photoItems.forEach((img, index) => {
            img.addEventListener('click', () => this.openViewer(index));
            img.style.cursor = 'pointer';
        });
    }

    bindEvents() {
        // Event listeners para controles de clique
        document.addEventListener('click', (e) => {
            // Fechar ao clicar no X ou no fundo escuro (overlay)
            if (e.target.classList.contains('gallery-viewer-close') || 
                e.target.classList.contains('gallery-viewer-overlay')) {
                this.closeViewer();
                return;
            }
            
            // Navegação com setas (incluindo clique nas imagens das setas)
            if (e.target.classList.contains('gallery-viewer-prev') ||
                (e.target.tagName === 'IMG' && e.target.closest('.gallery-viewer-prev'))) {
                this.prevImage();
                return;
            }
            if (e.target.classList.contains('gallery-viewer-next') ||
                (e.target.tagName === 'IMG' && e.target.closest('.gallery-viewer-next'))) {
                this.nextImage();
                return;
            }

            // Fechar ao clicar no fundo (fora do conteúdo)
            if (e.target.classList.contains('gallery-viewer-container')) {
                this.closeViewer();
            }
        });

        // Event listeners para teclado
        document.addEventListener('keydown', (e) => {
            // Só funciona se o visualizador estiver aberto
            if (!this.isOpen) return;

            switch(e.key) {
                case 'Escape':   // Tecla ESC
                case 'Enter':    // Tecla ENTER
                case 'Delete':   // Tecla DELETE
                case 'Backspace': // Tecla BACKSPACE
                    e.preventDefault(); // Previne comportamento padrão
                    this.closeViewer();
                    break;
                case 'ArrowLeft':  // Seta esquerda - imagem anterior
                    e.preventDefault();
                    this.prevImage();
                    break;
                case 'ArrowRight': // Seta direita - próxima imagem
                    e.preventDefault();
                    this.nextImage();
                    break;
            }
        });

        // Prevenir scroll quando o visualizador está aberto
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ')) {
                e.preventDefault();
            }
        });
    }

    openViewer(index) {
        this.currentIndex = index;
        this.isOpen = true;
        this.updateImage(true); // true = primeira abertura (com animação)
        this.viewer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll da página
    }

    closeViewer() {
        this.isOpen = false;
        this.viewer.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll da página
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage(false); // false = navegação (sem animação)
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage(false); // false = navegação (sem animação)
    }

    updateImage(isFirstOpen = false) {
        const currentImage = this.images[this.currentIndex];
        this.viewerImage.src = currentImage.src;
        this.viewerImage.alt = currentImage.alt;
        this.currentCounter.textContent = this.currentIndex + 1;

        // Animação suave APENAS na primeira abertura
        if (isFirstOpen) {
            this.viewerImage.style.opacity = '0';
            setTimeout(() => {
                this.viewerImage.style.opacity = '1';
            }, 100);
        } else {
            // Sem animação durante a navegação
            this.viewerImage.style.opacity = '1';
        }
    }
}

// Inicializar o visualizador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new GalleryViewer();
});