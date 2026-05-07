import type { ServiceItem } from '../components/ServiceRailSection';

export type MainCategoryId = 'events' | 'arts' | 'digital' | 'beauty';

export type SubCategoryId =
  | 'events_music'
  | 'events_media'
  | 'events_food'
  | 'events_decor'
  | 'arts_performing'
  | 'arts_design'
  | 'digital_development'
  | 'digital_marketing'
  | 'beauty_bridal'
  | 'beauty_fashion';

export type SubCategory = {
  id: SubCategoryId;
  title: string;
  /** Controls the overlay vibe. */
  gradient: 'default' | 'soft';
  /** Optional listing chip hint. */
  providerListingChip?: 'Events' | 'Tech';
  items: ServiceItem[];
};

export const SERVICE_CATALOG: Record<MainCategoryId, { heroImageUrl: string; heroSubtitle: string; subcategories: SubCategory[] }> =
  {
    events: {
      heroImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
      heroSubtitle: 'Book professionals for weddings, concerts, parties, and celebrations.',
      subcategories: [
        {
          id: 'events_music',
          title: 'Music & Entertainment',
          gradient: 'default',
          providerListingChip: 'Events',
          items: [
            { id: 'ev-dj', name: 'DJ', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=85' },
            { id: 'ev-live-band', name: 'Live Band', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=85' },
            { id: 'ev-singer', name: 'Singer', imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85' },
            { id: 'ev-rapper', name: 'Rapper', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85' },
            { id: 'ev-musician', name: 'Musician', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=85' },
            { id: 'ev-instrumentalist', name: 'Instrumentalist', imageUrl: 'https://images.unsplash.com/photo-1521334726092-b509a19597c3?w=1200&q=85' },
            { id: 'ev-sound', name: 'Sound Engineer', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85' },
            { id: 'ev-karaoke', name: 'Karaoke Host', imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85' },
            { id: 'ev-mc', name: 'Anchor / MC', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85' },
            { id: 'ev-standup', name: 'Stand-up Comedian', imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85' },
            { id: 'ev-magician', name: 'Magician', imageUrl: 'https://images.unsplash.com/photo-1520976004341-6a4a8b52d32a?w=1200&q=85' },
            { id: 'ev-dancer', name: 'Dancer', imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85' },
            { id: 'ev-dance-crew', name: 'Dance Crew', imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85' },
            { id: 'ev-celebrity', name: 'Celebrity Appearance', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85' },
          ],
        },
        {
          id: 'events_media',
          title: 'Photography & Media',
          gradient: 'default',
          providerListingChip: 'Events',
          items: [
            { id: 'ev-photographer', name: 'Photographer', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85' },
            { id: 'ev-videographer', name: 'Videographer', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85' },
            { id: 'ev-drone', name: 'Drone Operator', imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1200&q=85' },
            { id: 'ev-editor', name: 'Cinematic Editor', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85' },
            { id: 'ev-live', name: 'Live Streaming Team', imageUrl: 'https://images.unsplash.com/photo-1520976004341-6a4a8b52d32a?w=1200&q=85' },
            { id: 'ev-booth', name: 'Photo Booth Setup', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85' },
          ],
        },
        {
          id: 'events_food',
          title: 'Food & Catering',
          gradient: 'default',
          providerListingChip: 'Events',
          items: [
            { id: 'ev-catering', name: 'Catering Service', imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85' },
            { id: 'ev-chef', name: 'Private Chef', imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=85' },
            { id: 'ev-bartender', name: 'Bartender', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=85' },
            { id: 'ev-dessert', name: 'Dessert Counter', imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=85' },
            { id: 'ev-cake', name: 'Cake Designer', imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=85' },
            { id: 'ev-beverage', name: 'Beverage Service', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=85' },
            { id: 'ev-food-truck', name: 'Food Truck', imageUrl: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=1200&q=85' },
          ],
        },
        {
          id: 'events_decor',
          title: 'Decoration & Setup',
          gradient: 'default',
          providerListingChip: 'Events',
          items: [
            { id: 'ev-decorator', name: 'Event Decorator', imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85' },
            { id: 'ev-balloons', name: 'Balloon Decor', imageUrl: 'https://images.unsplash.com/photo-1549045337-967927d923c0?w=1200&q=85' },
            { id: 'ev-floral', name: 'Floral Decor', imageUrl: 'https://images.unsplash.com/photo-1524292332709-b33366e086ff?w=1200&q=85' },
            { id: 'ev-stage', name: 'Stage Designer', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85' },
            { id: 'ev-lighting', name: 'Lighting Setup', imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85' },
            { id: 'ev-led', name: 'LED Wall Provider', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85' },
            { id: 'ev-wedding-decor', name: 'Wedding Decor', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85' },
            { id: 'ev-furniture', name: 'Furniture Rental', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85' },
          ],
        },
      ],
    },

    arts: {
      heroImageUrl: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=1600&q=85',
      heroSubtitle: 'Performers and creators for shoots, shows, brands, and storytelling.',
      subcategories: [
        {
          id: 'arts_performing',
          title: 'Performing Arts',
          gradient: 'default',
          items: [
            { id: 'ac-singer', name: 'Singer', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=85' },
            { id: 'ac-dancer', name: 'Dancer', imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85' },
            { id: 'ac-actor', name: 'Actor', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=85' },
            { id: 'ac-theatre', name: 'Theatre Artist', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85' },
            { id: 'ac-voice', name: 'Voice-over Artist', imageUrl: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200&q=85' },
            { id: 'ac-mimic', name: 'Mimicry Artist', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85' },
            { id: 'ac-poet', name: 'Poet', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=85' },
            { id: 'ac-story', name: 'Storyteller', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85' },
          ],
        },
        {
          id: 'arts_design',
          title: 'Creative Design',
          gradient: 'default',
          items: [
            { id: 'ac-graphic', name: 'Graphic Designer', imageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=85' },
            { id: 'ac-illustrator', name: 'Illustrator', imageUrl: 'https://images.unsplash.com/photo-1456081445129-830eb8d4bfc6?w=1200&q=85' },
            { id: 'ac-motion', name: 'Motion Designer', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=85' },
            { id: 'ac-animator', name: 'Animator', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=85' },
            { id: 'ac-3d', name: '3D Artist', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=85' },
            { id: 'ac-brand', name: 'Branding Designer', imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=85' },
          ],
        },
      ],
    },

    digital: {
      heroImageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=85',
      heroSubtitle: 'Build, launch, and grow with vetted developers and marketers.',
      subcategories: [
        {
          id: 'digital_development',
          title: 'Development',
          gradient: 'default',
          providerListingChip: 'Tech',
          items: [
            { id: 'ds-web', name: 'Web Developer', imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85' },
            { id: 'ds-fe', name: 'Frontend Developer', imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&q=85' },
            { id: 'ds-be', name: 'Backend Developer', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=85' },
            { id: 'ds-fs', name: 'Full Stack Developer', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=85' },
            { id: 'ds-mobile', name: 'Mobile App Developer', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=85' },
            { id: 'ds-shopify', name: 'Shopify Developer', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85' },
            { id: 'ds-wp', name: 'WordPress Developer', imageUrl: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1200&q=85' },
          ],
        },
        {
          id: 'digital_marketing',
          title: 'Marketing',
          gradient: 'default',
          providerListingChip: 'Tech',
          items: [
            { id: 'ds-smm', name: 'Social Media Manager', imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=85' },
            { id: 'ds-seo', name: 'SEO Specialist', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85' },
            { id: 'ds-perf', name: 'Performance Marketer', imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85' },
            { id: 'ds-ads', name: 'Ads Manager', imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&q=85' },
            { id: 'ds-content', name: 'Content Strategist', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85' },
            { id: 'ds-copy', name: 'Copywriter', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=85' },
          ],
        },
      ],
    },

    beauty: {
      heroImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=85',
      heroSubtitle: 'Bridal glam, hair, nails, and styling — elegant professionals for special days.',
      subcategories: [
        {
          id: 'beauty_bridal',
          title: 'Bridal & Beauty',
          gradient: 'soft',
          items: [
            { id: 'bs-makeup', name: 'Makeup Artist', imageUrl: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=1200&q=85' },
            { id: 'bs-bridal', name: 'Bridal Makeover Artist', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=85' },
            { id: 'bs-henna', name: 'Henna Artist', imageUrl: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=1200&q=85' },
            { id: 'bs-beautician', name: 'Beautician (Freelance)', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=85' },
            { id: 'bs-saree', name: 'Saree Draping Artist', imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85' },
          ],
        },
        {
          id: 'beauty_fashion',
          title: 'Fashion & Styling',
          gradient: 'soft',
          items: [
            { id: 'bs-costume', name: 'Costume Designer', imageUrl: 'https://images.unsplash.com/photo-1520976004341-6a4a8b52d32a?w=1200&q=85' },
            { id: 'bs-hair', name: 'Hair Stylist', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=85' },
            { id: 'bs-nails', name: 'Nail Artist', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85' },
            { id: 'bs-stylist', name: 'Personal Stylist', imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85' },
          ],
        },
      ],
    },
  };

export function getSubCategory(main: MainCategoryId, sub: SubCategoryId) {
  const bucket = SERVICE_CATALOG[main];
  const found = bucket.subcategories.find((s) => s.id === sub);
  if (!found) throw new Error(`Unknown subcategory ${main}/${sub}`);
  return found;
}

