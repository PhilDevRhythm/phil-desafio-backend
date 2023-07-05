const socket = io()

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message);

    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')
})
