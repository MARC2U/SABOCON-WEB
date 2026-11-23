// Viewport crops render the supplied design directly. Replace with separate originals before publication.
export function ReferenceArt({ crop, label, className = "" }: { crop: number[]; label?: string; className?: string }) {
 return <svg className={`reference-art ${className}`} viewBox={crop.join(" ")} preserveAspectRatio="xMidYMid slice" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}><image href="/reference/design.png" width="852" height="1846"/></svg>;
}
