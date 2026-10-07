import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Scan, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle, 
  ChevronRight,
  Zap,
  ShieldCheck,
  Milk,
  BookOpen
} from 'lucide-react';
import girSampleImg from '../assets/breeds/gir.jpg';
import { CATTLE_BREEDS } from '../data/breedsData';

export const LandingPage: React.FC = () => {
  const featuredBreeds = CATTLE_BREEDS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-900">
        {/* Background glow & grid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-300/40 dark:bg-emerald-600/20 rounded-full blur-3xl" />
          <div className="absolute top-48 right-10 w-80 h-80 bg-teal-400/30 dark:bg-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
                <BrainCircuit className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>AI-Powered Cattle Breed Recognition & Livestock Information</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] font-heading">
                Identify Cattle Breeds <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">
                  Instantly & Accurately
                </span> <br />
                With AI Vision Analysis
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                Empowering farmers, dairy managers, and livestock enthusiasts with instant phenotypic breed recognition, eye feature analysis, milk yield estimation, and seasonal health guidance.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/recognize"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <Scan className="w-5 h-5" />
                  <span>Start Recognition</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/breeds"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-base border border-slate-200/90 dark:border-slate-700 shadow-xs transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Browse Breeds Directory</span>
                </Link>
              </div>

              {/* Live Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-6 border-t border-slate-200/70 dark:border-slate-800 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">15+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Major Breeds</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">&lt; 2.0s</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Analysis Time</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Privacy & Local Storage</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-2xl border border-emerald-100 dark:border-slate-800 ring-1 ring-emerald-500/10">
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950">
                  <img
                    src={girSampleImg || '/images/breeds/gir.jpg'}
                    alt="Gir Cow Sample Scan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/breeds/gir.jpg';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-bold">
                    SAMPLE PREVIEW
                  </div>
                </div>

                <div className="p-4 mt-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading leading-tight">
                        Gir Cow (Indigenous)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">8–20 L daily milk yield</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                      95% Match
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to="/recognize"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Try Instant Breed Recognition</span>
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features & Capabilities */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/70 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              AI Livestock Intelligence
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              Smart Phenotypic Breed Recognition
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Combining state-of-the-art computer vision models with trusted veterinary livestock databases to deliver complete breed profiles and health guidance.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Eye & Head Morphology
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Extracts facial landmarks including forehead curvature, eyelid shape, horn angles, and pendulous ear structures.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Milk className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-950 dark:text-emerald-200 font-heading">
                Milk Production Estimation
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Provides estimated daily milk yield, lactation period range, and milk fat content percentages for each recognized breed.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Seasonal Health & Vaccination
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Offers seasonal precautions for summer, monsoon, and winter, along with essential vaccination timing guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Simple 4-Step Process</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              How Cattle Recognition Works
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base">
              Streamlined workflow designed for speed, clarity, and mobile responsiveness.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Capture or Upload Image',
                desc: 'Take a clear side or front photo of cattle using device camera or upload an existing image file.'
              },
              {
                step: '02',
                title: 'AI Feature Analysis',
                desc: 'Computer vision algorithms evaluate head profile, eye placement, ears, horns, dewlap, and coat patterns.'
              },
              {
                step: '03',
                title: 'Breed & Production Profile',
                desc: 'Instantly view recognized breed, confidence score, milk yield estimates, and facial landmarks.'
              },
              {
                step: '04',
                title: 'Save & Manage History',
                desc: 'Keep track of previous scans in browser storage and export recognition reports anytime.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-black text-emerald-600/20 dark:text-emerald-400/20 font-heading">
                    {item.step}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-2 font-heading">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1">
                  <span>Fast & Intuitive</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Breeds Showcase */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Breed Directory</h2>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white font-heading mt-1">
                Featured Cattle & Buffalo Breeds
              </h3>
            </div>
            <Link
              to="/breeds"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
            >
              <span>Explore All Breeds</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBreeds.map((breed) => (
              <div
                key={breed.id}
                className="group rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                    <img
                      src={breed.imageUrl}
                      alt={breed.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                      {breed.species}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur text-white text-xs font-medium truncate">
                      {breed.primaryState}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                      {breed.name}
                    </h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      {breed.purpose} • {breed.averageYield}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {breed.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/breeds?select=${breed.id}`}
                    className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-between transition"
                  >
                    <span>View Breed Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 py-16 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mx-auto flex items-center justify-center border border-white/20">
            <Scan className="w-8 h-8 text-emerald-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
            Ready to Recognize Cattle Breeds?
          </h2>

          <p className="text-emerald-100 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Upload an image or take a photo to analyze breed characteristics, eye features, and milk yield estimations in seconds.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/recognize"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-base shadow-xl transition active:scale-95"
            >
              Start Recognition Now
            </Link>

            <Link
              to="/signup"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-bold text-base border border-emerald-400/40 transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
