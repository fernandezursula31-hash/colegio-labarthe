import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClassName?: string;
  watermarkText?: string;
  onProtectedNotice?: () => void;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClassName = 'aspect-[4/3]',
  watermarkText = 'Colegio Labarthe · Visualización Protegida',
  onProtectedNotice,
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onProtectedNotice) {
      onProtectedNotice();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`relative select-none overflow-hidden ${aspectRatioClassName}`}
      style={{
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {/* Protected Image element */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        draggable={false}
        onDragStart={handleDragStart}
        onContextMenu={handleContextMenu}
        className={`w-full h-full object-cover pointer-events-none select-none ${className}`}
      />

      {/* Transparent Protective Shield that captures clicks but blocks native image save gestures */}
      <div
        onContextMenu={handleContextMenu}
        className="absolute inset-0 bg-transparent cursor-pointer z-10"
      />

      {/* Discrete Protection Watermark */}
      <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300">
        <ShieldAlert className="w-3 h-3 text-blue-400" />
        <span>{watermarkText}</span>
      </div>
    </div>
  );
};
