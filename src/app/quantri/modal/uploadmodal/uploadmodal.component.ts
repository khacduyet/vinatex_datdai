import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-uploadmodal',
  templateUrl: './uploadmodal.component.html',
  styleUrls: ['./uploadmodal.component.css']
})
export class UploadmodalComponent implements OnInit {
  uploader: FileUploader;
  type:string;
  single:boolean;
  private newfileinfo: any = [];

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    let option:FileUploaderOptions = {
      // http://serverduan:2626/SmartEOSAPI/FileUploader/Post
      // ${this.DsdanhmucService.upload}HRMAPI/UploadFile/Post
      url: `${API.uploadURL}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: false,
    }
    if(this.type==='image'){
      option.allowedFileType=['image']
    }
    this.uploader = new FileUploader(option);
    
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = true;
    };     
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
  }
 
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {

  }

  onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    let res = JSON.parse(response);
    this.newfileinfo.push(res[0]);    
  };

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }

  Onclose() {
    this.activeModal.close(
      this.newfileinfo
    );
  }

  Ondismiss() {
    this.activeModal.dismiss();
  }
}
