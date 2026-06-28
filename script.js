// Multi-step form functionality
let currentStep = 1;
const totalSteps = 5;
const formData = {};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded and DOM ready');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Test if form exists
    const form = document.getElementById('loanApplicationForm');
    console.log('Form found:', form);
    
    // Test if submit button exists
    updateProgress();
});

// Step navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            // Mark current step as completed
            document.querySelector(`.step-indicator:nth-child(${currentStep})`).classList.add('completed');
            document.querySelector(`.step-indicator:nth-child(${currentStep})`).classList.remove('active');
            
            // Hide current step
            document.getElementById(`step${currentStep}`).classList.remove('active');
            
            // Move to next step
            currentStep++;
            
            // Show next step
            document.getElementById(`step${currentStep}`).classList.add('active');
            document.querySelector(`.step-indicator:nth-child(${currentStep})`).classList.add('active');
            
            // Update progress
            updateProgress();
            
            // Update summary if on review step
            if (currentStep === 5) {
                updateApplicationSummary();
            }
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Remove active from current step
        document.querySelector(`.step-indicator:nth-child(${currentStep})`).classList.remove('active');
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Move to previous step
        currentStep--;
        
        // Show previous step
        document.getElementById(`step${currentStep}`).classList.add('active');
        document.querySelector(`.step-indicator:nth-child(${currentStep})`).classList.add('active');
        document.querySelector(`.step-indicator:nth-child(${currentStep})`).classList.remove('completed');
        
        // Update progress
        updateProgress();
    }
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const currentStepSpan = document.getElementById('currentStep');
    const stepTitle = document.getElementById('stepTitle');
    
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    currentStepSpan.textContent = currentStep;
    
    const stepTitles = ['Loan Details', 'Personal Information', 'Financial Information', 'Employment & Income', 'Review & Submit'];
    stepTitle.textContent = stepTitles[currentStep - 1];
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (field.type === 'checkbox') {
            // Checkbox validation
            if (!field.checked) {
                isValid = false;
                field.classList.add('border-red-500');
                setTimeout(() => {
                    field.classList.remove('border-red-500');
                }, 3000);
            } else {
                field.classList.remove('border-red-500');
            }
        } else {
            // Text/input validation
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                setTimeout(() => {
                    field.classList.remove('border-red-500');
                }, 3000);
            } else {
                field.classList.remove('border-red-500');
            }
        }
    });
    
    // Email validation
    const emailField = currentStepElement.querySelector('#email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('border-red-500');
            setTimeout(() => {
                emailField.classList.remove('border-red-500');
            }, 3000);
        }
    }
    
    // Phone validation
    const phoneField = currentStepElement.querySelector('#phone');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(phoneField.value) || phoneField.value.replace(/\D/g, '').length < 10) {
            isValid = false;
            phoneField.classList.add('border-red-500');
            setTimeout(() => {
                phoneField.classList.remove('border-red-500');
            }, 3000);
        }
    }
    
    if (!isValid) {
        if (currentStep === 5) {
            showNotification('Please check both checkboxes to proceed.', 'error');
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    }
    
    return isValid;
}

