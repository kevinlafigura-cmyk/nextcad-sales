import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";

interface InterviewRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const positions = [
  { value: "soporte", label: "Soporte" },
  { value: "administracion", label: "Administración" },
  { value: "moderador", label: "Moderador" },
  { value: "developer", label: "Developer" },
  { value: "community-manager", label: "Community Manager" }
];

export default function InterviewRequestModal({ open, onOpenChange }: InterviewRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    robloxUser: "",
    position: "",
    experience: "",
    availability: "",
    timezone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePositionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      position: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.name || !formData.email || !formData.discord || !formData.robloxUser || !formData.position || !formData.experience || !formData.availability || !formData.timezone || !formData.message) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    setLoading(true);
    
    try {
      // Enviar solicitud al backend
      const response = await fetch("/api/interview-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      setSubmitted(true);
      toast.success("¡Solicitud enviada exitosamente!");
      
      // Resetear formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          discord: "",
          robloxUser: "",
          position: "",
          experience: "",
          availability: "",
          timezone: "",
          message: ""
        });
        setSubmitted(false);
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      toast.error("Error al enviar la solicitud. Intenta de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
            <p className="text-gray-600">
              Hemos recibido tu solicitud. Pronto recibirás un email con la respuesta sobre tu entrevista.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Solicitar Entrevista</DialogTitle>
          <DialogDescription>
            Completa el formulario para solicitar una entrevista y demostrar tus habilidades. Todos los campos son obligatorios.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Nombre */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Nombre Completo *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
              className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Email *
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Recibirás la respuesta en este email</p>
          </div>

          {/* Discord */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Discord *
            </label>
            <Input
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="TuUsuario#1234"
              required
              className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Roblox User */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Usuario de Roblox *
            </label>
            <Input
              name="robloxUser"
              value={formData.robloxUser}
              onChange={handleChange}
              placeholder="TuUsuarioRoblox"
              required
              className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Puesto */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Puesto Solicitado *
            </label>
            <Select value={formData.position} onValueChange={handlePositionChange}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona un puesto" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((pos) => (
                  <SelectItem key={pos.value} value={pos.value}>
                    {pos.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experiencia */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Experiencia Previa (años) *
            </label>
            <Input
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
              className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Disponibilidad */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Disponibilidad *
            </label>
            <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona tu disponibilidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="part-time">Part-time (menos de 20 horas/semana)</SelectItem>
                <SelectItem value="full-time">Full-time (más de 20 horas/semana)</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Zona Horaria */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Zona Horaria *
            </label>
            <Input
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              placeholder="GMT-5 (Ej: GMT-5, GMT+1, etc.)"
              required
              className="w-full bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Mensaje/Nota */}
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-2 block">
              Mensaje de Presentación *
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntanos por qué quieres unirte a NextCAD, tu experiencia relevante y qué te hace el candidato ideal para este puesto..."
              required
              className="w-full min-h-32 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 50 caracteres</p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading || formData.message.length < 50}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Solicitud"
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Al enviar, aceptas que revisaremos tu solicitud y nos pondremos en contacto por email.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
