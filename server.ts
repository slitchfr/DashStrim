import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// Fallback high-quality template generator in case API key is missing
function generateFallbackPosts(reviewText: string, tone: string, author: string, company: string, platforms: string[]): any[] {
  const posts: any[] = [];
  const cleanAuthor = author || "Un client satisfait";
  const cleanCompany = company ? ` chez ${company}` : "";

  // Dynamic template elements
  const quotes = [
    `"${reviewText}"`,
    `✨ Témoignage incroyable de ${cleanAuthor}${cleanCompany} : "${reviewText}"`,
    `🎯 Comment nos clients transforment leur quotidien ? La réponse de ${cleanAuthor} : \n\n"${reviewText}"`
  ];

  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)] || reviewText;

  if (platforms.includes('linkedin')) {
    let content = "";
    if (tone === 'hype') {
      content = `🚀 BOOM ! Quand nos clients parlent de nous comme ça, on ne chôme pas ! 🔥\n\n${selectedQuote}\n\nUn immense merci à ${cleanAuthor} pour sa confiance ! Notre mission reste identique : repousser les limites collectives de l'efficacité administrative. 🎯\n\nPrêt à franchir le cap avec Strimy ? Lien en commentaire ! 👇`;
    } else if (tone === 'professional') {
      content = `📈 La satisfaction client est au cœur de notre démarche d'innovation.\n\nTémoignage inspirant de ${cleanAuthor}${cleanCompany} : \n\n${selectedQuote}\n\nChez Strimy, nous croyons que l'automatisation intelligente des retours d'expérience permet à chaque équipe marketing d'optimiser sa présence sur les réseaux. \n\nMerci pour ce retour d'excellence. Qu'en pensez-vous ? Let's connect.`;
    } else if (tone === 'analytical') {
      content = `📊 Analyse de cas pratico-pratique avec un feedback client précieux.\n\nVoici ce que nous dit ${cleanAuthor}${cleanCompany} :\n\n${selectedQuote}\n\n💡 3 leçons clés que nous en tirons :\n1️⃣ L'expérience utilisateur prime sur la sophistication des fonctionnalités.\n2️⃣ Chaque avis client cache une opportunité de storytelling marketing.\n3️⃣ Réagir vite augmente la rétention de 40%.\n\nQuelle est votre stratégie de valorisation des retours clients ?`;
    } else if (tone === 'punchy') {
      content = `Short story, big impact. 👇\n\n${selectedQuote}\n\nMerci ${cleanAuthor}. Strimy s'occupe du reste. 😉`;
    } else {
      content = `📖 Il était une fois... un projet ambitieux qui cherchait la voix idéale pour résonner.\n\n${cleanAuthor} est venu nous voir avec un défi. Notre solution l'a aidé à se transformer : \n\n${selectedQuote}\n\nC'est pour ces moments-là que nous construisons Strimy au quotidien. 💙`;
    }

    posts.push({
      platform: 'linkedin',
      content,
      score: { hook: 88, viral: 75, clarity: 94 },
      metrics: { views: '1,420 - 2,800', engagement: '6.4%' },
      hashtags: ['Marketing', 'Storytelling', 'Strimy', 'B2B']
    });
  }

  if (platforms.includes('twitter')) {
    let content = "";
    if (tone === 'hype') {
      content = `🔥 Incroyable retour de ${cleanAuthor} : "${reviewText.substring(0, 100)}..." \n\nLa révolution de la satisfaction client est en marche avec Strimy ! Qu'attendez-vous ? 👇 🚀`;
    } else if (tone === 'professional') {
      content = `Satisfaire nos clients est notre priorité absolue. Merci à ${cleanAuthor} pour ce retour précieux :\n\n"${reviewText.substring(0, 150)}..."\n\nStrimy rationalise votre flux d'avis marketing. 📈`;
    } else if (tone === 'analytical') {
      content = `Data-driven marketing 🧪\n\n${cleanAuthor} explique notre impact :\n"${reviewText.substring(0, 120)}..."\n\nLa preuve en action. Strimy automatise vos posts. 📊`;
    } else if (tone === 'punchy') {
      content = `« ${reviewText.substring(0, 180)} »\n\n— ${cleanAuthor}. Voilà tout est dit. ⚡ #Strimy`;
    } else {
      content = `On a tous une histoire à raconter. Celle de ${cleanAuthor} montre que l'écoute active des feedbacks change la donne. 👇\n\n"${reviewText.substring(0, 120)}..."`;
    }

    posts.push({
      platform: 'twitter',
      content,
      score: { hook: 92, viral: 84, clarity: 89 },
      metrics: { views: '3,800 - 6,200', engagement: '4.8%' },
      hashtags: ['MarketingDigital', 'StartupFeedback', 'Strimy']
    });
  }

  if (platforms.includes('instagram')) {
    let content = "";
    if (tone === 'hype') {
      content = `✨ ON EST RECONNAISSANTS ✨\n\nRegardez ce que ${cleanAuthor} dit de Strimy :\n\n"${reviewText}"\n\nSwipe pour voir comment l'outil fonctionne en 3 étapes de folie ! 🎉🚀\n\n#strimy #feedbacksmatter #testimonial #hypeup #agencelife`;
    } else if (tone === 'professional') {
      content = `La parole est à nos précieux partenaires.\n\n✨ "${reviewText}" ✨\n— ${cleanAuthor}${cleanCompany}\n\nCréer des relations de confiance solides est notre ambition suprême chez Strimy.\n\n🚀 Découvrez nos solutions d'automatisation via le lien dans la bio.\n\n#excellence #marketingb2b #avisclients #dashboard`;
    } else if (tone === 'analytical') {
      content = `Focus Feedback Client 🔍\n\n"${reviewText}"\n\nLes chiffres parlent d'eux-mêmes : automatiser la diffusion de témoignages accroche l'œil 3 fois plus sur les fils sociaux.\n\n💡 Enregistrez ce post pour votre prochaine session marketing !\n\n#conseilmarketing #infographie #growthhacking #strimy`;
    } else if (tone === 'punchy') {
      content = `⚡️ DIRECT AU BUT ⚡️\n\n« ${reviewText} »\n\nMerci à ${cleanAuthor} d'avoir résumé nos forces avec autant de punch. 🔥\n\n#branding #efficacite #satisfaction #strimy`;
    } else {
      content = `💛 UNE BELLE HISTOIRE 💛\n\n"${reviewText}"\n\nChaque témoignage est un chapitre de l'aventure Strimy que nous co-écrivons avec vous.\n\n#aventure #temoignage #sharingiscaring #storytelling`;
    }

    posts.push({
      platform: 'instagram',
      content,
      score: { hook: 85, viral: 80, clarity: 90 },
      metrics: { views: '850 - 1,500', engagement: '8.9%' },
      hashtags: ['branding', 'marketing', 'testimonial', 'strimy']
    });
  }

  if (platforms.includes('threads')) {
    posts.push({
      platform: 'threads',
      content: `🧵 Un retour qui redonne de l'énergie de la part de ${cleanAuthor} :\n\n"${reviewText}"\n\nOn construit Strimy au grand jour avec vous. Des retours comme ça ? On en redemande. 🤝`,
      score: { hook: 90, viral: 72, clarity: 95 },
      metrics: { views: '600 - 1,100', engagement: '7.2%' },
      hashtags: ['buildinpublic', 'marketing', 'strimy']
    });
  }

  return posts;
}

