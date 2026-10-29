import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { ExhibitionCardsGrid } from './components/ExhibitionCardsGrid';
import { PhotoAlbumView } from './components/PhotoAlbumView';
import { SlideshowModal } from './components/SlideshowModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExhibitionItem } from './data/fairData';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'laminas' | 'album'>('laminas');
  const [selectedItem, setSelectedItem] = useState<ExhibitionItem | null>(null);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [slideshowStartIndex, setSlideshowStartIndex] = useState(0);
  const [showProtectionToast, setShowProtectionToast] = useState(false);

  const handleOpenSlideshowAt = (index: number) => {
    setSlideshowStartIndex(index);
    setSlideshowOpen(true);
  };

  const triggerProtectionNotice = () => {
    setShowProtectionToast(true);
  };

  const handleExploreWorkshops = () => {
    setActiveTab('laminas');
    setTimeout(() => {
      const el = document.getElementById('catalogo-talleres');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  // Auto-hide protection toast after 4 seconds
  useEffect(() => {
    if (!showProtectionToast) return;
    const t = setTimeout(() => setShowProtectionToast(false), 4000);
    return () => clearTimeout(t);
  }, [showProtectionToast]);

  // Global protection: prevent right-clicking on all images
  useEffect(() => {
    const handleGlobalContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.closest('img') || target.closest('[data-protected="true"]'))) {
        e.preventDefault();
        triggerProtectionNotice();
      }
    };

    window.addEventListener('contextmenu', handleGlobalContextMenu);
    return () => window.removeEventListener('contextmenu', handleGlobalContextMenu);
  }, []);

  return (
    <div className="min-h-screen bg-[#f3e1a0] text-[#962d16] flex flex-col font-sans selection:bg-[#1f6f8b] selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSlideshow={() => handleOpenSlideshowAt(0)}
      />

      {/* Main Content Area on Fondo Beige Arena (#f3e1a0) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-6 pb-12">
        {/* Welcome Hero Banner with students photo on the right */}
        <WelcomeBanner
          onExploreWorkshops={handleExploreWorkshops}
          onShowProtectionNotice={triggerProtectionNotice}
        />

        {activeTab === 'laminas' && (
          <ExhibitionCardsGrid
            onSelectItem={setSelectedItem}
            onOpenSlideshowAt={handleOpenSlideshowAt}
            onShowProtectionNotice={triggerProtectionNotice}
          />
        )}

        {activeTab === 'album' && (
          <PhotoAlbumView
            onSelectItem={setSelectedItem}
            onOpenSlideshowAt={handleOpenSlideshowAt}
            onShowProtectionNotice={triggerProtectionNotice}
          />
        )}
      </main>

      {/* Footer in Azul océano (#1f6f8b) con ribete Ocre (#d68d2b) */}
      <footer className="bg-[#1f6f8b] text-white border-t-2 border-[#d68d2b] py-6 px-4 md:px-8 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl p-1 bg-white/10 border-2 border-[#d68d2b] flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/assets/aistudio/image_b4056e1a.png"
                alt="Insignia Colegio Labarthe"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm tracking-wide">
                I.E.P. Pedro A. Labarthe · Chiclayo
              </p>
              <p className="text-[#f3e1a0] text-[11px] font-medium">
                Feria de Talleres de Producción Escolar · "Entra y Aprende, Sal a Servir"
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[#f3e1a0] text-xs font-semibold">
            <span className="font-extrabold text-white bg-[#144759] px-2.5 py-1 rounded-md border border-[#d68d2b]">
              5 Talleres Técnicos
            </span>
            <span>·</span>
            <span>10 Proyectos en Catálogo</span>
            <span>·</span>
            <a
              href="https://www.facebook.com/hashtag/I.E.PedroAbelLabartheDurand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#144759] hover:bg-[#18586f] text-white border border-[#d68d2b] transition-colors"
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
      </footer>

      {/* Modals */}
      <SlideshowModal
        isOpen={slideshowOpen}
        initialIndex={slideshowStartIndex}
        onClose={() => setSlideshowOpen(false)}
        onShowProtectionNotice={triggerProtectionNotice}
      />

      <ProjectDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onShowProtectionNotice={triggerProtectionNotice}
      />

      {/* Floating Institutional Protection Toast with Rojo terracota (#962d16) styling */}
      {showProtectionToast && (
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-[#fff8eb] border-2 border-[#962d16] text-[#962d16] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#962d16]/10 border border-[#962d16]/30 flex items-center justify-center shrink-0 text-[#962d16]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#962d16]">
                Aviso: Visualización Protegida Institucional
              </p>
              <p className="text-xs text-[#962d16]/90 leading-relaxed font-medium">
                Por disposición institucional del Colegio Labarthe, las fotografías de los proyectos escolares son de visualización exclusiva y no admiten descargas.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
