-- Create site_settings table for admin-editable website configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public to read settings
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

-- Allow admins to update settings
CREATE POLICY "Admins can update site settings"
  ON public.site_settings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to insert settings
CREATE POLICY "Admins can insert site settings"
  ON public.site_settings
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default settings
INSERT INTO public.site_settings (key, value, label, description, category) VALUES
  ('company_name', 'Giandu Tours and Safari', 'Company Name', 'The main company name displayed on the website', 'company'),
  ('company_short_name', 'Giandu Tours', 'Short Name', 'Abbreviated company name', 'company'),
  ('company_phone', '+255620636827', 'Phone Number', 'Main contact phone number', 'contact'),
  ('company_whatsapp', '+255620636827', 'WhatsApp Number', 'WhatsApp contact number (without + for link)', 'contact'),
  ('company_email', 'info@giandutoursandsafari.com', 'Email Address', 'Main contact email', 'contact'),
  ('company_address', 'Stone Town, Zanzibar, Tanzania', 'Address', 'Physical business address', 'contact'),
  ('company_tagline', 'Discover Paradise with Every Journey', 'Tagline', 'Company slogan/tagline', 'company'),
  ('facebook_url', '', 'Facebook URL', 'Facebook page URL', 'social'),
  ('instagram_url', '', 'Instagram URL', 'Instagram profile URL', 'social'),
  ('tiktok_url', '', 'TikTok URL', 'TikTok profile URL', 'social'),
  ('tripadvisor_url', '', 'TripAdvisor URL', 'TripAdvisor page URL', 'social')
ON CONFLICT (key) DO NOTHING;
