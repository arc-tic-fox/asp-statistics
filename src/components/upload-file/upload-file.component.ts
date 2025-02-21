import { Component } from '@angular/core';
import { FileUpload, FileUploadErrorEvent, FileUploadEvent } from 'primeng/fileupload';
import { FilesFacade } from '../../store/files';

@Component({
  selector: 'asp-upload-file',
  templateUrl: './upload-file.component.html',
  imports: [
    FileUpload,
  ]
})
export class UploadFileComponent {
  maxFileSize = 5 * 1024 * 1024;

  constructor(private fileFacade: FilesFacade) {  }

  uploadSuccess(event: FileUploadEvent): void {
    event.files[0].text().then((data) => {
      this.fileFacade.add(event.files[0].name, JSON.parse(data));
      console.log(JSON.parse(data));
    });
  }

  uploadError(event: FileUploadErrorEvent): void {
    console.log(event.error);
  }
}
