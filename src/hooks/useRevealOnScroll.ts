import { useEffect } from "react";

/**
 * Revela elementos marcados com `data-reveal` quando entram na viewport.
 * Usa a API nativa de IntersectionObserver e dispara apenas uma vez por elemento.
 *
 * Respeita `prefers-reduced-motion`: nesse caso (ou sem suporte ao observer),
 * o conteúdo é exibido imediatamente, sem animação.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
