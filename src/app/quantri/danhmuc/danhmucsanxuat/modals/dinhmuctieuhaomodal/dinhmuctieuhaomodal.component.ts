import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dinhmuctieuhaomodal',
  templateUrl: './dinhmuctieuhaomodal.component.html',
  styleUrls: ['./dinhmuctieuhaomodal.component.css']
})
export class DinhmuctieuhaomodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listCongDoan: any = [];
  listLoaiSoi: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.getListItemDinhMuc();
      this.item.HoatDong = true;
    }
    this.getListLoaiSoi();
    this.getListMatHang();
    this.getListPhanXuong();
    console.log(this.item)
  }

  getListLoaiSoi() {
    this.services.GetListOptdmLoaiSoi().subscribe((res: any) => {
      this.listLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListMatHang() {
    var data: any = {};
    data.CurrentPage = 0;
    data.Loai = 1;
    this.services.GetListdmItem(data).subscribe((res: any) => {
      this.listItem = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;// && this.item.MaDinhMuc.trim() !== ''
    if (this.item.MaDinhMuc !== undefined) {
      this.services.SetDinhMuc(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message)
          }
        }
      })
    } 
    else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  getListItemDinhMuc() {
    this.services.KhoiTaoItem().subscribe((res: any) => {
      this.item.listItem = res;
    })
  }
  getListPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
