import React from "react";
import { Typography, Select, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { DATA_SOURCE_OPTIONS } from "../../../../constants";

type Props = {
  dataSource: string;
  onChange: (v: string) => void;
  tableName?: string;
  tableNames?: string[]; // thêm optional prop
  onTableChange?: (table?: string) => void;
};

const DataSourceSelector: React.FC<Props> = ({
  dataSource,
  onChange,
  tableName,
  tableNames = [], // fallback rỗng
  onTableChange,
}) => {
  const { t } = useTranslation("dataTab");

  const tableOptions =
    tableNames.length > 0
      ? tableNames.map((name) => ({
          label: t(`table.options.${name}`, name),
          value: name,
        }))
      : [
          {
            label: t(`table.options.${tableName || ""}`, tableName || ""),
            value: tableName || "",
          },
        ];
  // Insert an explicit empty option at the top so Select can be empty on init
  const tableOptionsWithEmpty = [
    { label: t("table.options.none", "(Không chọn)"), value: "" },
    ...tableOptions,
  ];

  return (
    <div className="data-source-section">
      <div className="source-table-row">
        <div className="selector-group">
          <Tooltip
            title={t("dataSource.tooltip", "Chọn nguồn dữ liệu cho biểu đồ")}
          >
            <Typography.Text className="selector-label">
              {t("dataSource.label", "Data source:")}
            </Typography.Text>
          </Tooltip>
          <Tooltip
            title={t(
              "dataSource.selectTooltip",
              "Chọn nguồn dữ liệu (API, file, v.v.)"
            )}
          >
            <Select
              title={t(
                "dataSource.selectTitle",
                "Chọn trường dữ liệu cho nhóm này"
              )}
              size="small"
              value={dataSource}
              onChange={onChange}
              style={{ width: "100%" }}
              disabled
              options={DATA_SOURCE_OPTIONS.map((opt) => ({
                ...opt,
                label: t(
                  `dataSource.options.${opt.value}`,
                  opt.label || opt.value
                ),
              }))}
              placeholder={t(
                "dataSource.selectPlaceholder",
                "Chọn nguồn dữ liệu"
              )}
            />
          </Tooltip>
        </div>

        <div className="selector-group">
          <Tooltip
            title={t(
              "table.tooltip",
              "Tên bảng dữ liệu đang sử dụng cho biểu đồ"
            )}
          >
            <Typography.Text className="selector-label">
              {t("table.label", "Table:")}
            </Typography.Text>
          </Tooltip>
          <Tooltip
            title={t(
              "table.selectTooltip",
              "Bảng dữ liệu tương ứng với loại biểu đồ đang chọn"
            )}
          >
            <Select
              title={t(
                "table.selectTitle",
                "Chọn hành động cho trường trong nhóm"
              )}
              size="small"
              value={tableName || undefined}
              style={{ width: "100%" }}
              options={tableOptionsWithEmpty}
              onChange={(v) =>
                onTableChange && onTableChange(v ? String(v) : undefined)
              }
              placeholder={t("table.selectPlaceholder", "Chọn bảng dữ liệu")}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DataSourceSelector;
