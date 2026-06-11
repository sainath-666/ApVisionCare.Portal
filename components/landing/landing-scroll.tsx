"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export function LandingScrollEnhancer() {
  useEffect(() => {
    const root = document.querySelector(".landing-page");
    if (!root) return;

    const onClick: EventListener = (event) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href^='#']",
      );
      if (!anchor || !root.contains(anchor)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      event.preventDefault();
      smoothScrollTo(href);
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return null;
}
