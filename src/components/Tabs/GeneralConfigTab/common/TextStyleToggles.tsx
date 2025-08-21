import React from "react";
import { Button, Space } from "antd";
import { Bold, Italic, Underline } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TextStyleToggles({
  bold,
  italic,
  underline,
  onChange,
}: {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  onChange: (
    next: Partial<{ bold: boolean; italic: boolean; underline: boolean }>
  ) => void;
}) {
  const { t } = useTranslation();
  return (
    <Space size="small" className="text-format-buttons">
      <Button
        size="small"
        type={bold ? "primary" : "default"}
        icon={<Bold size={12} />}
        onClick={() => onChange({ bold: !bold })}
        title={t("generalTab.bold", "Bold")}
        aria-label={t("generalTab.bold", "Bold")}
      />
      <Button
        size="small"
        type={italic ? "primary" : "default"}
        icon={<Italic size={12} />}
        onClick={() => onChange({ italic: !italic })}
        title={t("generalTab.italic", "Italic")}
        aria-label={t("generalTab.italic", "Italic")}
      />
      <Button
        size="small"
        type={underline ? "primary" : "default"}
        icon={<Underline size={12} />}
        onClick={() => onChange({ underline: !underline })}
        title={t("generalTab.underline", "Underline")}
        aria-label={t("generalTab.underline", "Underline")}
      />
    </Space>
  );
}
