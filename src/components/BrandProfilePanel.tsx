import { useState, FormEvent } from "react";
import { Fingerprint, Check, HelpCircle, Save } from "lucide-react";
import GlassCard from "./GlassCard";
import { BrandProfile } from "../types";

interface BrandProfilePanelProps {
  profile: BrandProfile;
  onUpdate: (profile: BrandProfile) => void;
}

export default function BrandProfilePanel({ profile, onUpdate }: BrandProfilePanelProps) {
  const [localProfile, setLocalProfile] = useState<BrandProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(localProfile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleEmojiChange = (emoji: 'heavy' | 'moderate' | 'none') => {
    setLocalProfile({ ...localProfile, emojiUsage: emoji });
  };

  return (
    <GlassCard hoverEffect={false} className="w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-violet-500/20 to-amber-500/10 border border-violet-500/30">
            <Fingerprint className="w-5.5 h-5.5 text-violet-450 text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-sans font-semibold text-white">Profil de Marque Strimy</h2>
            <p className="text-xs text-slate-400 mt-1">
              Configurez l'identité et les contraintes sémantiques de votre start-up.
            </p>
          </div>
        </div>

        {isSaved && (
          <span className="flex items-center gap-1.5 text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full animate-fade-in border border-amber-400/20">
            <Check className="w-3.5 h-3.5" /> Profil sauvegardé !
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom de la Marque */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wide">
              Nom de la Marque ou Produit
            </label>
            <input
              type="text"
              value={localProfile.name}
              onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-500/20 transition-all font-sans"
              placeholder="e.g. AcmeSaaS"
            />
          </div>

          {/* Secteur d'activité */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wide">
              Secteur d'Activité / Industry
            </label>
            <input
              type="text"
              value={localProfile.industry}
              onChange={(e) => setLocalProfile({ ...localProfile, industry: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-500/20 transition-all font-sans"
              placeholder="e.g. Solutions AI & Collaboration B2B"
            />
          </div>

          {/* Audience cible */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wide">
              Audience Cible / Personas
            </label>
            <input
              type="text"
              value={localProfile.audience}
              onChange={(e) => setLocalProfile({ ...localProfile, audience: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-500/20 transition-all font-sans"
              placeholder="e.g. CMOs, Content Managers, Fondateurs de Startups et Directeurs Marketing"
            />
          </div>

          {/* Préférences thématiques */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wide flex items-center gap-2">
              Consignes Particulières d'Impression (Style ou Contraintes)
              <span className="tooltip relative group cursor-pointer text-slate-500 hover:text-slate-300">
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 border border-white/10 text-[10px] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all font-sans leading-normal normal-case z-20">
                  Ces directives seront passées au modèle d'IA de Strimy pour guider les aspects spécifiques de vos publications.
                </span>
              </span>
            </label>
            <textarea
              rows={3}
              value={localProfile.tonePreferences}
              onChange={(e) => setLocalProfile({ ...localProfile, tonePreferences: e.target.value })}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-500/20 transition-all font-sans leading-relaxed"
              placeholder="e.g. Mettre toujours en valeur le ROI et le gain de temps. Éviter le jargon technique excessif. Toujours inclure un appel à l'action invitant à essayer notre démo gratuite."
            />
          </div>

          {/* Niveau d'usage d'émojis */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wide text-left">
              Utilisation d'Émojis par l'IA
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'none', label: "Sans Émoji", desc: "Uniquement du texte sobre." },
                { type: 'moderate', label: "Modéré", desc: "Idéal pour équilibrer l'accroche." },
                { type: 'heavy', label: "Intensif", desc: "Hype communicative, idéal pour LinkedIn." }
              ].map((emojiConf) => {
                const isActive = localProfile.emojiUsage === emojiConf.type;
                return (
                  <button
                    key={emojiConf.type}
                    type="button"
                    onClick={() => handleEmojiChange(emojiConf.type as any)}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-300 ${
                      isActive 
                        ? "border-violet-500/50 bg-violet-500/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                        : "border-white/5 bg-slate-900/30 text-slate-400 hover:border-white/10 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">{emojiConf.label}</span>
                    <span className="text-[10px] text-slate-500 mt-1">{emojiConf.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-amber-500 text-white hover:brightness-110 active:scale-98 transition-all px-6 py-3 rounded-xl font-medium text-xs font-mono uppercase tracking-wider shadow-lg shadow-violet-500/25"
          >
            <Save className="w-4 h-4" /> Sauvegarder les Paramètres
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
