const form = document.getElementById("myForm");
const displayInfo = document.getElementById("displayInfo");


form.addEventListener("submit", function (event) {
    event.preventDefault();


    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const userData = {
        name: name,
        phone: phone,
        email: email,
    };


    const userDataJSON = JSON.stringify(userData);


    localStorage.setItem("userData", userDataJSON);

 
    displayInfo.innerHTML = `
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Email: ${email}</p>
    `;

  
    form.reset();
});


