// Shared timing for the page-load intro, in seconds after the page hydrates.
// The curtain (Preloader) lifts for LIFT_SECONDS and its round edge has left
// the screen before then; the hero starts revealing right after.
export const LIFT_SECONDS = 1;
export const INTRO_START = LIFT_SECONDS + 0.1;
