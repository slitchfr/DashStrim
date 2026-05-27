import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function GlowBackground() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: (e.clientX - window.innerWidth / 2) / 15,
        y: (e.clientY - window.innerHeight / 2) / 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-950">
      {/* Dynamic ambient star dots */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(167, 139, 250, 0.45) 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      {/* Main futuristic radial gradients with mouse interactive offset */}
      <motion.div
        animate={{
          x: coords.x,
          y: coords.y,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 80 }}
        className="absolute inset-0 flex items-center justify-center filter blur-[130px] opacity-35 mix-blend-screen"
      >
        {/* Blob Deep Violet */}
        <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-violet-600 to-purple-800 animate-pulse duration-[9s]" />

        {/* Blob Yellow-Orange / Amber */}
        <div className="absolute bottom-[15%] right-[20%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-500 to-orange-600 animate-pulse duration-[11s]" />

        {/* Blob Warm Violet Overlay */}
        <div className="absolute top-[40%] right-[30%] w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-violet-500 to-orange-400 opacity-20" />
      </motion.div>

      {/* Glass gradient lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950" />
    </div>
  );
}
