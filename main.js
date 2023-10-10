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
    axios.post("https://crudcrud.com/api/e89765ca0ad242f0b054827e0b758205/appointments", userData)
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
    editButton.addEventListener("click", function(){
        const storedData = JSON.parse(localStorage.getItem(uniqueId));
        document.getElementById("name").value = obj.name;
        document.getElementById("phone").value = obj.phone;
        document.getElementById("email").value = obj.email;
        userDiv.remove();
        axios.delete(`https://crudcrud.com/api/e89765ca0ad242f0b054827e0b758205/appointments/${uniqueId}`)
        .then(response =>{
            console.log(response);
        }).catch(err =>{
            console.error(err);
        })
        
    });
    let jsonre;
    axios.get(`https://crudcrud.com/api/e89765ca0ad242f0b054827e0b758205/appointments/${uniqueId}`)
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




