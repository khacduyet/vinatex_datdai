import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { API } from 'src/app/services/host';
import { UploadmodalComponent } from '../uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-modalimportexcel',
  templateUrl: './modalimportexcel.component.html',
  styleUrls: ['./modalimportexcel.component.css']
})
export class ModalimportexcelComponent implements OnInit {
  TepImport: any = {
    TenGoc: ''
  }
  importFunc: any = '';
  mapTepMauURL:any={
    TinhTrangTaiSan:'upload/excel/Mẫu import excel danh mục chỉ có mã,tên,ghi chú.xlsx',
    BienDong:'upload/excel/Mẫu import excel danh mục chỉ có mã,tên,ghi chú.xlsx',
    MucDichSuDung:'upload/excel/Mẫu import excel danh mục chỉ có mã,tên,ghi chú.xlsx',
    CapHangCongTrinh:'upload/excel/Mẫu import excel danh mục chỉ có mã,tên,ghi chú.xlsx',
    HienTrangSuDung:'upload/excel/Mẫu import excel danh mục chỉ có mã,tên,ghi chú.xlsx',
    NguonGocDat:'upload/excel/Mẫu import excel danh mục chỉ có mã,tên,ghi chú.xlsx',
    DonViSoHuuNhaDat:'upload/excel/Mẫu import excel danh mục đơn vị sở hữu nhà đất.xlsx',
    DonVi:'upload/excel/Mẫu import excel danh mục đơn vị.xlsx',
    HinhThucXuLy:'upload/excel/Mẫu import excel danh mục hình thức xử lý.xlsx',
    TaiSan:'upload/excel/Mẫu import excel danh mục tài sản.xlsx',
    Tinh:'upload/excel/Mẫu import excel danh mục tỉnh.xlsx',
    Quan:'upload/excel/Mẫu import excel danh mục quận.xlsx',
    Phuong:'upload/excel/Mẫu import excel danh mục phường.xlsx'
  };
  constructor(private _modalActive: NgbActiveModal, private _modal: NgbModal, private _danhmuc: Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.TepImport.TenGui = data[data.length - 1].Name;
      this.TepImport.TenGoc = data[data.length - 1].NameLocal;
      this.TepImport.DuongDan = data[data.length - 1].Url;
    }, (reason) => {

    });
  }
  accept() {
    this._danhmuc.Importdm(this.importFunc, this.TepImport.TenGui).subscribe((res:any) => {
      if(res.State===1){
        this._modalActive.close({mess:'Cập nhật thành công!'})
      }else{
        this._toastr.error(res.message);
      }
    })
  }
  taiTepMau(){
    window.open(API.baseUrl+this.mapTepMauURL[this.importFunc]);
  }
}
