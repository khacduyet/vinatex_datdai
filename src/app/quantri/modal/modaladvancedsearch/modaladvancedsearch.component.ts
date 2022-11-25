import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { vn } from 'src/app/services/const';

@Component({
  selector: 'app-modaladvancedsearch',
  templateUrl: './modaladvancedsearch.component.html',
  styleUrls: ['./modaladvancedsearch.component.css']
})
export class ModaladvancedsearchComponent implements OnInit {
  @ViewChild('chonVung') chonVung: any;

  searchItem: any = {
    ThongTinChung: {},
    TaiSanTrenDat: {},
    TinhTrangPhapLy: {},
    HoSoVanBanPhapQuy: {}
  }
  listMucDichSuDung: any = [];
  listNguonGoc: any = [];
  listLoaiBienDong: any = [];
  listLoaiTaiSan: any = [
  ];
  listTinhTrangTaiSan: any = [];
  listDonVi: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  bieuThucs: any = [
    { label: 'Bằng', value: 3, code: 'DIEN_TICH_BANG' },
    { label: 'Lớn hơn hoặc bằng', value: 0, code: 'DIEN_TICH_LON_HON' },
    { label: 'Nhỏ hơn hoặc bằng', value: 1, code: 'DIEN_TICH_NHO_HON' },
    { label: 'Trong khoảng', value: 2 },
  ]
  vung: any = {Ten:'Chọn đơn vị'};
  vungs: any = [];
  bieuThuc: any
  listMaHanhDong: any = [
    { label: "Chưa có giấy tờ pháp lý", code: 1 },
    { label: "Có quyết định giao đất", code: 2 },
    { label: "Có hợp đồng thuê", code: 3 },
    { label: "Có sổ đỏ", code: 4 }
  ]
  constructor(private _modal: NgbModal, private _service: Dat09Service, private _toastr: ToastrService, private _activemodal: NgbActiveModal) { }

  ngOnInit(): void {
    this.yearRange = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
    this.lang = vn;
    console.log(this.searchItem);
    if (this.searchItem.ThongTinChung.LoaiDienTichTimKiem === null && this.searchItem.ThongTinChung.LoaiDienTichTimKiem !== undefined) {
      this.bieuThuc = this.bieuThucs[3];
    } else if (this.searchItem.ThongTinChung.LoaiDienTichTimKiem !== undefined) {
      this.bieuThuc = this.bieuThucs.find(ele => ele.code === this.searchItem.ThongTinChung.LoaiDienTichTimKiem);
    }
    if (this.searchItem.ThongTinChung.MaHanhDong != null && this.searchItem.ThongTinChung.MaHanhDong != undefined) {
      this.searchItem.ThongTinChung.MaHanhDong = this.listMaHanhDong.filter(x => x.code == this.searchItem.ThongTinChung.MaHanhDong)[0];
    }
    this.GetListMucDichSuDung();
    this.GetListNguonGocDat();
    this.GetListdmBienDong();
    this.GetListdmTinhTrangTaiSan();
    this.GetListdmTaiSan();
    this.GetListdmDonVi();
  }
  // getListDonVi(){
  //   let data = {
  //     PageSize: 10,
  //     CurrentPage: 0,
  //     sFilter: "",
  //     Ma: "",
  //     Ten: ""
  //   };
  //   this._service.GetListdmDonVi(data).subscribe(res=>{
  //      this.listDonVi = res;
  //      if(this.listDonVi != null && this.listDonVi != undefined){
  //        if(this.searchItem.ThongTinChung.IDDonVi != null && this.searchItem.ThongTinChung.IDDonVi != undefined){
  //         this.searchItem.ThongTinChung.IDDonVi = this.listDonVi.filter(x=>x.ID == this.searchItem.ThongTinChung.IDDonVi)[0];
  //        }
  //      }
  //   });
  // }
  GetListdmDonVi() {
    let data = {
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: "",
    };
    this._service.GetListdmDonVi(data).subscribe(
      (res: any) => {
        let data = res.map((ele: any) => {
          return {
            label: ele.Ten,
            data: ele,
            key: ele.ID.toString(),
            parentKey: ele.IDParent?.toString() || null
          }
        })
        this.flatToTreeArray(data, "key", "parentKey");
      },
      (err: any) => {
        this.vung["Ten"] = "Có lỗi xảy ra";
      }
    );
  }

