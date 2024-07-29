const socket = new WebSocket('wss://your-websocket-server-url'); // Replace with your WebSocket server URL

socket.addEventListener('open', function () {
    console.log('Connected to WebSocket server.');
});

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    
    if (data.type === 'message') {
        displayMessage(data.username, data.text, data.timestamp, data.isSelf);
    } else if (data.type === 'userList') {
        updateUserList(data.users);
    } else if (data.type === 'chatTitle') {
        updateChatTitle(data.title);
    }
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    if (messageText === '') {
        return;
    }
    
    const message = {
        type: 'message',
        text: messageText
    };

    socket.send(JSON.stringify(message));
    messageInput.value = '';
}

function displayMessage(username, text, timestamp, isSelf) {
    const chatBox = document.getElementById('chatBox');
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isSelf ? 'self' : ''}`;
    
    // Add avatar
    const avatar = document.createElement('img');
    avatar.src = 'https://www.w3schools.com/w3images/avatar2.png'; // Example avatar
    avatar.className = 'avatar';
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content';
    
    // Add username and message text
    const usernameElement = document.createElement('span');
    usernameElement.className = 'username';
    usernameElement.textContent = username;
    
    const textElement = document.createElement('span');
    textElement.className = 'text';
    textElement.textContent = text;
    
    const timestampElement = document.createElement('span');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = timestamp;
    
    contentContainer.appendChild(usernameElement);
    contentContainer.appendChild(textElement);
    contentContainer.appendChild(timestampElement);
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(contentContainer);
    
    // Add message to chat box
    chatBox.appendChild(messageElement);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function updateUserList(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<h2>Online Users</h2><ul>' +
        users.map(user => `<li>${user}</li>`).join('') +
        '</ul>';
}

function updateChatTitle(title) {
    const chatTitle = document.getElementById('chatTitle');
    chatTitle.textContent = title;
}

// Optional: Allow pressing "Enter" to send a message
document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
