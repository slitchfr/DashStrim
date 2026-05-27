import { motion } from "motion/react";
import { Home, Sparkles, BarChart3, Fingerprint, Library } from "lucide-react";
import GlassCard from "./GlassCard";

interface FloatingNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  usingFallback: boolean;
}

export default function FloatingNav({ activeTab, setActiveTab, usingFallback }: FloatingNavProps) {
  const tabs = [
    { id: "home", label: "Accueil & Démo", icon: Home, color: "from-amber-400 to-violet-500" },
    { id: "transform", label: "Studio Strimy", icon: Sparkles, color: "from-violet-500 to-amber-500" },
    { id: "library", label: "Feedback Library", icon: Library, color: "from-violet-500 to-purple-600" },
    { id: "performance", label: "Impact Hub", icon: BarChart3, color: "from-amber-450 to-orange-500" },
    { id: "brand", label: "Brand Identity", icon: Fingerprint, color: "from-violet-600 to-orange-400" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Non-traditional Floating Menu Dock */}
      <div 
        id="strimy-floating-dock" 
        className="flex md:flex-col items-center justify-between gap-1 rounded-[30px] border border-white/10 bg-slate-950/45 p-2 backdrop-blur-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Startup Branding */}
        <div className="hidden md:flex flex-col items-center justify-center py-4 px-2 select-none border-b border-white/5 mb-2">
          <motion.div 
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-violet-500 to-amber-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            <Sparkles className="w-5.5 h-5.5 text-white" />
            <div className="absolute inset-0 rounded-full bg-violet-400/20 animate-ping duration-[3s]" />
          </motion.div>
          <span className="mt-3 text-xs tracking-[0.25em] font-mono font-medium text-violet-400">STRIMY</span>
        </div>

        {/* Floating Pills Tab list */}
        <div className="flex md:flex-col w-full gap-2 font-display">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative group flex items-center justify-center md:justify-start gap-3 w-12 md:w-48 h-12 rounded-[20px] text-xs font-medium tracking-wide transition-all duration-300"
                id={`nav-${tab.id}`}
              >
                {/* Visual active tab selector bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockBubble"
                    className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/[0.08] to-white/[0.02] border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Animated colored bullet on hover/active */}
                <div className="relative flex items-center justify-center w-10 h-10 ml-1 rounded-[16px] transition-all duration-300 group-hover:scale-105">
                  {isActive ? (
                    <div className={`absolute inset-0 rounded-[14px] bg-gradient-to-tr ${tab.color} opacity-25 blur-[2px]`} />
                  ) : null}
                  <IconComponent 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-amber-400" : "text-slate-400 group-hover:text-slate-100"
                    }`} 
                  />
                </div>

                {/* Label */}
                <span 
                  className={`hidden md:inline font-sans text-xs transition-colors duration-300 ${
                    isActive ? "text-slate-100 font-semibold" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </span>

                {/* Left Active Glow bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeLeftIndicator"
                    className="absolute left-0 w-1 h-5 rounded-r bg-violet-500 hidden md:block"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded API Connection Info Indicator */}
      <GlassCard hoverEffect={false} className="hidden md:block !py-3 !px-4 max-w-[200px] text-center border-dashed border-slate-700">
        <div className="flex items-center gap-2 mb-1 justify-center">
          <div className={`w-2 h-2 rounded-full ${usingFallback ? "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"}`} />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            {usingFallback ? "MOCK ENGINE" : "GEMINI ACTIVE"}
          </span>
        </div>
        <p className="text-[9px] text-slate-500 leading-normal">
          {usingFallback 
            ? "Configurez GEMINI_API_KEY dans vos Secrets pour l'IA en temps réel." 
            : "Les posts sont générés à la volée par Gemini-3.5-Flash."
          }
        </p>
      </GlassCard>
    </div>
  );
}
