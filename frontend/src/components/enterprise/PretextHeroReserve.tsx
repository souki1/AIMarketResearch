import { useLayoutEffect, useRef, useState } from "react";
import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";

type Props = {
  /** Plain text of the headline (must match visible copy for accurate measurement). */
  text: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Reserves vertical space for multi-line hero headlines using @chenglou/pretext layout
 * (avoids layout thrash from DOM measurement; matches Helvetica-based stack used in CSS).
 */
export default function PretextHeroReserve({ text, children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const width = el.getBoundingClientRect().width;
      if (width <= 0) return;

      const vw = window.innerWidth;
      const fontSize = vw >= 768 ? 60 : vw >= 640 ? 48 : 36;
      const lineHeightPx = Math.round(fontSize * 1.1);
      const font = `600 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
      const prepared = prepareWithSegments(text, font);
      const { height } = layoutWithLines(prepared, width, lineHeightPx);
      setMinHeight(height);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  return (
    <div ref={ref} className={`w-full ${className}`.trim()} style={minHeight !== undefined ? { minHeight } : undefined}>
      {children}
    </div>
  );
}
