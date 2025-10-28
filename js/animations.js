// Animations with philosophy typing
class PortfolioAnimations {
    constructor() {
        this.isPhilosophyTyping = false;
        this.init();
    }
    
    init() {
        this.initHeroTyping();
        this.initHoverEffects();
        this.initScrollAnimations();
        this.initPhilosophyTyping();
    }
    
    // Анимация печати для hero секции
    initHeroTyping() {
        const teamName = document.querySelector('.team-name');
        const tagline = document.querySelector('.team-tagline');
        
        if (teamName && window.innerWidth > 768) {
            this.typeTextSimple(teamName, teamName.textContent, 100);
        }
        
        if (tagline) {
            setTimeout(() => {
                this.typeTextSimple(tagline, tagline.textContent, 40);
            }, 2000);
        }
    }
    
    // Анимация печати для философии
    initPhilosophyTyping() {
        const philosophySection = document.querySelector('.typing-demo');
        if (!philosophySection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isPhilosophyTyping) {
                    this.startPhilosophyTyping();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(philosophySection);
    }
    
    // Запуск анимации философии
    startPhilosophyTyping() {
        if (this.isPhilosophyTyping) return;
        this.isPhilosophyTyping = true;
        
        const typingLines = document.querySelectorAll('.typing-line');
        const codeLines = document.querySelectorAll('.code-line');
        
        // Анимация текста философии
        typingLines.forEach((line, index) => {
            const text = line.getAttribute('data-text');
            line.textContent = '';
            line.classList.add('typing-active');
            
            setTimeout(() => {
                this.typeTextWithCursor(line, text, 30);
            }, index * 800);
        });
        
        // Анимация кода
        setTimeout(() => {
            codeLines.forEach((line, index) => {
                const text = line.getAttribute('data-text');
                line.textContent = '';
                line.classList.add('typing-active');
                
                setTimeout(() => {
                    this.typeTextWithCursor(line, text, 20);
                }, index * 400);
            });
        }, typingLines.length * 800 + 500);
    }
    
    // Функция печати текста с курсором
    typeTextWithCursor(element, text, speed) {
        let i = 0;
        
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                element.classList.remove('typing-active');
                element.classList.add('typing-complete');
            }
        };
        
        typeChar();
    }
    
    // Простая функция печати текста
    typeTextSimple(element, text, speed) {
        if (element.classList.contains('typing-complete')) {
            return;
        }
        
        element.textContent = '';
        element.classList.add('typing-active');
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                element.classList.remove('typing-active');
                element.classList.add('typing-complete');
            }
        };
        
        typeChar();
    }
    
    // Hover эффекты
    initHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    card.style.transform = 'translateY(-10px)';
                    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
        
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }
    
    // Анимации при скролле
    initScrollAnimations() {
        const elements = document.querySelectorAll('.process-step, .tech-item, .project-card, .stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    if (entry.target.classList.contains('tech-item')) {
                        const progressBar = entry.target.querySelector('.progress-bar');
                        if (progressBar) {
                            const level = progressBar.getAttribute('data-level');
                            setTimeout(() => {
                                progressBar.style.width = `${level}%`;
                            }, 300);
                        }
                    }
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});