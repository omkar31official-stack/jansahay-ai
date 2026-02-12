// Chat functionality
class ChatManager {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendMessage');
        this.voiceButton = document.getElementById('voiceInputBtn');
        
        this.init();
    }
    
    init() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter (but Shift+Enter for new line)
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = this.userInput.scrollHeight + 'px';
        });
        
        // Voice input
        if (this.voiceButton) {
            this.voiceButton.addEventListener('click', () => this.startVoiceInput());
        }
    }
    
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const response = await API.chat(message, AppState.currentLanguage);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            if (response.success) {
                this.addMessage(response.response, 'bot');
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('Network error. Please check your connection.', 'bot');
            console.error('Chat error:', error);
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message animate-fade-in`;
        
        const icon = document.createElement('i');
        icon.className = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(icon);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot-message typing-indicator';
        indicator.id = 'typingIndicator';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-robot';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        indicator.appendChild(icon);
        indicator.appendChild(contentDiv);
        
        this.chatMessages.appendChild(indicator);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice input is not supported in your browser. Try Chrome or Edge.');
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = this.getLanguageCode();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
            this.voiceButton.classList.add('recording');
            this.voiceButton.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.userInput.value = transcript;
            this.userInput.style.height = 'auto';
            this.userInput.style.height = this.userInput.scrollHeight + 'px';
        };
        
        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            this.voiceButton.classList.remove('recording');
            this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onend = () => {
            this.voiceButton.classList.remove('recording');
            this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.start();
    }
    
    getLanguageCode() {
        const langMap = {
            'hi': 'hi-IN',
            'kn': 'kn-IN',
            'te': 'te-IN',
            'ta': 'ta-IN',
            'ml': 'ml-IN',
            'en': 'en-IN'
        };
        
        return langMap[AppState.currentLanguage] || 'en-IN';
    }
}

// Initialize chat
const chatManager = new ChatManager();