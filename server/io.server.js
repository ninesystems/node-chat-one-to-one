
// loading .env file in process
require("dotenv").config();
// Defining user register
global.users = [];

// Starting socket.io 
const io = require("socket.io")({
    serveClient: false,
});


io.use((socket, next) => {
    let token = socket.handshake.query.username;
    if (token) {
        return next();
    }
    return next(new Error('authentication error'));
});

io.on('connection', (client) => {
    let token = client.handshake.query.username;
    client.on('disconnect', () => {
        var clientid = client.id;
        for (var i = 0; i < users.length; i++)
            if (users[i].id && users[i].id == clientid) {
                users.splice(i, 1);
                break;
            }
    });
    users.push({
        id: client.id,
        name: token
    });

    client.on('typing', (data) => {
        io.emit("typing", data)
    });

    client.on('stoptyping', (data) => {
        io.emit("stoptyping", data)
    });

    client.on('message', (data) => {
        io.emit("message", data)
    });

    io.broadcast.emit("newuser", {
        id: client.id,
        name: token
    })
});
io.attach(process.env.IO_PORT || 7777, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

console.log("IO Server started on ", process.env.IO_PORT || 7777);
