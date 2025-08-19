// Main JavaScript file for VUT Accommodation Platform

// Toggle filter section
function toggleFilters() {
    const content = document.getElementById('filterContent');
    const toggle = document.getElementById('filterToggle');
    
    content.classList.toggle('expanded');
    toggle.classList.toggle('expanded');
}

// Handle priority button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('priority-btn')) {
        const group = e.target.parentElement;
        group.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    }
    
    if (e.target.classList.contains('amenity-item')) {
        e.target.classList.toggle('selected');
    }
});

// Clear all filters
function clearFilters() {
    document.getElementById('searchForm').reset();
    document.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.priority-btn[data-value="shared"], .priority-btn[data-value="medium"], .priority-btn[data-value="close"]')
        .forEach(btn => btn.classList.add('active'));
    document.querySelectorAll('.amenity-item').forEach(item => item.classList.remove('selected'));
    document.getElementById('heroSearch').value = '';
}

// Basic form handlers (ready for backend integration)
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const searchData = Object.fromEntries(formData.entries());
    
    // Get selected amenities
    const selectedAmenities = Array.from(document.querySelectorAll('.amenity-item.selected'))
        .map(item => item.dataset.amenity);
    
    // Get priority selections
    const priorities = {};
    document.querySelectorAll('.priority-selector').forEach((selector, index) => {
        const activeBtn = selector.querySelector('.priority-btn.active');
        if (activeBtn) {
            const labels = ['roomType', 'safetyPriority', 'distancePriority'];
            priorities[labels[index]] = activeBtn.dataset.value;
        }
    });
    
    // Combine all search parameters
    const searchParams = {
        ...searchData,
        amenities: selectedAmenities,
        priorities: priorities,
        heroSearch: document.getElementById('heroSearch').value
    };
    
    console.log('Search parameters:', searchParams);
    
    // Here you would typically send this data to your backend API
    // Example: sendSearchRequest(searchParams);
    
    // Show a temporary message
    showSearchMessage();
});

function performHeroSearch() {
    const query = document.getElementById('heroSearch').value;
    console.log('Hero search:', query);
    
    if (query.trim()) {
        // Trigger the main search form
        document.getElementById('searchForm').dispatchEvent(new Event('submit'));
    }
}

function showSearchMessage() {
    const resultsCounter = document.getElementById('resultsCounter');
    const originalText = resultsCounter.textContent;
    
    resultsCounter.textContent = 'Search functionality ready for backend integration...';
    resultsCounter.style.color = 'var(--primary)';
    
    setTimeout(() => {
        resultsCounter.textContent = originalText;
        resultsCounter.style.color = '';
    }, 3000);
}

// Handle view toggle buttons
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const view = this.dataset.view;
        const resultsGrid = document.getElementById('resultsGrid');
        
        if (view === 'list') {
            resultsGrid.style.gridTemplateColumns = '1fr';
            resultsGrid.querySelectorAll('.accommodation-card').forEach(card => {
                card.style.display = 'flex';
                card.style.flexDirection = 'row';
            });
        } else {
            resultsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            resultsGrid.querySelectorAll('.accommodation-card').forEach(card => {
                card.style.display = 'block';
                card.style.flexDirection = '';
            });
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize chatbot toggle
    initializeChatbot();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Add loading animation to cards
    animateCards();
});

// Chatbot functionality
function initializeChatbot() {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotWindow = document.querySelector('.chatbot-window');
    
    if (chatbotIcon && chatbotWindow) {
        chatbotIcon.addEventListener('click', function() {
            if (chatbotWindow.style.display === 'none' || !chatbotWindow.style.display) {
                chatbotWindow.style.display = 'flex';
                chatbotIcon.style.transform = 'scale(0.9)';
            } else {
                chatbotWindow.style.display = 'none';
                chatbotIcon.style.transform = 'scale(1)';
            }
        });
        
        // Close chatbot when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.chatbot-container') && chatbotWindow.style.display === 'flex') {
                chatbotWindow.style.display = 'none';
                chatbotIcon.style.transform = 'scale(1)';
            }
        });
    }
}

// Keyboard navigation support
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close filter panel
        if (e.key === 'Escape') {
            const filterContent = document.getElementById('filterContent');
            if (filterContent && filterContent.classList.contains('expanded')) {
                toggleFilters();
            }
            
            // Also close chatbot
            const chatbotWindow = document.querySelector('.chatbot-window');
            if (chatbotWindow && chatbotWindow.style.display === 'flex') {
                chatbotWindow.style.display = 'none';
                document.querySelector('.chatbot-icon').style.transform = 'scale(1)';
            }
        }
        
        // Enter key on filter header to toggle
        if (e.key === 'Enter' && e.target.closest('.filter-header')) {
            toggleFilters();
        }
    });
}

// Animate cards on scroll
function animateCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.accommodation-card').forEach(card => {
        observer.observe(card);
    });
}

// Utility functions for future backend integration
function sendSearchRequest(searchParams) {
    // Example function for API integration
    console.log('Sending search request with:', searchParams);
    
    // Example fetch request (uncomment when backend is ready)
    /*
    fetch('/api/search-accommodations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams)
    })
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('Search failed. Please try again.');
    });
    */
}

function displaySearchResults(results) {
    // Function to display search results from backend
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCounter = document.getElementById('resultsCounter');
    
    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No accommodations found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        resultsCounter.textContent = 'No results found';
    } else {
        resultsCounter.textContent = `Showing ${results.length} accommodation${results.length !== 1 ? 's' : ''}`;
        // Render results...
    }
}

function showErrorMessage(message) {
    // Show error messages to user
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle" style="color: var(--accent);"></i>
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
}

// Export functions for use in other scripts if needed
window.VUTAccommodation = {
    toggleFilters,
    clearFilters,
    performHeroSearch,
    sendSearchRequest,
    displaySearchResults
};