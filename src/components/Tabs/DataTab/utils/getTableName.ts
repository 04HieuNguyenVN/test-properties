export const getTableName = (
  chartType: string
): { name: string; i18nKey: string } => {
  if (chartType === "stackedColumn")
    return {
      name: "monthlyData",
      i18nKey: "dataTab.table.options.monthlyData",
    };
  if (chartType === "stackedBar")
    return {
      name: "stackedData",
      i18nKey: "dataTab.table.options.stackedData",
    };
  if (
    chartType === "clusteredColumn" ||
    chartType === "clusteredBar" ||
    chartType === "lineAndColumn" ||
    chartType === "line"
  )
    return {
      name: "monthlyData",
      i18nKey: "dataTab.table.options.monthlyData",
    };
  if (chartType === "pie")
    return { name: "categories", i18nKey: "dataTab.table.options.categories" };
  return { name: "data", i18nKey: "dataTab.table.options.data" };
};
