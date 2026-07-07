import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  theme: 'dark' | 'light';
}

export default function AdSenseBanner({ theme }: AdSenseBannerProps) {
  const adInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once to avoid multiple push errors in React strict/dev environments
    if (adInitialized.current) return;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      adInitialized.current = true;
    } catch (e) {
      console.warn('AdSense push failed (this is normal when running in sandboxed development or without completed domain approval):', e);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* Visual frame container tailored for the premium Slate and Clean UI styles */}
      <div className={`w-full text-center overflow-hidden transition-all duration-300 rounded-xl border ${
        theme === 'dark' 
          ? 'bg-zinc-950/45 border-zinc-800' 
          : 'bg-white border-zinc-200 shadow-sm'
      }`}>
        <div className={`py-1.5 px-4 border-b border-dashed flex items-center justify-between text-[9px] uppercase tracking-wider font-mono ${
          theme === 'dark' 
            ? 'border-zinc-800/60 text-zinc-500' 
            : 'border-zinc-200/60 text-zinc-400'
        }`}>
          <span>SPONSORED ADVERTISEMENT</span>
          <span className="opacity-75 text-[8px]">Auto-Optimized Banner Unit</span>
        </div>
        <div className="p-4 flex items-center justify-center min-h-[100px] overflow-hidden">
          {/* Real Google AdSense Tag */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '250px', width: '100%', height: 'auto' }}
            data-ad-client="ca-pub-7064585697755959"
            data-ad-slot="4787168646"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
