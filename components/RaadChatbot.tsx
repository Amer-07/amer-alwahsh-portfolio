import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendMessageToRaad } from '../services/geminiService';
import { ChatMessage, RaadState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const RaadChatbot: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [state, setState] = useState<RaadState>(RaadState.IDLE);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Initialize with welcome message and update it when language changes (if conversation hasn't started)
  useEffect(() => {
    setMessages(prev => {
        if (prev.length === 0 || (prev.length === 1 && prev[0].role === 'model')) {
            return [{
                role: 'model',
                content: t.raad.welcome,
                timestamp: new Date()
            }];
        }
        return prev;
    });
  }, [t.raad.welcome]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || state !== RaadState.IDLE) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setState(RaadState.THINKING);

    // Call Gemini API
    const responseText = await sendMessageToRaad(messages, userMsg.content);

    const botMsg: ChatMessage = {
      role: 'model',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setState(RaadState.IDLE);
  };

  return (
    <div 
        className={`fixed bottom-6 right-6 z-50 flex flex-col pointer-events-none ${language === 'ar' ? 'items-start' : 'items-end'}`} 
        dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* Chat Window */}
      <div 
        className={`bg-secondary border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-0 opacity-0 mb-0 h-0'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="bg-accent rounded-full p-2">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm">{t.raad.title}</h3>
                    <p className="text-xs text-slate-400">{t.raad.subtitle}</p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-primary/50 scrollbar-hide">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-accent text-primary rounded-br-none' 
                        : 'bg-secondary border border-slate-700 text-slate-200 rounded-bl-none'
                    }`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {state === RaadState.THINKING && (
                <div className="flex justify-start">
                     <div className="bg-secondary border border-slate-700 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                        <span className="text-xs text-slate-400">{t.raad.typing}</span>
                     </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-secondary border-t border-slate-700">
            <div className="flex items-center gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.raad.placeholder}
                    className="flex-1 bg-primary text-white text-sm rounded-full px-4 py-3 border border-slate-700 focus:outline-none focus:border-accent"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || state !== RaadState.IDLE}
                    className="p-3 bg-accent text-primary rounded-full hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-accent hover:bg-accent-hover text-primary rounded-full p-4 shadow-xl transition-all hover:scale-110 flex items-center justify-center relative group"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        
        {/* Tooltip hint if closed - Always placed to the left (physical) of the button */}
        {!isOpen && (
            <span className="absolute right-full mr-4 bg-white text-primary px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                {language === 'ar' ? 'احكي مع رعد!' : 'Chat with Raad'}
            </span>
        )}
        
        {/* Pulse effect if closed */}
        {!isOpen && (
             <span className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-75"></span>
        )}
      </button>

    </div>
  );
};

export default RaadChatbot;
