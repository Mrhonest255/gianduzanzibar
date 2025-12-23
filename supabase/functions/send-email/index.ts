import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to?: string;
  subject: string;
  html: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      to = "info@zanzibartravelhelper.com",
      subject,
      html,
      from_name = "Zanzibar Vibe Tours",
      from_email,
      reply_to,
    }: EmailRequest = await req.json();

    // SMTP Configuration
    const client = new SMTPClient({
      connection: {
        hostname: "mail.spacemail.com",
        port: 465,
        tls: true,
        auth: {
          username: "info@zanzibartravelhelper.com",
          password: "Hacker@255",
        },
      },
    });

    // Send email
    await client.send({
      from: `${from_name} <info@zanzibartravelhelper.com>`,
      to: to,
      subject: subject,
      content: "auto",
      html: html,
      replyTo: reply_to || from_email,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
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
