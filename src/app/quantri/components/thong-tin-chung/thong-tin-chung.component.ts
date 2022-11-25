import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { UnixToDate } from 'src/app/services/globalfunction';
import { ModalShowgiadatComponent } from '../../modal/modal-showgiadat/modal-showgiadat.component';

@Component({
  selector: 'app-thong-tin-chung',
  templateUrl: './thong-tin-chung.component.html',
  styleUrls: ['./thong-tin-chung.component.css']
})
export class ThongTinChungComponent implements OnInit {
  @Input('item') item:any={};
  listMucDichSuDung:any=[];
  listNguonGoc:any=[];

  tuNam:number;
  denNam:number;
  namHienTai:number;
  namDaSuDung: number;
  namConLai: number;
  thoiHanDaSuDung: number;
  thoiHanSuDungConLai: number;
  tongSoThoiHanSuDung: number;
  thoiHanKhiChuaChon: number;
  constructor(private _service:Dat09Service,private _modal:NgbModal) { }

  ngOnInit(): void {
    if(this.item.TaiSanDat.ThoiHanSuDungTuNgay)
    this.thoiHanKhiChuaChon = 100;
    this.setProgressBar(this.item.TaiSanDat.ThoiHanSuDungTuNgay,this.item.TaiSanDat.ThoiHanSuDungDenNgay,this.item.TaiSanDat.ThoiHanSuDung);
    this.GetListMucDichSuDung();
    this.GetListNguonGocDat();
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
    if (new Date(aDenNgay) < new Date()) {
      this.thoiHanDaSuDung = 100;
      this.thoiHanSuDungConLai = 0;
      this.tongSoThoiHanSuDung = aThoiGianSuDung;
      this.thoiHanKhiChuaChon = 0;
      this.namDaSuDung = aThoiGianSuDung;
    }
    if (new Date(aDenNgay) > new Date()) {
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
    });
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
    });
  }
  getNguonGoc(ID){
    return this.listNguonGoc.filter(ele=>ele.ID===ID)[0]?.Ten||null
  }
  getMucDich(ID){
    return this.listMucDichSuDung.filter(ele=>ele.ID===ID)[0]?.Ten||null
  }
  GiaDat(loaiGiaDat) {
    let modalRef = this._modal.open(ModalShowgiadatComponent, {
      size: 'xl',
      backdrop: 'static'
    })
    modalRef.componentInstance.listGiaDat = JSON.parse(JSON.stringify(this.item.GiaDats.sort((a, b) => b.Nam - a.Nam).map(giadat => {
      return {
        ...giadat,
        TuNgay : UnixToDate(giadat.TuNgayUnix),
        DenNgay : UnixToDate(giadat.DenNgayUnix)
      }
    })));
    modalRef.componentInstance.IDTaiSan = this.item.ID;
    modalRef.componentInstance.LoaiGiaDat = loaiGiaDat;
    modalRef.result.then(res => {
    }).catch(er => { console.log(er) })
  }
}
