import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmtieuchichatluongsoimodal',
  templateUrl: './dmtieuchichatluongsoimodal.component.html',
  styleUrls: ['./dmtieuchichatluongsoimodal.component.css']
})
export class DmtieuchichatluongsoimodalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  cols: any = [
    {
      header: 'Tên sản phẩm',
      field: 'Ma',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tiêu chuẩn',
      field: 'Ten',
      width: 'unset',
      center: 'left'
    },
  ];
  listdungsai: any = [];
  khongclicknhieu: any = false;

  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.opt == 'edit') {
      // this.GetPhanXuong();
    }
    // this.GetDanhSachLoaiDienKV();
  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }

  Save() {
    this.sanXuatService.dmTieuChiChatLuongsoi().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.success(res.message);
      this.activeModal.close();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

  IPIorUsterstatic(e, string) {
    if (string == 'isLoaiChiTieuIPI')
      this.item.isLoaiChiTieuUsterstatic = !e.checked;
    else
      this.item.isLoaiChiTieuIPI = !e.checked;
  }

}
