import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 shadow-inner transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-5 w-5 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              HealthPulse &copy; {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Disclaimer: This tool is for informational purposes only and does not replace professional medical advice.
            Always consult a healthcare professional for proper diagnosis and treatment.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;