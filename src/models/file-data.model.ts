import { DataModel } from './data.model';

export interface FileDataModel {
  id: number;
  name: string;
  data: DataModel[];
  uploadDate: string;
  isCurrent: boolean;
}
