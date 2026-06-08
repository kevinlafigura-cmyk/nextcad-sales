import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
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
    console.log(`📧 Enviando email a ${to}...`);
    await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to,
      subject,
      html: htmlContent
    });
    console.log(`✅ Email enviado a ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Error enviando email:`, error);
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
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; padding: 0; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 30px 20px; }
          .content p { margin: 15px 0; line-height: 1.6; }
          .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #0066cc; color: white; padding: 12px 28px; border-radius: 4px; text-decoration: none; margin-top: 20px; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡Felicidades, ${name}!</h1>
          </div>
          <div class="content">
            <p>Nos complace informarte que has sido <strong>aceptado</strong> para una entrevista en el equipo de <strong>NextCAD</strong>.</p>
            
            <div class="highlight">
              <strong>Posición Solicitada:</strong><br>
              ${position}
            </div>
            
            <p>Pronto nos pondremos en contacto contigo a través de <strong>Discord</strong> para coordinar los detalles de tu entrevista.</p>
            
            <p><strong>Próximos pasos:</strong></p>
            <ul>
              <li>Revisa tu Discord para mensajes de nuestro equipo</li>
              <li>Prepárate para discutir tu experiencia y habilidades</li>
              <li>Si tienes preguntas, no dudes en contactarnos</li>
            </ul>
            
            <p>¡Esperamos conocerte pronto!</p>
            
            <a href="https://discord.gg/njWS5rhnPh" class="button">📱 Ir al Discord de NextCAD</a>
            
            <div class="footer">
              <p><strong>NextCAD</strong> - Solución Completa para Comunidades ER:LC</p>
              <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
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
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; padding: 0; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ff6b6b 0%, #cc5555 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 30px 20px; }
          .content p { margin: 15px 0; line-height: 1.6; }
          .highlight { background: #ffe3e3; padding: 15px; border-left: 4px solid #ff6b6b; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #ff6b6b; color: white; padding: 12px 28px; border-radius: 4px; text-decoration: none; margin-top: 20px; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Gracias por tu interés</h1>
          </div>
          <div class="content">
            <p>Hola ${name},</p>
            
            <p>Agradecemos sinceramente tu interés en unirte al equipo de <strong>NextCAD</strong>. Hemos revisado cuidadosamente tu solicitud y, en esta ocasión, hemos decidido continuar con otros candidatos que se ajustan mejor a nuestras necesidades actuales.</p>
            
            <div class="highlight">
              <strong>¡No te desanimes!</strong><br>
              Esto no significa que no seas un excelente candidato. Te invitamos a que vuelvas a aplicar en el futuro cuando se abran nuevas posiciones.
            </div>
            
            <p><strong>Próximos pasos:</strong></p>
            <ul>
              <li>Mantente en contacto con nuestro servidor de Discord</li>
              <li>Sigue mejorando tus habilidades</li>
              <li>Aplica nuevamente cuando se abran nuevas oportunidades</li>
            </ul>
            
            <p>¡Mucho éxito en tu camino!</p>
            
            <a href="https://discord.gg/njWS5rhnPh" class="button">📱 Únete a nuestro Discord</a>
            
            <div class="footer">
              <p><strong>NextCAD</strong> - Solución Completa para Comunidades ER:LC</p>
              <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Almacenamiento en memoria
const requestsStore: any[] = [];
let requestIdCounter = 1;

const app = express();

// Middleware
app.use(express.json());

// Serve static files
const staticPath = path.resolve(__dirname, "..", "dist", "public");
app.use(express.static(staticPath));

console.log("🚀 Iniciando servidor NextCAD");
console.log(`📁 Static path: ${staticPath}`);

// API: Recibir solicitud de entrevista
app.post("/api/interview-request", async (req, res) => {
  try {
    const { name, email, discord, robloxUser, position, message } = req.body;

    if (!name || !email || !discord || !robloxUser || !position || !message) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const requestId = requestIdCounter++;

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

    console.log(`✅ Solicitud #${requestId} guardada`);

    // Enviar a Discord
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
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
              { name: "Puesto Solicitado", value: position, inline: true },
              { name: "ID Solicitud", value: `#${requestId}`, inline: true },
              { name: "Mensaje", value: message, inline: false },
              { name: "Fecha", value: new Date().toLocaleString("es-ES"), inline: false }
            ],
            footer: { text: "NextCAD - Sistema de Solicitudes" }
          }
        ]
      };

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordPayload)
        });
        console.log(`📤 Discord: ${response.status}`);
      } catch (err) {
        console.error("❌ Error Discord:", err);
      }
    }

    res.json({ success: true, requestId });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// API: Obtener solicitudes
app.get("/api/interview-requests", (req, res) => {
  res.json(requestsStore);
});

// API: Obtener estadísticas
app.get("/api/interview-requests/stats", (req, res) => {
  const total = requestsStore.length;
  const pending = requestsStore.filter(r => r.status === "pending").length;
  const accepted = requestsStore.filter(r => r.status === "accepted").length;
  const rejected = requestsStore.filter(r => r.status === "rejected").length;

  res.json({ total, pending, accepted, rejected });
});

// API: Actualizar estado
app.post("/api/interview-request/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`🔄 Actualizando #${id} a ${status}`);

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const request = requestsStore.find(r => r.id === parseInt(id));

    if (!request) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    request.status = status;
    request.updated_at = new Date();

    const emailTemplate = status === "accepted" 
      ? getAcceptanceEmailTemplate(request.name, request.position)
      : getRejectionEmailTemplate(request.name);

    const emailSubject = status === "accepted"
      ? "¡Felicidades! Has sido aceptado para una entrevista en NextCAD"
      : "Gracias por tu interés en NextCAD";

    await sendEmail(request.email, emailSubject, emailTemplate);

    console.log(`✅ Solicitud #${id} actualizada y email enviado`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ error: "Error al actualizar solicitud" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve index.html for all other routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en puerto ${port}`);
});
