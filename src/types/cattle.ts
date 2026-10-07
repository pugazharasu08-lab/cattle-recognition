export type AnimalType = 'Cow' | 'Buffalo' | 'Other';

export interface PossibleBreed {
  breed: string;
  confidence: number;
  reason?: string;
}

export interface RecognitionResult {
  id: string;
  imageUrl: string;
  imageFileName?: string;
  animalType: 'Cow' | 'Buffalo' | string;
  breed: string;
  confidence: number;
  gender: string;
  ageCategory: string;
  characteristics: string[];
  eyeFeatures?: string[];
  hornFeatures?: string[];
  earFeatures?: string[];
  coatDescription?: string;
  bodyStructure?: string;
  breedInformation: string;
  possibleBreeds?: PossibleBreed[];
  milkEstimate?: {
    dailyMin: number;
    dailyMax: number;
    monthlyMin: number;
    monthlyMax: number;
    unit: string;
    note: string;
  };
  timestamp: string;
  formattedDate: string;
  isDemoMode?: boolean;
  status: 'success' | 'low_confidence' | 'no_cattle' | 'error';
  errorMessage?: string;
  notes?: string;
}

export interface CattleBreedInfo {
  id: string;
  name: string;
  species: 'Cow' | 'Buffalo';
  animalType?: 'Cow' | 'Buffalo';
  breedType: 'Indigenous' | 'Exotic' | 'Crossbred';
  origin: string;
  primaryState: string;
  purpose: 'Dairy' | 'Draught' | 'Dual Purpose';
  averageYield: string;
  milkDailyMin: number;
  milkDailyMax: number;
  characteristics: string[];
  eyeFeatures: string[];
  hornFeatures: string[];
  earFeatures: string[];
  coatColor: string;
  bodyStructure: string;
  temperament: string;
  climateSuitability: string;
  uses: string[];
  imageUrl: string;
  description: string;
  keyDistinctions: string[];
  conservationStatus?: 'Abundant' | 'Threatened' | 'Priority Conservation' | 'Vulnerable';
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface DashboardStats {
  totalRecognitions: number;
  successfulIdentifications: number;
  cattleBreedsIdentified: number;
  recentRecognition: RecognitionResult | null;
}
