-- Ensure all tours have proper categories

-- Safari Blue - Beach/Adventure
UPDATE tours SET category = 'Beach'
WHERE slug = 'safari-blue-full-day' OR title ILIKE '%safari blue%' AND category IS NULL;

-- Stone Town + Prison Island - Cultural
UPDATE tours SET category = 'Cultural'
WHERE (slug = 'stone-town-prison-island-tour' OR title ILIKE '%stone town%prison%') AND category IS NULL;

-- Spice Tour + Stone Town - Cultural
UPDATE tours SET category = 'Cultural'
WHERE (slug = 'spice-tour-stone-town' OR title ILIKE '%spice%') AND category IS NULL;

-- Jozani Forest - Nature
UPDATE tours SET category = 'Nature'
WHERE (slug = 'jozani-forest-tour' OR title ILIKE '%jozani%') AND category IS NULL;

-- Mnemba Island - Adventure
UPDATE tours SET category = 'Adventure'
WHERE (slug = 'mnemba-island-dolphins-snorkeling' OR title ILIKE '%mnemba%' OR title ILIKE '%dolphin%') AND category IS NULL;

-- Sunset Cruise - Beach
UPDATE tours SET category = 'Beach'
WHERE (slug = 'sunset-cruise-tortoise-aquarium' OR title ILIKE '%sunset%') AND category IS NULL;

-- Mtende Beach + Rock Restaurant - Beach
UPDATE tours SET category = 'Beach'
WHERE (slug = 'mtende-beach-rock-restaurant' OR title ILIKE '%mtende%' OR title ILIKE '%rock%') AND category IS NULL;

-- Nungwi Beach - Beach
UPDATE tours SET category = 'Beach'
WHERE (title ILIKE '%nungwi%' OR title ILIKE '%beach%') AND category IS NULL;

-- Any remaining tours without category, default to Adventure
UPDATE tours SET category = 'Adventure'
WHERE category IS NULL;

-- Update tours that still have empty short descriptions with generic text based on title
UPDATE tours SET 
  short_description = 'Experience an unforgettable adventure in Zanzibar with our expert local guides. Discover the beauty and culture of this tropical paradise.'
WHERE short_description IS NULL OR short_description = '';

UPDATE tours SET 
  long_description = 'Join us for this amazing Zanzibar experience! Our professional guides will take you on a journey through the best that the island has to offer. With small group sizes and personalized attention, you''ll have an unforgettable time exploring the beauty, culture, and natural wonders of Zanzibar.

What to expect:
• Expert local guides who know every hidden gem
• Small group experience for personalized attention
• Comfortable transportation
• All entrance fees included
• Pickup and drop-off from your hotel

This tour is perfect for travelers who want to experience authentic Zanzibar while enjoying comfort and convenience.'
WHERE long_description IS NULL OR long_description = '';

UPDATE tours SET 
  includes = 'Hotel pickup and drop-off,Professional guide,Entrance fees,Bottled water'
WHERE includes IS NULL OR includes = '';

UPDATE tours SET 
  excludes = 'Personal expenses,Tips for guide,Travel insurance,Lunch (unless specified)'
WHERE excludes IS NULL OR excludes = '';

UPDATE tours SET 
  what_to_bring = 'Comfortable clothing,Sunscreen,Camera,Cash for tips and souvenirs'
WHERE what_to_bring IS NULL OR what_to_bring = '';

UPDATE tours SET 
  pickup_info = 'Pickup is included from all hotels in Zanzibar. Exact pickup time will be confirmed upon booking, typically 1-2 hours before tour start.'
WHERE pickup_info IS NULL OR pickup_info = '';
