import {
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  HemisphereLight,
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

const clamp = (value: number) => Math.min(1, Math.max(0, value));

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
    const material = new MeshPhysicalMaterial({
      color: 0xa8a68c,
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.4,
    });
    resources.push(geometry, material);
    const sculpture = new Group();
    sculpture.add(new Mesh(geometry, material));
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
    let frame = 0;
    let disposed = false;
    let resizeNeeded = true;
    let pointerX = 0;
    let pointerY = 0;
    let lastProgress = -1;
    let lastPointerX = NaN;
    let lastPointerY = NaN;
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
      const x = reduced ? 0 : pointerX;
      const y = reduced ? 0 : pointerY;
      if (progress !== lastProgress)
        section.style.setProperty("--scene-progress", String(progress));
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
      sculpture.rotation.set(
        0.25 + progress * 1.15 + y * 0.12,
        -0.5 + progress * Math.PI * 1.6 + x * 0.18,
        -0.15 + progress * 0.45
      );
      sculpture.position.y = Math.sin(progress * Math.PI) * 0.18;
      sculpture.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.12);
      orbit.rotation.set(1.12 + progress * 0.5, 0.15 + progress * 0.45, -0.35);
      if (resizeNeeded) {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height, false);
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
      disposeResources();
    };
    render();
    return cleanup;
  } catch (error) {
    cleanup();
    throw error;
  }
}
