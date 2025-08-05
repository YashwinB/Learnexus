import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Settings, 
  Play, 
  Send, 
  Image as ImageIcon, 
  Camera,
  Volume2,
  MessageCircle,
  X,
  Minimize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  hasAudio?: boolean;
  hasImage?: boolean;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Learnexus AI assistant. How can I help you with your learning today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Great question! Let me help you understand that concept better. Would you like me to explain it step by step?',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const imageMessage: Message = {
      id: Date.now().toString(),
      text: 'I\'ve uploaded an image for you to analyze.',
      sender: 'user',
      timestamp: new Date(),
      hasImage: true
    };
    setMessages([...messages, imageMessage]);
  };

  const playAudio = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const progressData = [
    {
      subject: 'Math: Fractions',
      description: 'Solved fraction problems involving addition and subtraction',
      progress: 75,
      color: 'bg-purple-500',
      icon: '📊'
    },
    {
      subject: 'Reading Summary',
      description: 'Identified the main themes of the assigned text',
      progress: 60,
      color: 'bg-orange-500',
      icon: '📚'
    },
    {
      subject: 'Science Activity',
      description: 'Learned about photosynthesis and plant growth',
      progress: 85,
      color: 'bg-teal-500',
      icon: '🌱'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/90 backdrop-blur-sm p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-white">Learnexus</h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-purple-600/50 text-white' 
                : 'text-gray-300 hover:bg-slate-700/50'
            }`}
          >
            <Home size={20} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'insights' 
                ? 'bg-purple-600/50 text-white' 
                : 'text-gray-300 hover:bg-slate-700/50'
            }`}
          >
            <BarChart3 size={20} />
            Insights
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'settings' 
                ? 'bg-purple-600/50 text-white' 
                : 'text-gray-300 hover:bg-slate-700/50'
            }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Good afternoon</h2>
                <p className="text-purple-200 text-lg">Here's an update on Aarav's learning today</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center relative">
                <span className="text-white">🔔</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍🎓</span>
              </div>
            </div>
          </div>

          {/* Progress Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Learning Journey Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20">
              <h3 className="text-white text-xl font-semibold mb-4">Learning Journey</h3>
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🧠</span>
                </div>
                <p className="text-white font-medium">Fractions and Recipes</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                VIEW MORE
              </button>
            </div>

            {/* Concept Progress Card */}
            <div className="bg-gray-100 rounded-2xl p-6">
              <h3 className="text-blue-600 text-xl font-semibold mb-4">Concept Progress</h3>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#3B82F6" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${80 * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">80%</span>
                </div>
              </div>
              <p className="text-blue-600 font-semibold text-center mb-1">UNDERSTOOD</p>
              <p className="text-gray-600 text-sm text-center">Tried different examples</p>
            </div>

            {/* Mood Card */}
            <div className="bg-yellow-50 rounded-2xl p-6">
              <h3 className="text-orange-500 text-xl font-semibold mb-4">Mood</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">😊</span>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🎓</span>
                </div>
              </div>
              <p className="text-orange-600 font-semibold mb-1">MOTIVATED</p>
              <p className="text-gray-600 text-sm mb-3">Enjoyed the challenge</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                RESPOND
              </button>
            </div>

            {/* Career Goal Card */}
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-red-600 text-xl font-semibold mb-4">Career Goal</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🌱</span>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩‍🔬</span>
                </div>
              </div>
              <p className="text-red-600 font-semibold mb-1">ENVIRONMENTAL SCIENTIST</p>
              <p className="text-gray-600 text-sm">Connected to real-world uses</p>
            </div>
          </div>

          {/* Today's Progress Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-semibold">Today's Progress</h3>
              <span className="text-purple-200">3 of 5 tasks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {progressData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.subject}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Quote Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <div>
                <p className="text-white font-medium">Quoted from Aarav</p>
                <p className="text-white text-lg">"Can you explain this part to me again?"</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={playAudio}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Volume2 className="text-white" size={20} /> : <Play className="text-white ml-1" size={20} />}
              </button>
              <div className="flex-1 flex items-center gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlaying && i < 12 ? 'bg-blue-400 h-8' : 'bg-purple-300 h-4'
                    }`}
                  ></div>
                ))}
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                RESPOND
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isChatOpen ? 'w-96' : 'w-16'
      }`}>
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="text-white" size={24} />
          </button>
        ) : (
          <div className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-96'
          }`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Talk to Learnexus</h4>
                  <p className="text-purple-100 text-sm">AI Learning Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1 rounded"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.hasImage && (
                          <div className="mt-2 w-full h-20 bg-gray-200 rounded flex items-center justify-center">
                            <ImageIcon className="text-gray-400" size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask Learnexus anything..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleImageUpload}
                      className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
                    >
                      <ImageIcon size={20} />
                    </button>
                    <button
                      onClick={handleImageUpload}
                      className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
                    >
                      <Camera size={20} />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;