import React from "react";
import { Typography, Tooltip, Button } from "antd";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FieldItem } from "../types";

type Props = {
  fieldKey: string;
  title: string;
  fields: FieldItem[];
  canAdd: boolean;
  onAdd: () => void;
  renderField: (field: FieldItem) => React.ReactNode;
};

const tipFor = (key: string, t: any): string | undefined => {
  if (key === "xAxis")
    return t("dataTab.xAxis.tooltip", {
      defaultValue: "Chọn trường dữ liệu cho trục X",
    });
  if (key === "yAxis" || key === "columnY")
    return t("dataTab.yAxis.tooltip", {
      defaultValue: "Chọn trường dữ liệu cho trục Y",
    });
  if (key === "legend" || key === "columnLegend")
    return t("dataTab.legend.tooltip", {
      defaultValue: "Chọn trường dữ liệu để phân biệt màu sắc (legend)",
    });
  return undefined;
};

const FieldCategoryBlock: React.FC<Props> = ({
  fieldKey,
  title,
  fields,
  canAdd,
  onAdd,
  renderField,
}) => {
  const { t } = useTranslation();
  return (
    <div className="field-category">
      <div className="category-header">
        <Tooltip title={tipFor(fieldKey, t)}>
          <Typography.Text className="category-title">
            {t(`dataTab.fieldCategory.${fieldKey}`, title)}
          </Typography.Text>
        </Tooltip>
      </div>

      <div className="field-list">
        {fields.map(renderField)}

        {canAdd && (
          <div className="add-field-button">
            <Button
              title={t("dataTab.addField.title", "Thêm trường mới vào nhóm")}
              type="dashed"
              icon={<Plus size={14} />}
              onClick={onAdd}
              block
              size="small"
            >
              {t("dataTab.addField.label", "Add field")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldCategoryBlock;
