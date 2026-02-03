import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Props = {
  /** Figma 기준 디자인 폭(px). 너는 393 기준이라 393 */
  designWidth?: number;
  children: React.ReactNode;
};

export default function StageScaler({ designWidth = 393, children }: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);

  // 1) 화면 폭에 맞춰 scale 계산 (작으면 <1, 크면 >1)
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth; // 모바일 브라우저의 실제 화면 폭
      const next = vw / designWidth;
      setScale(next);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [designWidth]);

  // 2) 스케일 적용 시, 스크롤 높이가 맞게 "스케일된 높이"를 계산
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateHeight = () => {
      // stage는 "원본(스케일 전) 높이"로 레이아웃이 잡힘
      const rawHeight = el.scrollHeight;
      setScaledHeight(rawHeight * scale);
    };

    updateHeight();

    const ro = new ResizeObserver(() => updateHeight());
    ro.observe(el);

    return () => ro.disconnect();
  }, [scale]);

  const wrapperStyle = useMemo<React.CSSProperties>(
    () => ({
      // 스케일된 높이를 wrapper가 차지하게 해서 스크롤이 정상 동작
      height: scaledHeight ?? "auto",
      width: "100%",
      overflowX: "hidden",
    }),
    [scaledHeight]
  );

  const stageStyle = useMemo<React.CSSProperties>(
    () => ({
      width: `${designWidth}px`,
      transform: `scale(${scale})`,
      transformOrigin: "top center",
    }),
    [designWidth, scale]
  );

  return (
    <div style={wrapperStyle}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div ref={stageRef} style={stageStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
