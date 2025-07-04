// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const price = card.getAttribute('data-price').toLowerCase();
        
        if (title.includes(searchTerm) || price.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // If search is empty, show all books
    if (searchTerm === '') {
        bookCards.forEach(card => {
            card.classList.remove('hidden');
        });
    }
});

// Buy Now functionality
function buyNow(bookName, price) {
    // Fill the form with selected book details
    document.getElementById('bookName').value = bookName;
    document.getElementById('bookPrice').value = price;
    
    // Scroll to form section
    document.getElementById('formSection').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Focus on the first input field
    setTimeout(() => {
        document.getElementById('customerName').focus();
    }, 800);
}

// Form submission
function submitOrder(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const orderData = {
        customerName: formData.get('customerName'),
        mobileNo: formData.get('mobileNo'),
        email: formData.get('email'),
        address: formData.get('address'),
        bookName: formData.get('bookName'),
        bookPrice: formData.get('bookPrice')
    };
    
    // Validate mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(orderData.mobileNo)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(orderData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    showSuccessMessage(orderData);
    
    // Reset form
    event.target.reset();
    
    // Clear book selection
    document.getElementById('bookName').value = '';
    document.getElementById('bookPrice').value = '';
}

function showSuccessMessage(orderData) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <h3>Order Submitted Successfully!</h3>
        <p>Thank you, ${orderData.customerName}!</p>
        <p>Your order for "${orderData.bookName}" (${orderData.bookPrice}) has been received.</p>
        <p>We will contact you at ${orderData.mobileNo} for delivery confirmation.</p>
    `;
    
    // Insert success message at the top of form
    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(successDiv, formContainer.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Log order data (in real application, this would be sent to server)
    console.log('Order Data:', orderData);
}

// Search icon click functionality
document.querySelector('.search-icon').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();
    
    // Trigger search if there's text
    if (searchInput.value.trim() !== '') {
        searchInput.dispatchEvent(new Event('input'));
    }
});

// Enter key search functionality
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        this.dispatchEvent(new Event('input'));
    }
});

// Clear search when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        // Optional: Clear search when clicking outside
        // document.getElementById('searchInput').value = '';
        // document.querySelectorAll('.book-card').forEach(card => {
        //     card.classList.remove('hidden');
        // });
    }
});

// Smooth scroll for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add loading animation for buy buttons
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.opacity = '0.7';
        this.innerHTML = 'LOADING...';
        
        setTimeout(() => {
            this.style.opacity = '1';
            this.innerHTML = 'BUY NOW';
        }, 1000);
    });
});

// Form validation enhancements
document.getElementById('mobileNo').addEventListener('input', function(e) {
    // Only allow numbers
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// Real-time email validation
document.getElementById('email').addEventListener('blur', function(e) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailPattern.test(this.value)) {
        this.style.borderColor = '#dc3545';
        this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    } else {
        this.style.borderColor = '#ddd';
        this.style.boxShadow = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bookstore loaded successfully!');
    
    // Add hover effects to book cards
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});



