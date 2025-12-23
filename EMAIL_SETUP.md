# Email Setup Instructions for Zanzibar Vibe Tours

## Overview
This project uses a Supabase Edge Function to securely send emails via SMTP. Your credentials are stored as environment variables, never exposed in the frontend code.

## Setup Steps

### 1. Install Supabase CLI (if not installed)
```bash
npm install -g supabase
```

### 2. Login to Supabase
```bash
supabase login
```

### 3. Link Your Project
```bash
cd zanzibar-vibe-tours-main
supabase link --project-ref YOUR_PROJECT_REF
```
(Find your project ref in your Supabase dashboard URL: `https://app.supabase.com/project/YOUR_PROJECT_REF`)

### 4. Set Environment Variables (Secrets)
Run these commands to securely store your SMTP credentials:

```bash
supabase secrets set SMTP_HOST=mail.spacemail.com
supabase secrets set SMTP_PORT=465
supabase secrets set SMTP_USER=info@zanzibartravelhelper.com
supabase secrets set SMTP_PASS=YOUR_PASSWORD_HERE
supabase secrets set ADMIN_EMAIL=info@zanzibartravelhelper.com
```

⚠️ **IMPORTANT**: Replace `YOUR_PASSWORD_HERE` with your actual password. Never commit passwords to git!

### 5. Deploy the Edge Function
```bash
supabase functions deploy send-email
```

### 6. Verify Deployment
Test the function in your Supabase dashboard under "Edge Functions"

## How It Works

1. **Contact Form Submission**:
   - Message saved to `messages` table in Supabase
   - Email sent to admin (info@zanzibartravelhelper.com)
   - Auto-reply sent to customer

2. **Booking Submission**:
   - Booking saved to `bookings` table in Supabase
   - Booking notification sent to admin
   - Confirmation email sent to customer with booking details

## Troubleshooting

### Function not working?
1. Check Edge Function logs in Supabase Dashboard
2. Verify secrets are set: `supabase secrets list`
3. Make sure CORS is configured for your domain

### Emails not sending?
1. Verify SMTP credentials are correct
2. Check if your email provider requires app-specific passwords
3. Some providers block logins from new locations - check your email for security alerts

## Security Notes
- ✅ Credentials stored as Supabase secrets (encrypted)
- ✅ Never exposed in frontend code
- ✅ Edge Function runs server-side
- ⚠️ Change your password since it was shared in chat
