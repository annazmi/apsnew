"use client";

import { type CSSProperties, type TransitionEvent, useEffect, useState } from "react";

const testimonials = [
  {
    initials: "LF",
    name: "Larry Fink",
    role: "Founder, Chairman & CEO",
    quote:
      "We believe the next generation for markets, the next generation for securities, will be tokenization of securities...",
  },
  {
    initials: "JD",
    name: "Jane Doe",
    role: "Head of DeFi Strategy",
    quote:
      "Tokenizing real-world assets opens up unprecedented liquidity channels and institutional-grade security across multiple chains seamlessly.",
  },
  {
    initials: "AR",
    name: "Alex Rivera",
    role: "Chief Technology Officer",
    quote:
      "The robust architecture provided by ZYQXA allows us to deploy smart contracts faster and with absolute compliance confidence.",
  },
  {
    initials: "AM",
    name: "Amzah Moelah",
    role: "Lead Digital Asset Intrapreneur",
    quote:
      "ZYQXA is exploring how to issue various tokenized assets such as bonds, real estate and investment funds. Having purpose-built infrastructure, built by ZYQXA, to facilitate the omnichain issuance and distribution of these assets, has the potential to be highly relevant for traditional financial institutions.",
    companyLogo: "/Kemenku.svg",
  },
];

const cardCount = testimonials.length;

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(cardCount);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => index + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (transitionEnabled) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;

    if (currentIndex >= cardCount * 2) {
      setTransitionEnabled(false);
      setCurrentIndex(cardCount);
    }
  };

  return (
    <section className="testimonial-section" aria-label="Testimonials">
      <div className="testimonial-container">
        <div
          className={`testimonial-track${transitionEnabled ? "" : " no-transition"}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ "--testimonial-index": currentIndex } as CSSProperties}
        >
          {[0, 1, 2].map((copy) => (
            <div
              className="testimonial-group"
              aria-hidden={copy !== 1 || undefined}
              key={copy}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  className={`testimonial-slot${currentIndex === copy * cardCount + index ? " active" : ""}`}
                  key={`${copy}-${testimonial.name}`}
                >
                  <article className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="profile-info-group">
                        <div className="testimonial-avatar" aria-hidden="true">
                          {testimonial.initials}
                        </div>
                        <div className="profile-text">
                          <h3 className="testimonial-name">{testimonial.name}</h3>
                          <p className="testimonial-role">{testimonial.role}</p>
                        </div>
                      </div>
                      {testimonial.companyLogo && (
                        <div className="testimonial-company-logo">
                          <img src={testimonial.companyLogo} alt="Kemenkeu" />
                        </div>
                      )}
                    </div>
                    <blockquote className="testimonial-quote">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                  </article>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
