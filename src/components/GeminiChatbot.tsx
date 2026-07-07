import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, ArrowRight, Globe, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: { title: string; uri: string }[];
}

interface GeminiChatbotProps {
  theme?: 'dark' | 'light';
}

const PRESET_QUESTIONS = [
  {
    icon: '💰',
    label: 'Highest CPM niches',
    text: 'What are the highest-paying niches on YouTube and TikTok in 2026, and what are their estimated RPM ranges?'
  },
  {
    icon: '🔑',
    label: 'SEO keyword optimization',
    text: 'How can I optimize my video titles and description metadata for higher search traffic and optimal CPC advertisers?'
  },
  {
    icon: '🌍',
    label: 'CPM impact by country',
    text: 'How much does audience location (Tier 1 vs Tier 3 countries) impact overall ad revenues, and how can I target premium CPM markets?'
  },
  {
    icon: '📈',
    label: 'Shorts vs Long-form',
    text: 'What is the current 2026 CPM/RPM payout comparison between YouTube Shorts, TikTok Creator Rewards, and traditional long-form videos?'
  }
];

// A helper to format simple markdown elements for clean visual representation
function formatChatMessage(text: string, theme: 'dark' | 'light') {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    let trimmed = line.trim();
    
    // Check for headers (e.g., ### Title)
    if (trimmed.startsWith('###')) {
      return (
        <h4 key={idx} className={`text-[14px] font-bold mt-4 mb-1.5 font-sans ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {trimmed.replace(/^###\s*/, '')}
        </h4>
      );
    }
    if (trimmed.startsWith('##')) {
      return (
        <h3 key={idx} className={`text-base font-bold mt-5 mb-2 font-sans ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {trimmed.replace(/^##\s*/, '')}
        </h3>
      );
    }
    if (trimmed.startsWith('#')) {
      return (
        <h2 key={idx} className={`text-lg font-bold mt-6 mb-2.5 font-sans ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {trimmed.replace(/^#\s*/, '')}
        </h2>
      );
    }

    // Check for list items
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const content = trimmed.replace(/^[-*]\s*/, '');
      return (
        <li key={idx} className={`text-[13px] ml-4 list-disc pl-1 mb-1 leading-relaxed ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
          {parseBoldAndItalic(content, theme)}
        </li>
      );
    }

    // Default paragraph
    if (trimmed === '') {
      return <div key={idx} className="h-2" />;
    }

    return (
      <p key={idx} className={`text-[13px] leading-relaxed mb-1.5 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
        {parseBoldAndItalic(line, theme)}
      </p>
    );
  });
}

// Function to parse double asterisks **bold** into HTML tags
function parseBoldAndItalic(text: string, theme: 'dark' | 'light'): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function GeminiChatbot({ theme = 'dark' }: GeminiChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello! I am your CreatorPay Revenue & SEO Consultant. I am fully grounded in real-time 2026 data. Ask me anything about high-paying niches, video length strategy, keyword optimization for search algorithms, or regional CPM differences!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isGenerating) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error('Could not retrieve answer from AI service');
      }

      const result = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: result.text,
          sources: result.sources
        }
      ]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `⚠️ Error: ${error.message || 'The chatbot failed to respond. Please make sure the API key is configured.'}`
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`rounded-xl border p-6 transition-all duration-150 ${
      theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
    }`}>
      <div className="flex items-center justify-between border-b pb-4 mb-4 border-zinc-800/40">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          <div>
            <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Creator Revenue & SEO Chatbot
            </h3>
            <p className="text-xs text-zinc-500">
              Consult on content optimizations, bidding mechanics, search terms, and monetization pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Suggestion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {PRESET_QUESTIONS.map((pq, idx) => (
          <button
            key={idx}
            disabled={isGenerating}
            onClick={() => handleSendMessage(pq.text)}
            className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 group text-xs ${
              theme === 'dark'
                ? 'bg-zinc-900/45 border-zinc-850 hover:bg-zinc-800/60 hover:border-zinc-700 text-zinc-300'
                : 'bg-zinc-50 border-zinc-150 hover:bg-zinc-100 hover:border-zinc-250 text-zinc-700'
            }`}
          >
            <span className="text-base leading-none select-none">{pq.icon}</span>
            <div className="flex-1 min-w-0">
              <span className="font-semibold block truncate group-hover:text-indigo-400 transition-colors">
                {pq.label}
              </span>
              <span className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">
                {pq.text}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
          </button>
        ))}
      </div>

      {/* Chat messages viewport */}
      <div className={`rounded-lg border p-4 h-[350px] overflow-y-auto space-y-4 mb-4 transition-all ${
        theme === 'dark' 
          ? 'bg-zinc-950/70 border-zinc-850 text-white font-sans' 
          : 'bg-zinc-50/30 border-zinc-150 text-zinc-900 font-sans'
      }`}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-[13px] leading-relaxed ${
                isUser
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                  : theme === 'dark'
                    ? 'bg-zinc-900 border border-zinc-800 rounded-tl-none text-zinc-200'
                    : 'bg-white border border-zinc-200 shadow-sm rounded-tl-none text-zinc-800'
              }`}>
                {isUser ? (
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div>
                    {formatChatMessage(msg.text, theme)}
                    
                    {/* Sources section if present */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-zinc-800/40">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1 mb-1.5">
                          <Globe className="w-3 h-3" /> Grounded Search References
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.uri}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 max-w-[200px] truncate bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/60"
                            >
                              <span>🔗</span>
                              <span className="truncate">{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isGenerating && (
          <div className="flex flex-col items-start">
            <div className={`max-w-[80%] rounded-lg p-3 text-[13px] flex items-center gap-2 ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800 rounded-tl-none' : 'bg-white border border-zinc-200 shadow-sm rounded-tl-none'
            }`}>
              <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>Searching web metrics and drafting advisory...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Ask about CPM metrics, best-paying niches, keyword selection..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isGenerating}
          className={`flex-1 text-[13px] px-3.5 py-2.5 border rounded-lg focus:outline-none transition-colors duration-100 ${
            theme === 'dark'
              ? 'bg-zinc-900 text-white border-zinc-800 placeholder-zinc-600 focus:border-zinc-700'
              : 'bg-zinc-50 text-zinc-900 border-zinc-200 placeholder-zinc-400 focus:border-zinc-300'
          }`}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isGenerating}
          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg shadow-sm transition-all duration-100"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
