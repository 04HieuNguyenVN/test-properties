import React from "react";
import { Typography, Select, Tooltip } from "antd";
import { DATA_SOURCE_OPTIONS } from "../../../../constants";

type Props = {
  dataSource: string;
  onChange: (v: string) => void;
  tableName: string;
};

const DataSourceSelector: React.FC<Props> = ({
  dataSource,
  onChange,
  tableName,
}) => {
  return (
    <div className="data-source-section">
      <div className="source-table-row">
        <div className="selector-group">
          <Tooltip title="Chọn nguồn dữ liệu cho biểu đồ">
            <Typography.Text className="selector-label">
              Data source:
            </Typography.Text>
          </Tooltip>
          <Tooltip title="Chọn nguồn dữ liệu (API, file, v.v.)">
            <Select
              title="Chọn trường dữ liệu cho nhóm này"
              size="small"
              value={dataSource}
              onChange={onChange}
              style={{ width: "100%" }}
              options={DATA_SOURCE_OPTIONS}
            />
          </Tooltip>
        </div>
        <div className="selector-group">
          <Tooltip title="Tên bảng dữ liệu đang sử dụng cho biểu đồ">
            <Typography.Text className="selector-label">Table:</Typography.Text>
          </Tooltip>
          <Tooltip title="Bảng dữ liệu tương ứng với loại biểu đồ đang chọn">
            <Select
              title="Chọn hành động cho trường trong nhóm"
              size="small"
              value={tableName}
              style={{ width: "100%" }}
              disabled
              options={[{ label: tableName, value: tableName }]}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DataSourceSelector;
