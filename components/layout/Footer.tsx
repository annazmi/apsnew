export default function Footer() {
  return (
    <>
    <footer className="zyqxa-footer-section">
      <div className="footer-container">
        <div className="footer-column">
          <h4 className="footer-heading">Invest</h4>
          <ul className="footer-links-list">
            <li><a href="#protocol-section">USDY</a></li>
            <li><a href="#protocol-section">OUSG</a></li>
            <li><a href="#bridgeSection">Bridge <span className="external-arrow">↗</span></a></li>
            <li><a href="#protocol-section">Convert <span className="external-arrow">↗</span></a></li>
            <li><a href="#protocol-section">ZYQXA Assets</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Partners</h4>
          <ul className="footer-links-list">
            <li><a href="#bridgeSection">Ecosystem</a></li>
            <li><a href="#foundation-section">Foundation <span className="external-arrow">↗</span></a></li>
            <li><a href="#protocol-section">DeFi Protocols <span className="external-arrow">↗</span></a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links-list">
            <li><a href="#insightsSection">Insights</a></li>
            <li><a href="https://docs.zyqxa.id" target="_blank" rel="noreferrer">Docs <span className="external-arrow">↗</span></a></li>
            <li><a href="#institutional-section">Trust &amp; Security <span className="external-arrow">↗</span></a></li>
            <li><a href="mailto:security@zyqxa.id">Bug Bounty <span className="external-arrow">↗</span></a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links-list">
            <li><a href="#institutional-section">Team</a></li>
            <li><a href="mailto:careers@zyqxa.id">Careers <span className="external-arrow">↗</span></a></li>
            <li><a href="mailto:media@zyqxa.id">Media Kit <span className="external-arrow">↗</span></a></li>
            <li><a href="mailto:hello@zyqxa.id">Contact Us</a></li>
            <li><a href="mailto:media@zyqxa.id">Media Inquiries</a></li>
          </ul>
        </div>
      </div>
    </footer>
{/* Section Legal Disclaimers & Final Footer ZYQXA */}
      <section className="zyqxa-legal-footer-section">
        <div className="legal-container">
          
          {/* Bagian Teks Disclaimer Hukum */}
          <div className="legal-disclaimers-text">
            <p>
              <span className="disclaimer-highlight">[*]</span> Important Information Regarding Token Regulatory and Eligibility Matters: The tokenized assets referenced herein (i.e., tokenized stocks, tokenized ETFs, and Real World Asset tokens now known as ZYQXA Assets) have not been registered under the US Securities Act of 1933, as amended (the &quot;Act&quot;), or the securities or financial instrument laws of any other jurisdiction. The Tokens may not be offered or sold in the United States or to US persons unless registered under the Act or an exemption from registration is available.
            </p>
            <p>
              Nothing herein constitutes an offer to sell, or a solicitation of an offer to buy, any assets or securities. Acquiring digital assets and tokens involves substantial risk. A holder of tokens may incur losses, including total loss of their purchase price. Past performance is not indicative of future results. Investors are responsible for conducting their own research, investigation, verification, and consultation with professional or investment advisors before participating.
            </p>
            <p>
              Additional terms, conditions, and restrictions apply. The token issuers, their affiliates, and respective directors, officers, and employees shall not have any liability whatsoever with respect to anyone&apos;s use of, or any third-party products, services, or technologies referenced herein.
            </p>
          </div>

          {/* Tulisan / Logo Merek Besar di Bagian Bawah */}
          <div className="brand-huge-signature">
            <div className="zyqxa-svg-logo-container">
              <img src="/KATAZYQ.svg" alt="ZYQXA Official Logo" className="zyqxa-logo-img" />
            </div>
          </div>

          {/* Garis Pembatas Tipis */}
          <div className="footer-divider"></div>

          {/* Baris Copyright & Tautan Hukum Bawah */}
          <div className="footer-bottom-row">
            <div className="copyright-text">
              ZYQXA © 2026
            </div>
            <div className="bottom-legal-links">
              <a href="/learn-more">Terms of Service</a>
              <a href="/learn-more">Privacy Policy</a>
            </div>
            <div className="bottom-social-icons">
              <a href="https://x.com/zyqxa" target="_blank" rel="noreferrer" aria-label="X social profile">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
