import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar"; // <-- Diperbaiki ke Navbar
import IdryYieldChart from "@/components/sections/IdryYieldChart";

export const metadata: Metadata = {
  title: "IDRY | ZYQXA Protocol",
  description: "Discover IDRY, tokenized Indonesian sovereign bond yield on ZYQXA.",
};

const metrics = [
  { label: "Price", value: "$1.1490", detail: "+$0.0001 today" },
  { label: "APY¹", value: "3.75%" },
  { label: "TVL", value: "$2.32B" },
];

export default function IdryPage() {
  return (
    <div className="idry-page">
      {/* Menggunakan Navbar dengan prop lightBackground */}
      <Navbar lightBackground />

      <main>
        <section className="idry-hero" aria-labelledby="idry-title">
          <div className="idry-hero-inner">
            <div className="idry-copy">
              <div className="idry-brand">
                <span className="idry-brand-icon">
                  <Image src="/IDRY.svg" alt="" width={34} height={40} priority />
                </span>
                <span className="idry-brand-copy">
                  <span className="idry-brand-name">IDRY</span>
                  <span className="idry-brand-description">
                    Tokenized Indonesian Sovereign Bond Yield*
                  </span>
                </span>
              </div>

              <h1 id="idry-title">
                The Global Standard
                <br />
                for <span>Payments</span>
              </h1>
              <p className="idry-description">
                The world&apos;s leading permissionless yieldcoin. Enjoy the utility of
                stablecoins, now with safer daily yield.
              </p>
              <div className="idry-actions">
                <a href="https://app.zyqxa.id" className="idry-action-primary">
                  Buy IDRY
                </a>
                <a href="https://app.zyqxa.id" className="idry-action-secondary">
                  Redeem IDRY
                </a>
              </div>
            </div>

            <div className="idry-artwork" aria-hidden="true">
              <div className="idry-glass idry-glass-top" />
              <div className="idry-glass idry-glass-middle" />
              <div className="idry-glass idry-glass-bottom" />
            </div>

            <dl className="idry-metrics" aria-label="IDRY metrics">
              {metrics.map(({ label, value, detail }) => (
                <div className="idry-metric" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                  {detail && <span>{detail}</span>}
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="idry-yield-section" aria-labelledby="idry-yield-title">
          <div className="idry-section-inner idry-yield-layout">
            <div className="idry-section-copy">
              <h2 id="idry-yield-title">
                Safe, Daily Yield.
                <br />
                Now 3.75% APY<sup>1</sup>
              </h2>
              <p>
                IDRY brings tokenized Indonesian sovereign bonds onchain,
                combining access to sovereign-backed assets with the utility of
                decentralized finance.
              </p>
              <a href="https://app.zyqxa.id" className="idry-action-primary">
                Buy IDRY
              </a>
            </div>
            <IdryYieldChart />
          </div>
        </section>
      </main>
    </div>
  );
}