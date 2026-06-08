import { ReactNode } from "react";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon?: ReactNode;
  accentColor?: "cyan" | "pink";
}

export default function FeatureCard({
  number,
  title,
  description,
  icon,
  accentColor = "cyan",
}: FeatureCardProps) {
  const accentClass = accentColor === "pink" ? "text-pink-400" : "text-cyan-400";
  const borderClass = accentColor === "pink" ? "border-pink-400" : "border-cyan-400";

  return (
    <div className={`neon-border p-6 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all group`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`${accentClass} text-4xl font-bold`} style={{ fontFamily: "'Orbitron', monospace" }}>
          {number}
        </div>
        {icon && <div className={`${accentClass} text-2xl`}>{icon}</div>}
      </div>
      <h3 className={`${accentClass} text-xl font-bold uppercase mb-3 tracking-wide`}>
        {title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
      <div className={`mt-4 h-0.5 w-0 bg-gradient-to-r ${accentClass === 'text-cyan-400' ? 'from-cyan-400' : 'from-pink-400'} group-hover:w-full transition-all duration-300`}></div>
    </div>
  );
}
