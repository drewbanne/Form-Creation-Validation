// Wrap the entire script in a DOMContentLoaded event listener.
// This ensures that the JavaScript code runs only after the entire HTML document
// has been fully loaded and parsed. This is crucial because the script needs
// to access HTML elements (like the form, inputs, and feedback div) which
// might not exist in the DOM if the script runs too early.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Selection:
    // Select the form element using its ID and store it in a constant.
    const form = document.getElementById('registration-form');

    // 2. Feedback Division Selection:
    // Select the div where validation feedback messages will be displayed.
    const feedbackDiv = document.getElementById('form-feedback');

    // 3. Form Submission Event Listener:
    // Add an event listener to the form to handle its 'submit' event.
    // When the form is submitted (e.g., by clicking the 'Register' button or pressing Enter),
    // the provided anonymous function will be executed.
    form.addEventListener('submit', (event) => {
        // Prevent default form submission:
        // This is crucial for client-side validation. By default, a form submission
        // triggers a page reload or navigates to the 'action' URL. We want to
        // handle validation with JavaScript first, so we prevent this default behavior.
        event.preventDefault();

        // 4. Input Retrieval and Trimming:
        // Retrieve the values from each input field.
        // The .trim() method is used to remove any leading or trailing whitespace
        // (like spaces, tabs, or newlines) from the input values. This prevents
        // users from submitting effectively empty inputs that only contain spaces.
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // 5. Initialize Validation Variables:
        // isValid: A boolean flag to track the overall validation status.
        //          It starts as true and will be set to false if any validation fails.
        // messages: An array to collect all individual error messages.
        let isValid = true;
        const messages = [];

        // 6. Validation Logic:

        // Username Validation:
        // Check if the trimmed username length is less than 3 characters.
        if (username.length < 3) {
            isValid = false; // Set overall status to false
            messages.push('Username must be at least 3 characters long.'); // Add specific error message
        }

        // Email Validation:
        // Check if the trimmed email includes both '@' and '.' characters.
        // This is a basic check; a more robust email validation would use regular expressions.
        if (!email.includes('@') || !email.includes('.')) {
            isValid = false; // Set overall status to false
            messages.push('Please enter a valid email address (must contain @ and .).'); // Add specific error message
        }

        // Password Validation:
        // Ensure the trimmed password length is at least 8 characters.
        if (password.length < 8) {
            isValid = false; // Set overall status to false
            messages.push('Password must be at least 8 characters long.'); // Add specific error message
        }

        // 7. Displaying Feedback:

        // Make the feedback div visible.
        feedbackDiv.style.display = "block";

        // If isValid is still true after all checks, display a success message.
        if (isValid) {
            feedbackDiv.textContent = 'Registration successful!'; // Set success text
            feedbackDiv.style.color = '#28a745'; // Green text color for success
            feedbackDiv.style.backgroundColor = '#d4edda'; // Light green background for success
        } else {
            // If validation failed, join all collected error messages with a <br> tag
            // to display each message on a new line within the feedback div.
            feedbackDiv.innerHTML = messages.join('<br>'); // Use innerHTML for HTML tags like <br>
            feedbackDiv.style.color = '#dc3545'; // Red text color for errors
            feedbackDiv.style.backgroundColor = '#ffbaba'; // Light red background for errors
        }
    });
});