function updateApplicationSummary() {
    console.log('updateApplicationSummary called');
    
    const summaryElement = document.getElementById('applicationSummary');
    if (!summaryElement) {
        console.error('applicationSummary element not found');
        return;
    }
    
    // Collect form data directly from input elements
    const loanAmount = document.getElementById('loanAmount')?.value || 'Not entered';
    const loanPurpose = document.getElementById('loanPurpose')?.value || 'Not entered';
    const creditScore = document.getElementById('creditScore')?.value || 'Not entered';
    const firstName = document.getElementById('firstName')?.value || 'Not entered';
    const lastName = document.getElementById('lastName')?.value || 'Not entered';
    const email = document.getElementById('email')?.value || 'Not entered';
    const phone = document.getElementById('phone')?.value || 'Not entered';
    
    // Address fields
    const address = document.getElementById('address')?.value || 'Not entered';
    const city = document.getElementById('city')?.value || 'Not entered';
    const state = document.getElementById('state')?.value || 'Not entered';
    const zipCode = document.getElementById('zipCode')?.value || 'Not entered';
    
    // Financial Information fields (Step 3)
    const socialSecurity = document.getElementById('socialSecurity')?.value || 'Not entered';
    const bankName = document.getElementById('bankName')?.value || 'Not entered';
    const routingNumber = document.getElementById('routingNumber')?.value || 'Not entered';
    const accountNumber = document.getElementById('accountNumber')?.value || 'Not entered';
    
    const annualIncome = document.getElementById('annualIncome')?.value || 'Not entered';
    const employmentStatus = document.getElementById('employmentStatus')?.value || 'Not entered';
    const monthlyHousing = document.getElementById('monthlyHousing')?.value || 'Not entered';
    
    console.log('Collected form data:', {
        loanAmount, loanPurpose, creditScore, firstName, lastName, email, phone,
        address, city, state, zipCode, socialSecurity, bankName, routingNumber, accountNumber,
        annualIncome, employmentStatus, monthlyHousing
    });
    
    // Build summary HTML
    let summaryHTML = '<div class="space-y-4">';
    
    // Loan Details
    summaryHTML += '<div class="border-b pb-3"><h4 class="font-bold text-lg text-gray-800 mb-2">Loan Details</h4>';
    summaryHTML += `<p class="text-gray-700"><strong>Loan Amount:</strong> <span class="text-blue-600">$${loanAmount}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Loan Purpose:</strong> <span class="text-blue-600">${loanPurpose}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Credit Score:</strong> <span class="text-blue-600">${creditScore}</span></p>`;
    summaryHTML += '</div>';
    
    // Personal Information
    summaryHTML += '<div class="border-b pb-3"><h4 class="font-bold text-lg text-gray-800 mb-2">Personal Information</h4>';
    summaryHTML += `<p class="text-gray-700"><strong>Name:</strong> <span class="text-blue-600">${firstName} ${lastName}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Email:</strong> <span class="text-blue-600">${email}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Phone:</strong> <span class="text-blue-600">${phone}</span></p>`;
    summaryHTML += '</div>';
    
    // Address Information
    summaryHTML += '<div class="border-b pb-3"><h4 class="font-bold text-lg text-gray-800 mb-2">Address Information</h4>';
    summaryHTML += `<p class="text-gray-700"><strong>Street Address:</strong> <span class="text-blue-600">${address}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>City:</strong> <span class="text-blue-600">${city}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>State:</strong> <span class="text-blue-600">${state}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>ZIP Code:</strong> <span class="text-blue-600">${zipCode}</span></p>`;
    summaryHTML += '</div>';
    
    // Financial Information (Step 3)
    summaryHTML += '<div class="border-b pb-3"><h4 class="font-bold text-lg text-gray-800 mb-2">Financial Information</h4>';
    summaryHTML += `<p class="text-gray-700"><strong>Social Security Number:</strong> <span class="text-blue-600">${socialSecurity}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Bank Name:</strong> <span class="text-blue-600">${bankName}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Routing Number:</strong> <span class="text-blue-600">${routingNumber}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Account Number:</strong> <span class="text-blue-600">${accountNumber}</span></p>`;
    summaryHTML += '</div>';
    
    // Employment & Income (Step 4)
    summaryHTML += '<div><h4 class="font-bold text-lg text-gray-800 mb-2">Employment & Income</h4>';
    summaryHTML += `<p class="text-gray-700"><strong>Annual Income:</strong> <span class="text-blue-600">$${annualIncome}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Employment Status:</strong> <span class="text-blue-600">${employmentStatus}</span></p>`;
    summaryHTML += `<p class="text-gray-700"><strong>Monthly Housing:</strong> <span class="text-blue-600">$${monthlyHousing}</span></p>`;
    summaryHTML += '</div>';
    
    summaryHTML += '</div>';
    
    console.log('Summary HTML generated');
    
    // Update the summary
    setTimeout(() => {
        summaryElement.innerHTML = summaryHTML;
        console.log('Summary updated successfully');
    }, 100);
}

