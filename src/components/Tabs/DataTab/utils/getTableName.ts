export const getTableName = (chartType: string): string => {
  if (chartType === "stackedColumn") return "monthlyData";
  if (chartType === "stackedBar") return "stackedData";
  if (
    chartType === "clusteredColumn" ||
    chartType === "clusteredBar" ||
    chartType === "lineAndColumn" ||
    chartType === "line"
  )
    return "monthlyData";
  if (chartType === "pie") return "categories";
  return "data";
};
