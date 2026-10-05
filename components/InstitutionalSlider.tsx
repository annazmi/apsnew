"use client";

import { ReactNode, useEffect, useRef, useState, useCallback } from "react";

interface InstitutionalSliderProps {
  children: ReactNode;
}

export default function InstitutionalSlider({ children }: InstitutionalSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardCount, setCardCount] = useState(0);

  const updateSlider = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const cardWidth = cards[0].offsetWidth + gap;
    
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      setCardCount(track.children.length);
      updateSlider(currentIndex);

      const resizeObserver = new ResizeObserver(() => updateSlider(currentIndex));
      resizeObserver.observe(track);
      return () => resizeObserver.disconnect();
    }
  }, [currentIndex, updateSlider]);

  const handlePrevious = () => {
    if (cardCount === 0) return;
    setCurrentIndex((prev) => (prev - 1 + cardCount) % cardCount);
  };

  const handleNext = () => {
    if (cardCount === 0) return;
    setCurrentIndex((prev) => (prev + 1) % cardCount);
  };

  return (
    <section id="institutional-section" className="institutional-section">
      <div className="institutional-container">
        <div className="institutional-header">
          <span className="section-tag animate-on-scroll">Trust & Transparency</span>
          <h2 className="section-title animate-on-scroll">Institutional Standards<br />In All We Build</h2>
        </div>

        <div className="institutional-slider-wrapper">
          <div className="institutional-track" ref={trackRef}>
            {/* Cards are passed as children, but we expect them to be inside the track in page.tsx */}
            {/* Actually, let's refactor page.tsx to pass cards as children properly or move them here */}
            {children}
          </div>
        </div>

        <div className="institutional-controls">
          <button className="inst-nav-btn" onClick={handlePrevious} aria-label="Previous Slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="inst-nav-btn" onClick={handleNext} aria-label="Next Slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}