// Projects filtering and management
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.activeFilter = 'all';
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadProjects();
    }
    
    cacheElements() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectGrid = document.querySelector('.project-grid');
        this.projectCards = document.querySelectorAll('.project-card');
    }
    
    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
        
        // Project card interactions
        this.projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.project-link')) {
                    this.toggleProjectDetails(card);
                }
            });
        });
    }
    
    handleFilterClick(button) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        this.activeFilter = button.getAttribute('data-filter');
        this.filterProjects();
    }
    
    filterProjects() {
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (this.activeFilter === 'all' || category === this.activeFilter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    toggleProjectDetails(card) {
        const details = card.querySelector('.project-info');
        const preview = card.querySelector('.project-preview');
        
        if (details.style.maxHeight) {
            // Collapse
            details.style.maxHeight = null;
            preview.style.flex = '1';
        } else {
            // Expand
            details.style.maxHeight = details.scrollHeight + 'px';
            preview.style.flex = '0.7';
        }
    }
    
    loadProjects() {
        // In a real application, this would fetch from an API
        this.projects = [
            {
                id: 1,
                title: "CRM Система",
                description: "Полнофункциональная система управления клиентами с аналитикой",
                category: "fullstack",
                technologies: ["Flask", "JavaScript", "SQLite"],
                frontend: "Алексей",
                backend: "Михаил",
                demoLink: "#",
                codeLink: "#",
                image: "images/projects/crm.jpg"
            },
            {
                id: 2,
                title: "API Аналитики",
                description: "Мощный API для анализа данных с автоматической документацией",
                category: "backend",
                technologies: ["FastAPI", "Pandas", "JWT"],
                frontend: null,
                backend: "Михаил",
                demoLink: "#",
                codeLink: "#",
                image: "images/projects/api.jpg"
            },
            {
                id: 3,
                title: "Интернет-магазин",
                description: "Современный интернет-магазин с корзиной и оплатой",
                category: "fullstack",
                technologies: ["Flask", "JavaScript", "Stripe"],
                frontend: "Алексей",
                backend: "Михаил",
                demoLink: "#",
                codeLink: "#",
                image: "images/projects/ecommerce.jpg"
            },
            {
                id: 4,
                title: "Панель управления",
                description: "Админ-панель с графиками и статистикой",
                category: "frontend",
                technologies: ["HTML5", "CSS3", "Chart.js"],
                frontend: "Алексей",
                backend: null,
                demoLink: "#",
                codeLink: "#",
                image: "images/projects/dashboard.jpg"
            }
        ];
        
        this.renderProjects();
    }
    
    renderProjects() {
        // This would dynamically create project cards
        // For now, we're using static HTML
    }
    
    // Method to add new project (for future use)
    addProject(projectData) {
        this.projects.push(projectData);
        this.renderProjects();
    }
}

// Project demos and interactive elements
class ProjectDemos {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupAPIDemo();
        this.setupCodePreview();
        this.setupLiveDemos();
    }
    
    setupAPIDemo() {
        const apiDemos = document.querySelectorAll('.api-demo');
        apiDemos.forEach(demo => {
            this.createInteractiveAPI(demo);
        });
    }
    
    createInteractiveAPI(demoElement) {
        const endpoint = demoElement.querySelector('.endpoint');
        const response = demoElement.querySelector('.response');
        
        if (endpoint && response) {
            // Make endpoint clickable to "execute" the API call
            endpoint.style.cursor = 'pointer';
            endpoint.addEventListener('click', () => {
                this.simulateAPICall(endpoint, response);
            });
        }
    }
    
    simulateAPICall(endpoint, response) {
        // Show loading state
        const originalResponse = response.textContent;
        response.textContent = 'Loading...';
        response.style.color = 'var(--accent-frontend)';
        
        // Simulate API call delay
        setTimeout(() => {
            response.textContent = originalResponse;
            response.style.color = 'var(--success)';
            
            // Add success animation
            response.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                response.style.animation = '';
            }, 500);
        }, 1000);
    }
    
    setupCodePreview() {
        // Add copy-to-clipboard functionality for code snippets
        const codeSnippets = document.querySelectorAll('pre code');
        codeSnippets.forEach(snippet => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copy code';
            
            copyButton.addEventListener('click', () => {
                this.copyToClipboard(snippet.textContent);
                this.showCopyFeedback(copyButton);
            });
            
            snippet.parentNode.style.position = 'relative';
            snippet.parentNode.appendChild(copyButton);
        });
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Code copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy code: ', err);
        });
    }
    
    showCopyFeedback(button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
        }, 2000);
    }
    
    setupLiveDemos() {
        // Setup interactive demos for projects
        this.createLiveDemo('crm-demo', this.crmDemo);
        this.createLiveDemo('api-demo', this.apiDemo);
    }
    
    createLiveDemo(demoId, demoFunction) {
        const demoElement = document.getElementById(demoId);
        if (demoElement) {
            demoFunction(demoElement);
        }
    }
    
    crmDemo(container) {
        // Simple CRM demo simulation
        const demoHTML = `
            <div class="crm-demo">
                <div class="demo-header">
                    <h4>CRM Demo</h4>
                    <button class="demo-btn" onclick="addCustomer()">Add Customer</button>
                </div>
                <div class="customers-list">
                    <div class="customer-item">
                        <span>John Doe</span>
                        <span class="status active">Active</span>
                    </div>
                    <div class="customer-item">
                        <span>Jane Smith</span>
                        <span class="status inactive">Inactive</span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = demoHTML;
    }
    
    apiDemo(container) {
        // API testing demo
        const demoHTML = `
            <div class="api-test-demo">
                <h4>API Testing</h4>
                <div class="endpoint-test">
                    <code>GET /api/users</code>
                    <button class="test-btn" onclick="testEndpoint()">Test</button>
                </div>
                <div class="response-area">
                    <pre>Click "Test" to see response</pre>
                </div>
            </div>
        `;
        container.innerHTML = demoHTML;
    }
}

// Global functions for demos
window.addCustomer = function() {
    alert('Customer added! (This is a demo)');
};

window.testEndpoint = function() {
    const responseArea = document.querySelector('.response-area pre');
    const mockResponse = {
        users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
    };
    responseArea.textContent = JSON.stringify(mockResponse, null, 2);
};

// Initialize projects functionality
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
    new ProjectDemos();
});

// Export for use in other modules
window.ProjectsManager = ProjectsManager;
window.ProjectDemos = ProjectDemos;