import { ReactNode } from "react";

interface ContentSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  accentColor?: "cyan" | "pink";
  layout?: "default" | "two-column";
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default function ContentSection({
  id,
  title,
  subtitle,
  description,
  children,
  accentColor = "cyan",
  layout = "default",
  leftContent,
  rightContent,
}: ContentSectionProps) {
  const accentClass = accentColor === "pink" ? "text-pink-400" : "text-cyan-400";
  const borderClass = accentColor === "pink" ? "neon-border-pink" : "neon-border";

  if (layout === "two-column") {
    return (
      <section id={id} className="py-20 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className={`neon-text text-4xl md:text-5xl mb-2 uppercase`}>
                  {title}
                </h2>
                {subtitle && (
                  <p className={`${accentClass} text-2xl font-bold uppercase tracking-wide`}>
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-pink-400"></div>
              {description && (
                <p className="text-lg text-gray-300 leading-relaxed">
                  {description}
                </p>
              )}
              {leftContent}
            </div>
            <div className="flex items-center justify-center">
              {rightContent}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 px-4">
      <div className="container">
        <div className="space-y-8">
          <div>
            <h2 className={`neon-text text-4xl md:text-5xl mb-2 uppercase`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`${accentClass} text-2xl font-bold uppercase tracking-wide`}>
                {subtitle}
              </p>
            )}
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 mt-4"></div>
          </div>

          {description && (
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
