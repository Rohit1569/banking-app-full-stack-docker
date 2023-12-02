import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default class ValidationError extends Component {
    constructor(message, errorcode = 403, originalError = showValidationErrorToast(message)) {
        super(message, errorcode, originalError);
        this.name = 'Validation Error';
        this.name = 'Validation Error';
        console.log('validation error', message, errorcode, originalError);
    }
}

// Example of applying Tailwind CSS styles to the toast messages
const CustomToastStyles = {
    style: {
        // Define your custom styles here using Tailwind CSS classes
        background: 'bg-red-500', // Background color
        color: 'text-white', // Text color
        padding: 'p-4', // Padding
        borderRadius: 'rounded-lg', // Border radius
        boxShadow: 'shadow-md', // Box shadow
        // Add more styles as needed
    },
};

// Usage of the custom styles
const showValidationErrorToast = (message) => {
    toast.error(message, CustomToastStyles);
};

// In your application, you can call showValidationErrorToast with the desired message.
// Example:
// showValidationErrorToast("Invalid input. Please try again.");
