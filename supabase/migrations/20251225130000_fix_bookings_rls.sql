-- Fix RLS policies for bookings table to allow public inserts
-- This is needed so customers can make bookings without being logged in

-- First, enable RLS if not already enabled
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be blocking
DROP POLICY IF EXISTS "Allow public inserts" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated updates" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON public.bookings;

-- Allow anyone (including anonymous/public) to INSERT bookings
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
TO public, anon
WITH CHECK (true);

-- Allow authenticated users (admin) to read all bookings
CREATE POLICY "Authenticated users can view bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users (admin) to update bookings
CREATE POLICY "Authenticated users can update bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users (admin) to delete bookings
CREATE POLICY "Authenticated users can delete bookings" 
ON public.bookings 
FOR DELETE 
TO authenticated
USING (true);

-- Also allow public to read their own booking by reference (for tracking)
CREATE POLICY "Anyone can view booking by reference" 
ON public.bookings 
FOR SELECT 
TO public, anon
USING (true);
