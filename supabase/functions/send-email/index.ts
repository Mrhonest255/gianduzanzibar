import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "re_4RHs4yBN_JfDeFUyNP2C4NrDFexvBJMko";
const ADMIN_EMAIL = "info@giandutoursandsafari.com";
const FROM_DOMAIN = "giandutoursandsafari.com";

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
      to = ADMIN_EMAIL,
      subject,
      html,
      from_name = "Giandu Tours & Safari",
      reply_to,
    }: EmailRequest = await req.json();

    // Send email using Resend API with verified domain
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${from_name} <noreply@${FROM_DOMAIN}>`,
        to: [to],
        subject: subject,
        html: html,
        reply_to: reply_to || ADMIN_EMAIL,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", data }),
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
