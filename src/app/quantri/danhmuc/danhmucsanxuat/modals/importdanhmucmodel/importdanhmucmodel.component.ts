import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { API } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-importdanhmucmodel',
  templateUrl: './importdanhmucmodel.component.html',
  styleUrls: ['./importdanhmucmodel.component.css']
})
export class ImportdanhmucmodelComponent implements OnInit {
  TepImport: any = {
    TenGoc: ''
  }
  importFunc: any = '';
  mapTepMauURL: any = {
  };
  Name: any = '';
  Loai: any = '';
  uploader: FileUploader;
  data: any = {};
  IdDuAn: any;
  constructor(private _modalActive: NgbActiveModal, private _modal: NgbModal,
    private service: SanXuatService, private _toastr: ToastrService, private store: StoreService) { }
  ngOnInit(): void {
    this.IdDuAn = this.store.getCurrent();
    let option: FileUploaderOptions = {
      url: `${API.uploadURL}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: true,
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
    console.log(res)
    this.TepImport.TenGui = res[0].Name;
    this.TepImport.TenGoc = res[0].NameLocal;
    this.TepImport.DuongDan = res[0].Url;
  };
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }
  accept() {
    if(this.Name == 'dinhmuctieuchichatluongsoi'){
      this.service.ImportDanhSachChiTieuChatLuongTheoSanPham(this.IdDuAn, '', this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else{
      this.service.Importdm(this.importFunc, this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }    
  }
  acceptThongSoChatLuong() {
    if(this.Loai == 'MIC'){
      this.service.PhieuNhapLoBong_ChatLuong().Import_Mic(this.data.Id, this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else{
      this.service.PhieuNhapLoBong_ChatLuong().Import(this.data.Id, this.TepImport.TenGui).subscribe((res: any) => {
      if (res.State === 1) {
        this._modalActive.close({ mess: 'Cập nhật thành công!' })
      } else {
        this._toastr.error(res.message);
      }
    })
    }
    
  } 

  taiTepMau() {
    window.open(API.baseUrl + this.mapTepMauURL[this.importFunc]);
  }
}
