import React, { useState } from 'react';
import { X, ArrowDown, Sparkles, Award } from 'lucide-react';
import { ProtectedImage } from './ProtectedImage';

interface WelcomeBannerProps {
  onExploreWorkshops: () => void;
  onShowProtectionNotice: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  onExploreWorkshops,
  onShowProtectionNotice
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsVisible(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#1f6f8b] bg-[#fffcf5] border border-[#d68d2b] rounded-lg hover:bg-[#f3e1a0] transition-colors shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d68d2b]" />
          <span>Mostrar banner de bienvenida</span>
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Banner de bienvenida Feria de Talleres 2026"
      className="relative mb-8 rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fff8eb] to-[#f9edd0] border-2 border-[#d68d2b] shadow-xl overflow-hidden transition-all"
    >
      {/* Botón de cierre "X" en la esquina superior */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 md:top-4 md:right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-[#962d16] text-[#962d16] hover:text-white border border-[#d68d2b]/60 transition-colors shadow-md cursor-pointer"
        title="Cerrar banner"
        aria-label="Cerrar banner de bienvenida"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 p-6 sm:p-8 md:p-10">
        {/* PARTE IZQUIERDA: Textos y Botón "Ver talleres" */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center text-left space-y-4 md:space-y-5 pr-0 lg:pr-4">
          {/* Badge institucional */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3e1a0]/70 border border-[#d68d2b] text-xs font-bold text-[#962d16] shadow-sm">
            <Award className="w-4 h-4 text-[#d68d2b]" />
            <span className="uppercase tracking-wider">Colegio Labarthe · Chiclayo</span>
          </div>

          {/* Título y subtítulo */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#962d16] tracking-tight font-display leading-[1.08]">
              Feria de Talleres 2026
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#1f6f8b]">
              Colegio Labarthe
            </p>
          </div>

          {/* Frase breve */}
          <p className="text-[#962d16]/90 text-sm sm:text-base md:text-lg font-medium max-w-xl leading-relaxed">
            Conoce los trabajos de nuestros estudiantes. Innovación técnica, creatividad y vocación de servicio en cada proyecto elaborado en nuestras aulas-taller.
          </p>

          {/* Datos rápidos de los talleres */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-[#962d16]">
            <span className="bg-white/80 px-2.5 py-1 rounded-md border border-[#d68d2b]/50">Ebanistería</span>
            <span className="bg-white/80 px-2.5 py-1 rounded-md border border-[#d68d2b]/50">Mecánica</span>
            <span className="bg-white/80 px-2.5 py-1 rounded-md border border-[#d68d2b]/50">Electricidad</span>
            <span className="bg-white/80 px-2.5 py-1 rounded-md border border-[#d68d2b]/50">Construcción Civil</span>
            <span className="bg-white/80 px-2.5 py-1 rounded-md border border-[#d68d2b]/50">Repostería</span>
          </div>

          {/* Botón principal "Ver talleres" */}
          <div className="pt-2 sm:pt-3">
            <button
              onClick={onExploreWorkshops}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#1f6f8b] hover:bg-[#18586f] active:bg-[#144759] text-white font-bold text-sm sm:text-base border-2 border-[#d68d2b] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Ver talleres</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-[#f3e1a0]" />
            </button>
          </div>
        </div>

        {/* PARTE DERECHA: Estudiantes con mandil azul y pulgares arriba */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <div className="relative w-full max-w-md rounded-2xl p-2 bg-white border-2 border-[#d68d2b] shadow-xl overflow-hidden group">
            {/* Contenedor de imagen optimizado para mostrar rostros sin recortes */}
            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-xl overflow-hidden bg-[#eef5f8] flex items-center justify-center">
              <ProtectedImage
                src="/assets/aistudio/image_7ff2e68e.png"
                alt="Estudiantes del Colegio Labarthe con mandil azul y pulgares arriba en la Feria de Talleres"
                aspectRatioClassName="w-full h-full"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
                watermarkText="Colegio Labarthe 2026"
                onProtectedNotice={onShowProtectionNotice}
              />

              {/* Sombra de protección sutil en el pie de la imagen */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pt-8 flex items-center justify-between text-white text-[11px] pointer-events-none z-10">
                <span className="font-bold text-[#f3e1a0] bg-[#962d16]/90 px-2 py-0.5 rounded border border-[#d68d2b]/50">
                  Estudiantes Labarthinos
                </span>
                <span className="font-semibold text-white/95">
                  Feria de Talleres 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
