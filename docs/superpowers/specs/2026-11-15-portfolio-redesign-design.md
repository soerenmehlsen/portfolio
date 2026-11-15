# Redesign af portfolio – design

Dato: 2026-11-15

## Formål

Portfolioen skal have samme udtryk som referencen https://zunedaalim.com: redaktionel,
typografi-tung one-pager med lys sandfarvet hero, mørke sektioner, mono-labels og
scrolldrevne animationer. Indholdet er Sørens eget og kommer fra `src/app/lib/data.ts`.

## Mål

- Samme visuelle stil, layout-principper og animationer som referencen.
- Alt nuværende indhold bevares: hero, about, projekter, skills, certifikat, erfaring, kontaktlinks.
- Fungerer på mobil og desktop.
- `next build` (statisk eksport, `output: "export"`) virker fortsat; GitHub Pages-deploy er uændret.
- PostHog, Google Analytics og eksisterende `analyticsEvents` på links bevares.

## Ikke-mål

- Ingen nye sider, ingen CMS, intet nyt indhold ud over korte labels.
- Ingen lys/mørk-temaknap (designet har ét tema).
- Ingen WebGL/Spline.

## Anti-mål

- Ingen kopiering af referencens tekster, billeder eller kode.
- Ingen licenserede skrifttyper (Neue Montreal) uden licens.
- Animationer må ikke gøre indhold ulæseligt: ved `prefers-reduced-motion` vises alt statisk.

## Tilgange

1. **Omskriv komponenterne på nuværende stack (valgt).** Next 16, Tailwind 4 og
   framer-motion findes allerede; framer-motion dækker scroll-, reveal- og
   accordion-animationerne. Eneste nye afhængighed er `lenis` til blød scroll.
2. Skift til GSAP + ScrollTrigger. Samme resultat, men en ekstra afhængighed og
   to animationsbiblioteker side om side. Fravalgt.
3. Nyt projekt fra bunden. Mister analytics-opsætning, deploy og data uden gevinst. Fravalgt.

Søren har overladt "hvordan" til bygherren; valget af 1 er bygherrens.

## Visuelt system

- **Farver** (Tailwind 4 `@theme`-tokens i `globals.css`):
  - `sand` `#E8E8E3` (lys baggrund), `ink` `#171717` (tekst på lys),
  - `night` `#080807` (mørk flade), `bone` `#D1D1C7` (tekst på mørk),
  - `olive` `#8C8C73` og `stone` `#6B645C` (dæmpede accenter/labels), hårlinjer i `bone/15`.
- **Skrift:** Inter Tight (next/font/google) til overskrifter og brødtekst, stram tracking
  på store overskrifter. Geist Mono (ligger i `src/app/fonts`) til labels, tal og tags.
  Sora fjernes.
- **Former:** mørke sektioner med 24 px afrundede tophjørner, pille-knapper og -tags,
  tynde hårlinjer som skillelinjer, meget luft.
- **Grid:** asymmetrisk to-kolonne på desktop (tal/overskrift venstre, indhold højre);
  én kolonne på mobil.

## Sektioner (i rækkefølge)

1. **Hero** (lys). Lille topbar: "Full-Stack Developer" til venstre, tekstlinks til højre.
   Navnet "SØREN MEHLSEN" i fuld bredde (skaleres med viewport). Under: pil-ikon,
   nuværende tagline, "CONTACT ↗"-pilleknap (mailto som i dag), højt rektangulært
   portræt i gråtoner (`profilbillede.png`, `object-cover`), og nederst til højre en
   mono-status: "BASED IN" / "DENMARK" (bygherrens valg – Søren er i job, så
   "available for work" passer ikke).
2. **Experience** (mørk, ruller op over hero). Overskrift "EXPERIENCE /" med label
   "(CAREER)". `experiencesData` som nummererede rækker (01)…(05): titel, sted og dato;
   den aktive række folder ud med beskrivelsen, de øvrige er én linje. Scrolldrevet på
   desktop (række bliver aktiv, når den når midten af viewport); på mobil vises alle
   rækker udfoldet.
3. **Projects** (mørk). Overskrift "SELECTED WORKS /" med label "(PROJECTS)" og en kort
   introlinje. Hvert projekt: stort mono-tal til venstre, billedkort til højre,
   beskrivelse, titel, techstack som pille-tags, links til GitHub og live.
