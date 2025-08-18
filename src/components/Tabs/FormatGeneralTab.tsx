import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Select,
  Button,
  Typography,
  InputNumber,
  Switch,
  ColorPicker,
  Slider,
  Space,
} from "antd";
import { Search, Bold, Italic, Underline, RotateCcw } from "lucide-react";
import { RootState } from "../../store/store";
import { toggleSection } from "../../store/chartSlice";

const { TextArea } = Input;

interface GeneralConfigTabProps {}

// ConfigSection component for collapsible sections
interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (checked: boolean) => void;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  children,
  isExpanded,
  onToggle,
  hasToggle = false,
  toggleValue = false,
  onToggleChange,
}) => {
  return (
    <div className="config-section">
      <div className="section-header" onClick={onToggle}>
        <div className="section-title-row">
          <Typography.Text className="section-title">{title}</Typography.Text>
          {hasToggle && (
            <Switch
              size="small"
              checked={toggleValue}
              onChange={(checked) => {
                onToggleChange?.(checked);
              }}
              onClick={(e: any) => e.stopPropagation()}
            />
          )}
        </div>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
          {isExpanded ? "−" : "+"}
        </span>
      </div>
      {isExpanded && <div className="section-body">{children}</div>}
    </div>
  );
};

export const GeneralConfigTab: React.FC<GeneralConfigTabProps> = () => {
  const dispatch = useDispatch();
  const expandedSections = useSelector(
    (state: RootState) => state.chart.expandedSections
  );

  const [generalSettings, setGeneralSettings] = useState({
    size: {
      height: 542,
      width: 595,
      lockAspectRatio: false,
    },
    position: {
      horizontal: 293,
      vertical: 82,
    },
    padding: {
      top: 0,
      right: 5,
      bottom: 5,
      left: 5,
    },
    advanced: {
      responsive: false,
      maintainLayerOrder: false,
    },
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
      spacing: {
        customizeSpacing: false,
        spaceBetweenLabelAndValue: 5,
      },
    },
    effects: {
      background: {
        enabled: true,
        color: "#ffffff",
        transparency: 0,
      },
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
    dataFormat: {
      applySettingsTo: "Khu vực",
      format: "",
    },
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
      options: {
        text: "Report page settings and configurations...",
      },
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
      background: {
        color: "#ffffff",
        transparency: 0,
      },
    },
  });

  const [generalExpandedSections, setGeneralExpandedSections] = useState({
    // Main sections
    properties: false,
    title: false,
    effects: false,
    dataFormat: false,
    headerIcons: false,
    tooltips: false,

    // Properties sub-sections
    size: false,
    position: false,
    padding: false,
    advanced: false,

    // Title sub-sections
    titleSection: false,
    subtitle: false,
    divider: false,
    spacing: false,

    // Effects sub-sections
    background: false,
    visualBorder: false,
    shadow: false,

    // Data format sub-sections
    applySettingsTo: false,
    formatOptions: false,

    // Header icons sub-sections
    headerIconsColors: false,
    headerIconsIcons: false,

    // Tooltips sub-sections
    tooltipsOptions: false,
    tooltipsText: false,
    tooltipsBackground: false,
  });

  const updateGeneralSetting = (category: string, key: string, value: any) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleToggleGeneralSection = (section: string) => {
    setGeneralExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  return (
    <div className="general-config-tab general-tab">
      {/* Properties Section - Main Container */}
      <ConfigSection
        title="Properties"
        isExpanded={generalExpandedSections.properties}
        onToggle={() => handleToggleGeneralSection("properties")}
      >
        <div className="properties-container">
          {/* Size Sub-Section */}
          <ConfigSection
            title="Size"
            isExpanded={generalExpandedSections.size}
            onToggle={() => handleToggleGeneralSection("size")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">Height</Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.size.height}
                  onChange={(value) =>
                    updateGeneralSetting("size", "height", value)
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">Width</Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.size.width}
                  onChange={(value) =>
                    updateGeneralSetting("size", "width", value)
                  }
                  style={{ width: "100%" }}
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
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Position Sub-Section */}
          <ConfigSection
            title="Position"
            isExpanded={generalExpandedSections.position}
            onToggle={() => handleToggleGeneralSection("position")}
          >
            <div className="section-content">
              <div className="form-group">
                <Typography.Text className="form-label">
                  Horizontal
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.position.horizontal}
                  onChange={(value) =>
                    updateGeneralSetting("position", "horizontal", value)
                  }
                  style={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Vertical
                </Typography.Text>
                <InputNumber
                  size="small"
                  value={generalSettings.position.vertical}
                  onChange={(value) =>
                    updateGeneralSetting("position", "vertical", value)
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </ConfigSection>

          {/* Padding Sub-Section */}
          <ConfigSection
            title="Padding"
            isExpanded={generalExpandedSections.padding}
            onToggle={() => handleToggleGeneralSection("padding")}
          >
            <div className="section-content">
              <div className="padding-grid">
                <div className="padding-row">
                  <div className="padding-input-wrapper">
                    <InputNumber
                      size="small"
                      value={generalSettings.padding.top}
                      onChange={(value) =>
                        updateGeneralSetting("padding", "top", value)
                      }
                      addonAfter="px"
                      style={{ width: "70px" }}
                    />
                  </div>
                </div>
                <div className="padding-row">
                  <div className="padding-input-wrapper">
                    <InputNumber
                      size="small"
                      value={generalSettings.padding.left}
                      onChange={(value) =>
                        updateGeneralSetting("padding", "left", value)
                      }
                      addonAfter="px"
                      style={{ width: "70px" }}
                    />
                  </div>
                  <div className="padding-center">
                    <div className="padding-visual">
                      <div className="padding-box"></div>
                    </div>
                  </div>
                  <div className="padding-input-wrapper">
                    <InputNumber
                      size="small"
                      value={generalSettings.padding.right}
                      onChange={(value) =>
                        updateGeneralSetting("padding", "right", value)
                      }
                      addonAfter="px"
                      style={{ width: "70px" }}
                    />
                  </div>
                </div>
                <div className="padding-row">
                  <div className="padding-input-wrapper">
                    <InputNumber
                      size="small"
                      value={generalSettings.padding.bottom}
                      onChange={(value) =>
                        updateGeneralSetting("padding", "bottom", value)
                      }
                      addonAfter="px"
                      style={{ width: "70px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Advanced Options Sub-Section */}
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
                  />
                </div>
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Title Section - Main Container */}
      <ConfigSection
        title="Title"
        isExpanded={generalExpandedSections.title}
        onToggle={() => handleToggleGeneralSection("title")}
      >
        <div className="properties-container">
          {/* Title Subsection */}
          <ConfigSection
            title="Title"
            isExpanded={generalExpandedSections.titleSection}
            onToggle={() => handleToggleGeneralSection("titleSection")}
            hasToggle={true}
            toggleValue={generalSettings.title.title.enabled}
            onToggleChange={(checked) =>
              updateGeneralSetting("title", "title", {
                ...generalSettings.title.title,
                enabled: checked,
              })
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        text: e.target.value,
                      })
                    }
                    style={{ flex: 1 }}
                  />
                  <Button size="small" icon={<Search size={12} />} />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Heading
                </Typography.Text>
                <Select
                  size="small"
                  value={generalSettings.title.title.heading}
                  onChange={(value) =>
                    updateGeneralSetting("title", "title", {
                      ...generalSettings.title.title,
                      heading: value,
                    })
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
                    onChange={(value) =>
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        font: value,
                      })
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
                    onChange={(value) =>
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        fontSize: value,
                      })
                    }
                    style={{ width: "60px" }}
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        bold: !generalSettings.title.title.bold,
                      })
                    }
                  />
                  <Button
                    size="small"
                    type={
                      generalSettings.title.title.italic ? "primary" : "default"
                    }
                    icon={<Italic size={12} />}
                    onClick={() =>
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        italic: !generalSettings.title.title.italic,
                      })
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        underline: !generalSettings.title.title.underline,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Text color
                </Typography.Text>
                <Space align="center">
                  <ColorPicker
                    size="small"
                    value={generalSettings.title.title.textColor}
                    onChange={(color) =>
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        textColor: color.toHexString(),
                      })
                    }
                  />
                  <Typography.Text code style={{ fontSize: "12px" }}>
                    {generalSettings.title.title.textColor}
                  </Typography.Text>
                </Space>
              </div>
              <div className="form-group">
                <Typography.Text className="form-label">
                  Background color
                </Typography.Text>
                <Space align="center">
                  <ColorPicker
                    size="small"
                    value={generalSettings.title.title.backgroundColor}
                    onChange={(color) =>
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        backgroundColor: color.toHexString(),
                      })
                    }
                  />
                  <Typography.Text code style={{ fontSize: "12px" }}>
                    {generalSettings.title.title.backgroundColor}
                  </Typography.Text>
                </Space>
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        horizontalAlignment: "left",
                      })
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        horizontalAlignment: "center",
                      })
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        horizontalAlignment: "right",
                      })
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
                      updateGeneralSetting("title", "title", {
                        ...generalSettings.title.title,
                        textWrap: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </ConfigSection>

          {/* Effects Section - Simplified */}
          <ConfigSection
            title="Effects"
            isExpanded={generalExpandedSections.effects}
            onToggle={() => handleToggleGeneralSection("effects")}
          >
            <div className="properties-container">
              <div className="form-group">
                <Typography.Text className="form-label">
                  Background
                </Typography.Text>
                <Space align="center">
                  <ColorPicker
                    size="small"
                    value={generalSettings.effects.background.color}
                    onChange={(color) =>
                      updateGeneralSetting("effects", "background", {
                        ...generalSettings.effects.background,
                        color: color.toHexString(),
                      })
                    }
                  />
                  <Typography.Text code style={{ fontSize: "12px" }}>
                    {generalSettings.effects.background.color}
                  </Typography.Text>
                  <Typography.Text>Transparency:</Typography.Text>
                  <div className="transparency-control">
                    <InputNumber
                      size="small"
                      min={0}
                      max={100}
                      value={generalSettings.effects.background.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("effects", "background", {
                          ...generalSettings.effects.background,
                          transparency: value || 0,
                        })
                      }
                      style={{ width: "60px" }}
                      formatter={(value) => `${value}%`}
                      parser={(value) => Number(value!.replace("%", ""))}
                    />
                    <Slider
                      min={0}
                      max={100}
                      value={generalSettings.effects.background.transparency}
                      onChange={(value) =>
                        updateGeneralSetting("effects", "background", {
                          ...generalSettings.effects.background,
                          transparency: value,
                        })
                      }
                      style={{ flex: 1, marginLeft: "8px" }}
                    />
                  </div>
                </Space>
              </div>
            </div>
          </ConfigSection>
        </div>
      </ConfigSection>

      {/* Reset to default */}
      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: "16px", fontSize: "12px", color: "#0078d4" }}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
};

export default GeneralConfigTab;
