import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Scan, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  Printer, 
  Bookmark, 
  Info,
  Calendar,
  Eye,
  Milk,
  Syringe,
  Sun,
  CloudRain,
  Snowflake,
  ShieldCheck,
  Award,
  CircleAlert,
  Home
} from 'lucide-react';

import { useHistory } from '../context/HistoryContext';
import { ConfidenceRing } from '../components/common/ConfidenceRing';
import { CattleImage } from '../components/common/CattleImage';
import { SEASONAL_HEALTH_INFO, VACCINATION_GUIDANCE, getCurrentSeason } from '../data/breedsData';
import type { RecognitionResult } from '../types/cattle';

const RESULT_STORAGE_KEY = 'cattleRecognitionResult';

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentResult, addRecognition, setCurrentResult } = useHistory();

  const [copied, setCopied] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  // Resolve result safely from Context -> Location State -> SessionStorage -> LocalStorage
  const [result, setResult] = useState<RecognitionResult | null>(() => {
    // 1. Context (in-memory, most reliable)
    if (currentResult) return currentResult;

    // 2. Location state (navigation state)
    const navResult = (location.state as any)?.result as RecognitionResult | undefined;
    if (navResult) return navResult;

    // 3. SessionStorage (survives same-tab navigations)
    try {
      const sessionStored = sessionStorage.getItem(RESULT_STORAGE_KEY);
      if (sessionStored) {
        return JSON.parse(sessionStored) as RecognitionResult;
      }
    } catch (e) {
      console.error('Error parsing sessionStorage cattleRecognitionResult:', e);
    }

    // 4. LocalStorage (persists across sessions)
    try {
      const stored = localStorage.getItem(RESULT_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as RecognitionResult;
      }
    } catch (e) {
      console.error('Error parsing localStorage cattleRecognitionResult:', e);
    }
    return null;
  });

  // Sync result if context changes or location changes
  useEffect(() => {
    if (currentResult) {
      setResult(currentResult);
      try {
        const str = JSON.stringify(currentResult);
        try { sessionStorage.setItem(RESULT_STORAGE_KEY, str); } catch (_) {}
        try { localStorage.setItem(RESULT_STORAGE_KEY, str); } catch (_) {}
      } catch (e) {
        console.error('Failed to sync currentResult to storage:', e);
      }
    }
  }, [currentResult]);

  useEffect(() => {
    if (result && result.status === 'success' && (result.confidence ?? 0) >= 75) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#fbbf24']
        });
      } catch (e) {
        console.warn('Confetti animation skipped:', e);
      }
    }
  }, [result]);

  // Safety fallback: If no result exists at all, render clean recovery screen (NEVER BLANK)
  if (!result) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="w-20 h-20 rounded-3xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-5 shadow-inner">
          <Scan className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
          Recognition Result Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 mb-8 leading-relaxed">
          No cattle recognition data is available. Please upload or capture an image of a cow or buffalo to run AI breed identification.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/recognize"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Scan className="w-4 h-4" />
            <span>Recognize Cattle Again</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  // Safe defaults for all properties
  const breed = result.breed || 'Indeterminate';
  const animalType = result.animalType || 'Cattle';
  const confidence = typeof result.confidence === 'number' ? result.confidence : 0;
  const isLowConfidence = result.status === 'low_confidence' || confidence < 60;
  const formattedDate = result.formattedDate || new Date().toLocaleString();
  const imageUrl = result.imageUrl || '';
  const imageFileName = result.imageFileName || 'cattle_image.jpg';
  
  const characteristics = Array.isArray(result.characteristics) ? result.characteristics : [];
  const eyeFeatures = Array.isArray(result.eyeFeatures) ? result.eyeFeatures : [];
  const hornFeatures = Array.isArray(result.hornFeatures) ? result.hornFeatures : [];
  const earFeatures = Array.isArray(result.earFeatures) ? result.earFeatures : [];
  const coatDescription = result.coatDescription || '';
  const bodyStructure = result.bodyStructure || '';
  const breedInformation = result.breedInformation || 'Physical markers analyzed via visual pattern matching.';
  const possibleBreeds = Array.isArray(result.possibleBreeds) ? result.possibleBreeds : [];

  // Milk estimates safe fallback
  const dailyMin = result.milkEstimate?.dailyMin ?? 8;
  const dailyMax = result.milkEstimate?.dailyMax ?? 20;
  const monthlyMin = result.milkEstimate?.monthlyMin ?? (dailyMin * 30);
  const monthlyMax = result.milkEstimate?.monthlyMax ?? (dailyMax * 30);

  const currentSeasonKey = getCurrentSeason();
  const seasonalAdvice = (SEASONAL_HEALTH_INFO && SEASONAL_HEALTH_INFO[currentSeasonKey]) ? SEASONAL_HEALTH_INFO[currentSeasonKey] : SEASONAL_HEALTH_INFO['monsoon'];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Cattle Recognition Result: ${breed} (${animalType}) with ${confidence}% confidence.`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveToHistory = () => {
    if (result) {
      addRecognition(result);
      setCurrentResult(result);
      try {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
      } catch (e) {
        console.error('Error saving result:', e);
      }
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/recognize')}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Back to Recognize"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                Cattle Recognition Result
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ID: {result.id || 'rec-id'}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={handleSaveToHistory}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{savedNotification ? 'Saved to History!' : 'Save to History'}</span>
            </button>
          </div>
        </div>

        {/* Status Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border flex items-center justify-between ${
            isLowConfidence
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {isLowConfidence ? (
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base">
                {isLowConfidence
                  ? 'Low Confidence Identification'
                  : 'Breed Recognized Successfully ✓'}
              </h3>
              <p className="text-xs opacity-90 mt-0.5">
                {isLowConfidence
                  ? 'Visual characteristics could not be matched with high certainty. Try uploading a clearer side or front view.'
                  : `Morphological parameters align with purebred ${breed} characteristics.`}
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-xs font-mono opacity-75">
              {formattedDate}
            </span>
          </div>
        </motion.div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Cattle Image Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner group">
              <CattleImage
                src={imageUrl}
                alt={breed}
                breedName={breed}
                species={animalType}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur text-white text-xs font-bold shadow-md">
                {animalType}
              </div>


              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur text-white text-[11px] flex items-center justify-between">
                <span className="truncate">{imageFileName}</span>
                <span className="text-emerald-400 font-mono font-bold">ANALYZED</span>
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Timestamp</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formattedDate.split(',')[0]}</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{result.status?.replace('_', ' ') || 'Success'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information Sections */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Header Card (Breed, Animal, Confidence) */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    <span>Identified Breed</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
                    {breed}
                  </h2>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Animal: <span className="text-emerald-700 dark:text-emerald-400 font-bold">{animalType}</span>
                  </p>
                </div>

                {/* Animated Confidence Ring */}
                <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-3xl border border-slate-100 dark:border-slate-700/80 flex flex-col items-center justify-center">
                  <ConfidenceRing
                    confidence={confidence}
                    size={96}
                    strokeWidth={8}
                    showLabel={true}
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Animal</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{animalType}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Breed</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{breed}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gender</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{result.gender || 'Not specified'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Age Category</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{result.ageCategory || 'Adult'}</span>
                </div>
              </div>
            </div>

            {/* 2. PHYSICAL FEATURES (Coat, Body structure, Horn shape, Ear shape) */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  Physical Features
                </h3>
              </div>

              {/* Coat & Body Structure summary if present */}
              {(coatDescription || bodyStructure) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  {coatDescription && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Coat Pattern</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{coatDescription}</span>
                    </div>
                  )}
                  {bodyStructure && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Body Structure</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{bodyStructure}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Horn & Ear Shape details */}
              {(hornFeatures.length > 0 || earFeatures.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  {hornFeatures.length > 0 && (
                    <div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block text-[11px] mb-1">
                        Horn Shape
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {hornFeatures.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {earFeatures.length > 0 && (
                    <div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block text-[11px] mb-1">
                        Ear Shape
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {earFeatures.map((e, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500">•</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Characteristics Checklist */}
              {characteristics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {characteristics.map((trait, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. EYE FEATURES */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  Eye Features
                </h3>
              </div>

              {eyeFeatures.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {eyeFeatures.map((trait, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/40 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 italic">
                  Eye features could not be reliably analyzed from this image.
                </div>
              )}
            </div>

            {/* 4. MILK PRODUCTION ESTIMATE */}
            <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 sm:p-7 rounded-3xl shadow-lg space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300">
                  <Milk className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Milk Production Estimate
                  </h3>
                  <p className="text-xs text-emerald-300/80">Estimated parameters for purebred {breed}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-200 block">Estimated Daily Milk</span>
                  <span className="text-2xl font-black text-white font-heading">{dailyMin}–{dailyMax} litres/day</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-200 block">Estimated Monthly Milk</span>
                  <span className="text-2xl font-black text-white font-heading">{monthlyMin}–{monthlyMax} litres/month</span>
                </div>
              </div>

              <p className="text-[11px] text-emerald-200/80 italic leading-normal border-t border-white/10 pt-3">
                "Breed-level estimate only. Actual production varies based on age, lactation stage, nutrition, health, genetics and management."
              </p>
            </div>

            {/* 5. ABOUT THE BREED */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  About the Breed
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {breedInformation}
              </p>
            </div>

            {/* 6. POSSIBLE BREEDS BREAKDOWN */}
            {possibleBreeds.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    Possible Breeds Breakdown
                  </h3>
                </div>

                <div className="space-y-3">
                  {possibleBreeds.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-400 font-bold">
                            {idx + 1}
                          </span>
                          <span>{item.breed}</span>
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">{item.confidence}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            idx === 0 ? 'bg-emerald-600' : idx === 1 ? 'bg-teal-500' : 'bg-slate-400'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      {item.reason && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pl-7 leading-normal">
                          {item.reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SEASONAL HEALTH RISKS */}
            {seasonalAdvice && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  {currentSeasonKey === 'summer' && <Sun className="w-5 h-5 text-amber-500" />}
                  {currentSeasonKey === 'monsoon' && <CloudRain className="w-5 h-5 text-blue-500" />}
                  {currentSeasonKey === 'winter' && <Snowflake className="w-5 h-5 text-cyan-500" />}
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                      Seasonal Health Risks ({seasonalAdvice.season})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">General seasonal guidelines</p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {Array.isArray(seasonalAdvice.risks) && seasonalAdvice.risks.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        General Health Risks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {seasonalAdvice.risks.map((risk, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-medium border border-red-100 dark:border-red-900/50">
                            ⚠ {risk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(seasonalAdvice.precautions) && seasonalAdvice.precautions.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        Seasonal Care Precautions
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {seasonalAdvice.precautions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 8. VACCINATION GUIDANCE */}
            {Array.isArray(VACCINATION_GUIDANCE) && VACCINATION_GUIDANCE.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    Vaccination Guidance Schedule
                  </h3>
                </div>

                <div className="space-y-3">
                  {VACCINATION_GUIDANCE.slice(0, 3).map((vax, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span>{vax.emoji} {vax.disease}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                          {vax.vaccine}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]"><strong className="text-slate-700 dark:text-slate-200">Timing:</strong> {vax.timing}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">{vax.notes}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                  "Consult a qualified veterinarian for the final vaccination schedule."
                </p>
              </div>
            )}

            {/* Health Disclaimer */}
            <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 shadow-xs flex items-start gap-3.5 text-xs leading-relaxed">
              <CircleAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white block mb-1 font-heading text-sm">Veterinary & Health Disclaimer</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">Information provided by Cattle Recognition is generated using artificial intelligence visual pattern analysis and is intended solely for educational, research, and informational assistance. It does not replace professional veterinary diagnosis, treatment, or official livestock certification. Always consult a certified veterinarian or livestock specialist for health, nutrition, and breeding decisions.</p>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/recognize"
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <Scan className="w-4 h-4" />
                <span>Analyze Another Cattle</span>
              </Link>

              <button
                onClick={handleSaveToHistory}
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-bold text-sm border border-emerald-300 dark:border-emerald-800 transition flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{savedNotification ? 'Saved to History!' : 'Save to History'}</span>
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 transition flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Back to Home</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
