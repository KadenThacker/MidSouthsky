/*
   Mid-South Sky Project JavaScript
   Filename: script.js
   Author: Kaden Thacker
   Date: 12/1/2025
*/


document.addEventListener('DOMContentLoaded', function() {
    
    // Styles for form validation and messages
    var styleTag = document.createElement('style');
    styleTag.textContent = `
        /* Form input focus state */
        .form-group input:focus,
        .form-group textarea:focus {
            background-color: #e8b0f7 !important;
            outline: none;
        }
        
        /* Form input valid state */
        .form-group input:valid,
        .form-group textarea:valid {
            background-color: #98edb5 !important;
        }
        
        /* Error state for inputs */
        .input-error {
            border: 2px solid #ff0000 !important;
            background-color: #ffe6e6 !important;
        }
        
        /* Our messages */
        .msg-box {
            position: fixed;
            top: 25px;
            right: 25px;
            padding: 18px 22px;
            border-radius: 6px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            font-size: 15px;
            max-width: 320px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.35s ease-out;
        }
        
        /* Success message */
        .msg-success {
            background: #28a745;
            color: white;
            border-left: 5px solid #1e7e34;
        }
        
        /* Error message */
        .msg-error {
            background: #dc3545;
            color: white;
            border-left: 5px solid #c82333;
        }
        
        /* Close button */
        .msg-close {
            float: right;
            background: none;
            border: none;
            color: white;
            font-size: 22px;
            cursor: pointer;
            margin-left: 15px;
            line-height: 1;
            padding: 0 6px;
        }
        
        .msg-close:hover {
            opacity: 0.8;
        }
        
        /* Animation */
        @keyframes slideIn {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
            .msg-box {
                left: 15px;
                right: 15px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(styleTag);
    
    // Form validation and submission handling
    // Check if we're on the quote page
    var quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        
        // When form is submitted
        quoteForm.addEventListener('submit', function(e) {
            // Stop the form from submitting normally
            e.preventDefault();
            
            // Keep track of errors
            var errors = [];
            var hasError = false;
            
            // Check each required field
            var requiredFields = quoteForm.querySelectorAll('[required]');
            for (var i = 0; i < requiredFields.length; i++) {
                var field = requiredFields[i];
                
                // Clear previous error
                field.classList.remove('input-error');
                
                // Check if empty
                if (!field.value.trim()) {
                    hasError = true;
                    field.classList.add('input-error');
                    var label = field.previousElementSibling;
                    var fieldName = label ? label.textContent.replace('*', '') : 'This field';
                    errors.push(fieldName + ' is required');
                }
            }
            
            // Check email format if filled
            var emailField = document.getElementById('email');
            if (emailField.value.trim()) {
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    hasError = true;
                    emailField.classList.add('input-error');
                    errors.push('Please enter a valid email address');
                }
            }
            
            // Check if business type is selected
            var businessType = document.querySelector('input[name="business-type"]:checked');
            if (!businessType) {
                hasError = true;
                errors.push('Please select a business type');
            }
            
            // Check if service package is selected
            var servicePackage = document.querySelector('input[name="service-package"]:checked');
            if (!servicePackage) {
                hasError = true;
                errors.push('Please select a service package');
            }
            
            // Show appropriate message
            if (hasError) {
                showMessage('error', errors.join('<br>'));
            } else {
                showMessage('success', 'Thanks! Your quote request has been sent. We\'ll contact you within 24-48 hours.');
                // Clear the form
                quoteForm.reset();
            }
        });
        
        // Add focus/blur listeners for visual feedback
        var allInputs = quoteForm.querySelectorAll('input, textarea');
        for (var i = 0; i < allInputs.length; i++) {
            var input = allInputs[i];
            
            // When user clicks into field
            input.addEventListener('focus', function() {
                this.classList.remove('input-error');
            });
            
            // When user leaves field
            input.addEventListener('blur', function() {
                if (this.value.trim() && this.checkValidity()) {
                    this.classList.remove('input-error');
                }
            });
        }
        
        console.log('Form validation ready');
    }
    
    // Message display function
    function showMessage(type, text) {
        // Remove any existing messages first
        var oldMsg = document.querySelector('.msg-box');
        if (oldMsg) {
            oldMsg.remove();
        }
        
        // Create the message box
        var msgBox = document.createElement('div');
        msgBox.className = 'msg-box msg-' + type;
        
        // Build the message content
        var msgContent = '<span>' + text + '</span>';
        msgContent += '<button class="msg-close">&times;</button>';
        
        msgBox.innerHTML = msgContent;
        
        // Add to page
        document.body.appendChild(msgBox);
        
        // Auto-remove after 7 seconds
        var autoRemove = setTimeout(function() {
            if (msgBox.parentNode) {
                msgBox.style.opacity = '0';
                msgBox.style.transition = 'opacity 0.3s';
                setTimeout(function() {
                    if (msgBox.parentNode) {
                        msgBox.remove();
                    }
                }, 300);
            }
        }, 7000);
        
        // Close button click
        var closeBtn = msgBox.querySelector('.msg-close');
        closeBtn.addEventListener('click', function() {
            clearTimeout(autoRemove);
            msgBox.style.opacity = '0';
            setTimeout(function() {
                if (msgBox.parentNode) {
                    msgBox.remove();
                }
            }, 300);
        });
    }
    
    // testing function
    // You can call this from browser console: testMessage()
    window.testMessage = function() {
        showMessage('success', 'This is a test success message!');
    };
    
    console.log('Mid-South Sky JS loaded successfully');
});