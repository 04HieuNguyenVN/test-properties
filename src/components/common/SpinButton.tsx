import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaddingValues {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface SpinButtonProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  name: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SpinButton: React.FC<SpinButtonProps> = ({
  value,
  onChange,
  label,
  name,
  onFocus,
  onBlur,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    onChange(newValue);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(Math.max(0, value - 1));
  };

  const { t } = useTranslation();
  return (
    <div
      className="custom-spin-button"
      style={{ width: "54px", height: "22px" }}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
    >
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="custom-spin-input"
        aria-label={label}
        name={name}
      />
      <span className="custom-spin-px">px</span>
      <div className="custom-spin-controls">
        <button
          onClick={handleIncrement}
          onMouseEnter={onFocus}
          onMouseLeave={onBlur}
          className="custom-spin-btn"
          tabIndex={-1}
          aria-label={t("increaseValue", "Increase value")}
        >
          <ChevronUp size={8} className="custom-spin-icon" />
        </button>
        <div className="custom-spin-divider"></div>
        <button
          onClick={handleDecrement}
          onMouseEnter={onFocus}
          onMouseLeave={onBlur}
          className="custom-spin-btn"
          tabIndex={-1}
          aria-label={t("decreaseValue", "Decrease value")}
        >
          <ChevronDown size={8} className="custom-spin-icon" />
        </button>
      </div>
    </div>
  );
};