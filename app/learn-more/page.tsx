import Link from "next/link";

const sections = [
  {
    title: "What is ZYQXA?",
    text: "ZYQXA is an institutional Web3 infrastructure layer for sovereign real-world asset tokenization. It connects compliant issuance, programmable settlement, and DeFi liquidity for structured public asset exposure.",
  },
  {
    title: "How it works",
    text: "Assets are structured into digital securities, connected to compliant custodial and governance rails, and then made available through settlement layers that support fast, auditable execution.",
  },
  {
    title: "Why it matters",
    text: "The goal is to unlock capital efficiency for sovereign bond markets while keeping user protections, governance, and reporting aligned to real-world institutional expectations.",
  },
];

export default function LearnMorePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050b1a", color: "#edf6ff" }}>
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(5,11,26,0.8)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontWeight: 800, letterSpacing: "0.14em", color: "#effcff" }}>
            ZYQXA
          </Link>
          <Link href="/" style={{ color: "#9feef9", fontWeight: 700 }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 96px" }}>
        <div style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(1,241,255,0.25)", background: "rgba(1,241,255,0.08)", color: "#9feef9", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11 }}>
          Learn More
        </div>

        <h1 style={{ marginTop: 18, fontSize: "clamp(2.4rem, 4vw, 4rem)", lineHeight: 1.08, letterSpacing: "-0.05em" }}>
          Structured sovereign bond tokenization for a global capital market.
        </h1>

        <p style={{ marginTop: 20, maxWidth: 760, color: "rgba(255,255,255,0.74)", fontSize: 18, lineHeight: 1.8 }}>
          ZYQXA creates the connective layer for institutional-grade tokenized assets, combining governance, liquidity, settlement, and market access in one operational stack.
        </p>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 20 }}>
          {sections.map((section) => (
            <article key={section.title} style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: 24 }}>
              <h2 style={{ marginBottom: 12, fontSize: 24 }}>{section.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>{section.text}</p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: 28, borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(135deg, rgba(1,241,255,0.08), rgba(15,23,42,0.8))" }}>
          <h3 style={{ fontSize: 30, marginBottom: 12 }}>Built for institutions</h3>
          <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 800 }}>
            The platform is designed for issuance, compliance, and liquidity orchestration across sovereign bond-related products, helping stakeholders access a modern alternative to fragmented legacy capital markets infrastructure.
          </p>
        </div>
      </section>
    </main>
  );
}
