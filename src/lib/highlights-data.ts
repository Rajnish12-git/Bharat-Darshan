
import type { DetailItem } from './heritage-data';

export interface Highlight {
  title: string;
  subtitle: string;
  description: string;
  imageId: string;
  slug: string;
  details?: DetailItem[];
}

export const highlights: Highlight[] = [
  {
    title: 'Architectural Marvels',
    subtitle: 'Monuments that tell tales of time',
    description:
      "From the ivory-white splendor of the Taj Mahal to the imposing red sandstone of Agra Fort, India's monuments are a testament to its rich history and architectural genius. These structures are not just stone and mortar; they are the chronicles of empires, the canvas of artisans, and the heart of a nation's identity.",
    imageId: 'hero-taj-mahal',
    slug: 'architectural-marvels'
  },
  {
    title: 'A Culinary Journey',
    subtitle: 'Taste the diversity of India',
    description:
      "Indian cuisine is a vibrant mosaic of flavors, with each region offering its own unique specialties. From the spicy curries of the north to the coconut-infused dishes of the south, the culinary landscape is as diverse as its culture. It's an experience that tantalizes the senses and tells the story of the land.",
    imageId: 'cuisine-spices',
    slug: 'culinary-journey'
  },
  {
    title: 'Vibrant Art Forms',
    subtitle: 'The soul of India in color and motion',
    description:
      "India's artistic traditions are a riot of color, rhythm, and expression. From the intricate hand-painting of Kalamkari textiles to the graceful storytelling of Bharatanatyam dance, these art forms are a living heritage, passed down through generations, each telling a story of devotion, celebration, and life itself.",
    imageId: 'art-kalamkari',
    slug: 'vibrant-art-forms',
    details: [
       { name: 'Kathakali', imageId: 'art-kathakali', description: 'A classical dance-drama from Kerala known for its elaborate makeup and costumes.' },
       { name: 'Madhubani Painting', imageId: 'art-madhubani', description: 'A style of folk painting from Bihar characterized by its intricate geometric patterns.' },
       { name: 'Blue Pottery', imageId: 'art-blue-pottery', description: 'A traditional craft of Jaipur using a quartz-based paste for a vibrant blue glaze.' },
       { name: 'Warli Painting', imageId: 'art-warli-painting', description: 'Tribal art from Maharashtra that uses geometric shapes to depict scenes of daily life.' },
    ]
  },
  {
    title: 'Festivals of Light & Sound',
    subtitle: 'Celebrations that unite the nation',
    description:
      'Indian festivals are a spectacular display of devotion and joy. The air is filled with fireworks, feasts, and the warmth of community, symbolizing the victory of good over evil across a thousand different traditions.',
    imageId: 'festival-dev-deepawali',
    slug: 'festivals-light-sound',
    details: [
      { name: 'Holi', imageId: 'festival-holi', description: 'The festival of colors, a joyous celebration marking the arrival of spring.' },
      { name: 'Durga Puja', imageId: 'festival-durga-puja', description: 'A ten-day festival in West Bengal honoring the goddess Durga with elaborate idols and cultural events.' },
      { name: 'Pushkar Fair', imageId: 'festival-pushkar-fair', description: "One of the world's largest camel fairs, a vibrant spectacle of culture, trade, and contests." },
      { name: 'Onam', imageId: 'festival-onam', description: 'A harvest festival in Kerala celebrated with floral carpets, grand feasts, and snake boat races.' },
    ]
  },
  {
    title: 'The Sound of Music',
    subtitle: 'Melodies that echo through centuries',
    description:
      "Indian classical music is a deep and spiritual tradition. The resonant strings of the Sitar, accompanied by the complex rhythms of the Tabla, create melodies that can be both meditative and exhilarating, carrying the weight of ancient ragas and improvisational brilliance.",
    imageId: 'art-sitar',
    slug: 'the-sound-of-music',
    details: [
       { name: 'Sitar', imageId: 'art-sitar', description: 'A plucked stringed instrument with a long neck and a gourd resonating chamber, central to Hindustani classical music.' },
       { name: 'Tabla', imageId: 'art-tabla', description: 'A pair of small hand drums that form the rhythmic foundation of North Indian classical music.' },
       { name: 'Flute (Bansuri)', imageId: 'art-flute', description: 'A side-blown flute made from a single shaft of bamboo, known for its soulful and evocative melodies.' },
       { name: 'Sarod', imageId: 'art-sarod', description: 'A fretless stringed instrument known for its deep, weighty, and introspective sound.' },
    ]
  },
];
