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

    socket.on('connection', (data)=>{
        console.log(data);
    });

    socket.on('atime', (data)=>{
        console.log(data);
    });

    socket.on('JSON', (data)=>{
        console.log(data);
    });

})