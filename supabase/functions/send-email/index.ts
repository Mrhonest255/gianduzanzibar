import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const ADMIN_EMAIL = "info@giandutoursandsafari.com";
const FROM_DOMAIN = "giandutoursandsafari.com";

interface EmailRequest {
  to?: string;
  subject: string;
  html: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
  customer_email?: string;
  customer_html?: string;
  customer_subject?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Received email request:", JSON.stringify(body, null, 2));
    
    const {
      to = ADMIN_EMAIL,
      subject,
      html,
      from_name = "Giandu Tours & Safari",
      reply_to,
      customer_email,
      customer_html,
      customer_subject,
    }: EmailRequest = body;

    // Check if API key is set
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set!");
      throw new Error("Email service not configured - API key missing");
    }

    console.log("Using API key:", RESEND_API_KEY.substring(0, 10) + "...");
    console.log("Sending to:", to);
    console.log("From:", `${from_name} <noreply@${FROM_DOMAIN}>`);

    // Send email to admin using Resend API with verified domain
    const adminEmailBody = {
      from: `${from_name} <noreply@${FROM_DOMAIN}>`,
      to: [to],
      subject: subject,
      html: html,
      reply_to: reply_to || ADMIN_EMAIL,
    };
    
    console.log("Admin email body:", JSON.stringify(adminEmailBody, null, 2));
    
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminEmailBody),
    });

    const data = await response.json();
    console.log("Resend API response:", JSON.stringify(data, null, 2));
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || data.error?.message || "Failed to send email");
    }

    // Send confirmation email to customer if provided
    let customerEmailResult = null;
    if (customer_email && customer_html) {
      console.log("Sending customer confirmation to:", customer_email);
      
      const customerEmailBody = {
        from: `${from_name} <noreply@${FROM_DOMAIN}>`,
        to: [customer_email],
        subject: customer_subject || "Thank you for your booking - Giandu Tours & Safari",
        html: customer_html,
        reply_to: ADMIN_EMAIL,
      };
      
      const customerResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerEmailBody),
      });

      customerEmailResult = await customerResponse.json();
      console.log("Customer email response:", JSON.stringify(customerEmailResult, null, 2));
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully", 
        adminEmail: data,
        customerEmail: customerEmailResult 
      }),
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
