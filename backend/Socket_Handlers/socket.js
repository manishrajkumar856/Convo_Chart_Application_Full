// Import Socket.IO classes
import { Server, Socket } from "socket.io";
import { Chat_Model } from "../modals/chat_message_modal.js";

// Function to initialize Socket.IO
export const initSocket = (server) => {
  // Create a new Socket.IO server instance attached to your HTTP server
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  // Listen for new client connections
  io.on("connection", (socket) => {
    console.log("User Connected! ", socket.id);

    // Let each user join their own room (based on userId)
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on("mess", async (msg) => {
      console.log("Received Message: ", msg);

      try {
        const chat_msg = new Chat_Model({
          sender: msg.sender,
          receiver: msg.receiver,
          message: msg.message,
        });

        // Save Message to DB
        await chat_msg.save();

        // Emit message to receiver's room
        io.to(msg.receiver).emit('receiver_message', chat_msg);

        // Emit back to sender (so they see their own message instantly)
        io.to(msg.sender).emit('receiver_message', chat_msg);
        
      } catch (error) {
        console.log(error);
      }
      
    });

    // Listen for a custom event called 'disconnected'
    socket.on("disconnected", () => {
      console.log("User disconnected! ", socket.io);
    });
  });

  // Return the io instance so other files can use it
  return io;
};
