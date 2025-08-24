import * as React from "react";

type Options = {
  /** ref tới container bao hai panel (phải có position: relative) */
  containerRef: React.RefObject<HTMLElement>;
  /** key để lưu vào localStorage */
  storageKey: string;
  /** tỉ lệ bề rộng panel bên trái (0..1) */
  defaultLeftRatio?: number;
  /** min px cho panel trái/phải để chống vỡ layout */
  minLeftPx?: number;
  minRightPx?: number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useHorizontalSplit({
  containerRef,
  storageKey,
  defaultLeftRatio = 0.6,
  minLeftPx = 320,
  minRightPx = 320,
}: Options) {
  const [leftRatio, setLeftRatio] = React.useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    const v = saved ? parseFloat(saved) : defaultLeftRatio;
    return clamp(isNaN(v) ? defaultLeftRatio : v, 0.05, 0.95);
  });

  // refs phục vụ kéo
  const isDraggingRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const startRatioRef = React.useRef(leftRatio);
  const ratioRef = React.useRef(leftRatio);

  React.useEffect(() => {
    ratioRef.current = leftRatio;
  }, [leftRatio]);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startRatioRef.current = ratioRef.current;

      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";

      const onMove = (ev: MouseEvent) => {
        if (!isDraggingRef.current) return;
        const rect = containerRef.current?.getBoundingClientRect();
        const total = rect?.width ?? window.innerWidth;

        const deltaPx = ev.clientX - startXRef.current; // kéo phải => tăng panel trái
        const startPx = startRatioRef.current * total;
        const nextPx = startPx + deltaPx;

        const next = clamp(
          nextPx / total,
          minLeftPx / total,
          1 - minRightPx / total
        );
        setLeftRatio(next);
      };

      const stop = () => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", stop);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        localStorage.setItem(storageKey, String(ratioRef.current));
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", stop);
    },
    [containerRef, storageKey, minLeftPx, minRightPx]
  );

  const leftBasisPct = `${(leftRatio * 100).toFixed(2)}%`;
  const hitboxLeft = `calc(${(leftRatio * 100).toFixed(2)}% - 6px)`; // 6px = nửa bề rộng hitbox (12px)

  return { leftRatio, setLeftRatio, onMouseDown, leftBasisPct, hitboxLeft };
}
