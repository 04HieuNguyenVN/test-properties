import * as React from "react";

/**
 * Hitbox vô hình, bám đúng mép hai panel.
 * Không vẽ đường/viền nào – chỉ đổi con trỏ và nhận onMouseDown để kéo.
 */
type Props = {
  left: string; // ví dụ: 'calc(58% - 6px)'
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
  className?: string;
};

const ResizeHitbox: React.FC<Props> = ({
  left,
  onMouseDown,
  ariaLabel = "Resize panels",
  className,
}) => {
  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      onMouseDown={onMouseDown}
      className={className ?? "resize-hitbox"}
      style={{
        left,
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 12, // vùng bắt chuột "thoải mái"
        cursor: "col-resize",
        background: "transparent",
        zIndex: 10,
      }}
    />
  );
};

export default ResizeHitbox;
