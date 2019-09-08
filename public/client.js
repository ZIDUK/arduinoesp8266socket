const socket = io();

//DOM Elements

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


btn.addEventListener('click', function(){

    console.log(username.value, message.value);

    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    });

    socket.on('server:chat:message', (data) => {
        output.innerHTML += `<p>
        <strong>${data.username}</strong>:${data.message}
        </p>
        `
        console.log(data.message);
    });
});