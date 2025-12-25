-- Update all tours with complete details, descriptions, and SEO optimization

-- Safari Blue Full Day - €200
UPDATE tours SET 
  short_description = 'The ultimate Zanzibar beach adventure! Sail on traditional dhows, snorkel in crystal waters, spot dolphins, and feast on fresh seafood BBQ on a pristine sandbank.',
  long_description = 'Safari Blue is Zanzibar''s most iconic full-day excursion and the ultimate tropical paradise experience. Your adventure begins in Fumba village where you''ll board a traditional wooden dhow and sail through the stunning Menai Bay Conservation Area.

Throughout the day, you''ll:
• Snorkel in crystal-clear turquoise waters with vibrant coral reefs
• Swim with wild dolphins in their natural habitat
• Visit a pristine sandbank that appears at low tide
• Explore a mangrove lagoon and natural swimming pool
• Feast on a lavish seafood BBQ lunch with freshly caught fish, grilled lobster, calamari, and tropical fruits
• Relax on untouched beaches away from tourist crowds
• Learn about local marine life and Swahili sailing traditions

This is truly an unforgettable day that showcases the best of Zanzibar''s marine beauty.',
  includes = 'Hotel pickup and drop-off,Traditional dhow boat ride,Snorkeling equipment,Swimming with dolphins,Sandbank visit,Fresh seafood BBQ lunch,Tropical fruits,Soft drinks and water,Professional guide,Marine conservation fee',
  excludes = 'Alcoholic beverages,Tips for crew and guide,Personal expenses,Travel insurance',
  itinerary = '7:00 AM - Hotel pickup from your accommodation
8:30 AM - Arrive at Fumba village, board traditional dhow
9:00 AM - Sail through Menai Bay, dolphin spotting
10:30 AM - Snorkeling at coral reef sites
12:00 PM - Visit pristine sandbank
1:00 PM - Seafood BBQ lunch on the beach
2:30 PM - Swimming and relaxation
4:00 PM - Return sail to Fumba
5:30 PM - Hotel drop-off',
  what_to_bring = 'Swimwear,Sunscreen (reef-safe preferred),Sunglasses,Hat,Towel,Camera (waterproof recommended),Light cash for tips',
  pickup_info = 'Pickup is included from all hotels in Zanzibar. Stone Town hotels: 7:00 AM, North coast: 6:30 AM, East coast: 6:00 AM. Exact time will be confirmed upon booking.',
  is_featured = true
WHERE slug = 'safari-blue-full-day' OR title ILIKE '%safari blue%';

-- Stone Town + Prison Island Tour - €110
UPDATE tours SET 
  short_description = 'Explore UNESCO-listed Stone Town''s winding streets and historic sites, then sail to Prison Island to meet giant Aldabra tortoises.',
  long_description = 'Discover the rich history and culture of Zanzibar with this perfect combination tour that takes you through Stone Town''s fascinating heritage and to the famous Prison Island tortoise sanctuary.

Stone Town Walking Tour highlights:
• Former Slave Market & Anglican Cathedral - built on the site of the last slave market
• House of Wonders - the first building in East Africa with electricity and an elevator
• Old Fort (Ngome Kongwe) - 17th-century Arab fort with craft market
• Sultans Palace Museum - learn about Zanzibar''s royal history
• Forodhani Gardens - famous night food market location
• Narrow streets & carved doors - each door tells a story
• Darajani Market - vibrant local market experience

Prison Island (Changuu Island) highlights:
• Giant Aldabra tortoises - some over 100 years old
• Beautiful beach for swimming and snorkeling
• Historic prison ruins (never used as prison)
• Stunning views of Stone Town skyline
• Crystal clear waters perfect for relaxation',
  includes = 'Hotel pickup and drop-off,Boat transfer to Prison Island,Stone Town entrance fees,Prison Island entrance fee,Professional guide,Bottled water and soft drinks',
  excludes = 'Lunch,Tips for guide,Personal shopping,Travel insurance',
  itinerary = '9:00 AM - Hotel pickup
