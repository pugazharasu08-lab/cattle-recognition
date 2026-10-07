import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles, Scan, BrainCircuit } from 'lucide-react';

interface LoadingScreenProps {
  imagePreviewUrl?: string;
  isDemo?: boolean;
}

interface StepItem {
  id: number;
  label: string;
  description: string;
}

const STEPS: StepItem[] = [
  { id: 1, label: 'Image uploaded', description: 'Checking image clarity and subject orientation' },
  { id: 2, label: 'Detecting animal', description: 'Scanning head contours, forehead, and dorsal hump profile' },
  { id: 3, label: 'Examining physical characteristics', description: 'Analyzing eye features, horn curvature, ears, and coat' },
  { id: 4, label: 'Identifying breed', description: 'Matching morphological traits against known cattle & buffalo database' },
  { id: 5, label: 'Preparing livestock information', description: 'Compiling milk yield estimates, seasonal care & vaccination guidance' }
];

const LIVESTOCK_TIPS = [
  'Tip: Clear side or front headshots capturing eyes, ears, and forehead yield the highest recognition accuracy.',
  'Tip: Gir cattle feature a distinct convex forehead dome and long, pendulous leaf-like ears.',
  'Tip: Sahiwal cows are recognized by their reddish-dun coat, loose dewlap, and calm temperament.',
  'Tip: Murrah buffaloes have tightly curled horns that form a characteristic closed spiral curve.'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ imagePreviewUrl }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const stepTimers = [
      setTimeout(() => setActiveStep(2), 400),
      setTimeout(() => setActiveStep(3), 900),
      setTimeout(() => setActiveStep(4), 1400),
      setTimeout(() => setActiveStep(5), 1900)
    ];

    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LIVESTOCK_TIPS.length);
    }, 2500);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10">
            <Scan className="w-36 h-36" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                <BrainCircuit className="w-6 h-6 text-emerald-200 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading">Analyzing Cattle...</h3>
                <p className="text-xs text-emerald-100 font-medium">
                  Evaluating livestock physical features with AI vision
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-100 border border-emerald-300/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              Processing
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-5">
          {/* Image Scan Preview */}
          {imagePreviewUrl && (
            <div className="relative h-28 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 group">
              <img
                src={imagePreviewUrl}
                alt="Analyzing Cattle"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent scanner-line pointer-events-none" />
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                <Scan className="w-3.5 h-3.5" />
                <span>AI_VISUAL_ANALYSIS</span>
              </div>
            </div>
          )}

          {/* Stepper list */}
          <div className="space-y-2.5">
            {STEPS.map((step) => {
              const isCompleted = activeStep > step.id;
              const isCurrent = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all duration-300 ${
                    isCurrent
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800'
                      : isCompleted
                      ? 'bg-slate-50/70 dark:bg-slate-800/40 border border-transparent'
                      : 'opacity-40'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                        {step.id}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-semibold ${
                        isCurrent
                          ? 'text-emerald-900 dark:text-emerald-300 font-bold'
                          : isCompleted
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tip box */}
          <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl p-3 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <AnimatePresence mode="wait">
              <motion.p
                key={tipIndex}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.3 }}
                className="font-medium text-[11px] sm:text-xs"
              >
                {LIVESTOCK_TIPS[tipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
