import { Message } from "../model/messageSchema.js";

export const initChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    
    socket.on("join_room", (courseId) => {
      socket.join(courseId);
      console.log(`User joined room (Course ID): ${courseId}`);
    });

   
    socket.on("send_message", async (data) => {
      try {
        const { courseId, sender, senderName, message } = data;

        
        const newMessage = await Message.create({
          courseId,
          sender,
          senderName,
          message,
        });

        
        io.to(courseId).emit("receive_message", newMessage);
      } catch (error) {
        console.error("Socket storage save trace error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });
};