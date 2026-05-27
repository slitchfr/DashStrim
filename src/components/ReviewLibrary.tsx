import { Star, MessageSquareCode, ArrowUpRight } from "lucide-react";
import { Review } from "../types";
import GlassCard from "./GlassCard";

// Mock reviews for diverse use-cases
export const DEMO_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Sophie Laurent",
    company: "Aura Design Agency",
    text: "Votre plateforme a littéralement divisé par deux notre temps de gestion administrative. L'interface fluide et la rapidité de chargement font que toute l'équipe l'a adoptée en moins de 48 heures. C'est l'outil indispensable de notre année !",
    rating: 5,
    date: "Il y a 2 jours",
    source: "trustpilot"
  },
  {
    id: "rev-2",
    author: "Marc Dubreuil",
    company: "Co-Fondateur de NeoSaaS",
    text: "Honnêtement sidéré par le support client. J'ai eu un bug d'intégration API à 22h, résolu en 15 minutes par une vraie personne qui comprenait le code. Le service a un vrai ROI pour nos opérations quotidiennes.",
    rating: 5,
    date: "Il y a 1 semaine",
    source: "g2"
  },
  {
    id: "rev-3",
    author: "Elena Rostova",
    company: "App Store Reviewer",
    text: "L'application mobile est une petite pépite de minimalisme. Pas de fioriture, des animations fluides de transition, et l'export direct vers Notion fonctionne instantanément. J'enlève juste une étoile pour le manque de widgets iPad.",
    rating: 4,
    date: "Il y a 3 jours",
    source: "appstore"
  },
  {
    id: "rev-4",
    author: "Lucas Moreau",
    company: "Café de Paris - Propriétaire",
    text: "On a configuré la livraison à emporter en moins d'une heure. Les clients adorent la clarté du menu et la possibilité de payer par Apple Pay sans créer de compte. Ça a sauvé notre chiffre d'affaires ce trimestre !",
    rating: 5,
    date: "Il y a 4 jours",
    source: "google"
  },
  {
    id: "rev-5",
    author: "Sarah Jenkins",
    company: "FitFlow Co",
    text: "Great experience with the dashboard layout, it feels super modern. A bit expensive for micro-startups, but the saved clicks and time make up for it if you scale. Highly recommended for digital products.",
    rating: 4,
    date: "Il y a 2 semaines",
    source: "custom"
  }
];

interface ReviewLibraryProps {
  onSelectReview: (review: Review) => void;
  selectedReviewId?: string;
}

export default function ReviewLibrary({ onSelectReview, selectedReviewId }: ReviewLibraryProps) {
  const getSourceBadge = (source: string) => {
    switch (source) {
      case "google":
        return <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono px-2 py-0.5 rounded-full">Google Maps</span>;
      case "trustpilot":
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono px-2 py-0.5 rounded-full">Trustpilot</span>;
      case "g2":
        return <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-mono px-2 py-0.5 rounded-full">G2 Crowd</span>;
      case "appstore":
        return <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-mono px-2 py-0.5 rounded-full">App Store</span>;
      default:
        return <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-mono px-2 py-0.5 rounded-full">Import Manuel</span>;
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-sans font-semibold tracking-tight text-white flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-violet-400" />
            Avis Clients Disponibles
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">Cliquez sur un avis pour le charger instantanément dans le Studio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-auto max-h-[640px] pr-2">
        {DEMO_REVIEWS.map((review, idx) => {
          const isSelected = selectedReviewId === review.id;
          return (
            <GlassCard
              key={review.id}
              onClick={() => onSelectReview(review)}
              delay={idx * 0.08}
              hoverEffect={true}
              className={`group transition-all duration-300 border ${
                isSelected 
                  ? "border-violet-500/50 bg-violet-950/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]" 
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <div>
                  <h4 className="font-sans font-medium text-slate-100 text-sm">{review.author}</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{review.company}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {getSourceBadge(review.source)}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed italic line-clamp-3 mb-2 font-sans">
                "{review.text}"
              </p>

              <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-white/5">
                <span className="text-[10px] text-slate-500 font-mono">{review.date}</span>
                <span className="text-[10px] text-violet-400/70 group-hover:text-violet-400 flex items-center gap-1 font-mono transition-colors">
                  Utiliser <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
