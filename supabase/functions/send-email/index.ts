import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "contact" | "booking";
  data: {
    full_name: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
    // Booking specific fields
    tour_title?: string;
    tour_date?: string;
    num_guests?: number;
    total_price?: number;
    booking_reference?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    // Get SMTP credentials from environment variables
    const SMTP_HOST = Deno.env.get("SMTP_HOST") || "mail.spacemail.com";
    const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const SMTP_USER = Deno.env.get("SMTP_USER")!;
    const SMTP_PASS = Deno.env.get("SMTP_PASS")!;
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || SMTP_USER;

    const client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: true,
        auth: {
          username: SMTP_USER,
          password: SMTP_PASS,
        },
      },
    });

    let emailSubject: string;
    let emailBody: string;
    let customerEmailSubject: string;
    let customerEmailBody: string;

    if (type === "contact") {
      // Contact form email to admin
      emailSubject = `New Contact: ${data.subject || "General Inquiry"} - ${data.full_name}`;
      emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 5px; }
    .field-value { font-size: 16px; color: #1e293b; }
    .message-box { background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Message</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">From</div>
        <div class="field-value">${data.full_name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="field-label">Phone</div>
        <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      ` : ""}
      ${data.subject ? `
      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${data.subject}</div>
      </div>
      ` : ""}
      <div class="message-box">
        <div class="field-label">Message</div>
        <div class="field-value">${data.message}</div>
      </div>
    </div>
    <div class="footer">
      Zanzibar Vibe Tours • Contact Form Submission
    </div>
  </div>
</body>
</html>`;

      // Auto-reply to customer
      customerEmailSubject = `Thank you for contacting Zanzibar Vibe Tours!`;
      customerEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0 0 10px 0; font-size: 28px; }
    .header p { color: rgba(255,255,255,0.9); margin: 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
    .highlight { background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .footer { background: #f8fafc; padding: 20px; border-radius: 0 0 16px 16px; text-align: center; color: #64748b; font-size: 13px; }
    .btn { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌴 Karibu!</h1>
      <p>Thank you for reaching out to us</p>
    </div>
    <div class="content">
      <p>Dear <strong>${data.full_name}</strong>,</p>
      <p>Thank you for contacting Zanzibar Vibe Tours! We have received your message and our team will get back to you within 24 hours.</p>
      
      <div class="highlight">
        <p style="margin: 0;"><strong>Your message:</strong></p>
        <p style="margin: 10px 0 0 0; color: #475569;">${data.message}</p>
      </div>

      <p>In the meantime, feel free to explore our amazing tours or reach us directly:</p>
      
      <p style="text-align: center;">
        <a href="https://wa.me/255777887766" class="btn">💬 WhatsApp Us</a>
        <a href="tel:+255777887766" class="btn" style="background: #1e293b;">📞 Call Now</a>
      </p>
    </div>
    <div class="footer">
      <p><strong>Zanzibar Vibe Tours</strong><br>
      Stone Town, Zanzibar, Tanzania<br>
      +255 777 887 766 • info@zanzibartravelhelper.com</p>
    </div>
  </div>
</body>
</html>`;

    } else if (type === "booking") {
      // Booking notification to admin
      emailSubject = `🎉 New Booking: ${data.tour_title} - ${data.booking_reference}`;
      emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; margin-top: 10px; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .field { margin-bottom: 15px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 5px; }
    .field-value { font-size: 16px; color: #1e293b; font-weight: 600; }
    .price-box { background: #f0fdf4; padding: 20px; border-radius: 12px; text-align: center; margin-top: 20px; }
    .price { font-size: 32px; font-weight: 800; color: #10b981; }
    .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎫 New Booking Received!</h1>
      <div class="badge">Ref: ${data.booking_reference}</div>
    </div>
    <div class="content">
      <h2 style="margin-top: 0;">${data.tour_title}</h2>
      
      <div class="grid">
        <div class="field">
          <div class="field-label">Customer Name</div>
          <div class="field-value">${data.full_name}</div>
        </div>
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value">${data.email}</div>
        </div>
        <div class="field">
          <div class="field-label">Phone</div>
          <div class="field-value">${data.phone || "Not provided"}</div>
        </div>
        <div class="field">
          <div class="field-label">Tour Date</div>
          <div class="field-value">${data.tour_date}</div>
        </div>
        <div class="field">
          <div class="field-label">Number of Guests</div>
          <div class="field-value">${data.num_guests} person(s)</div>
        </div>
      </div>
      
      <div class="price-box">
        <div class="field-label">Total Amount</div>
        <div class="price">$${data.total_price}</div>
      </div>
    </div>
    <div class="footer">
      Zanzibar Vibe Tours • Booking Notification
    </div>
  </div>
</body>
</html>`;

      // Booking confirmation to customer
      customerEmailSubject = `Booking Confirmed: ${data.tour_title} - Ref: ${data.booking_reference}`;
      customerEmailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0 0 10px 0; font-size: 28px; }
    .ref-badge { display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 8px 20px; border-radius: 25px; font-size: 14px; font-weight: 600; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
    .tour-card { background: #f8fafc; padding: 25px; border-radius: 16px; margin: 20px 0; }
    .tour-title { font-size: 22px; font-weight: 700; margin: 0 0 15px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #64748b; }
    .detail-value { font-weight: 600; }
    .total-row { background: #10b981; color: white; margin: -25px -25px -25px -25px; margin-top: 20px; padding: 20px 25px; border-radius: 0 0 16px 16px; display: flex; justify-content: space-between; font-size: 18px; }
    .steps { margin: 25px 0; }
    .step { display: flex; gap: 15px; margin-bottom: 15px; }
    .step-num { width: 30px; height: 30px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; }
    .footer { background: #f8fafc; padding: 25px; border-radius: 0 0 16px 16px; text-align: center; color: #64748b; font-size: 13px; }
    .btn { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Booking Confirmed!</h1>
      <div class="ref-badge">Reference: ${data.booking_reference}</div>
    </div>
    <div class="content">
      <p>Dear <strong>${data.full_name}</strong>,</p>
      <p>Thank you for booking with Zanzibar Vibe Tours! Your adventure awaits. Here are your booking details:</p>
      
      <div class="tour-card">
        <h3 class="tour-title">🌴 ${data.tour_title}</h3>
        <div class="detail-row">
          <span class="detail-label">📅 Date</span>
          <span class="detail-value">${data.tour_date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">👥 Guests</span>
          <span class="detail-value">${data.num_guests} person(s)</span>
        </div>
        <div class="total-row">
          <span>Total Amount</span>
          <span><strong>$${data.total_price}</strong></span>
        </div>
      </div>

      <h3>What's Next?</h3>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div>
            <strong>Confirmation Call</strong><br>
            <span style="color: #64748b;">Our team will contact you within 24 hours to confirm your booking.</span>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div>
            <strong>Payment</strong><br>
            <span style="color: #64748b;">Secure your booking with payment details provided during the call.</span>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div>
            <strong>Get Ready!</strong><br>
            <span style="color: #64748b;">Pack your sense of adventure - we'll handle the rest!</span>
          </div>
        </div>
      </div>

      <p style="text-align: center;">
        <a href="https://wa.me/255777887766" class="btn">💬 Chat on WhatsApp</a>
      </p>
    </div>
    <div class="footer">
      <p><strong>Zanzibar Vibe Tours</strong><br>
      Stone Town, Zanzibar, Tanzania<br>
      +255 777 887 766 • info@zanzibartravelhelper.com</p>
      <p style="margin-top: 15px;">Track your booking anytime at our website!</p>
    </div>
  </div>
</body>
</html>`;
    } else {
      throw new Error("Invalid email type");
    }

    // Send email to admin
    await client.send({
      from: SMTP_USER,
      to: ADMIN_EMAIL,
      subject: emailSubject,
      content: "Please view this email in an HTML-compatible email client.",
      html: emailBody,
    });

    // Send auto-reply to customer
    await client.send({
      from: SMTP_USER,
      to: data.email,
      subject: customerEmailSubject!,
      content: "Please view this email in an HTML-compatible email client.",
      html: customerEmailBody!,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
