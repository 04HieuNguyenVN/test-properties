import React from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Switch, Typography } from "antd";
const { Panel } = Collapse;

interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}

const ConfigSection: React.FC<ConfigSectionProps> = (props) => {
  const { t } = useTranslation();
  const {
    title,
    children,
    isExpanded,
    onToggle,
    level = 0,
    hasToggle = false,
    toggleValue = false,
    onToggleChange,
  } = props;

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
              {t(title)}
            </Typography.Text>
            {hasToggle && (
              <Switch
                size="small"
                checked={toggleValue}
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
