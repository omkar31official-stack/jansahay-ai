// Global Application State
const AppState = {
    currentLanguage: 'en',
    isDarkMode: false,
    fontSize: 16,
    schemes: [],
    userSession: {}
};

// API Configuration
const API = {
    baseURL: 'http://localhost:5000/api',
    
    async chat(message, language) {
        const response = await fetch(`${this.baseURL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, language })
        });
        return response.json();
    },
    
    async checkEligibility(userDetails) {
        const response = await fetch(`${this.baseURL}/check-eligibility`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_details: userDetails })
        });
        return response.json();
    },
    
    async translate(text, targetLanguage) {
        const response = await fetch(`${this.baseURL}/translate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target_language: targetLanguage })
        });
        return response.json();
    }
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadSchemes();
    setupEventListeners();
});

function initializeApp() {
    console.log('JanSahay AI initialized');
    
    // Check for saved preferences
    const savedTheme = localStorage.getItem('jansahay_theme');
    const savedFontSize = localStorage.getItem('jansahay_fontsize');
    
    if (savedTheme === 'dark') {
        toggleTheme();
    }
    
    if (savedFontSize) {
        AppState.fontSize = parseInt(savedFontSize);
        document.body.style.fontSize = `${AppState.fontSize}px`;
    }
}

async function loadSchemes() {
    try {
        const response = await fetch('http://localhost:5000/api/schemes');
        const data = await response.json();
        
        if (data.success) {
            AppState.schemes = data.schemes;
            console.log('Schemes loaded:', AppState.schemes.length);
        }
    } catch (error) {
        console.error('Error loading schemes:', error);
    }
}

function setupEventListeners() {
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (e) => {
        AppState.currentLanguage = e.target.value;
        updateUILanguage();
    });
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Font size controls
    document.getElementById('increaseFont').addEventListener('click', () => {
        AppState.fontSize += 2;
        document.body.style.fontSize = `${AppState.fontSize}px`;
        localStorage.setItem('jansahay_fontsize', AppState.fontSize);
    });
    
    document.getElementById('decreaseFont').addEventListener('click', () => {
        AppState.fontSize -= 2;
        if (AppState.fontSize >= 12) {
            document.body.style.fontSize = `${AppState.fontSize}px`;
            localStorage.setItem('jansahay_fontsize', AppState.fontSize);
        }
    });
    
    // Eligibility form
    document.getElementById('eligibilityForm').addEventListener('submit', handleEligibilityCheck);
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('jansahay_theme', 'light');
        AppState.isDarkMode = false;
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('jansahay_theme', 'dark');
        AppState.isDarkMode = true;
    }
}

function updateUILanguage() {
    // Update UI text based on selected language
    const lang = AppState.currentLanguage;
    
    // This would translate static UI elements
    // For now, we'll just log the language change
    console.log(`Language changed to: ${lang}`);
}

async function handleEligibilityCheck(e) {
    e.preventDefault();
    
    const userDetails = {
        age: parseInt(document.getElementById('age').value) || 0,
        income: parseInt(document.getElementById('income').value) || 0,
        occupation: document.getElementById('occupation').value,
        state: document.getElementById('state').value,
        has_girl_child: document.getElementById('hasGirlChild').checked,
        has_house: document.getElementById('hasHouse').checked
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    submitBtn.disabled = true;
    
    try {
        const result = await API.checkEligibility(userDetails);
        
        if (result.success) {
            displayEligibilityResults(result);
        }
    } catch (error) {
        console.error('Eligibility check failed:', error);
        showNotification('Error checking eligibility. Please try again.', 'error');
    }
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
}

function displayEligibilityResults(result) {
    const resultsDiv = document.getElementById('eligibilityResults');
    const schemesList = document.getElementById('schemesList');
    
    resultsDiv.classList.remove('hidden');
    
    let html = '';
    
    if (result.eligible_schemes && result.eligible_schemes.length > 0) {
        result.eligible_schemes.forEach(scheme => {
            html += `
                <div class="scheme-card">
                    <h4>${scheme.name}</h4>
                    <p>${scheme.details}</p>
                    <small>✓ You are eligible</small>
                </div>
            `;
        });
    } else {
        html = '<p>No schemes found for your criteria. Try adjusting your details.</p>';
    }
    
    // Add recommendations
    if (result.recommendations && result.recommendations.length > 0) {
        html += '<h4 style="margin-top: 20px;">Recommended for you:</h4>';
        result.recommendations.forEach(rec => {
            html += `
                <div class="scheme-card" style="border-left-color: var(--warning-color);">
                    <h4>${rec.name}</h4>
                    <p>${rec.reason}</p>
                    <small>Priority: ${rec.priority}</small>
                </div>
            `;
        });
    }
    
    schemesList.innerHTML = html;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate-slide-down`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Admin Panel Toggle
window.toggleAdminPanel = function() {
    const adminContent = document.getElementById('adminContent');
    const chevron = document.querySelector('.admin-header .fa-chevron-down');
    
    adminContent.classList.toggle('hidden');
    
    if (adminContent.classList.contains('hidden')) {
        chevron.style.transform = 'rotate(0deg)';
    } else {
        chevron.style.transform = 'rotate(180deg)';
    }
};