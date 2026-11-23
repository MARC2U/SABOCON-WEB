import { useId } from "react";

/** The original raster shape is preserved; its supplied circular shape is rendered in the current CI orange. */
export function BrandMark({ className = "", label }: { className?: string; label?: string }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`brand-mark ${className}`} viewBox="115 110 1440 1440" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <defs><filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 -1 0 1" result="ink"/>
      <feComposite in="ink" in2="SourceAlpha" operator="in" result="silhouette"/>
      <feFlood floodColor="#ff5100" result="orange"/>
      <feComposite in="orange" in2="silhouette" operator="in"/>
    </filter></defs>
    <image href="/brand/sabocon-round-orange.png" width="1667" height="1667" filter={`url(#${id})`}/>
  </svg>;
}
