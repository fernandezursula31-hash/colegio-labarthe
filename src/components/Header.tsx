import React from 'react';
import { Play, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'laminas' | 'album';
  onSelectTab: (tab: 'laminas' | 'album') => void;
  onOpenSlideshow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSlideshow
}) => {
  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Institutional Top Strip: Identidad Escolar y Lema */}
      <div className="bg-[#7a2411] text-[#f3e1a0] text-[10px] sm:text-[11px] py-1 px-4 md:px-8 border-b border-[#d68d2b]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold tracking-wide">I.E.P. Pedro A. Labarthe</span>
            <span className="opacity-60 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Chiclayo, Lambayeque</span>
          </div>
          <div className="flex items-center gap-2 font-medium shrink-0">
            <span className="italic text-[#fffdf5]">«Entra y Aprende, Sal a Servir»</span>
            <span className="opacity-60 hidden md:inline">|</span>
            <span className="hidden md:inline font-bold text-[#d68d2b]">Semana Técnica 2026</span>
          </div>
        </div>
      </div>

      {/* Upper Header: Rojo terracota (#962d16) con borde Ocre (#d68d2b) */}
      <div className="bg-[#962d16] border-b-2 border-[#d68d2b] px-4 md:px-8 py-2.5 sm:py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand Zone - Official School Crest */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('laminas')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl p-0.5 bg-white/10 border-2 border-[#d68d2b] flex items-center justify-center shadow-sm group-hover:border-[#f3e1a0] transition-colors shrink-0">
                <img
                  src="/assets/aistudio/image_b4056e1a.png"
                  alt="Insignia Colegio Labarthe Chiclayo"
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-tight text-white text-base md:text-lg group-hover:text-[#f3e1a0] transition-colors leading-tight">
                  Colegio Labarthe
                </span>
                <span className="text-[10px] md:text-xs text-[#f3e1a0]/95 leading-tight font-medium">
                  Talleres de Producción · Chiclayo
                </span>
              </div>
            </button>
          </div>

          {/* Right Actions: Protection Badge + Primary Accent Button (#1f6f8b) */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Protection Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-white px-2.5 py-1.5 rounded-lg bg-[#7a2411] border border-[#d68d2b]/60 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f3e1a0] shrink-0" />
              <span className="hidden sm:inline">Visualización Protegida</span>
              <span className="sm:hidden">Protegida</span>
            </div>

            {/* Primary Action Button - Azul océano (#1f6f8b) con borde Ocre (#d68d2b) */}
            <button
              onClick={onOpenSlideshow}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#1f6f8b] hover:bg-[#18586f] active:bg-[#134456] rounded-lg border border-[#d68d2b] transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#f3e1a0]" />
              <span>Presentación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Header: Barra de menú en Azul océano (#1f6f8b) con bordes Ocre (#d68d2b) */}
      <nav className="bg-[#1f6f8b] border-b-2 border-[#d68d2b] px-4 md:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-start gap-2 sm:gap-4 text-xs md:text-sm font-semibold">
          <button
            onClick={() => onSelectTab('laminas')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'laminas'
                ? 'bg-[#962d16] text-[#f3e1a0] font-bold border border-[#d68d2b] shadow-inner'
                : 'text-white/90 hover:text-white hover:bg-[#18586f]'
            }`}
          >
            Catálogo de Talleres
          </button>
          <button
            onClick={() => onSelectTab('album')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'album'
                ? 'bg-[#962d16] text-[#f3e1a0] font-bold border border-[#d68d2b] shadow-inner'
                : 'text-white/90 hover:text-white hover:bg-[#18586f]'
            }`}
          >
            Álbum Fotográfico
          </button>
        </div>
      </nav>
    </header>
  );
};
