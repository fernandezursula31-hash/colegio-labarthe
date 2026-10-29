import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExhibitionItem } from '../data/fairData';
import { ProtectedImage } from './ProtectedImage';

interface ProjectDetailModalProps {
  item: ExhibitionItem | null;
  onClose: () => void;
  onShowProtectionNotice: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  item,
  onClose,
  onShowProtectionNotice
}) => {
  const [likes, setLikes] = useState(45);

  if (!item) return null;

  const handleLike = () => {
    setLikes(l => l + 1);
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#fffcf5] border-2 border-[#d68d2b] rounded-3xl overflow-hidden shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-white/95 hover:bg-white text-[#962d16] transition-colors cursor-pointer border border-[#d68d2b] shadow-md"
          title="Cerrar (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Photo Column with Strict Download Protection */}
          <div className="md:col-span-6 bg-neutral-900 relative min-h-[320px] md:min-h-full">
            <ProtectedImage
              src={item.imageSrc}
              alt={item.title}
              aspectRatioClassName="w-full h-full min-h-[320px] md:min-h-full"
              watermarkText="Catálogo Labarthe · Protegida"
              onProtectedNotice={onShowProtectionNotice}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white z-20">
              <span className="font-mono text-xs font-bold text-white bg-[#1f6f8b] px-2.5 py-0.5 rounded shadow border border-[#d68d2b]">
                REF: {item.code}
              </span>
              <p className="text-sm font-bold mt-1 text-white">
                {item.studentTeam}
              </p>
            </div>
          </div>

          {/* Details Column - Warm catalog styling */}
          <div className="md:col-span-6 p-6 md:p-8 space-y-5 max-h-[85vh] overflow-y-auto bg-[#fffcf5] text-[#962d16]">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#d68d2b] font-extrabold">{item.category}</span>
                <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
                <span className="text-[#962d16] font-bold">{item.workshopLabel}</span>
                <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
                <span className="text-[#962d16]/70">{item.date}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#962d16] mt-1 font-display">
                {item.title}
              </h3>
              <p className="text-xs text-[#962d16]/75 mt-0.5 font-medium">
                {item.subtitle}
              </p>
            </div>

            {/* Short description */}
            <p className="text-xs text-[#962d16]/90 leading-relaxed font-medium">
              {item.shortDescription}
            </p>

            {/* Materials block in Fondo Beige Arena (#f3e1a0) */}
            <div className="p-3.5 rounded-2xl bg-[#f3e1a0] border border-[#d68d2b] text-xs space-y-1 shadow-xs">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#962d16]">
                Materiales del Proyecto:
              </h4>
              <p className="text-[#962d16]/95 font-medium">
                {item.materials}
              </p>
            </div>

            {/* Specifications list */}
            <div className="space-y-2 pt-1 border-t border-[#d68d2b]/40">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#d68d2b]">
                Especificaciones Técnicas:
              </h4>
              <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#962d16]">
                {item.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#1f6f8b] shrink-0 font-extrabold" />
                    <span className="font-medium">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#d68d2b]/40">
              <button
                onClick={handleLike}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f3e1a0] hover:bg-[#e8d58f] text-[#962d16] text-xs font-bold border border-[#d68d2b] transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-[#962d16] text-[#962d16]" />
                <span>{likes} reconocimientos</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f3e1a0] text-[#1f6f8b] text-xs font-bold border border-[#d68d2b]">
                <ShieldCheck className="w-4 h-4 text-[#962d16]" />
                <span>Visualización Protegida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
