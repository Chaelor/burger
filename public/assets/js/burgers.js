
//Capture the elements from the dom
var deleteBurger = document.getElementsByClassName('delete-burger');
var changeBurger = document.getElementsByClassName('change-burger');
var addBurger = document.getElementsByClassName('add-burger');

//Adding listeners to elements.
addBurger[0].addEventListener('click', addListener, false);
for (let i = 0; i < deleteBurger.length; i++) {
    deleteBurger[i].addEventListener('click', deleteListener, false);
}

for (let i = 0; i < changeBurger.length; i++) {
    changeBurger[i].addEventListener('click', changeListener, false);
}

//DELETE BURGER
function deleteListener(event) {
    event.preventDefault();

    //Delete this id.
    var id = this.dataset.id;

    fetch(`/api/burgers/${id}`, {
        method: "DELETE"
    }).then((response) => {
        response.json()
        location.reload();
    });
}

//CHANGE BURGER
function changeListener(event) {
    event.preventDefault();

    //capture the data from the id for routing and if burger has been devoured
    var id = this.dataset.id;
    var newDevoured = this.dataset.newdevoured;

    console.log(newDevoured);
    //data to pass for the devoured state
    var newState = {
        devoured: newDevoured
    };

    console.log(newState);

    fetch(`/api/burgers/${id}`, {
        method: 'PUT',
        data: newState
    }).then((response) => {
        response.json();
        console.log(`Updated burger ${newState}`);
        //location.reload();
    });
}

function addListener(event) {
    event.preventDefault();

    var burgerName = document.getElementById('add-burger').value;
    var burgerState = document.querySelector('input[name=devoured]:checked').value;

    //capture the data for the new burger
    var newBurger = {
        burger_name: burgerName,
        devoured : burgerState
    };

    console.log(newBurger);
    fetch('/api/burgers', {
        method: 'POST',
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        },
        body: JSON.stringify(newBurger)
    }).then((response) => {
        response.json();
        console.log(`Made new burger: ${newBurger}`);
        location.reload();
    })
}