9:30 AM - Begin Stone Town walking tour
10:00 AM - Visit Slave Market and Cathedral
10:45 AM - House of Wonders and Palace Museum
11:30 AM - Explore narrow streets and markets
12:30 PM - Board boat to Prison Island
1:00 PM - Meet giant tortoises
1:45 PM - Beach time and swimming
3:00 PM - Return boat to Stone Town
3:30 PM - Hotel drop-off',
  what_to_bring = 'Comfortable walking shoes,Modest clothing (shoulders and knees covered for Stone Town),Sunscreen,Camera,Cash for tips and souvenirs',
  is_featured = true
WHERE slug = 'stone-town-prison-island-tour' OR title ILIKE '%stone town%prison%';

-- Spice Tour + Stone Town - €90
UPDATE tours SET 
  short_description = 'Experience why Zanzibar is called the Spice Island! Visit aromatic spice farms and explore the historic Stone Town in one memorable day.',
  long_description = 'Discover the aromatic heart of Zanzibar with this immersive tour that combines a traditional spice farm experience with Stone Town''s rich cultural heritage.

Spice Farm Experience:
• Walk through lush tropical spice plantations
• See, smell, and taste fresh spices: cloves, nutmeg, cinnamon, cardamom, vanilla, black pepper
• Learn about medicinal plants and their traditional uses
• Watch how spices are harvested and processed
• Taste fresh tropical fruits: jackfruit, durian, rambutan, mangoes
• Try fresh coconut water straight from the tree
• Traditional lunch with spice-infused dishes

Stone Town Walking Tour:
• UNESCO World Heritage Site exploration
• Historic architecture blending Arab, Indian, and European influences
• Famous carved Zanzibar doors
• Old Fort and House of Wonders
• Local markets and artisan shops
• Photo opportunities at iconic locations',
  includes = 'Hotel pickup and drop-off,Spice farm entrance fee,Fresh fruit tasting,Stone Town guided tour,Professional guide,Bottled water and soft drinks',
  excludes = 'Lunch,Tips,Personal purchases,Travel insurance',
  itinerary = '9:00 AM - Hotel pickup
10:00 AM - Arrive at spice farm
10:15 AM - Guided spice plantation walk
11:30 AM - Fruit tasting and spice shopping
12:30 PM - Drive to Stone Town
1:00 PM - Stone Town walking tour begins
3:00 PM - Free time for shopping or exploration
4:00 PM - Hotel drop-off',
  what_to_bring = 'Comfortable walking shoes,Modest clothing,Sunscreen,Camera,Cash for spice purchases and tips',
  is_featured = true
WHERE slug = 'spice-tour-stone-town' OR title ILIKE '%spice%stone%';

-- Nakupenda Sandbank + Prison Island - €200
UPDATE tours SET 
  short_description = 'Visit the magical disappearing Nakupenda sandbank for swimming and seafood lunch, plus meet the famous giant tortoises on Prison Island.',
  long_description = 'Experience the best of Zanzibar''s marine wonders with this full-day adventure combining two of the island''s most iconic destinations.

Prison Island (Changuu Island):
• Meet the famous Aldabra giant tortoises, some over 100 years old
• Feed and photograph these gentle giants
• Explore the historic prison ruins
• Swim in crystal-clear waters
• Enjoy beautiful views of Stone Town

Nakupenda Sandbank:
• Visit the famous "I Love You" sandbank (Nakupenda means "I love you" in Swahili)
• This pristine white sand paradise appears at low tide
• Swim in the calm, turquoise waters of the Indian Ocean
• Snorkel and explore marine life
• Relax under the tropical sun with starfish spotting
• Enjoy a delicious seafood BBQ lunch on the sandbank
• Fresh grilled fish, lobster, calamari, and tropical fruits

This is the ultimate romantic and relaxation experience!',
  includes = 'Hotel pickup and drop-off,Boat transfers,Prison Island entrance fee,Nakupenda access,Fresh seafood BBQ lunch,Tropical fruits,Bottled water and soft drinks,Professional guide',
  excludes = 'Alcoholic beverages,Tips,Travel insurance,Snorkeling equipment rental',
  itinerary = '8:30 AM - Hotel pickup
