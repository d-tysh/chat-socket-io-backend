const userList = document.querySelector('#users');
const board = document.querySelector('#board');
const userMessage = document.querySelector('#msg_txt');
const userName = document.querySelector('#msg_name');
const sendButton = document.querySelector('#msg_btn');

const socket = io();
const messages = [];
const LIMIT_MESSAGES = 10;

const renderListOfUsers = () => {

}

const renderListOfMessages = () => {
    
}

const sendUserMessage = () => {
    let name = userName.value;
    const message = userMessage.value;

    if (message === '' || name === '') {
        return;
    }

    socket.emit('message', {
        message,
        name
    })

    // userMessage.value = '';
    userMessage.focus();
}


const pressEnter = (e) => {
    if (e.keyCode === 13) {
        sendUserMessage();
    }
}

sendButton.addEventListener('click', sendUserMessage);
userMessage.addEventListener('keyup', sendUserMessage);
socket.on('user', renderListOfUsers);
socket.on('message', renderListOfMessages);