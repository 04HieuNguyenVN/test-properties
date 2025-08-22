import React from "react";
import { Button } from "antd";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGeneralSettings } from "./hooks/useGeneralSettings";
import ConfigSection from "./common/ConfigSection";

// Properties
import SizeSection from "./panels/properties/SizeSection";
import PositionSection from "./panels/properties/PositionSection";
import PaddingSection from "./panels/properties/PaddingSection";
import AdvancedOptionsSection from "./panels/properties/AdvancedOptionsSection";

// Title
import TitleSection from "./panels/title/TitleSection";
import SubtitleSection from "./panels/title/SubtitleSection";
import DividerSection from "./panels/title/DividerSection";
import SpacingSection from "./panels/title/SpacingSection";

// Effects
import BackgroundSection from "./panels/effects/BackgroundSection";
import VisualBorderSection from "./panels/effects/VisualBorderSection";
import ShadowSection from "./panels/effects/ShadowSection";

// Header Icons
import HeaderColorsSection from "./panels/headericons/ColorsSection";
import HeaderIconsSection from "./panels/headericons/IconsSection";

// Tooltips
import TooltipContentSection from "./panels/tooltips/ContentSection";
import TooltipTextSection from "./panels/tooltips/TextSection";
import TooltipBackgroundSection from "./panels/tooltips/BackgroundSection";

const GeneralConfigTab: React.FC = () => {
  const { t } = useTranslation("generalTab");
  const { settings, setSettings, expanded, toggle, update } =
    useGeneralSettings();

  return (
    <div className="general-config-tab general-tab">
      {/* Properties */}
      <ConfigSection
        title={"properties.title"}
        isExpanded={expanded.properties}
        onToggle={() => toggle("properties")}
      >
        <div className="properties-container">
          <SizeSection
            settings={settings}
            update={update}
            expanded={expanded}
            toggle={toggle}
          />
          <PositionSection
            settings={settings}
            update={update}
            expanded={expanded}
            toggle={toggle}
          />
          <PaddingSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <AdvancedOptionsSection
            settings={settings}
            update={update}
            expanded={expanded}
            toggle={toggle}
          />
        </div>
      </ConfigSection>

      {/* Title */}
      <ConfigSection
        title={"title.sectionTitle"}
        isExpanded={expanded.title}
        onToggle={() => toggle("title")}
      >
        <div className="properties-container">
          <TitleSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <SubtitleSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <DividerSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <SpacingSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
        </div>
      </ConfigSection>

      {/* Effects */}
      <ConfigSection
        title={"effects.title"}
        isExpanded={expanded.effects}
        onToggle={() => toggle("effects")}
      >
        <div className="properties-container">
          <BackgroundSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <VisualBorderSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <ShadowSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
        </div>
      </ConfigSection>

      {/* Data format */}
      <ConfigSection
        title={"dataFormat.title"}
        isExpanded={expanded.dataFormat}
        onToggle={() => toggle("dataFormat")}
      >
        <div className="properties-container">
          <AdvancedOptionsSection.DataFormatRoot
            settings={settings}
            update={update}
          />
        </div>
      </ConfigSection>

      {/* Header icons */}
      <ConfigSection
        title={"headerIcons.title"}
        isExpanded={expanded.headerIcons}
        onToggle={() => toggle("headerIcons")}
      >
        <div className="properties-container">
          <HeaderColorsSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <HeaderIconsSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
        </div>
      </ConfigSection>

      {/* Tooltips */}
      <ConfigSection
        title={"tooltips.title"}
        isExpanded={expanded.tooltips}
        onToggle={() => toggle("tooltips")}
        hasToggle
        toggleValue={true}
      >
        <div className="properties-container">
          <TooltipContentSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <TooltipTextSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
          <TooltipBackgroundSection
            settings={settings}
            setSettings={setSettings}
            expanded={expanded}
            toggle={toggle}
          />
        </div>
      </ConfigSection>

      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: 16, fontSize: 12, color: "#0078d4" }}
        >
          {t("resetToDefault")}
        </Button>
      </div>
    </div>
  );
};

export default GeneralConfigTab;