9:30 AM - Boat to Prison Island
10:00 AM - Visit giant tortoises and explore island
11:30 AM - Boat to Nakupenda Sandbank
12:00 PM - Swimming and relaxation
1:00 PM - Seafood BBQ lunch on the sandbank
2:30 PM - More swimming and snorkeling
4:00 PM - Return to Stone Town
4:30 PM - Hotel drop-off',
  what_to_bring = 'Swimwear,Sunscreen,Sunglasses,Towel,Waterproof camera,Cash for tips',
  is_featured = true
WHERE slug = 'nakupenda-prison-island-tour' OR title ILIKE '%nakupenda%';

-- Jozani Forest + Salaam Cave - €100
UPDATE tours SET 
  short_description = 'Meet the rare Red Colobus monkeys in Jozani National Park and explore the mysterious Kuza Cave with ancient stalactites.',
  long_description = 'Discover Zanzibar''s natural wonders with this unique combination of wildlife and geological exploration.

Jozani Chwaka Bay National Park:
• Home to the endemic Zanzibar Red Colobus monkey - found nowhere else on Earth
• Walk through ancient coral rag forest
• Spot blue monkeys, bushbabies, and Aders'' duiker
• Over 40 bird species including Fischer''s Turaco
• Walk the mangrove boardwalk through the intertidal forest
• Learn about conservation efforts protecting these endangered species
• Excellent photography opportunities with habituated monkey troops

Kuza Cave (Salaam Cave):
• Descend into this mysterious underground cave system
• Swim in the crystal-clear freshwater pool
• Marvel at ancient stalactites and stalagmites
• Learn about the cave''s cultural significance
• Enjoy the refreshing natural swimming pool
• Photo opportunities in this magical underground world

Perfect for nature lovers and adventure seekers!',
  includes = 'Hotel pickup and drop-off,Jozani National Park entrance fee,Cave entrance fee,Professional nature guide,Bottled water and soft drinks',
  excludes = 'Lunch,Tips,Swimwear for cave swimming,Travel insurance',
  itinerary = '9:00 AM - Hotel pickup
10:00 AM - Arrive at Jozani Forest
10:15 AM - Guided forest walk, monkey spotting
11:30 AM - Mangrove boardwalk experience
12:30 PM - Drive to Kuza Cave
1:00 PM - Cave exploration and swimming
2:30 PM - Return journey
3:30 PM - Hotel drop-off',
  what_to_bring = 'Comfortable walking shoes,Long pants recommended,Insect repellent,Camera,Swimwear for cave,Towel,Water shoes (optional)',
  is_featured = true
WHERE slug = 'jozani-forest-salaam-cave' OR title ILIKE '%jozani%';

-- Mnemba Island Dolphins & Snorkeling - €60
UPDATE tours SET 
  short_description = 'Swim with wild dolphins and snorkel the pristine coral reefs around Mnemba Atoll - Zanzibar''s premier marine sanctuary.',
  long_description = 'Experience one of East Africa''s most magical marine adventures at Mnemba Atoll, a protected marine conservation area with incredible biodiversity.

Dolphin Encounter:
• Search for pods of bottlenose and Indo-Pacific humpback dolphins
• Watch dolphins in their natural habitat
• Opportunity to swim alongside wild dolphins
• Professional guides ensure respectful wildlife interaction
• Early morning offers the best dolphin sightings

Mnemba Atoll Snorkeling:
• Crystal-clear visibility up to 30 meters
• Vibrant coral gardens with hundreds of fish species
• Spot sea turtles, octopus, and moray eels
• Colorful reef fish: angelfish, parrotfish, butterflyfish
• One of East Africa''s top snorkeling destinations
• Suitable for beginners and experienced snorkelers

Marine Life You May See:
• Dolphins, sea turtles, octopus
• Napoleonfish, groupers, barracuda
• Colorful tropical reef fish
• Beautiful hard and soft corals',
  includes = 'Hotel pickup and drop-off,Boat transfer to Mnemba,Snorkeling equipment,Life jackets,Professional guide,Bottled water,Marine park fee',
  excludes = 'Lunch,Tips,Underwater camera rental,Travel insurance',
  itinerary = '6:00 AM - Hotel pickup (early start for best dolphin sightings)
