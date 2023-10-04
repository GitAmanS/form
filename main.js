const form = document.getElementById("myForm");
const displayInfo = document.getElementById("displayInfo");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const uniqueId = name+phone+email;
    const userData = {
        name: name,
        phone: phone,
        email: email,
    };

    localStorage.setItem(uniqueId,JSON.stringify(userData));

   
    const userDiv = document.createElement("div");
    

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    deleteButton.addEventListener("click", function () {
        userDiv.remove();
        localStorage.removeItem(uniqueId);
    });
    editButton.addEventListener("click", function(){
        const storedData = JSON.parse(localStorage.getItem(uniqueId));
        document.getElementById("name").value = storedData.name;
        document.getElementById("phone").value = storedData.phone;
        document.getElementById("email").value = storedData.email;
        userDiv.remove();
        localStorage.removeItem(uniqueId);
    });

    var jsonre = JSON.parse(localStorage.getItem(uniqueId));

    const userDet = document.createElement("p");
    userDet.textContent = `Name: ${jsonre.name}  Phone: ${jsonre.phone}  Email: ${jsonre.email}`;
    userDiv.appendChild(userDet);

    userDiv.appendChild(deleteButton);
    userDiv.appendChild(editButton);

    displayInfo.appendChild(userDiv);

    form.reset();
});







