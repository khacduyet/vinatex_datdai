import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadmodalComponent } from '../uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { Dat09Service } from 'src/app/services/callApi';

@Component({
  selector: 'app-modal-gia-dat',
  templateUrl: './modal-gia-dat.component.html',
  styleUrls: ['./modal-gia-dat.component.css']
})
export class ModalGiaDatComponent implements OnInit {
  opt: any = 'edit';
  IDTaiSan: any = 0;
  LoaiGiaDat: any = ''
  newItem: any = {
    ID: 0,
    FileDinhKem: {}
  };
  listDonVi: any = [
  ]
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 20)}:${((new Date()).getFullYear() + 20)}`;
  item: any = {};
  listGiaDat: any = [];

  constructor(private _modal: NgbModal, private activeModal: NgbActiveModal, private _toastr: ToastrService, private _service: Dat09Service) { }

  ngOnInit(): void {
    this.lang = vn;
    this.yearRange = `${((new Date()).getFullYear() - 20)}:${((new Date()).getFullYear() + 20)}`;
    this.listGiaDat.forEach(ele => {
      if (validVariable(ele.TuNgayUnix) && ele.TuNgayUnix !== 0) {
        ele.TuNgay = UnixToDate(ele.TuNgayUnix);
      }
      if (validVariable(ele.DenNgayUnix) && ele.DenNgayUnix !== 0) {
        ele.DenNgay = UnixToDate(ele.DenNgayUnix);
      }
    });
    this.GetListdmDonViTien()
    this.newItem.LoaiGiaDat = this.LoaiGiaDat;
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.item.ID = 0;
      this.item.TenGui = data[data.length - 1].Name;
      this.item.TenGoc = data[data.length - 1].NameLocal;
      this.item.DuongDan = data[data.length - 1].Url;
      this.newItem.FileDinhKem = this.item;
    }, (reason) => {

    });
  }
  getTenDonViTien(Id) {
    return this.listDonVi.find(ele => ele.Id === Id)?.Ten;
  }
  GetListdmDonViTien() {
    this._service.GetListdmDonViTien().subscribe((res: Array<any>) => {
      this.listDonVi = res.map(ele => {
        return {
          value: ele.ID,
          label: ele.Ten
        }
      })
    })
  }
  add() {
    if (validVariable(this.newItem.TuNgay)) {
      this.newItem.TuNgayUnix = DateToUnix(this.newItem.TuNgay);
    }
    if (validVariable(this.newItem.DenNgay)) {
      this.newItem.DenNgayUnix = DateToUnix(this.newItem.DenNgay);
    }
    let trung = this.LoaiGiaDat === 'GIA_DAT_THAM_KHAO' ? this.listGiaDat.filter(ele => ele.Nam === this.newItem.Nam && ele.LoaiGiaDat == this.newItem.LoaiGiaDat)[0] : this.listGiaDat.filter(ele => ((ele.TuNgayUnix <= this.newItem.TuNgayUnix && ele.DenNgayUnix >= this.newItem.TuNgayUnix)
      || (ele.TuNgayUnix <= this.newItem.DenNgayUnix && ele.DenNgayUnix >= this.newItem.DenNgayUnix)
      || (ele.TuNgayUnix <= this.newItem.TuNgayUnix && ele.DenNgayUnix >= this.newItem.DenNgayUnix))
      && ele.LoaiGiaDat == this.newItem.LoaiGiaDat)[0];
    if (trung !== undefined) {
      this._toastr.error(`Trùng ${this.LoaiGiaDat === 'GIA_DAT_THAM_KHAO' ? 'năm' : 'thời gian'}!`);
    } else {
      let dmDonViTien: any = [];
      dmDonViTien = this.listDonVi.filter(x => x.value == this.newItem.IDdmDonViTien);
      if (dmDonViTien.length > 0)
        this.newItem.TendmDonViTien = dmDonViTien[0].label
      this.newItem.IDTaiSan = this.IDTaiSan;
      this.listGiaDat.push(this.newItem);
      this.listGiaDat.sort((a, b) => a.Nam - b.Nam);
      this.newItem = {
        ID: 0,
        FileDinhKem: {},
        LoaiGiaDat: this.LoaiGiaDat
      }
    }
  }

  delete(i) {
    let item = this.listGiaDat.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listGiaDat.push(JSON.parse(JSON.stringify(item)));
    }
  }

  onClose() {
    this.activeModal.close(this.listGiaDat.sort((a, b) => { b.Nam - a.Nam }));
  }

}
