import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';


const socket = io(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:6790"}`, { autoConnect: false });

function CourseChat({ courseId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!courseId || !currentUser) return;

    
    axios.get(`http://localhost:6790/api/chat/history/${courseId}`)
      .then((res) => {
        if (res.data.success) setMessages(res.data.chats);
      })
      .catch((err) => console.error("History buffer execution gap:", err));

    socket.connect();
    socket.emit("join_room", courseId);

    
    socket.on("receive_message", (incomingMsg) => {
      setMessages((prev) => [...prev, incomingMsg]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [courseId, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messagePayload = {
      courseId,
      sender: currentUser._id,
      senderName: currentUser.name,
      message: newMessage,
    };

   
    socket.emit("send_message", messagePayload);
    setNewMessage("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-[450px] flex flex-col">
      
      <div className="bg-gray-900 px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <h4 className="text-xs font-bold uppercase tracking-wider">Live Technical Discussion Workspace</h4>
        </div>
      </div>

     
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
        {messages.map((msg, index) => {
          const isMe = msg.sender === currentUser?._id;
          return (
            <div key={msg._id || index} className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-fade-in`}>
              <span className="text-[10px] text-gray-400 font-semibold mb-0.5 px-1 uppercase">{msg.senderName}</span>
              <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm shadow-2xs leading-relaxed ${isMe ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"}`}>
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>


      <form onSubmit={handleSendMessage} className="p-3 border-t bg-white flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask a technical doubt or reply..."
          className="flex-1 bg-gray-50 border text-sm rounded-xl px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition shadow-xs active:scale-95 cursor-pointer">
          🚀
        </button>
      </form>
    </div>
  );
}

export default CourseChat;