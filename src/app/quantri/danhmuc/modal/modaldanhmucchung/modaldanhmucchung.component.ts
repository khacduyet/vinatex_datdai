import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-modaldanhmucchung',
  templateUrl: './modaldanhmucchung.component.html',
  styleUrls: ['./modaldanhmucchung.component.css']
})
export class ModaldanhmucchungComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {

  }
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      switch (this.type) {
        case 'tinhtrangtaisan': this.tinhtrangtaisan();
          break;
        case 'biendong': this.biendong();
          break;
        case 'duan': this.duan();
          break;
        case 'mucdich': this.mucdich();
          break;
        case 'nguongocdat': this.nguongocdat();
          break;
        case 'dmHienTrangSuDung': this.dmHienTrangSuDung();
          break;
        case 'loaivanban': this.loaivanban();
          break;
        case 'capbong': this.capbong();
          break;
        case 'loaibong': this.loaibong();
          break;
        case 'casanxuat': this.casanxuat();
          break;
        case 'loaisoi': this.loaisoi();
          break;
        case 'dmkho': this.dmkho();
          break;
        case 'dmnhomkho': this.dmnhomkho();
          break;
        case 'loaidien': this.loaidien();
          break;
        case 'nhomcongto': this.nhomcongto();
          break;
        case 'quycachdonggoi': this.quycachdonggoi();
          break;
        default:
          break;
      }
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }
  
  quycachdonggoi() {
    this.sanXuatService.dmQuyCachDongGoi().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  nhomcongto() {
    this.sanXuatService.dmNhomCongToDien().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaidien() {
    this.sanXuatService.dmLoaiDienKV().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  tinhtrangtaisan() {
    this.services.SetdmTinhTrangTaiSan(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  biendong() {
    this.services.SetdmBienDong(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  duan() {
    this.services.SetdmDuAn(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  nguongocdat() {
    this.services.SetdmNguonGocDat(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  mucdich() {
    this.services.SetdmMucDichSuDung(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  dmHienTrangSuDung() {
    this.services.SetdmHienTrangSuDung(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaivanban() {
    this.services.SetLoaiVanBan(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  capbong() {
    this.sanXuatService.SetdmCapBong(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaibong() {
    this.sanXuatService.SetdmLoaiBong(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  casanxuat() {
    this.sanXuatService.SetdmCaSanXuat(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaisoi() {
    this.sanXuatService.SetdmLoaiSoi(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  dmkho() {
    this.sanXuatService.SetdmKho(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  dmnhomkho() {
    this.sanXuatService.SetdmNhomKho(this.item).subscribe((res: any) => {
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
