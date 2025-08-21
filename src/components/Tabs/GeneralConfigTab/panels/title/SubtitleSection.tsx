import React from "react";
import { Input, InputNumber, Select, Typography, Switch } from "antd";
import ConfigSection from "../../common/ConfigSection";
import TextStyleToggles from "../../common/TextStyleToggles";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const { Option } = Select;

export default function SubtitleSection({
  settings,
  setSettings,
  expanded,
  toggle,
}: {
  settings: GeneralSettings;
  setSettings: React.Dispatch<React.SetStateAction<GeneralSettings>>;
  expanded: ExpandedState;
  toggle: ToggleFn;
}) {
  const s = settings.title.subtitle;

  return (
    <ConfigSection
      title="Subtitle"
      isExpanded={expanded.subtitle}
      onToggle={() => toggle("subtitle")}
      hasToggle
      toggleValue={s.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          title: {
            ...p.title,
            subtitle: { ...p.title.subtitle, enabled: checked },
          },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Text</Typography.Text>
          <Input
            size="small"
            value={s.text}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  subtitle: { ...p.title.subtitle, text: e.target.value },
                },
              }))
            }
          />
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">Heading</Typography.Text>
          <Select
            size="small"
            value={s.heading}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  subtitle: { ...p.title.subtitle, heading: v },
                },
              }))
            }
            style={{ width: "100%" }}
          >
            <Option value="Heading 1">Heading 1</Option>
            <Option value="Heading 2">Heading 2</Option>
            <Option value="Heading 3">Heading 3</Option>
            <Option value="Heading 4">Heading 4</Option>
          </Select>
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">Font</Typography.Text>
          <div className="title-font-group">
            <Select
              size="small"
              value={s.font}
              onChange={(v) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    subtitle: { ...p.title.subtitle, font: v },
                  },
                }))
              }
              style={{ flex: 1 }}
            >
              <Option value="DIN">DIN</Option>
              <Option value="Segoe UI">Segoe UI</Option>
              <Option value="Arial">Arial</Option>
            </Select>
            <InputNumber
              size="small"
              value={s.fontSize}
              onChange={(v) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    subtitle: {
                      ...p.title.subtitle,
                      fontSize: v ?? s.fontSize,
                    },
                  },
                }))
              }
              style={{ width: 60 }}
            />
          </div>
        </div>

        <div className="form-group">
          <TextStyleToggles
            bold={s.bold}
            italic={s.italic}
            underline={s.underline}
            onChange={(next) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  subtitle: { ...p.title.subtitle, ...next },
                },
              }))
            }
          />
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">Text color</Typography.Text>
          <div className="title-color-group">
            <CustomColorPicker
              label=""
              value={s.textColor}
              onChange={(color) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    subtitle: { ...p.title.subtitle, textColor: color },
                  },
                }))
              }
              size="small"
              showLabel={false}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">Text wrap</Typography.Text>
            <Switch
              size="small"
              checked={s.textWrap}
              onChange={(checked) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    subtitle: { ...p.title.subtitle, textWrap: checked },
                  },
                }))
              }
            />
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
