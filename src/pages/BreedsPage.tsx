import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  MapPin, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  Milk, 
  Info,
  Scan,
  Eye,
  Award
} from 'lucide-react';
import { CATTLE_BREEDS } from '../data/breedsData';
import type { CattleBreedInfo } from '../types/cattle';
import { CattleImage } from '../components/common/CattleImage';

export const BreedsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<'All' | 'Cow' | 'Buffalo'>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Indigenous' | 'Exotic' | 'Crossbred'>('All');
  const [purposeFilter, setPurposeFilter] = useState<'All' | 'Dairy' | 'Dual Purpose' | 'Draught'>('All');
  const [selectedBreedModal, setSelectedBreedModal] = useState<CattleBreedInfo | null>(null);

  useEffect(() => {
    const breedParam = searchParams.get('select');
    if (breedParam) {
      const found = CATTLE_BREEDS.find((b) => b.id.toLowerCase() === breedParam.toLowerCase());
      if (found) {
        setSelectedBreedModal(found);
      }
    }
  }, [searchParams]);

  const filteredBreeds = CATTLE_BREEDS.filter((breed) => {
    const rawQuery = searchQuery.trim().toLowerCase();
    
    // Accurate breed search: matches against breed name or standardized breed id
    // Eliminates loose matching on description/origin that previously returned unrelated breeds
    const matchesQuery = !rawQuery || (() => {
      const normalizedQuery = rawQuery.replace(/[-_]/g, ' ');
      const breedName = breed.name.toLowerCase();
      const breedId = breed.id.toLowerCase().replace(/[-_]/g, ' ');
      return breedName.includes(rawQuery) || 
             breedName.includes(normalizedQuery) || 
             breedId.includes(rawQuery) || 
             breedId.includes(normalizedQuery);
    })();

    // Animal type filter: supports both 'species' and 'animalType'
    const breedAnimalType = ((breed as any).animalType || breed.species || '').toLowerCase();
    const matchesSpecies = 
      speciesFilter === 'All' || 
      breedAnimalType === speciesFilter.toLowerCase();

    const matchesType = typeFilter === 'All' || breed.breedType === typeFilter;
    const matchesPurpose = purposeFilter === 'All' || breed.purpose === purposeFilter;

    return matchesQuery && matchesSpecies && matchesType && matchesPurpose;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1.5 border border-emerald-200 dark:border-emerald-800">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Cattle & Buffalo Breeds Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Livestock Breeds Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Comprehensive physical characteristics, eye/horn landmarks, and milk productivity data for major Indian & exotic breeds
            </p>
          </div>

          <Link
            to="/recognize"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Scan className="w-4 h-4" />
            <span>Recognize Cattle Now</span>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
            
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search breed by name (e.g. Sahiwal, Gir, Murrah)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 text-xs font-medium text-slate-900 dark:text-white outline-hidden transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Species Filter */}
            <div className="md:col-span-2">
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="All">All Animals</option>
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
              </select>
            </div>

            {/* Breed Type Filter */}
            <div className="md:col-span-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="All">All Breed Types</option>
                <option value="Indigenous">Indigenous</option>
                <option value="Exotic">Exotic</option>
                <option value="Crossbred">Crossbred</option>
              </select>
            </div>

            {/* Purpose Filter */}
            <div className="md:col-span-3">
              <select
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="All">All Purposes</option>
                <option value="Dairy">Dairy (Milk)</option>
                <option value="Dual Purpose">Dual Purpose</option>
                <option value="Draught">Draught</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>Showing {filteredBreeds.length} cataloged breeds</span>
            {(searchQuery || speciesFilter !== 'All' || typeFilter !== 'All' || purposeFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSpeciesFilter('All');
                  setTypeFilter('All');
                  setPurposeFilter('All');
                }}
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Breed Cards Grid or Clean Empty State */}
        {filteredBreeds.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
              No breed found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              {searchQuery
                ? `No livestock breed matches "${searchQuery}" with the selected animal filters.`
                : 'No livestock breed matches your currently selected filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSpeciesFilter('All');
                setTypeFilter('All');
                setPurposeFilter('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition inline-flex items-center gap-2"
            >
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <motion.div
                key={breed.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <CattleImage
                      src={breed.imageUrl}
                      alt={breed.name}
                      breedName={breed.name}
                      species={breed.species}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                      {breed.species}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur text-emerald-300 text-[11px] font-bold">
                      {breed.breedType}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-bold">
                    {breed.purpose}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 px-3 py-1 rounded-xl bg-black/60 backdrop-blur text-white text-[11px] flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{breed.origin}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-heading font-black text-2xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {breed.name}
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                      <Milk className="w-3.5 h-3.5" />
                      <span>{breed.averageYield}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {breed.description}
                  </p>

                  {/* Eye & Distinctive Markers */}
                  {breed.keyDistinctions && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Key Features:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {breed.keyDistinctions.map((marker, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                          >
                            • {marker}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* View Full Info Action */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedBreedModal(breed)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:border-emerald-300 transition flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>View Full Breed Info</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedBreedModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                {/* Modal Header Image */}
                <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                  <CattleImage
                    src={selectedBreedModal.imageUrl}
                    alt={selectedBreedModal.name}
                    breedName={selectedBreedModal.name}
                    species={selectedBreedModal.species}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedBreedModal(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-[11px] font-bold">
                        {selectedBreedModal.species}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-[11px] font-bold">
                        {selectedBreedModal.breedType}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-[11px] font-bold">
                        {selectedBreedModal.purpose}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black font-heading">
                      {selectedBreedModal.name}
                    </h2>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedBreedModal.origin} ({selectedBreedModal.primaryState})</span>
                    </p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Milk Yield Card */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                        Daily Milk Output Range
                      </span>
                      <p className="font-extrabold text-sm text-emerald-950 dark:text-emerald-200 font-heading">
                        {selectedBreedModal.averageYield}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                        Climate Suitability
                      </span>
                      <p className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {selectedBreedModal.climateSuitability}
                      </p>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Breed Overview
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedBreedModal.description}
                    </p>
                  </div>

                  {/* Eye Features */}
                  {selectedBreedModal.eyeFeatures && selectedBreedModal.eyeFeatures.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Eye Characteristics</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                        {selectedBreedModal.eyeFeatures.map((eye, i) => (
                          <li key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                            <span className="text-emerald-500">•</span>
                            <span>{eye}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Horn & Ear Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedBreedModal.hornFeatures && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Horn Profile
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {selectedBreedModal.hornFeatures.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-500">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedBreedModal.earFeatures && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Ear Structure
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {selectedBreedModal.earFeatures.map((e, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-500">•</span>
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Physical Characteristics list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Standard Physical Traits
                    </h4>
                    <div className="space-y-2">
                      {selectedBreedModal.characteristics.map((trait, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Uses */}
                  {selectedBreedModal.uses && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>Primary Uses & Economic Significance</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBreedModal.uses.map((u, i) => (
                          <span key={i} className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-100 dark:border-emerald-900/50">
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA inside modal */}
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/recognize?breed=${selectedBreedModal.id}`}
                      onClick={() => setSelectedBreedModal(null)}
                      className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md text-center transition"
                    >
                      Recognize Cattle Image
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
