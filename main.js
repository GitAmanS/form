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
    axios.post("https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments", userData)
    .then(data=>{
        if(data){displayUser(data.data);}
    }).catch(err =>{
        console.error(err)
    }) ;
});


function showAllUsers() {
    axios.get("https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments")
        .then(response => {
            const users = response.data;
            users.forEach(user => {
                displayUser(user);
            });
        })
        .catch(err => {
            console.error(err);
        });
}

function displayUser(user) {
    const uniqueId = user._id;
    const userDiv = document.createElement("div");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";

    deleteButton.addEventListener("click", function () {
        userDiv.remove();
        deleteUser(user._id);
    });

    editButton.addEventListener("click", function(){
        axios.get(`https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments/${uniqueId}`)
        .then(response => {
            const user = response.data;
            document.getElementById("name").value = user.name;
            document.getElementById("phone").value = user.phone;
            document.getElementById("email").value = user.email;
        })
        .catch(err => {
            console.error(err);
        });
        
        userDiv.remove();
        deleteUser(uniqueId);
        
    });

    const userDet = document.createElement("p");
    userDet.textContent = `Name: ${user.name}  Phone: ${user.phone}  Email: ${user.email}`;
    userDiv.appendChild(userDet);

    userDiv.appendChild(deleteButton);
    userDiv.appendChild(editButton);

    displayInfo.appendChild(userDiv);
    form.reset();
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments/${userId}`)
        .then(response => {
            console.log("User deleted:", response);
        })
        .catch(err => {
            console.error(err);
        });
}

showAllUsers(); 





