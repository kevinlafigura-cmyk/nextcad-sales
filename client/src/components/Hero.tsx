import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById("content");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 border-2 border-cyan-400 opacity-20 transform -rotate-45"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-pink-400 opacity-10 transform rotate-45"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="neon-text text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase">
            NEXT
            <span className="block mt-2">CAD</span>
          </h1>
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
            <div className="w-32 h-1 bg-gradient-to-l from-pink-400 to-transparent"></div>
          </div>
        </div>

        <h2 className="neon-accent text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">
          MANUAL DE CAPACITACIÓN INTERNA
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          El ecosistema todo-en-uno para comunidades de{" "}
          <span className="text-cyan-400 font-bold">Emergency Response: Liberty County</span>
        </p>

        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Descubre cómo NextCAD centraliza administración, comunicación, inteligencia artificial y sistemas operativos en una única plataforma revolucionaria.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={scrollToContent}
            className="bg-cyan-400 text-black hover:bg-cyan-300 px-8 py-6 text-lg font-bold uppercase tracking-wider neon-border"
          >
            Explorar Manual
          </Button>
          <Button
            variant="outline"
            className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black px-8 py-6 text-lg font-bold uppercase tracking-wider"
          >
            Ver Presentación
          </Button>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 hover:text-pink-400 transition-colors"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
