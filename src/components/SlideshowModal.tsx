import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, ShieldCheck, Check, Clock, Users, Layers, Award } from 'lucide-react';
import { EXHIBITION_ITEMS, ExhibitionItem } from '../data/fairData';
import { ProtectedImage } from './ProtectedImage';

interface SlideshowModalProps {
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onShowProtectionNotice: () => void;
}

// Gentle synthesised chime using Web Audio API
function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch {
    // blocked or unavailable
  }
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({
  initialIndex,
  isOpen,
  onClose,
  onShowProtectionNotice
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  // User requested faster transition: default to 3000ms (3s) instead of 6s, with toggle to 5000ms
  const [slideSpeed, setSlideSpeed] = useState<3000 | 5000>(3000);
  const [progress, setProgress] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [initialIndex, isOpen]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % EXHIBITION_ITEMS.length);
    setProgress(0);
    startTimeRef.current = Date.now();
    if (soundEnabled) playChime();
  }, [soundEnabled]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + EXHIBITION_ITEMS.length) % EXHIBITION_ITEMS.length);
    setProgress(0);
    startTimeRef.current = Date.now();
    if (soundEnabled) playChime();
  }, [soundEnabled]);

  // Smooth progress bar and slide advancement
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * slideSpeed;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / slideSpeed) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= slideSpeed) {
        nextSlide();
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, isPlaying, slideSpeed, nextSlide, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextSlide, prevSlide]);

  if (!isOpen) return null;

  const currentItem: ExhibitionItem = EXHIBITION_ITEMS[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#14323d]/98 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-5 md:p-8 select-none overflow-hidden"
      onContextMenu={(e) => {
        e.preventDefault();
        onShowProtectionNotice();
      }}
    >
      {/* Top Animated Progress Bar for Slide Transition */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1f6f8b]/40 overflow-hidden z-50">
        <div
          className="h-full bg-gradient-to-r from-[#d68d2b] to-[#f3e1a0] transition-all duration-75 ease-linear"
          style={{ width: isPlaying ? `${progress}%` : '0%' }}
        />
      </div>

      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between text-white border-b border-[#d68d2b]/30 pb-3 gap-2">
        {/* Info de Ficha y Taller */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-[#f3e1a0] bg-[#962d16] px-2.5 py-1 rounded-lg border border-[#d68d2b] shadow-sm">
            REF: {currentItem.code}
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            {currentItem.workshopLabel}
          </span>
          <span className="hidden sm:inline text-white/40">·</span>
          <span className="text-xs text-[#f3e1a0]/90 font-medium">
            Ficha {currentIndex + 1} de {EXHIBITION_ITEMS.length}
          </span>
        </div>

        {/* Controles: Play/Pausa, Velocidad rápida (3s/5s), Sonido y Protección */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Botón Reproducir / Pausar */}
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f6f8b] hover:bg-[#18586f] text-xs font-semibold text-white border border-[#d68d2b]/60 transition-colors cursor-pointer shadow-sm"
            title={isPlaying ? 'Pausar presentación automática' : 'Reanudar presentación'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current text-[#f3e1a0]" />
                <span className="hidden xs:inline">Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-[#f3e1a0]" />
                <span className="hidden xs:inline">Reproducir</span>
              </>
            )}
          </button>

          {/* Selector de Velocidad rápida (3s / 5s) */}
          <button
            onClick={() => setSlideSpeed(s => s === 3000 ? 5000 : 3000)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1f6f8b]/90 hover:bg-[#18586f] text-xs font-bold text-[#f3e1a0] border border-[#d68d2b]/60 transition-colors cursor-pointer shadow-sm"
            title="Cambiar velocidad de transición de imágenes"
          >
            <Clock className="w-3.5 h-3.5 text-[#d68d2b]" />
            <span>{slideSpeed === 3000 ? 'Rápida (3s)' : 'Normal (5s)'}</span>
          </button>

          {/* Botón de Sonido */}
          <button
            onClick={() => setSoundEnabled(s => !s)}
            className="p-1.5 rounded-lg bg-[#1f6f8b] hover:bg-[#18586f] text-white border border-[#d68d2b]/60 transition-colors cursor-pointer shadow-sm"
            title={soundEnabled ? 'Silenciar campanada' : 'Activar campanada'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#f3e1a0]" /> : <VolumeX className="w-4 h-4 text-white/60" />}
          </button>

          {/* Badge de Protección */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#f3e1a0] px-2.5 py-1 rounded-lg bg-[#1f6f8b]/60 border border-[#d68d2b]/40 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f3e1a0]" />
            <span>Visualización Protegida</span>
          </div>

          {/* Botón de Cierre "X" */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-[#962d16] hover:bg-[#7a2411] text-white transition-colors cursor-pointer border border-[#d68d2b] shadow-sm ml-1"
            title="Cerrar presentación (Esc)"
            aria-label="Cerrar presentación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden relative">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-3 md:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-[#1f6f8b]/90 hover:bg-[#962d16] text-white backdrop-blur-md border border-[#d68d2b] transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          title="Ficha anterior (Flecha izquierda)"
          aria-label="Ficha anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Visual Layout: Imagen a la izquierda y Referencia Completa a la derecha */}
        <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 px-2 sm:px-4">
          {/* Main Protected Photo */}
          <div className="w-full lg:w-7/12 h-[42vh] sm:h-[48vh] lg:h-[70vh] rounded-2xl md:rounded-3xl overflow-hidden bg-black/40 border-2 border-[#d68d2b]/60 relative shadow-2xl flex items-center justify-center group">
            <ProtectedImage
              src={currentItem.imageSrc}
              alt={currentItem.title}
              aspectRatioClassName="w-full h-full"
              className="object-contain w-full h-full p-1"
              watermarkText="Colegio Labarthe · Protegida"
              onProtectedNotice={onShowProtectionNotice}
            />

            {/* Overlay sutil inferior con referencia y equipo */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs z-20 pointer-events-none">
              <span className="font-extrabold text-[#f3e1a0] bg-[#962d16]/95 px-2.5 py-1 rounded-md border border-[#d68d2b] shadow-md">
                CÓDIGO: {currentItem.code}
              </span>
              <span className="font-semibold text-[#f3e1a0] bg-[#14323d]/90 px-2.5 py-1 rounded-md border border-[#d68d2b]/40 drop-shadow">
                {currentItem.studentTeam}
              </span>
            </div>
          </div>

          {/* Columna de Información Completa de Referencias (Con scroll si es necesario) */}
          <div className="w-full lg:w-5/12 max-h-[44vh] lg:max-h-[70vh] overflow-y-auto pr-2 space-y-3.5 text-left text-white bg-[#122e38]/85 p-4 sm:p-5 md:p-6 rounded-2xl border-2 border-[#d68d2b]/50 shadow-2xl scrollbar-thin scrollbar-thumb-[#d68d2b] scrollbar-track-transparent">
            {/* Encabezado de Referencia */}
            <div className="flex items-center justify-between gap-2 border-b border-[#d68d2b]/30 pb-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#d68d2b] text-[#14323d] font-black uppercase tracking-wider text-[11px]">
                  {currentItem.category}
                </span>
                <span className="text-[#f3e1a0] font-bold">
                  {currentItem.workshopLabel}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#f3e1a0]/90 bg-[#962d16] px-2 py-0.5 rounded border border-[#d68d2b]/60">
                Ficha {currentItem.code}
              </span>
            </div>

            {/* Título y Subtítulo de la Referencia */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#f3e1a0] tracking-tight font-display leading-tight">
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                {currentItem.subtitle}
              </p>
            </div>

            {/* Delegación Estudiantil */}
            <div className="flex items-center gap-2 text-xs text-[#f3e1a0] bg-[#1f6f8b]/40 px-3 py-1.5 rounded-lg border border-[#d68d2b]/40">
              <Users className="w-4 h-4 text-[#d68d2b] shrink-0" />
              <span>
                <strong className="text-white">Equipo expositor:</strong> {currentItem.studentTeam}
              </span>
            </div>

            {/* Descripción Técnica de la Referencia */}
            <div className="space-y-1 text-xs text-white/95 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/10">
              <p className="font-semibold text-[#f3e1a0]">Descripción del Trabajo:</p>
              <p>{currentItem.shortDescription}</p>
            </div>

            {/* Cuadro de Materiales Empleados */}
            <div className="p-3 rounded-xl bg-[#1f6f8b]/40 border border-[#d68d2b]/50 text-xs space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f3e1a0] uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#d68d2b]" />
                <span>Materiales Empleados:</span>
              </div>
              <p className="text-white text-xs leading-relaxed">
                {currentItem.materials}
              </p>
            </div>

            {/* Especificaciones Técnicas y Acabados */}
            <div className="space-y-2 pt-2 border-t border-[#d68d2b]/30">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#f3e1a0]">
                <span>Especificaciones Técnicas:</span>
                <span className="text-[#d68d2b] text-[10px]">{currentItem.date}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-white/95">
                {currentItem.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 bg-white/5 p-1.5 rounded-lg">
                    <Check className="w-3.5 h-3.5 text-[#d68d2b] shrink-0 mt-0.5 font-bold" />
                    <span className="leading-tight">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-3 md:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-[#1f6f8b]/90 hover:bg-[#962d16] text-white backdrop-blur-md border border-[#d68d2b] transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          title="Siguiente ficha (Flecha derecha)"
          aria-label="Siguiente ficha"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip con acceso directo a las 10 referencias */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 pt-2 sm:pt-3 border-t border-[#d68d2b]/30 overflow-x-auto px-2">
        {EXHIBITION_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentIndex(idx);
              setProgress(0);
              startTimeRef.current = Date.now();
            }}
            className={`w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer relative ${
              currentIndex === idx
                ? 'border-[#f3e1a0] ring-2 ring-[#d68d2b] scale-105 shadow-lg'
                : 'border-white/20 opacity-60 hover:opacity-100'
            }`}
            title={`${item.code}: ${item.title}`}
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover pointer-events-none"
            />
            <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] font-mono text-[#f3e1a0] text-center font-bold">
              {item.code}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
