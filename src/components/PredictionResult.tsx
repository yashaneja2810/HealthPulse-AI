import React from 'react';
import { motion } from 'framer-motion';
import { PredictionResult as PredictionResultType, Language } from '../types';
import { AlertCircle, Clock, Stethoscope, Shield } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionResultType | null;
  isLoading: boolean;
  language: Language;
}

const getTranslatedText = (text: string, language: Language): string => {
  const translations: Partial<Record<Language, Record<string, string>>> = {
    'English': {
      'Analyzing your symptoms...': 'Analyzing your symptoms...',
      'Possible Condition': 'Possible Condition',
      'Description': 'Description',
      'Recommended Precautions': 'Recommended Precautions',
      'Consult a': 'Consult a',
      'Confidence': 'Confidence'
    },
    'Hindi': {
      'Analyzing your symptoms...': 'आपके लक्षणों का विश्लेषण किया जा रहा है...',
      'Possible Condition': 'संभावित स्थिति',
      'Description': 'विवरण',
      'Recommended Precautions': 'अनुशंसित सावधानियां',
      'Consult a': 'सलाह लें',
      'Confidence': 'विश्वास'
    },
    'Bengali': {
      'Analyzing your symptoms...': 'আপনার লক্ষণগুলি বিশ্লেষণ করা হচ্ছে...',
      'Possible Condition': 'সম্ভাব্য অবস্থা',
      'Description': 'বিবরণ',
      'Recommended Precautions': 'প্রস্তাবিত সতর্কতা',
      'Consult a': 'পরামর্শ নিন',
      'Confidence': 'আত্মবিশ্বাস'
    },
    'Telugu': {
      'Analyzing your symptoms...': 'మీ లక్షణాలను విశ్లేషిస్తున్నారు...',
      'Possible Condition': 'సాధ్యమైన పరిస్థితి',
      'Description': 'వివరణ',
      'Recommended Precautions': 'సిఫార్సు చేసిన జాగ్రత్తలు',
      'Consult a': 'సలహా తీసుకోండి',
      'Confidence': 'నమ్మకం'
    },
    'Marathi': {
      'Analyzing your symptoms...': 'तुमच्या लक्षणांचे विश्लेषण केले जात आहे...',
      'Possible Condition': 'संभाव्य स्थिती',
      'Description': 'वर्णन',
      'Recommended Precautions': 'शिफारस केलेली सावधानी',
      'Consult a': 'सल्ला घ्या',
      'Confidence': 'विश्वास'
    },
    'Tamil': {
      'Analyzing your symptoms...': 'உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்கிறோம்...',
      'Possible Condition': 'சாத்தியமான நிலை',
      'Description': 'விளக்கம்',
      'Recommended Precautions': 'பரிந்துரைக்கப்பட்ட முன்னெச்சரிக்கைகள்',
      'Consult a': 'ஆலோசனை பெறவும்',
      'Confidence': 'நம்பிக்கை'
    },
    'Gujarati': {
      'Analyzing your symptoms...': 'તમારા લક્ષણોનું વિશ્લેષણ કરવામાં આવી રહ્યું છે...',
      'Possible Condition': 'સંભવિત સ્થિતિ',
      'Description': 'વર્ણન',
      'Recommended Precautions': 'ભલામણ કરેલ સાવચેતી',
      'Consult a': 'સલાહ લો',
      'Confidence': 'વિશ્વાસ'
    },
    'Kannada': {
      'Analyzing your symptoms...': 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      'Possible Condition': 'ಸಂಭಾವ್ಯ ಸ್ಥಿತಿ',
      'Description': 'ವಿವರಣೆ',
      'Recommended Precautions': 'ಶಿಫಾರಸು ಮಾಡಿದ ಎಚ್ಚರಿಕೆಗಳು',
      'Consult a': 'ಸಲಹೆ ಪಡೆಯಿರಿ',
      'Confidence': 'ನಂಬಿಕೆ'
    },
    'Malayalam': {
      'Analyzing your symptoms...': 'നിങ്ങളുടെ ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യുന്നു...',
      'Possible Condition': 'സാധ്യതയുള്ള അവസ്ഥ',
      'Description': 'വിവരണം',
      'Recommended Precautions': 'ശുപാർശ ചെയ്യുന്ന മുൻകരുതലുകൾ',
      'Consult a': 'ഉപദേശം തേടുക',
      'Confidence': 'വിശ്വാസം'
    },
    'Punjabi': {
      'Analyzing your symptoms...': 'ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
      'Possible Condition': 'ਸੰਭਾਵਿਤ ਸਥਿਤੀ',
      'Description': 'ਵੇਰਵਾ',
      'Recommended Precautions': 'ਸਿਫਾਰਸ਼ੀ ਸਾਵਧਾਨੀਆਂ',
      'Consult a': 'ਸਲਾਹ ਲਓ',
      'Confidence': 'ਭਰੋਸਾ'
    },
    'Odia': {
      'Analyzing your symptoms...': 'ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡିକ ବିଶ୍ଳେଷଣ କରାଯାଉଛି...',
      'Possible Condition': 'ସମ୍ଭାବ୍ୟ ଅବସ୍ଥା',
      'Description': 'ବର୍ଣ୍ଣନା',
      'Recommended Precautions': 'ପରାମର୍ଶିତ ସତର୍କତା',
      'Consult a': 'ପରାମର୍ଶ ନିଅନ୍ତୁ',
      'Confidence': 'ବିଶ୍ୱାସ'
    },
    'Assamese': {
      'Analyzing your symptoms...': 'আপোনাৰ লক্ষণসমূহ বিশ্লেষণ কৰা হৈছে...',
      'Possible Condition': 'সম্ভাব্য অৱস্থা',
      'Description': 'বিৱৰণ',
      'Recommended Precautions': 'পৰামৰ্শিত সাৱধানতা',
      'Consult a': 'পৰামৰ্শ লওক',
      'Confidence': 'বিশ্বাস'
    },
    'Urdu': {
      'Analyzing your symptoms...': 'آپ کی علامات کا تجزیہ کیا جا رہا ہے...',
      'Possible Condition': 'ممکنہ حالت',
      'Description': 'تفصیل',
      'Recommended Precautions': 'تجویز کردہ احتیاطی تدابیر',
      'Consult a': 'مشورہ لیں',
      'Confidence': 'اعتماد'
    },
    'Bhojpuri': {
      'Analyzing your symptoms...': 'रउरा लक्षण के विश्लेषण कइल जा रहल बा...',
      'Possible Condition': 'संभावित स्थिति',
      'Description': 'विवरण',
      'Recommended Precautions': 'सिफारिश कइल गइल सावधानी',
      'Consult a': 'सलाह लीं',
      'Confidence': 'विश्वास'
    },
    'Nepali': {
      'Analyzing your symptoms...': 'तपाईंको लक्षणहरू विश्लेषण गरिँदैछ...',
      'Possible Condition': 'सम्भावित अवस्था',
      'Description': 'विवरण',
      'Recommended Precautions': 'सिफारिस गरिएका सावधानीहरू',
      'Consult a': 'सल्लाह लिनुहोस्',
      'Confidence': 'विश्वास'
    }
  };

  return translations[language]?.[text] || text;
};

const PredictionResult: React.FC<PredictionResultProps> = ({ result, isLoading, language }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
          {getTranslatedText('Analyzing your symptoms...', language)}
        </h2>
        <div className="flex items-center justify-center">
          <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const confidenceColor = 
    result.confidence > 0.8 ? 'text-green-600 dark:text-green-400' :
    result.confidence > 0.6 ? 'text-yellow-600 dark:text-yellow-400' :
    'text-orange-600 dark:text-orange-400';

  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-4 border-l-4 border-blue-500 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          {getTranslatedText('Possible Condition', language)}: {result.disease}
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
            {getTranslatedText('Description', language)}
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            {result.description}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            {getTranslatedText('Recommended Precautions', language)}
          </h3>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
            {result.precautions.map((precaution, index) => (
              <li key={index}>{precaution}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-600 dark:text-slate-300">
              {getTranslatedText('Consult a', language)} {result.specialistType}
            </span>
          </div>
          <div className={`font-medium ${confidenceColor}`}>
            {getTranslatedText('Confidence', language)}: {(result.confidence * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResult;