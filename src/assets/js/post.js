// const form = document.forms['sargyt'];
// const nameInput = form.elements['name'];
// const surnameInput = form.elements['surname'];
// const phoneNumberInput = form.elements['phonenumber'];
// const homeNumberInput = form.elements['homenumber'];
// const emailInput = form.elements['email'];
// const messageInput = form.elements['message'];
// async function getNews() {
//     return response = await fetch("https://api.escuelajs.co/api/v1/products", {
//         method: "POST",
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//           },
//         body: JSON.stringify({
//             "title": nameInput.value,
//             "price": homeNumberInput.value,
//             "description": messageInput.value,
//             "categoryId": phoneNumberInput.value,
//             "images": ["https://placeimg.com/640/480/any"]
//           })
//     }); 
// }

// const news = getNews();


// function renderNews() {
//     news
//         .then(res => res.json())
//         .then(log => console.log(log))
//         .catch(err => console.log(err))
// }
// form.addEventListener('submit', renderNews);

const form = document.forms['sargyt'];
const nameInput = form.elements['name'];
const surnameInput = form.elements['surname'];
const phoneNumberInput = form.elements['phonenumber'];
const homeNumberInput = form.elements['homenumber'];
const emailInput = form.elements['email'];
const messageInput = form.elements['message'];

async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const body = {
    "name": nameInput.value,
    "surname": surnameInput.value,
    "email": emailInput.value,
    "phone_number": Number(phoneNumberInput.value),
    "home_number": Number(homeNumberInput.value),
    "description": messageInput.value,
  }
  console.log(body);

  try {
    const response = await fetch("http://localhost:80/api/application", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error submitting form: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Form submission successful:", responseData);
    // Handle successful submission (e.g., display a success message)
  } catch (error) {
    console.error("Error submitting form:", error);
    // Handle errors appropriately (e.g., display an error message)
  }
}

form.addEventListener('submit', submitForm);