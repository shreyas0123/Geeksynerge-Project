async function signup(event){
  try{
      event.preventDefault(); // Prevents default form submission

      // Extracts form input values into signupDetails object
      const signupDetails = {
          name: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
          phoneNumber: event.target.number.value
      };
      console.log('signupDetails',signupDetails); // Logs extracted signup details

      // Sends a POST request to signup endpoint with signupDetails
      const response = await axios.post('http://localhost:3000/signup',signupDetails);
      event.target.reset(); // Resets form fields after successful signup

      // Redirects to login page if signup was successful
      if(response){
        console.log('response from addmethod:',response);
        window.location.href = "./login.html";
      } else {
          throw new Error('Failed to signup'); // Throws error if signup fails
      }
  } catch (error) {
      const errorMessage = error.message || 'An error occurred'; // Error message handling
      const errorHtml = `
        <div class="col-lg-6 col-lg-offset-4">
          <p class="text-danger">${errorMessage}</p>
        </div>
      `;
      document.body.innerHTML += errorHtml; // Appends error message to document body
    }
}