7:00 AM - Arrive at Nungwi beach, board boat
7:30 AM - Dolphin search and swimming
9:00 AM - Sail to Mnemba Atoll
9:30 AM - First snorkeling session
10:30 AM - Second snorkeling spot
11:30 AM - Return to shore
12:30 PM - Hotel drop-off',
  what_to_bring = 'Swimwear,Sunscreen,Towel,Underwater camera,Motion sickness medication if needed',
  is_featured = true
WHERE slug = 'mnemba-island-dolphins-snorkeling' OR title ILIKE '%mnemba%' OR title ILIKE '%dolphin%';

-- Sunset Cruise + Tortoise Aquarium - €60
UPDATE tours SET 
  short_description = 'Watch a spectacular Zanzibar sunset from a traditional dhow and visit the tortoise aquarium for an unforgettable evening.',
  long_description = 'End your day in paradise with this magical sunset experience combining marine life encounters with romantic dhow sailing.

Tortoise Aquarium Visit:
• See Aldabra giant tortoises up close
• Learn about tortoise conservation
• Feed and interact with the tortoises
• Perfect photo opportunities
• Educational experience for all ages

Traditional Dhow Sunset Cruise:
• Board an authentic Zanzibari wooden dhow
• Sail along the historic Stone Town waterfront
• Watch the sun set over the Indian Ocean
• See Stone Town''s skyline painted in golden light
• Traditional sailing experience
• Refreshments served on board
• Perfect romantic experience or group activity

The Zanzibar sunset is legendary - watch as the sky transforms into brilliant oranges, pinks, and purples while you sail on calm waters.',
  includes = 'Hotel pickup and drop-off,Tortoise aquarium entrance,Dhow cruise,Refreshments on board,Professional guide',
  excludes = 'Dinner,Alcoholic beverages,Tips,Travel insurance',
  itinerary = '4:00 PM - Hotel pickup
4:30 PM - Visit Tortoise Aquarium
5:15 PM - Board traditional dhow
5:30 PM - Sunset cruise begins
6:30 PM - Watch sunset over Indian Ocean
7:00 PM - Return to shore
7:30 PM - Hotel drop-off',
  what_to_bring = 'Camera,Light jacket (can be breezy),Sunglasses,Cash for tips',
  is_featured = true
WHERE slug = 'sunset-cruise-tortoise-aquarium' OR title ILIKE '%sunset%';

-- Mtende Beach + The Rock Restaurant - €120
UPDATE tours SET 
  short_description = 'Visit the stunning Mtende Beach and see the famous The Rock Restaurant - Zanzibar''s most iconic dining spot perched on a rock in the sea.',
  long_description = 'Discover the southeastern coast of Zanzibar with this scenic tour to one of the island''s most beautiful beaches and Instagram-famous landmarks.

Mtende Beach:
• One of Zanzibar''s most beautiful and pristine beaches
• Soft white sand and turquoise waters
• Less crowded than northern beaches
• Perfect for swimming and photography
• Traditional fishing village atmosphere
• Watch local fishermen at work

The Rock Restaurant:
• Zanzibar''s most iconic landmark
• Restaurant built on a rock in the Indian Ocean
• Walk to it at low tide, boat at high tide
• World-famous for unique location
• Photo opportunities from the beach
• Option to dine (meals not included in tour price)
• Featured in numerous travel magazines

Scenic Coastal Drive:
• Drive through local villages
• See seaweed farming operations
• Traditional Zanzibari architecture
• Beautiful coastal scenery
• Photography stops along the way',
  includes = 'Hotel pickup and drop-off,Professional guide,Bottled water and soft drinks',
  excludes = 'Meals at The Rock Restaurant (can be arranged),Beach activities,Tips,Travel insurance',
  itinerary = '10:00 AM - Hotel pickup
11:30 AM - Arrive at Mtende Beach area
11:45 AM - View The Rock Restaurant
12:30 PM - Beach time at Mtende
2:00 PM - Optional lunch (own expense)
3:30 PM - Begin return journey
5:00 PM - Hotel drop-off',
  what_to_bring = 'Swimwear,Sunscreen,Camera,Cash for lunch at The Rock (if desired),Towel',
  is_featured = false
WHERE slug = 'mtende-beach-rock-restaurant' OR title ILIKE '%mtende%' OR title ILIKE '%rock%';
