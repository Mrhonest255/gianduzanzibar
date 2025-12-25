-- Update existing tours with correct prices and add new tours
-- Run this migration to update the tours database

-- ====== UPDATE EXISTING ZANZIBAR TOURS ======

-- Safari Blue - €200 per person (updated from €60)
UPDATE tours SET 
  price = 200,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks,Lunch (sea food),Fruit'
WHERE slug LIKE '%safari-blue%' OR title ILIKE '%safari blue%';

-- Prison Island - €70 per person
UPDATE tours SET 
  price = 70,
  currency = 'EUR'
WHERE slug LIKE '%prison-island%' OR title ILIKE '%prison island%';

-- Mnemba Island / Dolphins - €60 per person
UPDATE tours SET 
  price = 60,
  currency = 'EUR'
WHERE slug LIKE '%mnemba%' OR title ILIKE '%mnemba%' OR title ILIKE '%dolphin%';

-- Stone Town + Spice - €60 per person
UPDATE tours SET 
  price = 60,
  currency = 'EUR'
WHERE (slug LIKE '%stone-town%' OR title ILIKE '%stone town%') AND (slug LIKE '%spice%' OR title ILIKE '%spice%');

-- Nakupenda + Prison Island - €65 per person
UPDATE tours SET 
  price = 65,
  currency = 'EUR'
WHERE (slug LIKE '%nakupenda%' OR title ILIKE '%nakupenda%') AND (slug LIKE '%prison%' OR title ILIKE '%prison%');

-- Jozani Forest + Salaam Cave - €75 per person
UPDATE tours SET 
  price = 75,
  currency = 'EUR'
WHERE slug LIKE '%jozani%' OR title ILIKE '%jozani%';

-- ====== INSERT NEW ZANZIBAR TOURS ======

-- Stone Town + Prison Island Tour
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Stone Town + Prison Island Tour',
  'stone-town-prison-island-tour',
  'Cultural',
  'Stone Town, Zanzibar',
  6,
  110,
  'EUR',
  'Explore the historic Stone Town and visit Prison Island with its giant tortoises. A perfect combination of culture and nature.',
  'This combined tour takes you through the winding streets of Stone Town, a UNESCO World Heritage site, followed by a boat trip to Prison Island. Explore the former slave market, the Anglican Cathedral, local markets, and historic buildings. Then sail to Prison Island to meet the giant Aldabra tortoises and enjoy the beautiful beach.',
  'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks',
  'Personal expenses,Tips',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 110,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks';

-- Spice Tour + Stone Town
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Spice Tour + Stone Town',
  'spice-tour-stone-town',
  'Cultural',
  'Stone Town, Zanzibar',
  6,
  90,
  'EUR',
  'Discover why Zanzibar is called the Spice Island and explore the historic Stone Town in one memorable tour.',
  'Begin your day at a traditional spice farm where you''ll learn about and taste various spices including cloves, nutmeg, cinnamon, vanilla, and more. After the spice tour, explore Stone Town''s rich history, visiting the Old Fort, House of Wonders, and the narrow streets filled with history.',
  'Transport go and return,Tickets for entrance,Fruit tasting,Tour guide,Soft drinks',
  'Personal expenses,Tips',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 90,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Fruit tasting,Tour guide,Soft drinks';

-- Nakupenda Sandbank + Prison Island
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Nakupenda Sandbank + Prison Island',
  'nakupenda-prison-island-tour',
  'Beach',
  'Zanzibar',
  8,
  200,
  'EUR',
  'Visit the stunning Nakupenda sandbank for swimming and seafood lunch, combined with Prison Island tortoise sanctuary.',
  'Experience the best of Zanzibar''s marine adventures with this full-day tour. Visit Prison Island to meet the famous giant tortoises, then sail to the magical Nakupenda sandbank - a pristine stretch of white sand that emerges during low tide. Enjoy snorkeling in crystal-clear waters and a delicious seafood barbecue lunch on the beach.',
  'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks,Lunch (sea food),Fruit',
  'Personal expenses,Tips,Alcoholic beverages',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 200,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks,Lunch (sea food),Fruit';

