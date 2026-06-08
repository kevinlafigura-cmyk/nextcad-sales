import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, Users, Brain, Radio, ShoppingCart, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import DiscordModal from "@/components/DiscordModal";
import InterviewRequestModal from "@/components/InterviewRequestModal";
import FeaturesModal from "@/components/FeaturesModal";

export default function Home() {
  const [discordOpen, setDiscordOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Modales */}
      <DiscordModal open={discordOpen} onOpenChange={setDiscordOpen} />
      <InterviewRequestModal open={interviewOpen} onOpenChange={setInterviewOpen} />
      <FeaturesModal open={featuresOpen} onOpenChange={setFeaturesOpen} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-soft">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-blue-600">NextCAD</div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Características</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Precios</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contacto</a>
          </div>
          <Button 
            onClick={() => setDiscordOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Comenzar Ahora
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 gradient-light">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            La Plataforma Completa para tu Comunidad ER:LC
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            NextCAD centraliza administración, comunicación, inteligencia artificial y herramientas operativas en una única plataforma moderna e integrada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setInterviewOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg flex items-center gap-2"
            >
              Solicitar Entrevista <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              onClick={() => setFeaturesOpen(true)}
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
            >
              Ver Características
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">El Desafío de Administrar una Comunidad</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-8 rounded-lg shadow-soft">
              <h3 className="text-xl font-bold text-red-700 mb-4">Sin NextCAD</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✕</span>
                  <span>Múltiples herramientas desconectadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✕</span>
                  <span>Información fragmentada entre plataformas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✕</span>
                  <span>Moderación manual y lenta</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✕</span>
                  <span>Experiencia inconsistente para usuarios</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-lg shadow-soft">
              <h3 className="text-xl font-bold text-green-700 mb-4">Con NextCAD</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Una plataforma unificada y centralizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Datos en tiempo real integrados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Automatización inteligente con IA</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Experiencia profesional y moderna</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Características Principales</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">NextCAD ofrece un conjunto completo de herramientas diseñadas específicamente para comunidades de ER:LC</p>

          {/* CAD & MDT */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              Sistemas Operativos Avanzados
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">CAD/MDT</h4>
                <p className="text-gray-600">Gestión de unidades, llamadas e información operativa en tiempo real con herramientas de coordinación avanzadas.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Sistema Penitenciario</h4>
                <p className="text-gray-600">Registro de arrestos, historiales completos y administración de reclusos con seguimiento integrado.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Multas & Sanciones</h4>
                <p className="text-gray-600">Administración de infracciones, registros disciplinarios y seguimiento de antecedentes.</p>
              </div>
            </div>
          </div>

          {/* AI Integration */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              Inteligencia Artificial Integrada
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Soporte 24/7</h4>
                <p className="text-gray-600">Respuestas automáticas a preguntas frecuentes y asistencia inmediata a usuarios.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Tickets Inteligentes</h4>
                <p className="text-gray-600">Clasificación automática y respuestas iniciales antes de intervención humana.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Bienvenidas Personalizadas</h4>
                <p className="text-gray-600">Guías automáticas para nuevos miembros con mensajes contextuales.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Moderación Asistida</h4>
                <p className="text-gray-600">Detección de comportamientos inadecuados y automatización de procesos.</p>
              </div>
            </div>
          </div>

          {/* Social & Communication */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              Ecosistema Social & Comunicación
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">NextSocial</h4>
                <p className="text-gray-600">Red social integrada con publicaciones, likes, comentarios y perfiles.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Mensajería</h4>
                <p className="text-gray-600">Conversaciones privadas y gestión de contactos dentro de la plataforma.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Llamadas de Voz</h4>
                <p className="text-gray-600">Comunicación en tiempo real entre usuarios registrados.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Sistema de Radio</h4>
                <p className="text-gray-600">Coordinación operativa en tiempo real entre departamentos.</p>
              </div>
            </div>
          </div>

          {/* Commerce & Customization */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              Marketplace & Personalización
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Marketplace Integrado</h4>
                <p className="text-gray-600">Administración de productos, catálogos y economía interna del servidor.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Personalización Total</h4>
                <p className="text-gray-600">Adapta apariencia, configuración, permisos y departamentos según tus necesidades.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft shadow-hover">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Bot de Discord</h4>
                <p className="text-gray-600">Integración completa con Discord para gestión comunitaria avanzada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Integración Directa con ER:LC</h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg">
            <p className="text-lg text-gray-700 mb-4">
              NextCAD se conecta directamente a servidores privados de ER:LC mediante la API oficial del juego, permitiendo:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Recepción de llamadas y eventos en tiempo real</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Gestión y monitoreo de actividades del servidor</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Sincronización automática de información operativa</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Administración centralizada de recursos y personal</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Modelo de Suscripción Flexible</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pago Tradicional</h3>
              <p className="text-gray-600 mb-6">Suscripción mensual mediante pago en USD</p>
              <Button 
                onClick={() => setInterviewOpen(true)}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Solicitar Información
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-soft border-2 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pago en Roblox</h3>
              <p className="text-gray-600 mb-6">Suscripción mediante producto en experiencia oficial de NextCAD (30 días)</p>
              <Button 
                onClick={() => setInterviewOpen(true)}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Solicitar Información
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para Transformar tu Comunidad?</h2>
          <p className="text-xl text-blue-100 mb-8">Únete a comunidades que ya están utilizando NextCAD para crecer</p>
          <Button 
            onClick={() => setInterviewOpen(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
          >
            Solicitar Entrevista Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">NextCAD</h4>
              <p className="text-sm">La plataforma completa para comunidades de ER:LC</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Características</a></li>
                <li><a href="#" className="hover:text-white transition">Precios</a></li>
                <li><a href="#" className="hover:text-white transition">Documentación</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 NextCAD. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
