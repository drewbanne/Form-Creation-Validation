// Ensure the script runs only after the entire HTML document has been loaded.
// This is critical because the script needs to access specific HTML elements
// (like the 'api-data' div) that must exist in the DOM.
document.addEventListener('DOMContentLoaded', () => {

    // Initialize the Async Function:
    // Define an asynchronous function named fetchUserData.
    // The 'async' keyword allows us to use 'await' inside this function,
    // making asynchronous operations (like fetching data) look like synchronous code.
    async function fetchUserData() {
        // Define the API URL:
        // This constant holds the endpoint for fetching user data.
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';

        // Select the Data Container Element:
        // Get a reference to the HTML element where the fetched data will be displayed.
        const dataContainer = document.getElementById('api-data');

        // Fetch Data Using try-catch:
        // A try-catch block is used to gracefully handle any errors that might occur
        // during the asynchronous fetch operation (e.g., network issues, invalid URL).
        try {
            // In the try block:
            // Use 'await' with the 'fetch' function to send a network request to the API.
            // 'fetch' returns a Promise that resolves to the Response object.
            const response = await fetch(apiUrl);

            // Check if the response was successful (status code 200-299).
            // If the response is not OK (e.g., 404 Not Found, 500 Server Error),
            // throw an error to be caught by the catch block.
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Convert the response body to JSON format.
            // 'response.json()' also returns a Promise, so 'await' is used here too.
            const users = await response.json();

            // Clear the Loading Message:
            // Before populating the dataContainer with new content,
            // clear its existing "Loading user data..." message.
            dataContainer.innerHTML = '';

            // Create and Append User List:
            // Create an unordered list (<ul>) element.
            const userList = document.createElement('ul');

            // Loop through the 'users' array.
            // 'forEach' iterates over each user object in the array.
            users.forEach(user => {
                // Create a list item (<li>) element for each user.
                const listItem = document.createElement('li');

                // Set the text content of the <li> to the user's 'name' property.
                listItem.textContent = user.name;

                // Append the created <li> to the <ul> element.
                userList.appendChild(listItem);
            });

            // After the loop, append the completed <ul> (containing all user names)
            // to the dataContainer div on the webpage.
            dataContainer.appendChild(userList);

        } catch (error) {
            // Error Handling:
            // In the catch block, if any error occurs during the 'try' block,
            // this code will execute.
            console.error("Failed to fetch user data:", error); // Log the error for debugging.
            // Clear dataContainer and display a user-friendly error message.
            dataContainer.innerHTML = ''; // Clear existing content
            dataContainer.textContent = 'Failed to load user data.';
            dataContainer.style.color = 'red'; // Optional: make error message red
        }
    }

    // Invoke fetchUserData on DOMContentLoaded:
    // Call the fetchUserData function to start the data fetching process
    // once the DOM is ready.
    fetchUserData();
});
