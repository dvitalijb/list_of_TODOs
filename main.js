const container = document.getElementById('container');
const headers = ['Title', 'User Name', 'Status'];
const xhrUsers = new XMLHttpRequest();
const xhrPosts = new XMLHttpRequest();

function createElement(content = '', tag = 'td') {
    const element = document.createElement(tag);

    typeof content === 'string'
        ? element.textContent = content
        : element.appendChild(content);

    return element;
}

const createRow = usersMap => props => {
    const { title, userId, completed } = props;
    const { name, email } = usersMap[userId];
    const row = createElement('', 'tr');
    const titleTd = createElement(title);
    const nameTd = createElement();
    const linkEmail = createElement('', 'a');
    const completedStatus = completed ? 'yes' : '';
    const completeTd = createElement(completedStatus);

    linkEmail.textContent = name;

    linkEmail.setAttribute('href', `mailto:${email}`);

    nameTd.append(linkEmail);
    row.append(titleTd, nameTd, completeTd);

    return row;
};

function createTable(posts, users) {
    const table = createElement('', 'table');
    const thead = createElement('', 'thead');
    const tbody = createElement('', 'tbody');
    const headRow = createElement('', 'tr');

    const usersMap = users
        .reduce((acc, user) => ({...acc, [user.id]: user,}), {});
    const heads = headers.map(title => createElement(title, 'th'));
    const rows = posts.map(createRow(usersMap));

    headRow.append(...heads);
    thead.append(headRow);
    tbody.append(...rows);
    table.append(thead, tbody);

    return table;
}

document.addEventListener('DOMContentLoaded', () => {
    xhrUsers.open("GET", 'https://jsonplaceholder.typicode.com/users');
    xhrPosts.open("GET", ' https://jsonplaceholder.typicode.com/todos');
    xhrUsers.send();
    xhrUsers.responseType = 'json';

    xhrUsers.addEventListener('load', () => {
        const users = xhrUsers.response;
        xhrPosts.send();
        xhrPosts.responseType = 'json';

        xhrPosts.addEventListener('load', () => {
            const posts = xhrPosts.response;
            container.append(createTable(posts, users));
        })
    })
});
