import Globe3D from "./Globe3D";

export default function GlobeSection() {
	return (
		<section id="zyqxa-globe-section" className="globe-section">
			<div className="globe-container">
				<div className="globe-text-left animate-on-scroll">
					<span className="globe-subtitle">A message from ZYQXA</span>
					<h2 className="globe-title">We Believe In</h2>
				</div>
				<div className="globe-canvas-wrapper" id="webgl-globe-container">
					<Globe3D />
				</div>
				<div className="globe-text-right animate-on-scroll">
					<h2 id="story-title" className="globe-title-highlight">Open Liquidity</h2>
				</div>
			</div>
			{/* Bottom content is now mostly handled inside Globe3D for easier sync, 
          but keeping the layout structure if needed */}
		</section>
	);
}

