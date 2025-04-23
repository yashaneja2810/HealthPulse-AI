export interface Symptom {
  id: string;
  text: string;
  selected: boolean;
}

export interface Category {
  id: string;
  name: string;
  symptoms: Symptom[];
}

export interface PredictionResult {
  disease: string;
  precautions: string[];
  specialistType: string;
  confidence: number;
  description: string;
}

export type Language = 
  | 'English' 
  | 'Hindi'
  | 'Bengali'
  | 'Telugu'
  | 'Marathi'
  | 'Tamil'
  | 'Gujarati'
  | 'Kannada'
  | 'Malayalam'
  | 'Punjabi'
  | 'Odia'
  | 'Assamese'
  | 'Urdu'
  | 'Bhojpuri'
  | 'Nepali';

export const SUPPORTED_LANGUAGES: Language[] = [
  'English',
  'Hindi',
  'Bengali',
  'Telugu',
  'Marathi',
  'Tamil',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Odia',
  'Assamese',
  'Urdu',
  'Bhojpuri',
  'Nepali'
];

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}