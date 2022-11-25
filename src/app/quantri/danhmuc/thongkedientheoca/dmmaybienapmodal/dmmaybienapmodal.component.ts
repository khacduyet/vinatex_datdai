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
  selector: 'app-dmmaybienapmodal',
  templateUrl: './dmmaybienapmodal.component.html',
  styleUrls: ['./dmmaybienapmodal.component.css']
})
export class DmmaybienapmodalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  listnhamay: any = [];
  listphanxuong: any = [];
  listdienap: any = [];
  khongclicknhieu: any = false;

  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.opt == 'edit') {
      this.GetPhanXuong();
    }
    this.GetDanhSachLoaiDienKV();
  }

  GetPhanXuong() {
    this.sanXuatService.GetOptions().GetPhanXuong(this.item.idNhaMay).subscribe((res: any) => {
      this.listphanxuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetDanhSachLoaiDienKV() {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
    };
    this.sanXuatService.dmLoaiDienKV().GetList(data).subscribe((res: any) => {
      this.listdienap = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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
    this.sanXuatService.DMMayBienAp().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.activeModal.close(res.message);
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

}
