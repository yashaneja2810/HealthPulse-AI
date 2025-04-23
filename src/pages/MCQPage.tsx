import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SymptomCategory from '../components/SymptomCategory';
import PredictionResult from '../components/PredictionResult';
import { getSymptomsCategories } from '../data/symptoms';
import { Category, PredictionResult as PredictionResultType, Language, SUPPORTED_LANGUAGES } from '../types';
import { analyzeSymptoms } from '../services/geminiService';
import { AlertTriangle, Globe } from 'lucide-react';

const MCQPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [categories, setCategories] = useState<Category[]>(getSymptomsCategories('English'));
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCategories(getSymptomsCategories(selectedLanguage));
  }, [selectedLanguage]);

  const handleSymptomToggle = (categoryId: string, symptomId: string) => {
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            symptoms: category.symptoms.map(symptom => {
              if (symptom.id === symptomId) {
                return { ...symptom, selected: !symptom.selected };
              }
              return symptom;
            }),
          };
        }
        return category;
      });
    });
  };

  const handleSubmit = async () => {
    // Collect selected symptoms
    const selectedSymptoms: string[] = [];
    
    categories.forEach(category => {
      category.symptoms.forEach(symptom => {
        if (symptom.selected) {
          selectedSymptoms.push(symptom.text);
        }
      });
    });
    
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom before submitting.');
      return;
    }

    setError(null);
    setIsLoading(true);
    
    try {
      const result = await analyzeSymptoms(selectedSymptoms, selectedLanguage);
      if (result) {
        setPrediction(result);
      } else {
        setError('No analysis results were returned. Please try again.');
      }
    } catch (err: any) {
      console.error('Error in symptom analysis:', err);
      
      if (err.message?.includes('API key')) {
        setError('API key error: Please make sure you have added a valid Gemini API key in your .env file.');
      } else if (err.message?.includes('network')) {
        setError('Network error: Please check your internet connection and try again.');
      } else if (err.message?.includes('Invalid response format')) {
        setError('The AI response was not in the expected format. Please try again.');
      } else {
        setError(`Analysis error: ${err.message || 'An unexpected error occurred while analyzing your symptoms.'}`);
      }
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCategories(getSymptomsCategories(selectedLanguage));
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            Select Your Symptoms
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Choose the symptoms that best describe your condition.
          </p>
        </div>

        {error && (
          <motion.div 
            className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded-md text-red-700 dark:text-red-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end mb-6">
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              {categories.map((category) => (
                <SymptomCategory
                  key={category.id}
                  category={category}
                  onSymptomToggle={handleSymptomToggle}
                  language={selectedLanguage}
                />
              ))}
            </div>
            
            <div className="flex space-x-4 mt-8">
              <motion.button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-700/50 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 flex items-center disabled:cursor-not-allowed"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
              </motion.button>
              
              <motion.button
                onClick={handleReset}
                className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium py-2 px-6 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset
              </motion.button>
            </div>
          </div>
          
          <div>
            {(prediction || isLoading) && (
              <motion.div 
                className="sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                  Analysis Results
                </h2>
                <PredictionResult result={prediction} isLoading={isLoading} language={selectedLanguage} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MCQPage;