import { useState } from "react";
import { X, Download, FileText, CheckCircle, Loader2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BROCHURES } from "../data";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (brochureId: string) => {
    setDownloadingId(brochureId);
    setDownloadedId(null);
    
    // Simulate high fidelity PDF package generation
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedId(brochureId);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="bg-[#0A0A0A] border border-white/10 w-full max-w-xl rounded-none shadow-2xl relative p-6 md:p-10"
        id="brochure-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-1">
          DOWNLOAD CENTER
        </span>
        <h2 className="font-serif italic font-light text-2xl md:text-3xl text-white capitalize tracking-wide mb-4">
          broschüren & preise
        </h2>
        <p className="text-sm text-white/50 font-light mb-8">
          Laden Sie die aktuellen Kataloge, Preislisten und technischen Datenblätter direkt als hochauflösende PDF-Dateien herunter.
        </p>

        <div className="space-y-4">
          {BROCHURES.map((brochure) => (
            <div
              key={brochure.id}
              className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-none transition-all"
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/5 text-[#E0DDD5]/60 border border-white/5">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide leading-tight">
                    {brochure.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] text-white/40 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Stand {brochure.date}
                    </span>
                    <span>•</span>
                    <span>Größe: {brochure.size}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {downloadedId === brochure.id ? (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3.5 py-2 border border-emerald-500/20">
                  <CheckCircle className="w-4 h-4" /> Fertig
                </div>
              ) : (
                <button
                  disabled={downloadingId !== null}
                  onClick={() => handleDownload(brochure.id)}
                  className={`px-4 py-2 text-[10px] rounded-full font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    downloadingId === brochure.id
                      ? "bg-white/5 text-gray-500 border border-white/5"
                      : "bg-gold text-black hover:bg-gold/90 border border-gold"
                  }`}
                >
                  {downloadingId === brochure.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      Lädt...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      PDF
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-500 leading-normal">
          <span>Alle Preise sind unverbindliche Preisempfehlungen des Herstellers ab Werk inkl. 19% MwSt.</span>
        </div>
      </motion.div>
    </div>
  );
}
