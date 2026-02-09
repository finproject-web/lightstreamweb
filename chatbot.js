// LightStream Chatbot Functionality
class LightStreamChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-widget" class="chatbot-hidden">
                <div id="chatbot-header">
                    <span>💬 LightStream Assistant</span>
                    <button id="chatbot-minimize">−</button>
                </div>
                <div id="chatbot-messages"></div>
                <div id="chatbot-shortcuts">
                    <div class="shortcut-grid">
                        <button class="shortcut-btn" data-question="What is a personal loan?">What is a personal loan?</button>
                        <button class="shortcut-btn" data-question="How much can I borrow?">How much can I borrow?</button>
                        <button class="shortcut-btn" data-question="How fast is approval?">How fast is approval?</button>
                        <button class="shortcut-btn" data-question="What are the eligibility requirements?">Eligibility requirements</button>
                    </div>
                </div>
                <div id="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Type your question here..." maxlength="200">
                    <button id="chatbot-send">Send</button>
                </div>
            </div>
            <div id="chatbot-toggle">💬</div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', () => this.toggleChatbot());
        document.getElementById('chatbot-minimize').addEventListener('click', () => this.toggleChatbot());

        // Send message
        document.getElementById('chatbot-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Shortcut buttons
        document.querySelectorAll('.shortcut-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.handleUserInput(question);
            });
        });
    }

    toggleChatbot() {
        const widget = document.getElementById('chatbot-widget');
        const toggle = document.getElementById('chatbot-toggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            widget.classList.remove('chatbot-hidden');
            toggle.classList.add('chatbot-hidden');
            widget.classList.remove('chatbot-minimized');
        } else {
            widget.classList.add('chatbot-hidden');
            toggle.classList.remove('chatbot-hidden');
            widget.classList.add('chatbot-minimized');
        }
    }

    addWelcomeMessage() {
        this.addMessage('bot', '👋 Hi! Welcome to LightStream. How can I help you today?');
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message === '') return;
        
        this.addMessage('user', message);
        this.handleUserInput(message);
        input.value = '';
    }

    addMessage(sender, message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${sender}-bubble`;
        bubble.textContent = message;
        
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ sender, message, timestamp: new Date() });
    }

    handleUserInput(input) {
        const response = this.getBotResponse(input);
        setTimeout(() => {
            this.addMessage('bot', response);
        }, 500 + Math.random() * 500); // Natural delay
    }

    getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        
        // Check all 25 predefined questions
        const responses = {
            'what is a personal loan?': 'A personal loan is an unsecured loan you can borrow for personal use and repay with fixed interest over time.',
            'how much can i borrow?': 'We offer unsecured loans from $2,000 to $25,000 at just 10% interest.',
            'how fast is approval?': 'Loan approval is fast! Approved loans are disbursed to your bank account within 24 hours.',
            'what are the eligibility requirements?': 'You must be 18+, have a valid bank account, and complete the loan application and Bank authentication form.',
            'what documents do i need?': 'Required documents include your ID, completed loan application, and bank authentication form.',
            'can i download the agreement?': 'Yes, all agreements and documents can be downloaded after completing your application and Bank authentication.',
            'how do i apply online?': 'You can apply online by completing the loan application form directly on our website.',
            'what is the loan tenure?': 'Loan repayment schedules depend on your loan amount and terms. Full details are provided after approval.',
            'do i need collateral?': 'No collateral is required; this is an unsecured loan.',
            'can i prepay the loan?': 'Yes, partial or full prepayment is allowed without extra charges.',
            'what if i miss a payment?': 'Late payments may incur a penalty. Please contact support if you have any issues.',
            'how can i track my application?': 'You can track your application status by logging into your account or contacting support.',
            'is the application process online?': 'Yes, the entire loan application process is online and paperless.',
            'do i need a co-applicant?': 'Not mandatory, but having a co-applicant may improve your approval chances.',
            'can i apply for multiple loans?': 'Multiple loan applications are allowed, subject to eligibility and approval.',
            'how is interest calculated?': 'Interest is calculated at 10% on the principal amount for your chosen loan tenure.',
            'can self-employed people apply?': 'Yes, self-employed individuals are eligible with income proof and bank authentication.',
            'can i track disbursal and documents?': 'Yes, you can track loan disbursal and download agreements from your account.',
            'are all agreements digital?': 'Yes, all loan agreements and forms are available digitally after approval.',
            'how can i contact support?': 'Our support team is available via chat or email for any questions or assistance.',
            'what can i use the loan for?': 'Personal loans can be used for debt consolidation, education, medical emergencies, or other personal needs.',
            'how long does approval take?': 'Approval decisions are typically made within 24 hours after completing your application and verification.',
            'what is bank authentication?': 'Bank authentication verifies your account for fast and secure disbursal of your loan.',
            'can i keep a copy of agreement?': 'Yes, you can download and save all loan documents after approval.',
            'what if i need extra help?': 'Our team is available via chat or email during working hours, or you can leave a message and we will respond promptly.'
        };

        // Check for exact matches first
        if (responses[lowerInput]) {
            return responses[lowerInput];
        }

        // Check for partial matches
        for (const [key, value] of Object.entries(responses)) {
            if (lowerInput.includes(key.substring(0, 10))) {
                return value;
            }
        }

        // Check for keywords
        if (lowerInput.includes('loan') && lowerInput.includes('what')) {
            return 'A personal loan is an unsecured loan you can borrow for personal use and repay with fixed interest over time.';
        }
        if (lowerInput.includes('borrow') || lowerInput.includes('amount')) {
            return 'We offer unsecured loans from $2,000 to $25,000 at just 10% interest.';
        }
        if (lowerInput.includes('approval') || lowerInput.includes('fast')) {
            return 'Loan approval is fast! Approved loans are disbursed to your bank account within 24 hours.';
        }
        if (lowerInput.includes('eligible') || lowerInput.includes('requirement')) {
            return 'You must be 18+, have a valid bank account, and complete the loan application and Bank authentication form.';
        }
        if (lowerInput.includes('document')) {
            return 'Required documents include your ID, completed loan application, and bank authentication form.';
        }
        if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help')) {
            return 'Our support team is available via chat or email for any questions or assistance.';
        }
        if (lowerInput.includes('apply')) {
            return 'You can apply online by completing the loan application form directly on our website.';
        }
        if (lowerInput.includes('collateral')) {
            return 'No collateral is required; this is an unsecured loan.';
        }
        if (lowerInput.includes('interest')) {
            return 'Interest is calculated at 10% on the principal amount for your chosen loan tenure.';
        }

        // Default response
        return 'I can help you with information about our personal loans! Try asking about loan amounts, eligibility, approval time, or application process. You can also click the shortcut buttons for quick answers.';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LightStreamChatbot();
});
