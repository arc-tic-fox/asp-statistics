import { DataModel } from './DataModel';

export interface FileDataModel {
  id: number;
  name: string;
  data: DataModel;
  uploadDate: string;
  isCurrent: boolean;
}
