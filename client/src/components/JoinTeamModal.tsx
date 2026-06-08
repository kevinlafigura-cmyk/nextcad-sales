import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface JoinTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function JoinTeamModal({ open, onOpenChange }: JoinTeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    robloxUser: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.name || !formData.email || !formData.discord || !formData.robloxUser) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setLoading(true);
    
    try {
      // Simular envío de formulario
      // En producción, esto enviaría a un backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("¡Solicitud enviada! Nos pondremos en contacto pronto.");
      
      // Resetear formulario
      setFormData({
        name: "",
        email: "",
        discord: "",
        robloxUser: "",
        message: ""
      });
      
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al enviar el formulario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar al Equipo</DialogTitle>
          <DialogDescription>
            Completa el formulario para unirte a nuestro equipo y ser parte de NextCAD
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nombre Completo *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email *
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Discord *
            </label>
            <Input
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="TuUsuario#1234"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Usuario de Roblox *
            </label>
            <Input
              name="robloxUser"
              value={formData.robloxUser}
              onChange={handleChange}
              placeholder="TuUsuarioRoblox"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Mensaje (Opcional)
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntanos por qué quieres unirte..."
              className="w-full min-h-24"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
