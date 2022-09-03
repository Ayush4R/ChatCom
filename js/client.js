const socket = io('http://localhost:5000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-screen');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".screen")

// Notification audio that will play on receiving messages
let audio = new Audio('Notification.mp3');

// Function which will append event info to the contianer
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}


// Ask new user for their name and let the server know
const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

// When a new user joins, receive their name from the server
socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'right')
})

// When server sends a message, receive it
socket.on('receive', data => {
    append(`${data.username}: ${data.message}`, 'left')
})

// When a user leaves the chat, append the info to the screen
socket.on('left', username => {
    append(`${username} left the chat`, 'right')
})

// When the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})