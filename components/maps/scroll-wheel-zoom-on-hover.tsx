"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

/** Enable scroll-wheel zoom only while the pointer is over the map. */
export function ScrollWheelZoomOnHover() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.setAttribute("tabindex", "0");

    map.scrollWheelZoom.disable();

    const enable = () => {
      map.scrollWheelZoom.enable();
      container.focus({ preventScroll: true });
    };

    const disable = () => {
      map.scrollWheelZoom.disable();
    };

    container.addEventListener("mouseenter", enable);
    container.addEventListener("mouseleave", disable);
    container.addEventListener("focus", enable);
    container.addEventListener("blur", disable);

    return () => {
      container.removeEventListener("mouseenter", enable);
      container.removeEventListener("mouseleave", disable);
      container.removeEventListener("focus", enable);
      container.removeEventListener("blur", disable);
      map.scrollWheelZoom.disable();
    };
  }, [map]);

  return null;
}
