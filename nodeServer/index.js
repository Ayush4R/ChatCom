// Node server to handle socket io connections
const io = require('socket.io')(5000, {
    cors: {
        origin: '*',
    }
});

const users = {};

io.on('connection', socket => {
    // When a new user joins, let other connected users know!
    socket.on('new-user-joined', username => {
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    // When someone sends a message, broadcast it to other connected users
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, username: users[socket.id] })
    });

    // When someone leaves the chat, let others know! 
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})