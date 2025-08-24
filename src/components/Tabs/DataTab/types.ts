// Tabs/DataTab/types.ts
export interface DataTabProps {
  chartType: string;
  rawData: any[];
  data: any[];
  value?: DataConfigState;
  onChange?: (next: DataConfigState) => void;
  tableNames?: string[]; // thêm dòng này
}

export type FieldItem = { id: number; field: string; action: string };

export type CategoryFields = {
  [key: string]: FieldItem[];
};

/** Trạng thái cấu hình dữ liệu mà Provider sẽ lắng nghe */
export interface DataConfigState {
  dataSource: string;
  categoryFields: CategoryFields;
  tableName?: string; // tên bảng đang chọn (vd: 'monthlyData')
}
