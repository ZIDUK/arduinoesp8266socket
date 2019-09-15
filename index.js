const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');




//setttings
app.set('port', process.env.PORT || 3000);

//static
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {

    console.log('Servidor corriendo en: ' + app.get('port'));
});

//websocket
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('Nueva conexion desde el socket: ', socket.id);

    socket.on('disconnect', (socket) => {
        console.log('Socket desconectado: ', socket);
    });

    socket.on('chat:message', (message) => {
        console.log('Llego mensaje nuevo ', message);

        io.emit('server:chat:message', message);
        
    });

    //Envio mensajes al arduino
    socket.on('encender', (data)=>{
        io.emit('turn_ledon', data);
        console.log(data);
    });
    socket.on('apagar', (data)=>{
        io.emit('turn_ledoff', data);
        console.log(data);
    });

    //Envio mensajes al arduino
    socket.on('apagar', (data)=>{
        console.log(data);
    });



    //Recibo mensajes del arduino
    socket.on('connection', (data)=>{
        console.log(data);
    });

    socket.on('sensorar', (data)=>{
        console.log(data);
    });

    socket.on('JSON', (data)=>{
        console.log(data);
    });

})

