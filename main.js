const {tBodies} = document.getElementById('table');
const xhrUsers = new XMLHttpRequest();
const xhrPosts = new XMLHttpRequest();
let users;
let posts;

document.addEventListener('DOMContentLoaded', () => {
    xhrUsers.open("GET", 'https://jsonplaceholder.typicode.com/users');
    xhrPosts.open("GET", ' https://jsonplaceholder.typicode.com/todos');
    xhrUsers.send();
    xhrUsers.responseType = 'json';

    xhrUsers.addEventListener('load', function() {
        users = xhrUsers.response;
        xhrPosts.send();
        xhrPosts.responseType = 'json';

        xhrPosts.addEventListener('load', function() {
            posts = xhrPosts.response;

            posts.forEach(post => {
                const {userId} = post;
                const user = users.find(item => item.id === userId);

                tBodies[0].insertAdjacentHTML('beforeend', `
                   <tr> <td>${post.title}</td>
                   <td><a href="${user.email}">${user.name}</a></td>
                   <td>${post.completed ? 'Completed' : ''}</td></tr>
                   `)
            })
        })
    })
});
