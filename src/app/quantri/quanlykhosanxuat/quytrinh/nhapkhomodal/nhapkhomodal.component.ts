import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhapkhomodal',
  templateUrl: './nhapkhomodal.component.html',
  styleUrls: ['./nhapkhomodal.component.css']
})
export class NhapkhomodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listdmViTri: any = [];
  listCaMay: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  listKeHoach: any = [];
  listKeHoachFull: any = [];
  type: any = '';
  editField: any = false;
  nametype: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    this.data.CurrentPage = 0;
    this.getListLoaiBong();
    this.getListCapBong();
    this.getListLoBong();
    this.getListKho();
    this.getListCaMay();
    this.getListdmViTri();
    this.getListKeHoach();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  // GetNextSoLoBong(event, index) {
  //   if (index == 1)
  //     this.item.IddmLoaiBong = event.value;
  //   else
  //     this.item.IddmCapBong = event.value;

  //   if (this.item.IddmLoaiBong != undefined && this.item.IddmLoaiBong != null && this.item.IddmLoaiBong != ''
  //     && this.item.IddmCapBong != null && this.item.IddmCapBong != undefined && this.item.IddmCapBong != '')
  //     this._services.QuyTrinhPhieuNhapLoBong().GetNextSoLoBong(this.item.IddmLoaiBong, this.item.IddmCapBong).subscribe(
  //       (res: any) => {
  //         this.item.IdLoBong = res.SoLoBong;
  //       })
  // }

  ChuyenTiep() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined) {
        this.add();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.QuyTrinhPhieuNhapLoBong().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.QuyTrinhPhieuNhapLoBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.opt !== 'edit') {
      if (this.type === 'bong')
        this.item.Loai = 2;
      else if (this.type === 'xo')
        this.item.Loai = 5;
      else if (this.type === 'bonghoi')
        this.item.Loai = 6;
      else if (this.type === 'bongphe')
        this.item.Loai = 7;
    }
    let isCheck = false;

    if(this.item.listItem!== undefined || this.item.listItem !== null){
      for(let i = 0; i < this.item.listItem.length; i++) {
        if(this.item.listItem[i].IddmViTri === null || this.item.listItem[i].IddmViTri === undefined){
          isCheck= true;
          break;
        }
        if( this.type === 'bong' && (
          this.item.listItem[i].SoKienNgan === null || this.item.listItem[i].SoKienNgan === undefined
          || this.item.listItem[i].SoKienDai === null || this.item.listItem[i].SoKienDai === undefined)){
          isCheck= true;
          break;
        }
      }
    }
    
    if (isCheck === true ) {
      this.toastr.error("Bạn chưa nhập đủ thông tin");
    }
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if ((this.item.IddmCapBong === null || this.item.IddmCapBong  === undefined) && (this.type === 'bong' || this.type === 'xo')) {
      this.toastr.error("Bạn chưa chọn  danh mục cấp bông");
    }
    else if (this.item.IddmLoaiBong === null || this.item.IddmLoaiBong === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục loại bông");
    }
    else {
      if ( this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined&& this.newTableItem.IddmViTri!= undefined) {
        this.add();
      }
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.QuyTrinhPhieuNhapLoBong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            console.log(this.type)
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.QuyTrinhPhieuNhapLoBong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    if (this.opt === 'edit') {
      this.data.Loai = this.item.Loai;
    }
    else{
      if (this.type === 'bong')
      this.data.Loai = 1;
      else  if (this.type === 'xo')
        this.data.Loai = 5;
      else  if (this.type === 'bonghoi'){
        this.data.Loai = 6;
        this.data.IddmLoaiBong = this.item.IddmLoaiBong;
      }
      else  if (this.type === 'bongphe'){
        this.data.Loai = 7;
      }
    }
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoaiBong() {
    if (this.opt === 'edit') {
      if (this.type === 'bong')
        this.data.Loai = 2;
      else
        this.data.Loai = this.item.Loai;
    }
    else{
      if (this.type === 'bong')
        this.data.Loai = 2;
      else  if (this.type === 'xo')
        this.data.Loai = 5;
      else  if (this.type === 'bonghoi'){
        this.data.Loai = 6;
        this.data.IddmLoaiBong = this.item.IddmLoaiBong;
      }
      else  if (this.type === 'bongphe'){
        this.data.Loai = 7;
      }
    }
    this._services.GetListdmLoaiBong(this.data).subscribe((res: any) => {
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  getListLoBong() {
    if (this.type === 'bong')
      this.data.Loai = 1;
    else if (this.type === 'bonghoi')
      this.item.Loai = 6;
    this._services.GetListLoBong(this.data).subscribe((res: any) => {
      let data: any = {};
      data.Id = "";
      data.Ten = "";
      res.unshift(data);
      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');
      console.log(this.listLoBong)
    })
  }
  getListCapBong() {
    this._services.GetListdmCapBong(this.data).subscribe((res: any) => {
      this.listCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaMay() {
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaMay = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  add() {
      if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}
  }
  
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  Onclose() {
    this.activeModal.close();
  }
  getListdmViTri() {
    this._services.GetListdmViTriOpt().subscribe((res: any) => {
      this.listdmViTri = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListKeHoach() {
    this._services.NhapKeHoachNguyenLieu().GetListChuaNhap(this.item.IdKeHoachNhapNguyenLieuInvoice_Item).subscribe((res: any) => {
      this.listKeHoach = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listKeHoachFull = res;
    })
  }
  getKeHoach(item){
    let dataFilter : any = this.listKeHoachFull.filter(obj => {
      return obj.Id === item.value
    });
    console.log(dataFilter)
    this.item.IddmLoaiBong = dataFilter[0].IddmLoaiBong;
    this.item.IddmCapBong = dataFilter[0].IddmCapBong;
    this.item.GiaBong = dataFilter[0].GiaBong;
    this.item.SoHopDong = dataFilter[0].SoHopDong;
    this.item.listItem.forEach(element => {
      element.isXoa = true;
    });;
    for(let i = 0; i < dataFilter[0].Container; i++){
      this.add()
    }
  }
}
