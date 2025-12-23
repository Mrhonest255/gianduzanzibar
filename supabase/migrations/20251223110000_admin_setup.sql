-- Function to handle new user signup and assign admin role if email matches
CREATE OR REPLACE FUNCTION public.handle_new_user_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user's email is admin@admin.com
  IF NEW.email = 'admin@admin.com' THEN
    -- Insert into user_roles table
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run the function on user creation in auth.users
-- Note: We need to be careful with triggers on auth.users. 
-- Usually, it's better to trigger on public.profiles if you have one, 
-- but since user_roles is separate, we can use auth.users.
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin_role();

-- Also, if the user already exists, let's try to add them now
-- This will only work if the user is already in auth.users
DO $$
DECLARE
  admin_id UUID;
BEGIN
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@admin.com';
  IF admin_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;
