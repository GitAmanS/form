const form = document.getElementById("myForm");
const displayInfo = document.getElementById("displayInfo");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const uniqueId = name+phone+email;

   
    const userDiv = document.createElement("div");
    

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        userDiv.remove();
        localStorage.removeItem(uniqueId);
    });


    const userData = {
        name: name,
        phone: phone,
        email: email,
    };

    localStorage.setItem(uniqueId,JSON.stringify(userData));

    var jsonre = JSON.parse(localStorage.getItem(uniqueId));
    userDiv.innerHTML = `
        <p>Name: ${jsonre.name}  Phone: ${jsonre.phone}  Email: ${jsonre.email} </p>
    `;
    userDiv.appendChild(deleteButton);

    displayInfo.appendChild(userDiv);

    form.reset();
});







