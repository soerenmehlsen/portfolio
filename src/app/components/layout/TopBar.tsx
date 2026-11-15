import { links } from "@/app/lib/data";

export default function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 font-mono text-xs uppercase tracking-wide text-ink md:px-10">
      <span>Full-Stack Developer</span>
      <nav aria-label="Primary" className="hidden gap-8 md:flex">
        {links
          .filter((link) => link.hash !== "#home")
          .map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              className="transition-opacity duration-200 hover:opacity-60"
            >
              {link.nameEng}
            </a>
          ))}
      </nav>
    </header>
  );
}
