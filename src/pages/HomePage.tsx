import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, MessageSquareText, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Your Health Assistant
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Get insights about your symptoms and find the right medical care using advanced AI technology.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/mcq">
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 h-full flex flex-col transition-colors duration-300 hover:shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <ClipboardCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Symptom Checker</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                Answer a series of questions about your symptoms to get insights about possible conditions.
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                Start Symptom Check <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          <Link to="/prompt">
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 h-full flex flex-col transition-colors duration-300 hover:shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="rounded-full bg-green-50 dark:bg-green-900/30 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <MessageSquareText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Describe Symptoms</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                Describe your symptoms in your own words and let our AI analyze them for you.
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                Describe Your Symptoms <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 md:p-12 transition-colors duration-300">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-white dark:bg-slate-800 w-12 h-12 flex items-center justify-center mb-4 shadow-md text-blue-600 dark:text-blue-400 font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Share Your Symptoms
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Either answer specific questions or describe your symptoms in your own words.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-white dark:bg-slate-800 w-12 h-12 flex items-center justify-center mb-4 shadow-md text-blue-600 dark:text-blue-400 font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                AI Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Our advanced AI powered by Gemini analyzes your symptoms and patterns.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-white dark:bg-slate-800 w-12 h-12 flex items-center justify-center mb-4 shadow-md text-blue-600 dark:text-blue-400 font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Get Insights
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Receive information about possible conditions, precautions, and specialist recommendations.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              <strong>Important:</strong> This tool provides information for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;