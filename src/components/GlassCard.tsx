import { motion } from "motion/react";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  delay?: number;
  id?: string;
  key?: string | number;
}

export default function GlassCard({
  children,
  className = "",
  onClick,
  hoverEffect = true,
  delay = 0,
  id,
}: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        hoverEffect && onClick
          ? {
              y: -5,
              borderColor: "rgba(255, 255, 255, 0.22)",
              boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.12)",
            }
          : hoverEffect
          ? {
              borderColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0 15px 30px -10px rgba(245, 158, 11, 0.12)",
            }
          : undefined
      }
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[24px] 
        border border-white/[0.08]
        bg-slate-950/45 backdrop-blur-[24px]
        px-6 py-5 text-slate-100 shadow-[0_12px_45px_rgba(5,2,15,0.65)]
        transition-all duration-300
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Visual reflection accent on top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      
      {/* Subtle bottom highlights */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />

      {/* Light soft internal liquid-glass radial glows */}
      <div className="pointer-events-none absolute -right-[15%] -top-[15%] h-[160px] w-[160px] rounded-full bg-violet-600/8 blur-[40px]" />
      <div className="pointer-events-none absolute -left-[15%] -bottom-[15%] h-[140px] w-[140px] rounded-full bg-amber-500/4 blur-[35px]" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
