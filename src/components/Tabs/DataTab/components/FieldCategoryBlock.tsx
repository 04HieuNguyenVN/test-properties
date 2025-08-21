import React from "react";
import { Typography, Tooltip, Button } from "antd";
import { Plus } from "lucide-react";
import type { FieldItem } from "../types";

type Props = {
  fieldKey: string;
  title: string;
  fields: FieldItem[];
  canAdd: boolean;
  onAdd: () => void;
  renderField: (field: FieldItem) => React.ReactNode;
};

const tipFor = (key: string): string | undefined => {
  if (key === "xAxis") return "Chọn trường dữ liệu cho trục X";
  if (key === "yAxis" || key === "columnY")
    return "Chọn trường dữ liệu cho trục Y";
  if (key === "legend" || key === "columnLegend")
    return "Chọn trường dữ liệu để phân biệt màu sắc (legend)";
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
  return (
    <div className="field-category">
      <div className="category-header">
        <Tooltip title={tipFor(fieldKey)}>
          <Typography.Text className="category-title">{title}</Typography.Text>
        </Tooltip>
      </div>

      <div className="field-list">
        {fields.map(renderField)}

        {canAdd && (
          <div className="add-field-button">
            <Button
              title="Thêm trường mới vào nhóm"
              type="dashed"
              icon={<Plus size={14} />}
              onClick={onAdd}
              block
              size="small"
            >
              Add field
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldCategoryBlock;
