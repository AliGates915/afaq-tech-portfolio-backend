import Contact from "../models/Contact.js";
import transporter from "../config/mailer.js";

export const createContact = async (req, res) => {
  try {
    const { interest, name, email, phone, message } = req.body;

    if (!interest || !name || !email || !phone) {
      return res.status(400).json({
        ok: false,
        msg: "interest, name, email, phone are required",
      });
    }

    // Save to DB
    const saved = await Contact.create({
      interest,
      name,
      email,
      phone,
      message,
    });

    // Send email
    await transporter.sendMail({
      from: `"Afaq Technologies" <${process.env.MAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `New Contact Request — ${name}`,
      html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f6f7fb; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:#f59e0b; padding:20px; text-align:center;">
      
        <h2 style="color:#ffffff; margin:0;">New Contact Request</h2>
      </div>

      <!-- Body -->
      <div style="padding:25px; color:#111827;">
        <p style="font-size:15px;">You’ve received a new message from your website contact form.</p>

        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <tr>
            <td style="padding:8px 0; font-weight:600;">Interest</td>
            <td style="padding:8px 0;">${interest}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">Name</td>
            <td style="padding:8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">Email</td>
            <td style="padding:8px 0;">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600;">Phone</td>
            <td style="padding:8px 0;">${phone || "-"}</td>
          </tr>
        </table>

        <div style="margin-top:20px;">
          <p style="font-weight:600; margin-bottom:6px;">Message</p>
          <div style="background:#f3f4f6; padding:15px; border-radius:6px; font-size:14px;">
            ${message}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb; padding:15px; text-align:center; font-size:13px; color:#6b7280;">
        © ${new Date().getFullYear()} Afaq Technologies<br/>
        Web • Mobile • Custom Software
      </div>

    </div>
  </div>
  `,
    });

    return res.status(201).json({
      ok: true,
      msg: "Message sent successfully",
    });
  } catch (err) {
    console.error("❌ createContact:", err);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
};
