import React from "react";
import { Input, InputNumber, Select, Typography, Button, Switch } from "antd";
import ConfigSection from "../../common/ConfigSection";
import TextStyleToggles from "../../common/TextStyleToggles";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const { Option } = Select;

export default function TitleSection({
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
  const s = settings.title.title;

  return (
    <ConfigSection
      title="Title"
      isExpanded={expanded.titleSection}
      onToggle={() => toggle("titleSection")}
      hasToggle
      toggleValue={s.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          title: { ...p.title, title: { ...p.title.title, enabled: checked } },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Text</Typography.Text>
          <div className="title-input-group">
            <Input
              size="small"
              value={s.text}
              onChange={(e) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    title: { ...p.title.title, text: e.target.value },
                  },
                }))
              }
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">Heading</Typography.Text>
          <Select
            size="small"
            value={s.heading}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: { ...p.title, title: { ...p.title.title, heading: v } },
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
                  title: { ...p.title, title: { ...p.title.title, font: v } },
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
                    title: { ...p.title.title, fontSize: v ?? s.fontSize },
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
                title: { ...p.title, title: { ...p.title.title, ...next } },
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
                    title: { ...p.title.title, textColor: color },
                  },
                }))
              }
              size="small"
              showLabel={false}
            />
          </div>
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">
            Background color
          </Typography.Text>
          <div className="title-color-group">
            <CustomColorPicker
              label=""
              value={s.backgroundColor}
              onChange={(color) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    title: { ...p.title.title, backgroundColor: color },
                  },
                }))
              }
              size="small"
              showLabel={false}
            />
          </div>
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">
            Horizontal alignment
          </Typography.Text>
          <div className="title-alignment-group">
            {(["left", "center", "right"] as const).map((pos) => (
              <Button
                key={pos}
                size="small"
                type={s.horizontalAlignment === pos ? "primary" : "default"}
                className="title-alignment-button"
                onClick={() =>
                  setSettings((p) => ({
                    ...p,
                    title: {
                      ...p.title,
                      title: { ...p.title.title, horizontalAlignment: pos },
                    },
                  }))
                }
              >
                {pos === "center" ? "≣" : "≡"}
              </Button>
            ))}
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
                    title: { ...p.title.title, textWrap: checked },
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
