import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  RotateCw, 
  Copy, 
  Check, 
  Flame, 
  TrendingUp, 
  Cpu, 
  Share2, 
  Plus, 
  Star, 
  ArrowRight,
  Info,
  Layers,
  Zap,
  CheckCircle,
  Clock,
  MessageSquare,
  Sparkle,
  Library,
  Fingerprint,
  BarChart3
} from "lucide-react";
import GlowBackground from "./components/GlowBackground";
import GlassCard from "./components/GlassCard";
import FloatingNav from "./components/FloatingNav";
import ReviewLibrary, { DEMO_REVIEWS } from "./components/ReviewLibrary";
import BrandProfilePanel from "./components/BrandProfilePanel";
import { Review, MarketingPost, BrandProfile, SocialPlatform, Tone } from "./types";

const HOME_DEMOS = [
  {
    category: "💻 B2B SaaS / Fintech",
    metric: "Gain de temps +300%",
    author: "Sébastien Lambert",
    company: "CFO LedgerScale",
    rating: 5,
    source: "google",
    reviewText: "Ce logiciel a divisé par 4 le temps d'édition de nos rapports de trésorerie mensuels. On pensait que ce serait super compliqué à intégrer, mais on a mis 10 minutes ! Incroyable support client.",
    transformedPosts: {
      linkedin: "💡 Comment LedgerScale a divisé par 4 le temps d'édition de ses rapports mensuels de trésorerie en seulement 10 minutes d'intégration ?\n\nC'est la question que nous avons posée à Sébastien Lambert, CFO de la structure, et sa réponse est sans appel. À l'origine, l'équipe redoutait une migration longue et fastidieuse.\n\nRésultat ?\n👉 Service branché en 10 minutes chrono.\n👉 4x plus rapide pour éditer les comptes-rendus financiers.\n👉 Un support réactif à chaque seconde.\n\nChez Fintech Flow, nous pensons que l'excellence se cache dans la simplicité d'installation. Et vous, combien d'heures perdez-vous encore chaque mois sur vos bilans de trésorerie ? Let's automate ! 📈🔋",
      twitter: "🔥 Fini de perdre des heures sur vos bilans de trésorerie !\n\nSébastien Lambert, CFO de LedgerScale, a branché notre solution en 10 minutes et divisé par 4 son temps d'édition ! ⚡\n\nPrêt à automatiser vos finances ? Notre support vous accompagne."
    }
  },
  {
    category: "📱 Application Mobile",
    metric: "Sommeil Amélioré • 4.8/5",
    author: "Nora Bellier",
    company: "Senior Consultant",
    rating: 4,
    source: "appstore",
    reviewText: "L'application de méditation m'aide trop à dormir le soir. Les séances de 5 min sont au top et s'adaptent super bien au milieu de ma journée chargée de cadre.",
    transformedPosts: {
      linkedin: "🧘‍♀️ Trouver un équilibre mental quand on est cadre supérieur avec un emploi du temps saturé ? C’est le défi qu'a relevé Nora Bellier.\n\nGrâce à nos sessions de micro-méditations adaptatives de 5 minutes, elle a pu réconcilier calme mental et productivité tout au long de ses journées intenses.\n\nLe point fort ? Une nette amélioration du sommeil en fin de journée.\n\n🚀 Les petits rituels créent les grands impacts professionnels. Et vous, comment libérez-vous de la bande passante mentale aujourd'hui ?",
      twitter: "⏱️ Trop de réunions ? Pas le temps de respirer ? \n\nNora Bellier (Senior Consultant) utilise nos sessions de 5 min pour couper sa journée et retrouver un sommeil réparateur. \n\nParce que la santé mentale fait la performance ! 🧘‍♀️🚀"
    }
  },
  {
    category: "💼 Agence & Services B2B",
    metric: "SEO +60% • Leads +2.4x",
    author: "Pierre-Yves Martin",
    company: "Co-fondateur NeoBat",
    rating: 5,
    source: "g2",
    reviewText: "Equipe ultra pro et réactive ! Ils ont refait notre site web en moins d'un mois en améliorant notre SEO de 60%. Nos leads ont direct grimpé, merci l'équipe.",
    transformedPosts: {
      linkedin: "🔥 +60% d'amélioration SEO et un pipeline de leads en hausse immédiate, le tout livré en moins de 30 jours !\n\nC’est l'impact direct du nouveau site web conçu par nos équipes pour NeoBat. Pierre-Yves partage son retour : réactivité irréprochable et expertise de haut niveau pour accélérer sa croissance.\n\n🎯 Prêt à transformer votre présence en ligne en une machine à générer des opportunités qualifiées ? Contactez-nous.",
      twitter: "📈 Refonte totale en 30 jours, SEO de NeoBat augmenté de 60% et leads qualifiés en hausse immédiate. \n\nMerci à Pierre-Yves pour ce retour ! Nos développeurs et experts SEO ne dorment jamais pour propulser votre croissance. Contactez-nous ! 💻⚡"
    }
  },
  {
    category: "🛍️ E-Commerce & Produit",
    metric: "Rétention Exceptionnelle",
    author: "Amandine Roussel",
    company: "Acheteuse vérifiée",
    rating: 5,
    source: "trustpilot",
    reviewText: "Les colis arrivent toujours hyper rapidement avec le petit mot sympa de l'équipe. Les matières des pulls sont ultra douces pour l'hiver et super durables !",
    transformedPosts: {
      linkedin: "📦 L'expérience d'achat ne s'arrête pas au clic de commande. Elle commence à l'ouverture du colis.\n\nAmandine Roussel, cliente fidèle depuis 2 ans, adore l'attention portée aux petits détails (comme notre petit mot personnalisé manuscrit) et la douceur durable de nos pulls d'hiver recyclés.\n\n🌱 Allier confort premium, rapidité logistique absolue et éco-responsabilité, c'est notre engagement quotidien. Prêt à tester la différence ?",
      twitter: "📦 Rapidité d'expédition, mot manuscrit chaleureux et matières éco-conçues d'une douceur absolue pour l'hiver.\n\nC'est la promesse tenue qui fidélise Amandine depuis 2 ans ! ✨\n\nDécouvrez nos pulls d'hiver recyclés et durables. 🌱👇"
    }
  }
];

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedHomeDemoIdx, setSelectedHomeDemoIdx] = useState<number>(0);
  const [homeDemoPlatform, setHomeDemoPlatform] = useState<"linkedin" | "twitter">("linkedin");
  const [demoCopied, setDemoCopied] = useState<boolean>(false);

  const handleCopyDemo = (text: string) => {
    navigator.clipboard.writeText(text);
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2000);
  };

  // State Management
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<Review>(DEMO_REVIEWS[0]);
  const [customReviewText, setCustomReviewText] = useState<string>(DEMO_REVIEWS[0].text);
  const [customAuthor, setCustomAuthor] = useState<string>(DEMO_REVIEWS[0].author);
  const [customCompany, setCustomCompany] = useState<string>(DEMO_REVIEWS[0].company || "");
  const [customRating, setCustomRating] = useState<number>(DEMO_REVIEWS[0].rating);
  const [customSource, setCustomSource] = useState<'google' | 'trustpilot' | 'g2' | 'appstore' | 'custom'>('google');

  // Generation options
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(["linkedin", "twitter"]);
  const [selectedTone, setSelectedTone] = useState<Tone>("professional");
  const [brandProfile, setBrandProfile] = useState<BrandProfile>({
    name: "Aura Creative",
    industry: "Marketing & Design B2B",
    audience: "Startups, CEOs, Content Directors",
    tonePreferences: "Focus on rapid ROI, 10x speed, design clarity, and modern automation loops. Avoid cheesy startup jargon.",
    emojiUsage: "moderate"
  });

  // Generated posts state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPosts, setGeneratedPosts] = useState<MarketingPost[]>([
    {
      id: "p-1",
      platform: "linkedin",
      content: "🚀 Le temps de gestion administrative est un goulet d'étranglement universel pour les agences de design.\n\nSophie Laurent de Aura Design Agency a réduit ce délai de moitié en moins de 48 heures grâce à notre automatisation fluide. 🔥\n\nPrêt à surcharger votre bande passante créative et à livrer 2x plus vite ? Rejoignez l'ère Strimy. Lien de l'accès anticipé en commentaires-ci dessous ! 🎯👇",
      score: { hook: 94, viral: 88, clarity: 96 },
      metrics: { views: "1.4k - 2.8k", engagement: "6.4% - 8.2%" },
      hashtags: ["DesignAgency", "Productivity", "Strimyv2", "SaaS"]
    },
    {
      id: "p-2",
      platform: "twitter",
      content: "🔥 Gain de temps instantané : Sophie Laurent (Aura Design) a divisé par 2 sa gestion administrative avec Strimy.\n\nFini la complexité, place à l'impact en un clic. 🚀 #DesignSaaS #PerformanceMarketing",
      score: { hook: 91, viral: 83, clarity: 95 },
      metrics: { views: "3.2k - 5.5k", engagement: "5.1% - 7.6%" },
      hashtags: ["Strimy", "StartupROI"]
    }
  ]);

  // Fallback status & telemetry
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const [tokensRemaining, setTokensRemaining] = useState<number>(14292);
  const [activePlatformPreview, setActivePlatformPreview] = useState<SocialPlatform>("linkedin");
  const [refineInstruction, setRefineInstruction] = useState<string>("");
  const [isRefining, setIsRefining] = useState<boolean>(false);

  // Success copy states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  // New review creator inputs
  const [newAuthor, setNewAuthor] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newSource, setNewSource] = useState<'google' | 'trustpilot' | 'g2' | 'appstore' | 'custom'>('custom');
  const [libSuccessMsg, setLibSuccessMsg] = useState(false);

  // Triggers whenever a review selection happens
  const loadReviewToStudio = (review: Review) => {
    setSelectedReview(review);
    setCustomReviewText(review.text);
    setCustomAuthor(review.author);
    setCustomCompany(review.company || "");
    setCustomRating(review.rating);
    setActiveTab("transform");
  };

  // Trigger Transformation via Server API
  const handleTransform = async () => {
    setIsLoading(true);
    setUsingFallback(false);

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: customReviewText,
          tone: selectedTone,
          author: customAuthor,
          company: customCompany,
          platforms: selectedPlatforms,
          brandProfile: brandProfile
        })
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      if (data.posts && data.posts.length > 0) {
        setGeneratedPosts(data.posts.map((p: any, idx: number) => ({
          id: `p-gen-${idx}-${Date.now()}`,
          ...p
        })));
        if (data.posts.some((p: any) => p.platform === activePlatformPreview)) {
          // Keep preview matching an actual returned platform
        } else {
          setActivePlatformPreview(data.posts[0].platform);
        }
        setTokensRemaining(prev => Math.max(0, prev - Math.floor(Math.random() * 85) - 35));
      }

      if (data.usingFallback) {
        setUsingFallback(true);
      }
    } catch (err) {
      console.error("Transformation error", err);
      setUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Refine / Edit Post via Server API instruction
  const handleRefinePost = async (postToRefine: MarketingPost) => {
    if (!refineInstruction.trim()) return;
    setIsRefining(true);

    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentContent: postToRefine.content,
          instruction: refineInstruction,
          platform: postToRefine.platform
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Update the content in place
        setGeneratedPosts(prev => prev.map(p => {
          if (p.platform === postToRefine.platform) {
            return {
              ...p,
              content: data.refined,
              score: {
                hook: Math.min(100, Math.max(60, p.score.hook + Math.floor(Math.random() * 5) - 2)),
                viral: Math.min(100, Math.max(60, p.score.viral + Math.floor(Math.random() * 8) - 3)),
                clarity: Math.min(100, Math.max(70, p.score.clarity + Math.floor(Math.random() * 4) - 1))
              }
            };
          }
          return p;
        }));
        setRefineInstruction("");
      }
    } catch (err) {
      console.error("Refining error", err);
    } finally {
      setIsRefining(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const publishSimulated = (id: string) => {
    setPublishedId(id);
    setTimeout(() => setPublishedId(null), 3000);
  };

  // Save a custom review to local memory
  const handleAddNewReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !newAuthor.trim()) return;

    const newlyCreated: Review = {
      id: `custom-rev-${Date.now()}`,
      author: newAuthor,
      company: newCompany || "Startup Partenaire",
      text: newText,
      rating: newRating,
      date: "À l'instant",
      source: newSource
    };

    setReviews([newlyCreated, ...reviews]);
    setNewAuthor("");
    setNewCompany("");
    setNewText("");
    setLibSuccessMsg(true);
    setTimeout(() => setLibSuccessMsg(false), 3000);
  };

  // Toggle platform helper
  const togglePlatform = (plat: SocialPlatform) => {
    if (selectedPlatforms.includes(plat)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== plat));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, plat]);
    }
  };

  // Pre-fill active review content when typing manually
  const triggerManualUpdate = (val: string) => {
    setCustomReviewText(val);
    setSelectedReview({
      ...selectedReview,
      id: "manual-review-custom",
      text: val
    });
  };

  // Currently viewed generated post in preview
  const currentPostInPreview = generatedPosts.find(p => p.platform === activePlatformPreview) || generatedPosts[0];

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans select-none selection:bg-violet-500/30 overflow-x-hidden md:h-screen">
      {/* 3D Glassmorphism Blurry Space Background */}
      <GlowBackground />

      {/* Decorative Rotating Grid Orbs */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-650/15 rounded-full blur-[130px] filter" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[150px] filter" />
      <div className="pointer-events-none absolute top-[25%] right-[5%] w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[110px] filter" />

      {/* Header Container */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-6 pb-2 shrink-0 gap-4">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 via-purple-600 to-amber-500 p-[1.5px] shadow-[0_4px_20px_rgba(139,92,246,0.25)]"
          >
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-450 font-sans">
                Strimy
              </h1>
              <span className="text-[10px] font-mono font-semibold tracking-widest text-violet-400 bg-violet-400/10 px-2.5 py-0.5 rounded-full border border-violet-400/20 uppercase">
                v2.4 Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Intelligence artificielle pour le marketing organique : Avis clients ➔ Posts viraux.
            </p>
          </div>
        </div>

        {/* Dynamic Tokens Counter and Recharge Block in Frosted Box */}
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-right">
            <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono">Tokens d'automatisation</span>
            <span className="text-lg font-mono font-extrabold text-violet-400 tracking-wider">
              {tokensRemaining.toLocaleString()}
            </span>
          </div>
          <button 
            onClick={() => setTokensRemaining(prev => prev + 5000)}
            className="bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-[11px] font-medium px-4 py-2.5 rounded-xl transition-all shadow-md shadow-violet-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" /> + Recharge 
          </button>
        </div>
      </header>

      {/* Main Structure with Non-Classic Lateral Layout */}
      <div className="flex-1 flex flex-col md:flex-row p-4 md:p-6 overflow-hidden gap-6 h-[calc(100vh-130px)]">
        
        {/* Left Side: Navigation Menu Dock */}
        <div className="shrink-0 md:w-56 flex flex-col gap-4">
          <FloatingNav 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            usingFallback={usingFallback} 
          />
        </div>

        {/* Right Side: Active Workspace Card View */}
        <div className="flex-1 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-w-5xl mx-auto py-2 px-1"
                id="home-welcome-root"
              >
                {/* Hero Greeting Card */}
                <GlassCard hoverEffect={false} className="p-8 text-center relative overflow-hidden bg-gradient-to-tr from-violet-950/20 via-slate-950/45 to-amber-950/15 border border-white/10 rounded-3xl">
                  {/* Decorative background lights */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase">
                      <Sparkle className="w-3 h-3 fill-amber-400 animate-pulse" /> Simplifiez votre communication organique
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Donnez une seconde vie à vos <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-amber-300">avis clients</span>
                    </h2>
                    <p className="text-slate-350 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
                      Arrêtez d'écrire des posts marketing fatigants à partir de rien. Strimy extrait la substance de vos témoignages et les restructure instantanément en copywriting mémorable pour LinkedIn et X (Twitter).
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          const firstDemo = HOME_DEMOS[0];
                          setCustomReviewText(firstDemo.reviewText);
                          setCustomAuthor(firstDemo.author);
                          setCustomCompany(firstDemo.company);
                          setCustomRating(firstDemo.rating);
                          setCustomSource(firstDemo.source as any);
                          setActiveTab("transform");
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-violet-600 to-amber-500 hover:opacity-90 active:scale-98 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-white" /> Créer un Post dans le Studio
                      </button>
                      <button
                        onClick={() => setActiveTab("library")}
                        className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 active:scale-98 text-slate-300 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Library className="w-4 h-4 text-violet-400" /> Vos avis clients
                      </button>
                    </div>
                  </div>
                </GlassCard>

                {/* Interactive Demo Section */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider block font-mono">
                        ⚡ Démo Interactive
                      </h3>
                      <p className="text-xs text-slate-400">Cliquez sur une industrie ci-dessous pour voir la transformation d'un avis brut en post copywrité :</p>
                    </div>
                    {/* Platform toggle for interactive view */}
                    <div className="flex bg-slate-950/40 p-1 border border-white/5 rounded-xl self-start md:self-center">
                      {(["linkedin", "twitter"] as const).map((plat) => (
                        <button
                          key={plat}
                          onClick={() => setHomeDemoPlatform(plat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all capitalize cursor-pointer ${
                            homeDemoPlatform === plat
                              ? "bg-violet-600 text-white shadow"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {plat === "twitter" ? "X / Twitter" : "LinkedIn"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Industry presets list tabs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {HOME_DEMOS.map((demo, idx) => {
                      const isSelected = selectedHomeDemoIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedHomeDemoIdx(idx)}
                          className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between h-24 cursor-pointer ${
                            isSelected
                              ? "bg-violet-950/30 border-violet-500 shadow-[0_4px_20px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/20"
                              : "bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-950/60"
                          }`}
                        >
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-mono tracking-wider block">Catégorie</span>
                            <span className="text-xs font-bold text-slate-100 block mt-0.5 line-clamp-1">{demo.category}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-amber-500 font-semibold">{demo.metric}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Before ➔ After Interactive Split View */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch font-sans">
                    {/* LEFT COL: RAW CUSTOMER FEEDBACK */}
                    <GlassCard hoverEffect={false} className="p-6 bg-slate-950/40 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">📥 Témoignage client brut reçu</span>
                          <span className="text-[10px] font-mono font-bold uppercase text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            ★ {HOME_DEMOS[selectedHomeDemoIdx].rating}.0 / 5
                          </span>
                        </div>

                        {/* Speech Bubble representation */}
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 relative">
                          <p className="text-xs italic text-slate-350 leading-relaxed font-sans">
                            "{HOME_DEMOS[selectedHomeDemoIdx].reviewText}"
                          </p>
                        </div>
                      </div>

                      {/* Author credentials */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-bold text-xs font-mono text-slate-300">
                          {HOME_DEMOS[selectedHomeDemoIdx].author.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200">{HOME_DEMOS[selectedHomeDemoIdx].author}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{HOME_DEMOS[selectedHomeDemoIdx].company}</div>
                        </div>
                      </div>
                    </GlassCard>

                    {/* RIGHT COL: TRANSFORME / OPTIMIZED POST PREVIEW */}
                    <GlassCard hoverEffect={false} className="p-6 bg-slate-950/45 border border-white/10 rounded-2xl flex flex-col justify-between space-y-4 relative">
                      {/* Live Glowing Badge */}
                      <div className="absolute -top-2.5 -right-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white font-mono uppercase text-[8px] font-bold px-2 py-1 rounded-md shadow-md tracking-wider">
                        ✨ Optimisé par Strimy
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">📤 Version Copywriting Strimy</span>
                          <span className="text-[9px] font-mono font-medium text-violet-400 capitalize">
                            Canal: {homeDemoPlatform === "twitter" ? "X / Twitter" : "LinkedIn"}
                          </span>
                        </div>

                        {/* Interactive Social Media Container */}
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 font-sans leading-relaxed text-slate-200 text-xs whitespace-pre-wrap max-h-[160px] overflow-y-auto">
                          {HOME_DEMOS[selectedHomeDemoIdx].transformedPosts[homeDemoPlatform]}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-2 shrink-0">
                        <button
                          onClick={() => handleCopyDemo(HOME_DEMOS[selectedHomeDemoIdx].transformedPosts[homeDemoPlatform])}
                          className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded-xl font-bold transition-all text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {demoCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-500" /> Copié !
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" /> Copier le post
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => {
                            const currentDemo = HOME_DEMOS[selectedHomeDemoIdx];
                            setCustomReviewText(currentDemo.reviewText);
                            setCustomAuthor(currentDemo.author);
                            setCustomCompany(currentDemo.company);
                            setCustomRating(currentDemo.rating);
                            setCustomSource(currentDemo.source as any);
                            setGeneratedPosts([
                              {
                                id: "p-home-demo-1",
                                platform: "linkedin",
                                content: currentDemo.transformedPosts.linkedin,
                                score: { hook: 96, viral: 91, clarity: 98 },
                                hashtags: ["automation", currentDemo.author.split(' ')[0], "Strimy"]
                              },
                              {
                                id: "p-home-demo-2",
                                platform: "twitter",
                                content: currentDemo.transformedPosts.twitter,
                                score: { hook: 93, viral: 89, clarity: 96 },
                                hashtags: ["productivity", "SaaS"]
                              }
                            ]);
                            setActivePlatformPreview(homeDemoPlatform as any);
                            setActiveTab("transform");
                          }}
                          className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-mono text-[11px] font-bold py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                        >
                          🛠️ Modifier dans le Studio
                        </button>
                      </div>
                    </GlassCard>
                  </div>
                </div>

                {/* 3 Bento-Grid Information Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-sans">
                  {[
                    {
                      title: "📥 Centralisez la Voix Client",
                      desc: "L'onglet 'Feedback Library' est votre coffre-fort d'avis. Stockez-y manuellement vos retours ou tirez parti des modèles pré-remplis pour alimenter votre réservoir créatif.",
                      icon: Library,
                      tab: "library"
                    },
                    {
                      title: "🎯 Calibrez l'Identité de Marque",
                      desc: "Dans l'onglet 'Brand Identity', saisissez la voix unique de votre marque B2B ou produit. Strimy respectera scrupuleusement ces règles de ton à chaque génération.",
                      icon: Fingerprint,
                      tab: "brand"
                    },
                    {
                      title: "📈 Analysez la Performance",
                      desc: "Consultez l'onglet 'Impact Hub' pour évaluer la portée potentielle et le taux de clic estimé de vos posts grâce aux scores prédictifs de notre IA.",
                      icon: BarChart3,
                      tab: "performance"
                    }
                  ].map((pillar, index) => {
                    const PillowIcon = pillar.icon;
                    return (
                      <GlassCard
                        key={index}
                        hoverEffect={true}
                        onClick={() => setActiveTab(pillar.tab)}
                        className="p-5 flex flex-col justify-between space-y-3 cursor-pointer group hover:border-violet-500/30 transition-all text-left"
                      >
                        <div className="space-y-2">
                          <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 group-hover:bg-violet-500/25 transition-all">
                            <PillowIcon className="w-4.5 h-4.5 text-violet-400" />
                          </div>
                          <h4 className="text-xs font-bold text-slate-100 font-sans group-hover:text-amber-400 transition-colors uppercase tracking-wide">
                            {pillar.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            {pillar.desc}
                          </p>
                        </div>
                        <div className="pt-2 text-[9px] font-mono text-violet-400 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                          Ouvrir l'onglet <ArrowRight className="w-3" />
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "transform" && (
              <motion.div
                key="transform"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch"
                id="transform-workspace-root"
              >
                
                {/* Inputs & Parameters Panel */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
                  <GlassCard hoverEffect={false} className="flex flex-col gap-5 flex-1 p-6 relative">
                    <div className="absolute top-4 right-4 text-[42px] font-extrabold italic select-none text-white/[0.03] font-mono pointer-events-none">
                      01
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider block font-mono">
                        Avis Source Actif
                      </h3>
                      <p className="text-[11px] text-slate-400">Modifiez ou choisissez une autre source client.</p>
                    </div>

                    {/* Creator / Selected review card details */}
                    <div className="space-y-4">
                      {/* Interactive text area containing review details */}
                      <div className="relative group">
                        <textarea
                          id="review-input"
                          rows={4}
                          value={customReviewText}
                          onChange={(e) => triggerManualUpdate(e.target.value)}
                          className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-400/55 focus:ring-1 focus:ring-violet-500/20 transition-all leading-relaxed"
                          placeholder="Écrivez ou collez un avis client brut ou feedback de votre start-up ici..."
                        />
                        <div className="absolute right-3 bottom-3 flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          {[...Array(customRating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                      </div>

                      {/* Review attributes inline editor */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase">Auteur de l'avis</label>
                          <input
                            type="text"
                            value={customAuthor}
                            onChange={(e) => setCustomAuthor(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-400/40"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase">Société / Rôle</label>
                          <input
                            type="text"
                            value={customCompany}
                            onChange={(e) => setCustomCompany(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-violet-400/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Target Platforms selecting pill selectors (Non Traditional layout) */}
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Canaux de Diffusion Visés
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {(["linkedin", "twitter", "instagram", "threads"] as SocialPlatform[]).map((p) => {
                          const isActive = selectedPlatforms.includes(p);
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => togglePlatform(p)}
                              className={`py-2 rounded-xl text-[10px] font-semibold tracking-wider font-mono capitalize transition-all border cursor-pointer ${
                                isActive 
                                  ? "bg-violet-500/10 border-violet-450/80 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.15)]" 
                                  : "bg-slate-950/20 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
                              }`}
                            >
                              {p === "twitter" ? "X / Twitter" : p}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Copywriting Tone grid options list */}
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        Identité Tonale
                      </span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(["hype", "professional", "analytical", "punchy", "story"] as Tone[]).map((t) => {
                          const isSel = selectedTone === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTone(t)}
                              className={`py-2.5 rounded-lg text-[9px] font-mono font-medium capitalize tracking-tighter transition-all border cursor-pointer ${
                                isSel
                                  ? "bg-amber-500/10 border-amber-400 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
                                  : "bg-slate-950/15 border-white/5 text-slate-500 hover:text-slate-300"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Brand constraints override warning */}
                    <div className="bg-violet-500/5 border border-violet-500/15 p-3 rounded-2xl flex items-start gap-2 text-[10px] leading-relaxed text-violet-400/80">
                      <Cpu className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-violet-350 mb-0.5 uppercase tracking-wide">
                          Guidage de Marque Strimy Actif
                        </span>
                        Génération calibrée sur <span className="text-white font-medium">{brandProfile.name}</span> ({brandProfile.industry}) portant sur {brandProfile.emojiUsage === 'heavy' ? 'un usage d\'émojis important' : 'un style rédactionnel modéré'}.
                      </div>
                    </div>

                    {/* Transform Engine Sparkle Call-to-action */}
                    <button
                      onClick={handleTransform}
                      disabled={isLoading}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-violet-600 to-amber-500 active:scale-[0.99] disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-violet-600/25 text-xs font-mono uppercase tracking-wider mt-2 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
                      <span className="flex items-center justify-center gap-2">
                        {isLoading ? (
                           <>
                            <RotateCw className="w-4 h-4 animate-spin text-white" />
                            Génération en cours...
                          </>
                        ) : (
                          <>
                            <Sparkle className="w-4 h-4 fill-white" />
                            Générer les posts avec Strimy v2.4
                          </>
                        )}
                      </span>
                    </button>
                  </GlassCard>
                </div>

                 {/* Main Results / Interactive Playground Frame (Glass Card) */}
                <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
                  <GlassCard hoverEffect={false} className="flex-1 p-8 bg-slate-950/45 backdrop-blur-[24px] border border-white/10 rounded-[32px] flex flex-col relative">
                    
                    {/* Tiny visual elegant design widget */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-violet-500/10 backdrop-blur-xl border border-violet-500/20 rounded-2xl flex items-center justify-center rotate-12 z-20">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>

                    {/* Platform Selector Tabs */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 shrink-0">
                      <div className="flex bg-slate-950/30 p-1 border border-white/5 rounded-2xl">
                        {selectedPlatforms.map((plat) => {
                          const isCur = activePlatformPreview === plat;
                          return (
                            <button
                              key={plat}
                              type="button"
                              onClick={() => setActivePlatformPreview(plat)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all capitalize cursor-pointer ${
                                isCur
                                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              {plat === "twitter" ? "X / Twitter" : plat}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
                      </div>
                    </div>

                    {/* Generated Post Frame Sandbox */}
                    {isLoading ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
                        <div className="relative flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin" />
                          <Sparkles className="absolute w-5 h-5 text-amber-400 animate-pulse" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-mono text-xs text-slate-300 font-bold uppercase tracking-widest">
                            Inférence Neurologique
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Analyse de la consonance virale et recalibrage de la tonalité...
                          </p>
                        </div>
                      </div>
                    ) : currentPostInPreview ? (
                      <div className="flex-1 flex flex-col justify-between h-full">
                        
                        {/* Interactive Post Sandbox Content */}
                        <div className="space-y-6">
                          {/* Pseudo Platform Header decoration */}
                          <div className="flex items-center gap-3">
                            {/* Profile badge style */}
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-amber-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-violet-600/20">
                              {currentPostInPreview.platform.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-200">Strimy Marketing Lead</span>
                                <span className="w-3 h-3 rounded-full bg-violet-400 flex items-center justify-center text-[7px] text-slate-950 font-bold font-sans">✔</span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-mono">Généré il y a quelques secondes • Apprentissage Strimy</span>
                            </div>
                          </div>

                          {/* Editable Box Preview */}
                          <div className="relative bg-slate-950/45 p-6 rounded-2xl border border-white/5">
                            <textarea
                              rows={7}
                              value={currentPostInPreview.content}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                setGeneratedPosts(prev => prev.map(p => 
                                  p.platform === currentPostInPreview.platform ? { ...p, content: newVal } : p
                                ));
                              }}
                              className="w-full bg-transparent text-sm leading-relaxed text-slate-100 border-none resize-none focus:outline-none focus:ring-0 leading-relaxed font-sans"
                            />
                            
                            {/* Tags drawer */}
                            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                              {currentPostInPreview.hashtags?.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-[10px] bg-slate-900/80 hover:bg-slate-900 border border-white/5 px-2.5 py-1 rounded-lg text-slate-300 font-mono transition-all"
                                >
                                  #{tag.replace("#", "")}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Real-time Simulated Analytics Indicators */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                              <span className="text-[9px] text-slate-500 uppercase font-mono block">Qualité d'accroche (Hook)</span>
                              <div className="flex items-center justify-center gap-1.5 mt-1">
                                <span className="text-sm font-bold text-white font-mono">{currentPostInPreview.score.hook}%</span>
                                <span className="text-xs text-cyan-400">🔥</span>
                              </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                              <span className="text-[9px] text-slate-500 uppercase font-mono block">Virale Potentiel</span>
                              <div className="flex items-center justify-center gap-1.5 mt-1">
                                <span className="text-sm font-bold text-white font-mono">{currentPostInPreview.score.viral}%</span>
                                <span className="text-xs text-rose-400">📈</span>
                              </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                              <span className="text-[9px] text-slate-500 uppercase font-mono block">Clarté du message</span>
                              <div className="flex items-center justify-center gap-1.5 mt-1">
                                <span className="text-sm font-bold text-white font-mono">{currentPostInPreview.score.clarity}%</span>
                                <span className="text-xs text-indigo-400">🎯</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive prompt-based refinement box wrapper */}
                        <div className="mt-6 pt-6 border-t border-white/10 space-y-4 shrink-0">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={refineInstruction}
                              onChange={(e) => setRefineInstruction(e.target.value)}
                              placeholder="e.g. 'Rends-le plus percutant de 3 phrases', 'Ajoute des émojis de fusée', 'Optimise pour l'engagement'..."
                              className="flex-1 bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-550/20 transition-all font-sans"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleRefinePost(currentPostInPreview);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRefinePost(currentPostInPreview)}
                              disabled={isRefining || !refineInstruction.trim()}
                              className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-mono font-semibold px-4 py-3 rounded-xl border border-white/10 text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              {isRefining ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                              Acheminer
                            </button>
                          </div>

                          {/* Quick copy / publish command bar */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => copyToClipboard(currentPostInPreview.content, currentPostInPreview.id)}
                              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3.5 rounded-xl font-bold transition-all text-xs font-mono tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {copiedId === currentPostInPreview.id ? (
                                <>
                                  <Check className="w-4 h-4 text-amber-500" />
                                  Copié !
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 text-slate-400" />
                                  Copier le Post
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => publishSimulated(currentPostInPreview.id)}
                              className="flex-1 bg-violet-600 text-white hover:bg-violet-500 active:scale-98 py-3.5 rounded-xl font-bold shadow-lg shadow-violet-600/25 transition-all text-xs font-mono tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {publishedId === currentPostInPreview.id ? (
                                <>
                                  <CheckCircle className="w-4 h-4 text-amber-300 animate-bounce" />
                                  Publié avec succès !
                                </>
                              ) : (
                                <>
                                  <Share2 className="w-4 h-4" />
                                  Planifier ou Publier
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-16">
                        <Layers className="w-12 h-12 text-slate-700 stroke-1 mb-3" />
                        <h4 className="text-sm font-semibold text-slate-400">Aucun Post Planifié</h4>
                        <p className="text-xs max-w-sm mt-1 leading-normal">
                          Sélectionnez au moins un canal dans la colonne de gauche puis cliquez sur Générer pour créer du contenu.
                        </p>
                      </div>
                    )}
                  </GlassCard>
                </div>

              </motion.div>
            )}

            {/* Custom Review Library Tab */}
            {activeTab === "library" && (
              <motion.div
                key="library"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                
                {/* Embedded Review Library with onSelect callback */}
                <div className="lg:col-span-7">
                  <ReviewLibrary 
                    onSelectReview={loadReviewToStudio} 
                    selectedReviewId={selectedReview?.id} 
                  />
                </div>

                {/* Left Form: Manual testimonial collector */}
                <div className="lg:col-span-5">
                  <GlassCard hoverEffect={false} className="w-full relative">
                    <div className="absolute top-4 right-4 text-[42px] font-extrabold italic select-none text-white/[0.03] font-mono pointer-events-none">
                      NEW
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-indigo-400" />
                      Capturer un Feedback Manuel
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      Saisissez directement une recommandation client ou un avis reçu par mail pour enrichir votre bibliothèque Strimy.
                    </p>

                    {libSuccessMsg && (
                      <div className="p-3 mb-5 text-xs text-amber-400 bg-amber-500/10 border border-amber-400/20 rounded-xl flex items-center gap-2 animate-fade-in">
                        <CheckCircle className="w-4 h-4 shrink-0" /> Avis ajouté avec succès à la bibliothèque !
                      </div>
                    )}

                    <form onSubmit={handleAddNewReview} className="space-y-4">
                      
                      {/* Name of business feedback partner */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Auteur</label>
                          <input
                            type="text"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            required
                            className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-400"
                            placeholder="e.g. Sacha Dubois"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Entreprise</label>
                          <input
                            type="text"
                            value={newCompany}
                            onChange={(e) => setNewCompany(e.target.value)}
                            className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-400"
                            placeholder="e.g. FinTech Flow"
                          />
                        </div>
                      </div>

                      {/* Score of star rating and platform channel */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Note Sélectionnée</label>
                          <select
                            value={newRating}
                            onChange={(e) => setNewRating(parseInt(e.target.value))}
                            className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-violet-400 font-mono"
                          >
                            <option value={5}>★★★★★ (5/5)</option>
                            <option value={4}>★★★★☆ (4/5)</option>
                            <option value={3}>★★★☆☆ (3/5)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Provenances</label>
                          <select
                            value={newSource}
                            onChange={(e) => setNewSource(e.target.value as any)}
                            className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-violet-400 font-mono"
                          >
                            <option value="google">Google Maps</option>
                            <option value="trustpilot">Trustpilot</option>
                            <option value="g2">G2 Crowd</option>
                            <option value="appstore">App Store</option>
                            <option value="custom">Format Libre (E-mail/Notion)</option>
                          </select>
                        </div>
                      </div>

                      {/* Real Text area text string */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Texte Brut du Témoignage</label>
                        <textarea
                          rows={4}
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          required
                          className="w-full bg-slate-950/40 border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-400 leading-relaxed"
                          placeholder="e.g. 'Ce produit a révolutionné notre acquisition client B2B en automatisant l'extraction de formulaires direct...'"
                        />
                      </div>

                      {/* Submit form */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-amber-500 text-white font-mono uppercase tracking-widest text-[10px] font-bold rounded-xl shadow-lg shadow-violet-650/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                      >
                        Enregistrer Avis Client
                      </button>
                    </form>
                  </GlassCard>
                </div>

              </motion.div>
            )}

            {/* Performance Hub / Impact metrics with Glowing custom styled SVG charts (No complex framework needed) */}
            {activeTab === "performance" && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Scorecards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Impression Est. Heures", value: "32.4K", icon: TrendingUp, color: "text-violet-400", change: "+14%" },
                    { label: "Taux de Clic Moyen", value: "8.4%", icon: Flame, color: "text-amber-400", change: "+3.2%" },
                    { label: "Gain Rentabilité Temps", value: "32 heures", icon: Clock, color: "text-violet-400", change: "Mensuel" },
                    { label: "Articles Générés", value: "114 posts", icon: Layers, color: "text-amber-400", change: "+24" }
                  ].map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <GlassCard key={idx} hoverEffect={true} delay={idx * 0.05} className="!p-5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{card.label}</span>
                          <CardIcon className={`w-4 h-4 ${card.color}`} />
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xl font-bold font-mono tracking-wide">{card.value}</span>
                          <span className="text-[10px] font-mono font-medium text-amber-500">{card.change}</span>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>

                {/* Main analytical chart workspace with bespoke custom animated SVG metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <GlassCard hoverEffect={false} className="lg:col-span-8 p-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider block font-mono">
                        Évolution ROI & Portée Strimy
                      </h3>
                      <p className="text-[11px] text-slate-400">Progression mesurée sur vos publications LinkedIn, Twitter et Threads.</p>
                    </div>

                    {/* Custom aesthetic SVG line graph representing dynamic statistics */}
                    <div className="w-full h-64 relative bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-center p-4">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 pointer-events-none opacity-20">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="border-t border-r border-dashed border-white/10" />
                        ))}
                      </div>

                      {/* Traced SVG Coordinates */}
                      <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.25)]">
                        {/* Area Gradient Fill */}
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area */}
                        <path
                          d="M  0,150 Q  75,100  150,110 T  300,60 T  450,40 L 500,45 L 500,200 L 0,200 Z"
                          fill="url(#chartGradient)"
                          className="transition-all duration-1000"
                        />
                        
                        {/* Spline Path */}
                        <path
                          d="M 0,150 Q 75,100 150,110 T 300,60 T 450,40 L 500,45"
                          fill="none"
                          stroke="url(#lineGradient)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        
                        {/* Interactive dots overlay */}
                        <circle cx="150" cy="110" r="5" fill="#d946ef" className="animate-pulse" />
                        <circle cx="300" cy="60" r="5" fill="#8b5cf6" className="animate-pulse" />
                        <circle cx="450" cy="40" r="5" fill="#f59e0b" className="animate-pulse" />

                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="50%" stopColor="#d946ef" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </svg>

                      {/* Overlay label cards */}
                      <div className="absolute top-8 left-36 bg-slate-900/90 border border-white/10 rounded-lg px-2.5 py-1 text-[9px] font-mono leading-normal shadow-lg z-10 text-left">
                        <span className="text-slate-500 block">Lancement v2.2</span>
                        <span className="text-violet-405 text-violet-400 font-bold">+18k Impressions</span>
                      </div>
                      <div className="absolute top-24 right-16 bg-slate-900/90 border border-white/10 rounded-lg px-2.5 py-1 text-[9px] font-mono leading-normal shadow-lg z-10 text-left">
                        <span className="text-slate-500 block">Dernière batch</span>
                        <span className="text-amber-500 font-bold">Conversions directes</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-semi-bold font-mono text-slate-500 mt-1 border-t border-white/5 pt-3">
                      <span>Janvier</span>
                      <span>Février</span>
                      <span>Mars (Migration Strimy)</span>
                      <span>Avril</span>
                      <span>Courant Mai</span>
                    </div>
                  </GlassCard>

                  {/* Scheduled Automation Queue preview */}
                  <GlassCard hoverEffect={false} className="lg:col-span-4 p-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider block font-mono">
                        Pipeline Automatisation
                      </h3>
                      <p className="text-[11px] text-slate-400">Publications enregistrées en attente de diffusion.</p>
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[240px] pr-1">
                      {[
                        { title: "S. Laurent - Portrait d'efficience Aura Design", platform: "linkedin", time: "Planifié: Aujourd'hui à 18h" },
                        { title: "M. Dubreuil - Témoignage support client", platform: "twitter", time: "Planifié: Demain à 10h" },
                        { title: "Elena - Avis App Store minimalisme", platform: "linkedin", time: "Planifié: Vendredi à 14h" }
                      ].map((item, id) => (
                        <div key={id} className="p-3 bg-slate-950/45 border border-white/5 rounded-xl flex items-start gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-violet-500 mt-1.5" />
                          <div>
                            <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-mono font-bold uppercase text-violet-400">{item.platform}</span>
                              <span className="text-[10px] font-mono text-slate-500">{item.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setActiveTab("transform")}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-[10px] font-semibold tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      + Programmer à partir du Studio
                    </button>
                  </GlassCard>

                </div>
              </motion.div>
            )}

            {/* Brand Settings Overrides */}
            {activeTab === "brand" && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BrandProfilePanel 
                  profile={brandProfile} 
                  onUpdate={(p) => setBrandProfile(p)} 
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Modern Status Footer */}
      <footer className="h-16 px-6 md:px-12 bg-slate-950/50 backdrop-blur-md border-t border-t-white/5 flex flex-col md:flex-row items-center justify-between shrink-0 gap-2 py-4 md:py-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.75)]" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              STRIMY AI CORE: OPERATIONAL
            </span>
          </div>
          <div className="hidden md:block h-4 w-px bg-white/10" />
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest hidden md:inline">
            File d'attente: <span className="text-white">Active</span>
          </span>
        </div>

        <div className="flex gap-6 text-[10px] font-mono text-slate-500">
          <span className="hover:text-violet-400 cursor-pointer transition-colors font-semibold">Documentation API</span>
          <span className="hover:text-violet-400 cursor-pointer transition-colors font-semibold">Privacy</span>
          <span>© 2026 STRIMY INC.</span>
        </div>
      </footer>
    </div>
  );
}
