import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalGiaDatComponent } from '../../modal-gia-dat/modal-gia-dat.component';
import { vn } from 'src/app/services/const'
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, nhapTen, readNum, UnixToDate, validVariable, vietHoaChuCaiDau } from 'src/app/services/globalfunction';
@Component({
  selector: 'app-crud-thong-tin-chung',
  templateUrl: './crud-thong-tin-chung.component.html',
  styleUrls: ['./crud-thong-tin-chung.component.css']
})
export class CrudThongTinChungComponent implements OnInit, DoCheck {
  @Input() item: any;
  @Output() itemChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('opt') opt: string;
  @ViewChild('myProgress') myProgress: ElementRef;
  @ViewChild('myBar') myBar: ElementRef;
  vietHoaChuCaiDau = vietHoaChuCaiDau;
  nhapTen = nhapTen;
  listMucDichSuDung: any = [];
  listNguonGoc: any = [];
  listPhuongAnSapXep: any = [];
  listTinh: any = [];
  listQuan: any = [];
  listPhuong: any = [];
  thoiHanSuDungTuNgay: boolean;
  listCapHangCongTrinh: any = [
    { label: 'Hạng 1', value: 1 },
    { label: 'Hạng 2', value: 2 },
    { label: 'Hạng 3', value: 3 },
    { label: 'Hạng 4', value: 4 },
  ]
  listDanhMucDonVi: any[];
  listDanhMucDonViDoiTac: any[];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  tuNam: number;
  denNam: number;
  namHienTai: number;
  namDaSuDung: number;
  namConLai: number;
  thoiHanDaSuDung: number;
  thoiHanSuDungConLai: number;
  tongSoThoiHanSuDung: number;
  thoiHanKhiChuaChon: number;
  constructor(private _modal: NgbModal, private _service: Dat09Service, private _toastr: ToastrService) { }
  ngOnInit(): void {
    this.GetListdmPhuongAnSapXep();
    this.GetListMucDichSuDung();
    this.GetListNguonGocDat();
    this.GetListdmTinh();
    this.GetListDanhMucDonVi();
    this.GetListDanhMucDonViDoiTac();
    this.thoiHanSuDungTuNgay = true;
    this.thoiHanKhiChuaChon = 100;
    if (this.opt == 'edit') {
      if (this.item.TaiSanDat.ThoiHanSuDung != null || this.item.TaiSanDat.ThoiHanSuDung != undefined || this.item.TaiSanDat.ThoiHanSuDung != 0) {
        this.thoiHanSuDungTuNgay = false;
      }
      this.setProgressBar(this.item.TaiSanDat.ThoiHanSuDungTuNgay, this.item.TaiSanDat.ThoiHanSuDungDenNgay);
    }
  }
  setProgressBar(aTuNgay: Date, aDenNgay: Date, aThoiGianSuDung: number = 0) {
    var yearDenNgay = new Date(aDenNgay).getFullYear();
    var yearTuNgay = new Date(aTuNgay).getFullYear();
    var yearNow = new Date().getFullYear();
    this.namHienTai = yearNow;
    if (aTuNgay !== undefined) {
      this.tuNam = yearTuNgay;
    }
    if (aDenNgay !== undefined) {
      this.denNam = yearDenNgay;
    }
    if (aDenNgay < new Date()) {
      this.thoiHanDaSuDung = 100;
      this.thoiHanSuDungConLai = 0;
      this.tongSoThoiHanSuDung = aThoiGianSuDung;
      this.thoiHanKhiChuaChon = 0;
      this.namDaSuDung = aThoiGianSuDung;
    }
    if (aDenNgay > new Date()) {
      var yearTong = yearDenNgay - yearTuNgay;
      var yearDaSuDung = yearNow - yearTuNgay;
      var yearConLai = yearDenNgay - yearNow;
      this.namDaSuDung = yearDaSuDung;
      this.namConLai = yearConLai;
      if (yearTong <= 0) {
        this.thoiHanDaSuDung = 100;
        this.thoiHanSuDungConLai = 0;
        this.tongSoThoiHanSuDung = 1;
        this.thoiHanKhiChuaChon = 0;
      }
      if (yearDaSuDung <= 0) {
        this.thoiHanDaSuDung = 0;
        this.thoiHanSuDungConLai = 100;
        this.tongSoThoiHanSuDung = yearTong;
        this.thoiHanKhiChuaChon = 0;
      }
      if (yearConLai <= 0) {
        this.thoiHanDaSuDung = 100;
        this.thoiHanSuDungConLai = 0;
        this.tongSoThoiHanSuDung = yearTong;
        this.thoiHanKhiChuaChon = 0;
      }
      if (yearTong != 0) {
        this.tongSoThoiHanSuDung = yearTong;
        if (yearDaSuDung == 0) {
          this.thoiHanDaSuDung = 0;
        } else {
          this.thoiHanDaSuDung = (yearDaSuDung * 100) / yearTong;
        }
        if (yearConLai <= 0) {
          this.thoiHanSuDungConLai = 0;
          this.thoiHanDaSuDung = 100;
        } else {
          this.thoiHanSuDungConLai = (yearConLai * 100) / yearTong;
        }
        this.thoiHanKhiChuaChon = 0;
      }
    }
  }
  changeLauDai(event) {
    if (event.checked) {
      this.item.TaiSanDat.ThoiHanSuDung = 'Lâu dài';
      this.item.TaiSanDat.ThoiHanSuDungTuNgay = undefined;
      this.item.TaiSanDat.ThoiHanSuDungDenNgay = undefined;
    } else {
      this.item.TaiSanDat.ThoiHanSuDung = null;
    }
  }
  GetListdmPhuongAnSapXep() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this._service.GetListdmPhuongAnSapXep(data).subscribe((res: any) => {
      this.listPhuongAnSapXep = res;
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmPhuongAnSapXep !== null && this.item.TaiSanDat.IDdmPhuongAnSapXep !== 0) {
          this.item.TaiSanDat.tempPhuongAnSapXep = this.listPhuongAnSapXep.filter(ele => ele.ID === this.item.TaiSanDat.IDdmPhuongAnSapXep)[0];
        }
      }
    })
  }
  GetListMucDichSuDung() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmMucDichSuDung(data).subscribe((res: any) => {
      this.listMucDichSuDung = res;
      console.log(this.opt);
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmMucDichSuDung !== null && this.item.TaiSanDat.IDdmMucDichSuDung !== 0) {
          this.item.TaiSanDat.tempMucDichSuDung = this.listMucDichSuDung.filter(ele => ele.ID === this.item.TaiSanDat.IDdmMucDichSuDung)[0];
        }
      }
    });
  }

  changeDienTich(event) {
    this.item.TaiSanDat.DienTich = event;
    this.item.TaiSanDat.DienTichBangChu = vietHoaChuCaiDau(readNum(event, ' mét vuông'))
  }
  changeDenNgay() {
    this.item.TaiSanDat.ThoiHanSuDungTuNgay = null;
    this.item.TaiSanDat.ThoiHanSuDung = null;
  }

  GetListdmTinh() {
    let data = {
      PageSize: 0,
      CurrentPage: 0,
      sFilter: '',
    };
    this._service.GetListdmTinh(data).subscribe((res: any) => {
      this.listTinh = res;
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmTinh !== null && this.item.TaiSanDat.IDdmTinh !== 0) {
          this.item.TaiSanDat.tempTinh = this.listTinh.filter(ele => ele.ID === this.item.TaiSanDat.IDdmTinh)[0];
          this.loadQuan({ value: { ID: this.item.TaiSanDat.IDdmTinh } })
        }
      }
    })
  }
  loadQuan(event) {
    this.listQuan = [];
    this.listPhuong = [];
    this.item.TaiSanDat.tempQuan = null;
    this.item.TaiSanDat.tempPhuong = null;
    let data = {
      PageSize: 0,
      CurrentPage: 0,
      sFilter: '',
      IDdmTinh: event.value?.ID
    };
    this._service.GetListdmQuan(data).subscribe((res: any) => {
      this.listQuan = res;
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmQuan !== null && this.item.TaiSanDat.IDdmQuan !== 0) {
          this.item.TaiSanDat.tempQuan = this.listQuan.filter(ele => ele.ID === this.item.TaiSanDat.IDdmQuan)[0];
          this.loadPhuong({ value: { ID: this.item.TaiSanDat.IDdmQuan } })
        }
      }
    })
  }
  loadPhuong(event) {
    let data = {
      PageSize: 0,
      CurrentPage: 0,
      sFilter: '',
      IDdmQuan: event.value?.ID
    };
    this._service.GetListdmPhuong(data).subscribe((res: any) => {
      this.listPhuong = res;
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmPhuong !== null && this.item.TaiSanDat.IDdmPhuong !== 0) {
          this.item.TaiSanDat.tempPhuong = this.listPhuong.filter(ele => ele.ID === this.item.TaiSanDat.IDdmPhuong)[0];
        }
      }
    })
  }
  GetListNguonGocDat() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmNguonGocDat(data).subscribe((res: any) => {
      this.listNguonGoc = res;
      console.log(this.opt);
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmNguonGocDat !== null && this.item.TaiSanDat.IDdmNguonGocDat !== 0) {
          this.item.TaiSanDat.tempNguonGoc = this.listNguonGoc.filter(ele => ele.ID === this.item.TaiSanDat.IDdmNguonGocDat)[0];
        }
      }
    });
  }
  onChangeDonvi(aValue) {
    this.item.TaiSanDat.IDdmDonVi = null;
    this.item.TaiSanDat.DiaChiNguoiSuDung = null;
    this.item.TaiSanDat.SoGPKD = null;
    this.item.TaiSanDat.NgayCapGPKDUnix = null;
    this.item.TaiSanDat.NgayCapGPKD = null;
    this.item.TaiSanDat.TenNguoiDaiDienPhapLuat = null;
    this.item.TaiSanDat.ChucVuNguoiDaiDienPhapLuat = null;
    this.item.TaiSanDat.SoTaiKhoan = null;
    this.item.TaiSanDat.DiaChiNganHang = null;
    if (aValue != null) {
      this.item.TaiSanDat.IDdmDonVi = aValue.ID;
      this.item.TaiSanDat.DiaChiNguoiSuDung = aValue.DiaChi;
      this.item.TaiSanDat.SoGPKD = aValue.GiayPhepDangKyKinhDoanh;
      this.item.TaiSanDat.NgayCapGPKDUnix = aValue.NgayCapGiayPhepKinhDoanhUnix;
      this.item.TaiSanDat.NgayCapGPKD = UnixToDate(aValue.NgayCapGiayPhepKinhDoanhUnix);
      this.item.TaiSanDat.TenNguoiDaiDienPhapLuat = aValue.TenNguoiDaiDienPhapLuat;
      this.item.TaiSanDat.ChucVuNguoiDaiDienPhapLuat = aValue.ChucVuNguoiDaiDienPhapLuat;
      this.item.TaiSanDat.SoTaiKhoan = aValue.SoTaiKhoan;
      this.item.TaiSanDat.DiaChiNganHang = aValue.DiaChiNganHang;
    }
  }
  onChangeDonViSoHuu(aValue) {
    console.log(aValue);
    this.item.TaiSanDat.IDdmDonViSoHuuDat = null;
    this.item.TaiSanDat.DiaChiNguoiSuDungBydmDonViSHD = null;
    this.item.TaiSanDat.SoGPKDBydmDonViSHD = null;
    this.item.TaiSanDat.NgayCapGPKDBydmDonViSHDUnix = null;
    this.item.TaiSanDat.NgayCapGPKDBydmDonViSHD = null;
    this.item.TaiSanDat.TenNguoiDaiDienPhapLuatBydmDonViSHD = null;
    this.item.TaiSanDat.ChucVuNguoiDaiDienBydmDonViSHD = null;
    this.item.TaiSanDat.SoTaiKhoanBydmDonViSHD = null;
    this.item.TaiSanDat.DiaChiNganHangBydmDonViSHD = null;
    if (aValue != null) {
      this.item.TaiSanDat.IDdmDonViSoHuuDat = aValue.ID;
      this.item.TaiSanDat.DiaChiNguoiSuDungBydmDonViSHD = aValue.DiaChi;
      this.item.TaiSanDat.SoGPKDBydmDonViSHD = aValue.GiayPhepDangKyKinhDoanh;
      this.item.TaiSanDat.NgayCapGPKDBydmDonViSHDUnix = aValue.NgayCapGiayPhepUnix;
      this.item.TaiSanDat.NgayCapGPKDBydmDonViSHD = UnixToDate(aValue.NgayCapGiayPhepUnix);
      this.item.TaiSanDat.TenNguoiDaiDienPhapLuatBydmDonViSHD = aValue.TenNguoiDaiDienPhapLuat;
      this.item.TaiSanDat.ChucVuNguoiDaiDienBydmDonViSHD = aValue.ChucVuNguoiDaiDienPhapLuat;
      this.item.TaiSanDat.SoTaiKhoanBydmDonViSHD = aValue.SoTaiKhoan;
      this.item.TaiSanDat.DiaChiNganHangBydmDonViSHD = aValue.DiaChiNganHang;
    }
  }
  GetListDanhMucDonVi() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmDonVi(data).subscribe((res: any) => {
      this.listDanhMucDonVi = res;
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmDonVi !== null && this.item.TaiSanDat.IDdmDonVi !== 0) {
          this.item.TaiSanDat.tempNguoiSuDung = res.filter(ele => ele.ID === this.item.TaiSanDat.IDdmDonVi)[0];
        }
      }
    })
  }

  GetListDanhMucDonViDoiTac() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmDonViSoHuuDatNha(data).subscribe((res: any) => {
      this.listDanhMucDonViDoiTac = res;
      if (this.opt === 'edit') {
        if (this.item.TaiSanDat.IDdmDonViSoHuuDat !== null && this.item.TaiSanDat.IDdmDonViSoHuuDat !== 0) {
          this.item.TaiSanDat.tempNguoiSoHuu = res.filter(ele => ele.ID === this.item.TaiSanDat.IDdmDonViSoHuuDat)[0];
        }
      }
    })
  }
  ngDoCheck(): void {
    if (this.item.TaiSanDat.tempMucDichSuDung !== null && this.item.TaiSanDat.tempMucDichSuDung !== undefined) {
      this.item.TaiSanDat.IDdmMucDichSuDung = this.item.TaiSanDat.tempMucDichSuDung.ID;
    }
    if (this.item.TaiSanDat.tempNguonGoc !== null && this.item.TaiSanDat.tempNguonGoc !== undefined) {
      this.item.TaiSanDat.IDdmNguonGocDat = this.item.TaiSanDat.tempNguonGoc.ID;
    }
    if (this.item.TaiSanDat.tempTinh !== null && this.item.TaiSanDat.tempTinh !== undefined) {
      this.item.TaiSanDat.IDdmTinh = this.item.TaiSanDat.tempTinh.ID;
      this.item.IDdmTinh = this.item.TaiSanDat.tempTinh.ID;
    }
    if (this.item.TaiSanDat.tempQuan !== null && this.item.TaiSanDat.tempQuan !== undefined) {
      this.item.TaiSanDat.IDdmQuan = this.item.TaiSanDat.tempQuan.ID;
    }
    if (this.item.TaiSanDat.tempPhuong !== null && this.item.TaiSanDat.tempPhuong !== undefined) {
      this.item.TaiSanDat.IDdmPhuong = this.item.TaiSanDat.tempPhuong.ID;
    }
    if (this.item.TaiSanDat.tempPhuong !== null && this.item.TaiSanDat.tempPhuong !== undefined) {
      this.item.TaiSanDat.IDdmPhuong = this.item.TaiSanDat.tempPhuong.ID;
    }
    if (this.item.TaiSanDat.tempPhuongAnSapXep !== null && this.item.TaiSanDat.tempPhuongAnSapXep !== undefined) {
      this.item.TaiSanDat.IDdmPhuongAnSapXep = this.item.TaiSanDat.tempPhuongAnSapXep.ID;
    }
    this.tinhMatDoXayDungThucTe();
    this.itemChange.emit(this.item);
  }
  GiaDat(loaiGiaDat) {
    let modalRef = this._modal.open(ModalGiaDatComponent, {
      size: 'xl',
      backdrop: 'static'
    })
    modalRef.componentInstance.listGiaDat = JSON.parse(JSON.stringify(this.item.GiaDats.sort((a, b) => b.Nam - a.Nam).map(giadat => {
      return {
        ...giadat,
        TuNgay: UnixToDate(giadat.TuNgayUnix),
        DenNgay: UnixToDate(giadat.DenNgayUnix)
      }

    })));
    modalRef.componentInstance.IDTaiSan = this.item.ID;
    modalRef.componentInstance.LoaiGiaDat = loaiGiaDat;
    modalRef.result.then(res => {
      console.log(res)
      this.item.GiaDats = JSON.parse(JSON.stringify(res.sort((a, b) => b.Nam - a.Nam)));
      this.itemChange.emit(this.item);
    }).catch(er => { console.log(er) })
  }



  onThoiHanSuDung(aValue) {
    if (aValue == null || aValue == undefined) {
      this.item.TaiSanDat.ThoiHanSuDung = 1;
      aValue = 1;
    }

    if (this.thoiHanSuDungTuNgay == false) {
      var tuNgay = this.item.TaiSanDat.ThoiHanSuDungTuNgay;
      this.item.TaiSanDat.ThoiHanSuDungDenNgay = new Date(new Date(tuNgay).getFullYear() + aValue, new Date(tuNgay).getMonth(), new Date(tuNgay).getDate(), 0, 0, 0, 0);
      console.log(this.item.TaiSanDat.ThoiHanSuDungDenNgay);
    }
    this.thoiHanSuDungTuNgay = false;
    // Để phần if này ở cuối nhé vì có return đấy
    this.setProgressBar(this.item.TaiSanDat.ThoiHanSuDungTuNgay, this.item.TaiSanDat.ThoiHanSuDungDenNgay, aValue);
  }

  onThoiHanSuDungTuNgay(aValue) {
    if (aValue == null || aValue == undefined) {
      return false;
    }

    var thoiHanSuDung = this.item.TaiSanDat.ThoiHanSuDung;
    this.item.TaiSanDat.ThoiHanSuDungDenNgay = new Date(new Date(aValue).getFullYear() + parseInt(thoiHanSuDung), new Date(aValue).getMonth(), new Date(aValue).getDate(), 0, 0, 0, 0);
    console.log(DateToUnix(this.item.TaiSanDat.ThoiHanSuDungDenNgay));
    console.log(DateToUnix(aValue));
    // Để phần if này ở cuối nhé vì có return đấy
    this.setProgressBar(aValue, this.item.TaiSanDat.ThoiHanSuDungDenNgay, thoiHanSuDung);
  }
  tinhMatDoXayDungThucTe() {
    if (this.item.TaiSanDat.IsDienTichSan) {
      this.item.TaiSanDat.MatDoXayDungThucTe = 100;
    } else {
      if (this.item.TaiSanDatNhas.length !== 0 && validVariable(this.item.TaiSanDat.DienTich)) {
        this.item.TaiSanDat.MatDoXayDungThucTe = this.item.TaiSanDatNhas.reduce((Tong, curr) => {
          if (validVariable(curr.DienTichXayDung)) {
            return Tong += curr.DienTichXayDung;
          }
        }, 0) / (this.item.TaiSanDat.DienTich) * 100
      } else {
        this.item.TaiSanDat.MatDoXayDungThucTe = null;
      }
    }
  }
  LoaiDienTich(loai: boolean) {
    this.item.TaiSanDat.IsDienTichSan = loai;
  }
}
