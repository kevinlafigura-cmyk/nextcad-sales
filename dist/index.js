// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "node:url";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});
async function sendEmail(to, subject, htmlContent) {
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
function getAcceptanceEmailTemplate(name, position) {
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
          .social { margin-top: 15px; }
          .social a { color: #0066cc; text-decoration: none; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>\u{1F389} \xA1Felicidades, ${name}!</h1>
          </div>
          <div class="content">
            <p>Nos complace informarte que has sido <strong>aceptado</strong> para una entrevista en el equipo de <strong>NextCAD</strong>.</p>
            
            <div class="highlight">
              <strong>Posici\xF3n Solicitada:</strong><br>
              ${position}
            </div>
            
            <p>Pronto nos pondremos en contacto contigo a trav\xE9s de <strong>Discord</strong> para coordinar los detalles de tu entrevista.</p>
            
            <p><strong>Pr\xF3ximos pasos:</strong></p>
            <ul>
              <li>Revisa tu Discord para mensajes de nuestro equipo</li>
              <li>Prep\xE1rate para discutir tu experiencia y habilidades</li>
              <li>Si tienes preguntas, no dudes en contactarnos</li>
            </ul>
            
            <p>\xA1Esperamos conocerte pronto!</p>
            
            <a href="https://discord.gg/njWS5rhnPh" class="button">\u{1F4F1} Ir al Discord de NextCAD</a>
            
            <div class="footer">
              <p><strong>NextCAD</strong> - Soluci\xF3n Completa para Comunidades ER:LC</p>
              <p>Este es un mensaje autom\xE1tico. Por favor, no respondas a este correo.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
function getRejectionEmailTemplate(name) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; padding: 0; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #666 0%, #333 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 30px 20px; }
          .content p { margin: 15px 0; line-height: 1.6; }
          .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #666; color: white; padding: 12px 28px; border-radius: 4px; text-decoration: none; margin-top: 20px; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Gracias por tu Inter\xE9s</h1>
          </div>
          <div class="content">
            <p>Hola ${name},</p>
            
            <p>Agradecemos sinceramente tu inter\xE9s en unirte al equipo de <strong>NextCAD</strong> y el tiempo que dedicaste a completar tu solicitud.</p>
            
            <div class="highlight">
              <strong>Decisi\xF3n de Selecci\xF3n:</strong><br>
              Despu\xE9s de revisar cuidadosamente tu solicitud, en esta ocasi\xF3n no hemos podido avanzar con tu candidatura.
            </div>
            
            <p>Esto no significa que no tengas las habilidades necesarias. Simplemente, otros candidatos se ajustaban mejor a nuestras necesidades actuales.</p>
            
            <p><strong>Te animamos a:</strong></p>
            <ul>
              <li>Intentarlo nuevamente en el futuro</li>
              <li>Mejorar tus habilidades en \xE1reas espec\xEDficas</li>
              <li>Mantenerte en contacto con nuestro servidor de Discord</li>
            </ul>
            
            <p>\xA1Esperamos poder trabajar contigo pronto!</p>
            
            <a href="https://discord.gg/njWS5rhnPh" class="button">\u{1F4F1} \xDAnete a nuestro Discord</a>
            
            <div class="footer">
              <p><strong>NextCAD</strong> - Soluci\xF3n Completa para Comunidades ER:LC</p>
              <p>Este es un mensaje autom\xE1tico. Por favor, no respondas a este correo.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
var requestsStore = [];
var requestIdCounter = 1;
async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json());
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.post("/api/interview-request", async (req, res) => {
    try {
      const { name, email, discord, robloxUser, position, message } = req.body;
      if (!name || !email || !discord || !robloxUser || !position || !message) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }
      if (message.length < 50) {
        return res.status(400).json({ error: "El mensaje debe tener al menos 50 caracteres" });
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
        created_at: /* @__PURE__ */ new Date()
      });
      const positionLabel = {
        soporte: "Soporte",
        administracion: "Administraci\xF3n",
        moderador: "Moderador",
        developer: "Developer",
        "community-manager": "Community Manager"
      };
      const discordPayload = {
        embeds: [
          {
            title: "\u{1F4CB} Nueva Solicitud de Entrevista",
            color: 26316,
            fields: [
              { name: "Nombre", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Discord", value: discord, inline: true },
              { name: "Usuario Roblox", value: robloxUser, inline: true },
              { name: "Puesto Solicitado", value: positionLabel[position] || position, inline: true },
              { name: "ID Solicitud", value: `#${requestId}`, inline: true },
              { name: "Mensaje", value: message, inline: false },
              { name: "Fecha", value: (/* @__PURE__ */ new Date()).toLocaleString("es-ES"), inline: false }
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
                label: "\u2705 Aceptar",
                style: 3,
                custom_id: `accept_${requestId}`
              },
              {
                type: 2,
                label: "\u274C Rechazar",
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
        }).catch((error) => console.error("Error sending to Discord:", error));
      }
      res.json({ success: true, requestId });
    } catch (error) {
      console.error("Error in interview-request:", error);
      res.status(500).json({ error: "Error al procesar la solicitud" });
    }
  });
  app.get("/api/interview-requests", (req, res) => {
    try {
      res.json(requestsStore);
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ error: "Error al obtener solicitudes" });
    }
  });
  app.get("/api/interview-requests/stats", (req, res) => {
    try {
      const total = requestsStore.length;
      const pending = requestsStore.filter((r) => r.status === "pending").length;
      const accepted = requestsStore.filter((r) => r.status === "accepted").length;
      const rejected = requestsStore.filter((r) => r.status === "rejected").length;
      res.json({ total, pending, accepted, rejected });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Error al obtener estad\xEDsticas" });
    }
  });
  app.post("/api/interview-request/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Estado inv\xE1lido" });
      }
      const request = requestsStore.find((r) => r.id === parseInt(id));
      if (!request) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }
      request.status = status;
      request.updated_at = /* @__PURE__ */ new Date();
      const emailTemplate = status === "accepted" ? getAcceptanceEmailTemplate(request.name, request.position) : getRejectionEmailTemplate(request.name);
      const emailSubject = status === "accepted" ? "\xA1Felicidades! Has sido aceptado para una entrevista en NextCAD" : "Gracias por tu inter\xE9s en NextCAD";
      await sendEmail(request.email, emailSubject, emailTemplate);
      res.json({ success: true, message: `Solicitud ${status === "accepted" ? "aceptada" : "rechazada"} y email enviado` });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Error al actualizar solicitud" });
    }
  });
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
