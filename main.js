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
    axios.post("https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments", userData)
    .then(data=>{
        showUser(data.data);
    }).catch(err =>{
        console.error(err)
    }) ;
    localStorage.setItem(uniqueId,JSON.stringify(userData));
});


function showUser(obj){
    const uniqueId = obj._id;
    const userDiv = document.createElement("div");
    

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    deleteButton.addEventListener("click", function () {
        userDiv.remove();
        
    });
   
    let jsonre;
    axios.get(`https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments/${uniqueId}`)
    .then(response =>{
        jsonre = response.data;
        showData();
    }).catch(err =>{
        console.error(err)
    });

    

    function showData(){const userDet = document.createElement("p");
    userDet.textContent = `Name: ${obj.name}  Phone: ${jsonre.phone}  Email: ${jsonre.email}`;
    userDiv.appendChild(userDet);

    userDiv.appendChild(deleteButton);
    userDiv.appendChild(editButton);

    displayInfo.appendChild(userDiv);

    form.reset();}
}


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
        const storedData = axios.get(`https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments/${uniqueId}`);
        document.getElementById("name").value = obj.name;
        document.getElementById("phone").value = obj.phone;
        document.getElementById("email").value = obj.email;
        userDiv.remove();
        axios.patch(`https://crudcrud.com/api/47740a7f2e50430391983bfa284de478/appointments/${uniqueId}`)
        .then(response =>{
            console.log(response);
        }).catch(err =>{
            console.error(err);
        })
        
    });

    const userDet = document.createElement("p");
    userDet.textContent = `Name: ${user.name}  Phone: ${user.phone}  Email: ${user.email}`;
    userDiv.appendChild(userDet);

    userDiv.appendChild(deleteButton);
    userDiv.appendChild(editButton);

    displayInfo.appendChild(userDiv);
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





