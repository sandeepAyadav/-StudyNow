import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AiMentor({ courseTitle }) {
  const [isOpen, setIsOpen] = useState(false); // Widget open/close trigger state
  const [chatLog, setChatLog] = useState([
    { role: 'ai', message: `Hi there! I am your StudyNow AI Mentor. Ask me any technical doubts regarding "${courseTitle || 'this module'}"!` }
  ]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userPrompt = query;
    setQuery("");
    setChatLog((prev) => [...prev, { role: 'user', message: userPrompt }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.post("http://localhost:6790/api/ai/ask-mentor", {
        question: userPrompt,
        courseTitle: courseTitle
      }, config);

      if (response.data.success) {
        setChatLog((prev) => [...prev, { role: 'ai', message: response.data.reply }]);
      }
    } catch (err) {
      setChatLog((prev) => [...prev, { role: 'ai', message: "❌ System timeout. Couldn't sync with AI Core models." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 🔮 Dynamic Toggle Floating Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all font-bold flex items-center space-x-2 animate-bounce cursor-pointer"
        >
          <span>✨</span>
          <span className="text-xs uppercase tracking-wider">Ask AI Mentor</span>
        </button>
      )}

      {/* 🎴 Core AI Workspace Card Drawer Frame */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in border-t-4 border-indigo-600">
          
          {/* Assistant Header Layout */}
          <div className="bg-gray-900 px-4 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">StudyNow AI Engine</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 font-medium truncate max-w-[220px]">Context: {courseTitle}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition font-bold text-sm cursor-pointer">✕</button>
          </div>

          {/* Conversation Core Thread Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 custom-scrollbar">
            {chatLog.map((chat, idx) => (
              <div key={idx} className={`flex flex-col ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] text-gray-400 font-bold mb-0.5 px-1 uppercase">{chat.role === 'user' ? 'You' : 'AI Mentor'}</span>
                <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed shadow-3xs ${chat.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 border rounded-bl-none border-gray-100 font-medium'}`}>
                  {chat.message}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex flex-col items-start animate-pulse">
                <span className="text-[9px] text-gray-400 font-bold mb-0.5 uppercase">AI Mentor</span>
                <div className="bg-white border text-gray-400 px-4 py-2 rounded-2xl rounded-bl-none text-xs flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Processing Message Form Bar */}
          <form onSubmit={handleAskAI} className="p-3 border-t bg-white flex items-center space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about codes, bug trace, algorithms..."
              className="flex-1 bg-gray-50 border text-xs rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !query.trim()} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white p-2.5 rounded-xl transition text-xs shadow-xs cursor-pointer">
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default AiMentor;