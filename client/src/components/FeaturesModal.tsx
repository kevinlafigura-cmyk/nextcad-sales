import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const features = [
  {
    category: "Sistemas Operativos",
    items: [
      "Gestión de unidades en tiempo real",
      "Sistema CAD/MDT avanzado",
      "Gestión de llamadas y eventos",
      "Información operativa centralizada",
      "Herramientas de coordinación departamental",
      "Seguimiento y control de actividades"
    ]
  },
  {
    category: "Sistema Penitenciario",
    items: [
      "Registro de arrestos",
      "Historial penitenciario completo",
      "Control de sentencias",
      "Administración de reclusos",
      "Seguimiento de antecedentes",
      "Integración con sistemas administrativos"
    ]
  },
  {
    category: "Multas y Sanciones",
    items: [
      "Administración de multas",
      "Registro de infracciones",
      "Registros disciplinarios",
      "Historiales de usuarios y personajes",
      "Seguimiento de sanciones",
      "Reportes detallados"
    ]
  },
  {
    category: "Inteligencia Artificial",
    items: [
      "Soporte automático 24/7",
      "Respuestas a preguntas frecuentes",
      "Sistema de tickets inteligente",
      "Bienvenidas personalizadas",
      "Moderación asistida",
      "Asistente conversacional"
    ]
  },
  {
    category: "Ecosistema Social",
    items: [
      "Red social integrada (NextSocial)",
      "Publicaciones y comentarios",
      "Sistema de likes y seguimiento",
      "Perfiles de usuario",
      "Mensajería privada",
      "Llamadas de voz en tiempo real"
    ]
  },
  {
    category: "Sistemas de Comunicación",
    items: [
      "Sistema de radio operativo",
      "Bot de Discord integrado",
      "Sincronización automática",
      "Herramientas administrativas",
      "Automatización de procesos",
      "Notificaciones en tiempo real"
    ]
  },
  {
    category: "Marketplace y Tienda",
    items: [
      "Creación de productos",
      "Gestión de inventarios",
      "Catálogos personalizables",
      "Soporte para negocios privados",
      "Economía interna del servidor",
      "Sistema de pagos integrado"
    ]
  },
  {
    category: "Personalización",
    items: [
      "Apariencia visual personalizable",
      "Configuración operativa flexible",
      "Gestión de permisos avanzada",
      "Creación de departamentos",
      "Funciones específicas por comunidad",
      "Herramientas administrativas personalizadas"
    ]
  },
  {
    category: "Integración ER:LC",
    items: [
      "Conexión directa con API oficial",
      "Recepción de eventos en tiempo real",
      "Sincronización automática de datos",
      "Monitoreo de actividades del servidor",
      "Gestión centralizada de recursos",
      "Administración de personal integrada"
    ]
  }
];

export default function FeaturesModal({ open, onOpenChange }: FeaturesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Todas las Características de NextCAD</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(80vh-120px)] pr-4">
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold text-blue-600 mb-3">
                  {feature.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                  {feature.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
