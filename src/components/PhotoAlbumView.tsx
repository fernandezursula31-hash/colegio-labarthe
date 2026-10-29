import React, { useState } from 'react';
import { Eye, Wrench, Cake, Hammer, Zap, HardHat, ShieldCheck } from 'lucide-react';
import { EXHIBITION_ITEMS, ExhibitionItem, WorkshopType } from '../data/fairData';
import { ProtectedImage } from './ProtectedImage';

interface PhotoAlbumViewProps {
  onSelectItem: (item: ExhibitionItem) => void;
  onOpenSlideshowAt: (index: number) => void;
  onShowProtectionNotice: () => void;
}

export const PhotoAlbumView: React.FC<PhotoAlbumViewProps> = ({
  onSelectItem,
  onOpenSlideshowAt,
  onShowProtectionNotice
}) => {
  const [activeWorkshop, setActiveWorkshop] = useState<WorkshopType>('todos');

  const filteredItems = activeWorkshop === 'todos'
    ? EXHIBITION_ITEMS
    : EXHIBITION_ITEMS.filter(i => i.workshop === activeWorkshop);

  return (
    <section className="space-y-6">
      {/* Header Banner on warm background with Ocre (#d68d2b) border */}
      <div className="relative overflow-hidden rounded-2xl bg-[#fff8ea] border-2 border-[#d68d2b] p-5 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 p-1.5 rounded-2xl bg-white border-2 border-[#d68d2b] flex items-center justify-center shadow-md">
              <img
                src="/assets/aistudio/image_b4056e1a.png"
                alt="Insignia Colegio Labarthe"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#d68d2b] font-extrabold mb-1">
                <span>Registro Fotográfico Oficial</span>
                <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
                <span>Colegio Labarthe Chiclayo</span>
                <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
                <span className="text-[#962d16] flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#962d16]" /> Visualización Protegida
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#962d16] font-display">
                Álbum Fotográfico de Talleres
              </h2>
              <p className="text-[#962d16]/90 text-xs md:text-sm max-w-2xl mt-0.5 font-medium">
                Galería técnica con 2 fotografías por cada taller: Ebanistería, Mecánica Automotriz,
                Electricidad, Construcción Civil y Repostería.
              </p>
            </div>
          </div>

          {/* Filter controls in Beige/Ocre with Azul Océano active state */}
          <div className="flex flex-wrap items-center gap-1 bg-[#f3e1a0] p-1 rounded-xl border-2 border-[#d68d2b] shadow-inner">
            <button
              onClick={() => setActiveWorkshop('todos')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeWorkshop === 'todos'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              Todos ({EXHIBITION_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveWorkshop('ebanisteria')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeWorkshop === 'ebanisteria'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Hammer className="w-3 h-3" />
              <span>Ebanistería (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('mecanica')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeWorkshop === 'mecanica'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Wrench className="w-3 h-3" />
              <span>Mecánica (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('electricidad')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeWorkshop === 'electricidad'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Electricidad (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('construccion')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeWorkshop === 'construccion'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <HardHat className="w-3 h-3" />
              <span>Construcción (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('reposteria')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeWorkshop === 'reposteria'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Cake className="w-3 h-3" />
              <span>Repostería (2)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Photos: 3 cols desktop, 2 cols mobile in warm cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item) => {
          const globalIdx = EXHIBITION_ITEMS.findIndex(e => e.id === item.id);

          return (
            <article
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group flex flex-col justify-between bg-[#fffcf5] hover:bg-white border-2 border-[#d68d2b]/60 hover:border-[#1f6f8b] rounded-2xl p-2.5 md:p-3.5 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                {/* Image: Square with subtle white frame */}
                <div className="p-1 bg-white border border-[#d68d2b]/40 rounded-xl overflow-hidden shadow-xs relative">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-900">
                    <ProtectedImage
                      src={item.imageSrc}
                      alt={item.title}
                      aspectRatioClassName="w-full h-full aspect-square"
                      className="transition-transform duration-500 group-hover:scale-105"
                      watermarkText="Labarthe"
                      onProtectedNotice={onShowProtectionNotice}
                    />

                    {/* Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Top reference tag */}
                    <span className="absolute top-2 left-2 z-20 font-mono text-[10px] md:text-[11px] font-bold text-white bg-[#1f6f8b]/95 backdrop-blur-sm px-2 py-0.5 rounded shadow border border-[#d68d2b]/50">
                      {item.code}
                    </span>

                    {/* Quick zoom button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSlideshowAt(globalIdx >= 0 ? globalIdx : 0);
                      }}
                      className="absolute top-2 right-2 z-20 p-1.5 rounded-lg bg-[#1f6f8b]/90 hover:bg-[#1f6f8b] text-white transition-colors border border-[#d68d2b]/60 cursor-pointer shadow-sm"
                      title="Ver en pantalla completa"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <span className="absolute bottom-2 left-2 z-20 text-[10px] font-bold text-[#f3e1a0] bg-[#962d16]/95 backdrop-blur-md px-2 py-0.5 rounded border border-[#d68d2b]/50">
                      {item.workshopLabel}
                    </span>
                  </div>
                </div>

                {/* Underneath: Title in bold Rojo terracota (#962d16), secondary data in Ocre (#d68d2b) */}
                <div className="pt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#d68d2b] font-bold">
                    <span className="truncate">{item.workshopLabel}</span>
                    <span className="text-[#962d16]/70 font-semibold text-[10px] truncate ml-1">{item.studentTeam}</span>
                  </div>

                  <h3 className="font-bold text-[#962d16] text-sm md:text-base leading-snug line-clamp-1 group-hover:text-[#1f6f8b] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#962d16]/85 line-clamp-2 leading-relaxed font-medium">
                    {item.shortDescription}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="pt-2.5 mt-2 border-t border-[#d68d2b]/30 flex items-center justify-between text-[11px] text-[#d68d2b]">
                <span className="truncate max-w-[70%] font-medium">{item.materials}</span>
                <span className="text-[#1f6f8b] font-extrabold group-hover:underline shrink-0">
                  Ver foto →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
