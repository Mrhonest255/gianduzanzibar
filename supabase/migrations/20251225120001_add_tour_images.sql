-- Add tour images for all tours

-- First, get tour IDs and insert images
-- Run this after the tours are created

-- Safari Blue Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/e66e9a6fc6198a98.jpeg/146.jpg', 'Safari Blue dhow sailing', 0
FROM tours WHERE slug = 'safari-blue-full-day' OR title ILIKE '%safari blue%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://zanzibardestination.co.tz/wp-content/uploads/2024/09/zanzibar-safari-blue-by-dhow-trip-at-kwale-island-4124198-1.webp', 'Safari Blue beach lunch', 1
FROM tours WHERE slug = 'safari-blue-full-day' OR title ILIKE '%safari blue%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/9960720a9a8b6f64ce0d633a8b1b61b5d1389fb24b3f67056f9f7af7b1859574.jpg/146.jpg', 'Safari Blue snorkeling', 2
FROM tours WHERE slug = 'safari-blue-full-day' OR title ILIKE '%safari blue%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://zanzibarworld.com/wp-content/uploads/2022/11/9b.jpg', 'Safari Blue sandbank', 3
FROM tours WHERE slug = 'safari-blue-full-day' OR title ILIKE '%safari blue%' LIMIT 1;

-- Stone Town Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://www.arcadiasafaris.com/wp-content/uploads/2025/01/Former-Slave-Market-Zanzibar.png', 'Stone Town slave market memorial', 0
FROM tours WHERE slug LIKE '%stone-town%' OR title ILIKE '%stone town%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://thumbs.dreamstime.com/b/anglican-cathedral-christ-church-stone-town-zanzibar-tanzania-mkunazini-road-was-built-end-th-century-edward-63669740.jpg', 'Stone Town Cathedral', 1
FROM tours WHERE slug LIKE '%stone-town%' OR title ILIKE '%stone town%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://migrationology.smugmug.com/Blog-Posts/i-Xxx9WFS/0/X2/zanzibar-pictures-11-X2.jpg', 'Stone Town narrow streets', 2
FROM tours WHERE slug LIKE '%stone-town%' OR title ILIKE '%stone town%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Darajani_Market.jpg', 'Darajani Market Stone Town', 3
FROM tours WHERE slug LIKE '%stone-town%' OR title ILIKE '%stone town%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://c8.alamy.com/comp/KW6G5X/fish-department-on-local-food-market-in-stone-townunesco-world-heritage-KW6G5X.jpg', 'Stone Town fish market', 4
FROM tours WHERE slug LIKE '%stone-town%' OR title ILIKE '%stone town%' LIMIT 1;

-- Mnemba Island Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://www.focuseastafricatours.com/wp-content/uploads/zanzibar-snorkelling_1.jpg', 'Mnemba snorkeling', 0
FROM tours WHERE slug LIKE '%mnemba%' OR title ILIKE '%mnemba%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://zanzibarstartours.net/wp-content/uploads/2022/09/FB_IMG_1664123452179.jpg', 'Mnemba dolphins', 1
FROM tours WHERE slug LIKE '%mnemba%' OR title ILIKE '%mnemba%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.tripspoint.com/uploads/photos/11042/dolphin-watching-swimming-and-snorkeling_jpkjX.jpeg', 'Dolphin watching Mnemba', 2
FROM tours WHERE slug LIKE '%mnemba%' OR title ILIKE '%mnemba%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://degeadventures.com/wp-content/uploads/2024/01/Mnemba-Snorkeling-6-1030x773.jpg', 'Mnemba Island snorkeling', 3
FROM tours WHERE slug LIKE '%mnemba%' OR title ILIKE '%mnemba%' LIMIT 1;

-- Jozani Forest Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://www.amozanzibartours.com/files/az/images/jozaniforest/jozani-1.jpg', 'Jozani red colobus monkey', 0
FROM tours WHERE slug LIKE '%jozani%' OR title ILIKE '%jozani%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://exploreyourbucketlist.com/wp-content/uploads/2023/11/20231101_061855173_iOS-scaled.jpg', 'Jozani Forest trail', 1
FROM tours WHERE slug LIKE '%jozani%' OR title ILIKE '%jozani%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://www.easytravel.co.tz/wp-content/uploads/2023/08/Jozani-Chwaka-National-Park-Zanzibar-Tanzania.jpg', 'Jozani National Park', 2
FROM tours WHERE slug LIKE '%jozani%' OR title ILIKE '%jozani%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://ztrans.co.tz/wp-content/uploads/2019/10/ztrans-best-zanzibar-tours-jozani-forest-tour-02.jpg', 'Jozani mangrove boardwalk', 3
FROM tours WHERE slug LIKE '%jozani%' OR title ILIKE '%jozani%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/93d15b9ca24f0671fbfbc42ba649e7cc336659023f80496f1ea28330ee3ae99a.jpg/61.jpg', 'Jozani Salaam cave', 4
FROM tours WHERE slug LIKE '%jozani%' OR title ILIKE '%jozani%' LIMIT 1;

-- Nakupenda + Prison Island Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://zanzibarworld.com/wp-content/uploads/2021/04/prison-nakupenda-tours.jpg', 'Nakupenda sandbank', 0
FROM tours WHERE slug LIKE '%nakupenda%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/b368bad3e5556e351d499550ae2c70527523523cc304dddf036cde1591e38ed4.jpg/146.jpg', 'Nakupenda beach', 1
FROM tours WHERE slug LIKE '%nakupenda%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/dd4c0c85e29b1745ee48cd7c2366fcb3f43c900d18b271a996492c5b87417c51.jpg/146.jpg', 'Prison Island tortoises', 2
FROM tours WHERE slug LIKE '%nakupenda%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/c4/dd/0d.jpg', 'Nakupenda sandbank aerial', 3
FROM tours WHERE slug LIKE '%nakupenda%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.tripspoint.com/uploads/photos/3893/prison-island-and-romantic-nakupenda-sandbank-zanzibar_7QvBJ.jpg', 'Prison Island Nakupenda tour', 4
FROM tours WHERE slug LIKE '%nakupenda%' LIMIT 1;

-- Sunset Cruise Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/90/52/f8.jpg', 'Sunset cruise Zanzibar', 0
FROM tours WHERE slug LIKE '%sunset%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/b5e055f954c96aaa.jpeg/98.jpg', 'Sunset dhow cruise', 1
FROM tours WHERE slug LIKE '%sunset%' LIMIT 1;

-- Mtende Beach Images
INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://media-cdn.tripadvisor.com/media/photo-s/25/69/13/3e/wooden-walkway.jpg', 'Mtende Beach walkway', 0
FROM tours WHERE slug LIKE '%mtende%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://cdn.getyourguide.com/img/tour/9309857c73b8ec7a7f2cc6f2bf70d2fd5e1c743b70c178f9c542cad24b12d0fe.jpg/145.jpg', 'The Rock Restaurant', 1
FROM tours WHERE slug LIKE '%mtende%' LIMIT 1;

INSERT INTO tour_images (tour_id, path, alt_text, sort_order)
SELECT id, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/98/3b/d6.jpg', 'Mtende Beach view', 2
FROM tours WHERE slug LIKE '%mtende%' LIMIT 1;
