import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface DiscordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DiscordModal({ open, onOpenChange }: DiscordModalProps) {
  const discordLink = "https://discord.gg/njWS5rhnPh";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Únete a Nuestro Discord</DialogTitle>
          <DialogDescription>
            Conecta con la comunidad de NextCAD y obtén acceso a soporte, actualizaciones y networking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-4">
              Nuestro servidor de Discord es el lugar perfecto para:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Obtener soporte técnico</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Conectar con otros administradores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Recibir actualizaciones de la plataforma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Participar en eventos y webinars</span>
              </li>
            </ul>
          </div>
          <Button 
            asChild 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <a 
              href={discordLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Ir al Discord <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Se abrirá en una nueva ventana
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
