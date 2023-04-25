document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("url-form");
  const urlInput = document.getElementById("url-input");
  const errorMessage = document.getElementById("error-message");
  const returnedData = document.getElementById("response-data");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (urlInput.value.trim() === "") {
      const errorMessageText = "URL cannot be empty";
      errorMessage.style.visibility = "visible";
      errorMessage.innerText = errorMessageText;
      console.error(errorMessageText);
      return;
    }

    const url = urlInput.value.trim();

    // Send a POST request with the URL input value in the body
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    };

    fetch("http://127.0.0.1:5000/submit-url", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const message = data.summary;
        returnedData.style.visibility = "visible";
        returnedData.innerText = message;
      })
      .catch((error) => console.error(error));

    errorMessage.innerText = "";
  });
});
