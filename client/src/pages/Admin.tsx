import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Eye, Lock, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface InterviewRequest {
  id: number;
  name: string;
  email: string;
  discord: string;
  roblox_user: string;
  position: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export default function Admin() {
  const [requests, setRequests] = useState<InterviewRequest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<InterviewRequest | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const ADMIN_PASSWORD = "NextCAD2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword("");
      toast.success("Autenticado correctamente");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchRequests();
      fetchStats();
    }
  }, [authenticated]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/interview-requests");
      if (!response.ok) throw new Error("Error fetching requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      toast.error("Error al cargar las solicitudes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/interview-requests/stats");
      if (!response.ok) throw new Error("Error fetching stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: "accepted" | "rejected") => {
    try {
      const response = await fetch(`/api/interview-request/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Error updating status");

      setRequests(requests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      ));
      
      // Actualizar stats
      await fetchStats();

      toast.success(`Solicitud ${newStatus === "accepted" ? "aceptada" : "rechazada"} y email enviado`);
      setViewModalOpen(false);
    } catch (error) {
      toast.error("Error al actualizar solicitud");
      console.error(error);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Admin</h1>
          <p className="text-gray-600 mb-6">NextCAD - Gestión de Solicitudes</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">
                Contraseña de Administrador
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full bg-gray-50 border-gray-300"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Acceder
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Pendientes", value: stats?.pending || 0 },
    { name: "Aceptadas", value: stats?.accepted || 0 },
    { name: "Rechazadas", value: stats?.rejected || 0 }
  ];

  const COLORS = ["#fbbf24", "#34d399", "#f87171"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Gestión de solicitudes de entrevista</p>
            </div>
            <Button
              onClick={() => setAuthenticated(false)}
              variant="outline"
              className="border-gray-300 text-gray-700"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total</p>
                    <p className="text-3xl font-bold text-blue-600">{stats?.total || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Pendientes</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats?.pending || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Aceptadas</p>
                    <p className="text-3xl font-bold text-green-600">{stats?.accepted || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Rechazadas</p>
                    <p className="text-3xl font-bold text-red-600">{stats?.rejected || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Solicitudes</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  {stats && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tasa de Aceptación:</span>
                        <span className="text-2xl font-bold text-green-600">
                          {stats.total > 0 ? ((stats.accepted / stats.total) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tasa de Rechazo:</span>
                        <span className="text-2xl font-bold text-red-600">
                          {stats.total > 0 ? ((stats.rejected / stats.total) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pendientes de Revisar:</span>
                        <span className="text-2xl font-bold text-yellow-600">
                          {stats.pending}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Solicitudes Tab */}
          <TabsContent value="solicitudes">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="text-gray-900 font-semibold">Nombre</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Email</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Puesto</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Estado</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Fecha</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Cargando solicitudes...
                        </TableCell>
                      </TableRow>
                    ) : requests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No hay solicitudes aún
                        </TableCell>
                      </TableRow>
                    ) : (
                      requests.map((request) => (
                        <TableRow key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">{request.name}</TableCell>
                          <TableCell className="text-gray-700">{request.email}</TableCell>
                          <TableCell className="text-gray-700">{request.position}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {request.status === "pending"
                                ? "Pendiente"
                                : request.status === "accepted"
                                ? "Aceptada"
                                : "Rechazada"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm">
                            {new Date(request.created_at).toLocaleDateString("es-ES")}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                setSelectedRequest(request);
                                setViewModalOpen(true);
                              }}
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Modal */}
      {selectedRequest && (
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de Solicitud #{selectedRequest.id}</DialogTitle>
              <DialogDescription>
                Información completa y opciones de decisión
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Nombre</p>
                  <p className="text-gray-900">{selectedRequest.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Email</p>
                  <p className="text-gray-900">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Discord</p>
                  <p className="text-gray-900">{selectedRequest.discord}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Usuario Roblox</p>
                  <p className="text-gray-900">{selectedRequest.roblox_user}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Puesto Solicitado</p>
                  <p className="text-gray-900">{selectedRequest.position}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Estado</p>
                  <Badge
                    className={
                      selectedRequest.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedRequest.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {selectedRequest.status === "pending"
                      ? "Pendiente"
                      : selectedRequest.status === "accepted"
                      ? "Aceptada"
                      : "Rechazada"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Mensaje de Presentación</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              </div>

              {selectedRequest.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleStatusChange(selectedRequest.id, "accepted")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aceptar
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(selectedRequest.id, "rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rechazar
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
