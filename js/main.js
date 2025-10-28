// Main initialization file
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initBinaryBackground();
    initSmoothScroll();
    initFormHandler();
    initStatsCounter();
    initScrollAnimations();
    initTeamNameTyping();
    
    console.log('N-code Team Portfolio initialized');
});

// Preloader with progress bar
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    if (preloader && loadingProgress) {
        let progress = 0;
        
        // Анимация заполнения прогресс-бара
        const progressInterval = setInterval(() => {
            progress += Math.random() * 8 + 2; // От 2 до 10% за шаг
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Завершающая анимация
                loadingText.textContent = 'Ready!';
                loadingProgress.style.width = '100%';
                
                // Задержка перед скрытием прелоадера
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    document.body.style.overflow = 'auto';
                    
                    // Запускаем анимацию названия команды после скрытия прелоадера
                    setTimeout(initTeamNameTyping, 300);
                }, 800);
            } else {
                loadingProgress.style.width = `${progress}%`;
                
                // Обновляем текст загрузки
                if (progress < 30) {
                    loadingText.textContent = 'Loading assets...';
                } else if (progress < 60) {
                    loadingText.textContent = 'Initializing animations...';
                } else if (progress < 90) {
                    loadingText.textContent = 'Almost ready...';
                }
            }
        }, 100);
    } else {
        document.body.style.overflow = 'auto';
        initTeamNameTyping();
    }
}

// Анимация печати названия команды
function initTeamNameTyping() {
    const teamName = document.querySelector('.team-name');
    if (!teamName) return;
    
    const originalText = teamName.textContent;
    teamName.textContent = '';
    teamName.classList.add('typing');
    
    let i = 0;
    const typeTeamName = () => {
        if (i < originalText.length) {
            teamName.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeTeamName, 120); // Скорость печати
        } else {
            // Завершение анимации - оставляем мигающий курсор
            teamName.classList.remove('typing');
            teamName.classList.add('typing-complete');
        }
    };
    
    // Запускаем с небольшой задержкой после прелоадера
    setTimeout(typeTeamName, 300);
}

// Binary background animation
function initBinaryBackground() {
    const binaryBackground = document.querySelector('.binary-background');
    if (!binaryBackground) return;
    
    const chars = ['0', '1'];
    const containerWidth = window.innerWidth;
    
    // Create binary characters
    for (let i = 0; i < 50; i++) {
        const binaryChar = document.createElement('div');
        binaryChar.className = 'binary-char';
        binaryChar.textContent = chars[Math.floor(Math.random() * chars.length)];
        binaryChar.style.left = `${Math.random() * containerWidth}px`;
        binaryChar.style.animationDelay = `${Math.random() * 5}s`;
        binaryChar.style.animationDuration = `${5 + Math.random() * 10}s`;
        
        binaryBackground.appendChild(binaryChar);
    }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handler
function initFormHandler() {
    const form = document.getElementById('project-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        const originalIcon = submitBtn.querySelector('i').className;
        
        // Show loading state
        submitBtn.querySelector('span').textContent = 'Отправка...';
        submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success state
            submitBtn.querySelector('span').textContent = 'Отправлено!';
            submitBtn.querySelector('i').className = 'fas fa-check';
            submitBtn.style.background = 'var(--success)';
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.querySelector('i').className = originalIcon;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Statistics counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                const suffix = statNumber.textContent.replace(/\d/g, '');
                
                animateNumber(statNumber, 0, target, 2000, suffix);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.process-step, .process-arrow, .tech-item, .project-card, .stat-item, .contact-method'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special handling for progress bars
                if (entry.target.classList.contains('tech-item')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const level = progressBar.getAttribute('data-level');
                        setTimeout(() => {
                            progressBar.style.width = `${level}%`;
                            progressBar.classList.add('animated');
                        }, 300);
                    }
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Utility function for dynamic year in footer
function updateCurrentYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}
// Добавьте эту функцию в main.js
function initPhilosophyObserver() {
    const philosophySection = document.querySelector('.typing-demo');
    if (!philosophySection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(philosophySection);
}

// И вызовите в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initBinaryBackground();
    initSmoothScroll();
    initFormHandler();
    initStatsCounter();
    initScrollAnimations();
    initTeamNameTyping();
    initPhilosophyObserver(); // ← Добавьте эту строку
    console.log('N-code Team Portfolio initialized');
});
// Initialize dynamic year
updateCurrentYear();