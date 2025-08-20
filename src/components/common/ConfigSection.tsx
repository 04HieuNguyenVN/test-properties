import React from "react";
import { Collapse, Switch, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;

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

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  children,
  isExpanded,
  onToggle,
  level = 0,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
}) => (
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
          <Text strong style={{ fontSize: "13px" }}>{title}</Text>
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
      <div className={level > 0 ? "config-section-indent" : "config-section-no-indent"}>
        {children}
      </div>
    </Panel>
  </Collapse>
);

export default ConfigSection;

