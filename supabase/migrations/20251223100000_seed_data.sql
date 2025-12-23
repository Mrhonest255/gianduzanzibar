-- Seed Tours and Images

-- Clear existing data to avoid duplicates if re-run
TRUNCATE public.tour_images CASCADE;
TRUNCATE public.tours CASCADE;

-- Insert Tours
INSERT INTO public.tours (id, title, slug, category, location, duration_hours, price, is_featured, is_active) VALUES
('a1b1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'Safari Blue Full Day Experience', 'safari-blue-full-day', 'Adventure', 'Fumba', 8, 70, true, true),
('a2b2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'Nakupenda Sandbank Tour', 'nakupenda-sandbank', 'Beach', 'Stone Town', 6, 60, true, true),
('a3b3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'Mnemba Island Snorkeling', 'mnemba-island-snorkeling', 'Nature', 'Nungwi', 5, 45, true, true),
('a4b4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'Stone Town Private Walking Tour', 'stone-town-private-walking', 'Cultural', 'Stone Town', 3, 30, false, true),
('a5b5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'Jozani Forest Tour', 'jozani-forest-tour', 'Nature', 'Jozani', 3, 35, false, true),
('a6b6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'Prison Island Tour', 'prison-island-tour', 'Cultural', 'Stone Town', 3, 30, false, true),
('a7b7c7d7-e7f7-47a7-b7c7-d7e7f7a7b7c7', 'Dolphin Tour Kizimkazi', 'dolphin-tour-kizimkazi', 'Adventure', 'Kizimkazi', 4, 50, false, true),
('a8b8c8d8-e8f8-48a8-b8c8-d8e8f8a8b8c8', 'Spice Tour', 'spice-tour', 'Cultural', 'Kizimbani', 3, 25, false, true),
('a9b9c9d9-e9f9-49a9-b9c9-d9e9f9a9b9c9', 'Nungwi & Kendwa Beach Tour', 'nungwi-kendwa-beach', 'Beach', 'Nungwi', 8, 40, false, true),
('b1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'Nungwi Beach & Cooking Class Tour', 'nungwi-beach-cooking-class', 'Cultural', 'Nungwi', 6, 55, false, true),
('b2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'Quad Bike Adventure in Zanzibar', 'quad-bike-adventure', 'Adventure', 'Pwani Mchangani', 4, 80, true, true),
('b3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'Kuza Cave Adventure', 'kuza-cave-adventure', 'Adventure', 'Jambiani', 3, 30, false, true),
('b4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'Mtende Secret Beach', 'mtende-secret-beach', 'Beach', 'Mtende', 5, 40, false, true),
('b5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'Village Cultural Tour', 'village-cultural-tour', 'Cultural', 'Nungwi', 4, 30, false, true),
('b6a6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'Maalum Cave Exploration', 'maalum-cave-exploration', 'Adventure', 'Paje', 3, 40, false, true),
('c1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'Jozani + Spice Farm + Stone Town Tour', 'jozani-spice-stone-town', 'Package', 'Multiple', 9, 110, true, true),
('c2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'Salam Cave + Jozani Forest + Spice Farm', 'salam-cave-jozani-spice', 'Package', 'Multiple', 8, 100, false, true),
('c3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'Prison Island + Nakupenda Sandbank', 'prison-island-nakupenda', 'Package', 'Stone Town', 7, 90, true, true),
('c4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'Stone Town + Prison Island + Jozani Forest', 'stone-town-prison-jozani', 'Package', 'Multiple', 9, 105, false, true),
('d1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'Selous Game Reserve Safari', 'selous-game-reserve-safari', 'Safari', 'Selous', 48, 450, true, true),
('d2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'Mikumi National Park Safari', 'mikumi-national-park-safari', 'Safari', 'Mikumi', 24, 350, true, true),
('d3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'Serengeti National Park Safari', 'serengeti-national-park-safari', 'Safari', 'Serengeti', 72, 850, true, true),
('d4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'Ngorongoro Crater Day Trip', 'ngorongoro-crater-day-trip', 'Safari', 'Ngorongoro', 12, 400, false, true),
('d5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'Mikumi National Park Full-Day Tour from Dar es Salaam', 'mikumi-full-day-dar', 'Safari', 'Mikumi', 14, 250, false, true);

-- Insert Tour Images
INSERT INTO public.tour_images (tour_id, path, sort_order) VALUES
-- Safari Blue
('a1b1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b3/b1/c3/the-original-safari-blue.jpg?w=1200&h=900&s=1', 0),
('a1b1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHJGlwh-SzvJN5vP51hsISJsFyR8BKmZqnA&s', 1),
('a1b1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg', 2),
-- Nakupenda
('a2b2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg', 0),
('a2b2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://zanzibarstartours.net/wp-content/uploads/2023/06/Screenshot1686934046054.jpg', 1),
('a2b2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://zanzibarstartours.net/wp-content/uploads/2023/06/Screenshot1686934031246.jpg', 2),
-- Mnemba
('a3b3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/7d/42/caption.jpg?w=1200&h=-1&s=1', 0),
('a3b3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGBXPgIR-ampNqlEGIwxP3_8t2EXLEiaPjQ&s', 1),
('a3b3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg', 2),
-- Stone Town
('a4b4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1', 0),
('a4b4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/32/a7/81/caption.jpg?w=500&h=400&s=1', 1),
('a4b4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://travel-buddies.com/wp-content/uploads/2024/11/1_private-city-tour-in-stone-town.jpg', 2),
-- Jozani
('a5b5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/11/tour_gallery_42.jpg', 0),
('a5b5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg', 1),
('a5b5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://images.pexels.com/photos/4577816/pexels-photo-4577816.jpeg', 2),
-- Prison Island
('a6b6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/8a/85/05.jpg', 0),
('a6b6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/fb/f4/56/prison-island.jpg?w=500&h=300&s=1', 1),
('a6b6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island_01.jpg', 2),
-- Dolphin
('a7b7c7d7-e7f7-47a7-b7c7-d7e7f7a7b7c7', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf9J7jUoEO5ifwNmFYgtvytKTNw9bkVnfgA&s', 0),
('a7b7c7d7-e7f7-47a7-b7c7-d7e7f7a7b7c7', 'https://zanzibarworld.com/wp-content/uploads/2021/01/boat-rentals-kizimkazi-mtendeni-zanzibar-central-south-region-processed.jpg', 1),
('a7b7c7d7-e7f7-47a7-b7c7-d7e7f7a7b7c7', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', 2),
-- Spice
('a8b8c8d8-e8f8-48a8-b8c8-d8e8f8a8b8c8', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s', 0),
('a8b8c8d8-e8f8-48a8-b8c8-d8e8f8a8b8c8', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXq6ijO6Z7EfDCQlCBo1eiTyNPyn3cQUxbA&s', 1),
('a8b8c8d8-e8f8-48a8-b8c8-d8e8f8a8b8c8', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51ofb8BalKEKkZxJUsL88B9pU3YOwGwWGcw&s', 2),
-- Nungwi & Kendwa
('a9b9c9d9-e9f9-49a9-b9c9-d9e9f9a9b9c9', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/d8/e4/cd.jpg', 0),
('a9b9c9d9-e9f9-49a9-b9c9-d9e9f9a9b9c9', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/92/41/82.jpg', 1),
('a9b9c9d9-e9f9-49a9-b9c9-d9e9f9a9b9c9', 'https://images.pexels.com/photos/1074448/pexels-photo-1074448.jpeg', 2),
-- Nungwi & Cooking
('b1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://cdn.getyourguide.com/img/tour/9f979c2ea6578e2463452c93c0c1bb07833a9fb3c70ede80c9f9dc0a0ede8f1d.jpg/146.jpg', 0),
('b1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://www.easytravel.co.tz/wp-content/uploads/2023/06/Nungwi-Beach-Zanzibar.jpg', 1),
('b1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://images.pexels.com/photos/1074448/pexels-photo-1074448.jpeg', 2),
-- Quad Bike
('b2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GaFVE4bGqH31qTYYT2J6AY_nrtx8ArhMcQ&s', 0),
('b2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://tuliazanzibar.com/wp-content/uploads/2019/09/01222E32A478423CB60DBA681674DE77.jpg', 1),
('b2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg', 2),
-- Kuza Cave
('b3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s', 0),
('b3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0f/84/ce/fc.jpg', 1),
('b3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://www.travelnotesonline.com/wp-content/uploads/2019/11/img_20190908_123604-scaled.jpg', 2),
-- Mtende
('b4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_TkBZtFnm3ZbSGJfshMoK6nUXVsrk1QLMw&s', 0),
('b4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://static.wixstatic.com/media/646042_0fafc3060fdb405c8e350eac60693e1d~mv2.jpg/v1/fill/w_187,h_187,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mtende-beach.jpg', 1),
('b4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://cdn.getyourguide.com/img/tour/c94e8969f6279020b91e41f1ee15315ef44395c11a40fb9a3f5d8cb566f249a1.jpg/146.jpg', 2),
-- Village
('b5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://zanzibarleisuretours.co.tz/wp-content/uploads/2020/11/villagetour2.jpg', 0),
('b5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://zanzibarstartours.net/wp-content/uploads/2018/11/102.jpg', 1),
('b5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://minneriyasafari.com/wp-content/uploads/2023/08/Sigiriya_Village_Tour-600x600.jpg', 2),
-- Maalum
('b6a6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'https://zanzibarstartours.net/wp-content/uploads/2023/10/1000029754-scaled.jpg', 0),
('b6a6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'https://maalumzanzibar.com/images/instagram-2.jpg', 1),
('b6a6c6d6-e6f6-46a6-b6c6-d6e6f6a6b6c6', 'https://worldoflina.com/wp-content/uploads/2024/09/DSC_0789-1-850x680.jpg', 2),
-- Jozani + Spice + Stone Town
('c1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg', 0),
('c1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s', 1),
('c1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/30/34/de/caption.jpg?w=500&h=400&s=1', 2),
-- Salam Cave + Jozani + Spice
('c2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrxPEFPBN4oGZZrFszPYMh3udN4LesvE2Yw&s', 0),
('c2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://www.exploretanzaniatours.com/wp-content/uploads/2022/02/Jozani-Chwaka-Bay-National-park.jpg', 1),
('c2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LOjo6A1pvnvysGaS_pMeZGYCzYT6VjAoxg&s', 2),
-- Prison Island + Nakupenda
('c3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://cdn.getyourguide.com/img/location/5c4def5d967c6.jpeg/99.jpg', 0),
('c3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island.jpg', 1),
('c3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/dc/04/45.jpg', 2),
-- Stone Town + Prison + Jozani
('c4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://serengetinationalparksafaris.com/wp-content/uploads/2022/10/Stone-Town-Zanzibar-zanzibar-tourists-800x450-1-750x450.jpg', 0),
('c4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://www.tanzaniatourism.com/images/uploads/Zanzibar_Prison_Island.jpg', 1),
('c4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/eb/2c/52/jozan-forest-is-a-national.jpg?w=900&h=500&s=1', 2),
-- Selous
('d1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrpXhIynX1HELPZ7J5Ei-Ezzk6SSmO-jsVw&s', 0),
('d1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://www.tanzaniaodyssey.com/site/odyssey-image-proxy/park/selous=401199-320.jpg', 1),
('d1a1c1d1-e1f1-41a1-b1c1-d1e1f1a1b1c1', 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg', 2),
-- Mikumi
('d2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://www.lakemanyaranationalparks.com/wp-content/uploads/2023/06/M6-1.jpg', 0),
('d2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://www.leopard-tours.com/wp-content/uploads/2015/12/Mikumi-National-Park-4-1024x680.jpg', 1),
('d2a2c2d2-e2f2-42a2-b2c2-d2e2f2a2b2c2', 'https://images.pexels.com/photos/3046582/pexels-photo-3046582.jpeg', 2),
-- Serengeti
('d3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png', 0),
('d3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://www.greatadventuresafaris.com/wp-content/uploads/Safaro-tours-to-serengeti-national-park.jpg', 1),
('d3a3c3d3-e3f3-43a3-b3c3-d3e3f3a3b3c3', 'https://roamwildadventure.com/wp-content/uploads/2021/02/5-day-safari-tarangire-ngorongoro-serengeti-manyara-olduvai-gallery-09-blurred-1-1024x654.jpg', 2),
-- Ngorongoro
('d4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg', 0),
('d4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://abundadiscoveriesuganda.com/wp-content/uploads/2025/01/Ngorongoro-National-Park-Tanzania-by-Licious-Adventure-%E2%80%94-YouPic.jpg', 1),
('d4a4c4d4-e4f4-44a4-b4c4-d4e4f4a4b4c4', 'https://www.discoverafrica.com/wp-content/uploads/2019/06/iStock-536747875.jpg', 2),
-- Mikumi from Dar
('d5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg', 0),
('d5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://www.focuseastafricatours.com/wp-content/uploads/Mikumi-National-Park-1.jpg', 1),
('d5a5c5d5-e5f5-45a5-b5c5-d5e5f5a5b5c5', 'https://www.leopard-tours.com/wp-content/uploads/2015/12/Mikumi-National-Park-4-1024x680.jpg', 2);
