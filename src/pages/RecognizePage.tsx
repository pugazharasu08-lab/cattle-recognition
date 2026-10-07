import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  Camera,
  Trash2,
  Scan,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

import { fileToBase64, analyzeCattleImage, isForceDemoMode } from '../services/geminiService';
import { useHistory } from '../context/HistoryContext';
import { CameraModal } from '../components/common/CameraModal';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { SAMPLE_CATTLE, SAMPLE_LOW_CONFIDENCE, SAMPLE_NON_CATTLE } from '../data/sampleCattle';

export const RecognizePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addRecognition, setCurrentResult } = useHistory();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [matchedSampleId, setMatchedSampleId] = useState<string | undefined>(undefined);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if a sample was passed via URL parameter
  useEffect(() => {
    const sampleParam = searchParams.get('sample');
    if (sampleParam) {
      const found = SAMPLE_CATTLE.find((s) => s.id === sampleParam);
      if (found) {
        handleSelectSample(found);
      }
    }
  }, [searchParams]);

  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);
    setMatchedSampleId(undefined);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage('Please upload a valid JPG, JPEG, PNG or WEBP image.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Image size must be under 15 MB. Please compress or resize the image.');
      return;
    }

    try {
      const { dataUrl } = await fileToBase64(file);
      setSelectedImage(dataUrl);
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      setMatchedSampleId(undefined);
    } catch (err) {
      console.error(err);
      setErrorMessage('Unable to process the selected image. Please try another image.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleCameraCapture = (dataUrl: string, capturedFileName: string) => {
    setErrorMessage(null);
    setSelectedImage(dataUrl);
    setFileName(capturedFileName);
    setFileSize('Camera Capture');
    setMatchedSampleId(undefined);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileName('');
    setFileSize('');
    setMatchedSampleId(undefined);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_CATTLE[0]) => {
    setErrorMessage(null);
    setSelectedImage(sample.imageUrl);
    setFileName(sample.expectedResult.imageFileName || `${sample.id}.jpg`);
    setFileSize('Demo Image');
    setMatchedSampleId(sample.id);
  };

  const handleSelectLowConf = () => {
    setErrorMessage(null);
    setSelectedImage(SAMPLE_LOW_CONFIDENCE.imageUrl);
    setFileName(SAMPLE_LOW_CONFIDENCE.imageFileName);
    setFileSize('Demo Image');
    setMatchedSampleId('sample-low-conf');
  };

  const handleSelectNonCattle = () => {
    setErrorMessage(null);
    setSelectedImage(SAMPLE_NON_CATTLE.imageUrl);
    setFileName(SAMPLE_NON_CATTLE.imageFileName);
    setFileSize('Demo Image');
    setMatchedSampleId('sample-non-cattle');
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload or capture a cattle image first.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);

    try {
      const result = await analyzeCattleImage(selectedImage, fileName, matchedSampleId);

      if (result.status === 'no_cattle') {
        setIsAnalyzing(false);
        setErrorMessage(result.errorMessage || 'No cattle detected. Please upload a clear image of a cow or buffalo.');
        return;
      }

      try {
        const resultStr = JSON.stringify(result);
        try { sessionStorage.setItem('cattleRecognitionResult', resultStr); } catch (_) {}
        try { localStorage.setItem('cattleRecognitionResult', resultStr); } catch (_) {}
      } catch (e) {
        console.error('Failed to save cattleRecognitionResult to storage', e);
      }

      addRecognition(result);
      setCurrentResult(result);
      navigate('/result', { state: { result } });
    } catch (err: any) {
      console.error('Recognition error:', err);
      setIsAnalyzing(false);
      setErrorMessage('Unable to analyze the image right now. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-10 px-4 sm:px-6 lg:px-8">
      {/* Loading Overlay */}
      {isAnalyzing && (
        <LoadingScreen
          imagePreviewUrl={selectedImage || undefined}
          isDemo={isForceDemoMode() || !!matchedSampleId}
        />
      )}

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)]">
            Recognize Cattle
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl mx-auto">
            Upload or capture a clear image of a cow or buffalo to identify its breed.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-semibold">
              <p>{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Upload / Preview Workspace */}
          <div className="lg:col-span-8 bg-[var(--color-card)] p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] space-y-6">
            {!selectedImage ? (
              /* Drag and Drop Zone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-900/10 scale-[1.01]'
                    : 'border-[var(--color-border)] hover:border-emerald-400 bg-[var(--color-bg)]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleInputChange}
                  className="hidden"
                  id="cattle-file-upload"
                />

                <div className="max-w-md mx-auto space-y-5">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
                    <Upload className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text)]">
                      Upload or capture a clear image of the cattle
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                      Drag and drop your cattle photo here, or use the buttons below
                    </p>
                  </div>

                  {/* Two Main Option Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      id="upload-image-btn"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      id="use-camera-btn"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[var(--color-card)] hover:bg-[var(--color-bg)] text-[var(--color-text)] font-bold text-sm border border-[var(--color-border)] transition flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Camera className="w-4 h-4 text-emerald-600" />
                      <span>Use Camera</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[var(--color-text-muted)] font-medium">
                    Supported formats: JPG, JPEG, PNG, WEBP (Max 15 MB)
                  </p>
                </div>
              </div>
            ) : (
              /* Image Preview */
              <div className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-950 border border-[var(--color-border)] shadow-md group">
                  <img
                    src={selectedImage}
                    alt="Selected Cattle Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFjMjEyOCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiBmb250LXNpemU9IjY0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5SEPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />

                  {/* Remove button */}
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 hover:bg-rose-600 text-white shadow-lg backdrop-blur transition"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* File info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur text-white text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <ImageIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="font-semibold truncate">{fileName}</span>
                    </div>
                    <span className="text-[11px] text-slate-300 font-mono flex-shrink-0 pl-2">
                      {fileSize}
                    </span>
                  </div>
                </div>

                {/* Analyze Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    id="analyze-cattle-btn"
                    className="w-full py-4 px-8 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-xl shadow-emerald-700/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Scan className="w-5 h-5 text-emerald-300" />
                    <span>Analyze Cattle</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-[var(--color-bg)] hover:bg-[var(--color-surface)] text-[var(--color-text)] font-bold text-sm border border-[var(--color-border)] transition"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Demo Samples */}
          <div className="lg:col-span-4 bg-[var(--color-card)] p-6 rounded-3xl border border-[var(--color-border)] space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border)]">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                <Scan className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--color-text)]">Sample Images</h3>
                <p className="text-[11px] text-[var(--color-text-muted)]">Demo breed recognition</p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Don't have a cattle photo? Select a sample to test the recognition:
            </p>

            {/* Sample list */}
            <div className="space-y-2.5">
              {[
                SAMPLE_CATTLE.find((s) => s.id === 'sample-sahiwal')!,
                SAMPLE_CATTLE.find((s) => s.id === 'sample-murrah')!,
                ...SAMPLE_CATTLE.filter((s) => s.id !== 'sample-sahiwal' && s.id !== 'sample-murrah')
              ].filter(Boolean).map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`flex items-center gap-3 p-2.5 rounded-2xl border cursor-pointer transition ${
                    matchedSampleId === sample.id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'bg-[var(--color-bg)] hover:bg-[var(--color-surface)] border-[var(--color-border)]'
                  }`}
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-900 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMTBiOTgxIiBvcGFjaXR5PSIwLjIiIHJ4PSIxMCIvPjx0ZXh0IHg9IjI0IiB5PSIzMiIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+UhDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[var(--color-text)] truncate">
                      {sample.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      {sample.breed} • {sample.expectedResult.confidence}%
                    </p>
                  </div>
                  {matchedSampleId === sample.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Edge case tests */}
            <div className="pt-2 border-t border-[var(--color-border)] space-y-2">
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block">
                Edge Cases
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSelectLowConf}
                  className="p-2 text-left rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-700/30 text-amber-900 dark:text-amber-300 text-xs font-semibold transition"
                >
                  Low Confidence
                </button>
                <button
                  type="button"
                  onClick={handleSelectNonCattle}
                  className="p-2 text-left rounded-xl bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 border border-rose-200 dark:border-rose-700/30 text-rose-900 dark:text-rose-300 text-xs font-semibold transition"
                >
                  Non-Cattle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
