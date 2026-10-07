import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} inverted={true} />
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An intelligent AI-powered vision application for identifying cattle and buffalo breeds, 
              estimating milk production metrics, examining eye features, and providing seasonal 
              health and vaccination guidance.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI-Powered Cattle Breed Recognition & Livestock Information</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition">Dashboard</Link>
              </li>
              <li>
                <Link to="/recognize" className="hover:text-emerald-400 transition">Recognize Cattle</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-emerald-400 transition">Recognition History</Link>
              </li>
              <li>
                <Link to="/breeds" className="hover:text-emerald-400 transition">Cattle Breeds Directory</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-400 transition">My Profile</Link>
              </li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">System Capabilities</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                <div className="flex items-center justify-between text-slate-300 font-semibold">
                  <span>Recognition AI</span>
                  <span className="text-emerald-400">Gemini Vision</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eye Analysis</span>
                  <span>Morphological</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Security</span>
                  <span>LocalStorage</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Cattle Recognition. AI-Powered Breed Identification & Livestock Information.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Livestock Care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
