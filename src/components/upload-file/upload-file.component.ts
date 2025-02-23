import { Component } from '@angular/core';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { FilesFacade } from '../../store/files';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'asp-upload-file',
  templateUrl: './upload-file.component.html',
  imports: [
    FileUpload,
    Toast,
  ],
  providers: [MessageService],
})
export class UploadFileComponent {
  maxFileSize = 5 * 1024 * 1024;

  constructor(
    private fileFacade: FilesFacade,
    private messageService: MessageService,
  ) {  }

  upload(event: FileUploadEvent): void {
    event.files[0].text()
      .then((data) => {
        this.fileFacade.add(event.files[0].name, JSON.parse(data));
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
      })
      .catch(() => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Is not JSON file!', life: 3000 });
      });
  }

  error(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!', life: 3000 });
  }
}
