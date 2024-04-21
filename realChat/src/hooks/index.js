import { useEffect, useState } from "react"
import { io } from "socket.io-client";


export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    if(!socket){
        setSocket(io.connect("http://localhost:3000"));
    }

    useEffect(() => {
        console.log(socket)
        if (socket) {
            socket.on("connect", () => {
              console.log("connected");
            });
          }
      
          socket.on('disconnect', () => {
            console.log('user disconnected')
          })

    }, [socket]);


    return {
        socket
    }
    
}