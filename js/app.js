// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        // Recuperar los tweets del Local Storage
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if (tweet === '') {
        mostrarError('Un tweet no puede ir vacío');
        return; // Evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        // Date.now() podemos usarlo para crear un ID único.
        // Son los milisegundos desde 1970 hasta ahora.
        id: Date.now(),
        tweet
    };

    // Agregar el tweet al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado, se crea el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Muestra un mensaje de error
function mostrarError(error) {
    // Limpiar cualquier alerta previa
    limpiarAlerta();

    // Crear el mensaje de error
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar el mensaje de error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar el mensaje de error después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}
// Muestra un listado de los tweets
function crearHTML() {
    // Limpiar el HTML previo
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Agregar un botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto
            li.textContent = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Insertar en el HTML
            listaTweets.appendChild(li);
        });
    }

    // Almacenar en Local Storage
    sincronizarStorage();
}

// Agrega los tweets actuales a Local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function limpiarAlerta() {
    const alerta = document.querySelector('.error');
    if (alerta) {
        alerta.remove();
    }
}