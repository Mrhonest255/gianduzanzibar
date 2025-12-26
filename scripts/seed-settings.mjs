// Run with: node scripts/seed-settings.mjs
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fxypabukyazvdkserpjx.supabase.co';
// Get the service role key from Supabase Dashboard > Settings > API > service_role key
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Please set SUPABASE_SERVICE_ROLE_KEY environment variable');
  console.log('Get it from: Supabase Dashboard > Settings > API > service_role (secret)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seedSettings() {
  console.log('Deleting existing settings...');
  await supabase.from('site_settings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Inserting new settings...');
  const { data, error } = await supabase.from('site_settings').insert([
    { key: 'company_name', value: 'Giandu Tours and Safari', label: 'Company Name', description: 'The main company name displayed on the website', category: 'company' },
    { key: 'company_short_name', value: 'Giandu Tours', label: 'Short Name', description: 'Abbreviated company name', category: 'company' },
    { key: 'company_phone', value: '+255620636827', label: 'Phone Number', description: 'Main contact phone number', category: 'contact' },
    { key: 'company_whatsapp', value: '+255620636827', label: 'WhatsApp Number', description: 'WhatsApp contact number', category: 'contact' },
    { key: 'company_email', value: 'info@giandutoursandsafari.com', label: 'Email Address', description: 'Main contact email', category: 'contact' },
    { key: 'company_address', value: 'Stone Town, Zanzibar, Tanzania', label: 'Address', description: 'Physical business address', category: 'contact' },
    { key: 'company_tagline', value: 'Discover Paradise with Every Journey', label: 'Tagline', description: 'Company slogan/tagline', category: 'company' },
    { key: 'facebook_url', value: '', label: 'Facebook URL', description: 'Facebook page URL', category: 'social' },
    { key: 'instagram_url', value: '', label: 'Instagram URL', description: 'Instagram profile URL', category: 'social' },
    { key: 'tiktok_url', value: '', label: 'TikTok URL', description: 'TikTok profile URL', category: 'social' },
    { key: 'tripadvisor_url', value: '', label: 'TripAdvisor URL', description: 'TripAdvisor page URL', category: 'social' },
  ]).select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Settings inserted successfully!');
    console.log(data);
  }
}

seedSettings();
