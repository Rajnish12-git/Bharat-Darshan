export interface DetailItem {
  name: string;
  imageId: string;
  description: string;
}

export interface StateData {
  slug: string;
  name: string;
  description: string;
  imageId: string;
  monuments: DetailItem[];
  cuisine: DetailItem[];
  festivals: DetailItem[];
  artForms: DetailItem[];
}

export const indianStates: StateData[] = [
  {
    slug: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    description: 'The heartland of India, Uttar Pradesh is rich in history and spirituality, home to some of the most sacred Hindu sites and iconic Mughal architecture.',
    imageId: 'state-uttar-pradesh',
    monuments: [
      { name: 'Taj Mahal', imageId: 'hero-taj-mahal', description: 'An ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.' },
      { name: 'Agra Fort', imageId: 'monument-agra-fort', description: 'A historical fort in the city of Agra, it was the main residence of the emperors of the Mughal Dynasty.' },
      { name: 'Fatehpur Sikri', imageId: 'monument-fatehpur-sikri', description: 'A town in the Agra District of Uttar Pradesh, founded in 1569 by the Mughal emperor Akbar.' },
    ],
    cuisine: [
      { name: 'Bedmi Puri', imageId: 'cuisine-bedmi-puri', description: 'A fluffy, crisp, and savory Indian bread, which is typically served for breakfast.' },
      { name: 'Petha', imageId: 'cuisine-petha', description: 'A translucent soft candy from Agra. Usually rectangular or cylindrical, it is made from the ash gourd vegetable.' },
    ],
    festivals: [
      { name: 'Diwali', imageId: 'festival-diwali', description: 'The festival of lights, celebrated with grand fervor across the state.' },
      { name: 'Holi', imageId: 'festival-holi', description: 'The festival of colors, with particularly vibrant celebrations in the Braj region.' },
    ],
    artForms: [
      { name: 'Chikankari', imageId: 'art-chikankari', description: 'A traditional embroidery style from Lucknow, known for its delicate and intricate white-on-white work.' },
    ],
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    description: 'The "Land of Kings," Rajasthan is a vibrant state known for its majestic forts, palaces, deserts, and rich folk culture.',
    imageId: 'state-rajasthan',
    monuments: [
      { name: 'Hawa Mahal', imageId: 'monument-hawa-mahal', description: 'A palace in Jaipur, India. Made with the red and pink sandstone, the palace sits on the edge of the City Palace.' },
      { name: 'Amer Fort', imageId: 'monument-amer-fort', description: 'A fort located in Amer, Rajasthan. Noted for its artistic style elements.' },
    ],
    cuisine: [
      { name: 'Dal Baati Churma', imageId: 'cuisine-dal-baati-churma', description: 'A classic Rajasthani dish comprising spicy lentils, baked wheat balls, and sweetened cereal.' },
      { name: 'Ghevar', imageId: 'cuisine-ghevar', description: 'A disc-shaped sweet cake made with all-purpose flour and soaked in sugar syrup.' },
    ],
    festivals: [
      { name: 'Pushkar Fair', imageId: 'festival-pushkar-fair', description: 'One of India\'s largest camel, horse and cattle fairs, held annually in the town of Pushkar.' },
    ],
    artForms: [
      { name: 'Blue Pottery', imageId: 'art-blue-pottery', description: 'Widely recognized as a traditional craft of Jaipur, this pottery is made from quartz and not clay.' },
    ],
  },
  {
    slug: 'karnataka',
    name: 'Karnataka',
    description: 'A state in southwest India with a rich tapestry of history, from ancient empires to modern innovation, famed for its palaces, temples, and natural beauty.',
    imageId: 'state-karnataka',
    monuments: [
      { name: 'Hampi', imageId: 'hero-hampi', description: 'A UNESCO World Heritage Site, Hampi was the capital of the Vijayanagara Empire in the 14th century.' },
      { name: 'Mysore Palace', imageId: 'monument-mysore-palace', description: 'A historical palace and a royal residence at Mysore in the Indian State of Karnataka.' },
      { name: 'Gol Gumbaz', imageId: 'monument-gol-gumbaz', description: 'The mausoleum of king Mohammed Adil Shah, it is famous for its massive dome and whispering gallery.' },
    ],
    cuisine: [
      { name: 'Bisi Bele Bath', imageId: 'cuisine-bisi-bele-bath', description: 'A hot lentil rice dish originating from the state of Karnataka.' },
      { name: 'Mysore Pak', imageId: 'cuisine-mysore-pak', description: 'A rich sweet dish prepared in ghee, it originated in the city of Mysore.' },
    ],
    festivals: [
      { name: 'Mysore Dasara', imageId: 'festival-dasara', description: 'The state festival of Karnataka, celebrated for 10 days with a grand procession.' },
    ],
    artForms: [
      { name: 'Mysore Painting', imageId: 'art-mysore-painting', description: 'An important form of classical South Indian painting that originated in the city of Mysore.' },
    ],
  },
  {
    slug: 'odisha',
    name: 'Odisha',
    description: 'Located on the east coast, Odisha is a land of ancient temples, pristine beaches, and vibrant tribal cultures.',
    imageId: 'state-odisha',
    monuments: [
      { name: 'Konark Sun Temple', imageId: 'hero-konark-sun-temple', description: 'A 13th-century CE Sun temple at Konark, a UNESCO World Heritage Site.' },
      { name: 'Lingaraja Temple', imageId: 'monument-lingaraja-temple', description: 'A Hindu temple dedicated to Shiva and is one of the oldest temples in Bhubaneswar.' },
      { name: 'Udayagiri Caves', imageId: 'monument-udayagiri-caves', description: 'Ancient rock-cut caves of historical, religious and archaeological importance.' },
    ],
    cuisine: [
      { name: 'Chhena Poda', imageId: 'cuisine-chenna-poda', description: 'A cheese dessert, literally meaning "burnt cheese," it is a quintessential sweet of Odisha.' },
      { name: 'Pakhala Bhata', imageId: 'cuisine-pakhala-bhata', description: 'An Odia term for an Indian food consisting of cooked rice washed or fermented in water.' },
    ],
    festivals: [
      { name: 'Ratha Yatra', imageId: 'festival-ratha-yatra', description: 'The "Festival of Chariots" held annually in Puri, dedicated to Lord Jagannath.' },
    ],
    artForms: [
      { name: 'Pattachitra', imageId: 'art-pattachitra', description: 'A traditional, cloth-based scroll painting based in the eastern Indian state of Odisha.' },
    ],
  },
];

export const getImageUrl = (imageId: string, placeholderImages: any[]) => {
  const image = placeholderImages.find(img => img.id === imageId);
  return image ? image.imageUrl : 'https://picsum.photos/seed/error/600/400';
};
