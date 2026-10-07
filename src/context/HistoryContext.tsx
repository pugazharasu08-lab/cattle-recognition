import React, { createContext, useContext, useState, useEffect } from 'react';
import type { RecognitionResult, DashboardStats } from '../types/cattle';

import { SAMPLE_CATTLE } from '../data/sampleCattle';

const HISTORY_STORAGE_KEY = 'cattle_recognition_history_data';

interface HistoryContextType {
  history: RecognitionResult[];
  addRecognition: (item: RecognitionResult) => void;
  deleteRecognition: (id: string) => void;
  clearHistory: () => void;
  getRecognitionById: (id: string) => RecognitionResult | undefined;
  stats: DashboardStats;
  currentResult: RecognitionResult | null;
  setCurrentResult: (result: RecognitionResult | null) => void;
}

const INITIAL_SEEDED_HISTORY: RecognitionResult[] = [
  {
    ...SAMPLE_CATTLE[0].expectedResult,
    id: 'seed-sahiwal-01',
    formattedDate: '05 Oct 2026, 10:30 AM',
    timestamp: '2026-10-05T10:30:00.000Z',
    notes: 'Purebred Sahiwal cow with loose pendulous dewlap (Lola) and high milk capacity.'
  },
  {
    ...SAMPLE_CATTLE[1].expectedResult,
    id: 'seed-gir-02',
    formattedDate: '04 Oct 2026, 04:15 PM',
    timestamp: '2026-10-04T16:15:00.000Z',
    notes: 'Purebred Gir cow with distinctive domed forehead shield and long pendulous curled ears.'
  },
  {
    ...SAMPLE_CATTLE[2].expectedResult,
    id: 'seed-redsindhi-03',
    formattedDate: '03 Oct 2026, 09:45 AM',
    timestamp: '2026-10-03T09:45:00.000Z',
    notes: 'Deep dark red coat, compact frame, and lateral upward-curving horns.'
  }
];

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<RecognitionResult[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading history from localStorage', e);
    }
    return INITIAL_SEEDED_HISTORY;
  });

  const [currentResult, setCurrentResultState] = useState<RecognitionResult | null>(() => {
    try {
      const sessionStored = sessionStorage.getItem('cattleRecognitionResult');
      if (sessionStored) {
        return JSON.parse(sessionStored);
      }
      const localStored = localStorage.getItem('cattleRecognitionResult');
      if (localStored) {
        return JSON.parse(localStored);
      }
    } catch (e) {
      console.error('Error loading cattleRecognitionResult from storage', e);
    }
    return null;
  });

  const setCurrentResult = (result: RecognitionResult | null) => {
    setCurrentResultState(result);
    try {
      if (result) {
        const str = JSON.stringify(result);
        try { sessionStorage.setItem('cattleRecognitionResult', str); } catch (_) {}
        try { localStorage.setItem('cattleRecognitionResult', str); } catch (_) {}
      } else {
        try { sessionStorage.removeItem('cattleRecognitionResult'); } catch (_) {}
        try { localStorage.removeItem('cattleRecognitionResult'); } catch (_) {}
      }
    } catch (e) {
      console.error('Error syncing cattleRecognitionResult to storage', e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Storage quota exceeded when saving history, trimming older records:', e);
      try {
        if (history.length > 10) {
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
        }
      } catch (_) {}
    }
  }, [history]);

  const addRecognition = (item: RecognitionResult) => {
    setHistory((prev) => [item, ...prev]);
    setCurrentResult(item);
  };

  const deleteRecognition = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (currentResult?.id === id) {
      setCurrentResult(null);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentResult(null);
  };

  const getRecognitionById = (id: string) => {
    return history.find((item) => item.id === id);
  };

  // Derive live dashboard statistics
  const totalRecognitions = history.length;
  const successfulIdentifications = history.filter(
    (item) => item.status === 'success' && item.confidence >= 60
  ).length;
  const uniqueBreeds = new Set(
    history
      .filter((item) => item.status === 'success')
      .map((item) => `${item.animalType}-${item.breed}`)
  );
  const cattleBreedsIdentified = uniqueBreeds.size;
  const recentRecognition = history[0] || null;

  const stats: DashboardStats = {
    totalRecognitions,
    successfulIdentifications,
    cattleBreedsIdentified,
    recentRecognition
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addRecognition,
        deleteRecognition,
        clearHistory,
        getRecognitionById,
        stats,
        currentResult,
        setCurrentResult
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
