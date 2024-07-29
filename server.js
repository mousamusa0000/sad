const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let users = [];

server.on('connection', ws => {
    console.log('New client connected');

    // Send initial user list
    ws.send(JSON.stringify({ type: 'userList', users }));

    // Handle incoming messages
    ws.on('message', message => {
        const data = JSON.parse(message);

        if (data.type === 'message') {
            const messageData = {
                type: 'message',
                username: 'User', // Replace with dynamic user management
                text: data.text,
                timestamp: new Date().toLocaleTimeString(),
                isSelf: false // Implement user tracking to set this correctly
            };
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(messageData));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        // Update user list
        users = users.filter(user => user !== 'User'); // Replace with dynamic user management
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'userList', users }));
            }
        });
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