function submitApplication(data) {
    console.log('submitApplication called with data:', data);
    
    // Show loading state - find the submit button by onclick attribute
    const submitButton = document.querySelector('button[onclick*="submitPersonalLoanForm"]');
    let originalText = 'Submit Application';
    
    if (submitButton) {
        originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
    }
    
    console.log('Sending email via Google Script...');
    
    // Prepare email data for Google Script
    const emailData = {
        to: 'lightstreamloanservices@gmail.com',
        subject: `New ${data.applicationType} - ${data.firstName} ${data.lastName}`,
        body: `
Application Details:

Customer Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Address: ${data.address}, ${data.city}, ${data.state} ${data.zipCode}

Loan Information:
- Loan Amount: $${data.loanAmount}
- Loan Purpose: ${data.loanPurpose}
- Credit Score: ${data.creditScore}

Bank Information:
- Bank Name: ${data.bankName}
- Routing Number: ${data.routingNumber}
- Account Number: ****${data.accountNumber ? data.accountNumber.slice(-4) : ''}

Application Date: ${new Date().toLocaleString()}
        `
    };

    // Send via Google Script
    fetch('https://script.google.com/macros/s/AKfycbx8b5NeTupGf1IIsC4fSPdEsb-6xGgtXF8hvQGbjMsF7GZ1DEH1cFUL7nfKLOV3oqR53A/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
    .then(() => {
        console.log('✅ Email sent successfully via Google Script');
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
        showNotification('Application submitted successfully!', 'success');
    })
    .catch(error => {
        console.log('❌ Email failed...', error);
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
        showNotification('Error submitting application. Please try again.', 'error');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
    
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
    } else {
        notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Phone number formatting and validation
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    e.target.value = value;
});

// Email validation
document.getElementById('email')?.addEventListener('blur', function(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.classList.add('border-red-500');
        setTimeout(() => {
            e.target.classList.remove('border-red-500');
        }, 3000);
    } else {
        e.target.classList.remove('border-red-500');
    }
});

// Loan amount validation with limits (1000-100000) - allows typing
document.getElementById('loanAmount')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Allow typing, but apply limits when user stops typing
    if (value) {
        e.target.value = value;
        
        // Check limits and show warning if needed
        const numValue = parseInt(value);
        if (numValue < 1000 || numValue > 100000) {
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        } else {
            e.target.classList.remove('border-orange-500');
        }
    }
});

// Apply limits when user leaves the field
document.getElementById('loanAmount')?.addEventListener('blur', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value) {
        const numValue = parseInt(value);
        if (numValue < 1000) {
            e.target.value = '1000';
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        } else if (numValue > 100000) {
            e.target.value = '100000';
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        }
    }
});

// Annual income validation with limits (1000-100000) - allows typing
document.getElementById('annualIncome')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Allow typing, but apply limits when user stops typing
    if (value) {
        e.target.value = value;
        
        // Check limits and show warning if needed
        const numValue = parseInt(value);
        if (numValue < 1000 || numValue > 100000) {
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        } else {
            e.target.classList.remove('border-orange-500');
        }
    }
});

// Apply limits when user leaves the field
document.getElementById('annualIncome')?.addEventListener('blur', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value) {
        const numValue = parseInt(value);
        if (numValue < 1000) {
            e.target.value = '1000';
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        } else if (numValue > 100000) {
            e.target.value = '100000';
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        }
    }
});

// Monthly housing validation with limits (100-10000) - allows typing
document.getElementById('monthlyHousing')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Allow typing, but apply limits when user stops typing
    if (value) {
        e.target.value = value;
        
        // Check limits and show warning if needed
        const numValue = parseInt(value);
        if (numValue < 100 || numValue > 10000) {
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        } else {
            e.target.classList.remove('border-orange-500');
        }
    }
});

// Apply limits when user leaves the field
document.getElementById('monthlyHousing')?.addEventListener('blur', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value) {
        const numValue = parseInt(value);
        if (numValue < 100) {
            e.target.value = '100';
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        } else if (numValue > 10000) {
            e.target.value = '10000';
            e.target.classList.add('border-orange-500');
            setTimeout(() => {
                e.target.classList.remove('border-orange-500');
            }, 3000);
        }
    }
});

// Anti-spam honey pot field
const honeypotField = document.createElement('input');
honeypotField.type = 'text';
honeypotField.name = 'honeypot';
honeypotField.style.display = 'none';
honeypotField.setAttribute('autocomplete', 'off');

// Add honeypot to form when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loanApplicationForm');
    if (form) {
        form.appendChild(honeypotField);
    }
});
