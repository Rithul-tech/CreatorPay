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

// A helper to parse bold, italic, and inline code formatting for beautiful responses
function parseFormattedText(text: string, theme: 'dark' | 'light'): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className={`font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className={`font-mono px-1.5 py-0.5 rounded text-[11px] font-semibold ${
              theme === 'dark' 
                ? 'bg-zinc-850 text-indigo-300 border border-zinc-800' 
                : 'bg-zinc-100 text-indigo-600 border border-zinc-200'
            }`}>
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index} className={`italic ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      })}
    </>
  );
}

// A helper to format simple markdown elements for clean visual representation
function formatChatMessage(text: string, theme: 'dark' | 'light') {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    
    // Horizontal Rule
    if (trimmed === '---') {
      return <hr key={idx} className={`my-4 border-t ${theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-200/60'}`} />;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const content = trimmed.replace(/^>\s*/, '');
      return (
        <blockquote key={idx} className={`pl-3.5 border-l-2 my-2.5 italic text-sm ${
          theme === 'dark' ? 'border-indigo-500 text-zinc-400' : 'border-indigo-600 text-zinc-500'
        }`}>
          {parseFormattedText(content, theme)}
        </blockquote>
      );
    }

    // Check for headers (e.g., ### Title)
    if (trimmed.startsWith('###')) {
      return (
        <h4 key={idx} className={`text-[15px] font-bold mt-4 mb-2 font-sans tracking-tight ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {trimmed.replace(/^###\s*/, '')}
        </h4>
      );
    }
    if (trimmed.startsWith('##')) {
      return (
        <h3 key={idx} className={`text-[17px] font-bold mt-5 mb-2.5 font-sans tracking-tight ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {trimmed.replace(/^##\s*/, '')}
        </h3>
      );
    }
    if (trimmed.startsWith('#')) {
      return (
        <h2 key={idx} className={`text-[19px] font-bold mt-6 mb-3 font-sans tracking-tight ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {trimmed.replace(/^#\s*/, '')}
        </h2>
      );
    }

    // Check for bullet list items
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const content = trimmed.replace(/^[-*]\s*/, '');
      return (
        <li key={idx} className={`text-sm ml-5 list-disc pl-1 mb-1.5 leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>
          {parseFormattedText(content, theme)}
        </li>
      );
    }

    // Check for numbered list items (e.g., 1. Item)
    const numListMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numListMatch) {
      const num = numListMatch[1];
      const content = numListMatch[2];
      return (
        <div key={idx} className={`text-sm ml-5 pl-1 mb-1.5 leading-relaxed flex items-start gap-1.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>
          <span className="font-semibold text-indigo-500 shrink-0">{num}.</span>
          <span className="flex-1">{parseFormattedText(content, theme)}</span>
        </div>
      );
    }

    // Default paragraph
    if (trimmed === '') {
      return <div key={idx} className="h-3" />;
    }

    return (
      <p key={idx} className={`text-sm leading-relaxed mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>
        {parseFormattedText(line, theme)}
      </p>
    );
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
  const [lowLatency, setLowLatency] = useState(true); // Default to low-latency gemini-3.1-flash-lite as requested
  
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

      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: chatHistory,
          lowLatency: lowLatency
        }),
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4 border-zinc-800/40 gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          <div>
            <h3 className={`text-base font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Creator Revenue & SEO Chatbot
            </h3>
            <p className="text-xs text-zinc-500">
              Consult on content optimizations, bidding mechanics, search terms, and monetization pipelines.
            </p>
          </div>
        </div>

        {/* Low-Latency Mode Toggle */}
        <div className="flex items-center gap-2 bg-zinc-900/30 dark:bg-zinc-950/40 px-3 py-1.5 rounded-lg border border-zinc-800/60 shrink-0 self-start sm:self-auto">
          <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1 font-mono">
            ⚡ Low-Latency Mode
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={lowLatency}
            onClick={() => setLowLatency(!lowLatency)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              lowLatency ? 'bg-indigo-600' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                lowLatency ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Preset Suggestion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {PRESET_QUESTIONS.map((pq, idx) => (
          <button
            key={idx}
            disabled={isGenerating}
            onClick={() => handleSendMessage(pq.text)}
            className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 group text-[13px] ${
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
              <span className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                {pq.text}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
          </button>
        ))}
      </div>

      {/* Chat messages viewport */}
      <div className={`rounded-lg border p-4.5 h-[420px] overflow-y-auto space-y-4 mb-4 transition-all ${
        theme === 'dark' 
          ? 'bg-zinc-950/70 border-zinc-850 text-white font-sans' 
          : 'bg-zinc-50/30 border-zinc-150 text-zinc-900 font-sans'
      }`}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-lg px-4.5 py-3.5 text-sm leading-relaxed ${
                isUser
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                  : theme === 'dark'
                    ? 'bg-zinc-900 border border-zinc-800 rounded-tl-none text-zinc-200'
                    : 'bg-white border border-zinc-200 shadow-sm rounded-tl-none text-zinc-800'
              }`}>
                {isUser ? (
                  <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.text}</p>
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
            <div className={`max-w-[80%] rounded-lg p-3.5 text-sm flex items-center gap-2 ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800 rounded-tl-none' : 'bg-white border border-zinc-200 shadow-sm rounded-tl-none'
            }`}>
              <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                {lowLatency ? 'Streaming response via Gemini-3.1-lite...' : 'Searching web metrics and drafting advisory...'}
              </span>
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
          className={`flex-1 text-sm px-3.5 py-2.5 border rounded-lg focus:outline-none transition-colors duration-100 ${
            theme === 'dark'
              ? 'bg-zinc-900 text-white border-zinc-800 placeholder-zinc-600 focus:border-zinc-700'
              : 'bg-zinc-50 text-zinc-900 border-zinc-200 placeholder-zinc-400 focus:border-zinc-300'
          }`}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isGenerating}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg shadow-sm transition-all duration-100"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
