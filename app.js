const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const path = require("path");

const PORT = process.env.PORT ?? 3000
io.on('connection', function (socket) { 
    console.log("Someone has connected");
    players[socket.id] = {
    player_id: socket.id,
    x: 500,
    y: 500
    };
    socket.on('player_moved', function(movement_data) {
        players[socket.id].x = movement_data.x;
        players[socket.id].y = movement_data.y;
        socket.broadcast.emit('enemy_move', players[socket.id]);
});
socket.on('position', function(position_data) {
    socket.emit('position', position_data);
    socket.broadcast.emit('position', position_data);
    });
    socket.on('disconnect', function () {
    console.log("someone has disconnected");
    delete players[socket.id];
    socket.broadcast.emit('player_disconnect', socket.id);
    });
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "./index.html"));
        });


app.use(express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} ...`)
    console.log('http://localhost:3000/')
});