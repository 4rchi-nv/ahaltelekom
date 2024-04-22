const form = document.forms['sargyt'];
const nameInput = form.elements['name'];
const surnameInput = form.elements['surname'];
const phoneNumberInput = form.elements['phonenumber'];
const homeNumberInput = form.elements['homenumber'];
const emailInput = form.elements['email'];
const messageInput = form.elements['message'];
const loading = form.querySelector('.loading');
const success = form.querySelector('.sent-message');
const errmsg = form.querySelector('.error-message');

async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission behavior
  loading.style.display = 'block';
  try {
    const body = {
      "name": nameInput.value,
      "surname": surnameInput.value,
      "email": emailInput.value,
      "phone_number": phoneNumberInput.value,
      "home_number": homeNumberInput.value,
      "description": messageInput.value,
    }

    const response = await fetch("http://localhost:80/api/application/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      loading.style.display = 'none';
      errmsg.style.display = 'block';
      throw new Error(`Error submitting form: ${response.statusText}`);
    }
    success.style.display = 'block';

    const responseData = await response.json();
    console.log("Form submission successful:", responseData);
    loading.style.display = 'none';
    form.reset();
  } catch (error) {
    loading.style.display = 'none';
    errmsg.style.display = 'block';
    console.error("Error submitting form:", error);
    // Handle errors appropriately (e.g., display an error message)
  }
}

form.addEventListener('submit', submitForm);