import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PredictionResult from '../components/PredictionResult';
import { PredictionResult as PredictionResultType, Language, SUPPORTED_LANGUAGES } from '../types';
import { analyzeSymptomText } from '../services/geminiService';
import { Send, AlertTriangle, HelpCircle, Globe } from 'lucide-react';

const PromptPage: React.FC = () => {
  const [symptomText, setSymptomText] = useState<string>('');
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptomText.trim()) {
      setError('Please describe your symptoms before submitting.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await analyzeSymptomText(symptomText, selectedLanguage);
      if (result) {
        setPrediction(result);
      } else {
        setError('No analysis results were returned. Please try again.');
      }
    } catch (err: any) {
      console.error('Error in symptom analysis:', err);
      
      // Handle specific error cases
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
    setSymptomText('');
    setPrediction(null);
    setError(null);
  };

  const handleExampleClick = (example: string) => {
    setSymptomText(example);
    setShowExamples(false);
  };

  const examples = [
    "I've had a throbbing headache for the past two days, and I feel nauseous when I move around.",
    "I've been coughing up yellow mucus for a week and have a fever of 101°F.",
    "My stomach has been hurting and I've had diarrhea for the last 24 hours.",
    "I've noticed a red, itchy rash on my arms and legs that appeared yesterday."
  ];

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
            Describe Your Symptoms
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Tell us about your symptoms in your own words, and we'll help identify possible conditions.
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Your Symptoms
                </h2>
                
                <div className="flex items-center space-x-4">
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
                  
                  <button
                    onClick={() => setShowExamples(!showExamples)}
                    className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    {showExamples ? 'Hide Examples' : 'Show Examples'}
                  </button>
                </div>
              </div>
              
              {showExamples && (
                <motion.div 
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                    Example descriptions:
                  </h3>
                  <div className="space-y-2">
                    {examples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="text-left text-sm text-blue-700 dark:text-blue-300 hover:underline block"
                      >
                        "{example}"
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="symptomText" className="sr-only">
                    Describe your symptoms
                  </label>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <textarea
                      id="symptomText"
                      value={symptomText}
                      onChange={(e) => setSymptomText(e.target.value)}
                      placeholder="Describe your symptoms in detail. For example: I've been experiencing a headache for the past two days, along with fever and fatigue."
                      className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white resize-none transition-colors duration-200"
                      disabled={isLoading}
                    ></textarea>
                  </motion.div>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    type="submit"
                    disabled={isLoading || !symptomText.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-700/50 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 flex items-center disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? 'Analyzing...' : (
                      <>
                        Analyze Symptoms <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium py-2 px-6 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                </div>
              </form>
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
                <PredictionResult result={prediction} isLoading={isLoading} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromptPage;