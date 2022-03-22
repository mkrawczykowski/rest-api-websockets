const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT;

io.on('connection', socket => {
    console.log('new connection');

    socket.emit('message', 'welcome to chat')
});
  
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));