const ws = require('ws');

// * web socket server
const port = 8080;
const wsserver = new ws.WebSocketServer( 
    { port: port }, 
    ()=>{
    console.log(`listening on port: ${port}`)
});

wsserver.on("connection", function connection(ws){
    ws.on('message', function incoming(message) {
        const payload = JSON.parse(message)

    // * loop through all live clients
    // * send everyone the mesaage
    wsserver.clients.forEach( client => {
        if( client.readyState === ws.OPEN){
            payload.type = "user_message"
            payload.timestamp = 
                new Date().toUTCString()
            client.send(
                 JSON.stringify(payload) 
                 )
        }
    } )

      });

    ws.send('you have successfully connected');

})
