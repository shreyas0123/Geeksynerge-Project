async function saveToCloudStoarage(event) {
  try {
    event.preventDefault(); // Prevents the default form submission behavior

    // Extracts email and password from the form input fields
    const loginDetails = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    console.log('loginDetails', loginDetails); // Logs the extracted login details to the console

    // Sends a POST request to the login endpoint with loginDetails
    const response = await axios.post('http://localhost:3000/login', loginDetails);

    event.target.reset(); // Resets the form fields after successful login
    alert(response.data.message); // Displays a message from the server response

    // Stores the token received from the server in the browser's localStorage
    localStorage.setItem('token', response.data.token);

    // Redirects the user to the home.html page upon successful login
    window.location.href = "./home.html";
  } catch (error) {
    // Handles any errors that occur during the login process
    const errorMessage = error.message || 'An error occurred';
    
    // Constructs an HTML snippet to display the error message on the page
    const errorHtml = `
      <div class="col-lg-6 col-lg-offset-4">
        <p class="text-danger">${errorMessage}</p>
      </div>
    `;
    
    // Appends the error message to the document body
    document.body.innerHTML += errorHtml;
  }
}