-- Safari Blue Full Day
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Safari Blue Full Day',
  'safari-blue-full-day',
  'Beach',
  'Fumba, Zanzibar',
  8,
  200,
  'EUR',
  'The ultimate Zanzibar beach experience with snorkeling, sailing, and seafood feast on a pristine sandbank.',
  'Safari Blue is Zanzibar''s most popular boat excursion! Sail on a traditional dhow through the Menai Bay Conservation Area, snorkel in crystal-clear waters, spot dolphins, and visit a pristine sandbank. Enjoy a sumptuous seafood barbecue lunch with fresh fish, lobster, and tropical fruits on the beach.',
  'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks,Lunch (sea food),Fruit',
  'Personal expenses,Tips,Alcoholic beverages',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 200,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks,Lunch (sea food),Fruit';

-- Jozani Forest + Salaam Cave
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Jozani Forest + Salaam Cave',
  'jozani-forest-salaam-cave',
  'Nature',
  'Jozani, Zanzibar',
  5,
  100,
  'EUR',
  'Meet the rare Red Colobus monkeys in Jozani Forest and explore the mysterious Salaam Cave.',
  'Visit Jozani Chwaka Bay National Park, home to the endemic Zanzibar Red Colobus monkeys. Walk through the ancient forest, learn about local flora and fauna, then discover the mystical Salaam Cave with its unique geological formations.',
  'Transport go and return,Tickets for entrance,Tour guide,Soft drinks',
  'Personal expenses,Tips',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 100,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Tour guide,Soft drinks';

-- Sunset Cruise + Tortoise Aquarium
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Sunset Cruise + Tortoise Aquarium',
  'sunset-cruise-tortoise-aquarium',
  'Beach',
  'Stone Town, Zanzibar',
  4,
  60,
  'EUR',
  'Watch a magical Zanzibar sunset from a traditional dhow and visit the tortoise aquarium.',
  'Experience the romance of Zanzibar with a sunset cruise on a traditional wooden dhow. Watch the sun paint the sky in brilliant colors as you sail along the coast. Before the cruise, visit the tortoise aquarium to see these gentle giants up close.',
  'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks',
  'Personal expenses,Tips',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 60,
  currency = 'EUR',
  includes = 'Transport go and return,Tickets for entrance,Boat fee,Tour guide,Soft drinks';

-- Mtende Beach + The Rock Restaurant
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Mtende Beach + The Rock Restaurant',
  'mtende-beach-rock-restaurant',
  'Beach',
  'Michamvi, Zanzibar',
  6,
  120,
  'EUR',
  'Visit the beautiful Mtende Beach and the famous The Rock Restaurant perched on a rock in the sea.',
  'Travel to the stunning southeastern coast of Zanzibar to visit Mtende Beach with its pristine white sand and turquoise waters. See (and optionally dine at) The Rock Restaurant - one of Zanzibar''s most iconic landmarks, a restaurant built on a rock in the middle of the ocean.',
  'Transport go and return,Tour guide,Soft drinks',
  'Meals at The Rock Restaurant,Personal expenses,Tips',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 120,
  currency = 'EUR',
  includes = 'Transport go and return,Tour guide,Soft drinks';

-- Mnemba Island Dolphins & Snorkeling
INSERT INTO tours (title, slug, category, location, duration_hours, price, currency, short_description, long_description, includes, excludes, is_featured, is_active)
VALUES (
  'Mnemba Island Dolphins & Snorkeling',
  'mnemba-island-dolphins-snorkeling',
  'Adventure',
  'Mnemba, Zanzibar',
  6,
  60,
  'EUR',
  'Swim with wild dolphins and snorkel in the crystal-clear waters around Mnemba Island.',
  'Experience one of Zanzibar''s most exciting adventures! Sail to Mnemba Atoll where you''ll have the chance to swim with wild dolphins in their natural habitat. Snorkel in the protected marine reserve with colorful coral reefs and tropical fish.',
  'Transport go and return,Boat fee,Snorkeling equipment,Tour guide,Soft drinks',
  'Personal expenses,Tips,Lunch',
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  price = 60,
  currency = 'EUR';
