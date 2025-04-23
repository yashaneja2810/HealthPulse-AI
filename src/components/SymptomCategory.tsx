import React from 'react';
import { motion } from 'framer-motion';
import { Category, Language } from '../types';

interface SymptomCategoryProps {
  category: Category;
  onSymptomToggle: (categoryId: string, symptomId: string) => void;
  language: Language;
}

const SymptomCategory: React.FC<SymptomCategoryProps> = ({ category, onSymptomToggle, language }) => {
  return (
    <motion.div 
      className="mb-8 bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-4 border-l-4 border-blue-500 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          {category.name}
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.symptoms.map((symptom) => (
            <motion.div
              key={symptom.id}
              className="flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-md transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <input
                id={symptom.id}
                type="checkbox"
                checked={symptom.selected}
                onChange={() => onSymptomToggle(category.id, symptom.id)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor={symptom.id}
                className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                {symptom.text}
              </label>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SymptomCategory;