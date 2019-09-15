
const socket = io();


//DOM Elements

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let encender = document.getElementById('encender');
let apagar = document.getElementById('apagar');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

encender.addEventListener('click', function(){
    socket.emit('encender',{
        message_led: 'encender_led',    
    });
});

apagar.addEventListener('click', function(){
    socket.emit('apagar',{
        message_led: 'apagar_led',    
    });
});


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