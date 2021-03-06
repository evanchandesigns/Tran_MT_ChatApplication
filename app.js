const express = require('express');
const path = require('path');
const messenger = require('socket.io')();
const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});


messenger.attach(server);

messenger.on('connection', (socket) => {
    socket.emit('connected', { sID: `${socket.id}`, message: 'A new user has joined the chat.' });

    socket.on('chatmessage', function (msg) {
        console.log(msg);
        messenger.emit('message', { id: socket.id, message: msg });
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});