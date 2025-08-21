import React from "react";
import { Divider } from "antd";
import { DataTabProps } from "./types";
import { useCategoryFields } from "./hooks/useCategoryFields";
import DataSourceSelector from "./components/DataSourceSelector";
import FieldCategoryBlock from "./components/FieldCategoryBlock";
import SimpleFieldSelector from "./components/SimpleFieldSelector";
import { getTableName } from "./utils/getTableName";

export const DataTab: React.FC<DataTabProps> = ({
  chartType,
  rawData,
  data,
}) => {
  const {
    dataSource,
    setDataSource,
    categoryFields,
    getAvailableFields,
    getFieldDisplayName,
    allowsAddingFieldsToCategory,
    addFieldToCategory,
    updateFieldInCategory,
  } = useCategoryFields(chartType, rawData);

  const tableName = getTableName(chartType);

  return (
    <div className="data-config-tab">
      <DataSourceSelector
        dataSource={dataSource}
        onChange={setDataSource}
        tableName={tableName}
      />

      <Divider style={{ margin: "12px 0" }} />

      <div className="field-categories">
        {getAvailableFields().map((fieldKey) => {
          const fieldsForCategory = categoryFields[fieldKey] || [];
          return (
            <FieldCategoryBlock
              key={fieldKey}
              fieldKey={fieldKey}
              title={getFieldDisplayName(fieldKey)}
              fields={fieldsForCategory}
              canAdd={allowsAddingFieldsToCategory(fieldKey)}
              onAdd={() => addFieldToCategory(fieldKey)}
              renderField={(field) => (
                <SimpleFieldSelector
                  key={field.id}
                  field={field}
                  category={fieldKey}
                  onUpdate={updateFieldInCategory}
                />
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
export default DataTab;
