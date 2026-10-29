import React, { useState } from 'react';
import { Sparkles, Wrench, Cake, Hammer, Zap, HardHat, ShieldCheck } from 'lucide-react';
import { EXHIBITION_ITEMS, ExhibitionItem, WorkshopType } from '../data/fairData';
import { ProtectedImage } from './ProtectedImage';

interface ExhibitionCardsGridProps {
  onSelectItem: (item: ExhibitionItem) => void;
  onOpenSlideshowAt: (index: number) => void;
  onShowProtectionNotice: () => void;
}

export const ExhibitionCardsGrid: React.FC<ExhibitionCardsGridProps> = ({
  onSelectItem,
  onShowProtectionNotice
}) => {
  const [activeWorkshop, setActiveWorkshop] = useState<WorkshopType>('todos');

  const filteredItems = activeWorkshop === 'todos'
    ? EXHIBITION_ITEMS
    : EXHIBITION_ITEMS.filter(item => item.workshop === activeWorkshop);

  return (
    <section id="catalogo-talleres" className="space-y-6 scroll-mt-24">
      {/* Catalog Header Banner on warm background with Ocre (#d68d2b) border */}
      <div className="relative overflow-hidden rounded-2xl bg-[#fff8ea] border-2 border-[#d68d2b] p-5 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 p-1.5 rounded-2xl bg-white border-2 border-[#d68d2b] flex items-center justify-center shadow-md">
            <img
              src="/assets/aistudio/image_b4056e1a.png"
              alt="Insignia I.E.P. Labarthe"
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#d68d2b] font-extrabold">
              <span>Colegio Pedro A. Labarthe</span>
              <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
              <span>Chiclayo</span>
              <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
              <span>Edición Feria 2026</span>
              <span aria-hidden="true" className="text-[#d68d2b]/60">·</span>
              <span>Catálogo Oficial de Proyectos</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#962d16] font-display">
              Catálogo de Proyectos por Taller
            </h1>

            <p className="text-[#962d16]/90 text-xs md:text-sm leading-relaxed max-w-3xl font-medium">
              Muestra técnica de los artículos elaborados en <strong className="text-[#962d16] font-extrabold">Ebanistería</strong>,
              <strong className="text-[#962d16] font-extrabold"> Mecánica Automotriz</strong>, <strong className="text-[#962d16] font-extrabold">Electricidad</strong>,
              <strong className="text-[#962d16] font-extrabold"> Construcción Civil</strong> y <strong className="text-[#962d16] font-extrabold">Repostería</strong>. Selecciona un taller
              para filtrar o visualiza el catálogo completo.
            </p>
          </div>
        </div>

        {/* Workshop Filter Tabs & Social/Protection Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex flex-wrap p-1 bg-[#f3e1a0] rounded-xl border-2 border-[#d68d2b] gap-1 shadow-inner">
            <button
              onClick={() => setActiveWorkshop('todos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkshop === 'todos'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Todos ({EXHIBITION_ITEMS.length})</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('ebanisteria')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkshop === 'ebanisteria'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>Ebanistería (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('mecanica')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkshop === 'mecanica'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Mecánica (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('electricidad')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkshop === 'electricidad'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Electricidad (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('construccion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkshop === 'construccion'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Construcción (2)</span>
            </button>
            <button
              onClick={() => setActiveWorkshop('reposteria')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkshop === 'reposteria'
                  ? 'bg-[#1f6f8b] text-white shadow-sm border border-[#144759]'
                  : 'text-[#962d16] hover:bg-[#e6d28c]'
              }`}
            >
              <Cake className="w-3.5 h-3.5" />
              <span>Repostería (2)</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#962d16] px-3 py-1.5 rounded-lg bg-[#fff8ea] border border-[#d68d2b] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#962d16]" />
              <span>Visualización protegida</span>
            </div>

            <a
              href="https://www.facebook.com/hashtag/I.E.PedroAbelLabartheDurand"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-white hover:bg-[#18586f] px-3 py-1.5 rounded-lg bg-[#1f6f8b] border border-[#d68d2b] transition-colors shadow-sm"
              title="Facebook #I.E.PedroAbelLabartheDurand"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#f3e1a0] shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
              <span className="text-[#f3e1a0] font-bold">#I.E.PedroAbelLabartheDurand</span>
            </a>
          </div>
        </div>
      </div>

      {/* Catalog Product Grid: 3 columns on desktop, 2 on mobile with warm palette cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group flex flex-col justify-between bg-[#fffcf5] hover:bg-white border-2 border-[#d68d2b]/60 hover:border-[#1f6f8b] rounded-2xl p-2.5 md:p-3.5 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Top Image: Square with subtle white frame */}
            <div>
              <div className="p-1 bg-white border border-[#d68d2b]/40 rounded-xl overflow-hidden shadow-xs relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-900">
                  <ProtectedImage
                    src={item.imageSrc}
                    alt={item.title}
                    aspectRatioClassName="w-full h-full aspect-square"
                    className="transition-transform duration-500 group-hover:scale-105"
                    watermarkText="Colegio Labarthe"
                    onProtectedNotice={onShowProtectionNotice}
                  />

                  {/* Gradient Scrim for subtle contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Reference Badge on image in Azul océano (#1f6f8b) */}
                  <span className="absolute top-2 left-2 z-20 font-mono text-[10px] md:text-[11px] font-bold text-white bg-[#1f6f8b]/95 backdrop-blur-sm px-2 py-0.5 rounded shadow border border-[#d68d2b]/50">
                    REF: {item.code}
                  </span>

                  {/* Workshop Pill on bottom of image in Rojo terracota (#962d16) */}
                  <span className="absolute bottom-2 left-2 z-20 text-[10px] font-bold text-[#f3e1a0] bg-[#962d16]/95 backdrop-blur-md px-2 py-0.5 rounded border border-[#d68d2b]/50">
                    {item.workshopLabel}
                  </span>
                </div>
              </div>

              {/* Information Underneath the Image in Texto Principal (#962d16) and Ocre (#d68d2b) */}
              <div className="pt-2.5 space-y-1">
                {/* Secondary Data: Ocre (#d68d2b) */}
                <div className="flex items-center justify-between text-[11px] text-[#d68d2b] font-bold">
                  <span className="truncate">{item.category}</span>
                  <span className="text-[#962d16]/70 font-semibold text-[10px] truncate ml-1">{item.studentTeam}</span>
                </div>

                {/* Title in bold Rojo terracota (#962d16) */}
                <h3 className="font-bold text-[#962d16] text-sm md:text-base leading-snug line-clamp-1 group-hover:text-[#1f6f8b] transition-colors">
                  {item.title}
                </h3>

                {/* Description below in two lines maximum */}
                <p className="text-xs text-[#962d16]/85 line-clamp-2 leading-relaxed font-medium">
                  {item.shortDescription}
                </p>
              </div>
            </div>

            {/* Bottom Materials Strip and Action */}
            <div className="pt-2.5 mt-2 border-t border-[#d68d2b]/30 flex items-center justify-between text-[11px] text-[#d68d2b]">
              <span className="truncate max-w-[68%] font-medium" title={item.materials}>
                {item.materials}
              </span>
              <span className="text-[#1f6f8b] font-extrabold group-hover:underline shrink-0">
                Ver ficha →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
