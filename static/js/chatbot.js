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
    const message = userMessage.toLowerCase();
    
    // Define response patterns
    const responses = {
        greetings: [
            "Hello! How can I help you find the perfect VUT accommodation today?",
            "Hi there! I'm here to help you with VUT accommodation. What would you like to know?",
            "Welcome! I can help you find accommodation near VUT campuses. What are you looking for?"
        ],
        
        accommodation: [
            "VUT offers several accommodation options including campus residences, private apartments, and shared housing. What type interests you most?",
            "I can help you find accommodation based on your budget, preferred location, and amenities. What's most important to you?",
            "Our AI system has found great options near VUT campuses. Would you like me to show you personalized recommendations?"
        ],
        
        budget: [
            "VUT accommodations typically range from R2,000 to R10,000 per month. What's your budget range?",
            "I can help you find options within your budget. Most students find great places between R3,000-R6,000 per month.",
            "Budget-friendly options include shared rooms and campus residences. Premium apartments are also available for higher budgets."
        ],
        
        location: [
            "VUT has campuses in Vanderbijlpark, Secunda, and Upington. Which campus will you be attending?",
            "The Main Campus in Vanderbijlpark has the most accommodation options nearby. Are you looking for on-campus or off-campus housing?",
            "Distance to campus is important! I can show you options within walking distance or with shuttle services."
        ],
        
        amenities: [
            "Popular amenities include Wi-Fi, security, laundry facilities, and study areas. What amenities are must-haves for you?",
            "Most VUT accommodations offer basic amenities like Wi-Fi and security. Some also have gyms, study rooms, and meal plans.",
            "I can filter accommodations by specific amenities. Are you looking for anything particular like parking or kitchen access?"
        ],
        
        application: [
            "The application process varies by accommodation type. Campus residences have specific deadlines, usually in November for the following year.",
            "I can guide you through the application process. Do you need help with campus residence applications or private accommodation?",
            "Most accommodations require a deposit and proof of registration. I can provide a detailed application checklist."
        ],
        
        default: [
            "I'm here to help with VUT accommodation questions. You can ask about pricing, locations, amenities, or the application process.",
            "I can help you find accommodations, compare options, or answer questions about campus housing. What would you like to know?",
            "Feel free to ask about any aspect of VUT accommodation - I'm here to help you find the perfect place to stay!"
        ]
    };
    
    // Determine response category
    let category = 'default';
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        category = 'greetings';
    } else if (message.includes('accommodation') || message.includes('housing') || message.includes('residence') || message.includes('place')) {
        category = 'accommodation';
    } else if (message.includes('budget') || message.includes('cost') || message.includes('price') || message.includes('afford')) {
        category = 'budget';
    } else if (message.includes('location') || message.includes('campus') || message.includes('distance') || message.includes('transport')) {
        category = 'location';
    } else if (message.includes('amenities') || message.includes('facilities') || message.includes('wifi') || message.includes('gym') || message.includes('kitchen')) {
        category = 'amenities';
    } else if (message.includes('apply') || message.includes('application') || message.includes('register') || message.includes('process')) {
        category = 'application';
    }
    
    // Return random response from category
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

// Initialize chatbot with welcome message
document.addEventListener('DOMContentLoaded', function() {
    if (chatMessages) {
        // Add initial bot messages
        setTimeout(() => {
            addMessage("Hello! I'm your VUT accommodation assistant. How can I help you today?", 'bot');
        }, 1000);
        
        setTimeout(() => {
            addMessage("I can help you find accommodations, answer questions about campus housing, or explain the rental process.", 'bot');
        }, 2000);
    }
});

// Close chatbot when clicking outside
document.addEventListener('click', function(e) {
    if (chatbotWindow && chatbotWindow.classList.contains('active')) {
        if (!chatbotWindow.contains(e.target) && !chatbotIcon.contains(e.target)) {
            chatbotWindow.classList.remove('active');
        }
    }
});

// Chatbot suggestions/quick replies
function addQuickReplies() {
    const quickReplies = [
        "Show me budget options",
        "Campus residences",
        "Application process",
        "Amenities available"
    ];
    
    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.className = 'quick-replies';
    quickRepliesDiv.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px;
        background: #f8f9fa;
    `;
    
    quickReplies.forEach(reply => {
        const button = document.createElement('button');
        button.textContent = reply;
        button.className = 'quick-reply-btn';
        button.style.cssText = `
            background: var(--primary);
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', function() {
            chatInput.value = reply;
            sendMessage();
            quickRepliesDiv.remove();
        });
        
        button.addEventListener('mouseover', function() {
            this.style.background = 'var(--vut-blue)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.background = 'var(--primary)';
        });
        
        quickRepliesDiv.appendChild(button);
    });
    
    // Add quick replies after initial messages
    setTimeout(() => {
        if (chatMessages) {
            chatMessages.appendChild(quickRepliesDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, 3000);
}

// Initialize quick replies
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addQuickReplies, 3000);
});