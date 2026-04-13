import { PORT } from './constant.js';
import { app } from './index.js';
import { Server } from "socket.io";
import { createServer } from "http";
import { Message } from './models/message.model.js';

const server = createServer(app);

const io = new Server(server , {
    cors: {
        origin : 'http://localhost:5173',
        credentials : true,
         methods: ["GET", "POST"]
    }
});

io.on("connection" , (socket) => {
    console.log("new user got connected" , socket.id);

    socket.on("join-group" , (groupId) => {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined group ${groupId}`);
    })

    socket.on("send-message" , async ({groupId , message , sender}) => {
        try {
            const newMessage = await Message.create({groupId , message , sender});

            const populated = await newMessage.populate("sender" , "username");

            io.to(groupId).emit("receive-message" , populated);
            
        } catch (error) {
            console.log(error.message)
        }
    })

socket.on("disconnect" , () => {
         console.log("user disconnected", socket.id);
    })
})

server.listen( PORT , () => {
    console.log("Server is running on " + PORT);
})