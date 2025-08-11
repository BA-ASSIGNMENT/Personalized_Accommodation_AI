// Main JavaScript for VUT Accommodation AI

// Budget slider functionality
const budgetSlider = document.getElementById('budget');
const budgetValue = document.getElementById('budgetValue');

if (budgetSlider && budgetValue) {
    budgetSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        const formattedValue = 'R' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        budgetValue.textContent = formattedValue;
    });
}

// Priority buttons functionality
const priorityBtns = document.querySelectorAll('.priority-btn');
priorityBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Remove active class from all buttons in the group
        const parent = this.parentElement;
        parent.querySelectorAll('.priority-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// Amenity selection functionality
const amenityItems = document.querySelectorAll('.amenity-item');
amenityItems.forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});

// Compact view toggle
const compactToggle = document.getElementById('compactToggle');
const searchSection = document.querySelector('.search-section');

if (compactToggle && searchSection) {
    compactToggle.addEventListener('click', function() {
        searchSection.classList.toggle('compact');
        
        if (searchSection.classList.contains('compact')) {
            this.innerHTML = '<i class="fas fa-expand"></i> Full View';
        } else {
            this.innerHTML = '<i class="fas fa-compress"></i> Compact View';
        }
    });
}

// Form submission
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const searchData = {
            campus: formData.get('campus') || document.getElementById('campus')?.value,
            accommodationType: formData.get('accommodation-type') || document.getElementById('accommodation-type')?.value,
            roomType: document.querySelector('.priority-btn.active[data-value]')?.dataset.value,
            budget: document.getElementById('budget')?.value,
            safetyPriority: document.querySelector('[data-value="high"], [data-value="medium"], [data-value="low"]')?.dataset.value,
            distancePriority: document.querySelector('[data-value="close"], [data-value="moderate"], [data-value="flexible"]')?.dataset.value,
            amenities: Array.from(document.querySelectorAll('.amenity-item.selected')).map(item => item.dataset.amenity)
        };
        
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Recommendations...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Display results or redirect
            console.log('Search data:', searchData);
            displaySearchResults(searchData);
        }, 2000);
    });
}

// Pagination button functionality
const paginationBtns = document.querySelectorAll('.pagination-btn');
paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.textContent.includes('Next')) {
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Hero search functionality
const heroSearchBtn = document.querySelector('.hero-search button');
const heroSearchInput = document.querySelector('.hero-search input');

if (heroSearchBtn && heroSearchInput) {
    heroSearchBtn.addEventListener('click', function() {
        const query = heroSearchInput.value.trim();
        if (query) {
            performQuickSearch(query);
        }
    });
    
    heroSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performQuickSearch(query);
            }
        }
    });
}

// Filter button functionality
const filterBtn = document.querySelector('.filter-btn');
if (filterBtn) {
    filterBtn.addEventListener('click', function() {
        // Scroll to search section
        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize budget display on page load
document.addEventListener('DOMContentLoaded', function() {
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    
    if (budgetSlider && budgetValue) {
        const value = parseInt(budgetSlider.value);
        const formattedValue = 'R' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        budgetValue.textContent = formattedValue;
    }
});

// Helper functions
function performQuickSearch(query) {
    console.log('Quick search for:', query);
    // Implement quick search logic here
    // Could filter existing results or make API call
    
    // Show loading indicator
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function displaySearchResults(searchData) {
    // This function would handle displaying search results
    // In a real application, this would make an API call and update the DOM
    console.log('Displaying results for:', searchData);
    
    // Show success message
    showNotification('AI recommendations generated successfully!', 'success');
    
    // Scroll to results
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#28a745' : '#17a2b8',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Card interactions
document.querySelectorAll('.accommodation-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// View Details button functionality
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('View Details')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.accommodation-card');
            const title = card.querySelector('.card-title').textContent;
            
            // In a real app, this would navigate to a details page
            showNotification(`Loading details for ${title}...`, 'info');
            
            // Simulate navigation delay
            setTimeout(() => {
                console.log('Navigate to details page for:', title);
                // window.location.href = `/accommodation/${title}`;
            }, 1000);
        });
    }
});