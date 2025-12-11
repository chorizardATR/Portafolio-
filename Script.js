document.addEventListener('DOMContentLoaded', function() {
  
    createLoadingIndicator();
    
    
    initScrollEffects();
    
    
    createThemeToggle();
    
    
    if (document.querySelector('.presentacion__contenido')) {
        createEnhancedGallery();
    }
    
   
    showWelcomeMessage();
    
   
    initParallaxEffects();
    
    
    initScrollAnimations();
});

function createLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-circle"></div>';
    document.body.appendChild(loader);
    
    // Styles for loader
    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        .loader-circle {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(0, 212, 255, 0.1);
            border-top: 3px solid var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    
    // Hide loader after page load
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 800);
}

function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

function createThemeToggle() {
    const header = document.querySelector('.header');
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    
    // Styles for theme toggle
    const toggleStyles = `
        .theme-toggle {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 56px;
            height: 56px;
            border: none;
            border-radius: 50%;
            background: var(--surface-color);
            color: var(--primary-color);
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: var(--shadow-medium);
            transition: var(--transition);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .theme-toggle:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        .theme-toggle.dark {
            background: var(--accent-color);
            color: white;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = toggleStyles;
    document.head.appendChild(style);
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('modo-oscuro');
        themeToggle.innerHTML = '☀️';
        themeToggle.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('modo-oscuro');
        const isDark = document.body.classList.contains('modo-oscuro');
        
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        themeToggle.classList.toggle('dark', isDark);
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Smooth transition effect
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    });
}

function createEnhancedGallery() {
    const presentacionContenido = document.querySelector('.presentacion__contenido');
    
    const galeriaSection = document.createElement('section');
    galeriaSection.className = 'galeria enhanced-gallery';
    
    const galeriaTitle = document.createElement('h2');
    galeriaTitle.textContent = 'Galería Fórmula 1';
    galeriaTitle.className = 'galeria__titulo';
    
    const imagenesContainer = document.createElement('div');
    imagenesContainer.className = 'galeria__container';
    
    const imagenes = [
        { src: 'imagenes/F1 A.jpg', alt: 'Fórmula 1 - Automovilismo', titulo: 'Pasión por la velocidad' },
        { src: 'imagenes/F1 M.jpg', alt: 'Fórmula 1 - Monoplaza', titulo: 'Ingeniería de precisión' },
        { src: 'imagenes/F1 F.jpg', alt: 'Fórmula 1 - Circuito', titulo: 'Adrenalina pura' },
    ];
    
    // Imagen principal con información
    const imagenPrincipal = document.createElement('div');
    imagenPrincipal.className = 'galeria__principal';
    
    const imgPrincipal = document.createElement('img');
    imgPrincipal.src = imagenes[0].src;
    imgPrincipal.alt = imagenes[0].alt;
    imgPrincipal.loading = 'lazy';
    
    const infoPrincipal = document.createElement('div');
    infoPrincipal.className = 'galeria__info';
    infoPrincipal.innerHTML = `<h3>${imagenes[0].titulo}</h3>`;
    
    imagenPrincipal.appendChild(imgPrincipal);
    imagenPrincipal.appendChild(infoPrincipal);
    
    // Miniaturas con efectos mejorados
    const miniaturas = document.createElement('div');
    miniaturas.className = 'galeria__miniaturas';
    
    imagenes.forEach((imagen, index) => {
        const miniatura = document.createElement('img');
        miniatura.src = imagen.src;
        miniatura.alt = imagen.alt;
        miniatura.className = 'galeria__miniatura';
        miniatura.loading = 'lazy';
        
        if (index === 0) miniatura.classList.add('activa');
        
        miniatura.addEventListener('click', function() {
            // Efecto de transición suave
            imgPrincipal.style.opacity = '0.7';
            
            setTimeout(() => {
                imgPrincipal.src = imagen.src;
                imgPrincipal.alt = imagen.alt;
                infoPrincipal.innerHTML = `<h3>${imagen.titulo}</h3>`;
                imgPrincipal.style.opacity = '1';
            }, 150);
            
            // Actualizar miniaturas activas
            document.querySelectorAll('.galeria__miniatura').forEach(min => {
                min.classList.remove('activa');
            });
            miniatura.classList.add('activa');
        });
        
        miniaturas.appendChild(miniatura);
    });
    
    imagenesContainer.appendChild(imagenPrincipal);
    imagenesContainer.appendChild(miniaturas);
    
    galeriaSection.appendChild(galeriaTitle);
    galeriaSection.appendChild(imagenesContainer);
    
    presentacionContenido.appendChild(galeriaSection);
    
    // Estilos mejorados para la galería
    const galleryStyles = `
        .enhanced-gallery {
            animation: fadeInUp 0.8s ease-out 0.5s both;
        }
        .galeria__container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .galeria__info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: white;
            padding: 2rem 1rem 1rem;
            border-radius: 0 0 16px 16px;
            transform: translateY(100%);
            transition: var(--transition);
        }
        .galeria__principal:hover .galeria__info {
            transform: translateY(0);
        }
        .galeria__info h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = galleryStyles;
    document.head.appendChild(style);
}

function showWelcomeMessage() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-notification';
    welcomeMessage.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">👋</span>
            <span class="notification-text">¡Bienvenido a mi portfolio!</span>
        </div>
    `;
    
    document.body.appendChild(welcomeMessage);
    
    // Estilos para notificación mejorada
    const notificationStyles = `
        .welcome-notification {
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--gradient);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 16px;
            box-shadow: var(--shadow-medium);
            z-index: 1001;
            animation: slideInNotification 0.5s ease, slideOutNotification 0.5s ease 3s forwards;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-icon {
            font-size: 1.2rem;
            animation: wave 1s ease-in-out infinite;
        }
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-20deg); }
        }
        @keyframes slideOutNotification {
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = notificationStyles;
    document.head.appendChild(style);
    
    setTimeout(() => welcomeMessage.remove(), 4000);
}

function initParallaxEffects() {
    const image = document.querySelector('.presentacion__imagen');
    if (!image) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        
        image.style.transform = `translateY(${scrolled * speed}px)`;
        ticking = false;
    }
    
    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxTick, { passive: true });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.presentacion__contenido, .galeria, .footer');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}