export interface DataTabProps {
  chartType: string;
  rawData: any[];
  data: any[];
}

export type FieldItem = { id: number; field: string; action: string };

export type CategoryFields = {
  [key: string]: FieldItem[];
};