// REST route to transform positive/negative reviews into optimized posts
app.post("/api/transform", async (req, res) => {
  const { reviewText, tone, author, company, platforms, brandProfile } = req.body;

  if (!reviewText) {
    return res.status(400).json({ error: "Le texte de l'avis est obligatoire." });
  }

  const requestedPlatforms = platforms && platforms.length > 0 ? platforms : ['linkedin', 'twitter'];
  const currentTone = tone || 'professional';
  const currentAuthor = author || "Un client anonyme";
  const currentCompany = company || "";

  const client = getGeminiClient();

  if (!client) {
    // If no API key, return generated template data with fallback flag
    const posts = generateFallbackPosts(reviewText, currentTone, currentAuthor, currentCompany, requestedPlatforms);
    return res.json({ posts, usingFallback: true });
  }

  try {
    const brandInfo = brandProfile ? 
      `Brand Name: ${brandProfile.name}, Industry: ${brandProfile.industry}, Target Audience: ${brandProfile.audience}, Tone preference: ${brandProfile.tonePreferences}, Emoji usage: ${brandProfile.emojiUsage}` :
      "Strimy is a platform transforming reviews to social posts.";

    const systemInstruction = `You are "Strimy AI Copywriter", an elite B2B and SaaS marketing copywriting expert.
Your job is to transform a customer feedback/review into highly engaging, modern, and viral social media posts.
Adapt constraints for each requested platform:
- LinkedIn: professional, structured, conversational, uses clever hooks, bold items, story-driven, strong call to action, natural spacing (line-break heavy is popular in B2B).
- Twitter/X: short, sharp, dynamic, high-impact hook, punchy hashtags, maximum 280 characters.
- Instagram: visually expressive, focus on community, strong hooks, bio link references, structured clean caption, beautiful emojis.
- Threads: building-in-public feel, collaborative, engaging questions, casual, friendly.

Format the output strictly as JSON. No markdown wrappings in the output except if it is valid JSON.`;

    const promptText = `
Transform this customer feedback review into structured, viral marketing posts for the following social networks: ${requestedPlatforms.join(', ')}.

--- CUSTOMER FEEDBACK DATA ---
Review: "${reviewText}"
Author: ${currentAuthor}
Business/Company context: ${currentCompany}

--- BRAND GUIDELINES & SELECTIONS ---
Requested Tone: ${currentTone}
Brand Profile Details: ${brandInfo}

--- REQUIRED OUTPUT FORMAT ---
You must generate a valid JSON object matching this schema. Avoid putting "json" code blocks, just return exact JSON text.
{
  "posts": [
    {
      "platform": "linkedin" | "twitter" | "instagram" | "threads",
      "content": "Full post text here, matching the specified guidelines, carriage returns, format and style.",
      "score": {
        "hook": 85, // estimated hook quality score (1-100)
        "viral": 80, // estimated viral score (1-100)
        "clarity": 95 // estimated clarity score (1-100)
      },
      "metrics": {
        "views": "A text estimates like '1.4k - 3.1k' or '2k - 4.5k'",
        "engagement": "A percentage range estimation like '5.2% - 7.9%'"
      },
      "hashtags": ["list", "of", "3-5", "relevant", "hashtags"]
    }
  ]
}
`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["posts"],
          properties: {
            posts: {
              type: Type.ARRAY,
              description: "List of generated social posts",
              items: {
                type: Type.OBJECT,
                required: ["platform", "content", "score", "metrics", "hashtags"],
                properties: {
                  platform: { type: Type.STRING, description: "linkedin, twitter, instagram or threads" },
                  content: { type: Type.STRING, description: "Text contents of the post" },
                  score: {
                    type: Type.OBJECT,
                    required: ["hook", "viral", "clarity"],
                    properties: {
                      hook: { type: Type.INTEGER },
                      viral: { type: Type.INTEGER },
                      clarity: { type: Type.INTEGER }
                    }
                  },
                  metrics: {
                    type: Type.OBJECT,
                    required: ["views", "engagement"],
                    properties: {
                      views: { type: Type.STRING },
                      engagement: { type: Type.STRING }
                    }
                  },
                  hashtags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      }
    });

    const bodyText = response.text || "";
    const parsedData = JSON.parse(bodyText.trim());
    return res.json({ posts: parsedData.posts, usingFallback: false });

  } catch (error: any) {
    console.error("Gemini transform error:", error);
    // Silent failover to fallback templates with informative indicator
    const posts = generateFallbackPosts(reviewText, currentTone, currentAuthor, currentCompany, requestedPlatforms);
    return res.json({ posts, usingFallback: true, error: error.message });
  }
});

// Refine API endpoint (Playground edit post)
app.post("/api/refine", async (req, res) => {
  const { currentContent, instruction, platform } = req.body;

  if (!currentContent || !instruction) {
    return res.status(400).json({ error: "Contenu original et instructions obligatoires." });
  }

  const client = getGeminiClient();

  if (!client) {
    // Quick fallback edit
    const refined = `${currentContent}\n\n[Version affinée localement : Envoyé avec la consigne "${instruction}"]`;
    return res.json({ refined, usingFallback: true });
  }

  try {
    const systemInstruction = `You are "Strimy Brand Improver", an expert copywriter editor.
Your task is to refine or rewrite an existing social media post contents according to the specific user editing instruction.
Preserve the core customer reference but adjust tone, brevity, hashtags, structure, language or formatting, matching the platform: ${platform || 'generic'}.
Only output the new post content as a plain string. No JSON wrapper, no quotes, just raw text.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `
Here is the current post content:
"
${currentContent}
"

Instruction of user: "${instruction}"
Platform context: ${platform || 'generic'}

Please output only the rewritten, refined content. Keep any hashtags or brand references aligned unless the user asked to remove them.`,
      config: { systemInstruction }
    });

    return res.json({ refined: response.text?.trim() || currentContent, usingFallback: false });
  } catch (error: any) {
    console.error("Gemini refine error:", error);
    const refined = `${currentContent}\n\n[Erreur de raffinement API : ${error.message}]`;
    return res.json({ refined, usingFallback: true });
  }
});

// Serve static assets and handle development HMR or production build routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
