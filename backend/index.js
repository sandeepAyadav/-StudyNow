import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import { createServer } from "http"; 
import { Server } from "socket.io"; 
import { initChatSocket } from "./sockets/chatSocket.js"; 
import { Message } from "./model/messageSchema.js"; 

import { connectDb } from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import razorpayRoute from "./routes/razorpayRoute.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://studynow-48ql.onrender.com"]
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initChatSocket(io);


app.get("/api/chat/history/:courseId", async (req, res) => {
  try {
    const chats = await Message.find({ courseId: req.params.courseId }).sort({ createdAt: 1 });
    return res.status(200).json({ success: true, chats });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("server is running sandeep sir");
});

app.use("/api", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", lectureRoutes);
app.use("/api", razorpayRoute);
app.use("/api/review", reviewRoutes);
app.use("/api/ai", aiRoutes);

connectDb();

const port = process.env.PORT || 6790;
server.listen(port, () => {
  console.log(`🚀 Server listening smoothly on port ${port}`);
});