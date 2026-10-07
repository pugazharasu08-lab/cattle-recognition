import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scan,
  CheckCircle,
  Award,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Calendar,
  Zap,
  Eye,
  Milk
} from 'lucide-react';
import { useHistory } from '../context/HistoryContext';
import { useAuth } from '../context/AuthContext';
import { ConfidenceRing } from '../components/common/ConfidenceRing';
import { SAMPLE_CATTLE } from '../data/sampleCattle';

export const DashboardPage: React.FC = () => {
  const { stats, setCurrentResult } = useHistory();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewRecent = (item: any) => {
    setCurrentResult(item);
    navigate('/result');
  };

  const quickFeatures = [
    {
      icon: Scan,
      title: 'Upload Image',
      desc: 'Upload a photo of any cow or buffalo',
      color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-700/30'
    },
    {
      icon: Eye,
      title: 'AI Analysis',
      desc: 'AI examines physical & eye features',
      color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400',
      border: 'border-teal-200 dark:border-teal-700/30'
    },
    {
      icon: Award,
      title: 'Breed Identification',
      desc: 'Get the breed with confidence score',
      color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-700/30'
    },
    {
      icon: Milk,
      title: 'Milk Estimates',
      desc: 'Daily & monthly milk production estimates',
      color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-700/30'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-16">
      {/* Welcome Bar */}
      <div className="bg-[var(--color-card)] border-b border-[var(--color-border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
              Welcome to Cattle Recognition
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Recognize a cattle breed from an image and explore breed-specific livestock information.
            </p>
            {user?.name && (
              <p className="text-xs text-emerald-600 font-semibold">
                👋 Hello, {user.name.split(' ')[0]}!
              </p>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            to="/recognize"
            id="recognize-cattle-btn"
            className="px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2.5"
          >
            <span>🐄</span>
            <span>Recognize Cattle</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Quick Start Features */}
        <div>
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`bg-[var(--color-card)] rounded-2xl p-5 border ${feature.border} flex items-start gap-3`}
                >
                  <div className={`p-2.5 rounded-xl ${feature.color} flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text)]">{feature.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main CTA Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-8">
            <Scan className="w-96 h-96" />
          </div>

          <div className="max-w-2xl space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Upload a cattle image to get started
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Our AI analyzes physical characteristics, eye features, horn shape, and more to identify the breed and provide useful livestock information.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/recognize"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Scan className="w-4 h-4 text-emerald-700" />
                <span>Recognize Cattle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/breeds"
                className="px-5 py-3.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-sm border border-white/20 transition flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Cattle Breeds</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Two-Column: Recent + Demo Samples */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Recognition */}
          <div className="lg:col-span-7 bg-[var(--color-card)] rounded-3xl p-6 sm:p-7 border border-[var(--color-border)] space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-text)]">Recent Recognitions</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">Your most recent breed identification</p>
                </div>
              </div>

              <Link
                to="/history"
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Recognition History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {stats.recentRecognition ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Cattle Image */}
                  <div className="sm:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 relative shadow-sm">
                    <img
                      src={stats.recentRecognition.imageUrl}
                      alt={stats.recentRecognition.breed}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold">
                      {stats.recentRecognition.animalType}
                    </div>
                    {stats.recentRecognition.isDemoMode && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[10px] font-bold">
                        DEMO
                      </div>
                    )}
                  </div>

                  {/* Summary Details */}
                  <div className="sm:col-span-7 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          Identified Breed
                        </span>
                        <h4 className="text-2xl font-black text-[var(--color-text)]">
                          {stats.recentRecognition.breed}
                        </h4>
                        <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{stats.recentRecognition.formattedDate}</span>
                        </p>
                      </div>
                      <ConfidenceRing
                        confidence={stats.recentRecognition.confidence}
                        size={64}
                        strokeWidth={6}
                        showLabel={false}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold block">Animal</span>
                        <span className="font-semibold text-[var(--color-text)]">{stats.recentRecognition.animalType}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold block">Confidence</span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">{stats.recentRecognition.confidence}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewRecent(stats.recentRecognition)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-bold text-xs transition border border-emerald-200 dark:border-emerald-700/30 flex items-center justify-center gap-1.5"
                    >
                      <span>View Full Result</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-[var(--color-text-muted)] space-y-2">
                <Scan className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm font-medium">No cattle recognized yet.</p>
                <Link
                  to="/recognize"
                  className="inline-block mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Perform your first recognition
                </Link>
              </div>
            )}
          </div>

          {/* Quick Demo Samples */}
          <div className="lg:col-span-5 bg-[var(--color-card)] rounded-3xl p-6 sm:p-7 border border-[var(--color-border)] space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-text)]">Sample Cattle</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">Try with demo images</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Don't have a cattle photo? Click any sample below to test the recognition workflow:
            </p>

            <div className="space-y-3">
              {SAMPLE_CATTLE.slice(0, 3).map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => navigate(`/recognize?sample=${sample.id}`)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-[var(--color-bg)] hover:bg-emerald-50 dark:hover:bg-emerald-900/10 border border-[var(--color-border)] hover:border-emerald-300 dark:hover:border-emerald-700/50 cursor-pointer transition-all group"
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-900 flex-shrink-0 group-hover:scale-105 transition"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIGZpbGw9IiMxMGI5ODEiIG9wYWNpdHk9IjAuMiIgcng9IjEyIi8+PHRleHQgeD0iMjgiIHk9IjM1IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5SEPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[var(--color-text)] truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-400">
                        {sample.name}
                      </h4>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                        {sample.expectedResult.confidence}%
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                      {sample.badge} • {sample.animalType}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-emerald-600 flex-shrink-0" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/recognize"
                className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>Recognize</span>
              </Link>
              <Link
                to="/breeds"
                className="py-3 px-4 rounded-xl bg-[var(--color-bg)] hover:bg-[var(--color-surface)] text-[var(--color-text)] font-bold text-xs border border-[var(--color-border)] flex items-center justify-center gap-2 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Breeds</span>
              </Link>
            </div>
          </div>
        </div>

        {/* History link card */}
        <div className="bg-[var(--color-card)] rounded-2xl p-5 border border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-sm text-[var(--color-text)]">Recognition History</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {stats.totalRecognitions} recognition{stats.totalRecognitions !== 1 ? 's' : ''} stored locally
              </p>
            </div>
          </div>
          <Link
            to="/history"
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 flex items-center gap-1 py-2 px-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
          >
            <span>View History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
