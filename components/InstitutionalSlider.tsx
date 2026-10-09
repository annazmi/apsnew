"use client";

import { Children, ReactNode, TransitionEvent, useEffect, useRef, useState } from "react";

interface InstitutionalSliderProps {
  children: ReactNode;
}

export default function InstitutionalSlider({ children }: InstitutionalSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const cardCount = slides.length;
  const [currentIndex, setCurrentIndex] = useState(cardCount);
  const [stepWidth, setStepWidth] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [rebasedIndex, setRebasedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!cardCount) return;

    const track = trackRef.current;
    const measure = () => {
      if (!track || !track.firstElementChild) return;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      setStepWidth((track.firstElementChild as HTMLElement).offsetWidth + gap);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (track) resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, [cardCount]);

  useEffect(() => {
    if (!cardCount) return;

    const timer = window.setTimeout(() => {
      setRebasedIndex(null);
      setCurrentIndex((index) => index + 1);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [cardCount, currentIndex]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;

    if (currentIndex >= cardCount * 2) {
      setTransitionEnabled(false);
      setRebasedIndex(cardCount);
      setCurrentIndex(cardCount);
    } else if (currentIndex < cardCount) {
      setTransitionEnabled(false);
      setRebasedIndex(cardCount * 2 - 1);
      setCurrentIndex(cardCount * 2 - 1);
    }
  };

  useEffect(() => {
    if (transitionEnabled) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  const move = (direction: number) => {
    setRebasedIndex(null);
    setCurrentIndex((index) => index + direction);
  };

  return (
    <section id="institutional-section" className="institutional-section">
      <div className="institutional-container">
        <div className="institutional-header">
          <span className="section-tag animate-on-scroll">Trust &amp; Transparency</span>
          <h2 className="section-title animate-on-scroll">
            Institutional Standards<br />In All We Build
          </h2>
        </div>

        <div className="institutional-slider-wrapper">
          <div
            className={`institutional-track${transitionEnabled ? "" : " no-transition"}`}
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{ transform: `translateX(-${stepWidth * currentIndex}px)` }}
          >
            {[0, 1, 2].flatMap((copy) =>
              slides.map((slide, index) => (
                <div
                  className={[
                    "institutional-slide",
                    copy * cardCount + index === currentIndex ? "active" : "",
                    copy * cardCount + index === rebasedIndex ? "ring-rebased" : "",
                  ].filter(Boolean).join(" ")}
                  key={`${copy}-${index}`}
                >
                  {slide}
                </div>
              )),
            )}
          </div>
        </div>

        <div className="institutional-controls">
          <button className="inst-nav-btn" onClick={() => move(-1)} aria-label="Previous Slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="inst-nav-btn" onClick={() => move(1)} aria-label="Next Slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
