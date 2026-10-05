"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const storyData = [
  {
    title: "Open Liquidity",
    desc: "Despite its immense potential, traditional finance remains constrained by structural inefficiencies, fragmented markets, and limited global access.",
    color: 0x10b981,
  },
  {
    title: "Accessible Assets",
    desc: "At ZYQXA, we leverage blockchain technology to bridge real-world value onchain, building institutional-grade infrastructure for borderless financial markets.",
    color: 0x00f5ff,
  },
  {
    title: "Unified Value",
    desc: "By merging the security of traditional finance with the efficiency of decentralized systems, we are creating a faster, fairer, and globally inclusive financial ecosystem.",
    color: 0xa855f7,
  },
];

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const globeMaterialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % storyData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (globeMaterialRef.current) {
      globeMaterialRef.current.color.setHex(storyData[activeIndex].color);
    }
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    const GLOBE_RADIUS = 100;
    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    let disposed = false;
    let globeTexture: THREE.Texture | null = null;
    let globe: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null = null;
    textureLoader.load(
      "/Peta_globe.png",
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        globeTexture = texture;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = texture.image;
        if (!ctx) {
          texture.dispose();
          globeTexture = null;
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const positions = [];

        for (let y = 0; y < canvas.height; y += 10) {
          for (let x = 0; x < canvas.width; x += 10) {
            const index = (y * canvas.width + x) * 4;
            const r = imgData[index];
            const g = imgData[index + 1];
            const b = imgData[index + 2];

            if (r > 200 && g > 200 && b > 200) {
              const lat = (y / canvas.height) * Math.PI - Math.PI / 2;
              const lon = (x / canvas.width) * (Math.PI * 2) - Math.PI;

              const xPos = -GLOBE_RADIUS * Math.cos(lat) * Math.cos(lon);
              const yPos = -GLOBE_RADIUS * Math.sin(lat);
              const zPos = GLOBE_RADIUS * Math.cos(lat) * Math.sin(lon);

              positions.push(xPos, yPos, zPos);
            }
          }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );

        const globeMaterial = new THREE.PointsMaterial({
          size: 1.2,
          color: storyData[activeIndexRef.current].color,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        });
        globeMaterialRef.current = globeMaterial;

        globe = new THREE.Points(geometry, globeMaterial);
        group.add(globe);
      },
      undefined,
      (err) => console.error("Gagal memuat tekstur globe:", err)
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      globe?.geometry.dispose();
      globe?.material.dispose();
      globeMaterialRef.current = null;
      globeTexture?.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="globe-3d-embed">
      <div ref={containerRef} className="globe-3d-container" />
      <div className="globe-3d-story">
        <h3 className="text-xl font-bold mb-2 transition-all" style={{ color: `#${storyData[activeIndex].color.toString(16).padStart(6, '0')}` }}>
          {storyData[activeIndex].title}
        </h3>
        <p className="text-sm text-gray-300 transition-opacity duration-300">
          {storyData[activeIndex].desc}
        </p>
      </div>
    </div>
  );
}