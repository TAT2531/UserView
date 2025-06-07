
// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');
const loginSection = document.querySelector('.card');
const dashboardSection = document.getElementById('dashboardSection');
const userNameSpan = document.getElementById('userName');
const lastLoginSpan = document.getElementById('lastLogin');
const logoutBtn = document.getElementById('logoutBtn');
const strengthMeter = document.getElementById('strengthMeter');

// Password rules elements
const ruleLength = document.getElementById('rule-length');
const ruleUppercase = document.getElementById('rule-uppercase');
const ruleLowercase = document.getElementById('rule-lowercase');
const ruleNumber = document.getElementById('rule-number');
const ruleSpecial = document.getElementById('rule-special');

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Real-time password validation
passwordInput.addEventListener('input', function() {
    validatePassword(this.value);
    updateStrengthMeter(this.value);
});

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Update password strength meter
function updateStrengthMeter(password) {
    let strength = 0;
    
    // Length
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    
    // Character diversity
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*]/.test(password)) strength += 20;
    
    strengthMeter.style.width = strength + '%';
    
    // Update color based on strength
    if (strength < 40) {
        strengthMeter.style.background = 'var(--danger)';
    } else if (strength < 80) {
        strengthMeter.style.background = 'var(--warning)';
    } else {
        strengthMeter.style.background = '#28a745';
    }
}

// Validate password strength
function validatePassword(password) {
    let isValid = true;
    let errors = [];
    
    // Reset rules styling
    const rules = [ruleLength, ruleUppercase, ruleLowercase, ruleNumber, ruleSpecial];
    rules.forEach(rule => {
        rule.classList.remove('rule-valid');
        rule.querySelector('i').className = 'fas fa-circle';
    });
    
    // Check length
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
        isValid = false;
    } else {
        ruleLength.classList.add('rule-valid');
        ruleLength.querySelector('i').className = 'fas fa-check-circle';
    }
    
    // Check uppercase
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter (A-Z)');
        isValid = false;
    } else {
        ruleUppercase.classList.add('rule-valid');
        ruleUppercase.querySelector('i').className = 'fas fa-check-circle';
    }
    
    // Check lowercase
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter (a-z)');
        isValid = false;
    } else {
        ruleLowercase.classList.add('rule-valid');
        ruleLowercase.querySelector('i').className = 'fas fa-check-circle';
    }
    
    // Check number
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number (0-9)');
        isValid = false;
    } else {
        ruleNumber.classList.add('rule-valid');
        ruleNumber.querySelector('i').className = 'fas fa-check-circle';
    }
    
    // Check special character
    if (!/[!@#$%^&*]/.test(password)) {
        errors.push('Password must contain at least one special character (!@#$%^&*)');
        isValid = false;
    } else {
        ruleSpecial.classList.add('rule-valid');
        ruleSpecial.querySelector('i').className = 'fas fa-check-circle';
    }
    
    // Display errors
    if (errors.length > 0) {
        passwordError.textContent = errors.join('. ');
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }
    
    return isValid;
}

// Form submission handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    
    const email = usernameInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;
    
    // Validate email
    if (!validateEmail(email)) {
        emailError.style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        isValid = false;
    }
    
    // If valid, show dashboard
    if (isValid) {
        // Store user info
        localStorage.setItem('username', email);
        localStorage.setItem('lastLogin', new Date().toLocaleString());
        
        // Show dashboard
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        userNameSpan.textContent = email.split('@')[0];
        lastLoginSpan.textContent = localStorage.getItem('lastLogin');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', function() {
    // Clear stored data
    localStorage.removeItem('username');
    localStorage.removeItem('lastLogin');
    
    // Show login form
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'block';
    
    // Reset form
    loginForm.reset();
    
    // Reset validation states
    const rules = [ruleLength, ruleUppercase, ruleLowercase, ruleNumber, ruleSpecial];
    rules.forEach(rule => {
        rule.classList.remove('rule-valid');
        rule.querySelector('i').className = 'fas fa-circle';
    });
    passwordError.style.display = 'none';
    emailError.style.display = 'none';
    strengthMeter.style.width = '0%';
});

// Check if user is already logged in
if (localStorage.getItem('username')) {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    userNameSpan.textContent = localStorage.getItem('username').split('@')[0];
    lastLoginSpan.textContent = localStorage.getItem('lastLogin');
}
