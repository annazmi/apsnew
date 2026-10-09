"use client";

import { TransitionEvent, useEffect, useRef, useState } from 'react';
import Footer from '@/components/layout/Footer';
import InstitutionalSlider from '@/components/InstitutionalSlider';
import GlobeSection from '@/components/sections/GlobeSection';
import Header from '@/components/sections/Header';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';

export default function ZYQXAProtocolPage() {
  const [activeProtocolTab, setActiveProtocolTab] = useState<'idry' | 'zidr'>('idry');
  const [activeInsightTab, setActiveInsightTab] = useState<'intelligence' | 'research'>('intelligence');
  const [nexusIndex, setNexusIndex] = useState(5);
  const [nexusStepWidth, setNexusStepWidth] = useState(0);
  const [nexusTransitionEnabled, setNexusTransitionEnabled] = useState(true);
  const bridgeSectionRef = useRef<HTMLElement>(null);
  const nexusTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => revealObserver.observe(element));

    const bridgeSection = bridgeSectionRef.current;
    let bridgeObserver: IntersectionObserver | undefined;
    if (bridgeSection) {
      bridgeObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          bridgeSection.classList.add('animate-active');
          bridgeObserver?.unobserve(bridgeSection);
        }
      }, { threshold: 0.3 });
      bridgeObserver.observe(bridgeSection);
    }

    return () => {
      revealObserver.disconnect();
      bridgeObserver?.disconnect();
    };
  }, []);

  // Nexus Slider Logic
  useEffect(() => {
    const track = nexusTrackRef.current;
    if (!track) return;

    const measure = () => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      setNexusStepWidth(firstCard.offsetWidth + gap);
    };

    const initialMeasure = window.requestAnimationFrame(measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    return () => {
      window.cancelAnimationFrame(initialMeasure);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNexusIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNexusTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    if (nexusIndex >= 10) {
      setNexusTransitionEnabled(false);
      setNexusIndex(5);
    } else if (nexusIndex < 5) {
      setNexusTransitionEnabled(false);
      setNexusIndex(9);
    }
  };

  useEffect(() => {
    if (nexusTransitionEnabled) return;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setNexusTransitionEnabled(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [nexusTransitionEnabled]);

  const selectNexusCard = (cardIndex: number) => {
    const candidates = [cardIndex, cardIndex + 5, cardIndex + 10];
    const nearestIndex = candidates.reduce((nearest, candidate) =>
      Math.abs(candidate - nexusIndex) < Math.abs(nearest - nexusIndex) ? candidate : nearest,
    );
    setNexusIndex(nearestIndex);
  };


  return (
    <>
      <div id="toast"></div>

      <Header />
      <main>
        <section id="hero" className="zyqxa-landing-hero">
          <div className="zyqxa-landing-hero-overlay" />

          <div className="zyqxa-landing-hero-inner">
            <div className="zyqxa-landing-copy">
              <h1 className="zyqxa-landing-title">
                Structured SBN Tokenization.
                <br />
                <span className="zyqxa-landing-title-accent">
                  Unlocking Global Liquidity with T+0 Instant Settlement.
                </span>
              </h1>
            </div>
          </div>

          <div className="zyqxa-landing-brand-row" aria-label="Partner brands">
            <div className="zyqxa-landing-brand-track">
              <div className="zyqxa-landing-brand-group">
                <div className="zyqxa-landing-brand-item">
                  <img src="/Chainlink.svg" alt="Chainlink" />
                </div>
                <div className="zyqxa-landing-brand-item">
                  <img src="/USDC.svg" alt="USDC" />
                </div>
                <div className="zyqxa-landing-brand-item">
                  <img src="/Kemenku.svg" alt="Kemenkeu" />
                </div>
                <div className="zyqxa-landing-brand-item">
                  <img src="/Base.svg" alt="Base" />
                </div>
              </div>
              <div className="zyqxa-landing-brand-group" aria-hidden="true">
                <div className="zyqxa-landing-brand-item">
                  <img src="/Chainlink.svg" alt="" />
                </div>
                <div className="zyqxa-landing-brand-item">
                  <img src="/USDC.svg" alt="" />
                </div>
                <div className="zyqxa-landing-brand-item">
                  <img src="/Kemenku.svg" alt="" />
                </div>
                <div className="zyqxa-landing-brand-item">
                  <img src="/Base.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          </section>

        <section id="protocol-section" className="zyqxa-protocol-section">
        <div className="protocol-container">
          {/* Subtitle kecil */}
          <span className="protocol-subtitle">Our Protocol</span>
          
          <div className="animate-on-scroll">
            {/* Judul Utama */}
            <h2 className="protocol-title">
              Secure Access<br />
              <span className="protocol-title-muted">To Onchain Assets.</span>
            </h2>
            
            {/* Deskripsi singkat */}
            <p className="protocol-desc">
              Connecting traditional sovereign instruments directly to decentralized finance.
            </p>
          </div>

                {/* Tombol Tab Pilihan */}
          <div className="protocol-tabs">
            <button 
              className={`tab-btn ${activeProtocolTab === 'idry' ? 'active' : ''}`} 
              onClick={() => setActiveProtocolTab('idry')}
            >
              IDRY
            </button>
            <button 
              className={`tab-btn ${activeProtocolTab === 'zidr' ? 'active' : ''}`} 
              onClick={() => setActiveProtocolTab('zidr')}
            >
              ZIDR
            </button>
          </div>
        </div>

        <div className="protocol-wrapper">
          {/* KARTU KONTEN 1: KHUSUS IDRY */}
          <div id="idry-card" className={`zyqxa-protocol-card-wrapper protocol-content-panel ${activeProtocolTab === 'idry' ? 'active-panel' : ''}`}>

            <div className="protocol-main-card">
              
              {/* KOTAK PEMBUNGKUS UTAMA */}
              <div className="protocol-info-box">
                {/* 1. Logo di Atas */}
                <div className="protocol-icon-box">
                  <img src="/IDRY.svg" alt="IDRY Logo" className="main-protocol-logo" />
                </div>
                
                {/* 2. Judul IDRY */}
                <h3 className="card-product-title">IDRY</h3>
                
                {/* 3. Deskripsi */}
                <p className="card-product-desc">
                  &quot;A tokenized gateway to Indonesian Sovereign Bonds (SBN). Experience institutional-grade security and steady yield, fully accessible on-chain with real-time settlement.&quot;
                </p>

                {/* 4. Badge/Keterangan di Bawah Deskripsi */}
                <div className="card-badge-wrapper">
                  <span className="card-badge">Liquid DeFi</span>
                </div>

                {/* 5. Deretan Logo SVG Blockchain */}
                <div className="protocol-chain-logos">
                  <div className="crypto-icon-circle eth-bg">
                    <img src="/ethereumLG.svg" alt="Ethereum" className="chain-logo-img" />
                  </div>
                  <div className="crypto-icon-circle base-bg">
                    <img src="/BaseLG.svg" alt="Base" className="chain-logo-img" />
                  </div>
                  <div className="crypto-icon-circle polygon-bg">
                    <img src="/PolygonLG.svg" alt="Polygon" className="chain-logo-img" />
                  </div>
                  <div className="crypto-icon-circle arbitrum-bg">
                    <img src="/ArbitrumLG.svg" alt="Arbitrum" className="chain-logo-img" />
                  </div>
                </div>
              </div>
              {/* BATAS AKHIR KOTAK TEKS */}

              <a href="https://docs.zyqxa.id" className="discover-btn">Discover IDRY</a>

              <div className="protocol-metrics-grid">
                <div className="metric-card">
                  <span className="metric-label">Current TVL</span>
                  <h4 className="metric-value">$2.19B</h4>
                  
                  {/* GRAFIK TITIK-TITIK KOTAK BIRU BARU */}
                  <div className="custom-scatter-chart">
                    {/* Kotak Tooltip Angka di Pojok Kanan Atas */}
                    <div className="chart-tooltip-box">$2.19B</div>

                    {/* 11 Garis Putus-putus Horizontal di Latar Belakang */}
                    <div className="chart-grid-lines">
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                    </div>

                    {/* 18 Titik Kotak Biru dengan Posisi Presisi */}
                    <div className="chart-dots-container">
                      <div className="scatter-dot dot-1"></div>
                      <div className="scatter-dot dot-2"></div>
                      <div className="scatter-dot dot-3"></div>
                      <div className="scatter-dot dot-4"></div>
                      <div className="scatter-dot dot-5"></div>
                      <div className="scatter-dot dot-6"></div>
                      <div className="scatter-dot dot-7"></div>
                      <div className="scatter-dot dot-8"></div>
                      <div className="scatter-dot dot-9"></div>
                      <div className="scatter-dot dot-10"></div>
                      <div className="scatter-dot dot-11"></div>
                      <div className="scatter-dot dot-12"></div>
                      <div className="scatter-dot dot-13"></div>
                      <div className="scatter-dot dot-14"></div>
                      <div className="scatter-dot dot-15"></div>
                      <div className="scatter-dot dot-16"></div>
                      <div className="scatter-dot dot-17"></div>
                      <div className="scatter-dot dot-18"></div>
                    </div>
                  </div>
                </div>

                {/* 2. KARTU APY */}
                <div className="metric-card">
                  <span className="metric-label">APY</span>
                  <h4 className="metric-value">3.55%</h4>

                  <div className="custom-line-chart">
                    <div className="chart-tooltip-box top-tooltip">$103.7K</div>

                    <div className="chart-grid-lines">
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                    </div>

                    <svg className="chart-svg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path className="line-secondary" d="M 0,85 L 100,55" />
                      <path className="line-primary" d="M 0,85 L 100,30" />
                    </svg>

                    <div className="chart-tooltip-box bottom-tooltip">$102.6K</div>
                  </div>

                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color-box primary-box"></span>
                      <span className="legend-text">USDY&apos;s Return</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color-box secondary-box"></span>
                      <span className="legend-text">US Treasury Bill&apos;s Return</span>
                    </div>
                  </div>
                </div>
                {/* 3. KARTU PRICE */}
                <div className="metric-card">
                  <span className="metric-label">Price</span>
                  <h4 className="metric-value">$1.1443</h4>

                  <div className="custom-bar-chart">
                    <div className="bar-item bar-1"></div>
                    <div className="bar-item bar-2"></div>
                    <div className="bar-item bar-3"></div>
                    <div className="bar-item bar-4"></div>
                    <div className="bar-item bar-5"></div>
                    <div className="bar-item bar-6"></div>
                    <div className="bar-item bar-7"></div>
                    <div className="bar-item bar-8"></div>
                    <div className="bar-item bar-9"></div>
                    <div className="bar-item bar-10"></div>
                    <div className="bar-item bar-11"></div>
                    <div className="bar-item bar-12"></div>
                    <div className="bar-item bar-13"></div>
                    <div className="bar-item bar-14"></div>
                    <div className="bar-item bar-15"></div>
                    <div className="bar-item bar-16"></div>
                    <div className="bar-item bar-17"></div>
                    <div className="bar-item bar-18"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KARTU KONTEN 2: KHUSUS ZIDR */}
          <div id="zidr-card" className={`zyqxa-protocol-card-wrapper protocol-content-panel ${activeProtocolTab === 'zidr' ? 'active-panel' : ''}`}>

            <div className="protocol-main-card">
              
              {/* KOTAK PEMBUNGKUS ZIDR */}
              <div className="protocol-info-box">
                {/* 1. Logo di Atas */}
                <div className="protocol-icon-box">
                  <img src="/ZIDR.svg" alt="ZIDR Logo" className="main-protocol-logo" />
                </div>
                
                {/* 2. Judul ZIDR */}
                <h3 className="card-product-title">ZIDR</h3>
                
                {/* 3. Deskripsi */}
                <p className="card-product-desc">
                  &quot;ZIDR serves as the institutional liquidity backbone, providing streamlined, on-chain access to short-term sovereign instruments with real-time settlement and capital efficiency.&quot;
                </p>

                <div className="card-badge-wrapper card-badge-placeholder" aria-hidden="true" />
                
                {/* 5. Deretan Logo SVG Blockchain */}
                <div className="protocol-chain-logos">
                  <div className="crypto-icon-circle eth-bg">
                    <img src="/ethereumLG.svg" alt="Ethereum" className="chain-logo-img" />
                  </div>
                  <div className="crypto-icon-circle base-bg">
                    <img src="/BaseLG.svg" alt="Base" className="chain-logo-img" />
                  </div>
                  <div className="crypto-icon-circle polygon-bg">
                    <img src="/PolygonLG.svg" alt="Polygon" className="chain-logo-img" />
                  </div>
                  <div className="crypto-icon-circle arbitrum-bg">
                    <img src="/ArbitrumLG.svg" alt="Arbitrum" className="chain-logo-img" />
                  </div>
                </div>
              </div>
              {/* BATAS AKHIR KOTAK TEKS */}

              <a href="https://docs.zyqxa.id" className="discover-btn">Discover ZIDR</a>

              <div className="protocol-metrics-grid">
                
                {/* 1. KARTU TVL (GRAFIK TITIK / SCATTER HIJAU) */}
                <div className="metric-card">
                  <span className="metric-label">Current TVL</span>
                  <h4 className="metric-value">$366.93M</h4>
                  
                  <div className="custom-scatter-chart">
                    <div className="chart-tooltip-box green-tooltip">$366.93M</div>

                    <div className="chart-grid-lines">
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                    </div>

                    <div className="chart-dots-container">
                      <div className="scatter-dot green-dot dot-1"></div>
                      <div className="scatter-dot green-dot dot-2"></div>
                      <div className="scatter-dot green-dot dot-3"></div>
                      <div className="scatter-dot green-dot dot-4"></div>
                      <div className="scatter-dot green-dot dot-5"></div>
                      <div className="scatter-dot green-dot dot-6"></div>
                      <div className="scatter-dot green-dot dot-7"></div>
                      <div className="scatter-dot green-dot dot-8"></div>
                      <div className="scatter-dot green-dot dot-9"></div>
                      <div className="scatter-dot green-dot dot-10"></div>
                      <div className="scatter-dot green-dot dot-11"></div>
                      <div className="scatter-dot green-dot dot-12"></div>
                      <div className="scatter-dot green-dot dot-13"></div>
                      <div className="scatter-dot green-dot dot-14"></div>
                      <div className="scatter-dot green-dot dot-15"></div>
                      <div className="scatter-dot green-dot dot-16"></div>
                      <div className="scatter-dot green-dot dot-17"></div>
                    </div>
                  </div>
                </div>

                {/* 2. KARTU APY (GRAFIK GARIS HIJAU) */}
                <div className="metric-card">
                  <span className="metric-label">APY¹</span>
                  <h4 className="metric-value">3.46%</h4>
                  
                  <div className="custom-line-chart">
                    <div className="chart-tooltip-box top-tooltip">$103.5K</div>

                    <div className="chart-grid-lines">
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                    </div>

                    <svg className="chart-svg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path className="line-secondary" d="M 0,85 L 100,55" />
                      <path className="line-primary green-line-path" d="M 0,85 L 100,30" />
                    </svg>

                    <div className="chart-tooltip-box bottom-tooltip">$102.6K</div>
                  </div>

                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color-box primary-box green-box"></span>
                      <span className="legend-text">ZIDR&apos;s Return</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color-box secondary-box"></span>
                      <span className="legend-text">US Treasury Bill&apos;s Return</span>
                    </div>
                  </div>

                </div>

                {/* 3. KARTU PRICE (GRAFIK BATANG VERTIKAL HIJAU 18 BUAH) */}
                <div className="metric-card">
                  <span className="metric-label">Price</span>
                  <h4 className="metric-value">$116.3015</h4>
                  <p className="metric-subtext green-text metric-stat">+$0.0150 today</p>
                  
                  <div className="custom-bar-chart">
                    <div className="bar-item green-bar bar-1"></div>
                    <div className="bar-item green-bar bar-2"></div>
                    <div className="bar-item green-bar bar-3"></div>
                    <div className="bar-item green-bar bar-4"></div>
                    <div className="bar-item green-bar bar-5"></div>
                    <div className="bar-item green-bar bar-6"></div>
                    <div className="bar-item green-bar bar-7"></div>
                    <div className="bar-item green-bar bar-8"></div>
                    <div className="bar-item green-bar bar-9"></div>
                    <div className="bar-item green-bar bar-10"></div>
                    <div className="bar-item green-bar bar-11"></div>
                    <div className="bar-item green-bar bar-12"></div>
                    <div className="bar-item green-bar bar-13"></div>
                    <div className="bar-item green-bar bar-14"></div>
                    <div className="bar-item green-bar bar-15"></div>
                    <div className="bar-item green-bar bar-16"></div>
                    <div className="bar-item green-bar bar-17"></div>
                    <div className="bar-item green-bar bar-18"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        
      <section id="foundation-section" className="foundation-section">
        {/* Kolom Kiri: Teks Pengantar */}
        <div className="foundation-text">
          <h2>ZYQXA is engineering the institutional bridge <span className="sub-text">for sovereign asset tokenization.</span></h2>
        </div>

        {/* Kolom Kanan: Baris Metrik dengan Garis Bawah */}
        <div className="metrics-column">
          <div className="zyq-metric-row">
            <div className="zyq-metric-value">12</div>
            <div className="zyq-metric-label">Supported<br />Chains</div>
          </div>
          
          <div className="zyq-metric-row">
            <div className="zyq-metric-value">171</div>
            <div className="zyq-metric-label">Integrated<br />Projects</div>
          </div>
          
          <div className="zyq-metric-row">
            <div className="zyq-metric-value">$3,53B</div>
            <div className="zyq-metric-label">TVL</div>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <GlobeSection />

      {/* ========================================== */}
      {/* SECTION: INSTITUTIONAL GRADE (ZYQXA) */}
      {/* ========================================== */}
      <InstitutionalSlider>
        {/* Card 01 */}
        <div className="inst-card">
          <div className="card-top-row">
            <div className="card-number-wrapper">
              <svg className="progress-ring" width="44" height="44">
                <circle className="ring-bg" cx="22" cy="22" r="18"></circle>
                <circle className="ring-progress" cx="22" cy="22" r="18"></circle>
              </svg>
              <span className="card-number">01</span>
            </div>
            <h3 className="card-heading">Sovereign-Backed Instruments</h3>
          </div>
          <div className="card-content-collapse">
            <p className="card-desc">We tokenize highly secure government bonds and sovereign debt instruments to bring institutional-grade yield onchain.</p>
            <div className="card-footer-line"></div>
          </div>
        </div>

        {/* Card 02 */}
        <div className="inst-card">
          <div className="card-top-row">
            <div className="card-number-wrapper">
              <svg className="progress-ring" width="44" height="44">
                <circle className="ring-bg" cx="22" cy="22" r="18"></circle>
                <circle className="ring-progress" cx="22" cy="22" r="18"></circle>
              </svg>
              <span className="card-number">02</span>
            </div>
            <h3 className="card-heading">Regulated Custodians & Partners</h3>
          </div>
          <div className="card-content-collapse">
            <p className="card-desc">All underlying SBN and sovereign assets are secured through licensed custodians, accompanied by independent daily reconciliation and strict regulatory compliance.</p>
            <div className="auditor-logos">
              <span className="auditor-tag">BNY</span>
              <span className="auditor-tag">coinbase</span>
              <span className="auditor-tag">StoneX</span>
            </div>
          </div>
        </div>

        {/* Card 03 */}
        <div className="inst-card">
          <div className="card-top-row">
            <div className="card-number-wrapper">
              <svg className="progress-ring" width="44" height="44">
                <circle className="ring-bg" cx="22" cy="22" r="18"></circle>
                <circle className="ring-progress" cx="22" cy="22" r="18"></circle>
              </svg>
              <span className="card-number">03</span>
            </div>
            <h3 className="card-heading">&quot;Institutional SBN Specialists&quot;</h3>
          </div>
          <div className="card-content-collapse">
            <p className="card-desc">Our leadership combines decades of deep domain experience across Indonesian sovereign debt markets, modern blockchain architecture, and institutional compliance.</p>
            <div className="card-footer-line"></div>
          </div>
        </div>

        {/* Card 04 */}
        <div className="inst-card">
          <div className="card-top-row">
            <div className="card-number-wrapper">
              <svg className="progress-ring" width="44" height="44">
                <circle className="ring-bg" cx="22" cy="22" r="18"></circle>
                <circle className="ring-progress" cx="22" cy="22" r="18"></circle>
              </svg>
              <span className="card-number">04</span>
            </div>
            <h3 className="card-heading">Cryptographic & Smart Contract Security</h3>
          </div>
          <div className="card-content-collapse">
            <p className="card-desc">Every tokenized SBN transaction layer undergoes continuous penetration testing and rigorous multi-firm smart contract audits.</p>
            <div className="card-footer-line"></div>
          </div>
        </div>

        {/* Card 05 */}
        <div className="inst-card">
          <div className="card-top-row">
            <div className="card-number-wrapper">
              <svg className="progress-ring" width="44" height="44">
                <circle className="ring-bg" cx="22" cy="22" r="18"></circle>
                <circle className="ring-progress" cx="22" cy="22" r="18"></circle>
              </svg>
              <span className="card-number">05</span>
            </div>
            <h3 className="card-heading">Regulatory Alignment & Compliance</h3>
          </div>
          <div className="card-content-collapse">
            <p className="card-desc">Built in strict accordance with financial regulations and sovereign frameworks to ensure full legal protection for every tokenized SBN holder.</p>
            <div className="card-footer-line"></div>
          </div>
        </div>
      </InstitutionalSlider>

{/* ========================================== */}
      {/* NEXUS TECHNOLOGY SECTION (ZYQXA VERSION) */}
      {/* ========================================== */}
      <section className="nexus-section">
        <div className="nexus-container">
          {/* Header Title */}
          <div className="nexus-header">
            <span className="nexus-subtitle">Nexus</span>
            <h2 className="nexus-title">Our Technology, <br /><span className="highlight-text">Your Tokens</span></h2>
          </div>

          {/* Token Carousel / Showcase Track */}
          <div className="nexus-slider-wrapper">
            <div
              className={`nexus-track${nexusTransitionEnabled ? '' : ' no-transition'}`}
              ref={nexusTrackRef}
              onTransitionEnd={handleNexusTransitionEnd}
              style={{ transform: `translateX(-${nexusStepWidth * nexusIndex}px)` }}
            >
              {[0, 1, 2].flatMap((copy) => [
                { name: 'IDRY', logo: '/IDRY.svg' },
                { name: 'ZIDR', logo: '/ZIDR.svg' },
                { name: 'Midtrans', logo: '/KATAZYQ.svg' },
                { name: 'BRI', logo: '/ZFoundation.svg' },
                { name: 'Z-Vault', logo: '/VaultPZ.svg' },
              ].map((token, index) => {
                const trackIndex = copy * 5 + index;
                return (
                  <div
                    className={`nexus-card ${nexusIndex === trackIndex ? 'active' : ''}`}
                    key={`${copy}-${token.name}`}
                    onClick={() => selectNexusCard(index)}
                  >
                    <div className="nexus-logo-icon">
                      <img src={token.logo} alt={`${token.name} Logo`} className="dropdown-asset-logo" />
                    </div>
                    <h3 className="nexus-token-name">{token.name}</h3>
                  </div>
                );
              }))}
            </div>
          </div>

          {/* Static Description & CTA (Posisinya dipindah ke dalam sini, Bung!) */}
          <div className="nexus-info-box">
            <p id="nexus-description" className="nexus-desc">
              Our Nexus technology empowers issuers of tokenized Indonesian Sovereign Bonds and digital stablecoins to offer instant minting and redemption to their clients.
            </p>
            <div className="nexus-cta-container">
              <a href="mailto:hello@zyqxa.id" className="nexus-contact-btn">Contact Us</a>
            </div>
          </div>

        </div>
      </section>

      <section ref={bridgeSectionRef} id="bridgeSection" className="zyqxa-bridge-section">
        <div className="arch-absolute-container">
          <svg className="arch-svg-curve" viewBox="0 0 1600 750" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
              </linearGradient>
              
              <path id="motionPath" d="M 100 750 A 700 700 0 0 1 1500 750" />
            </defs>

            <use href="#motionPath" stroke="url(#archGrad)" strokeWidth="2" strokeLinecap="round" />

            <g className="moving-box moving-box-left">
              <rect x="-13" y="-13" width="26" height="26" rx="6" fill="#f97316" stroke="none" />
            </g>

            <g className="moving-box moving-box-right">
              <rect x="-13" y="-13" width="26" height="26" rx="6" fill="#3b82f6" stroke="none" />
            </g>
          </svg>
          
          <div className="merged-peak-node">
            <div className="glow-orange-circle">
              <div className="inner-blue-box"></div>
            </div>
          </div>
        </div>

        <div className="bridge-content-wrapper">
          <span className="bridge-tagline">ZYQXA Ecosystem</span>
          <h2 className="bridge-title">
            Bridging <br />
            <span className="bridge-title-sub">Indonesian Sovereign Bonds & DeFi</span>
          </h2>
          <p className="bridge-description">
            We are grateful to be working with organizations aligned with the mission of making institutional-grade Indonesian government bonds and financial services available to everyone.
          </p>
          <a href="#institutional-section" className="bridge-explore-btn">Explore Our Partners</a>
        </div>
      </section>

      {/* Section Insights & Intelligence ZYQXA */}
      <section id="insightsSection" className="zyqxa-insights-section">
        <div className="insights-container">
          
          {/* Judul Section */}
          <div className="insights-header">
            <h2 className="insights-main-title">The ZYQXA Perspective</h2>
            
            {/* Tombol Tab Interaktif */}
            <div className="insights-tabs">
              <button className={`insight-tab-btn ${activeInsightTab === 'intelligence' ? 'active' : ''}`} type="button" onClick={() => setActiveInsightTab('intelligence')} aria-pressed={activeInsightTab === 'intelligence'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                Insights & Intelligence
              </button>
              <button className={`insight-tab-btn ${activeInsightTab === 'research' ? 'active' : ''}`} type="button" onClick={() => setActiveInsightTab('research')} aria-pressed={activeInsightTab === 'research'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Independent Research
              </button>
            </div>
          </div>

          {/* KONTEN TAB 1: Insights & Intelligence */}
          <div id="tab-intelligence" className={`insights-grid-content ${activeInsightTab === 'intelligence' ? 'active-tab' : ''}`}>
            <div className="insights-grid">
              <a href="#insightsSection" className="insight-card">
                <div className="insight-card-img-wrapper">
                  <div className="insight-logo-watermark">ZYQXA</div>
                  <div className="insight-category-tag">Article</div>
                </div>
                <div className="insight-card-content">
                  <span className="insight-meta">Bisnis Indonesia • Aug 28, 2026</span>
                  <h3 className="insight-card-title">ZYQXA Taps Former Bank Indonesia Regulatory Director As Chief Policy Officer</h3>
                </div>
              </a>

              <a href="#insightsSection" className="insight-card">
                <div className="insight-card-img-wrapper podcast-bg-1">
                  <div className="insight-category-tag">Podcast</div>
                </div>
                <div className="insight-card-content">
                  <span className="insight-meta">Podcast • Bisnis Indonesia • Aug 27, 2026</span>
                  <h3 className="insight-card-title">ZYQXA’s Tokenized SBN Hits IDR Milestone in Months: Founder Insights</h3>
                </div>
              </a>

              <a href="#insightsSection" className="insight-card">
                <div className="insight-card-img-wrapper podcast-bg-2">
                  <div className="insight-category-tag">Interview</div>
                </div>
                <div className="insight-card-content">
                  <span className="insight-meta"> CNBC Indonesia • Aug 24, 2026</span>
                  <h3 className="insight-card-title">Blockchain, Smart Contracts, and Tokenized SBN Are Transforming Indonesian Finance, Says ZYQXA’s Leadership</h3>
                </div>
              </a>
            </div>
          </div>

          {/* KONTEN TAB 2: Independent Research */}
          <div id="tab-research" className={`insights-grid-content ${activeInsightTab === 'research' ? 'active-tab' : ''}`}>
            <div className="insights-grid">
              <a href="#insightsSection" className="insight-card">
                <div className="insight-card-img-wrapper whitehouse-bg">
                  <div className="institution-brand-text">THE WHITE HOUSE</div>
                  <div className="insight-category-tag">Research</div>
                </div>
                <div className="insight-card-content">
                  <span className="insight-meta">Research • Bank Indonesia • Jul 17, 2025</span>
                  <h3 className="insight-card-title">Strengthening Indonesian Financial Sovereignty Through Digital Asset Innovation and SBN Tokenization</h3>
                </div>
              </a>

              <a href="#insightsSection" className="insight-card">
                <div className="insight-card-img-wrapper wef-bg">
                  <div className="institution-brand-text">WORLD ECONOMIC FORUM</div>
                  <div className="insight-category-tag">Research</div>
                </div>
                <div className="insight-card-content">
                  <span className="insight-meta">Research • Otoritas Jasa Keuangan (OJK) • May 21, 2025*</span>
                  <h3 className="insight-card-title">Asset Tokenization in Indonesian Financial Markets: The Next Generation of Value Exchange and SBN Integration</h3>
                </div>
              </a>

              <a href="#insightsSection" className="insight-card">
                <div className="insight-card-img-wrapper treasury-bg">
                  <div className="institution-brand-text">TREASURY DEPARTMENT</div>
                  <div className="insight-category-tag">Research</div>
                </div>
                <div className="insight-card-content">
                  <span className="insight-meta">Research • Kementerian Keuangan Republik Indonesia • Oct 29, 2024</span>
                  <h3 className="insight-card-title">Directorate General of Budget Financing and Risk Management Presentation on SBN Issuance and Digital Integration</h3>
                </div>
              </a>
            </div>
          </div>

          {/* Tombol Explore Insights di Bawah */}
          <div className="explore-insights-wrapper">
            <a href="#insightsSection" className="explore-insights-btn">Explore Insights</a>
          </div>

        </div>
      </section>

      {/* Section Newsletter: The Future of Finance */}
      <section className="zyqxa-newsletter-section">
        <div className="newsletter-overlay"></div>
        <div className="newsletter-container">
          
          {/* Teks Judul dan Deskripsi */}
          <div className="newsletter-header">
            <h2 className="newsletter-title">The Future of Indonesian Sovereign Wealth</h2>
            <p className="newsletter-subtitle">Subscribe for the latest updates on SBN tokenization, regulatory insights, and ZYQXA ecosystem news.</p>
          </div>

          {/* Form Input Email & Tombol Sign Up */}
          <form className="newsletter-form">
            <div className="newsletter-input-group">
              <input type="email" placeholder="Email" className="newsletter-email-input" required />
              <button type="submit" className="newsletter-signup-btn">Sign Up</button>
            </div>
          </form>

          {/* Ikon Footer Kecil */}
          <div className="newsletter-footer-icons">
            <a href="https://x.com/zyqxa" target="_blank" rel="noreferrer" aria-label="X social profile" className="icon-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>

        </div>
   </section>
        </main>
        <Footer />
        </>
      );
    }