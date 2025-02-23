import { DataModel } from './data.model';
import { FilterDataModel } from './filter-data.model';

export interface FileDataModel {
  id: number;
  name: string;
  data: DataModel[];
  filters: FilterDataModel;
  uploadDate: string;
  isCurrent: boolean;
}
