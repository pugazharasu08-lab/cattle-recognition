import type { CattleBreedInfo } from '../types/cattle';

export const CATTLE_BREEDS: CattleBreedInfo[] = [
  // ─── INDIGENOUS CATTLE ───────────────────────────────────────────────────────
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Montgomery / Sahiwal district, undivided Punjab (now Pakistan)',
    primaryState: 'Punjab / Haryana / Rajasthan',
    purpose: 'Dairy',
    averageYield: '14–24 litres/day',
    milkDailyMin: 14,
    milkDailyMax: 24,
    characteristics: [
      'Reddish-dun, pale red, or brownish-red coat color',
      'Loose skin with an exceptionally large, pendulous dewlap (called "Lola")',
      'Short stumpy horns, thick at the base',
      'Broad head, slightly dished forehead',
      'Voluminous udder with well-placed cylindrical teats'
    ],
    eyeFeatures: [
      'Soft, calm dark eyes',
      'Moderately large with a gentle expression',
      'Well-defined eyelids with some pigmentation',
      'Eyes positioned on a broad, slightly dished forehead',
      'Characteristic quiet and docile eye appearance'
    ],
    hornFeatures: [
      'Short, stumpy horns',
      'Thick at the base and tapering quickly',
      'May curve slightly upward or outward',
      'Both genders have short horns'
    ],
    earFeatures: [
      'Medium-sized semi-pendulous ears',
      'Moderate in length, hanging loosely',
      'Skin of inner ear visible and lightly pigmented',
      'Softer and less dramatically shaped than Gir ears'
    ],
    coatColor: 'Reddish-dun to brownish-red; uniform coloring with a soft sheen',
    bodyStructure: 'Deep, wide barrel; heavy pendulous dewlap (Lola); well-developed dairy udder conformation; calm and slow-moving',
    temperament: 'Calm, docile, lethargic movement — easiest to handle',
    climateSuitability: 'Very good tropical heat tolerance; thrives in hot, humid conditions',
    uses: ['High milk production', 'Butter and ghee production', 'Crossbreeding with Jersey and HF for tropical adaptation'],
    imageUrl: '/images/breeds/sahiwal.jpg',
    description: 'Sahiwal is regarded as the highest milk-producing indigenous dairy cow in the Indian subcontinent. Known colloquially as "Lola" due to its loose, voluminous skin folds. It produces rich milk with high butterfat content and thrives under tropical conditions where exotic breeds struggle.',
    keyDistinctions: ['Reddish-dun coat', 'Heavy loose dewlap (Lola)', 'Short stumpy thick-based horns'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'gir',
    name: 'Gir',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Gir Hills & Kathiawar Forests, Gujarat, India',
    primaryState: 'Gujarat',
    purpose: 'Dairy',
    averageYield: '8–20 litres/day',
    milkDailyMin: 8,
    milkDailyMax: 20,
    characteristics: [
      'Prominently convex, dome-shaped forehead (bony shield)',
      'Long, pendulous spirally curled leaf-like ears',
      'Horns curved backward and downward, then turning upward',
      'Coat ranging from speckled red to deep mahogany or white with red spots',
      'Well-developed loose dewlap and pendulous hump'
    ],
    eyeFeatures: [
      'Large, dark prominent eyes',
      'Heavy, well-defined eyelids',
      'Dark pigmentation around the eye area',
      'Alert and calm eye expression',
      'Eyes set wide apart on the broad forehead'
    ],
    hornFeatures: [
      'Horns emerge from the sides of the poll',
      'Curve backward and downward, then turn upward at tips',
      'Medium thickness at base',
      'Distinctive lyre-like curved profile'
    ],
    earFeatures: [
      'Very long, pendulous, leaf-shaped ears',
      'Ears hang downward with a characteristic notch at the tip',
      'Inner surface of ear has a distinctive groove (spirally curled)',
      'One of the most distinctive ear shapes among Indian breeds'
    ],
    coatColor: 'Reddish-brown with white spots; ranges from speckled to deep mahogany or pure white with red patches',
    bodyStructure: 'Medium to large frame, well-muscled, with prominent cervical hump. Deep barrel, loose pendulous dewlap.',
    temperament: 'Gentle, docile, highly affectionate towards handlers',
    climateSuitability: 'Excellent tropical heat and humidity tolerance; good tick resistance',
    uses: ['Dairy production', 'A2 milk production', 'Crossbreeding programs', 'Export genetics to Brazil and USA'],
    imageUrl: '/images/breeds/gir.jpg',
    description: 'The Gir is one of the most famous Zebu (Bos indicus) dairy cattle breeds in the world, originating from the Gir hills of Gujarat. Renowned for tropical heat resistance, tick immunity, and A2 beta-casein rich milk. The breed is highly valued globally, especially in Brazil where it forms the foundation of the Guzerat breed.',
    keyDistinctions: ['Dome-shaped forehead', 'Spirally curled leaf-like ears with notch at tip', 'Backwards-swept curved horns'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'red-sindhi',
    name: 'Red Sindhi',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Karachi and Hyderabad regions of Sindh (now Pakistan)',
    primaryState: 'Rajasthan / Tamil Nadu (breeding tracts)',
    purpose: 'Dairy',
    averageYield: '10–18 litres/day',
    milkDailyMin: 10,
    milkDailyMax: 18,
    characteristics: [
      'Deep, rich dark red coat color, varying from brownish-red to dull yellow-red',
      'Compact, well-proportioned body frame — smaller than Sahiwal',
      'Short horns emerging laterally, curving upward and forward',
      'Hump of moderate size in females, massive and muscular in bulls',
      'Excellent resistance to tropical diseases and ticks'
    ],
    eyeFeatures: [
      'Bright, alert dark eyes',
      'Well-defined eyelids with dark pigmentation',
      'Slightly smaller than Sahiwal eyes but equally alert',
      'Set on a moderately broad forehead',
      'Sharp, intelligent expression'
    ],
    hornFeatures: [
      'Short horns emerging from the sides of the poll',
      'Curve upward and slightly forward',
      'Moderate thickness at base'
    ],
    earFeatures: [
      'Medium-sized, semi-pendulous ears',
      'Moderately long and hanging',
      'Similar to Sahiwal but slightly smaller'
    ],
    coatColor: 'Uniform deep dark red to reddish-brown; sometimes with slightly lighter areas on the belly',
    bodyStructure: 'Compact, well-proportioned, medium frame; moderate hump; less pendulous dewlap than Sahiwal',
    temperament: 'Intelligent, alert and responsive',
    climateSuitability: 'Excellent tropical and arid zone adaptation; one of the most heat-tolerant breeds',
    uses: ['Dairy production', 'Crossbreeding in hot/humid regions', 'Conservation breeding programs'],
    imageUrl: '/images/breeds/red-sindhi.jpg',
    description: 'Red Sindhi closely resembles Sahiwal in milk production but is smaller and more compact, with a darker, more uniform red color. Widely used across South Asia and Africa for tropical crossbreeding programs due to its exceptional heat and disease tolerance.',
    keyDistinctions: ['Deep uniform dark red color', 'Compact frame — smaller than Sahiwal', 'Lateral upward-curving horns'],
    conservationStatus: 'Priority Conservation'
  },
  {
    id: 'kankrej',
    name: 'Kankrej',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Rann of Kutch and Banaskantha, Gujarat',
    primaryState: 'Gujarat / Rajasthan',
    purpose: 'Dual Purpose',
    averageYield: '8–14 litres/day',
    milkDailyMin: 8,
    milkDailyMax: 14,
    characteristics: [
      'Magnificent lyre-shaped horns curling outwards and upwards',
      'Silver-gray to iron-gray or dark ash coat color',
      'Broad, dished forehead with a prominent center ridge',
      'Characteristic "Sawai Chal" walking gait (1¼ pace)',
      'Muscular, regal posture with high-set shoulder hump'
    ],
    eyeFeatures: [
      'Large, round, prominent dark eyes',
      'Wide-set on a broad dished forehead',
      'Alert and spirited expression',
      'Well-defined dark eyelids with lashes',
      'Eyes often appear to have a gleam or shine'
    ],
    hornFeatures: [
      'Large, lyre-shaped horns — one of the most distinctive features',
      'Emerge from the poll and curve outward and upward',
      'Thick at base, tapering to sharp tips',
      'Impressive span — can reach 60–75 cm across'
    ],
    earFeatures: [
      'Medium to large, semi-pendulous ears',
      'Hang downward and slightly forward',
      'Inner surface visible with light pigmentation'
    ],
    coatColor: 'Silver-gray to iron-gray or dark ash; darker shading over the shoulders and neck',
    bodyStructure: 'Heavy, large frame; high, prominent hump; deep chest; powerful legs suited for draught work',
    temperament: 'Spirited, alert and proud stride — known for the graceful Sawai Chal gait',
    climateSuitability: 'Well adapted to semi-arid and hot conditions of Gujarat and Rajasthan',
    uses: ['Agricultural draught work', 'Dairy production', 'Founder of Brahman and other Zebu genetics globally'],
    imageUrl: '/images/breeds/kankrej.jpg',
    description: 'Kankrej is one of the heaviest and most majestic indigenous cattle breeds of India, famed for its massive lyre-shaped horns and graceful Sawai Chal gait. Prized for powerful draught work and decent milk yield, it has contributed genetics to several global cattle breeds.',
    keyDistinctions: ['Massive lyre-shaped curved horns', 'Sawai Chal gait', 'Silver-gray coat with dark shoulders'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'ongole',
    name: 'Ongole',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Prakasam & Guntur districts, Andhra Pradesh',
    primaryState: 'Andhra Pradesh',
    purpose: 'Dual Purpose',
    averageYield: '6–12 litres/day',
    milkDailyMin: 6,
    milkDailyMax: 12,
    characteristics: [
      'Gleaming pure white coat with dark gray patches on neck in bulls',
      'Massive muscular body frame, heavy neck and strong stout limbs',
      'Short stumpy horns directed backwards and outwards',
      'Elliptical eyes with distinctive black rims (staring gaze)',
      'World-famous ancestor of the American Brahman beef cattle'
    ],
    eyeFeatures: [
      'Elliptical, prominent eyes',
      'Very distinctive dark black rim/ring around the eye',
      'Staring, forward-directed gaze',
      'Alert expression that is characteristic of the breed',
      'Black eyelashes on the dark-rimmed eyelids'
    ],
    hornFeatures: [
      'Short, stumpy horns',
      'Directed outward and backward',
      'Thick at base with slight taper',
      'Black coloring at the tips'
    ],
    earFeatures: [
      'Medium-sized, somewhat pendulous ears',
      'Moderately long and drooping',
      'Inner ear skin visible and lightly pigmented'
    ],
    coatColor: 'Pure gleaming white; bulls may have dark gray patches on neck and shoulders',
    bodyStructure: 'Very large, heavily muscled; prominent high hump; deep barrel; massive neck; strong legs',
    temperament: 'Docile in females; powerful and imposing in bulls',
    climateSuitability: 'Excellent tropical and coastal adaptation; heat and humidity tolerant',
    uses: ['Draught power', 'Dairy production', 'Ancestor of American Brahman and global beef breeds'],
    imageUrl: '/images/breeds/ongole.jpg',
    description: 'Ongole is a world-renowned indigenous breed from coastal Andhra Pradesh. Exported to Brazil, USA, and Australia where it became the foundational genetic pillar for global tropical beef and draught cattle. The breed is recognized by its gleaming white coat and distinctive black-rimmed eyes.',
    keyDistinctions: ['Pure white coat with black-rimmed elliptical eyes', 'Massive muscular body', 'Short stumpy backward-directed horns'],
    conservationStatus: 'Priority Conservation'
  },
  {
    id: 'tharparkar',
    name: 'Tharparkar',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Tharparkar desert, Rajasthan/Sindh border',
    primaryState: 'Rajasthan / Gujarat',
    purpose: 'Dual Purpose',
    averageYield: '10–15 litres/day',
    milkDailyMin: 10,
    milkDailyMax: 15,
    characteristics: [
      'Pure white or light gray coat with darker gray neck and hump',
      'Convex forehead with medium-sized semi-pendulous ears',
      'Medium horns turning upwards with a forward curve',
      'Remarkable desert endurance, surviving on coarse desert shrubs',
      'Strong straight legs and hard black hooves suited for arid terrain'
    ],
    eyeFeatures: [
      'Medium-sized dark eyes',
      'Well-defined eyelids',
      'Alert expression appropriate for a desert-adapted breed',
      'Dark pigmentation around the eye',
      'Bright, clear eyes even in harsh desert conditions'
    ],
    hornFeatures: [
      'Medium-length horns turning upward with a slight forward curve',
      'Moderate thickness',
      'Light colored at base, darkening to tips'
    ],
    earFeatures: [
      'Medium-sized, semi-pendulous ears',
      'Moderate droop with visible inner surface',
      'Neither as long as Gir nor as short as typical dual-purpose breeds'
    ],
    coatColor: 'Luminescent white to light gray; darker gray shading on neck, hump, and shoulders',
    bodyStructure: 'Medium frame; compact and sturdy for desert conditions; moderate hump; hard hooves',
    temperament: 'Hardy, active and energetic — well adapted to harsh conditions',
    climateSuitability: 'Exceptional arid and semi-arid zone adaptation; survives drought and extreme temperatures',
    uses: ['Dairy production in desert regions', 'Draught work in arid zones', 'Desert farming communities'],
    imageUrl: '/images/breeds/tharparkar.jpg',
    description: 'Tharparkar, also known as "White Sindhi", is a celebrated dual-purpose breed from the Thar Desert. It produces admirable milk yields even under desert drought stress. The breed is genetically adapted to survive on minimal water and coarse vegetation.',
    keyDistinctions: ['Luminescent white/light gray coat', 'Black muzzle and hooves', 'Hardy desert physiology'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'rathi',
    name: 'Rathi',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Bikaner, Ganganagar, and Jaisalmer districts, Rajasthan',
    primaryState: 'Rajasthan',
    purpose: 'Dairy',
    averageYield: '10–16 litres/day',
    milkDailyMin: 10,
    milkDailyMax: 16,
    characteristics: [
      'Brown or black coat with large irregular white patches (piebald pattern)',
      'Medium-sized body with broad hips and deep chest',
      'Short to medium horns curving outwards and forwards',
      'Moderately loose skin and well-developed hump',
      'High adaptability to desert temperatures exceeding 48°C'
    ],
    eyeFeatures: [
      'Soft, medium-sized dark eyes',
      'Quiet and friendly eye expression',
      'Well-defined eyelids',
      'Moderate pigmentation around the eye area',
      'Positioned on a moderately broad forehead'
    ],
    hornFeatures: [
      'Short to medium length horns',
      'Curve outward and slightly forward',
      'Moderate thickness at base'
    ],
    earFeatures: [
      'Medium-sized, slightly pendulous ears',
      'Moderate droop',
      'Similar to Sahiwal in proportion'
    ],
    coatColor: 'Brown or black with large irregular white patches (piebald/parti-colored pattern)',
    bodyStructure: 'Medium frame; broad hips; deep chest; well-developed dairy udder; moderate hump',
    temperament: 'Quiet and friendly — easy to handle',
    climateSuitability: 'Excellent desert adaptation; tolerates extreme heat and minimal feed conditions',
    uses: ['Dairy production in arid zones', 'Desert farming', 'High-fat milk production'],
    imageUrl: '/images/breeds/rathi.jpg',
    description: 'Rathi is an efficient indigenous dairy breed native to the arid districts of Rajasthan. Known for turning coarse desert vegetation into high-fat milk. The piebald brown/black and white coat pattern is highly distinctive.',
    keyDistinctions: ['Piebald coat (brown/black and white patches)', 'Desert adaptation', 'Compact dairy conformation'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'hariana',
    name: 'Hariana',
    species: 'Cow',
    breedType: 'Indigenous',
    origin: 'Rohtak, Karnal, Jind, Hisar districts, Haryana',
    primaryState: 'Haryana / Punjab / Western UP',
    purpose: 'Dual Purpose',
    averageYield: '8–12 litres/day',
    milkDailyMin: 8,
    milkDailyMax: 12,
    characteristics: [
      'Light gray to white coat with dark gray shading over bull shoulders',
      'Narrow long face with flat forehead',
      'Short horns curved inwards and upwards',
      'Compact, athletic body with tight skin and moderate dewlap',
      'Supreme draught power for agricultural plowing and transport'
    ],
    eyeFeatures: [
      'Medium-sized, alert dark eyes',
      'Well-defined eyelids',
      'Agile and alert expression',
      'Eyes set on a narrow, long face',
      'Moderate pigmentation around the eye area'
    ],
    hornFeatures: [
      'Short horns',
      'Curve inward and upward',
      'Light-colored with darker tips'
    ],
    earFeatures: [
      'Medium-sized ears',
      'Moderate pendulousness',
      'Less dramatic than Gir or Sahiwal'
    ],
    coatColor: 'Light gray to white; bulls have dark gray shading over neck and shoulders',
    bodyStructure: 'Compact, athletic body; tight skin; moderate dewlap; well-muscled legs for draught work',
    temperament: 'Alert, agile and hardworking — bred for speed and stamina',
    climateSuitability: 'Well adapted to North Indian plains and semi-arid conditions',
    uses: ['Agricultural draught work', 'Fast trotting plowing', 'Dairy production for rural families'],
    imageUrl: '/images/breeds/hariana.jpg',
    description: 'Hariana is the premier dual-purpose cattle breed of North India. Bullocks are celebrated for fast trotting and plowing efficiency, while cows provide substantial milk. The breed is known for its athletic build and distinct narrow face.',
    keyDistinctions: ['Long narrow face with flat forehead', 'Short inward-curving horns', 'Tight skin with athletic build'],
    conservationStatus: 'Abundant'
  },

  // ─── EXOTIC / CROSSBRED ─────────────────────────────────────────────────────
  {
    id: 'jersey',
    name: 'Jersey',
    species: 'Cow',
    breedType: 'Exotic',
    origin: 'Island of Jersey, Channel Islands, United Kingdom',
    primaryState: 'Pan-India (crossbreeding programs, hilly regions)',
    purpose: 'Dairy',
    averageYield: '18–30 litres/day',
    milkDailyMin: 18,
    milkDailyMax: 30,
    characteristics: [
      'Fawn, light tan, or golden-brown coat color',
      'Distinctive dished face with large, deer-like prominent eyes',
      'Black muzzle surrounded by a white or cream-colored ring',
      'No cervical hump (Bos taurus — European breed)',
      'Highest milk fat content among major dairy breeds (4.8%–5.5%)'
    ],
    eyeFeatures: [
      'Very large, prominent, deer-like eyes — one of the most distinctive features',
      'Soft, gentle brown color',
      'Wide-set and forward-facing on the dished face',
      'Long eyelashes framing large eyes',
      'Gentle, calm expression characteristic of the breed'
    ],
    hornFeatures: [
      'Small, fine horns in naturally horned animals',
      'Often polled (hornless) in modern dairy herds',
      'When present, thin and delicate, curving slightly forward'
    ],
    earFeatures: [
      'Small to medium, fine-textured ears',
      'Positioned well on a refined head',
      'Less pendulous than Indian breeds'
    ],
    coatColor: 'Fawn to golden-brown; light tan; may have darker face and back',
    bodyStructure: 'Small to medium refined frame; no dorsal hump; straight backline; very well-developed udder',
    temperament: 'Gentle and curious; bulls can be aggressive',
    climateSuitability: 'Moderate; better tropical tolerance than Holstein; requires shade and water in hot conditions',
    uses: ['High-fat dairy production', 'Ghee and butter production', 'Crossbreeding with Sahiwal/Gir for tropical adaptation'],
    imageUrl: '/images/breeds/jersey.jpg',
    description: 'Jersey is a British dairy breed widely used in India due to its high fat milk, smaller body size, and better heat tolerance compared to other European breeds. The breed is instantly recognizable by its characteristic dished face and large deer-like eyes.',
    keyDistinctions: ['Fawn/golden color with dished face', 'Large deer-like eyes', 'No hump', 'White ring around dark muzzle'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'holstein-friesian',
    name: 'Holstein Friesian',
    species: 'Cow',
    breedType: 'Exotic',
    origin: 'Friesland (Netherlands) & Schleswig-Holstein (Germany)',
    primaryState: 'Pan-India (high-production commercial dairy farms)',
    purpose: 'Dairy',
    averageYield: '25–45 litres/day',
    milkDailyMin: 25,
    milkDailyMax: 45,
    characteristics: [
      'Distinctive black and white piebald markings (well-defined bold boundaries)',
      'Very large body frame (adult females weigh 650–750 kg)',
      'Straight backline and complete absence of dorsal thoracic hump',
      'Massive, highly vascularized udder with prominent milk veins',
      'Requires cool shelter and high management under Indian climate'
    ],
    eyeFeatures: [
      'Medium to large, calm eyes',
      'Distinct dark pigmentation on lids',
      'Set on a refined, straight face',
      'Alert but docile expression',
      'May have distinctive black or white coloring around the eye area depending on coat pattern'
    ],
    hornFeatures: [
      'Small, fine horns in naturally horned animals',
      'Modern dairy herds are typically dehorned or polled',
      'When present, small and pointing slightly forward'
    ],
    earFeatures: [
      'Medium-sized, upright ears',
      'Less pendulous than Indian breeds',
      'Fine skin texture',
      'May be black or white depending on coat pattern'
    ],
    coatColor: 'Bold, well-defined black and white piebald patches; pattern is unique to each animal',
    bodyStructure: 'Very large frame; straight back; no hump; angular dairy conformation; massive rear udder',
    temperament: 'Docile and routine-oriented; responds well to consistent management',
    climateSuitability: 'Poor without management; requires cool shade, fans, water spraying in Indian climate',
    uses: ['Highest milk output for commercial dairy', 'Commercial dairy farms', 'Crossbreeding with Gir/Sahiwal for climate tolerance'],
    imageUrl: '/images/breeds/holstein-friesian.jpg',
    description: 'Holstein Friesian is the highest milk-producing dairy animal in the world. In India, primarily used in commercial high-tech dairy enterprises or crossbred with indigenous Sahiwal/Gir to impart climate tolerance. The bold black-and-white piebald pattern makes it instantly recognizable.',
    keyDistinctions: ['Bold black and white patches', 'Huge body frame', 'No dorsal hump', 'Massive udder with visible milk veins'],
    conservationStatus: 'Abundant'
  },

  // ─── BUFFALO BREEDS ──────────────────────────────────────────────────────────
  {
    id: 'murrah',
    name: 'Murrah',
    species: 'Buffalo',
    breedType: 'Indigenous',
    origin: 'Rohtak, Hisar, Jind (Haryana) and Nabha, Patiala (Punjab)',
    primaryState: 'Haryana / Punjab',
    purpose: 'Dairy',
    averageYield: '14–25 litres/day',
    milkDailyMin: 14,
    milkDailyMax: 25,
    characteristics: [
      'Jet black coat, skin, and muzzle (called "Black Gold")',
      'Tightly curled spiral horns ("Jalebi" shape) — most distinctive feature',
      'Short, fine hair and wedge-shaped, feminine head',
      'Broad, deep barrel and massive pendulous udder',
      'High butterfat content (7.5%–8.5%)'
    ],
    eyeFeatures: [
      'Prominent, round eyes characteristic of buffalo',
      'Dark to reddish-brown eye color',
      'Wide-set on the broad head',
      'Calm and docile expression',
      'Dark pigmentation around the eye area on the black skin'
    ],
    hornFeatures: [
      'Tightly coiled spiral horns — the definitive breed marker',
      'Curl backward and inward like a coiled spring (Jalebi shape)',
      'Emerge from the sides of the head',
      'Black coloring throughout'
    ],
    earFeatures: [
      'Medium-sized, moderately pendulous ears',
      'Black skin inside and outside',
      'Alert positioning on the head',
      'Buffalo ear shape — broader and less refined than cattle'
    ],
    coatColor: 'Jet black throughout; skin and muzzle are uniformly black; may have white markings on tail or feet in some animals',
    bodyStructure: 'Large, wedge-shaped body; deep barrel; massive pendulous udder; sturdy legs; well-muscled',
    temperament: 'Docile and responsive to owner; fond of wallowing in water',
    climateSuitability: 'Well adapted to hot humid conditions; requires wallowing water or shade',
    uses: ['Premium dairy production', 'High-fat milk for paneer and ghee', 'Genetic export globally for buffalo dairy improvement'],
    imageUrl: '/images/breeds/murrah.jpg',
    description: 'Murrah is the undisputed queen of dairy buffaloes worldwide. Known as the "Black Gold" of Haryana, it is the premier contributor to India\'s global #1 buffalo milk production. The tightly coiled Jalebi-shaped horns are the definitive distinguishing feature.',
    keyDistinctions: ['Jet black body', 'Tightly coiled spiral horns (Jalebi curl)', 'High butterfat milk (7.5%–8.5%)'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'jaffarabadi',
    name: 'Jaffarabadi',
    species: 'Buffalo',
    breedType: 'Indigenous',
    origin: 'Gir Forest, Junagadh, and Jamnagar, Gujarat',
    primaryState: 'Gujarat',
    purpose: 'Dairy',
    averageYield: '12–18 litres/day',
    milkDailyMin: 12,
    milkDailyMax: 18,
    characteristics: [
      'Heaviest of all Indian buffalo breeds (males up to 1,000 kg)',
      'Massive, heavy horns dropping down on sides of neck, turning up at tips',
      'Prominently bulging frontal forehead shield',
      'Deep, long body with wide chest and strong legs',
      'Exceptional strength — historically deterred Gir forest predators'
    ],
    eyeFeatures: [
      'Large, round, prominent buffalo eyes',
      'Set on the wide, broad forehead',
      'Dark brownish eye color',
      'Alert expression befitting a large, powerful animal',
      'Prominent eye area due to the bulging forehead structure'
    ],
    hornFeatures: [
      'Massive, heavy horns — most impressive of all buffalo breeds',
      'Drop down along the sides of the neck',
      'Then curve upward at the tips',
      'Much larger and heavier than Murrah horns'
    ],
    earFeatures: [
      'Large, broad, pendulous ears',
      'Dark skin inside and out',
      'Heavy droop characteristic of the large breed'
    ],
    coatColor: 'Black to very dark gray; some animals may have brown tones in the coat',
    bodyStructure: 'Massive frame; heaviest Indian buffalo; very deep and broad body; powerful legs',
    temperament: 'Formidable in size but calm with familiar caretakers',
    climateSuitability: 'Adapted to coastal Gujarat; good heat tolerance with access to water',
    uses: ['Dairy production', 'High-fat milk for ghee and traditional products', 'Genetic conservation'],
    imageUrl: '/images/breeds/jaffarabadi.jpg',
    description: 'Jaffarabadi is the heaviest buffalo breed in India, originating from the Gir forests of Saurashtra, Gujarat. Known for its massive drooping horns that curve upward at the tips and a prominently bulging forehead, it produces high-fat milk.',
    keyDistinctions: ['Massive drooping horns that curve upward at tips', 'Prominent forehead bulge', 'Largest/heaviest Indian buffalo'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'mehsana',
    name: 'Mehsana',
    species: 'Buffalo',
    breedType: 'Indigenous',
    origin: 'Mehsana, Sabarkantha, Banaskantha districts, Gujarat',
    primaryState: 'Gujarat',
    purpose: 'Dairy',
    averageYield: '12–18 litres/day',
    milkDailyMin: 12,
    milkDailyMax: 18,
    characteristics: [
      'Black or dark brown coat with moderate body size',
      'Horns less tightly coiled than Murrah, with more open curving',
      'Slender, longer face compared to Murrah',
      'Well-developed udder with good milk veins',
      'Crossbred origin: Murrah × Surti — combines traits of both'
    ],
    eyeFeatures: [
      'Medium-sized round eyes',
      'Dark brownish eye color',
      'Set on a longer, more slender face than Murrah',
      'Alert expression',
      'Dark skin pigmentation around the eye area'
    ],
    hornFeatures: [
      'Horns curve backward and upward — less tightly coiled than Murrah',
      'More open curl than Murrah Jalebi horns',
      'Intermediate between Murrah and Surti horn shape'
    ],
    earFeatures: [
      'Medium-sized, moderately pendulous ears',
      'Similar to Murrah in size and character',
      'Dark skin'
    ],
    coatColor: 'Black to dark brown throughout',
    bodyStructure: 'Medium-large frame; well-developed dairy body; good udder development',
    temperament: 'Docile and manageable',
    climateSuitability: 'Good adaptation to Gujarat conditions; hot humid tolerance',
    uses: ['Commercial dairy production', 'High milk yield for cooperatives', 'Popular in Gujarat dairy sector'],
    imageUrl: '/images/breeds/mehsana.jpg',
    description: 'Mehsana buffalo is a high-yielding breed developed through natural selection crossing of Murrah and Surti buffaloes in North Gujarat. It is one of the most commercially important buffalo breeds in India, popular among dairy cooperatives.',
    keyDistinctions: ['Less tightly curled horns than Murrah', 'Slender longer face', 'Crossbred Murrah × Surti characteristics'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'surti',
    name: 'Surti',
    species: 'Buffalo',
    breedType: 'Indigenous',
    origin: 'Kaira, Vadodara, and Bharuch districts, Gujarat',
    primaryState: 'Gujarat',
    purpose: 'Dairy',
    averageYield: '8–14 litres/day',
    milkDailyMin: 8,
    milkDailyMax: 14,
    characteristics: [
      'Rusty brown to silver-gray body color (distinctive among buffalo)',
      'Sickle-shaped flat horns directed downward, backward, then upward',
      'Two white chevron collars around the neck (distinctive marking)',
      'Medium-sized, economical body requiring less feed',
      'White switch of tail and white hair on knees'
    ],
    eyeFeatures: [
      'Medium-sized eyes with brownish color',
      'Calmer, gentler expression than Murrah',
      'Set on a moderately broad forehead',
      'Well-defined eyelids',
      'Moderate dark pigmentation'
    ],
    hornFeatures: [
      'Sickle-shaped, flat horns — distinctive curved shape',
      'Point downward and backward, then curve upward at tips',
      'Medium thickness; not as massive as Jaffarabadi'
    ],
    earFeatures: [
      'Medium-sized, moderately pendulous ears',
      'Lighter skin pigmentation inside — visible in rusty-brown animals',
      'Gentle droop'
    ],
    coatColor: 'Rusty brown to silver-gray — unusual coloring for a buffalo breed; white collar marks at throat',
    bodyStructure: 'Medium-sized; economical build; well-developed dairy udder; white knee hair and tail switch',
    temperament: 'Quiet and gentle — easiest buffalo to handle',
    climateSuitability: 'Good adaptation to Gujarat coastal conditions',
    uses: ['Smallholder dairy production', 'Economical milk production with less feed', 'Cottage dairy operations'],
    imageUrl: '/images/breeds/surti.jpg',
    description: 'Surti buffalo is a medium-sized, economical dairy buffalo of Gujarat, famous for its sickle-shaped horns, distinctive rusty-brown color, and white throat collar chevron markings. Thrives well under smallholder conditions.',
    keyDistinctions: ['Sickle-shaped downward-curving horns', 'White neck collar chevron marks', 'Rusty brown/silver-gray color'],
    conservationStatus: 'Abundant'
  },
  {
    id: 'bhadawari',
    name: 'Bhadawari',
    species: 'Buffalo',
    breedType: 'Indigenous',
    origin: 'Agra, Etawah, and Morena districts, Uttar Pradesh',
    primaryState: 'Uttar Pradesh / Madhya Pradesh',
    purpose: 'Dairy',
    averageYield: '5–8 litres/day',
    milkDailyMin: 5,
    milkDailyMax: 8,
    characteristics: [
      'Copper or brownish-red body color (distinctive among Indian buffalo)',
      'White "chevron" or V-shaped marks at the base of the neck',
      'Legs whitish from knee to hoof ("copper-legged" appearance)',
      'Medium-sized body with moderate milk production',
      'Exceptionally high butter fat content (12–14%) — highest among all buffalo breeds'
    ],
    eyeFeatures: [
      'Medium-sized, dark brownish eyes',
      'Alert expression despite medium body size',
      'Well-defined eyelids',
      'Set on a moderately broad forehead',
      'Pigmentation contrasting with the lighter copper body color'
    ],
    hornFeatures: [
      'Flat, somewhat depressed horns',
      'Directed backward and upward',
      'Medium length; less massive than Murrah or Jaffarabadi'
    ],
    earFeatures: [
      'Medium-sized ears',
      'Lighter inner skin reflecting the copper body color',
      'Moderate pendulousness'
    ],
    coatColor: 'Copper to brownish-red; lighter copper-colored legs below the knee; white chevron marks on neck',
    bodyStructure: 'Medium frame; compact build; white "copper-legged" lower legs; moderate udder development',
    temperament: 'Hardy and adaptable; good foraging ability',
    climateSuitability: 'Well adapted to the sub-humid Chambal and Yamuna river tract conditions',
    uses: ['Very high butterfat milk for ghee', 'Smallholder and marginal farmer livelihoods', 'Conservation of indigenous genetics'],
    imageUrl: '/images/breeds/bhadawari.jpg',
    description: 'Bhadawari buffalo is a medium-sized breed from the Chambal-Yamuna basin, distinctive for its copper-brown body color and exceptionally high butterfat milk (12–14%). Although milk volume is lower than Murrah, the milk quality for ghee production is unmatched.',
    keyDistinctions: ['Copper/brownish-red body color', 'White chevron neck marks', 'Copper-colored lower legs', 'Highest butterfat content of any buffalo breed'],
    conservationStatus: 'Vulnerable'
  }
];

// Seasonal health information by month
export const SEASONAL_HEALTH_INFO: Record<string, { season: string; emoji: string; risks: string[]; precautions: string[] }> = {
  'monsoon': {
    season: 'Monsoon (June–September)',
    emoji: '🌧️',
    risks: [
      'Foot-and-mouth disease (FMD) — higher risk in wet conditions',
      'Hemorrhagic septicemia (HS) — bacterial respiratory infection',
      'Black quarter (BQ) — soil-borne clostridial infection',
      'Tick and fly-borne diseases (Theileriosis, Babesiosis)',
      'Parasitic worm infections (gastro-intestinal helminthiasis)',
      'Leptospirosis through contaminated water',
      'Hoof rot and foot problems due to wet ground',
      'Mastitis risk increases in buffalo'
    ],
    precautions: [
      'Ensure clean, dry bedding areas',
      'Regular tick and fly control',
      'Keep feeding and watering areas clean',
      'Monitor for respiratory symptoms',
      'Deworming programs after monsoon'
    ]
  },
  'summer': {
    season: 'Summer (March–June)',
    emoji: '☀️',
    risks: [
      'Heat stress — significant risk for exotic and crossbred cattle',
      'Dehydration and electrolyte imbalance',
      'Reduced feed intake and milk production drop',
      'Tick and biting fly infestations increase',
      'Ecto-parasitic infections (lice, mange, ticks)',
      'Mastitis risk in poorly cooled animals',
      'Sunstroke in poorly shaded animals'
    ],
    precautions: [
      'Ensure constant access to cool, clean drinking water',
      'Provide shade and ventilation — critical for HF and Jersey',
      'Mist cooling or wallowing access for buffaloes',
      'Shift feeding to cooler hours (early morning, evening)',
      'Increase electrolyte supplementation'
    ]
  },
  'winter': {
    season: 'Winter (November–February)',
    emoji: '❄️',
    risks: [
      'Respiratory infections — pneumonia, bronchitis',
      'Cold stress in calves and exotic breeds',
      'Foot-and-mouth disease (FMD) can persist',
      'Johne\'s disease (paratuberculosis) flare-up risk',
      'Reduced fertility due to cold and nutritional stress',
      'Vitamin and mineral deficiencies in dry season'
    ],
    precautions: [
      'Provide warm, draft-free shelter for calves',
      'Blanket or cover exotic calves in cold nights',
      'Monitor feed quality — ensure adequate energy intake',
      'Check and maintain vaccination schedules',
      'Supplement vitamins A, D, E in winter months'
    ]
  }
};

// Vaccination guidance data
export const VACCINATION_GUIDANCE = [
  {
    disease: 'Foot-and-Mouth Disease (FMD)',
    emoji: '🦶',
    vaccine: 'FMD Multivalent Vaccine (O, A, Asia-1 strains)',
    timing: 'Primary course: 2 doses, 30 days apart. Booster every 6 months.',
    notes: 'One of the most important vaccines for Indian cattle. Annual campaigns organized by the Government of India under FMD-CP. Keep animals isolated after vaccination for 3 days.'
  },
  {
    disease: 'Hemorrhagic Septicemia (HS)',
    emoji: '🫁',
    vaccine: 'HS Vaccine (Pasteurella multocida)',
    timing: 'Annual vaccination; ideally before the monsoon season (April–May).',
    notes: 'Particularly important in humid, tropical regions. High-risk for buffaloes. Booster recommended annually.'
  },
  {
    disease: 'Black Quarter (BQ)',
    emoji: '💉',
    vaccine: 'BQ Vaccine (Clostridium chauvoei)',
    timing: 'Annual vaccination; before onset of monsoon.',
    notes: 'Primarily affects young cattle 6 months to 2 years. Combined BQ-HS vaccine is available. Critical in endemic areas.'
  },
  {
    disease: 'Brucellosis',
    emoji: '🔬',
    vaccine: 'Brucella abortus S19 Vaccine (for female calves only)',
    timing: 'Single dose for heifer calves between 4–8 months of age.',
    notes: 'Prevents reproductive losses and zoonotic transmission to humans. Only female calves are vaccinated. Consult a veterinarian for current regional program.'
  },
  {
    disease: 'Theileriosis (Tick Fever)',
    emoji: '🐛',
    vaccine: 'Theileria annulata Schizont Cell Culture Vaccine',
    timing: 'As per veterinary advice in endemic tick-infested areas.',
    notes: 'Particularly important for crossbred and exotic cattle (HF, Jersey) which are more susceptible. Regular tick control is equally essential.'
  }
];

// Milk production data by breed ID
export const BREED_MILK_DATA: Record<string, { dailyMin: number; dailyMax: number }> = {
  'gir': { dailyMin: 8, dailyMax: 20 },
  'sahiwal': { dailyMin: 14, dailyMax: 24 },
  'red-sindhi': { dailyMin: 10, dailyMax: 18 },
  'kankrej': { dailyMin: 8, dailyMax: 14 },
  'ongole': { dailyMin: 6, dailyMax: 12 },
  'tharparkar': { dailyMin: 10, dailyMax: 15 },
  'rathi': { dailyMin: 10, dailyMax: 16 },
  'hariana': { dailyMin: 8, dailyMax: 12 },
  'jersey': { dailyMin: 18, dailyMax: 30 },
  'holstein-friesian': { dailyMin: 25, dailyMax: 45 },
  'murrah': { dailyMin: 14, dailyMax: 25 },
  'jaffarabadi': { dailyMin: 12, dailyMax: 18 },
  'mehsana': { dailyMin: 12, dailyMax: 18 },
  'surti': { dailyMin: 8, dailyMax: 14 },
  'bhadawari': { dailyMin: 5, dailyMax: 8 }
};

export function getCurrentSeason(): 'monsoon' | 'summer' | 'winter' {
  const month = new Date().getMonth(); // 0-indexed
  if (month >= 5 && month <= 8) return 'monsoon'; // June-September
  if (month >= 2 && month <= 5) return 'summer';  // March-June
  return 'winter'; // November-February (and October/November)
}

export function getMilkEstimateByBreed(breedName: string): { dailyMin: number; dailyMax: number } | null {
  const normalizedBreedName = breedName.toLowerCase().replace(/\s+/g, '-');
  // Try exact match first
  if (BREED_MILK_DATA[normalizedBreedName]) return BREED_MILK_DATA[normalizedBreedName];
  // Try partial match
  for (const [key, value] of Object.entries(BREED_MILK_DATA)) {
    if (normalizedBreedName.includes(key) || key.includes(normalizedBreedName.split('-')[0])) {
      return value;
    }
  }
  return null;
}
