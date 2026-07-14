import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: "PIXPRO CORE", eyebrow: "Reliable everyday performance", image: "/pixpro-product.jpg", metric: "560 MB/s", copy: "A dependable TLC SATA upgrade engineered for faster boot times, responsive applications, silent operation, and broad system compatibility.", href: "/products/pixpro-core" },
  { name: "PIXPRO EDGE", eyebrow: "Performance for gamers and professionals", image: "/pixpro-product.jpg", metric: "3,500 MB/s", copy: "PCIe Gen3 x4 NVMe speed, premium 3D NAND, and intelligent thermal management for demanding modern workloads.", href: "/products/pixpro-edge" },
  { name: "PIXPRO FLEX", eyebrow: "Value-focused high-capacity storage", image: "/pixpro-product.jpg", metric: "Up to 2TB", copy: "Premium 128-layer 3D TLC NAND with up to 3,200 MB/s write performance, advanced data protection, and lasting endurance.", href: "/products/pixpro-flex" },
];

const pathPoints = [
  [10, 89, 0],
  [50, 88, 10],
  [76, 139, 20],
  [126, 141, 12],
  [150, 112, 8],
  [157, 73, 0],
  [180, 44, 5],
  [207, 35, 10],
  [232, 36, 0],
];

const mapRange = (value, min1, max1, min2, max2) => {
  const clamped = Math.min(Math.max(value, min1), max1);
  return min2 + ((clamped - min1) / (max1 - min1)) * (max2 - min2);
};

const createTunnelTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#050505");
  gradient.addColorStop(0.36, "#191006");
  gradient.addColorStop(0.62, "#3b2708");
  gradient.addColorStop(1, "#050505");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 180; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.8 + 0.3;
    ctx.fillStyle = `rgba(214, 160, 0, ${Math.random() * 0.42})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 120, canvas.height);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(14, 2);
  return texture;
};

const ProductDetailsShowcase = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const productRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;

    let cleanup = () => {};
    const ctx = gsap.context(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const lowPower = width < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !lowPower,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.4));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x020202, 14, 92);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 500);
      const cameraRig = new THREE.Group();
      cameraRig.position.z = 80;
      cameraRig.add(camera);
      scene.add(cameraRig);

      const points = pathPoints.map(([x, z, y]) => new THREE.Vector3(x, y, z));
      const path = new THREE.CatmullRomCurve3(points);
      path.tension = 0.5;

      const tunnelTexture = createTunnelTexture();
      const tunnelGeometry = new THREE.TubeGeometry(path, lowPower ? 140 : 240, 5.2, lowPower ? 20 : 32, false);
      const tunnelMaterial = new THREE.MeshStandardMaterial({
        side: THREE.BackSide,
        map: tunnelTexture,
        roughness: 0.42,
        metalness: 0.24,
        color: 0xffffff,
      });
      const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
      scene.add(tunnel);

      const wireTubeGeometry = new THREE.TubeGeometry(path, lowPower ? 90 : 150, 4.55, lowPower ? 12 : 20, false);
      const wireGeometry = new THREE.EdgesGeometry(wireTubeGeometry);
      const wireMaterial = new THREE.LineBasicMaterial({
        color: 0xd6a000,
        transparent: true,
        opacity: 0.16,
      });
      const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
      scene.add(wireframe);

      const particleCount = lowPower ? 350 : 800;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        particlePositions[i * 3] = Math.random() * 280 - 40;
        particlePositions[i * 3 + 1] = Math.random() * 70 - 30;
        particlePositions[i * 3 + 2] = Math.random() * 210 - 35;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffd27a,
        size: 0.28,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.34);
      const pointLight = new THREE.PointLight(0xffd27a, 2.2, 42);
      scene.add(ambientLight);
      scene.add(pointLight);

      const cameraState = { progress: 0, mouseX: Math.PI, mouseY: 0 };
      const scrollState = { progress: 0 };
      let animationFrame = 0;
      let isActive = true;
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        isActive = entry.isIntersecting && !document.hidden;
      }, { rootMargin: "200px 0px" });
      visibilityObserver.observe(section);

      const updateCamera = () => {
        const progress = THREE.MathUtils.clamp(cameraState.progress, 0, 0.965);
        const p1 = path.getPointAt(progress);
        const p2 = path.getPointAt(Math.min(progress + 0.032, 1));
        cameraRig.position.copy(p1);
        cameraRig.lookAt(p2);
        camera.rotation.y += (cameraState.mouseX - camera.rotation.y) / 18;
        camera.rotation.x += (cameraState.mouseY - camera.rotation.x) / 18;
        pointLight.position.copy(p2);
      };

      const render = () => {
        if (isActive) {
          cameraState.progress += (scrollState.progress - cameraState.progress) * 0.12;
          tunnelTexture.offset.x -= 0.0015;
          tunnelTexture.offset.y += 0.00025;
          particles.rotation.y += 0.0007;
          particles.rotation.x += 0.00025;
          updateCamera();
          renderer.render(scene, camera);
        }
        animationFrame = requestAnimationFrame(render);
      };

      const productTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.set(productRefs.current, {
        autoAlpha: 0,
        y: 36,
        scale: 0.985,
        transformOrigin: "center center",
      });

      productRefs.current.forEach((product, index) => {
        const media = product.querySelector(".product-media");
        const copy = product.querySelector(".product-copy");
        const start = index * 2 + 0.2;
        const imageFrom = index % 2 === 0 ? -72 : 72;
        const copyFrom = index % 2 === 0 ? 72 : -72;

        gsap.set(media, { x: imageFrom, opacity: 0, scale: 0.94 });
        gsap.set(copy, { x: copyFrom, opacity: 0 });

        productTimeline
          .set(product, { zIndex: 10 + index }, start)
          .to(product, { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out" }, start)
          .to(media, { x: 0, opacity: 1, scale: 1, duration: 0.62, ease: "power3.out" }, start + 0.08)
          .to(copy, { x: 0, opacity: 1, duration: 0.62, ease: "power3.out" }, start + 0.16)
          .to(product, { scale: 1.018, duration: 0.85, ease: "none" }, start + 0.72)
          .to(media, { y: -18, duration: 0.85, ease: "none" }, start + 0.72)
          .to(copy, { y: -10, duration: 0.85, ease: "none" }, start + 0.72)
          .to(copy, { x: -copyFrom * 0.42, opacity: 0, duration: 0.38, ease: "power2.in" }, start + 1.52)
          .to(media, { x: -imageFrom * 0.42, opacity: 0, scale: 0.96, duration: 0.38, ease: "power2.in" }, start + 1.56)
          .to(product, { autoAlpha: 0, y: -32, scale: 0.985, duration: 0.34, ease: "power2.in" }, start + 1.62);
      });

      const cameraTween = gsap.to(scrollState, {
        progress: 0.965,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 4,
        },
      });

      const transitionTween = gsap.to("#products .group", {
        y: -110,
        scale: 0.84,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#products",
          start: "72% center",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      const onPointerMove = (event) => {
        cameraState.mouseX = mapRange(event.clientX, 0, window.innerWidth, 3.22, 3.06);
        cameraState.mouseY = mapRange(event.clientY, 0, window.innerHeight, -0.08, 0.08);
      };

      const onResize = () => {
        const nextWidth = window.innerWidth;
        const nextHeight = window.innerHeight;
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight);
      };

      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("resize", onResize);
      render();

      cleanup = () => {
        visibilityObserver.disconnect();
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animationFrame);
        cameraTween.kill();
        transitionTween.kill();
        tunnelGeometry.dispose();
        tunnelMaterial.dispose();
        tunnelTexture.dispose();
        wireTubeGeometry.dispose();
        wireGeometry.dispose();
        wireMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };
    }, section);

    return () => {
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product-experience"
      className="relative h-[650vh] overflow-visible bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="experience absolute inset-0 z-10 h-full w-full" />
        <div className="scrollTarget pointer-events-none absolute left-0 top-0 z-0 h-[650vh] w-24" />
        <div className="vignette-radial pointer-events-none absolute inset-0 z-30 after:absolute after:inset-0 after:bg-[radial-gradient(circle,transparent_48%,rgba(0,0,0,0.92)_145%)] after:content-['']" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-40 bg-gradient-to-b from-black via-black/78 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 bg-gradient-to-t from-black via-black/78 to-transparent" />

        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_48%,rgba(214,160,0,0.23),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.2)_48%,rgba(0,0,0,0.66)_100%)]" />

        <div className="relative z-40 mx-auto flex h-full w-full max-w-[118rem] items-center justify-center px-5 pt-20 lg:px-12">
          {products.map((product, index) => (
            <article
              key={product.name}
              ref={(el) => {
                if (el) productRefs.current[index] = el;
              }}
              className="pointer-events-auto absolute left-0 top-1/2 grid min-h-[min(76vh,33rem)] w-full -translate-y-1/2 grid-cols-1 items-center justify-center gap-8 px-6 py-7 md:grid-cols-[minmax(18rem,25rem)_minmax(24rem,34rem)] md:gap-16 md:px-10 md:py-10 lg:gap-24"
            >
              <div
                className={`product-media relative flex min-h-[250px] w-full items-center justify-center md:min-h-[430px] ${
                  index % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="absolute h-60 w-60 rounded-full bg-[#d6a000]/22 blur-[82px]" />
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 max-h-[300px] w-full max-w-[22rem] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.9)] md:max-h-[430px] md:max-w-[25rem]"
                />
              </div>

              <div className={`product-copy w-full max-w-[34rem] ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#d6a000]">
                  {product.eyebrow}
                </p>
                <h3 className="mt-5 max-w-lg text-4xl font-black leading-[0.94] md:text-6xl">
                  {product.name}
                </h3>
                <p className="mt-6 text-3xl font-black text-white/92 md:text-5xl">
                  {product.metric}
                </p>
                <p className="mt-5 max-w-md text-base leading-7 text-white/62">
                  {product.copy}
                </p>
                <div className="mt-8 flex gap-3">
                  <Link
                    to={product.href}
                    className="border border-white/35 px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white/80 transition hover:border-[#d6a000] hover:text-[#d6a000]"
                  >
                    Explore
                  </Link>
                  <Link
                    to={product.href}
                    className="bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-[#d6a000]"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsShowcase;
