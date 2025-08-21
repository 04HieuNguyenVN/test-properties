// src/components/Tabs/GeneralConfigTab.tsx
import React, { useState } from "react";
import PaddingControl from "../common/PaddingControl";
import {
  Button,
  Collapse,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  Typography,
} from "antd";
import { Bold, Italic, Underline, RotateCcw } from "lucide-react";
import { CustomColorPicker } from "../../components/common/CustomColorPicker";

const { Panel } = Collapse;
const { TextArea } = Input;

/** Bản sao nhỏ gọn của ConfigSection trong App.tsx */
const ConfigSection: React.FC<{
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}> = ({
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
          <Typography.Text strong style={{ fontSize: 13 }}>
            {title}
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

const GeneralConfigTab: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    size: { height: 542, width: 595, lockAspectRatio: false },
    position: { horizontal: 293, vertical: 82 },
    padding: { top: 0, right: 5, bottom: 5, left: 5 },
    advanced: { responsive: false, maintainLayerOrder: false },
    title: {
      title: {
        enabled: true,
        text: "Sum of GDPGRDP 2",
        heading: "Heading 3",
        font: "DIN",
        fontSize: 14,
        bold: false,
        italic: false,
        underline: false,
        textColor: "#000000",
        backgroundColor: "#ffffff",
        horizontalAlignment: "left",
        textWrap: true,
      },
      subtitle: {
        enabled: false,
        text: "",
        heading: "Heading 4",
        font: "Segoe UI",
        fontSize: 10,
        bold: false,
        italic: false,
        underline: false,
        textColor: "#000000",
        horizontalAlignment: "left",
        textWrap: false,
      },
      divider: {
        enabled: false,
        color: "#000000",
        lineStyle: "Solid",
        width: 1,
        ignorePadding: false,
      },
      spacing: { customizeSpacing: false, spaceBetweenLabelAndValue: 5 },
    },
    effects: {
      background: { enabled: true, color: "#ffffff", transparency: 0 },
      visualBorder: {
        enabled: false,
        color: "#000000",
        roundedCorners: 0,
        width: 1,
      },
      shadow: {
        enabled: false,
        color: "#000000",
        offset: "Outside",
        position: "Bottom right",
      },
    },
    dataFormat: { applySettingsTo: "Khu vực", format: "" },
    headerIcons: {
      colors: {
        background: "#ffffff",
        border: "#000000",
        icon: "#000000",
        transparency: 0,
      },
      icons: {
        visualInformation: true,
        visualWarning: true,
        visualError: true,
        drillOnDropdown: true,
        drillUp: true,
        drillDown: true,
        showNextLevel: true,
        expandToNextLevel: true,
        pin: true,
        focusMode: true,
        seeDataLayout: true,
        moreOptions: true,
        filter: true,
        helpTooltip: false,
        commentButton: true,
        copyIcon: true,
        smartNarrative: false,
        seeAlertButton: true,
      },
    },
    tooltips: {
      options: { text: "Report page settings and configurations..." },
      text: {
        font: "Segoe UI",
        fontSize: 10,
        bold: false,
        italic: false,
        underline: false,
        labelColor: "#000000",
        valueColor: "#000000",
        drillTextAndIconColor: "#000000",
      },
      background: { color: "#ffffff", transparency: 0 },
    },
  });

  const [generalExpandedSections, setGeneralExpandedSections] = useState({
    // main
    properties: false,
    title: false,
    effects: false,
    dataFormat: false,
    headerIcons: false,
    tooltips: false,
    // properties
    size: false,
    position: false,
    padding: false,
    advanced: false,
    // title
    titleSection: false,
    subtitle: false,
    divider: false,
    spacing: false,
    // effects
    background: false,
    visualBorder: false,
    shadow: false,
    // data-format
    applySettingsTo: false,
    formatOptions: false,
    // header-icons
    headerIconsColors: false,
    headerIconsIcons: false,
    // tooltips
    tooltipsOptions: false,
    tooltipsText: false,
    tooltipsBackground: false,
  });

  const updateGeneralSetting = (category: string, key: string, value: any) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [category]: { ...(prev as any)[category], [key]: value },
    }));
  };

  const handleToggleGeneralSection = (section: string) => {
    setGeneralExpandedSections((prev) => ({
      ...prev,
      [section]: !(prev as any)[section],
    }));
  };

  return (
    <div className="general-config-tab general-tab">
      {/* Properties */}
      <ConfigSection
        title="Properties"
        isExpanded={generalExpandedSections.properties}
        onToggle={() => handleToggleGeneralSection("properties")}
      >
        <div className="properties-container">
          {/* Size */}
          <ConfigSection
            title="Size"
            isExpanded={generalExpandedSections.size}
            onToggle={() => handleToggleGeneralSection("size")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text
                  className="form-label"
                  title="Chiều cao của biểu đồ"
                >
                  Height
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.size.height}
                  onChange={(v) => updateGeneralSetting("size", "height", v)}
                  style={{ width: "100%" }}
                  title="Nhập chiều cao (px)"
                />
              </div>
              <div className="form-group">
                <Typography.Text
                  className="form-label"
                  title="Chiều rộng của biểu đồ"
                >
                  Width
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.size.width}
                  onChange={(v) => updateGeneralSetting("size", "width", v)}
                  style={{ width: "100%" }}
                  title="Nhập chiều rộng (px)"
                />
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="form-label">
                    Lock aspect ratio
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.size.lockAspectRatio}
                    onChange={(checked) =>
                      updateGeneralSetting("size", "lockAspectRatio", checked)
                    }
                    title="Khóa tỉ lệ khung hình"
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Position */}
          <ConfigSection
            title="Position"
            isExpanded={generalExpandedSections.position}
            onToggle={() => handleToggleGeneralSection("position")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text
                  className="form-label"
                  title="Vị trí ngang của biểu đồ"
                >
                  Horizontal
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.position.horizontal}
                  onChange={(v) =>
                    updateGeneralSetting("position", "horizontal", v)
                  }
                  style={{ width: "100%" }}
                  title="Nhập vị trí ngang (px)"
                />
              </div>
              <div className="form-group">
                <Typography.Text
                  className="form-label"
                  title="Vị trí dọc của biểu đồ"
                >
                  Vertical
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.position.vertical}
                  onChange={(v) =>
                    updateGeneralSetting("position", "vertical", v)
                  }
                  style={{ width: "100%" }}
                  title="Nhập vị trí dọc (px)"
                />
              </div>
            </div>
          </ConfigSection>

          {/* Padding */}
          <ConfigSection
            title="Padding"
            isExpanded={generalExpandedSections.padding}
            onToggle={() => handleToggleGeneralSection("padding")}
          >
            <div className="section-content">
              <PaddingControl
                value={generalSettings.padding}
                onChange={(val) => updateGeneralSetting("padding", "", val)}
              />
            </div>
          </ConfigSection>

          {/* Advanced options */}
          <ConfigSection
            title="Advanced options"
            isExpanded={generalExpandedSections.advanced}
            onToggle={() => handleToggleGeneralSection("advanced")}
          >
            <div className="section-content">
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="form-label">
                    Responsive
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.advanced.responsive}
                    onChange={(checked) =>
                      updateGeneralSetting("advanced", "responsive", checked)
                    }
                    title="Bật/tắt chế độ responsive"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="form-label">
                    Maintain layer order
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.advanced.maintainLayerOrder}
                    onChange={(checked) =>
                      updateGeneralSetting(
                        "advanced",
                        "maintainLayerOrder",
                        checked
                      )
                    }
                    title="Giữ thứ tự lớp hiển thị"
                  />
                </div>
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Title */}
      <ConfigSection
        title="Title"
        isExpanded={generalExpandedSections.title}
        onToggle={() => handleToggleGeneralSection("title")}
      >
        <div className="properties-container">
          {/* Title */}
          <ConfigSection
            title="Title"
            isExpanded={generalExpandedSections.titleSection}
            onToggle={() => handleToggleGeneralSection("titleSection")}
            hasToggle
            toggleValue={generalSettings.title.title.enabled}
            onToggleChange={(checked) =>
              setGeneralSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  title: { ...p.title.title, enabled: checked },
                },
              }))
            }
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Text</Typography.Text>
                <div className="title-input-group">
                  <Input
                    size="small"
                    value={generalSettings.title.title.text}
                    onChange={(e) =>
                      setGeneralSettings((p) => ({
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
                <Typography.Text className="form-label">
                  Heading
                </Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.title.title.heading}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        title: { ...p.title.title, heading: v },
                      },
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Heading 1">Heading 1</Select.Option>
                  <Select.Option value="Heading 2">Heading 2</Select.Option>
                  <Select.Option value="Heading 3">Heading 3</Select.Option>
                  <Select.Option value="Heading 4">Heading 4</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Font</Typography.Text>
                <div className="title-font-group">
                  <Select
                    size="small"
                    value={generalSettings.title.title.font}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: { ...p.title.title, font: v },
                        },
                      }))
                    }
                    style={{ flex: 1 }}
                  >
                    <Select.Option value="DIN">DIN</Select.Option>
                    <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                    <Select.Option value="Arial">Arial</Select.Option>
                  </Select>
                  <InputNumber
                    size="small"
                    value={generalSettings.title.title.fontSize}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            fontSize: v ?? p.title.title.fontSize,
                          },
                        },
                      }))
                    }
                    style={{ width: 60 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="title-format-buttons">
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.bold ? "primary" : "default"
                    }
                    icon={<Bold size={12} />}
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            bold: !p.title.title.bold,
                          },
                        },
                      }))
                    }
                  />
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.italic ? "primary" : "default"
                    }
                    icon={<Italic size={12} />}
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            italic: !p.title.title.italic,
                          },
                        },
                      }))
                    }
                  />
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.underline
                        ? "primary"
                        : "default"
                    }
                    icon={<Underline size={12} />}
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            underline: !p.title.title.underline,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Text color
                </Typography.Text>
                <div className="title-color-group">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.title.title.textColor}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
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
                    value={generalSettings.title.title.backgroundColor}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
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
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.horizontalAlignment === "left"
                        ? "primary"
                        : "default"
                    }
                    className="title-alignment-button"
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            horizontalAlignment: "left",
                          },
                        },
                      }))
                    }
                  >
                    ≡
                  </Button>
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.horizontalAlignment ===
                      "center"
                        ? "primary"
                        : "default"
                    }
                    className="title-alignment-button"
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            horizontalAlignment: "center",
                          },
                        },
                      }))
                    }
                  >
                    ≣
                  </Button>
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.horizontalAlignment ===
                      "right"
                        ? "primary"
                        : "default"
                    }
                    className="title-alignment-button"
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          title: {
                            ...p.title.title,
                            horizontalAlignment: "right",
                          },
                        },
                      }))
                    }
                  >
                    ≡
                  </Button>
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="form-label">
                    Text wrap
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.title.title.textWrap}
                    onChange={(checked) =>
                      setGeneralSettings((p) => ({
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

          {/* Subtitle */}
          <ConfigSection
            title="Subtitle"
            isExpanded={generalExpandedSections.subtitle}
            onToggle={() => handleToggleGeneralSection("subtitle")}
            hasToggle
            toggleValue={generalSettings.title.subtitle.enabled}
            onToggleChange={(checked) =>
              setGeneralSettings((p) => ({
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
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Input
                    size="small"
                    value={generalSettings.title.subtitle.text}
                    onChange={(e) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          subtitle: {
                            ...p.title.subtitle,
                            text: e.target.value,
                          },
                        },
                      }))
                    }
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Heading
                </Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.title.subtitle.heading}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        subtitle: { ...p.title.subtitle, heading: v },
                      },
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Heading 1">Heading 1</Select.Option>
                  <Select.Option value="Heading 2">Heading 2</Select.Option>
                  <Select.Option value="Heading 3">Heading 3</Select.Option>
                  <Select.Option value="Heading 4">Heading 4</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Font</Typography.Text>
                <div style={{ display: "flex", gap: 4 }}>
                  <Select
                    size="small"
                    value={generalSettings.title.subtitle.font}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          subtitle: { ...p.title.subtitle, font: v },
                        },
                      }))
                    }
                    style={{ flex: 1 }}
                  >
                    <Select.Option value="DIN">DIN</Select.Option>
                    <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                    <Select.Option value="Arial">Arial</Select.Option>
                  </Select>
                  <InputNumber
                    size="small"
                    value={generalSettings.title.subtitle.fontSize}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          subtitle: {
                            ...p.title.subtitle,
                            fontSize: v ?? p.title.subtitle.fontSize,
                          },
                        },
                      }))
                    }
                    style={{ width: 60 }}
                  />
                </div>
              </div>
              <div
                className="form-group"
                style={{ display: "flex", gap: 4, alignItems: "center" }}
              >
                <Button
                  size="small"
                  type={
                    generalSettings.title.subtitle.bold ? "primary" : "default"
                  }
                  icon={<Bold size={12} />}
                  onClick={() =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        subtitle: {
                          ...p.title.subtitle,
                          bold: !p.title.subtitle.bold,
                        },
                      },
                    }))
                  }
                />
                <Button
                  size="small"
                  type={
                    generalSettings.title.subtitle.italic
                      ? "primary"
                      : "default"
                  }
                  icon={<Italic size={12} />}
                  onClick={() =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        subtitle: {
                          ...p.title.subtitle,
                          italic: !p.title.subtitle.italic,
                        },
                      },
                    }))
                  }
                />
                <Button
                  size="small"
                  type={
                    generalSettings.title.subtitle.underline
                      ? "primary"
                      : "default"
                  }
                  icon={<Underline size={12} />}
                  onClick={() =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        subtitle: {
                          ...p.title.subtitle,
                          underline: !p.title.subtitle.underline,
                        },
                      },
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Text color
                </Typography.Text>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <CustomColorPicker
                    label=""
                    value={generalSettings.title.subtitle.textColor}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
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
                <Typography.Text className="form-label">
                  Horizontal alignment
                </Typography.Text>
                <div style={{ display: "flex", gap: 2 }}>
                  {(["left", "center", "right"] as const).map((pos) => (
                    <Button
                      key={pos}
                      size="small"
                      type={
                        generalSettings.title.subtitle.horizontalAlignment ===
                        pos
                          ? "primary"
                          : "default"
                      }
                      style={{ width: 32, textAlign: "center" }}
                      onClick={() =>
                        setGeneralSettings((p) => ({
                          ...p,
                          title: {
                            ...p.title,
                            subtitle: {
                              ...p.title.subtitle,
                              horizontalAlignment: pos,
                            },
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
                  <Typography.Text className="form-label">
                    Text wrap
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.title.subtitle.textWrap}
                    onChange={(checked) =>
                      setGeneralSettings((p) => ({
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

          {/* Divider */}
          <ConfigSection
            title="Divider"
            isExpanded={generalExpandedSections.divider}
            onToggle={() => handleToggleGeneralSection("divider")}
            hasToggle
            toggleValue={generalSettings.title.divider.enabled}
            onToggleChange={(checked) =>
              setGeneralSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  divider: { ...p.title.divider, enabled: checked },
                },
              }))
            }
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Color</Typography.Text>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <CustomColorPicker
                    label=""
                    value={generalSettings.title.divider.color}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          divider: { ...p.title.divider, color },
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
                  Line style
                </Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.title.divider.lineStyle}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        divider: { ...p.title.divider, lineStyle: v },
                      },
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Solid">Solid</Select.Option>
                  <Select.Option value="Dashed">Dashed</Select.Option>
                  <Select.Option value="Dotted">Dotted</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Width</Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.title.divider.width}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        divider: {
                          ...p.title.divider,
                          width: v ?? p.title.divider.width,
                        },
                      },
                    }))
                  }
                  addonAfter="px"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="form-label">
                    Ignore padding
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.title.divider.ignorePadding}
                    onChange={(checked) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          divider: {
                            ...p.title.divider,
                            ignorePadding: checked,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Spacing */}
          <ConfigSection
            title="Spacing"
            isExpanded={generalExpandedSections.spacing}
            onToggle={() => handleToggleGeneralSection("spacing")}
          >
            <div className="section-content">
              <div className="form-group">
                <div className="checkbox-row">
                  <Typography.Text className="form-label">
                    Customize spacing
                  </Typography.Text>
                  <Switch
                    size="small"
                    checked={generalSettings.title.spacing.customizeSpacing}
                    onChange={(checked) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        title: {
                          ...p.title,
                          spacing: {
                            ...p.title.spacing,
                            customizeSpacing: checked,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Space between label and ...
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={
                    generalSettings.title.spacing.spaceBetweenLabelAndValue
                  }
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      title: {
                        ...p.title,
                        spacing: {
                          ...p.title.spacing,
                          spaceBetweenLabelAndValue:
                            v ?? p.title.spacing.spaceBetweenLabelAndValue,
                        },
                      },
                    }))
                  }
                  addonAfter="px"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Effects */}
      <ConfigSection
        title="Effects"
        isExpanded={generalExpandedSections.effects}
        onToggle={() => handleToggleGeneralSection("effects")}
      >
        <div className="properties-container">
          {/* Background */}
          <ConfigSection
            title="Background"
            isExpanded={generalExpandedSections.background}
            onToggle={() => handleToggleGeneralSection("background")}
            hasToggle
            toggleValue={generalSettings.effects.background.enabled}
            onToggleChange={(checked) =>
              setGeneralSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  background: { ...p.effects.background, enabled: checked },
                },
              }))
            }
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Color</Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.effects.background.color}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        effects: {
                          ...p.effects,
                          background: { ...p.effects.background, color },
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
                  Transparency
                </Typography.Text>
                <div className="transparency-control">
                  <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    value={generalSettings.effects.background.transparency}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        effects: {
                          ...p.effects,
                          background: {
                            ...p.effects.background,
                            transparency: v || 0,
                          },
                        },
                      }))
                    }
                    style={{ width: 60 }}
                    formatter={(val) => `${val}%`}
                    parser={(val) => Number(val!.replace("%", ""))}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={generalSettings.effects.background.transparency}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        effects: {
                          ...p.effects,
                          background: {
                            ...p.effects.background,
                            transparency: v,
                          },
                        },
                      }))
                    }
                    style={{ flex: 1, marginLeft: 8 }}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Visual border */}
          <ConfigSection
            title="Visual border"
            isExpanded={generalExpandedSections.visualBorder}
            onToggle={() => handleToggleGeneralSection("visualBorder")}
            hasToggle
            toggleValue={generalSettings.effects.visualBorder.enabled}
            onToggleChange={(checked) =>
              setGeneralSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  visualBorder: { ...p.effects.visualBorder, enabled: checked },
                },
              }))
            }
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Color</Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.effects.visualBorder.color}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        effects: {
                          ...p.effects,
                          visualBorder: { ...p.effects.visualBorder, color },
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
                  Rounded corners
                </Typography.Text>
                <div className="rounded-corners-row">
                  <InputNumber
                    size="small"
                    value={generalSettings.effects.visualBorder.roundedCorners}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        effects: {
                          ...p.effects,
                          visualBorder: {
                            ...p.effects.visualBorder,
                            roundedCorners:
                              v ?? p.effects.visualBorder.roundedCorners,
                          },
                        },
                      }))
                    }
                    addonAfter="px"
                    style={{ width: 80 }}
                    min={0}
                  />
                  <div className="effects-indicator" />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Width</Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.effects.visualBorder.width}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      effects: {
                        ...p.effects,
                        visualBorder: {
                          ...p.effects.visualBorder,
                          width: v ?? p.effects.visualBorder.width,
                        },
                      },
                    }))
                  }
                  addonAfter="px"
                  style={{ width: "100%" }}
                  min={0}
                />
              </div>
            </div>
          </ConfigSection>

          {/* Shadow */}
          <ConfigSection
            title="Shadow"
            isExpanded={generalExpandedSections.shadow}
            onToggle={() => handleToggleGeneralSection("shadow")}
            hasToggle
            toggleValue={generalSettings.effects.shadow.enabled}
            onToggleChange={(checked) =>
              setGeneralSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  shadow: { ...p.effects.shadow, enabled: checked },
                },
              }))
            }
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Color</Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.effects.shadow.color}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        effects: {
                          ...p.effects,
                          shadow: { ...p.effects.shadow, color },
                        },
                      }))
                    }
                    size="small"
                    showLabel={false}
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Offset</Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.effects.shadow.offset}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      effects: {
                        ...p.effects,
                        shadow: { ...p.effects.shadow, offset: v },
                      },
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Outside">Outside</Select.Option>
                  <Select.Option value="Inside">Inside</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Position
                </Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.effects.shadow.position}
                  onChange={(v) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      effects: {
                        ...p.effects,
                        shadow: { ...p.effects.shadow, position: v },
                      },
                    }))
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Bottom right">
                    Bottom right
                  </Select.Option>
                  <Select.Option value="Bottom left">Bottom left</Select.Option>
                  <Select.Option value="Top right">Top right</Select.Option>
                  <Select.Option value="Top left">Top left</Select.Option>
                </Select>
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Data format */}
      <ConfigSection
        title="Data format"
        isExpanded={generalExpandedSections.dataFormat}
        onToggle={() => handleToggleGeneralSection("dataFormat")}
      >
        <div className="properties-container">
          <div className="form-group">
            <Typography.Text className="form-label">
              Apply settings to
            </Typography.Text>
            <Select
              size="small"
              value={generalSettings.dataFormat.applySettingsTo}
              onChange={(v) =>
                updateGeneralSetting("dataFormat", "applySettingsTo", v)
              }
              style={{ width: "100%" }}
            >
              <Select.Option value="Khu vực">Khu vực</Select.Option>
              <Select.Option value="Tất cả">Tất cả</Select.Option>
              <Select.Option value="Tùy chọn">Tùy chọn</Select.Option>
            </Select>
          </div>

          <ConfigSection
            title="Format options"
            isExpanded={generalExpandedSections.formatOptions}
            onToggle={() => handleToggleGeneralSection("formatOptions")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Format</Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.dataFormat.format}
                  onChange={(v) =>
                    updateGeneralSetting("dataFormat", "format", v)
                  }
                  style={{ width: "100%" }}
                  placeholder="Select format"
                >
                  <Select.Option value="General">General</Select.Option>
                  <Select.Option value="Number">Number</Select.Option>
                  <Select.Option value="Currency">Currency</Select.Option>
                  <Select.Option value="Percentage">Percentage</Select.Option>
                  <Select.Option value="Date">Date</Select.Option>
                  <Select.Option value="Custom">Custom</Select.Option>
                </Select>
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Header icons */}
      <ConfigSection
        title="Header icons"
        isExpanded={generalExpandedSections.headerIcons}
        onToggle={() => handleToggleGeneralSection("headerIcons")}
      >
        <div className="properties-container">
          {/* Colors */}
          <ConfigSection
            title="Colors"
            isExpanded={generalExpandedSections.headerIconsColors}
            onToggle={() => handleToggleGeneralSection("headerIconsColors")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  Background
                </Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.headerIcons.colors.background}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        headerIcons: {
                          ...p.headerIcons,
                          colors: {
                            ...p.headerIcons.colors,
                            background: color,
                          },
                        },
                      }))
                    }
                    size="small"
                    showLabel={false}
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Border</Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.headerIcons.colors.border}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        headerIcons: {
                          ...p.headerIcons,
                          colors: { ...p.headerIcons.colors, border: color },
                        },
                      }))
                    }
                    size="small"
                    showLabel={false}
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Icon</Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.headerIcons.colors.icon}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        headerIcons: {
                          ...p.headerIcons,
                          colors: { ...p.headerIcons.colors, icon: color },
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
                  Transparency
                </Typography.Text>
                <div className="transparency-control">
                  <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    value={generalSettings.headerIcons.colors.transparency}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        headerIcons: {
                          ...p.headerIcons,
                          colors: {
                            ...p.headerIcons.colors,
                            transparency: v || 0,
                          },
                        },
                      }))
                    }
                    style={{ width: 60 }}
                    formatter={(val) => `${val}%`}
                    parser={(val) => Number(val!.replace("%", ""))}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={generalSettings.headerIcons.colors.transparency}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        headerIcons: {
                          ...p.headerIcons,
                          colors: { ...p.headerIcons.colors, transparency: v },
                        },
                      }))
                    }
                    style={{ flex: 1, marginLeft: 8 }}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Icons */}
          <ConfigSection
            title="Icons"
            isExpanded={generalExpandedSections.headerIconsIcons}
            onToggle={() => handleToggleGeneralSection("headerIconsIcons")}
          >
            <div className="section-content">
              {Object.entries(generalSettings.headerIcons.icons).map(
                ([key, val]) => (
                  <div className="form-group" key={key}>
                    <div className="checkbox-row">
                      <Typography.Text className="checkbox-label">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (c) => c.toUpperCase())}
                      </Typography.Text>
                      <Switch
                        size="small"
                        checked={Boolean(val)}
                        onChange={(checked) =>
                          setGeneralSettings((p) => ({
                            ...p,
                            headerIcons: {
                              ...p.headerIcons,
                              icons: { ...p.headerIcons.icons, [key]: checked },
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Tooltips */}
      <ConfigSection
        title="Tooltips"
        isExpanded={generalExpandedSections.tooltips}
        onToggle={() => handleToggleGeneralSection("tooltips")}
        hasToggle
        toggleValue={true}
        onToggleChange={() => {}}
      >
        <div className="properties-container">
          {/* Content */}
          <ConfigSection
            title="Content"
            isExpanded={generalExpandedSections.tooltipsOptions}
            onToggle={() => handleToggleGeneralSection("tooltipsOptions")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  Text Content
                </Typography.Text>
                <TextArea
                  rows={4}
                  value={generalSettings.tooltips.options.text}
                  onChange={(e) =>
                    setGeneralSettings((p) => ({
                      ...p,
                      tooltips: {
                        ...p.tooltips,
                        options: { text: e.target.value },
                      },
                    }))
                  }
                  placeholder="Enter tooltip options text content..."
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </ConfigSection>

          {/* Text */}
          <ConfigSection
            title="Text"
            isExpanded={generalExpandedSections.tooltipsText}
            onToggle={() => handleToggleGeneralSection("tooltipsText")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Font</Typography.Text>
                <div className="font-controls">
                  <Select
                    size="small"
                    value={generalSettings.tooltips.text.font}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: { ...p.tooltips.text, font: v },
                        },
                      }))
                    }
                    style={{ width: 120 }}
                  >
                    <Select.Option value="Segoe UI">Segoe UI</Select.Option>
                    <Select.Option value="Arial">Arial</Select.Option>
                    <Select.Option value="Times New Roman">
                      Times New Roman
                    </Select.Option>
                    <Select.Option value="Calibri">Calibri</Select.Option>
                  </Select>
                  <InputNumber
                    size="small"
                    value={generalSettings.tooltips.text.fontSize}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: {
                            ...p.tooltips.text,
                            fontSize: v ?? p.tooltips.text.fontSize,
                          },
                        },
                      }))
                    }
                    style={{ width: 60 }}
                    min={8}
                    max={72}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="text-format-buttons">
                  <Button
                    size="small"
                    type={
                      generalSettings.tooltips.text.bold ? "primary" : "default"
                    }
                    icon={<Bold size={12} />}
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: {
                            ...p.tooltips.text,
                            bold: !p.tooltips.text.bold,
                          },
                        },
                      }))
                    }
                  />
                  <Button
                    size="small"
                    type={
                      generalSettings.tooltips.text.italic
                        ? "primary"
                        : "default"
                    }
                    icon={<Italic size={12} />}
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: {
                            ...p.tooltips.text,
                            italic: !p.tooltips.text.italic,
                          },
                        },
                      }))
                    }
                  />
                  <Button
                    size="small"
                    type={
                      generalSettings.tooltips.text.underline
                        ? "primary"
                        : "default"
                    }
                    icon={<Underline size={12} />}
                    onClick={() =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: {
                            ...p.tooltips.text,
                            underline: !p.tooltips.text.underline,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <Typography.Text className="form-label">
                  Label color
                </Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.tooltips.text.labelColor}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: { ...p.tooltips.text, labelColor: color },
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
                  Value color
                </Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.tooltips.text.valueColor}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: { ...p.tooltips.text, valueColor: color },
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
                  Drill text and icon color
                </Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.tooltips.text.drillTextAndIconColor}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          text: {
                            ...p.tooltips.text,
                            drillTextAndIconColor: color,
                          },
                        },
                      }))
                    }
                    size="small"
                    showLabel={false}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Background */}
          <ConfigSection
            title="Background"
            isExpanded={generalExpandedSections.tooltipsBackground}
            onToggle={() => handleToggleGeneralSection("tooltipsBackground")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Color</Typography.Text>
                <div className="color-picker-row">
                  <CustomColorPicker
                    label=""
                    value={generalSettings.tooltips.background.color}
                    onChange={(color) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          background: { ...p.tooltips.background, color },
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
                  Transparency
                </Typography.Text>
                <div className="transparency-control">
                  <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    value={generalSettings.tooltips.background.transparency}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          background: {
                            ...p.tooltips.background,
                            transparency: v || 0,
                          },
                        },
                      }))
                    }
                    style={{ width: 60 }}
                    formatter={(val) => `${val}%`}
                    parser={(val) => Number(val!.replace("%", ""))}
                  />
                  <Slider
                    min={0}
                    max={100}
                    value={generalSettings.tooltips.background.transparency}
                    onChange={(v) =>
                      setGeneralSettings((p) => ({
                        ...p,
                        tooltips: {
                          ...p.tooltips,
                          background: {
                            ...p.tooltips.background,
                            transparency: v,
                          },
                        },
                      }))
                    }
                    style={{ flex: 1, marginLeft: 8 }}
                  />
                </div>
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Reset */}
      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: 16, fontSize: 12, color: "#0078d4" }}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
};

export default GeneralConfigTab;
