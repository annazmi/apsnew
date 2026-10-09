"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

type DropdownMenu = "products" | "resources" | "ecosystem" | "about";

interface NavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  isScrolled?: boolean;
  lightBackground?: boolean;
}

const productPreviewImages: Record<string, string> = {
  idry: "/IDRY.svg",
  zidr: "/ZIDR.svg",
  "yield-portal": "/YportalZ.svg",
  "zyqxa-portal": "/SovereignPZ.svg",
  "vault-protocol": "/VaultPZ.svg",
  "settlement-layer": "/SettlementZ.svg",
  "cross-chain-bridge": "/BridgeZ.svg",
};

export default function Navbar({
  onMenuToggle,
  isMenuOpen = false,
  isScrolled = false,
  lightBackground = false,
}: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const dropdownRefs = useRef<Record<DropdownMenu, HTMLDivElement | null>>({
    products: null,
    resources: null,
    ecosystem: null,
    about: null,
  });
  const dropdownShellRef = useRef<HTMLDivElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<DropdownMenu | null>(null);
  const [previewImage, setPreviewImage] = useState(productPreviewImages.idry);
  const [resourcePreviewImage, setResourcePreviewImage] = useState("/TransparencyHubIcon.svg");
  const [ecosystemPreviewImage, setEcosystemPreviewImage] = useState("/ZEcosystem.svg");
  const [aboutPreviewImage, setAboutPreviewImage] = useState("/Docs & FAQs.svg");

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDropdown(null);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useLayoutEffect(() => {
    const shell = dropdownShellRef.current;
    if (!shell) return;

    if (!activeDropdown) {
      shell.style.height = "0px";
      return;
    }

    const activePanel = dropdownRefs.current[activeDropdown];
    if (!activePanel) return;

    const updateHeight = () => {
      shell.style.height = `${activePanel.getBoundingClientRect().height}px`;
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(activePanel);
    return () => resizeObserver.disconnect();
  }, [activeDropdown]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""} ${lightBackground ? styles.lightHeader : ""}`}>
      <div className={styles.topBanner}>
        <span>ZYQXA Launches <span className="numeric-text">24/7</span> Minting &amp; Redemption for Tokenized SBN</span>
        <Link href="/learn-more">Learn More</Link>
      </div>

      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="ZYQXA">
          <img src="/LOG ZYQXA.svg" alt="ZYQXA logo" />
        </Link>
          
        <nav
          ref={navRef}
          aria-label="Primary navigation"
          className={styles.nav}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* =================================================== */}
          {/* 1. MENU PRODUCTS */}
          {/* =================================================== */}
          <div className={`${styles.productsDropdownWrapper} ${activeDropdown === "products" ? styles.menuOpen : ""}`}>
            <button type="button" className={styles.navLink} aria-expanded={activeDropdown === "products"} onMouseEnter={() => setActiveDropdown("products")} onFocus={() => setActiveDropdown("products")} onClick={() => setActiveDropdown("products")}>Products</button>
            
            <div ref={(element) => { dropdownRefs.current.products = element; }} className={styles.dropdownBox}>
              <div className={styles.dropdownGridLayout}>
            
                {/* KOLOM KIRI: Daftar Aset & Protokol */}
                <div className={styles.dropdownLeftColumn}>
                  <h3 className={styles.dropdownHeading}>Assets</h3>
                  
                  {/* Item IDRY */}
                  <Link href="/idry" className={styles.dropdownAssetRow} data-preview="idry" onMouseEnter={() => setPreviewImage(productPreviewImages.idry)} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/IDRY.svg" alt="Logo IDRY" className={`${styles.dropdownAssetLogo} ${styles.idryLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>IDRY</span>
                        <span className={styles.dropdownAssetTag}>Liquid DeFi</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Tokenized Indonesian sovereign bonds for DeFi yield.</span>
                    </div>
                  </Link>

                  {/* Item ZIDR */}
                  <div className={styles.dropdownAssetRow} data-preview="zidr" onMouseEnter={() => setPreviewImage(productPreviewImages.zidr)}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/ZIDR.svg" alt="Logo ZIDR" className={styles.dropdownAssetLogo} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>ZIDR</span>
                        <span className={styles.dropdownAssetTag}>Institutional</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Short-term Indonesian sovereign bonds with compliance.</span>
                    </div>
                  </div>

                  {/* Kategori: Platforms & Protocols */}
                  <h3 className={`${styles.dropdownHeading} ${styles.dropdownSubgroupHeading}`}>Platforms &amp; Protocols</h3>
                  
                  {/* Item Protokol: Yield Portal */}
                  <div className={styles.dropdownAssetRow} data-preview="yield-portal" onMouseEnter={() => setPreviewImage(productPreviewImages["yield-portal"])}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/YportalZ.svg" alt="Logo Yield Portal" className={`${styles.dropdownAssetLogo} ${styles.yieldPortalLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Yield Portal</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>The premier gateway to mint IDRY yield.</span>
                    </div>
                  </div>

                  {/* Item Protokol: ZYQXA Sovereign Portal */}
                  <div className={styles.dropdownAssetRow} data-preview="zyqxa-portal" onMouseEnter={() => setPreviewImage(productPreviewImages["zyqxa-portal"])}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/SovereignPZ.svg" alt="Logo ZYQXA Sovereign Portal" className={`${styles.dropdownAssetLogo} ${styles.sovereignPortalLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Sovereign Portal</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>The premier nexus for ZIDR sovereign bond governance.</span>
                    </div>
                  </div>

                  {/* Item Protokol: ZYQXA Vault Protocol */}
                  <div className={styles.dropdownAssetRow} data-preview="vault-protocol" onMouseEnter={() => setPreviewImage(productPreviewImages["vault-protocol"])}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/VaultPZ.svg" alt="Logo ZYQXA Vault Protocol" className={`${styles.dropdownAssetLogo} ${styles.vaultPortalLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Vault Protocol</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Institutional liquidity gateway for tokenized real-world assets.</span>
                    </div>
                  </div>

                </div>

                {/* KOLOM KANAN: Kotak Preview Animasi 3D & Infrastructure di Bawahnya */}
                <div className={styles.dropdownRightColumn}>
                  <div className={styles.dropdownPreviewBox}>
                    <div key={previewImage} className={styles.previewLogoContainer}>
                      <img src={previewImage} id="preview-logo-img" className={styles.floatingLogo} alt="Product preview" />
                    </div>
                  </div>

                  {/* Kategori: Infrastructure */}
                  <div className={styles.dropdownInfrastructureWrapper}>
                    <h3 className={`${styles.dropdownHeading} ${styles.dropdownSubgroupHeading}`}>Infrastructure</h3>
                    
                    {/* Item Infrastruktur: Settlement Layer */}
                    <div className={styles.dropdownAssetRow} data-preview="settlement-layer" onMouseEnter={() => setPreviewImage(productPreviewImages["settlement-layer"])}>
                      <div className={styles.dropdownLogoBox}>
                        <img src="/SettlementZ.svg" alt="Logo Settlement Layer" className={`${styles.dropdownAssetLogo} ${styles.settlementLayerLogo}`} />
                      </div>
                      <div className={styles.dropdownAssetCopy}>
                        <div className={styles.dropdownTitleWrapper}>
                          <span className={styles.dropdownAssetTitle}>Settlement Layer</span>
                        </div>
                        <span className={styles.dropdownAssetDesc}>The premier institutional execution backbone on Base &amp; Ethereum.</span>
                      </div>
                    </div>

                    {/* Item Infrastruktur: Cross-Chain Bridge */}
                    <div className={styles.dropdownAssetRow} data-preview="cross-chain-bridge" onMouseEnter={() => setPreviewImage(productPreviewImages["cross-chain-bridge"])}>
                      <div className={styles.dropdownLogoBox}>
                        <img src="/BridgeZ.svg" alt="Logo Cross-Chain Bridge" className={`${styles.dropdownAssetLogo} ${styles.crossChainBridgeLogo}`} />
                      </div>
                      <div className={styles.dropdownAssetCopy}>
                        <div className={styles.dropdownTitleWrapper}>
                          <span className={styles.dropdownAssetTitle}>Cross-Chain Bridge</span>
                        </div>
                        <span className={styles.dropdownAssetDesc}>Multi-chain bridge for secure asset transfers.</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* =================================================== */}
          {/* 2. MENU RESOURCES */}
          {/* =================================================== */}
          <div className={`${styles.productsDropdownWrapper} ${styles.resourcesDropdownWrapper} ${activeDropdown === "resources" ? styles.menuOpen : ""}`}>
            <button type="button" className={styles.navLink} aria-expanded={activeDropdown === "resources"} onMouseEnter={() => setActiveDropdown("resources")} onFocus={() => setActiveDropdown("resources")} onClick={() => setActiveDropdown("resources")}>Resources</button>
            
            <div ref={(element) => { dropdownRefs.current.resources = element; }} className={styles.dropdownBox}>
              <div className={styles.dropdownGridLayout}>
            
                <div className={styles.dropdownLeftColumn}>
                  
                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setResourcePreviewImage("/TransparencyHubIcon.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/TransparencyHubIcon.svg" alt="Transparency Hub" className={`${styles.dropdownAssetLogo} ${styles.transparencyHubLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Transparency Hub</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Reserve audits, IDRY yields, and ZIDR metrics.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setResourcePreviewImage("/ProtocolDocsIcon.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/ProtocolDocsIcon.svg" alt="Protocol Docs" className={`${styles.dropdownAssetLogo} ${styles.protocolDocsLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Protocol Docs</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Guides for portals, vaults, and asset hubs.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setResourcePreviewImage("/LearnIcon.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/LearnIcon.svg" alt="ZYQXA Learn" className={`${styles.dropdownAssetLogo} ${styles.zyqxaLearnLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>ZYQXA Learn</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Tokenization mechanics, bridging, and compliance.</span>
                    </div>
                  </div>

                </div>

                <div className={styles.dropdownRightColumn}>
                  <div className={styles.dropdownPreviewBox}>
                    <div key={resourcePreviewImage} className={styles.previewLogoContainer}>
                      <img src={resourcePreviewImage} id="resource-preview-img" className={styles.floatingLogo} alt="Resource Preview Feature" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =================================================== */}
          {/* 3. MENU ECOSYSTEM */}
          {/* =================================================== */}
          <div className={`${styles.productsDropdownWrapper} ${styles.ecosystemDropdownWrapper} ${activeDropdown === "ecosystem" ? styles.menuOpen : ""}`}>
            <button type="button" className={styles.navLink} aria-expanded={activeDropdown === "ecosystem"} onMouseEnter={() => setActiveDropdown("ecosystem")} onFocus={() => setActiveDropdown("ecosystem")} onClick={() => setActiveDropdown("ecosystem")}>Ecosystem</button>
            
            <div ref={(element) => { dropdownRefs.current.ecosystem = element; }} className={styles.dropdownBox}>
              <div className={styles.dropdownGridLayout}>
            
                <div className={styles.dropdownLeftColumn}>
                  
                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setEcosystemPreviewImage("/ZEcosystem.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/ZEcosystem.svg" alt="ZYQXA Ecosystem" className={`${styles.dropdownAssetLogo} ${styles.zyqxaEcosystemLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>ZYQXA Ecosystem</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Bridging local finance & real estate onchain.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setEcosystemPreviewImage("/ZCatalyst.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/ZCatalyst.svg" alt="Catalyst" className={`${styles.dropdownAssetLogo} ${styles.catalystLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Catalyst</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Capital & liquidity for protocol growth.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setEcosystemPreviewImage("/ZFoundation.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/ZFoundation.svg" alt="ZYQXA Foundation" className={`${styles.dropdownAssetLogo} ${styles.zyqxaFoundationLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>ZYQXA Foundation</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Governance, compliance & ecosystem expansion.</span>
                    </div>
                  </div>

                </div>

                <div className={styles.dropdownRightColumn}>
                  <div className={styles.dropdownPreviewBox}>
                    <div key={ecosystemPreviewImage} className={styles.previewLogoContainer}>
                      <img src={ecosystemPreviewImage} id="ecosystem-preview-img" className={styles.floatingLogo} alt="Ecosystem Preview Feature" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* =================================================== */}
          {/* 4. MENU ABOUT */}
          {/* =================================================== */}
          <div className={`${styles.productsDropdownWrapper} ${styles.aboutDropdownWrapper} ${activeDropdown === "about" ? styles.menuOpen : ""}`}>
            <button type="button" className={styles.navLink} aria-expanded={activeDropdown === "about"} onMouseEnter={() => setActiveDropdown("about")} onFocus={() => setActiveDropdown("about")} onClick={() => setActiveDropdown("about")}>About</button>
            
            <div ref={(element) => { dropdownRefs.current.about = element; }} className={styles.dropdownBox}>
              <div className={styles.dropdownGridLayout}>
                
                <div className={styles.dropdownLeftColumn}>
                  
                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setAboutPreviewImage("/Docs & FAQs.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/Docs & FAQs.svg" alt="Docs & FAQs" className={`${styles.dropdownAssetLogo} ${styles.docsFaqsLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Docs &amp; FAQs</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Learn about our products, services, and tech.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setAboutPreviewImage("/Trust and Security.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/Trust and Security.svg" alt="Trust and Security" className={`${styles.dropdownAssetLogo} ${styles.trustSecurityLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Trust and Security</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>How we secure your funds and build trust.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setAboutPreviewImage("/Career.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/Career.svg" alt="Careers" className={`${styles.dropdownAssetLogo} ${styles.careersLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Careers</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Help build the future of finance.</span>
                    </div>
                  </div>

                  <div className={styles.dropdownAssetRow} onMouseEnter={() => setAboutPreviewImage("/Team.svg")}>
                    <div className={styles.dropdownLogoBox}>
                      <img src="/Team.svg" alt="Team" className={`${styles.dropdownAssetLogo} ${styles.teamLogo}`} />
                    </div>
                    <div className={styles.dropdownAssetCopy}>
                      <div className={styles.dropdownTitleWrapper}>
                        <span className={styles.dropdownAssetTitle}>Team</span>
                      </div>
                      <span className={styles.dropdownAssetDesc}>Learn about ZYQXA&apos;s mission and the team.</span>
                    </div>
                  </div>

                </div>

                <div className={styles.dropdownRightColumn}>
                  <div className={styles.dropdownPreviewBox}>
                    <div key={aboutPreviewImage} className={styles.previewLogoContainer}>
                      <img src={aboutPreviewImage} id="about-preview-img" className={styles.floatingLogo} alt="About Preview Feature" />
                    </div>
                  </div>

                  <div className={styles.dropdownInfrastructureWrapper}>
                    <div className={styles.dropdownAssetRow} onMouseEnter={() => setAboutPreviewImage("/Contact Us.svg")}>
                      <div className={styles.dropdownLogoBox}>
                        <img src="/Contact Us.svg" alt="Contact Us" className={`${styles.dropdownAssetLogo} ${styles.contactUsLogo}`} />
                      </div>
                      <div className={styles.dropdownAssetCopy}>
                        <div className={styles.dropdownTitleWrapper}>
                          <span className={styles.dropdownAssetTitle}>Contact Us</span>
                        </div>
                        <span className={styles.dropdownAssetDesc}>Reach out for support or general inquiries.</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </nav>

        <div>
          <a href="https://app.zyqxa.id" className={styles.headerDashboardBtn}>Launch App</a>
        </div>

        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          id="hamburger" 
          aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"} 
          aria-controls="mobile-drawer" 
          aria-expanded={isMenuOpen}
          onClick={onMenuToggle}
          type="button"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
      <div
        ref={dropdownShellRef}
        aria-hidden="true"
        className={`${styles.dropdownShell} ${activeDropdown ? styles.dropdownShellOpen : ""}`}
      />
    </header>
  );
}