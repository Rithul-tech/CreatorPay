import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import InteractiveConsole from './components/InteractiveConsole';
import GeminiChatbot from './components/GeminiChatbot';
import CreatorPayLogo from './components/CreatorPayLogo';
import AdSenseBanner from './components/AdSenseBanner';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('creatorpay_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('creatorpay_theme', nextTheme);
  };

  return (
    <div className={`min-h-screen transition-colors duration-100 font-sans selection:bg-zinc-800 selection:text-white ${
      theme === 'dark' ? 'bg-[#121214]' : 'bg-[#F8FAFC]'
    } ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* REFINED MINIMALIST HEADER */}
        <header className={`border-b pb-8 transition-colors duration-100 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreatorPayLogo theme={theme} />
              <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded border ${
                theme === 'dark' 
                  ? 'text-zinc-400 bg-zinc-900 border-zinc-800' 
                  : 'text-zinc-600 bg-zinc-100 border-zinc-200'
              }`}>
                Free Tool
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Elegant Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-100 ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-sm'
                }`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="hidden md:inline">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="hidden md:inline">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-10 max-w-2xl space-y-2">
            <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-zinc-900'
            }`}>
              Calculate creator ad earnings
            </h1>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Compare real-time 2026 YouTube and TikTok RPM payouts instantly. Choose your industry niche, country target, and monthly views to estimate ad revenue range.
            </p>
          </div>
        </header>

        {/* MAIN UTILITY CONSOLE */}
        <main className="space-y-8">
          <InteractiveConsole theme={theme} />
          <GeminiChatbot theme={theme} />
        </main>

        {/* GOOGLE ADSENSE RESPONSIVE FOOTER BANNER */}
        <section>
          <AdSenseBanner theme={theme} />
        </section>

        {/* STRATEGIC OPTIMIZATION GRID */}
        <section className="space-y-6 pt-4">
          <div className="space-y-1.5">
            <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Understanding Creator Ad Yield Dynamics
            </h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'} max-w-2xl`}>
              Platform direct payments are a factor of audience geography, category bidding velocity, and engagement time frames.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Perspective 1 */}
            <div className={`border rounded-lg p-5 space-y-3 ${
              theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                01 / The Geographic Variance
              </h3>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Viewer location fundamentally controls your baseline RPM metrics. High purchasing power regions like the United States and Northern Europe experience massive competitor bid density. This translates directly to larger payout multipliers, while emerging markets scale on raw view counts rather than premium pricing tiers.
              </p>
            </div>

            {/* Perspective 2 */}
            <div className={`border rounded-lg p-5 space-y-3 ${
              theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                02 / Format Revenue Gaps
              </h3>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Longer content above eight minutes remains the ultimate optimization strategy. Manual mid-roll placement yields higher display density per session, unlocking greater earnings potential compared to standard short clips which are dependent entirely on system-assigned baseline impression sequences.
              </p>
            </div>

            {/* Perspective 3 */}
            <div className={`border rounded-lg p-5 space-y-3 ${
              theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                03 / Pipeline Diversification
              </h3>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Direct publisher ad commissions are only the base of a professional creator business structure. Top digital operators leverage stable ad impressions purely to cover initial production overheads, while routing primary viewers towards proprietary digital products, sponsors, and fan communities.
              </p>
            </div>
          </div>
        </section>

        {/* SYSTEM FOOTER */}
        <footer className={`border-t pt-8 mt-16 text-center space-y-2 ${
          theme === 'dark' ? 'border-zinc-900' : 'border-zinc-200'
        }`}>
          <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            CreatorPay — Professional Calculation Tools
          </p>
          <p className={`text-[11px] max-w-3xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-zinc-600' : 'text-zinc-500'
          }`}>
            CreatorPay © 2026. Data simulated based on average annual marketplace RPM rates. Actual platform earnings fluctuate based on regional placement, session watch-time duration, viewer demographics, and brand seasonal spend variables.
          </p>
        </footer>

      </div>
    </div>
  );
}
