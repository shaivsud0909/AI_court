import React, { useState } from 'react';

interface ChatBoxProps {
  onSend: (msg: string) => void;
  response: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSend, response }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, `You: ${input}`]);
    onSend(input);
    setInput('');
  };

  
  React.useEffect(() => {
    if (response) setMessages(prev => [...prev, `AI: ${response}`]);
  }, [response]);

 return (
  <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-gray-300 text-gray-900 flex flex-col font-serif">
    {/* ⚖️ Header */}
    <header className="w-full py-4 px-6 bg-red-900 shadow-md flex items-center justify-between text-white">
      <div className="text-2xl font-bold flex items-center space-x-2">
        <span>⚖️</span>
        <span>CourtRoomAI</span>
      </div>
      <p className="text-sm italic text-gray-200">
        “Justice may be delayed, but it will never be denied.”
      </p>
    </header>

    {/* 📜 Main Section */}
    <main className="flex flex-1 overflow-hidden px-4 md:px-16 py-6">
      <section className="flex-1 flex flex-col justify-between w-full">
        {/* 🧾 Chat Log */}
        <div className="flex-1 overflow-y-auto bg-white shadow-inner rounded p-6 border border-gray-500 space-y-4 text-base leading-relaxed">
          {messages.map((msg, i) => {
            const isUser = msg.startsWith("You:");
            const displayText = msg.replace(/^You: |^AI: /, '');

            return (
              <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-lg px-5 py-3 rounded-lg ${
                  isUser
                    ? 'bg-red-700 text-white rounded-br-none'
                    : 'bg-yellow-200 text-black rounded-bl-none'
                }`}>
                  {displayText}
                </div>
              </div>
            );
          })}
        </div>

        {/* 🧑‍⚖️ Input Area */}
        <div className="mt-6 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-4 border border-gray-600 rounded-l-lg bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            placeholder="Describe the situation (e.g. theft, assault)..."
          />
          <button
            onClick={handleSend}
            className="bg-red-700 text-white px-6 text-lg rounded-r-lg hover:bg-red-800 transition-all"
          >
            Submit Case
          </button>
        </div>
      </section>
    </main>
  </div>
)
}
export default ChatBox;
