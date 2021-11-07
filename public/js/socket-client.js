//Esto se ejecuta en el cliente (Browser)

//Referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

//On oye eventos en este caso cuando se connecta el usuario
socket.on('connect', () => {
    //console.log("Connectado");
    lblOffline.style.display = 'none';
    lblOnline.style.display = 'block';
});

socket.on('disconnect', () => {
    //console.log("Desconectado del servidor");
    lblOffline.style.display = 'block';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    //Emitimos un mensaje
    //En este caso creamos un evento llamdo enviar-mensaje
    //El cual va a tener que escuchar el servidor
    //Sí mandamos el tercer argumento que es un callback
    //El mensaje solo será emitido al usuario que mando el msj
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log("Desde el server ",id);
    });
});