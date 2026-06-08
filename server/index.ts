import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar transporte de email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

// Función para enviar emails
async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to,
      subject,
      html: htmlContent
    });
    console.log(`Email enviado a ${to}`);
    return true;
  } catch (error) {
    console.error(`Error enviando email a ${to}:`, error);
    return false;
  }
}

// Plantillas de email
function getAcceptanceEmailTemplate(name: string, position: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 15px; }
          .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Felicidades, ${name}!</h1>
          </div>
          <div class="content">
            <p>Has sido <strong>aceptado</strong> para una entrevista en el equipo de NextCAD.</p>
            <p>Posición solicitada: <strong>${position}</strong></p>
            <p>Pronto nos pondremos en contacto contigo a través de Discord para coordinar la entrevista.</p>
            <p>Si tienes preguntas, no dudes en contactarnos.</p>
            <a href="https://discord.gg/njWS5rhnPh" class="button">Ir al Discord</a>
            <div class="footer">
              <p>NextCAD - Solución Completa para Comunidades ER:LC</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getRejectionEmailTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #666 0%, #333 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Gracias por tu interés</h1>
          </div>
          <div class="content">
            <p>Hola ${name},</p>
            <p>Agradecemos sinceramente tu interés en unirte al equipo de NextCAD.</p>
            <p>Después de revisar tu solicitud, en esta ocasión no hemos podido aceptarla. Sin embargo, te animamos a intentarlo nuevamente en el futuro.</p>
            <p>Esperamos poder trabajar contigo pronto.</p>
            <div class="footer">
              <p>NextCAD - Solución Completa para Comunidades ER:LC</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Almacenamiento en memoria (temporal)
const requestsStore: any[] = [];
let requestIdCounter = 1;

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // API: Recibir solicitud de entrevista
  app.post("/api/interview-request", async (req, res) => {
    try {
      const { name, email, discord, robloxUser, position, message } = req.body;

      // Validar datos
      if (!name || !email || !discord || !robloxUser || !position || !message) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }

      if (message.length < 50) {
        return res.status(400).json({ error: "El mensaje debe tener al menos 50 caracteres" });
      }

      const requestId = requestIdCounter++;

      // Guardar en memoria
      requestsStore.push({
        id: requestId,
        name,
        email,
        discord,
        roblox_user: robloxUser,
        position,
        message,
        status: "pending",
        created_at: new Date()
      });

      // Enviar a Discord
      const positionLabel: Record<string, string> = {
        soporte: "Soporte",
        administracion: "Administración",
        moderador: "Moderador",
        developer: "Developer",
        "community-manager": "Community Manager"
      };

      const discordPayload = {
        embeds: [
          {
            title: "📋 Nueva Solicitud de Entrevista",
            color: 0x0066cc,
            fields: [
              { name: "Nombre", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Discord", value: discord, inline: true },
              { name: "Usuario Roblox", value: robloxUser, inline: true },
              { name: "Puesto Solicitado", value: positionLabel[position] || position, inline: true },
              { name: "ID Solicitud", value: `#${requestId}`, inline: true },
              { name: "Mensaje", value: message, inline: false },
              { name: "Fecha", value: new Date().toLocaleString("es-ES"), inline: false }
            ],
            footer: { text: "NextCAD - Sistema de Solicitudes" }
          }
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "✅ Aceptar",
                style: 3,
                custom_id: `accept_${requestId}`
              },
              {
                type: 2,
                label: "❌ Rechazar",
                style: 4,
                custom_id: `reject_${requestId}`
              }
            ]
          }
        ]
      };

      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordPayload)
        }).catch(error => console.error("Error sending to Discord:", error));
      }

      res.json({ success: true, requestId });
    } catch (error) {
      console.error("Error in interview-request:", error);
      res.status(500).json({ error: "Error al procesar la solicitud" });
    }
  });

  // API: Obtener todas las solicitudes (para admin)
  app.get("/api/interview-requests", (req, res) => {
    try {
      res.json(requestsStore);
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ error: "Error al obtener solicitudes" });
    }
  });

  // API: Obtener estadísticas
  app.get("/api/interview-requests/stats", (req, res) => {
    try {
      const total = requestsStore.length;
      const pending = requestsStore.filter(r => r.status === "pending").length;
      const accepted = requestsStore.filter(r => r.status === "accepted").length;
      const rejected = requestsStore.filter(r => r.status === "rejected").length;

      res.json({ total, pending, accepted, rejected });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Error al obtener estadísticas" });
    }
  });

  // API: Actualizar estado de solicitud
  app.post("/api/interview-request/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Estado inválido" });
      }

      const request = requestsStore.find(r => r.id === parseInt(id));

      if (!request) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }

      // Actualizar estado
      request.status = status;
      request.updated_at = new Date();

      // Enviar email
      const emailTemplate = status === "accepted" 
        ? getAcceptanceEmailTemplate(request.name, request.position)
        : getRejectionEmailTemplate(request.name);

      const emailSubject = status === "accepted"
        ? "¡Felicidades! Has sido aceptado para una entrevista en NextCAD"
        : "Gracias por tu interés en NextCAD";

      await sendEmail(request.email, emailSubject, emailTemplate);

      res.json({ success: true, message: `Solicitud ${status === "accepted" ? "aceptada" : "rechazada"} y email enviado` });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Error al actualizar solicitud" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
