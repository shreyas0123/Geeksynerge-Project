const forgotButton = document.getElementById('forgot-button'); // Retrieves the button element by its ID
const email = document.getElementById('email'); // Retrieves the email input element by its ID

forgotButton.addEventListener("click", forgotPassword); // Adds an event listener to the button, triggering the forgotPassword function on click

async function forgotPassword(event) {
    try {
        const obj = { email: email.value }; // Constructs an object with the email value from the input field
        event.preventDefault(); // Prevents the default form submission behavior

        // Sends a POST request to the server endpoint for handling forgot password functionality
        const data = await axios.post("http://localhost:3000/forgot-password", obj);
        
        console.log(data); // Logs the response data from the server
        email.value = ""; // Clears the email input field after submission
    } catch (error) {
        console.log('error from forgot.js front end', error); // Logs any errors that occur during the process
    }
}
