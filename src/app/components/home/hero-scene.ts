import {
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  HemisphereLight,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createGlobeMorphs, LAND_HEIGHT } from "./globe-morph";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const phase = (progress: number, from: number, to: number) => {
  const t = clamp((progress - from) / (to - from));
  return t * t * (3 - 2 * t);
};

/** A demand-rendered sculpture: scroll/pointer/resize draw frames, idle does not. */
export function createHeroScene(
  host: HTMLElement,
  section: HTMLElement,
  onContextLost: () => void
) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  const resources: { dispose: () => void }[] = [renderer];
  let cleanup = () => {
    resources.reverse().forEach((resource) => resource.dispose());
    renderer.domElement.remove();
  };

  try {
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.className = "hero-sculpture-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0.1, 7.2);
    camera.lookAt(0, 0, 0);

    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    try {
      const environment = pmrem.fromScene(room, 0.04);
      resources.push(environment);
      scene.environment = environment.texture;
    } finally {
      pmrem.dispose();
      room.dispose();
    }

    const geometry = new TorusKnotGeometry(1.03, 0.31, 200, 32, 2, 3);
    resources.push(geometry);
    const globeGeometry = createGlobeMorphs(geometry);
    resources.push(
      globeGeometry.sphere,
      globeGeometry.land,
      globeGeometry.coast
    );
    const material = new MeshPhysicalMaterial({
      color: 0xa8a68c,
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.4,
    });
    resources.push(material);
    const sculpture = new Group();
    const sculptureMesh = new Mesh(geometry, material);
    const globe = new Group();
    const globeMesh = new Mesh(globeGeometry.sphere, material);
    const continents = new Mesh(globeGeometry.land, material);
    const coastMaterial = new LineBasicMaterial({
      color: 0x555646,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    resources.push(coastMaterial);
    const coasts = new LineSegments(globeGeometry.coast, coastMaterial);
    globe.add(globeMesh, continents, coasts);
    globe.visible = false;
    sculpture.add(sculptureMesh, globe);
    scene.add(sculpture);

    const ringGeometry = new TorusGeometry(2.05, 0.005, 8, 160);
    const ringMaterial = new MeshBasicMaterial({
      color: 0x6b645c,
      transparent: true,
      opacity: 0.24,
    });
    resources.push(ringGeometry, ringMaterial);
    const orbit = new Mesh(ringGeometry, ringMaterial);
    scene.add(orbit);
    scene.add(new HemisphereLight(0xe8e8e3, 0x6b645c, 0.7));
    const key = new DirectionalLight(0xffffff, 3);
    key.position.set(3, 6, 4);
    scene.add(key);
    const rim = new DirectionalLight(0xd1d1b0, 1.8);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const stage = section.querySelector<HTMLElement>(".hero-stage")!;
    const art = section.querySelector<HTMLElement>(".hero-art")!;
    const experience = document.getElementById("experience");
    const copy = section.querySelectorAll<HTMLElement>(".hero-copy");
    const nativeScrollEffects = CSS.supports(
      "(animation-timeline: scroll(root block)) and (animation-range: 0px 100px)"
    );
    let frame = 0;
    let disposed = false;
    let resizeNeeded = true;
    let pointerX = 0;
    let pointerY = 0;
    let lastProgress = -1;
    let lastExitProgress = -1;
    let lastPointerX = NaN;
    let lastPointerY = NaN;
    let centerX = 0;
    let centerY = 0;
    let focusScale = 1;
    let finalQuality = false;
    const disposeResources = cleanup;

    const render = () => {
      frame = 0;
      if (disposed || document.hidden) return;
      const reduced = preference.matches;
      const sectionBox = section.getBoundingClientRect();
      const travel = Math.max(
        0,
        sectionBox.height - stage.getBoundingClientRect().height
      );
      const pinned =
        !reduced && getComputedStyle(section).position === "sticky";
      const progress =
        pinned && travel > 0 ? clamp(-sectionBox.top / travel) : 0;
      if (finalQuality !== progress >= 0.86) {
        finalQuality = progress >= 0.86;
        resizeNeeded = true;
      }
      const x = reduced ? 0 : pointerX;
      const y = reduced ? 0 : pointerY;
      if (resizeNeeded) {
        // Layout offsets stay stable while CSS transforms the artwork.
        centerX = stage.clientWidth / 2 - art.offsetLeft - art.offsetWidth / 2;
        centerY = stage.clientHeight / 2 - art.offsetTop - art.offsetHeight / 2;
        section.style.setProperty("--hero-center-x", `${centerX}px`);
        section.style.setProperty("--hero-center-y", `${centerY}px`);
        focusScale = Number(
          getComputedStyle(section).getPropertyValue("--hero-focus-scale")
        );
      }
      if (progress !== lastProgress)
        section.style.setProperty("--scene-progress", String(progress));
      if (!nativeScrollEffects) {
        const exitProgress =
          pinned && experience
            ? clamp(
                (stage.clientHeight - experience.getBoundingClientRect().top) /
                  (stage.clientHeight * 0.55)
              )
            : 0;
        if (exitProgress !== lastExitProgress) {
          art.style.opacity = String(1 - exitProgress);
          host.style.transform = `translateY(${-stage.clientHeight * 0.08 * exitProgress}px) scale(${1 - 0.06 * exitProgress}) rotate(${-4 * exitProgress}deg)`;
          lastExitProgress = exitProgress;
        }
      }
      // Reuse the scene's scroll updates where CSS timelines are unavailable.
      if (!nativeScrollEffects && (resizeNeeded || progress !== lastProgress)) {
        const fade = pinned ? clamp(progress / 0.22) : 0;
        copy.forEach((element) => {
          element.style.opacity = String(1 - fade);
          element.style.transform = `translateY(${-20 * fade}px)`;
          element.style.visibility = fade === 1 ? "hidden" : "visible";
        });
        art.style.transform = `translate(${centerX * fade}px, ${centerY * fade}px) scale(${1 + (focusScale - 1) * fade})`;
      }
      if (
        !resizeNeeded &&
        progress === lastProgress &&
        x === lastPointerX &&
        y === lastPointerY
      )
        return;
      lastProgress = progress;
      lastPointerX = x;
      lastPointerY = y;
      const gather = phase(progress, 0.58, 0.86);
      const relief = phase(progress, 0.86, 1);
      sculptureMesh.morphTargetInfluences![0] = gather;
      continents.morphTargetInfluences![0] = relief;
      continents.visible = relief > 0.08;
      coastMaterial.opacity = 0.38 * relief;
      coasts.scale.setScalar(1 + ((LAND_HEIGHT + 0.0007) / 1.5) * relief);
      sculptureMesh.visible = progress < 0.86;
      globe.visible = progress >= 0.86;
      const settle = phase(progress, 0.58, 1);
      sculpture.rotation.set(
        (0.25 + progress * 1.15) * (1 - settle) + 0.1 * settle + y * 0.12,
        (-0.5 + progress * Math.PI * 1.6) * (1 - settle) +
          4.5 * settle +
          x * 0.18,
        (-0.15 + progress * 0.45) * (1 - settle) + 0.409 * settle
      );
      sculpture.position.y = Math.sin(progress * Math.PI) * 0.18;
      sculpture.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.12);
      orbit.rotation.set(1.12 + progress * 0.5, 0.15 + progress * 0.45, -0.35);
      if (resizeNeeded) {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        // Render for the enlarged CSS size too, so the final globe isn't an
        // upscaled bitmap. Keep a pixel budget for large / high-DPI screens.
        const density =
          (window.devicePixelRatio || 1) *
          (pinned ? focusScale : 1) *
          (finalQuality ? 1.25 : 1);
        const renderScale = Math.min(
          density,
          Math.sqrt((finalQuality ? 6_000_000 : 3_000_000) / (width * height))
        );
        renderer.setSize(
          Math.max(1, Math.floor(width * renderScale)),
          Math.max(1, Math.floor(height * renderScale)),
          false
        );
        camera.aspect = width / height;
        // Keep the sculpture inside narrower portrait viewports too.
        camera.position.z = 7.2 / Math.min(1, camera.aspect);
        camera.updateProjectionMatrix();
        resizeNeeded = false;
      }
      renderer.render(scene, camera);
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      resizeNeeded = true;
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (
        preference.matches ||
        !finePointer.matches ||
        event.pointerType === "touch"
      )
        return;
      const rect = stage.getBoundingClientRect();
      const target = event.target;
      // Include the top bar, but not a menu or Experience covering the hero.
      const overHero =
        target instanceof Element &&
        (section.contains(target) || !!target.closest("header")) &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      // Preserve the last pose outside the hero; resume only on a new hero move.
      if (!overHero) return;
      pointerX = clamp((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = clamp((event.clientY - rect.top) / rect.height) * 2 - 1;
      schedule();
    };
    const lost = () => {
      cleanup();
      onContextLost();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", resize);
    preference.addEventListener("change", resize);
    window.addEventListener("pointermove", move, { passive: true });
    renderer.domElement.addEventListener("webglcontextlost", lost);

    cleanup = () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", resize);
      preference.removeEventListener("change", resize);
      window.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      copy.forEach((element) => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
        element.style.removeProperty("visibility");
      });
      art.style.removeProperty("transform");
      art.style.removeProperty("opacity");
      host.style.removeProperty("transform");
      section.style.removeProperty("--hero-center-x");
      section.style.removeProperty("--hero-center-y");
      disposeResources();
    };
    render();
    return cleanup;
  } catch (error) {
    cleanup();
    throw error;
  }
}
