import React, { useState, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Image as ImageIcon, 
  Camera, 
  X, 
  Minimize2,
  Mic,
  MicOff
} from 'lucide-react';
import { ChatMessage } from '../types/api';
import { apiService } from '../services/api';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggle,
  onClose
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Learnexus AI assistant. How can I help you with your learning today?',
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      const response = await apiService.sendMessage(inputText);
      if (response.success) {
        setMessages(prev => [...prev, response.data]);
      } else {
        // Fallback AI response
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'I understand your question! Let me help you with that concept. Would you like me to break it down step by step?',
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await apiService.uploadImage(file);
      if (response.success) {
        const imageMessage: ChatMessage = {
          id: Date.now().toString(),
          text: 'I\'ve uploaded an image for analysis.',
          sender: 'user',
          timestamp: new Date().toISOString(),
          has_image: true,
          image_url: response.data.url
        };
        setMessages(prev => [...prev, imageMessage]);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        
        try {
          const response = await apiService.uploadAudio(audioFile);
          if (response.success) {
            const audioMessage: ChatMessage = {
              id: Date.now().toString(),
              text: 'Voice message sent',
              sender: 'user',
              timestamp: new Date().toISOString(),
              has_audio: true,
              audio_url: response.data.url
            };
            setMessages(prev => [...prev, audioMessage]);
          }
        } catch (error) {
          console.error('Failed to upload audio:', error);
        } finally {
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="text-white" size={24} />
      </button>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-96'
    } w-96`}>
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
            onClick={onClose}
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
                  {message.has_image && message.image_url && (
                    <img 
                      src={message.image_url} 
                      alt="Uploaded content"
                      className="mt-2 w-full h-32 object-cover rounded"
                    />
                  )}
                  {message.has_audio && message.audio_url && (
                    <audio controls className="mt-2 w-full">
                      <source src={message.audio_url} type="audio/wav" />
                    </audio>
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
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="p-2 text-gray-500 hover:text-purple-500 transition-colors disabled:opacity-50"
              >
                <ImageIcon size={20} />
              </button>
              <button
                onClick={toggleRecording}
                className={`p-2 transition-colors ${
                  isRecording 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-500 hover:text-purple-500'
                }`}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </>
      )}
    </div>
  );
};