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
  if (key === "xAxis") return t("hints.xAxis", "Chọn trường cho trục X");
  if (key === "yAxis" || key === "columnY")
    return t("hints.yAxis", "Chọn trường cho trục Y");
  if (key === "legend" || key === "columnLegend")
    return t("hints.legend", "Chọn trường để phân màu (legend)");
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
  const { t } = useTranslation("dataTab");
  return (
    <div className="field-category">
      <div className="category-header">
        <Tooltip title={tipFor(fieldKey, t)}>
          <Typography.Text className="category-title">
            {t(`groups.${fieldKey}`, title)}
          </Typography.Text>
        </Tooltip>
      </div>

      <div className="field-list">
        {fields.map(renderField)}

        {canAdd && (
          <div className="add-field-button">
            <Button
              title={t("addField", "Thêm trường mới vào nhóm")}
              type="dashed"
              icon={<Plus size={14} />}
              onClick={onAdd}
              block
              size="small"
            >
              {t("addField", "Add field")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldCategoryBlock;
