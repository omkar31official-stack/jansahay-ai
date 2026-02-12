// Admin Panel Functionality
class AdminManager {
    constructor() {
        this.form = document.getElementById('addSchemeForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleAddScheme(e));
        }
    }
    
    async handleAddScheme(e) {
        e.preventDefault();
        
        const schemeData = {
            name: document.getElementById('schemeName').value,
            description: document.getElementById('schemeDescription').value,
            eligibility_criteria: document.getElementById('schemeEligibility').value,
            benefits: document.getElementById('schemeBenefits').value,
            category: document.getElementById('schemeCategory').value,
            application_link: document.getElementById('schemeLink').value,
            languages: ['en', 'hi', 'kn']
        };
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('http://localhost:5000/api/schemes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(schemeData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Scheme added successfully!', 'success');
                this.form.reset();
                
                // Refresh schemes
                await loadSchemes();
            } else {
                showNotification('Error adding scheme: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error adding scheme:', error);
            showNotification('Network error. Please try again.', 'error');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Initialize admin
const adminManager = new AdminManager();