  flatToTreeArray(list, Id: string, pId: string) {
    let finalData = [];
    list.forEach((element) => {
      element.children = [];
    });
    list.forEach((element) => {
      if (element[pId] !== null) {
        if (
          list.filter((e: any) => e[Id] === element[pId])[0] !== null &&
          list.filter((e: any) => e[Id] === element[pId])[0] !== undefined
        ) {
          list
            .filter((e: any) => e[Id] === element[pId])[0]
            .children.push(element);
        } else {
          finalData.push(element);
        }
      } else {
        finalData.push(element);
      }
    });
    this.vungs = finalData;
    if (this.searchItem.ThongTinChung.IDDonVi != null && this.searchItem.ThongTinChung.IDDonVi != undefined) {
      this.vung = list.filter(ele => ele[Id] === this.searchItem.ThongTinChung.IDDonVi.toString())[0]
      console.log(this.vung);
    }
  }

  nodeSelect(event){
    this.chonVung.hide();
    this.vung = event.node.data;
    this.searchItem.IDDonVi = event.node.data.ID;
    this.searchItem.ThongTinChung.TenCongTy = event.node.data.Ten;
    this.searchItem.ThongTinChung.SoGPKD = event.node.data.GiayPhepDangKyKinhDoanh;
    this.searchItem.ThongTinChung.TenNguoiDaiDien = event.node.data.TenNguoiDaiDienPhapLuat;
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
      if (this.searchItem.ThongTinChung.IDNguonGocDat !== null && this.searchItem.ThongTinChung.IDNguonGocDat !== undefined) {
        this.searchItem.ThongTinChung.IDNguonGocDat = this.listNguonGoc.filter(ele => ele.ID === this.searchItem.ThongTinChung.IDNguonGocDat)[0];
      }
    });
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
      if (this.searchItem.ThongTinChung.IDMucDichSuDung !== null && this.searchItem.ThongTinChung.IDMucDichSuDung !== undefined) {
        this.searchItem.ThongTinChung.IDMucDichSuDung = this.listMucDichSuDung.filter(ele => ele.ID === this.searchItem.ThongTinChung.IDMucDichSuDung)[0];
      }
    });
  }
  GetListdmBienDong() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmBienDong(data).subscribe((res: any) => {
      this.listLoaiBienDong = res;
      if (this.searchItem.TinhTrangPhapLy.IDdmBienDong !== null && this.searchItem.TinhTrangPhapLy.IDdmBienDong !== undefined) {
        this.searchItem.TinhTrangPhapLy.IDdmBienDong = res.filter(ele => ele.ID === this.searchItem.TinhTrangPhapLy.IDdmBienDong)[0];
      }
    })
  }
  GetListdmTinhTrangTaiSan() {
    let data = {
      PageSize: 0,
      CurrentPage: 0,
      sFilter: ''
    }
    this._service.GetListdmTinhTrangTaiSan(data).subscribe((res: any) => {
      this.listTinhTrangTaiSan = res;
      if (this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan !== null && this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan !== undefined) {
        this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan = this.listTinhTrangTaiSan.filter(ele => ele.ID === this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan)[0];
      }
    })
  }
  GetListdmTaiSan() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmTaiSan(data).subscribe(res => {
      this.listLoaiTaiSan = res;
      if (this.searchItem.TaiSanTrenDat.IDLoaiTaiSan !== null && this.searchItem.TaiSanTrenDat.IDLoaiTaiSan !== undefined) {
        this.searchItem.TaiSanTrenDat.IDLoaiTaiSan = this.listLoaiTaiSan.filter(ele => ele.ID === this.searchItem.TaiSanTrenDat.IDLoaiTaiSan)[0];
      }
    })
  }
  changeBieuThuc() {
    this.searchItem.ThongTinChung.DienTichTu = undefined;
    this.searchItem.ThongTinChung.DienTichDen = undefined;
    this.searchItem.ThongTinChung.DienTichChung = undefined;
  }
  accept() {
    if (this.searchItem.ThongTinChung.MaHanhDong != null && this.searchItem.ThongTinChung.MaHanhDong != undefined) {
      this.searchItem.ThongTinChung.MaHanhDong = this.searchItem.ThongTinChung.MaHanhDong.code;
    }
    if (this.searchItem.ThongTinChung.IDDonVi != null && this.searchItem.ThongTinChung.IDDonVi != undefined) {
      this.searchItem.ThongTinChung.IDDonVi = this.searchItem.ThongTinChung.IDDonVi.ID;
    }
    // if(this.searchItem.TaiSanTrenDat.tempLoaiTaiSan!== null && this.searchItem.TaiSanTrenDat.tempLoaiTaiSan!== undefined){
    //   this.searchItem.TaiSanTrenDat.IDLoaiTaiSan = this.searchItem.TaiSanTrenDat.tempLoaiTaiSan.ID;
    // }
    if (this.searchItem.TaiSanTrenDat.IDLoaiTaiSan !== null && this.searchItem.TaiSanTrenDat.IDLoaiTaiSan !== undefined) {
      this.searchItem.TaiSanTrenDat.IDLoaiTaiSan = this.searchItem.TaiSanTrenDat.IDLoaiTaiSan.ID;
    }
    // if(this.searchItem.TaiSanTrenDat.tempTinhTrangTaiSan!== null && this.searchItem.TaiSanTrenDat.tempTinhTrangTaiSan!== undefined){
    //   this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan = this.searchItem.TaiSanTrenDat.tempTinhTrangTaiSan.ID;
    // }
    if (this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan !== null && this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan !== undefined) {
      this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan = this.searchItem.TaiSanTrenDat.IDTinhTrangTaiSan.ID;
    }
    // if(this.searchItem.TinhTrangPhapLy.tempLoaiBienDong!== null && this.searchItem.TinhTrangPhapLy.tempLoaiBienDong!== undefined){
    //   this.searchItem.TinhTrangPhapLy.IDdmBienDong = this.searchItem.TinhTrangPhapLy.tempLoaiBienDong.ID;
    // }
    if (this.searchItem.TinhTrangPhapLy.IDdmBienDong !== null && this.searchItem.TinhTrangPhapLy.IDdmBienDong !== undefined) {
      this.searchItem.TinhTrangPhapLy.IDdmBienDong = this.searchItem.TinhTrangPhapLy.IDdmBienDong.ID;
    }
    // if(this.searchItem.ThongTinChung.tempNguonGoc!== null && this.searchItem.ThongTinChung.tempNguonGoc!== undefined){
    //   this.searchItem.ThongTinChung.IDNguonGocDat = this.searchItem.ThongTinChung.tempNguonGoc.ID;
    // }
    if (this.searchItem.ThongTinChung.IDNguonGocDat !== null && this.searchItem.ThongTinChung.IDNguonGocDat !== undefined) {
      this.searchItem.ThongTinChung.IDNguonGocDat = this.searchItem.ThongTinChung.IDNguonGocDat.ID;
    }
    // if(this.searchItem.ThongTinChung.tempMucDichSuDung!== null && this.searchItem.ThongTinChung.tempMucDichSuDung!== undefined){
    //   this.searchItem.ThongTinChung.IDMucDichSuDung = this.searchItem.ThongTinChung.tempMucDichSuDung.ID;
    // }
    if (this.searchItem.ThongTinChung.IDMucDichSuDung !== null && this.searchItem.ThongTinChung.IDMucDichSuDung !== undefined) {
      this.searchItem.ThongTinChung.IDMucDichSuDung = this.searchItem.ThongTinChung.IDMucDichSuDung.ID;
    }
    if (this.bieuThuc !== null && this.bieuThuc !== undefined) {
      this.searchItem.ThongTinChung.LoaiDienTichTimKiem = this.bieuThuc.code || null;
    }
    this._activemodal.close(this.searchItem);
  }
}