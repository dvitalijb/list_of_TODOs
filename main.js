const table = document.getElementById('table');
let users;
let posts;

const xhr = new XMLHttpRequest();
xhr.open("GET", 'https://jsonplaceholder.typicode.com/users', true);
 xhr.send();
xhr.addEventListener('load',function () {
    users =JSON.parse(xhr.response) ;

    console.log(users)
})

const xhr2 = new XMLHttpRequest();
xhr2.open("GET", ' https://jsonplaceholder.typicode.com/todos', true);
xhr2.send();
xhr2.addEventListener('load',function () {
    posts =JSON.parse(xhr2.response) ;

    console.log(posts)
})

function fillTable() {
    const tbody = posts.map(user)
}

