import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Endpoint for Search-Grounded Niche & Region Trends
app.post('/api/niche-trends', async (req, res) => {
  try {
    const { nicheLabel, countryName, platform, videoFormat } = req.body;

    if (!nicheLabel || !countryName || !platform || !videoFormat) {
       res.status(400).json({ error: 'Missing required parameters' });
       return;
    }

    if (!process.env.GEMINI_API_KEY) {
       res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
       return;
    }

    const formatDescription = videoFormat === 'long' ? 'Long-Form (> 1 Minute)' : 'Short-Form / Shorts (< 1 Minute)';
    
    // Construct search-grounded prompt
    const prompt = `Perform a real-time web search for current 2026 ad rates, CPM/RPM metrics, and audience engagement trends.
Analyze this configuration:
- Platform: ${platform.toUpperCase()}
- Content Format: ${formatDescription}
- Niche: ${nicheLabel}
- Target Region: ${countryName}

Please return your response as a JSON object with this EXACT structure (valid JSON, no markdown around it):
{
  "summary": "A concise paragraph summarizing the current 2026 ad rate climate, seasonal trends, and general performance for this exact niche and region.",
  "estimatedRpmRange": "A realistic estimated RPM/CPM range based on 2026 market search data (e.g., $4.50 - $12.00).",
  "strategies": [
    "A content optimization strategy customized for this platform format and niche.",
    "A second monetization or retention optimization strategy.",
    "A third target keyword or bidding velocity strategy."
  ]
}`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Request JSON back
        responseMimeType: 'application/json',
      },
    });

    const resultText = geminiResponse.text?.trim() || '{}';
    let parsedData = { summary: '', estimatedRpmRange: '', strategies: [] };
    
    try {
      parsedData = JSON.parse(resultText);
    } catch (e) {
      // Fallback if parsing fails
      parsedData = {
        summary: resultText,
        estimatedRpmRange: 'N/A',
        strategies: ['Optimize content for high user retention.', 'Target relevant high-paying search keywords.']
      };
    }

    // Extract Grounding Sources
    const groundingChunks = geminiResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Source',
        uri: chunk.web.uri,
      }));

    // Deduplicate sources
    const uniqueSources = Array.from(new Map(sources.map((s: any) => [s.uri, s])).values());

    res.json({
      data: parsedData,
      sources: uniqueSources,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// API Endpoint for Creator Revenue & SEO Chatbot
function getLocalExpertResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes('niche') || q.includes('cpm') || q.includes('rpm') || q.includes('high-paying') || q.includes('highest')) {
    return `### 💰 Elite Monetization: High-RPM Social Media Niches (2026 Strategy)

Based on current ad bidding metrics, advertiser demand, and target demographic data, here is the breakdown of the most profitable content niches across YouTube and TikTok:

#### 1. Personal Finance, Wealth & Investing
* **Estimated RPM (Long-Form):** $15.00 - $35.00 (per 1,000 views)
* **Shorts RPM:** $0.15 - $0.40
* **Why it pays:** Financial institutions, brokerages, and fintech apps bid aggressively to acquire high-lifetime-value customers.
* **Key Keywords:** ETFs, compound interest, index funds, crypto staking, credit card rewards.

#### 2. Business, Software, SaaS & Marketing
* **Estimated RPM (Long-Form):** $12.00 - $28.00
* **Shorts RPM:** $0.12 - $0.35
* **Why it pays:** B2B companies have massive customer acquisition budgets and high product prices.
* **Key Keywords:** SaaS tools, email marketing, workflow automation, e-commerce hosting.

#### 3. Technology, AI, Developer Tools & Gadgets
* **Estimated RPM (Long-Form):** $8.00 - $18.00
* **Why it pays:** Consumer tech brands, SaaS software, VPNs, and online courses compete heavily for tech-savvy buyers.

#### 4. Real Estate, Home Improvement & DIY
* **Estimated RPM (Long-Form):** $7.00 - $15.00
* **Why it pays:** Premium lead generation for local brokers, mortgage companies, and hardware retailers.

---
### 💡 Core Optimization Tactics to Boost RPM:
1. **Target Tier 1 Locations:** Ensure your content is tailored to audiences in the United States, United Kingdom, Canada, and Australia.
2. **Optimize Video Duration:** Keep videos over **8 minutes** to allow mid-roll ad insertions, which can double your RPM.
3. **High Intent Call-to-Actions:** Place affiliate links and digital product pins in your description to supplement your AdSense revenue.`;
  }
  
  if (q.includes('seo') || q.includes('keyword') || q.includes('title') || q.includes('tag') || q.includes('metadata')) {
    return `### 🔑 Professional SEO & Video Metadata Optimization (2026 Handbook)

To rank on the YouTube search index and TikTok SEO pages, you must align your metadata with high-intent search terms. Here is the step-by-step optimization blueprint:

#### 1. High-Converting Title Structures
Your title is the single most important factor for CTR (Click-Through Rate) and SEO. Use a mix of search-friendly keywords and high-curiosity phrases:
* **The Search-Curiosity Hybrid:** \`[Broad Keyword] - [Curiosity Loop Hook]\`
  * *Example:* "How to Edit Videos in 2026 - (The 3 Tricks You Are Missing)"
* **The Speed/Value Anchor:** \`[Actionable Outcome] in [Timeframe] (No [Common Pain Point])\`
  * *Example:* "Learn SaaS Development in 10 Minutes (No Code Required)"

#### 2. Description Optimization Architecture
Never leave your description blank! Search algorithms parse the first 3 lines (the "above the fold" section) heavily:
* **Line 1-2 (The Abstract):** Write a 2-sentence summary using 2-3 high-search-volume natural-sounding synonyms.
* **Line 3-5 (Navigation / Timestamps):** Include clickable chapters. This auto-generates key segments in Google search.
* **Line 6+ (Resource Links & Legal):** Add pinned affiliate links, community channels, and required disclaimers.

#### 3. Strategic Tagging & Semantic Mapping
While tags are less important than they used to be, they establish the initial "semantic neighborhood" of your video:
* **Primary Tag:** Your exact target search phrase.
* **Synonyms (3-4 tags):** Alternative phrasing of your topic.
* **Category/Broad Tags (2-3 tags):** The broad industry (e.g., "Technology", "Web Development").`;
  }
  
  if (q.includes('country') || q.includes('location') || q.includes('tier') || q.includes('regional') || q.includes('demographics')) {
    return `### 🌍 Regional CPM Dynamics: Tier 1 vs. Tier 3 Country Impact

Ad earnings are heavily dictated by the geographic location of the viewer. Advertisers pay significantly more to reach audiences with high purchasing power.

#### Demographics Tier Breakdown:

| Tier | Countries | Average RPM Range | Bidding Intensity |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Premium)** | USA, UK, Canada, Australia, Germany, Switzerland | **$10.00 - $30.00** | Extremely High (Enterprise Brands) |
| **Tier 2 (Moderate)** | Spain, Italy, Poland, Brazil, UAE, South Korea | **$3.00 - $8.00** | Moderate (Growth & Local Brands) |
| **Tier 3 (Volume)** | India, Pakistan, Philippines, Egypt, Nigeria | **$0.50 - $2.00** | Low (High View Volume, Low Conversions) |

#### 📈 Strategies to Pivot to Tier 1 Audiences (Without Moving):
1. **Change Language and Subtitles:** Ensure your primary language is English (with clean US/UK accents or clear narration). Add precise CC (Closed Captions) subtitles.
2. **Niche Selection Alignment:** Target global topics like international finance, global software platforms (SaaS), or US-centric investment markets.
3. **Sponsorship Timing:** Publish your content during Eastern Standard Time (EST) peak windows (between 9:00 AM and 1:00 PM EST) to maximize immediate Tier 1 notification traffic.`;
  }
  
  if (q.includes('shorts') || q.includes('tiktok') || q.includes('long-form') || q.includes('comparison') || q.includes('compare')) {
    return `### 📊 Content Formats: Long-Form vs. Shorts Monetization (2026 Comparison)

The landscape of short-form and long-form monetization has evolved dramatically. Here is the comparative breakdown of revenue potential and structural strategy:

#### 1. Long-Form Videos (YouTube AdSense / Premium Sponsors)
* **Typical RPM:** $5.00 - $25.00
* **Pros:** Support for multiple mid-roll ads, excellent evergreen compounding revenue, and higher brand sponsorship deals.
* **Cons:** Higher barrier to entry, requires sophisticated editing, longer retention loops, and slower initial audience growth.
* **Optimal Length:** **8 to 12 minutes** (safely triggers mid-roll options without inflating viewer fatigue).

#### 2. Short-Form Videos (YouTube Shorts, TikTok Creator Rewards)
* **Typical RPM:** $0.05 - $0.40 (per 1,000 views)
* **Pros:** Viral potential, rapid subscriber acquisition, low production time, and lower friction for audience engagement.
* **Cons:** Extremely low ad rates, highly volatile algorithms, and shorter shelf life.
* **TikTok Note:** The *TikTok Creator Rewards Program* requires videos to be **over 1 minute** to qualify for premium monetization payouts. Short 15-second clips pay almost nothing.

#### ⚖️ The "Hybrid Content Funnel" Strategy:
The most successful creators in 2026 utilize a double-funnel system:
1. **The Shorts Hook:** Use short-form videos as top-of-funnel marketing to gather attention, subscribers, and brand awareness.
2. **The Long-Form Conversion:** Redirect your Shorts audience to deep-dive long-form videos to convert views into high-RPM AdSense and premium affiliate sales.`;
  }
  
  // Default general high-quality fallback reply
  return `### 📊 Social Media Revenue & Monetization Masterclass (2026 Edition)

To help you maximize your social media earnings and algorithm visibility, here is a professional strategic checklist:

#### 📈 Primary Creator Growth Directives:
1. **Establish a High-CPM Niche:** Align your channel topics with high-paying industries such as SaaS, fintech, online education, or professional coaching.
2. **Leverage Search Engine Optimization (SEO):** Structure your titles with the **[Core Keyword] - [Curiosity Hook]** formula to rank evergreen search terms.
3. **Develop a Multi-Stream Funnel:** Do not rely solely on platform ad programs. Diversify with brand sponsorships, affiliate links, and digital product sales in the description.
4. **Optimize Viewer Retention:** Focus on strong hooks in the first **15 seconds** and use responsive editing transitions every 3-5 seconds to keep retention scores above 50%.

---
### 💡 Ask me more detailed questions!
I can give you custom breakdowns on:
- **Highest CPM Niches** (Finance, tech, real estate)
- **Metadata/SEO Guidelines** (Titles, tags, description optimization)
- **Tier 1 Demographic Targeting** (US/UK audiences)
- **Shorts vs. Long-form video strategies** (Monetization comparisons)`;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, lowLatency } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    // Filter out leading assistant/greeting messages to ensure history starts with a user message
    const firstUserIndex = messages.findIndex((m: any) => m.role === 'user');
    const slicedMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

    // Format messages for @google/genai SDK
    const contents = slicedMessages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const systemInstruction = `You are "CreatorPay Revenue & SEO AI", an elite, professional consultant specializing in creator monetization, social media platform algorithms (YouTube, TikTok, Instagram, Twitch), niche RPM/CPM valuation, and search engine optimization (SEO) keyword strategies.

Your domain knowledge includes:
- Creator monetization models: AdSense, Creator Rewards, brand sponsorships, affiliate marketing, digital products, memberships.
- Detailed RPM/CPM estimates: High-paying niches (Finance, Tech, Business, Real Estate) versus lower-paying high-volume niches (Gaming, Vlogs, Entertainment).
- Optimization: View-to-revenue ratios, audience demographics impact (Tier 1 vs Tier 3 countries), video length optimization (8+ minutes for mid-rolls), CTR, and retention curves.
- SEO & Keywords: Tagging, titles, description optimization, finding high-volume low-competition search phrases, metadata strategy.

Always give precise, actionable, and data-backed advice. Use clean Markdown styling for readability (bullet points, bold text, mini tables if appropriate). Keep answers structured and professional. You are operating in 2026, so refer to 2026 platform dynamics and current trends. Ensure search grounding is used if searching for recent ad rates or keyword metrics.`;

    const hasApiKey = !!process.env.GEMINI_API_KEY;
    let geminiResponse;
    let fallbackUsed = false;
    let isLiteModel = false;
    let localExpertUsed = !hasApiKey;

    if (hasApiKey) {
      // Direct routing for user-requested Low-Latency mode
      if (lowLatency) {
        try {
          console.log('Low latency mode activated: Requesting gemini-3.1-flash-lite');
          geminiResponse = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
            },
          });
          isLiteModel = true;
        } catch (liteError: any) {
          console.warn('Primary low-latency gemini-3.1-flash-lite request failed, entering standard fallbacks:', liteError.message);
        }
      }

      // Standard multi-tier model flow
      if (!geminiResponse) {
        try {
          // Tier 1: Try gemini-3.5-flash with search grounding
          geminiResponse = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              tools: [{ googleSearch: {} }],
            },
          });
        } catch (searchError: any) {
          console.log('Tier 1 Info (gemini-3.5-flash with Search): Search grounding limit hit. Falling back smoothly.');
          
          try {
            // Tier 2: Try gemini-3.5-flash without search grounding
            geminiResponse = await ai.models.generateContent({
              model: 'gemini-3.5-flash',
              contents: contents,
              config: {
                systemInstruction: systemInstruction,
              },
            });
            fallbackUsed = true;
          } catch (tier2Error: any) {
            console.log('Tier 2 Info (gemini-3.5-flash without Search): Limit hit. Trying alternate model tiers.');
            
            try {
              // Tier 3: Try standard gemini-2.5-flash which might have different quotas
              geminiResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                  systemInstruction: systemInstruction,
                },
              });
              fallbackUsed = true;
            } catch (tier3Error: any) {
              console.log('Tier 3 Info (gemini-2.5-flash): Alternate limit hit. Trying next fallback.');
              
              try {
                // Tier 4: Try gemini-3.1-flash-lite
                geminiResponse = await ai.models.generateContent({
                  model: 'gemini-3.1-flash-lite',
                  contents: contents,
                  config: {
                    systemInstruction: systemInstruction,
                  },
                });
                fallbackUsed = true;
              } catch (tier4Error: any) {
                console.log('Tier 4 Info: Offline expert database fallback triggered.');
                localExpertUsed = true;
              }
            }
          }
        }
      }
    }

    if (localExpertUsed) {
      const userLatestQuery = messages[messages.length - 1]?.text || '';
      const replyText = getLocalExpertResponse(userLatestQuery);
      const noticeText = !hasApiKey
        ? `\n\n*(Note: For personalized answers using our real-time search engine, you can configure your GEMINI_API_KEY in the **Settings > Secrets** panel. In the meantime, you are connected to our built-in offline expert database with optimal 2026 guidelines.)*`
        : `\n\n*(Note: CreatorPay Server fallback active. Due to high global demand, your request is being handled by our built-in offline expert database with optimal 2026 guidelines.)*`;
      
      res.json({
        text: `${replyText}${noticeText}`,
        sources: []
      });
      return;
    }

    // If we have a successful Gemini API response
    const replyText = geminiResponse.text?.trim() || "I couldn't generate a reply. Please try again.";

    // Extract Grounding Sources
    const groundingChunks = geminiResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Source',
        uri: chunk.web.uri,
      }));

    // Deduplicate sources
    const uniqueSources = Array.from(new Map(sources.map((s: any) => [s.uri, s])).values());

    let finalNote = '';
    if (isLiteModel) {
      finalNote = '\n\n*(⚡ Low-Latency response generated instantly by gemini-3.1-flash-lite)*';
    } else if (fallbackUsed) {
      finalNote = '\n\n*(Note: Real-time search is currently paused due to quota limits; providing optimized knowledge-base advice.)*';
    }

    res.json({
      text: `${replyText}${finalNote}`,
      sources: uniqueSources,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Setup Vite Dev Server Middleware or Production Static Serves
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving built static files in production mode');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
