const io = require('socket.io')

const socketServer = new io.Server( 8080 );


socketServer.on("connection",socket=>{
    socket.broadcast.emit("notification",{
        id: socket.id,
        message: "a new user has joined"
    })

    socket.on("message", data=>{
        
        socketServer.emit("notification",{
            ...data,
            type: "user_message",
            timestamp: new Date().toUTCString()
        })
    })
})
