
// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const userNameSpan = document.getElementById('userName');
const lastLoginSpan = document.getElementById('lastLogin');
const logoutBtn = document.getElementById('logoutBtn');

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.isLoggedIn) {
        showDashboard(userData.username);
    }
});

// Show dashboard function
function showDashboard(username) {
    // Update dashboard content
    userNameSpan.textContent = username;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    lastLoginSpan.textContent = now.toLocaleDateString('en-US', options);
    
    // Switch views with animation
    loginSection.classList.add('hidden');
    dashboardSection.style.display = 'block';
    dashboardSection.classList.add('fade-in');
}

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login process
    if (username && password) {
        // Show loading state
        const submitBtn = loginForm.querySelector('button');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Save login state
            const userData = {
                username: username,
                isLoggedIn: true
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            showDashboard(username);
            
            // Reset button state
            submitBtn.innerHTML = 'Sign In <i class="fas fa-arrow-right"></i>';
            submitBtn.disabled = false;
        }, 1500);
    } else {
        alert('Please enter valid credentials');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    // Update user state
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    userData.isLoggedIn = false;
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Reset form and show login
    loginForm.reset();
    dashboardSection.classList.remove('fade-in');
    dashboardSection.style.display = 'none';
    loginSection.classList.remove('hidden');
});
