import type { RecognitionResult } from '../types/cattle';

export interface SampleCattleItem {
  id: string;
  name: string;
  badge: string;
  animalType: 'Cow' | 'Buffalo';
  breed: string;
  description: string;
  imageUrl: string;
  expectedResult: RecognitionResult;
}

export const SAMPLE_CATTLE: SampleCattleItem[] = [
  {
    id: 'sample-sahiwal',
    name: 'Sahiwal Cow (Punjab)',
    badge: 'High Yield Dairy',
    animalType: 'Cow',
    breed: 'Sahiwal',
    description: 'Reddish-dun coat, heavy pendulous dewlap (Lola), short stumpy horns, calm docile posture.',
    imageUrl: '/images/breeds/sahiwal.jpg',
    expectedResult: {
      id: 'demo-sahiwal-01',
      imageUrl: '/images/breeds/sahiwal.jpg',
      imageFileName: 'sahiwal_cow.jpg',
      animalType: 'Cow',
      breed: 'Sahiwal',
      confidence: 94,
      gender: 'Female',
      ageCategory: 'Adult',
      characteristics: [
        'Reddish-brown to dun colored coat with soft sheen',
        'Exceptionally large, loose pendulous dewlap folds (Lola)',
        'Short stumpy horns with thick bases',
        'Deep wide barrel and voluminous dairy udder conformation',
        'Calm and docile facial disposition'
      ],
      eyeFeatures: [
        'Soft, calm dark eyes with gentle expression',
        'Well-defined eyelids with subtle dark pigmentation',
        'Eyes positioned on a broad, slightly dished forehead',
        'Characteristic quiet and docile appearance',
        'Moderately large eyes reflecting the calm temperament'
      ],
      hornFeatures: [
        'Short, stumpy horns — thick at base, tapering quickly',
        'May curve slightly upward or outward',
        'Much shorter than Gir or Kankrej horns'
      ],
      earFeatures: [
        'Medium-sized semi-pendulous ears',
        'Moderate droop with visible inner surface',
        'Softer and less dramatically shaped than Gir ears'
      ],
      coatDescription: 'Reddish-dun to brownish-red; uniform coloring with a soft sheen',
      bodyStructure: 'Deep, wide barrel; heavy pendulous dewlap (Lola); well-developed dairy udder; calm slow-moving',
      breedInformation: 'Sahiwal is regarded as the highest milk-producing indigenous dairy cow in South Asia. Originally bred in the Montgomery region, it is celebrated for high butterfat content and endurance under hot, humid tropical conditions.',
      possibleBreeds: [
        { breed: 'Sahiwal', confidence: 94, reason: 'Signature loose dewlap, reddish-dun color, and short stumpy horns' },
        { breed: 'Red Sindhi', confidence: 4, reason: 'Close genetic cousin; Red Sindhi is slightly smaller and darker red' },
        { breed: 'Gir', confidence: 2, reason: 'Reddish hue, but lacks Gir convex forehead dome' }
      ],
      milkEstimate: {
        dailyMin: 14,
        dailyMax: 24,
        monthlyMin: 420,
        monthlyMax: 720,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  },
  {
    id: 'sample-gir',
    name: 'Gir Cow (Gujarat)',
    badge: 'Indigenous Dairy',
    animalType: 'Cow',
    breed: 'Gir',
    description: 'Distinctive convex dome-shaped forehead, pendulous leaf-like curled ears, reddish-brown coat.',
    imageUrl: '/images/breeds/gir.jpg',
    expectedResult: {
      id: 'demo-gir-02',
      imageUrl: '/images/breeds/gir.jpg',
      imageFileName: 'gir_cow.jpg',
      animalType: 'Cow',
      breed: 'Gir',
      confidence: 95,
      gender: 'Female',
      ageCategory: 'Adult',
      characteristics: [
        'Reddish-brown coat with speckled white patches',
        'Prominently convex, dome-shaped forehead (bony shield structure)',
        'Long pendulous ears resembling folded leaves with notch at tip',
        'Distinctive backward and downward curving horns',
        'Loose pendulous dewlap and prominent cervical hump'
      ],
      eyeFeatures: [
        'Large, dark prominent eyes',
        'Well-defined heavy eyelids',
        'Dark pigmentation around the eye area',
        'Alert and calm eye expression',
        'Eyes set wide apart on the broad dome-shaped forehead'
      ],
      hornFeatures: [
        'Horns emerge from sides of poll, curving backward and downward',
        'Tips turn upward in characteristic Gir pattern',
        'Medium thickness at base'
      ],
      earFeatures: [
        'Very long, pendulous, spirally curled leaf-shaped ears',
        'Hang downward with a characteristic notch at the tip',
        'One of the most distinctive ear shapes among Indian breeds'
      ],
      coatDescription: 'Reddish-brown coat with white spots; ranges from speckled to deep mahogany',
      bodyStructure: 'Medium to large frame; prominent cervical hump; loose pendulous dewlap',
      breedInformation: 'Gir cattle are a renowned indigenous Indian zebu dairy breed native to the Gir hills of Gujarat. They are internationally prized for tropical heat resilience, disease resistance, and rich A2 beta-casein milk production.',
      possibleBreeds: [
        { breed: 'Gir', confidence: 95, reason: 'Characteristic convex forehead and pendulous leaf-shaped ears confirm purebred Gir morphology' },
        { breed: 'Red Sindhi', confidence: 3, reason: 'Similar reddish coloration, but ear shape and cranial dome differentiate' },
        { breed: 'Sahiwal', confidence: 2, reason: 'Reddish coat tones, but lacks Sahiwal stumpy horns and Lola dewlap' }
      ],
      milkEstimate: {
        dailyMin: 8,
        dailyMax: 20,
        monthlyMin: 240,
        monthlyMax: 600,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  },
  {
    id: 'sample-red-sindhi',
    name: 'Red Sindhi Cow',
    badge: 'Tropical Dairy',
    animalType: 'Cow',
    breed: 'Red Sindhi',
    description: 'Deep uniform dark red coat, compact frame, lateral upward-curving horns, heat resilient.',
    imageUrl: '/images/breeds/red-sindhi.jpg',
    expectedResult: {
      id: 'demo-red-sindhi-03',
      imageUrl: '/images/breeds/red-sindhi.jpg',
      imageFileName: 'red_sindhi.jpg',
      animalType: 'Cow',
      breed: 'Red Sindhi',
      confidence: 92,
      gender: 'Female',
      ageCategory: 'Adult',
      characteristics: [
        'Deep, rich dark red coat color across entire body',
        'Compact, well-proportioned body frame — slightly smaller than Sahiwal',
        'Short horns emerging laterally and curving upward and forward',
        'Moderate thoracic hump and well-defined dewlap',
        'Remarkable tick resistance and heat tolerance'
      ],
      eyeFeatures: [
        'Bright, alert dark eyes',
        'Well-defined eyelids with dark pigmentation',
        'Slightly smaller than Sahiwal eyes but highly observant',
        'Set on a moderately broad forehead',
        'Sharp, intelligent expression'
      ],
      hornFeatures: [
        'Short horns emerging from sides of poll',
        'Curve upward and slightly forward',
        'Moderate thickness at base'
      ],
      earFeatures: [
        'Medium-sized, semi-pendulous ears',
        'Moderately long and hanging loosely',
        'Light pigmentation on inner surface'
      ],
      coatDescription: 'Uniform deep dark red to reddish-brown',
      bodyStructure: 'Compact, balanced frame; moderate hump; well-formed dairy conformation',
      breedInformation: 'Red Sindhi is celebrated for its deep red coloration and high tropical adaptability. Originating in the Sindh region, it is valued across South Asia for steady milk yield and heat hardiness.',
      possibleBreeds: [
        { breed: 'Red Sindhi', confidence: 92, reason: 'Deep uniform dark red coat, compact frame and lateral upward horn posture' },
        { breed: 'Sahiwal', confidence: 6, reason: 'Related breed, but Sahiwal is larger and paler dun-red' },
        { breed: 'Gir', confidence: 2, reason: 'Red tone, but lacks Gir convex forehead dome and long curled ears' }
      ],
      milkEstimate: {
        dailyMin: 10,
        dailyMax: 18,
        monthlyMin: 300,
        monthlyMax: 540,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  },
  {
    id: 'sample-kankrej',
    name: 'Kankrej Cow (Gujarat)',
    badge: 'Regal Draught & Milk',
    animalType: 'Cow',
    breed: 'Kankrej',
    description: 'Massive lyre-shaped horns, silver-grey coat, dished forehead, majestic Sawai Chal gait.',
    imageUrl: '/images/breeds/kankrej.jpg',
    expectedResult: {
      id: 'demo-kankrej-04',
      imageUrl: '/images/breeds/kankrej.jpg',
      imageFileName: 'kankrej.jpg',
      animalType: 'Cow',
      breed: 'Kankrej',
      confidence: 93,
      gender: 'Female',
      ageCategory: 'Adult',
      characteristics: [
        'Magnificent lyre-shaped horns curling outward and upward',
        'Silver-gray to ash coat with darker shading on shoulders and neck',
        'Broad, dished forehead with prominent central ridge',
        'Proud upright posture and distinctive Sawai Chal gait',
        'Powerful well-muscled frame'
      ],
      eyeFeatures: [
        'Large, round, prominent dark eyes',
        'Wide-set on broad dished forehead',
        'Alert and spirited expression',
        'Well-defined dark eyelids with lashes',
        'Clear observant gaze'
      ],
      hornFeatures: [
        'Large, sweeping lyre-shaped horns — defining hallmark',
        'Emerge from poll and curve outward and upward',
        'Thick at base, tapering to sharp tips'
      ],
      earFeatures: [
        'Medium to large, semi-pendulous ears',
        'Hang downward and slightly forward',
        'Inner surface visible with light pigmentation'
      ],
      coatDescription: 'Silver-gray to iron-gray or ash with darker shading over neck and shoulders',
      bodyStructure: 'Heavy, large frame; high prominent hump; deep chest; powerful legs',
      breedInformation: 'Kankrej is one of the heaviest and most majestic indigenous cattle breeds of India, hailing from the Rann of Kutch in Gujarat. Renowned for its regal lyre horns and powerful draught and dairy capabilities.',
      possibleBreeds: [
        { breed: 'Kankrej', confidence: 93, reason: 'Signature lyre-shaped horns, silver-gray coat, and broad dished forehead' },
        { breed: 'Ongole', confidence: 5, reason: 'White/gray coat, but Ongole lacks lyre horns and has dark-rimmed eyes' },
        { breed: 'Tharparkar', confidence: 2, reason: 'Grayish color, but horns and forehead structure differ' }
      ],
      milkEstimate: {
        dailyMin: 8,
        dailyMax: 14,
        monthlyMin: 240,
        monthlyMax: 420,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  },
  {
    id: 'sample-ongole',
    name: 'Ongole Bull (Andhra Pradesh)',
    badge: 'Dual Purpose Giant',
    animalType: 'Cow',
    breed: 'Ongole',
    description: 'Pure white gleaming coat, massive muscular hump, dark-rimmed elliptical eyes, short stumpy horns.',
    imageUrl: '/images/breeds/ongole.jpg',
    expectedResult: {
      id: 'demo-ongole-05',
      imageUrl: '/images/breeds/ongole.jpg',
      imageFileName: 'ongole_bull.jpg',
      animalType: 'Cow',
      breed: 'Ongole',
      confidence: 92,
      gender: 'Male',
      ageCategory: 'Adult',
      characteristics: [
        'Pure white coat with charcoal shading over shoulders and neck in bulls',
        'Immense, upright muscular thoracic hump',
        'Short, stumpy horns directed outwards and backwards',
        'Elliptical dark eyes surrounded by a striking black rim',
        'Muscular, heavy-boned legs and hard black hooves'
      ],
      eyeFeatures: [
        'Elliptical, prominent eyes — characteristic Ongole feature',
        'Very distinctive dark black rim/ring around each eye',
        'Forward-directed staring gaze',
        'Alert expression characteristic of the breed',
        'Black eyelashes on the dark-rimmed eyelids'
      ],
      hornFeatures: [
        'Short, stumpy horns',
        'Directed outward and backward',
        'Thick at base with black coloring at tips'
      ],
      earFeatures: [
        'Medium-sized, somewhat pendulous ears',
        'Moderately long with droop',
        'Inner ear lightly pigmented'
      ],
      coatDescription: 'Pure gleaming white; bulls have dark gray patches on neck and shoulders',
      bodyStructure: 'Very large, heavily muscled; prominent high hump; deep barrel; massive neck; very strong legs',
      breedInformation: 'Ongole is a world-renowned indigenous breed from coastal Andhra Pradesh. Exported to Brazil, USA, and Australia where it became the foundational genetic pillar for global tropical beef and draught cattle.',
      possibleBreeds: [
        { breed: 'Ongole', confidence: 92, reason: 'Massive white frame, distinctive black-rimmed elliptical eyes, and characteristic short horn posture' },
        { breed: 'Tharparkar', confidence: 5, reason: 'White coat color, but Ongole possesses much heavier frame and distinct dark eye rims' },
        { breed: 'Hariana', confidence: 3, reason: 'Light coat, but Hariana has narrower head and lighter muscular frame' }
      ],
      milkEstimate: {
        dailyMin: 6,
        dailyMax: 12,
        monthlyMin: 180,
        monthlyMax: 360,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  },
  {
    id: 'sample-murrah',
    name: 'Murrah Buffalo (Haryana)',
    badge: 'Black Gold Dairy',
    animalType: 'Buffalo',
    breed: 'Murrah',
    description: 'Jet black skin, tightly coiled spiral Jalebi horns, wedge-shaped dairy conformation.',
    imageUrl: '/images/breeds/murrah.jpg',
    expectedResult: {
      id: 'demo-murrah-06',
      imageUrl: '/images/breeds/murrah.jpg',
      imageFileName: 'murrah_buffalo.jpg',
      animalType: 'Buffalo',
      breed: 'Murrah',
      confidence: 95,
      gender: 'Female',
      ageCategory: 'Adult',
      characteristics: [
        'Deep jet-black coat and pigmentation across body and muzzle',
        'Tightly curled spiral horns (Jalebi horn curvature) — definitive feature',
        'Short, fine hair with glossy black skin surface',
        'Wedge-shaped head with alert, bright prominent eyes',
        'Massive pendulous udder with widely spaced cylindrical teats'
      ],
      eyeFeatures: [
        'Prominent, round eyes — characteristic buffalo eye shape',
        'Dark to reddish-brown eye color',
        'Wide-set on the broad buffalo head',
        'Calm and docile expression',
        'Dark pigmentation around the eye area on black skin'
      ],
      hornFeatures: [
        'Tightly coiled spiral horns — the definitive Murrah breed marker',
        'Curl backward and inward like a coiled spring (Jalebi shape)',
        'Emerge from sides of head; black coloring throughout'
      ],
      earFeatures: [
        'Medium-sized, moderately pendulous black ears',
        'Buffalo ear shape — broader and less refined than cattle ears',
        'Alert positioning on the head'
      ],
      coatDescription: 'Jet black throughout; skin and muzzle uniformly black; may have white tip on tail',
      bodyStructure: 'Large, wedge-shaped body; deep barrel; massive pendulous udder; sturdy legs; well-muscled',
      breedInformation: 'Murrah is the premier dairy buffalo breed globally, fondly referred to as "Black Gold". Originating in Haryana and Punjab, Murrah buffaloes yield high quantities of milk with butterfat consistently ranging from 7% to 8.5%.',
      possibleBreeds: [
        { breed: 'Murrah', confidence: 95, reason: 'Tightly curled spiral Jalebi horns and deep jet-black body confirm Murrah' },
        { breed: 'Nili-Ravi', confidence: 3, reason: 'Similar black buffalo frame, but lacks white wall-eyes or white leg socks' },
        { breed: 'Surti', confidence: 2, reason: 'Lacks Surti sickle horns or white collar markings; different body color' }
      ],
      milkEstimate: {
        dailyMin: 14,
        dailyMax: 25,
        monthlyMin: 420,
        monthlyMax: 750,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  },
  {
    id: 'sample-hf',
    name: 'Holstein Friesian (Dairy)',
    badge: 'Exotic High Yield',
    animalType: 'Cow',
    breed: 'Holstein Friesian',
    description: 'Sharply defined black and white piebald markings, massive frame, straight backline without dorsal hump.',
    imageUrl: '/images/breeds/holstein-friesian.jpg',
    expectedResult: {
      id: 'demo-hf-07',
      imageUrl: '/images/breeds/holstein-friesian.jpg',
      imageFileName: 'holstein_friesian.jpg',
      animalType: 'Cow',
      breed: 'Holstein Friesian',
      confidence: 96,
      gender: 'Female',
      ageCategory: 'Adult',
      characteristics: [
        'Distinctive contrasting black and white piebald patches',
        'Large, heavy body frame with level backline',
        'Complete absence of thoracic zebu hump (Bos taurus)',
        'Broad muzzle with clean head contours',
        'Tremendously developed mammary system with prominent milk veins'
      ],
      eyeFeatures: [
        'Medium to large, calm alert eyes',
        'May have distinctive black or white coloring around the eye depending on coat pattern',
        'Set on a refined straight face',
        'Alert but docile expression',
        'Well-defined eyelids with clear pigmentation'
      ],
      hornFeatures: [
        'Modern dairy HF cows are typically dehorned or polled',
        'When present, small and fine horns pointing slightly forward',
        'Not a characteristic feature of this breed'
      ],
      earFeatures: [
        'Medium-sized, upright, fine-textured ears',
        'Less pendulous than Indian breeds',
        'May be black or white depending on coat pattern'
      ],
      coatDescription: 'Bold, well-defined black and white piebald patches; pattern is unique to each animal',
      bodyStructure: 'Very large frame; perfectly straight back; no hump; angular dairy conformation; massive rear udder',
      breedInformation: 'Holstein Friesian is an exotic European dairy breed known for highest milk output globally. In India, it is popular in commercial automated dairy farms and crossbreeding initiatives with indigenous stock.',
      possibleBreeds: [
        { breed: 'Holstein Friesian', confidence: 96, reason: 'Unmistakable black-and-white patterning and Bos taurus physiology without hump' },
        { breed: 'Jersey Cross', confidence: 3, reason: 'High-producing dairy conformation but coat pattern differs' },
        { breed: 'HF-Gir Crossbred', confidence: 1, reason: 'Slight possibility of minor indigenous cross affecting body traits' }
      ],
      milkEstimate: {
        dailyMin: 25,
        dailyMax: 45,
        monthlyMin: 750,
        monthlyMax: 1350,
        unit: 'litres',
        note: 'Breed-level estimate only. Actual milk production varies depending on age, lactation stage, feed, health, genetics and management.'
      },
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      isDemoMode: false,
      status: 'success',
      notes: 'Demo Result'
    }
  }
];

// Fallback test items for error handling demonstrations:
export const SAMPLE_LOW_CONFIDENCE = {
  imageUrl: '/images/breeds/tharparkar.jpg',
  imageFileName: 'obscured_distant_cattle.jpg',
  result: {
    id: 'demo-low-conf-08',
    imageUrl: '/images/breeds/tharparkar.jpg',
    animalType: 'Cow' as const,
    breed: 'Indeterminate / Mixed Breed',
    confidence: 42,
    gender: 'Unknown',
    ageCategory: 'Adult',
    characteristics: ['Coat partially obscured by distance', 'Non-distinct horn contours visible', 'Crossbred characteristics suspected'],
    eyeFeatures: ['Eye features could not be reliably analyzed from this image.'],
    hornFeatures: ['Horn shape not clearly visible'],
    earFeatures: ['Ear shape not clearly distinguishable'],
    coatDescription: 'Light colored coat visible but pattern unclear',
    bodyStructure: 'Medium frame visible but details insufficient for breed identification',
    breedInformation: 'The breed could not be confidently identified. Visible markers show mixed or non-standardized traits.',
    possibleBreeds: [
      { breed: 'Non-Descript / Crossbred', confidence: 42 },
      { breed: 'Tharparkar Cross', confidence: 32 },
      { breed: 'Rathi Cross', confidence: 26 }
    ],
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    isDemoMode: false,
    status: 'low_confidence' as const,
    errorMessage: 'Breed could not be confidently identified. Please upload a clearer image showing the animal\'s face and body.'
  }
};

export const SAMPLE_NON_CATTLE = {
  imageUrl: '/images/non-cattle.svg',
  imageFileName: 'non_cattle_specimen.jpg',
  result: {
    id: 'demo-non-cattle-09',
    imageUrl: '/images/non-cattle.svg',
    animalType: 'Other' as const,
    breed: 'Not Applicable',
    confidence: 0,
    gender: 'Unknown',
    ageCategory: 'Unknown',
    characteristics: ['Non-bovine anatomy detected', 'No cattle or buffalo features observed'],
    eyeFeatures: [],
    hornFeatures: [],
    earFeatures: [],
    coatDescription: '',
    bodyStructure: '',
    breedInformation: 'The submitted image depicts a non-bovine specimen.',
    possibleBreeds: [],
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    isDemoMode: false,
    status: 'no_cattle' as const,
    errorMessage: 'No cattle detected. Please upload a clear image of a cow or buffalo.'
  }
};
