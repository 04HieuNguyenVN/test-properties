import React from "react";
import { Collapse, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

const ConfigSection: React.FC<{
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (v: boolean) => void;
}> = ({
  title,
  children,
  isExpanded,
  onToggle,
  level = 0,
  hasToggle,
  toggleValue,
  onToggleChange,
}) => {
  const { t } = useTranslation();
  // Nếu title là key dạng a.b.c thì dịch, còn nếu là text thì giữ nguyên
  const isI18nKey = typeof title === "string" && title.includes(".");
  return (
    <Collapse
      ghost
      size="small"
      activeKey={isExpanded ? ["1"] : []}
      onChange={onToggle}
      className="config-section"
    >
      <Panel
        header={
          <div className="ant-collapse-header-text">
            <Typography.Text strong style={{ fontSize: 13 }}>
              {isI18nKey ? t(title) : title}
            </Typography.Text>
            {hasToggle && (
              <Switch
                size="small"
                checked={!!toggleValue}
                onChange={(checked, e) => {
                  e?.stopPropagation();
                  onToggleChange?.(checked);
                }}
                className="section-toggle"
              />
            )}
          </div>
        }
        key="1"
      >
        <div
          className={
            level > 0 ? "config-section-indent" : "config-section-no-indent"
          }
        >
          {children}
        </div>
      </Panel>
    </Collapse>
  );
};

export default ConfigSection;
