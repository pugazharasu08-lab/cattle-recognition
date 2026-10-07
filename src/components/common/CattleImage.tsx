import React, { useState } from 'react';

interface CattleImageProps {
  src?: string;
  alt: string;
  breedName?: string;
  species?: 'Cow' | 'Buffalo' | string;
  className?: string;
}

const BREED_IMAGE_MAP: Record<string, string> = {
  // 5 Uploaded real breed images (exact mappings)
  'sahiwal': '/images/breeds/sahiwal.jpg',
  'gir': '/images/breeds/gir.jpg',
  'red sindhi': '/images/breeds/red-sindhi.jpg',
  'red-sindhi': '/images/breeds/red-sindhi.jpg',
  'kankrej': '/images/breeds/kankrej.jpg',
  'ongole': '/images/breeds/ongole.jpg',

  // Other Cows
  'tharparkar': '/images/breeds/tharparkar.jpg',
  'rathi': '/images/breeds/rathi.jpg',
  'hariana': '/images/breeds/hariana.jpg',
  'jersey': '/images/breeds/jersey.jpg',
  'holstein friesian': '/images/breeds/holstein-friesian.jpg',
  'holstein-friesian': '/images/breeds/holstein-friesian.jpg',

  // Buffaloes
  'murrah': '/images/breeds/murrah.jpg',
  'jaffarabadi': '/images/breeds/jaffarabadi.jpg',
  'mehsana': '/images/breeds/mehsana.jpg',
  'surti': '/images/breeds/surti.jpg',
  'bhadawari': '/images/breeds/bhadawari.jpg',
};

const BUFFALO_BREEDS = new Set([
  'murrah',
  'jaffarabadi',
  'mehsana',
  'surti',
  'bhadawari',
  'nili-ravi',
  'pandharpuri',
  'banni',
  'nagpuri',
  'toddy',
  'buffalo',
  'water buffalo'
]);

export const CattleImage: React.FC<CattleImageProps> = ({
  src,
  alt,
  breedName,
  species,
  className = 'w-full h-full object-cover'
}) => {
  const displayName = breedName || alt || 'Livestock Specimen';

  // Determine whether animal is buffalo or cow
  const isBuffalo = (() => {
    if (species) {
      return species.toLowerCase().includes('buffalo');
    }
    const checkString = `${breedName || ''} ${alt || ''}`.toLowerCase();
    for (const buf of BUFFALO_BREEDS) {
      if (checkString.includes(buf)) return true;
    }
    return false;
  })();

  const normalizedKey = (breedName || alt || '').toLowerCase().trim();
  const breedSpecificAsset = BREED_IMAGE_MAP[normalizedKey];
  const speciesFallbackAsset = isBuffalo
    ? '/images/breeds/murrah.jpg'
    : '/images/breeds/gir.jpg';

  const initialSrc = (src && src.trim().length > 0)
    ? src
    : (breedSpecificAsset || speciesFallbackAsset);

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [fallbackStage, setFallbackStage] = useState<number>(0);
  const [prevSrc, setPrevSrc] = useState<string | undefined>(src);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setCurrentSrc(initialSrc);
    setFallbackStage(0);
  }

  const handleImageError = () => {
    if (fallbackStage === 0) {
      // Stage 1: If currentSrc wasn't the breed-specific asset, try that
      if (breedSpecificAsset && currentSrc !== breedSpecificAsset) {
        setCurrentSrc(breedSpecificAsset);
        setFallbackStage(1);
        return;
      }
      // Otherwise try species-specific fallback
      if (currentSrc !== speciesFallbackAsset) {
        setCurrentSrc(speciesFallbackAsset);
        setFallbackStage(2);
        return;
      }
      setFallbackStage(3);
    } else if (fallbackStage === 1) {
      // Stage 2: Try species-specific fallback
      if (currentSrc !== speciesFallbackAsset) {
        setCurrentSrc(speciesFallbackAsset);
        setFallbackStage(2);
        return;
      }
      setFallbackStage(3);
    } else {
      // Stage 3: Render vector specimen badge (no broken image, no 'unavailable' text)
      setFallbackStage(3);
    }
  };

  if (fallbackStage >= 3) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 ${
          isBuffalo
            ? 'bg-gradient-to-br from-slate-950 via-zinc-900 to-black'
            : 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950'
        } text-white text-center select-none relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`w-14 h-14 rounded-2xl ${
              isBuffalo
                ? 'bg-zinc-800/80 border border-zinc-600/50'
                : 'bg-emerald-500/20 border border-emerald-500/40'
            } flex items-center justify-center mb-2 shadow-inner`}
          >
            {isBuffalo ? (
              <svg className="w-8 h-8 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8C3 3 7 2 10 5" />
                <path d="M20 8C21 3 17 2 14 5" />
                <path d="M7 10h10v6a5 5 0 0 1-10 0v-6z" />
                <circle cx="10" cy="13" r="1" fill="currentColor" />
                <circle cx="14" cy="13" r="1" fill="currentColor" />
                <path d="M10 18h4" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7c0-2 2-3 6-3s6 1 6 3v3H6V7z" />
                <path d="M5 10c-2 1-3 3-3 5 0 3 4 5 10 5s10-2 10-5c0-2-1-4-3-5" />
                <circle cx="9" cy="13" r="1" fill="currentColor" />
                <circle cx="15" cy="13" r="1" fill="currentColor" />
              </svg>
            )}
          </div>
          <span className="font-heading font-bold text-sm text-slate-100 tracking-wide line-clamp-1">
            {displayName}
          </span>
          <span
            className={`text-[11px] font-semibold mt-1 px-3 py-0.5 rounded-full ${
              isBuffalo
                ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isBuffalo ? 'Dairy Buffalo Specimen' : 'Indigenous Cattle Specimen'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      className={className}
      onError={handleImageError}
    />
  );
};
