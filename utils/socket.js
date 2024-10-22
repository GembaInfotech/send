const socket = require("socket.io");
let io;

function initializeSocket(server, origin) {
    io = socket(server, {
        cors: {
            origin: origin,
            credentials: true,
            methods: ["GET", "POST"],
        },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        global.chatSocket = socket;
        socket.on("add-user", (userEmail) => {
            global.onlineUsers.set(userEmail, socket.id);
            console.log(global.onlineUsers, "Hitting the connections");
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });

    return io;
}

function getSocket() {
    if (!io) {
        console.log("Socket.io not initialized!");
    }
    console.log("Started socket");
    return io;
}

module.exports = {
    initializeSocket,
    getSocket,
};