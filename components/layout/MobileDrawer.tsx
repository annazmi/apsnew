"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  // Tutup drawer jika tombol ESC ditekan pada keyboard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (onClose) onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Mencegah scroll pada body halaman utama ketika drawer terbuka
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. Mobile Drawer Panel */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="drawer-inner">
          {/* Header Drawer & Tombol Tutup */}
          <div className="drawer-header">
            <span className="drawer-brand">
              ZYQXA<span className="text-emerald-400">.</span>
            </span>
            <button
              onClick={onClose}
              className="drawer-close"
              aria-label="Close menu"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Navigasi Links */}
          <nav className="drawer-nav">
            <Link
              href="/#protocol-section"
              onClick={onClose}
              className="drawer-link"
            >
              Products
            </Link>
            <Link
              href="/#insightsSection"
              onClick={onClose}
              className="drawer-link"
            >
              Resources
            </Link>
            <Link
              href="/#bridgeSection"
              onClick={onClose}
              className="drawer-link"
            >
              Ecosystem
            </Link>
            <Link
              href="/#foundation-section"
              onClick={onClose}
              className="drawer-link"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Footer Kecil di dalam Drawer */}
        <div className="drawer-footer">
          © {new Date().getFullYear()} ZYQXA Protocol. All rights reserved.
        </div>
      </div>

      {/* 2. Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="mobile-overlay show"
        />
      )}
    </>
  );
}