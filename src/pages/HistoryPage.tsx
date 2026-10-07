import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  History, 
  Search, 
  Trash2, 
  Calendar, 
  X, 
  ChevronRight, 
  Scan,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useHistory } from '../context/HistoryContext';
import type { RecognitionResult } from '../types/cattle';
import { CattleImage } from '../components/common/CattleImage';

/** Lightweight breed-name → local image path map for history cards */
const HISTORY_BREED_IMAGE: Record<string, string> = {
  'sahiwal': '/images/breeds/sahiwal.jpg',
  'gir': '/images/breeds/gir.jpg',
  'red sindhi': '/images/breeds/red-sindhi.jpg',
  'red-sindhi': '/images/breeds/red-sindhi.jpg',
  'kankrej': '/images/breeds/kankrej.jpg',
  'ongole': '/images/breeds/ongole.jpg',
  'tharparkar': '/images/breeds/tharparkar.jpg',
  'rathi': '/images/breeds/rathi.jpg',
  'hariana': '/images/breeds/hariana.jpg',
  'jersey': '/images/breeds/jersey.jpg',
  'holstein friesian': '/images/breeds/holstein-friesian.jpg',
  'holstein-friesian': '/images/breeds/holstein-friesian.jpg',
  'murrah': '/images/breeds/murrah.jpg',
  'jaffarabadi': '/images/breeds/jaffarabadi.jpg',
  'mehsana': '/images/breeds/mehsana.jpg',
  'surti': '/images/breeds/surti.jpg',
  'bhadawari': '/images/breeds/bhadawari.jpg',
};

/** Resolve the correct breed image for a history record based on breed name */
const resolveBreedImage = (breed: string, fallbackUrl?: string): string | undefined => {
  const normalized = breed.toLowerCase().trim();
  // Exact match
  if (HISTORY_BREED_IMAGE[normalized]) return HISTORY_BREED_IMAGE[normalized];
  // Partial match (e.g. "Sahiwal Cow" → "sahiwal", "Holstein Friesian Crossbred" → "holstein friesian")
  for (const [key, url] of Object.entries(HISTORY_BREED_IMAGE)) {
    if (normalized.includes(key) || key.includes(normalized)) return url;
  }
  return fallbackUrl;
};

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, deleteRecognition, clearHistory, setCurrentResult } = useHistory();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimalType, setSelectedAnimalType] = useState<string>('all');
  const [selectedBreed, setSelectedBreed] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const uniqueBreeds = Array.from(new Set(history.map((item) => item.breed))).filter(Boolean);

  const filteredHistory = history.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      item.breed.toLowerCase().includes(query) ||
      item.animalType.toLowerCase().includes(query) ||
      item.formattedDate.toLowerCase().includes(query) ||
      (item.notes && item.notes.toLowerCase().includes(query));

    const matchesAnimal =
      selectedAnimalType === 'all' || item.animalType.toLowerCase() === selectedAnimalType.toLowerCase();

    const matchesBreed =
      selectedBreed === 'all' || item.breed.toLowerCase() === selectedBreed.toLowerCase();

    return matchesQuery && matchesAnimal && matchesBreed;
  });

  const handleViewDetails = (item: RecognitionResult) => {
    setCurrentResult(item);
    navigate('/result');
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = ['Record ID', 'Animal Type', 'Breed', 'Confidence (%)', 'Gender', 'Age Category', 'Date'];
    const rows = history.map((item) => [
      item.id,
      item.animalType,
      item.breed,
      item.confidence,
      item.gender || '',
      item.ageCategory || '',
      `"${item.formattedDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cattle_recognition_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1.5 border border-emerald-200 dark:border-emerald-800">
              <History className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Saved Scans</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              Recognition History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              View and manage your previous cattle breed identification records
            </p>
          </div>

          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900/50 transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear History</span>
                </button>
              </>
            )}
            <Link
              to="/recognize"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>New Recognition</span>
            </Link>
          </div>
        </div>

        {/* Clear All Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Clear All History?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This will permanently delete all cattle recognition logs stored in your local browser storage.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearHistory();
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filters Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by breed, animal type, date, or notes..."
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

            {/* Filter by Animal Type */}
            <div className="md:col-span-3">
              <select
                value={selectedAnimalType}
                onChange={(e) => setSelectedAnimalType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="all">All Animals</option>
                <option value="cow">Cows Only</option>
                <option value="buffalo">Buffaloes Only</option>
              </select>
            </div>

            {/* Filter by Breed */}
            <div className="md:col-span-3">
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="all">All Breeds</option>
                {uniqueBreeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>Showing {filteredHistory.length} of {history.length} saved records</span>
            {(searchQuery || selectedAnimalType !== 'all' || selectedBreed !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAnimalType('all');
                  setSelectedBreed('all');
                }}
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* History Cards Grid */}
        {filteredHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Image */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <CattleImage
                    src={resolveBreedImage(item.breed, item.imageUrl)}
                    alt={item.breed}
                    breedName={item.breed}
                    species={item.animalType}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                    {item.animalType}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-mono font-bold">
                    {item.confidence}% Match
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 px-3 py-1 rounded-xl bg-black/60 backdrop-blur text-white text-[10px] flex items-center gap-1.5 truncate">
                    <Calendar className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{item.formattedDate}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {item.breed} {item.animalType}
                    </h3>
                    {item.gender && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.gender} • {item.ageCategory || 'Adult'}
                      </p>
                    )}

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {item.breedInformation || 'Physical markers confirmed through AI visual pattern matching.'}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-emerald-100 dark:border-emerald-900/50"
                    >
                      <span>View Full Result</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteRecognition(item.id)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <Scan className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">No Matching Records Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              No cattle recognition entries matched your current search filters. Try clearing your filters or perform a new scan.
            </p>
            <div className="pt-2">
              <Link
                to="/recognize"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                <Scan className="w-4 h-4" />
                <span>Perform New Recognition</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
