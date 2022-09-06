/* eslint-disable @typescript-eslint/no-explicit-any */
export type entityViewMode = 'list' | 'detail';
export interface EntityListConfiguration {
  title?: string;
  listUrl?: string;
  newUrl?: string;
  detailUrl: string;
  detailId: string;
  sideComponent?: any;
  visibleColumn: Column[];
  primaryColumn?: Column;
  actions?: string[];
  filter?: Filter[][];
  // order?: Order[];
  routing?(data: any): void;
  newAction?(data: any): void;
}

// export interface ActionMenu {
//   name: string;
//   icon?: string;
//   action: any;
// }

export interface Column {
  name?: string;
  key: string | string[];
  isDate?: boolean;
  isNumber?: boolean;
  isBoolean?: boolean;
  hasLocal?: boolean;
  isTranslate?: boolean;
  hasChilde?: boolean;
}

// export interface Order {
//   field: string;
//   direction?: 'asc' | 'desc';
// }

export interface Filter {
  field: string;
  fieldName: string;
  value: any;
  operator?: string;
  name?: string;
}

export const PageSizeOptions = [
  { value: '5', label: '5 / page' },
  { value: '10', label: '10 / page' },
  { value: '15', label: '15 / page' },
  { value: '20', label: '20 / page' },
  { value: '30', label: '30 / page' },
  { value: '40', label: '40 / page' },
];
