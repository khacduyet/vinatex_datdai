import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { API } from 'src/app/services/host';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-crud-so-do',
  templateUrl: './crud-so-do.component.html',
  styleUrls: ['./crud-so-do.component.css']
})
export class CrudSoDoComponent implements OnInit,DoCheck {
  @Input('BanVe') BanVe:Array<any>=[];
  @Output('BanVe') banVeChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('opt') opt:string='';
  public prefix= API.imgURL;
  images: any = [];
  show:boolean=true;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  constructor() {
    this.uploader = new FileUploader({
      // http://serverduan:2626/SmartEOSAPI/FileUploader/Post
      // ${this.DsdanhmucService.upload}HRMAPI/UploadFile/Post
      url: `${API.uploadURL}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: false,
    });
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = true;
    };     
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
    this.uploader.onCompleteAll = () => this.onCompleteAll();
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {

  }

  onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    let res = JSON.parse(response);
    res[0].ID = 0;
    res[0].TenGui = res[0].Name;
    res[0].TenGoc = res[0].NameLocal;
    res[0].DuongDan = res[0].Url;
    if(this.opt!==''){
      res[0].NoiLuuTruGoc=null;
    }
    res[0].imgURL = this.prefix+res[0].Url+'&viewOnly=true';
    this.BanVe.push(res[0]);    
    console.log(this.BanVe);

  };
  onCompleteAll(){
    this.show=true;
    this.uploader.clearQueue();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  ngOnInit(): void {
    this.BanVe.forEach(el=>{
      el.imgURL = this.prefix+el.Link+'&viewOnly=true';
    })
  }
  ngDoCheck():void{
    this.banVeChange.emit(this.BanVe);
  }
  open(URL){
    window.open(URL);
  }
  delete(i) {
    this.show = false;
    let item = this.BanVe.splice(i, 1)[0];
    if(item.ID===0){

    }else{
      item.isXoa = true;
    this.BanVe.push(JSON.parse(JSON.stringify(item)));
    }
    this.show = true;
  }
}
