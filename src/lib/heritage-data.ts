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
  {
    slug: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    description: 'Known as the "Koh-i-Noor of India", this state boasts a rich cultural heritage, ancient temples, and beautiful beaches.',
    imageId: 'state-andhra-pradesh',
    monuments: [
        { name: 'Tirupati Temple', imageId: 'monument-tirupati', description: 'A famous Hindu temple dedicated to Venkateswara, a form of Vishnu.' },
    ],
    cuisine: [
        { name: 'Pulihora', imageId: 'cuisine-pulihora', description: 'A traditional tamarind rice dish, known for its tangy and spicy flavor.' },
    ],
    festivals: [
        { name: 'Ugadi', imageId: 'festival-ugadi', description: 'The Telugu New Year, celebrated with special dishes and prayers.' },
    ],
    artForms: [
        { name: 'Kalamkari', imageId: 'art-kalamkari', description: 'A type of hand-painted or block-printed cotton textile, produced in Isfahan and Indian villages.' },
    ],
  },
  {
    slug: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    description: 'The "Land of the Dawn-Lit Mountains", this northeastern state is a paradise of lush forests, diverse tribes, and stunning landscapes.',
    imageId: 'state-arunachal-pradesh',
    monuments: [
        { name: 'Tawang Monastery', imageId: 'monument-tawang-monastery', description: 'The largest monastery in India and second largest in the world.' },
    ],
    cuisine: [
        { name: 'Thukpa', imageId: 'cuisine-thukpa', description: 'A Himalayan noodle soup, usually served with meat and vegetables.' },
    ],
    festivals: [
        { name: 'Losar Festival', imageId: 'festival-losar', description: 'The Tibetan New Year, celebrated with traditional music, dance, and religious rituals.' },
    ],
    artForms: [
        { name: 'Apatani Weaving', imageId: 'art-apatani-weaving', description: 'Intricate geometric patterns woven by the Apatani tribe.' },
    ],
  },
  {
    slug: 'assam',
    name: 'Assam',
    description: 'Famous for its tea gardens, wildlife sanctuaries, and the mighty Brahmaputra river, Assam is the gateway to Northeast India.',
    imageId: 'state-assam',
    monuments: [
        { name: 'Kamakhya Temple', imageId: 'monument-kamakhya', description: 'A Hindu temple dedicated to the mother goddess Kamakhya, one of the oldest of the 51 Shakti Pithas.' },
    ],
    cuisine: [
        { name: 'Masor Tenga', imageId: 'cuisine-masor-tenga', description: 'A light and tangy fish curry, an authentic dish of Assamese cuisine.' },
    ],
    festivals: [
        { name: 'Bihu', imageId: 'festival-bihu', description: 'A set of three important Assamese festivals, celebrating the agricultural cycle.' },
    ],
    artForms: [
        { name: 'Muga Silk', imageId: 'art-muga-silk', description: 'A variety of wild silk geographically tagged to the state of Assam in India.' },
    ],
  },
  {
    slug: 'bihar',
    name: 'Bihar',
    description: 'An ancient land of learning and spirituality, Bihar is where Buddhism was born and holds numerous historical sites.',
    imageId: 'state-bihar',
    monuments: [
        { name: 'Mahabodhi Temple', imageId: 'monument-mahabodhi', description: 'A UNESCO World Heritage Site in Bodh Gaya, where the Buddha is said to have attained enlightenment.' },
    ],
    cuisine: [
        { name: 'Litti Chokha', imageId: 'cuisine-litti-chokha', description: 'A baked salted wheat flour cake filled with sattu, served with roasted vegetables.' },
    ],
    festivals: [
        { name: 'Chhath Puja', imageId: 'festival-chhath-puja', description: 'An ancient Hindu festival dedicated to the sun god, Surya.' },
    ],
    artForms: [
        { name: 'Madhubani Painting', imageId: 'art-madhubani', description: 'A style of Indian painting, practiced in the Mithila region of the Indian subcontinent.' },
    ],
  },
  {
    slug: 'chhattisgarh',
    name: 'Chhattisgarh',
    description: 'A heavily forested state in central India known for its temples, waterfalls, and rich tribal culture.',
    imageId: 'state-chhattisgarh',
    monuments: [
        { name: 'Chitrakote Falls', imageId: 'monument-chitrakote-falls', description: 'A natural waterfall located to the west of Jagdalpur, often called the Niagara of India.' },
    ],
    cuisine: [
        { name: 'Faraa', imageId: 'cuisine-faraa', description: 'Steamed rice dumplings, a popular snack in Chhattisgarh.' },
    ],
    festivals: [
        { name: 'Bastar Dussehra', imageId: 'festival-bastar-dussehra', description: 'A unique 75-day festival celebrated by the tribes of Bastar.' },
    ],
    artForms: [
        { name: 'Dhokra Art', imageId: 'art-dhokra', description: 'A non-ferrous metal casting using the lost-wax casting technique.' },
    ],
  },
  {
    slug: 'goa',
    name: 'Goa',
    description: 'Famed for its pristine beaches, vibrant nightlife, Portuguese architecture, and laid-back atmosphere.',
    imageId: 'state-goa',
    monuments: [
        { name: 'Basilica of Bom Jesus', imageId: 'monument-bom-jesus', description: 'A UNESCO World Heritage Site, this basilica holds the mortal remains of St. Francis Xavier.' },
    ],
    cuisine: [
        { name: 'Goan Fish Curry', imageId: 'cuisine-goan-fish-curry', description: 'A spicy and tangy fish curry made with coconut, a staple of Goan cuisine.' },
    ],
    festivals: [
        { name: 'Goa Carnival', imageId: 'festival-goa-carnival', description: 'A three-day festival of color, song, and music before Lent.' },
    ],
    artForms: [
        { name: 'Azulejos', imageId: 'art-azulejos', description: 'Painted, tin-glazed ceramic tilework found on Goan buildings.' },
    ],
  },
  {
    slug: 'gujarat',
    name: 'Gujarat',
    description: 'A state with a rich history of trade and culture, known for its vibrant festivals, unique wildlife, and historical sites.',
    imageId: 'state-gujarat',
    monuments: [
        { name: 'Rani ki Vav', imageId: 'monument-rani-ki-vav', description: 'An intricately constructed stepwell on the banks of Saraswati River, a UNESCO site.' },
    ],
    cuisine: [
        { name: 'Dhokla', imageId: 'cuisine-dhokla', description: 'A savoury steamed cake made from a fermented batter of rice and split chickpeas.' },
    ],
    festivals: [
        { name: 'Navaratri', imageId: 'festival-navaratri', description: 'A nine-night festival celebrated with energetic Garba and Dandiya Raas dances.' },
    ],
    artForms: [
        { name: 'Bandhani', imageId: 'art-bandhani', description: 'A type of tie-dye textile decorated by plucking the cloth with the fingernails into many tiny bindings.' },
    ],
  },
  {
    slug: 'haryana',
    name: 'Haryana',
    description: 'A state with a rich Vedic history, known for its archaeological sites and as a major hub for automobile manufacturing.',
    imageId: 'state-haryana',
    monuments: [
        { name: 'Kurukshetra', imageId: 'monument-kurukshetra', description: 'A holy place and the land of the epic Mahabharata war.' },
    ],
    cuisine: [
        { name: 'Bajra Khichdi', imageId: 'cuisine-bajra-khichdi', description: 'A nutritious and wholesome porridge made from pearl millet and lentils.' },
    ],
    festivals: [
        { name: 'Gugga Naumi', imageId: 'festival-gugga-naumi', description: 'A festival to worship the snake god, Gugga Pir.' },
    ],
    artForms: [
        { name: 'Panja Durries', imageId: 'art-panja-durries', description: 'Traditional hand-woven rugs with geometric patterns.' },
    ],
  },
  {
    slug: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    description: 'A northern Indian state in the Himalayas, it\'s home to scenic mountain towns and resorts such as Dalhousie.',
    imageId: 'state-himachal-pradesh',
    monuments: [
        { name: 'Hadimba Temple', imageId: 'monument-hadimba-temple', description: 'An ancient cave temple dedicated to Hidimbi Devi, located in Manali.' },
    ],
    cuisine: [
        { name: 'Dham', imageId: 'cuisine-dham', description: 'A traditional festive meal prepared by Brahmins, featuring a variety of vegetarian dishes.' },
    ],
    festivals: [
        { name: 'Kullu Dussehra', imageId: 'festival-kullu-dussehra', description: 'A week-long international festival celebrated in the Kullu valley.' },
    ],
    artForms: [
        { name: 'Kangra Painting', imageId: 'art-kangra-painting', description: 'The pictorial art of Kangra, named after the former princely state, which patronized the art.' },
    ],
  },
  {
    slug: 'jharkhand',
    name: 'Jharkhand',
    description: 'Known for its rich mineral resources, dense forests, and tribal communities, this eastern state is a land of natural beauty.',
    imageId: 'state-jharkhand',
    monuments: [
        { name: 'Baidyanath Temple', imageId: 'monument-baidyanath', description: 'A temple complex of 22 temples dedicated to Shiva, one of the twelve Jyotirlingas in India.' },
    ],
    cuisine: [
        { name: 'Dhuska', imageId: 'cuisine-dhuska', description: 'A popular deep-fried snack made from rice and lentil batter.' },
    ],
    festivals: [
        { name: 'Sarhul', imageId: 'festival-sarhul', description: 'The most popular tribal festival, celebrating the beginning of the New Year.' },
    ],
    artForms: [
        { name: 'Sohrai Art', imageId: 'art-sohrai', description: 'A ritualistic art form practiced by tribal women during the harvest festival.' },
    ],
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    description: 'God\'s Own Country, a state on India\'s tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline.',
    imageId: 'hero-kerala-backwaters',
    monuments: [
        { name: 'Mattancherry Palace', imageId: 'monument-mattancherry-palace', description: 'A Portuguese palace popularly known as the Dutch Palace, in Mattancherry, Kochi.' },
    ],
    cuisine: [
        { name: 'Appam and Stew', imageId: 'cuisine-appam-stew', description: 'A lacy, soft-centered rice pancake served with a fragrant vegetable or meat stew.' },
    ],
    festivals: [
        { name: 'Onam', imageId: 'festival-onam', description: 'An annual Hindu festival celebrated in Kerala, marking the summer harvest.' },
    ],
    artForms: [
        { name: 'Kathakali', imageId: 'art-kathakali', description: 'A major form of classical Indian dance, distinguished by its elaborate makeup and costumes.' },
    ],
  },
  {
    slug: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    description: 'The "Heart of India", this large central state retains landmarks from eras throughout Indian history.',
    imageId: 'state-madhya-pradesh',
    monuments: [
        { name: 'Khajuraho Temples', imageId: 'monument-khajuraho', description: 'A group of Hindu and Jain temples in Chhatarpur district, famous for their nagara-style architectural symbolism and their erotic sculptures.' },
    ],
    cuisine: [
        { name: 'Poha Jalebi', imageId: 'cuisine-poha-jalebi', description: 'A popular breakfast combination of flattened rice and sweet, crispy swirls.' },
    ],
    festivals: [
        { name: 'Lokrang Festival', imageId: 'festival-lokrang', description: 'A cultural festival showcasing folk dances, music, and arts from across the country.' },
    ],
    artForms: [
        { name: 'Gond Painting', imageId: 'art-gond-painting', description: 'A form of painting from folk and tribal art that is practiced by one of the largest tribes in India.' },
    ],
  },
  {
    slug: 'maharashtra',
    name: 'Maharashtra',
    description: 'A vast state in western India, home to the bustling metropolis of Mumbai and the ancient Ellora and Ajanta caves.',
    imageId: 'state-maharashtra',
    monuments: [
        { name: 'Ajanta & Ellora Caves', imageId: 'monument-ajanta-ellora', description: 'UNESCO World Heritage sites featuring rock-cut Buddhist, Hindu, and Jain monuments and artworks.' },
    ],
    cuisine: [
        { name: 'Vada Pav', imageId: 'cuisine-vada-pav', description: 'A vegetarian fast food dish native to the state of Maharashtra, consisting of a deep fried potato dumpling placed inside a bread bun.' },
    ],
    festivals: [
        { name: 'Ganesh Chaturthi', imageId: 'festival-ganesh-chaturthi', description: 'A Hindu festival celebrating the arrival of Ganesh to earth from Kailash Parvat with his mother Goddess Parvati/Gauri.' },
    ],
    artForms: [
        { name: 'Warli Painting', imageId: 'art-warli-painting', description: 'A form of tribal art mostly created by the tribal people from the North Sahyadri Range in Maharashtra, India.' },
    ],
  },
  {
    slug: 'manipur',
    name: 'Manipur',
    description: 'The "Jewel of India", this northeastern state is known for its classical dance, natural beauty, and the floating Loktak Lake.',
    imageId: 'state-manipur',
    monuments: [
        { name: 'Kangla Fort', imageId: 'monument-kangla-fort', description: 'An old fortified palace at the heart of Imphal city, which was the traditional seat of the past Meetei rulers of Manipur.' },
    ],
    cuisine: [
        { name: 'Eromba', imageId: 'cuisine-eromba', description: 'A flavorful dish made from boiled vegetables and fermented fish.' },
    ],
    festivals: [
        { name: 'Sangai Festival', imageId: 'festival-sangai', description: 'An annual cultural festival organized by the Government of Manipur to promote tourism.' },
    ],
    artForms: [
        { name: 'Manipuri Dance', imageId: 'art-manipuri-dance', description: 'One of the major Indian classical dance forms, named after the state of its origin.' },
    ],
  },
  {
    slug: 'meghalaya',
    name: 'Meghalaya',
    description: 'The "Abode of Clouds", this state is one of the wettest places on earth, famed for its living root bridges and stunning waterfalls.',
    imageId: 'state-meghalaya',
    monuments: [
        { name: 'Living Root Bridges', imageId: 'monument-living-root-bridges', description: 'Aerial bridges built by weaving and manipulating the roots of the Indian rubber tree.' },
    ],
    cuisine: [
        { name: 'Jadoh', imageId: 'cuisine-jadoh', description: 'A popular Khasi dish of red rice cooked with pork and spices.' },
    ],
    festivals: [
        { name: 'Wangala Festival', imageId: 'festival-wangala', description: 'A harvest festival celebrated by the Garo tribe, marking the end of the agricultural year.' },
    ],
    artForms: [
        { name: 'Cane and Bamboo Craft', imageId: 'art-cane-bamboo', description: 'Intricate items crafted from cane and bamboo, reflecting the local culture.' },
    ],
  },
  {
    slug: 'mizoram',
    name: 'Mizoram',
    description: 'A land of rolling hills, valleys, rivers and lakes. As many as 21 major hills ranges or peaks of different heights run through the length and breadth of the state.',
    imageId: 'state-mizoram',
    monuments: [
        { name: 'Vantawng Falls', imageId: 'monument-vantawng-falls', description: 'Located 5 kilometres south of Thenzawl in Serchhip district, it is the highest uninterrupted waterfall in Mizoram.' },
    ],
    cuisine: [
        { name: 'Bai', imageId: 'cuisine-bai', description: 'A popular Mizo dish made from steamed vegetables with pork, spinach, and bamboo shoots.' },
    ],
    festivals: [
        { name: 'Chapchar Kut', imageId: 'festival-chapchar-kut', description: 'A spring festival celebrated after the completion of the most arduous task of jhumming.' },
    ],
    artForms: [
        { name: 'Puan Weaving', imageId: 'art-puan-weaving', description: 'Traditional colourful textiles woven by Mizo women with intricate designs.' },
    ],
  },
  {
    slug: 'nagaland',
    name: 'Nagaland',
    description: 'Known as the "Land of Festivals", this vibrant northeastern state is home to diverse indigenous tribes with unique customs and traditions.',
    imageId: 'state-nagaland',
    monuments: [
        { name: 'Kohima War Cemetery', imageId: 'monument-kohima-cemetery', description: 'A memorial dedicated to soldiers of the 2nd British Division of the Allied Forces who died in the Second World War at Kohima.' },
    ],
    cuisine: [
        { name: 'Axone', imageId: 'cuisine-axone', description: 'Fermented soybean, used to make flavorful chutneys and curries.' },
    ],
    festivals: [
        { name: 'Hornbill Festival', imageId: 'festival-hornbill', description: 'A celebration held every year from 1 to 10 December, to showcase the rich culture of Nagaland.' },
    ],
    artForms: [
        { name: 'Naga Shawls', imageId: 'art-naga-shawls', description: 'Distinctive shawls woven by different Naga tribes, each with unique patterns and colours.' },
    ],
  },
  {
    slug: 'punjab',
    name: 'Punjab',
    description: 'The "Land of Five Rivers", Punjab is a vibrant state known for its rich agricultural fields, spirited culture, and historical significance.',
    imageId: 'state-punjab',
    monuments: [
        { name: 'Golden Temple', imageId: 'hero-golden-temple', description: 'The holiest Gurdwara and the most important pilgrimage site of Sikhism.' },
    ],
    cuisine: [
        { name: 'Makki di Roti and Sarson da Saag', imageId: 'cuisine-makki-roti-saag', description: 'A classic Punjabi dish of unleavened corn bread served with a mustard greens curry.' },
    ],
    festivals: [
        { name: 'Baisakhi', imageId: 'festival-baisakhi', description: 'A spring harvest festival for Sikhs and Hindus, which also marks the Sikh New Year.' },
    ],
    artForms: [
        { name: 'Phulkari', imageId: 'art-phulkari', description: 'A traditional embroidery style from the Punjab region, known for its vibrant colours and floral motifs.' },
    ],
  },
  {
    slug: 'sikkim',
    name: 'Sikkim',
    description: 'A small state in the eastern Himalayas, bordered by Bhutan, Tibet and Nepal. Part of the Himalayas, the area has a dramatic landscape that includes India’s highest mountain, 8,586m Kangchenjunga.',
    imageId: 'state-sikkim',
    monuments: [
        { name: 'Rumtek Monastery', imageId: 'monument-rumtek-monastery', description: 'A sprawling monastery, the seat of the Karmapa Lama, showcasing Tibetan Buddhist architecture.' },
    ],
    cuisine: [
        { name: 'Momo', imageId: 'cuisine-momo', description: 'Steamed dumplings filled with meat or vegetables, a popular Tibetan-influenced dish.' },
    ],
    festivals: [
        { name: 'Saga Dawa', imageId: 'festival-saga-dawa', description: 'An auspicious month for Sikkimese Buddhists, celebrating the birth, enlightenment, and nirvana of Buddha.' },
    ],
    artForms: [
        { name: 'Thangka Painting', imageId: 'art-thangka', description: 'A Tibetan Buddhist painting on cotton, or silk appliqué, usually depicting a Buddhist deity, scene, or mandala.' },
    ],
  },
  {
    slug: 'tamil-nadu',
    name: 'Tamil Nadu',
    description: 'A southern state famed for its Dravidian-style Hindu temples, classical dance, and delicious cuisine.',
    imageId: 'state-tamil-nadu',
    monuments: [
        { name: 'Meenakshi Amman Temple', imageId: 'monument-meenakshi-temple', description: 'A historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai.' },
    ],
    cuisine: [
        { name: 'Pongal', imageId: 'cuisine-pongal', description: 'A sweet or savory rice dish, often cooked during the harvest festival.' },
    ],
    festivals: [
        { name: 'Pongal Festival', imageId: 'festival-pongal', description: 'A four-day harvest festival dedicated to the Sun God.' },
    ],
    artForms: [
        { name: 'Bharatanatyam', imageId: 'art-bharatanatyam', description: 'A major genre of Indian classical dance that originated in the Hindu temples of Tamil Nadu.' },
    ],
  },
  {
    slug: 'telangana',
    name: 'Telangana',
    description: 'India\'s youngest state, carved out of Andhra Pradesh, with a rich history of Nizam rule and a burgeoning IT industry.',
    imageId: 'state-telangana',
    monuments: [
        { name: 'Charminar', imageId: 'monument-charminar', description: 'A monument and mosque located in Hyderabad, listed as an archaeological and architectural treasure.' },
    ],
    cuisine: [
        { name: 'Hyderabadi Biryani', imageId: 'cuisine-hyderabadi-biryani', description: 'A famous rice dish made with basmati rice, meat, and spices.' },
    ],
    festivals: [
        { name: 'Bathukamma', imageId: 'festival-bathukamma', description: 'A flower-festival celebrated by the Hindu women of Telangana.' },
    ],
    artForms: [
        { name: 'Bidriware', imageId: 'art-bidriware', description: 'A metal handicraft that originated in Bidar, known for its striking inlay artwork.' },
    ],
  },
  {
    slug: 'tripura',
    name: 'Tripura',
    description: 'A hilly state in northeast India, bordered on 3 sides by Bangladesh, and home to a diverse mix of tribal cultures and religious groups.',
    imageId: 'state-tripura',
    monuments: [
        { name: 'Ujjayanta Palace', imageId: 'monument-ujjayanta-palace', description: 'A former royal palace of the Tripura kingdom situated in Agartala.' },
    ],
    cuisine: [
        { name: 'Chauk', imageId: 'cuisine-chauk', description: 'A traditional Tripuri rice beer, an essential part of their culture.' },
    ],
    festivals: [
        { name: 'Kharchi Puja', imageId: 'festival-kharchi-puja', description: 'A week-long festival to worship the fourteen gods of the Tripuri pantheon.' },
    ],
    artForms: [
        { name: 'Bamboo and Cane Crafts', imageId: 'art-tripura-bamboo', description: 'Handicrafts made from bamboo and cane are a specialty of the state.' },
    ],
  },
  {
    slug: 'uttarakhand',
    name: 'Uttarakhand',
    description: 'Known as "Devbhumi" or "Land of the Gods", this Himalayan state is famous for its pilgrimage sites, stunning natural beauty, and yoga retreats.',
    imageId: 'state-uttarakhand',
    monuments: [
        { name: 'Badrinath Temple', imageId: 'monument-badrinath-temple', description: 'A Hindu temple dedicated to Vishnu which is situated in the town of Badrinath.' },
    ],
    cuisine: [
        { name: 'Kafuli', imageId: 'cuisine-kafuli', description: 'A thick, gravy-like dish made from spinach and fenugreek leaves.' },
    ],
    festivals: [
        { name: 'Kumbh Mela', imageId: 'festival-kumbh-mela', description: 'A major pilgrimage and festival in Hinduism, held periodically at Haridwar.' },
    ],
    artForms: [
        { name: 'Aipan Art', imageId: 'art-aipan', description: 'A ritualistic folk art, native to the Kumaon region of the Indian Himalayas.' },
    ],
  },
  {
    slug: 'west-bengal',
    name: 'West Bengal',
    description: 'A state in eastern India, between the Himalayas and the Bay of Bengal. Its capital, Kolkata (formerly Calcutta), retains architectural and cultural remnants of its past as an East India Company trading post and capital of the British Raj.',
    imageId: 'state-west-bengal',
    monuments: [
        { name: 'Victoria Memorial', imageId: 'monument-victoria-memorial', description: 'A large marble building in Kolkata, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria.' },
    ],
    cuisine: [
        { name: 'Rasgulla', imageId: 'cuisine-rasgulla', description: 'A syrupy dessert popular in the Indian subcontinent and regions with South Asian diaspora. It is made from ball-shaped dumplings of chhena and semolina dough, cooked in light syrup made of sugar.' },
    ],
    festivals: [
        { name: 'Durga Puja', imageId: 'festival-durga-puja', description: 'An annual Hindu festival originating in the Indian subcontinent which reveres and pays homage to the Hindu goddess, Durga.' },
    ],
    artForms: [
        { name: 'Kantha Embroidery', imageId: 'art-kantha-embroidery', description: 'A type of embroidery craft in the eastern regions of the Indian subcontinent, specifically in Bangladesh and in the Indian states of West Bengal and Tripura.' },
    ],
  },
];

export const getImageUrl = (imageId: string, placeholderImages: any[]) => {
  const image = placeholderImages.find(img => img.id === imageId);
  return image ? image.imageUrl : 'https://picsum.photos/seed/error/600/400';
};
