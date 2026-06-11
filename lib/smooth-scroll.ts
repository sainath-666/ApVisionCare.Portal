const DEFAULT_DURATION = 420;
const DEFAULT_OFFSET = 80;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function smoothScrollTo(
  target: string | Element,
  options?: { duration?: number; offset?: number },
) {
  if (typeof window === "undefined") return;

  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  const duration = options?.duration ?? DEFAULT_DURATION;
  const offset = options?.offset ?? DEFAULT_OFFSET;
  const end = el.getBoundingClientRect().top + window.scrollY - offset;
  const start = window.scrollY;
  const distance = end - start;

  if (Math.abs(distance) < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, end);
    return;
  }

  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