4. **Skills** (lys). Overskrift "SKILLS /". De fire grupper fra `skillsData` som
   kolonner/rækker med ikon + navn. Under: certifikatet som én række (titel, udsteder,
   link ↗) – erstatter den nuværende Certificates-sektion.
5. **About** (lys). Stor udsagnslinje: "The thrill of solving a problem is what drives
   me." (Sørens egen sætning fra den nuværende About-tekst, let forkortet – bygherrens
   valg). Under: to-kolonne-grid med den eksisterende tekst; underoverskrifterne
   "My passion" og "Personal profile" står som mono-labels i venstre kolonne og
   teksten i højre. Ghibli-illustrationen udgår (Sørens valg); filen i `public/`
   slettes ikke.
6. **Kontakt/footer** (mørk, afrundede tophjørner). Stor "LET'S TALK"-overskrift,
   mail-knap, LinkedIn/GitHub-links, copyright og lokal tid (Europe/Copenhagen) i mono.

## Navigation

Tekstlinks i topbaren. Når man har scrollet forbi hero, vises en rund sandfarvet
menuknap fast øverst til højre; den åbner en overlay-menu med sektionslinks og sociale
links. Links scroller blødt til sektionen. `active-section`-konteksten fjernes, hvis den
ikke længere bruges.

## Animationer

- **Blød scroll:** Lenis, initialiseret i en klient-provider; slået fra ved reduced motion.
- **Overskrifter:** bogstav-for-bogstav-reveal (hvert tegn glider op bag en maske, lille
  rotation), udløst når overskriften kommer i view. Genbrugelig `RevealHeading`.
  Teksten skal stadig være læsbar for skærmlæsere (`aria-label` på overskriften).
- **Introtekster:** ord-for-ord-optoning koblet til scroll-position.
- **Mørk sektion:** ruller op over hero (hero er sticky, mørk sektion har afrundede hjørner).
- **Experience-accordion:** højde/opacity-animation mellem aktiv og inaktiv række.
- **Projektkort:** let parallax/skalering på billedet ved scroll, hover-løft.
- **Easing:** `cubic-bezier(0.77, 0, 0.175, 1)` til store bevægelser (ca. 0,5–1 s);
  mikrointeraktioner 0,15–0,3 s.

## Oprydning

Fjernes, når de ikke længere bruges: `@splinetool/*`, `react-awesome-reveal`,
`react-vertical-timeline-component` (+ types), `hamburger-react`,
`react-intersection-observer` (hvis ubrugt), temakontekst og `ThemeSwitch`/`Switch`,
`3d-card`, `AnimatedGradientText`, `NaturalTypewriter`, `BottomDrawer`,
`SectionDivider`, baggrunds-grid/noise i layout. `data.ts` beholdes; felter må
tilføjes (fx udsteder på certifikat), men eksisterende indhold ændres ikke.

## Afgrænsning og analytics (bygherrens valg)

- Listerne i dette dokument er udtømmende. Effekter på referencen, som ikke står her
  (preloader, custom cursor, magnetiske knapper, marquee), er ikke med.
- Analytics: hvert link sporer fortsat et klik med de eksisterende `analyticsEvents`.
  `trackDemoClick` flyttes til det rigtige live-link, GitHub-links får sporing, og
  sociale links bruger `section: "footer"` / `"menu"`, fordi de flytter fra hero.
  Event-navne ændres ikke.
- Navigationslinks: Home, Experience, Projects, Skills, About, Contact
  (`#certificates` udgår af `links`).
- DeepDR har samme URL til live og GitHub: der vises kun GitHub-linket.

## Overladt til bygherren

- Præcise størrelser, afstande og breakpoints.
- Komponentopdeling og filnavne.
- Finjustering af timing, så det føles som referencen.

## Verifikation

- `npm run build` gennemføres uden fejl.
- Visuel gennemgang i browser ved desktop- og mobilbredde af alle seks sektioner.
- Kontrol med reduced motion slået til: alt indhold synligt.
- Alle links (mail, GitHub, live, LinkedIn, certifikat) peger samme sted som før.
