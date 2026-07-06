import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import InteractiveConsole from './components/InteractiveConsole';

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
      theme === 'dark' ? 'bg-[#121214] text-zinc-300' : 'bg-[#F8FAFC] text-zinc-700'
    }`}>
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* REFINED MINIMALIST HEADER */}
        <header className={`border-b pb-8 transition-colors duration-100 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-lg font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-zinc-900'
              }`}>
                CreatorPay
              </span>
              <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded border ${
                theme === 'dark' 
                  ? 'text-zinc-400 bg-zinc-900 border-zinc-800' 
                  : 'text-zinc-600 bg-zinc-100 border-zinc-200'
              }`}>
                Free Tool
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* SYSTEM STATUS */}
              <div className="hidden sm:block text-[10px] font-mono text-zinc-500 tracking-wider uppercase">
                SYSTEM STATUS: STABLE // RPM VERSION: 2026.01
              </div>

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
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Dark Mode</span>
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
        <main>
          <InteractiveConsole theme={theme} />
        </main>

        {/* GOOGLE ADSENSE RESPONSIVE FOOTER BANNER */}
        <section>
          <div className={`w-full min-h-[90px] border border-dashed rounded-lg flex flex-col items-center justify-center text-[10px] font-mono tracking-widest text-center p-6 ${
            theme === 'dark' 
              ? 'border-zinc-800 text-zinc-500 bg-zinc-900/10' 
              : 'border-zinc-200 text-zinc-500 bg-zinc-100/50'
          }`}>
            <span className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} font-semibold mb-1`}>
              [Google AdSense Responsive Horizontal Anchor Banner]
            </span>
            <span className="text-[9px] text-zinc-500 font-sans tracking-normal">
              (Auto-optimized anchor display asset configured for passive publisher matching)
            </span>
          </div>
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

        {/* GLOBAL CREATOR AFFILIATE RESOURCE DIRECTORY */}
        <section className="space-y-6 pt-4">
          <div className="space-y-1">
            <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Curated Creator Resource Index
            </h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Professional software integrations to optimize watch time, target competitive keyword volumes, and build clean production loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <div className={`border rounded-lg p-5 flex flex-col justify-between space-y-4 ${
              theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="space-y-2">
                <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Video Editing Software</h3>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Highly efficient software packages with built-in styling, transcription presets, and seamless layout utilities to hold viewer attention.
                </p>
              </div>
              <a 
                href="https://www.capcut.com" 
                target="_blank" 
                rel="noreferrer"
                className={`text-xs font-semibold hover:underline ${
                  theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                }`}
              >
                Explore Recommended Editors →
              </a>
            </div>

            {/* Tool 2 */}
            <div className={`border rounded-lg p-5 flex flex-col justify-between space-y-4 ${
              theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="space-y-2">
                <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Metadata SEO Toolkits</h3>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Analyze high-competition keywords, track regional CPM indexes, and research rising trends to align scripts with optimal advertising channels.
                </p>
              </div>
              <a 
                href="https://vidiq.com" 
                target="_blank" 
                rel="noreferrer"
                className={`text-xs font-semibold hover:underline ${
                  theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                }`}
              >
                Browse SEO Toolkits →
              </a>
            </div>

            {/* Tool 3 */}
            <div className={`border rounded-lg p-5 flex flex-col justify-between space-y-4 ${
              theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="space-y-2">
                <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Copyright-Safe Music</h3>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Access licensed background soundtracks and audio profiles designed specifically for retention-based retention sequencing.
                </p>
              </div>
              <a 
                href="https://www.epidemicsound.com" 
                target="_blank" 
                rel="noreferrer"
                className={`text-xs font-semibold hover:underline ${
                  theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                }`}
              >
                Access Sound Databases →
              </a>
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
