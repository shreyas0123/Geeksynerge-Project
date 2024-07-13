window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/getUser")
        .then((response) => {
            console.log(response); // Logs the entire response object from the GET request
            console.log('length of the response from getUser method', response.data.getUser.length); // Logs the length of the user array received
            console.log('response from getUser method', response.data.getUser); // Logs the user data received
            for (var i = 0; i < response.data.getUser.length; i++) {
                showUserOnScreen(response.data.getUser[i]); // Calls a function to display each user on the screen
            }
        })
        .catch((err) => {
            console.log(err); // Logs any errors that occur during the GET request
        });
});

function showUserOnScreen(obj) {
    const parentEle = document.getElementById('listofitems'); // Retrieves the parent element by ID
    if (!parentEle) {
        console.error('Parent element not found'); // Logs an error if the parent element is not found
        return;
    }

    const childEle = document.createElement('li'); // Creates a new list item element
    const textContent = document.createElement('span'); // Creates a span element for displaying user information

    textContent.textContent = `Name: ${obj.name} and Phone Number: ${obj.phoneNumber}`; // Sets the text content of the span element
    textContent.className = 'centered-text'; // Sets a class name for styling

    childEle.appendChild(textContent); // Appends the text content to the list item

    const delButton = document.createElement('button'); // Creates a delete button element
    delButton.textContent = 'Delete'; // Sets the text content of the delete button
    delButton.onclick = () => { // Sets up a click event handler for the delete button
        axios.delete(`http://localhost:3000/delete-user/${obj._id}`)
            .then((response) => {
                console.log(response.data.message); // Logs the delete operation message from the server
                parentEle.removeChild(childEle); // Removes the corresponding list item from the DOM
            })
            .catch((err) => {
                console.log(err); // Logs any errors that occur during the delete operation
            });
    };

    const editButton = document.createElement('button'); // Creates an edit button element
    editButton.textContent = 'Edit'; // Sets the text content of the edit button
    editButton.onclick = () => { // Sets up a click event handler for the edit button
        const newName = prompt("Enter new name", obj.name); // Prompts the user for a new name
        const newPhoneNumber = prompt("Enter new phone number", obj.phoneNumber); // Prompts the user for a new phone number

        if (newName !== null && newPhoneNumber !== null) { // Checks if the user entered valid inputs
            axios.put(`http://localhost:3000/update-user/${obj._id}`, { // Sends a PUT request to update user data
                name: newName,
                phoneNumber: newPhoneNumber
            })
            .then((response) => {
                console.log(response.data.message); // Logs the update operation message from the server
                textContent.textContent = `Name: ${response.data.updatedUser.name} and Phone Number: ${response.data.updatedUser.phoneNumber}`; // Updates the displayed user information
            })
            .catch((err) => {
                console.log(err); // Logs any errors that occur during the update operation
            });
        }
    };

    childEle.appendChild(delButton); // Appends the delete button to the list item
    childEle.appendChild(editButton); // Appends the edit button to the list item
    parentEle.appendChild(childEle); // Appends the list item to the parent element
}
