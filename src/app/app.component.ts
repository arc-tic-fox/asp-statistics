import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadFileComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
