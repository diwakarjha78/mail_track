import axios from "axios";
import { UAParser } from "ua-parser-js";
import send_mail from "../config/mail.config.js";
import { TELEGRAM_CHAT_ID, TELEGRAM_BOT_TOKEN } from "../config/env.config.js";

async function send_mail_controller(req, res) {
  const { email, body, subject } = req.body;

  try {
    await send_mail(email, subject, body);
  } catch (error) {
    console.log("Error", error);
  }

  return res.status(200).json({
    hello: email,
  });
}

async function tracking_pixel_controller(req, res) {
  try {
    const userIP = req.ip.replace(/^::ffff:/, "");
    const userEmail = req.query.email || "Unknown";
    const ua = req.headers["user-agent"];
    const parser = new UAParser(ua);
    const { browser, os } = parser.getResult();
    let geoData = {};
    try {
      const response = await axios.get(
        `http://ip-api.com/json/${userIP}?fields=status,country,regionName,city,isp,proxy`
      );
      geoData = response.data.status === "success" ? response.data : {};
    } catch (err) {
      console.error("Geolocation error:", err);
    }
    const message = `
      📧 Email: ${userEmail}\n🌐 IP: ${userIP}\n🖥️ Browser: ${
      browser.name || "Unknown"
    } ${browser.version || ""}\n💻 OS: ${os.name || "Unknown"} ${
      os.version || ""
    }\n🌍 Location: ${geoData.city || "N/A"}, ${geoData.regionName || "N/A"}, ${
      geoData.country || "N/A"
    }\n🔍 ISP: ${geoData.isp || "N/A"}\n🔄 Proxy: ${
      geoData.proxy ? "Yes" : "No"
    }
    `;
    await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        params: { chat_id: TELEGRAM_CHAT_ID, text: message },
      }
    );
    res.type("image/gif");
    res.send(
      Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64")
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

export { send_mail_controller, tracking_pixel_controller };
