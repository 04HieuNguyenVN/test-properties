import React from "react";
import { Select } from "antd";
import { FIELD_OPTIONS, FIELD_ACTION_OPTIONS } from "../../../../constants"; // Ensure this path is correct and the file exists
import type { FieldItem } from "../types";

type Props = {
  field: FieldItem;
  category: string;
  onUpdate: (
    category: string,
    fieldId: number,
    key: string,
    value: string
  ) => void;
};

const SimpleFieldSelector: React.FC<Props> = ({
  field,
  category,
  onUpdate,
}) => (
  <div className="simple-field-selector">
    <div className="selector-row">
      <div className="selector-group">
        <Select
          title="Chọn trường dữ liệu"
          size="small"
          value={field.field || undefined}
          onChange={(value) => onUpdate(category, field.id, "field", value)}
          style={{ width: "100%" }}
          placeholder="Select field"
          options={FIELD_OPTIONS}
          allowClear
        />
      </div>
      <div className="selector-group">
        <Select
          title="Chọn hành động cho trường"
          size="small"
          value={field.action || undefined}
          onChange={(value) => onUpdate(category, field.id, "action", value)}
          style={{ width: "100%" }}
          options={FIELD_ACTION_OPTIONS}
          placeholder="Select action"
          allowClear
        />
      </div>
    </div>
  </div>
);

export default SimpleFieldSelector;
