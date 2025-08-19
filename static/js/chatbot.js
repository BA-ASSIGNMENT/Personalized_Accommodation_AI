// Chatbot functionality

// Toggle chatbot window
const chatbotIcon = document.querySelector('.chatbot-icon');
const chatbotWindow = document.querySelector('.chatbot-window');

if (chatbotIcon && chatbotWindow) {
    chatbotIcon.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
    });
}

// Send message functionality
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const chatMessages = document.querySelector('.chat-messages');

if (chatButton && chatInput && chatMessages) {
    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response after a delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1500);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender + '-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
    typingDiv.innerHTML = '<i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i> Typing...';
    typingDiv.style.opacity = '0.7';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function getBotResponse(userMessage) {
    // This function can be customized to integrate with your actual chatbot API
    // For now, it returns a simple acknowledgment
    return "I received your message: " + userMessage;
}

// Close chatbot when clicking outside
document.addEventListener('click', function(e) {
    if (chatbotWindow && chatbotWindow.classList.contains('active')) {
        if (!chatbotWindow.contains(e.target) && !chatbotIcon.contains(e.target)) {
            chatbotWindow.classList.remove('active');
        }
    }
});