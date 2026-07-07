import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Check, 
  Globe
} from 'lucide-react';
import { 
  PlatformType, 
  VideoFormatType, 
  NicheType, 
  NICHE_LIST, 
  COUNTRY_LIST 
} from '../types';

interface InteractiveConsoleProps {
  theme?: 'dark' | 'light';
}

export default function InteractiveConsole({ theme = 'dark' }: InteractiveConsoleProps) {
  // 1. Reactive State
  const [currentPlatform, setCurrentPlatform] = useState<PlatformType>('youtube');
  const [videoFormat, setVideoFormat] = useState<VideoFormatType>('long');
  const [channelNiche, setChannelNiche] = useState<NicheType>('entertainment');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [monthlyViews, setMonthlyViews] = useState<number>(100000);
  
  // Custom dropdown states
  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  
  const nicheRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  // Close custom dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nicheRef.current && !nicheRef.current.contains(event.target as Node)) {
        setIsNicheOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Active Configurations
  const activeNiche = NICHE_LIST.find(n => n.id === channelNiche) || NICHE_LIST[3];
  const activeCountry = COUNTRY_LIST.find(c => c.code === selectedCountryCode) || COUNTRY_LIST[0];

  // 3. Calculation Matrix
  // Base USD RPM from 2026 specifications
  const baseUsdRpm = activeNiche.rpm[currentPlatform][videoFormat];
  
  // Apply regional market coefficient (e.g. UK has 0.88x typical US RPM, India 0.28x)
  const adjustedUsdRpm = baseUsdRpm * activeCountry.rpmMultiplier;

  // Convert to local currency based on exchange rate
  const localRpm = adjustedUsdRpm * activeCountry.rate;

  // Estimated Payout Formula: (Monthly Views / 1000) * Selected RPM
  const baselineLocalPayout = (monthlyViews / 1000) * localRpm;

  // Apply tight +/- 15% variance range around baseline
  const lowPayout = baselineLocalPayout * 0.85;
  const highPayout = baselineLocalPayout * 1.15;

  // Annual projections
  const annualLow = lowPayout * 12;
  const annualHigh = highPayout * 12;

  // Edge-Case Logic: TikTok Short-Form (< 60s) has absolute flat $0 RPM
  const isZeroRevenueScenario = currentPlatform === 'tiktok' && videoFormat === 'short';

  // Format Helper for numbers with proper comma formatting
  const formatValue = (num: number, minDecimals = 0, maxDecimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    }).format(num);
  };

  // Human-made natural slider math to cleanly map log slider views
  const minSlider = 1000;
  const maxSlider = 25000000;
  const minLog = Math.log10(minSlider);
  const maxLog = Math.log10(maxSlider);

  const viewsToSlider = (views: number): number => {
    const logVal = Math.log10(Math.max(minSlider, Math.min(maxSlider, views)));
    return ((logVal - minLog) / (maxLog - minLog)) * 100;
  };

  const sliderToViews = (sliderVal: number): number => {
    const logVal = minLog + (sliderVal / 100) * (maxLog - minLog);
    const rawViews = Math.pow(10, logVal);
    
    if (rawViews < 5000) {
      return Math.round(rawViews / 100) * 100;
    } else if (rawViews < 50000) {
      return Math.round(rawViews / 1000) * 1000;
    } else if (rawViews < 500000) {
      return Math.round(rawViews / 10000) * 10000;
    } else if (rawViews < 5000000) {
      return Math.round(rawViews / 100000) * 100000;
    } else {
      return Math.round(rawViews / 500000) * 500000;
    }
  };

  const handleManualViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueStr = e.target.value.replace(/,/g, '');
    const value = parseInt(valueStr, 10);
    if (!isNaN(value)) {
      setMonthlyViews(Math.max(minSlider, Math.min(maxSlider, value)));
    } else if (valueStr === '') {
      setMonthlyViews(minSlider);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* LEFT COLUMN: CLEAN DATA INPUTS */}
        <div className={`rounded-xl p-6 flex flex-col justify-between space-y-6 border transition-colors duration-100 ${
          theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          
          {/* Header Label */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              01 / Input Parameters
            </div>
            <div className={`h-px w-full transition-colors duration-100 ${
              theme === 'dark' ? 'bg-zinc-800/80' : 'bg-zinc-200/80'
            }`} />
          </div>

          {/* Platform Selection - Segmented Toggle */}
          <div className="space-y-2">
            <label className={`text-xs font-medium transition-colors duration-100 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>Target Platform</label>
            <div className={`flex rounded-lg p-1 border transition-colors duration-100 ${
              theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
            }`}>
              <button
                onClick={() => setCurrentPlatform('youtube')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-100 ${
                  currentPlatform === 'youtube'
                    ? theme === 'dark' 
                      ? 'bg-zinc-800 text-white shadow-sm' 
                      : 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50'
                    : theme === 'dark'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                YouTube
              </button>
              <button
                onClick={() => setCurrentPlatform('tiktok')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-100 ${
                  currentPlatform === 'tiktok'
                    ? theme === 'dark' 
                      ? 'bg-zinc-800 text-white shadow-sm' 
                      : 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50'
                    : theme === 'dark'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                TikTok
              </button>
            </div>
          </div>

          {/* Video Format Selection - Segmented Toggle */}
          <div className="space-y-2">
            <label className={`text-xs font-medium transition-colors duration-100 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>Video Format Type</label>
            <div className={`flex rounded-lg p-1 border transition-colors duration-100 ${
              theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
            }`}>
              <button
                onClick={() => setVideoFormat('short')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-100 ${
                  videoFormat === 'short'
                    ? theme === 'dark' 
                      ? 'bg-zinc-800 text-white shadow-sm' 
                      : 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50'
                    : theme === 'dark'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Shorts / &lt; 1 Min
              </button>
              <button
                onClick={() => setVideoFormat('long')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-100 ${
                  videoFormat === 'long'
                    ? theme === 'dark' 
                      ? 'bg-zinc-800 text-white shadow-sm' 
                      : 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50'
                    : theme === 'dark'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Long-Form / &gt; 1 Min
              </button>
            </div>
          </div>

          {/* Niche Selector - Custom Minimal Dropdown */}
          <div className="space-y-2" ref={nicheRef}>
            <label className={`text-xs font-medium transition-colors duration-100 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>Channel Niche</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNicheOpen(!isNicheOpen);
                  setIsCountryOpen(false);
                }}
                className={`w-full flex items-center justify-between border rounded-lg px-4 py-3 text-left transition-all duration-100 focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700/80' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{activeNiche.label}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </button>

              {isNicheOpen && (
                <div className={`absolute z-30 mt-1.5 w-full border rounded-lg shadow-xl overflow-hidden ${
                  theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  <div className={`p-1 divide-y ${theme === 'dark' ? 'divide-zinc-800/40' : 'divide-zinc-200/40'}`}>
                    {NICHE_LIST.map((niche) => {
                      const isSelected = niche.id === channelNiche;
                      return (
                        <button
                          key={niche.id}
                          type="button"
                          onClick={() => {
                            setChannelNiche(niche.id);
                            setIsNicheOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-left transition-all duration-100 text-xs ${
                            isSelected 
                              ? theme === 'dark'
                                ? 'bg-zinc-800 text-white font-medium' 
                                : 'bg-zinc-100 text-zinc-900 font-semibold'
                              : theme === 'dark'
                                ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                          }`}
                        >
                          <div>
                            <span>{niche.label}</span>
                            <span className="block text-[10px] text-zinc-500 font-normal leading-normal mt-0.5">
                              {niche.sublabel}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Country Selector - Custom Minimal Dropdown */}
          <div className="space-y-2" ref={countryRef}>
            <div className="flex justify-between items-center">
              <label className={`text-xs font-medium transition-colors duration-100 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>Target Region & Currency</label>
              <span className="text-[10px] text-zinc-500 font-mono">
                Index: {activeCountry.rpmMultiplier.toFixed(2)}x
              </span>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCountryOpen(!isCountryOpen);
                  setIsNicheOpen(false);
                  setCountrySearch('');
                }}
                className={`w-full flex items-center justify-between border rounded-lg px-4 py-3 text-left transition-all duration-100 focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700/80' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base select-none leading-none">{activeCountry.flag}</span>
                  <span className="text-xs font-medium">
                    {activeCountry.name} ({activeCountry.currency} - {activeCountry.symbol})
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </button>

              {isCountryOpen && (
                <div className={`absolute z-20 mt-1.5 w-full border rounded-lg shadow-xl overflow-hidden ${
                  theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200'
                }`}>
                  {/* Sticky Search Header */}
                  <div className={`p-2 border-b ${
                    theme === 'dark' ? 'border-zinc-800/60 bg-zinc-950/40' : 'border-zinc-200/80 bg-zinc-50/50'
                  }`}>
                    <input
                      type="text"
                      placeholder="Search country or currency..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className={`w-full text-xs px-3 py-2 border rounded-md focus:outline-none transition-all duration-100 ${
                        theme === 'dark'
                          ? 'bg-zinc-900 text-white border-zinc-800 placeholder-zinc-500 focus:border-zinc-700'
                          : 'bg-white text-zinc-900 border-zinc-200 placeholder-zinc-400 focus:border-zinc-300 shadow-inner'
                      }`}
                      onClick={(e) => e.stopPropagation()} // Prevent closing dropdown on input click
                    />
                  </div>

                  <div className={`max-h-60 overflow-y-auto p-1 divide-y ${
                    theme === 'dark' ? 'divide-zinc-800/40' : 'divide-zinc-200/40'
                  }`}>
                    {(() => {
                      const filtered = COUNTRY_LIST.filter((c) =>
                        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                        c.currency.toLowerCase().includes(countrySearch.toLowerCase()) ||
                        c.code.toLowerCase().includes(countrySearch.toLowerCase())
                      );
                      
                      if (filtered.length === 0) {
                        return (
                          <div className="p-4 text-center text-xs text-zinc-500">
                            No matching countries found
                          </div>
                        );
                      }

                      return filtered.map((country) => {
                        const isSelected = country.code === selectedCountryCode;
                        return (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountryCode(country.code);
                              setIsCountryOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-left transition-all duration-100 text-xs ${
                              isSelected 
                                ? theme === 'dark'
                                  ? 'bg-zinc-800 text-white font-medium' 
                                  : 'bg-zinc-100 text-zinc-900 font-semibold'
                                : theme === 'dark'
                                  ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base select-none leading-none">{country.flag}</span>
                              <div>
                                <span className="font-medium">{country.name}</span>
                                <span className="block text-[10px] text-zinc-500 mt-0.5 leading-normal">
                                  Currency: {country.currency} ({country.symbol}) • RPM Index: {Math.round(country.rpmMultiplier * 100)}%
                                </span>
                              </div>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* View Slider Interface */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-2">
              <label className={`text-xs font-medium transition-colors duration-100 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>Monthly View Velocity</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={formatValue(monthlyViews)}
                  onChange={handleManualViewsChange}
                  className={`w-full sm:w-40 text-right font-mono text-xs font-bold border rounded-lg py-1.5 pr-14 pl-3 focus:outline-none transition-colors duration-100 ${
                    theme === 'dark' 
                      ? 'bg-zinc-900 text-white border-zinc-800' 
                      : 'bg-zinc-50 text-zinc-900 border-zinc-200'
                  }`}
                />
                <span className="absolute right-3 text-[10px] font-mono text-zinc-500 select-none pointer-events-none">
                  Views
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={viewsToSlider(monthlyViews)}
                onChange={(e) => setMonthlyViews(sliderToViews(parseFloat(e.target.value)))}
                className={`w-full h-1 rounded-lg appearance-none cursor-pointer focus:outline-none transition-colors duration-100 ${
                  theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-200'
                }`}
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(to right, #4b5563 0%, #4b5563 ${viewsToSlider(monthlyViews)}%, #18181b ${viewsToSlider(monthlyViews)}%, #18181b 100%)`
                    : `linear-gradient(to right, #71717a 0%, #71717a ${viewsToSlider(monthlyViews)}%, #e4e4e7 ${viewsToSlider(monthlyViews)}%, #e4e4e7 100%)`
                }}
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>1K</span>
                <span>10K</span>
                <span>100K</span>
                <span>1M</span>
                <span>25M</span>
              </div>
            </div>

            {/* Clean text-link shortcuts */}
            <div className="flex gap-2 pt-1">
              <span className="text-[10px] font-mono text-zinc-500 mr-1 flex items-center">Presets:</span>
              {[50000, 100000, 500000, 1000000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setMonthlyViews(val)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all duration-100 border ${
                    monthlyViews === val
                      ? theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-700 text-white'
                        : 'bg-zinc-200 border-zinc-300 text-zinc-900'
                      : theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
                  }`}
                >
                  {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}k`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: THE NO-NONSENSE MONITOR */}
        <div className={`rounded-xl p-6 flex flex-col justify-between space-y-6 border transition-colors duration-100 ${
          theme === 'dark' ? 'bg-[#1A1A1E] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          
          {/* Header Label */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              02 / Forecast Analytics
            </div>
            <div className={`h-px w-full transition-colors duration-100 ${
              theme === 'dark' ? 'bg-zinc-800/80' : 'bg-zinc-200/80'
            }`} />
          </div>

          {/* Calculation Readout Block */}
          <div className="flex-1 flex flex-col justify-center py-4">
            {isZeroRevenueScenario ? (
              <div className={`p-4 rounded-lg text-xs leading-relaxed space-y-2 border transition-colors duration-100 ${
                theme === 'dark' 
                  ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' 
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600'
              }`}>
                <div className={`font-semibold flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-white' : 'text-zinc-800'
                }`}>
                  ⚠️ Platform Threshold Restriction
                </div>
                <p>
                  TikTok's Creator Rewards Program strictly requires videos to be over 
                  <strong> 60 seconds (1 minute) long</strong> to qualify for direct ad revenue sharing. 
                  Short micro-clips under 60 seconds do not accumulate ad views within this matrix.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                  Estimated Monthly Revenue ({activeCountry.currency})
                </span>
                <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-sans transition-colors duration-100 ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {activeCountry.symbol}{formatValue(lowPayout, 0, 2)} — {activeCountry.symbol}{formatValue(highPayout, 0, 2)}
                </div>
                <span className="text-[10px] text-zinc-500 font-sans block pt-1">
                  Estimated monthly ad revenue based on optimized platform metrics.
                </span>
              </div>
            )}
          </div>

          {/* Breakdown Analytics Details */}
          <div className={`space-y-4 pt-4 border-t transition-colors duration-100 ${
            theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-200/80'
          }`}>
            
            {/* Active Localized RPM row */}
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-zinc-500 font-medium">Active Regional RPM</span>
              <span className={`font-mono font-bold transition-colors duration-100 ${
                theme === 'dark' ? 'text-white' : 'text-zinc-900'
              }`}>
                {activeCountry.symbol}{isZeroRevenueScenario ? '0.00' : localRpm.toFixed(2)} / 1K views
              </span>
            </div>

            {/* Annual Calculations row */}
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-zinc-500 font-medium">Calculated Annual Value</span>
              <span className={`font-mono font-bold transition-colors duration-100 ${
                isZeroRevenueScenario 
                  ? 'text-zinc-500' 
                  : theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                {isZeroRevenueScenario 
                  ? `${activeCountry.symbol}0.00` 
                  : `${activeCountry.symbol}${formatValue(annualLow, 0, 0)} — ${activeCountry.symbol}${formatValue(annualHigh, 0, 0)}`
                }
              </span>
            </div>

            {/* Regional Optimization Row */}
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-zinc-500 font-medium">Regional Index Rate</span>
              <span className={`font-mono transition-colors duration-100 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {activeCountry.code} Marketplace ({Math.round(activeCountry.rpmMultiplier * 100)}%)
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
