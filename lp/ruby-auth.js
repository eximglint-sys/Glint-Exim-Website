// Authentication Handler
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in (optional auto-redirect)
    // Comment out the next 4 lines if you want to always show login page
    const userData = localStorage.getItem('rubyUser');
    const urlParams = new URLSearchParams(window.location.search);
    const forceLogin = urlParams.get('force') === 'true';
    
    if (userData && !forceLogin) {
        // Show logout option instead of auto-redirecting
        // Uncomment next line to enable auto-redirect:
        // window.location.href = 'ruby-products.html';
        // return;
    }

    // Google Login
    document.getElementById('googleLogin').addEventListener('click', function() {
        // Mock Google OAuth - In production, use Firebase Auth or Google OAuth
        const mockUser = {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            provider: 'google',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('rubyUser', JSON.stringify(mockUser));
        window.location.href = 'ruby-products.html';
    });

    // Email Login
    document.getElementById('emailLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (!email) {
            alert('Please enter your email');
            return;
        }

        const userData = {
            name: email.split('@')[0],
            email: email,
            provider: 'email',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('rubyUser', JSON.stringify(userData));
        window.location.href = 'ruby-products.html';
    });

    // Phone Login
    document.getElementById('phoneLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const countryCode = document.getElementById('countryCode').value;
        const phone = document.getElementById('phone').value;
        
        if (!phone || phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

        const userData = {
            name: 'User',
            phone: countryCode + phone,
            provider: 'phone',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('rubyUser', JSON.stringify(userData));
        window.location.href = 'ruby-products.html';
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutSection = document.getElementById('logoutSection');
    
    // Show logout button if user is logged in
    if (userData && logoutSection) {
        logoutSection.style.display = 'block';
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear all user data
            localStorage.removeItem('rubyUser');
            localStorage.removeItem('rubyCartNew');
            localStorage.removeItem('rubyOrderAddress');
            localStorage.removeItem('rubyPayment');
            
            // Reload page to show login form
            window.location.reload();
        });
    }
});

