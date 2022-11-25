import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { vn } from 'src/app/services/const';
import { ModalthongtinchothueComponent } from '../../modal/modalthongtinchothue/modalthongtinchothue.component';
import { DateToUnix, vietHoaChuCaiDau } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-hien-trang-su-dung',
  templateUrl: './hien-trang-su-dung.component.html',
  styleUrls: ['./hien-trang-su-dung.component.css']
})
export class HienTrangSuDungComponent implements OnInit {
  @HostListener('window:resize',['$event'])
  onResize(event:Window){
    this.getTableStyle()
  }
  @Input('IDTaiSan') IDTaiSan: any;
  @Input('opt') opt: any;
  @Input('item') listHTSD: Array<any>;
  @Output('itemChange') listChange: EventEmitter<any> = new EventEmitter<any>();
  vietHoaChuCaiDau = vietHoaChuCaiDau;
  showTable:boolean;
  newHTSD: any = {
    TepDinhKemHopDong:{},
  };
  edittingHTSD: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  listdmHienTrangSuDung: any = [];
  listdmDonViSoHuuDatNha: any = [];
  constructor(private _services: Dat09Service, private _toastr: ToastrService, private _modal: NgbModal) {

  }
  getTableStyle(){
    let breakpoint = this.opt ==='modal'? 0: 1324;
    if(window.innerWidth>breakpoint){
      this.showTable = true;
    }else{
      this.showTable = false;
    }
  }
  ngOnInit(): void {
    this.getTableStyle()
    this.getListDanhMucHienTrangSuDung();
    this.GetListdmDonViSoHuuDatNha();
  }
  add() {
    this.newHTSD.ID = 0;
    this.newHTSD.IDTaiSan = this.IDTaiSan;
    if (this.newHTSD.ThoiGian !== null && this.newHTSD.ThoiGian !== undefined) {
      this.newHTSD.ThoiGianUnix = (new Date(this.newHTSD.ThoiGian)).getTime() / 1000;
      if (this.newHTSD.IDdmHienTrangSuDung != null) {
        this.newHTSD.IDdmHienTrangSuDung = this.newHTSD.IDdmHienTrangSuDung.ID;
      }
      if (this.newHTSD.IDDonViSoHuuNhaDat != null) {
        this.newHTSD.IDDonViSoHuuNhaDat = this.newHTSD.IDDonViSoHuuNhaDat.ID;
        this.newHTSD.TenDonViSoHuuNhaDat = this.newHTSD.IDDonViSoHuuNhaDat.Ten;
      }
      this._services.SetHienTrangSuDung(this.newHTSD).subscribe((res: any) => {
        if (res?.State === 1) {
          this._toastr.success(res?.message);
          this.listChange.emit('change');
          this.newHTSD = {};
        } else {
          this._toastr.error(res?.message);
        }
      })
    } else {
      this._toastr.warning('Vui lòng nhập thời gian!')
    }
  }
  doneEdit(item) {
    if (item.ThoiGian !== null && item.ThoiGian !== undefined) {
      item.ThoiGianUnix = DateToUnix(item.ThoiGian);
      if (item.IDdmHienTrangSuDung != null) {
        item.IDdmHienTrangSuDung = item.IDdmHienTrangSuDung.ID;
      }
      if (item.IDDonViSoHuuNhaDat != null) {
        item.IDDonViSoHuuNhaDat = item.IDDonViSoHuuNhaDat.ID;
        item.TenDonViSoHuuNhaDat = item.IDDonViSoHuuNhaDat.Ten;
      }
      this._services.SetHienTrangSuDung(item).subscribe((res: any) => {
        if (res?.State === 1) {
          this._toastr.success(res?.message);
          this.listChange.emit('change');
        } else {
          this._toastr.error(res?.message);
          this.listChange.emit('change');
        }
      })
    } else {
      this._toastr.warning('Vui lòng nhập thời gian!')
    }
    // this._services.SetHienTrangSuDung(item).subscribe((res:any)=>{
    //   if (res?.State === 1) {
    //     this._toastr.success(res?.message);
    //     this.listChange.emit('change');
    //   } else {
    //     this._toastr.error(res?.message);
    //     this.listChange.emit('change');
    //   }
    // })
  }
  cancelEdit() {
    this.listChange.emit('change')
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeleteHienTrangSuDung(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.listChange.emit('change');
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  test(item) {
    console.log(item)
  }

  getListDanhMucHienTrangSuDung() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this._services.GetListdmHienTrangSuDung(data).subscribe((res: any) => {
      this.listdmHienTrangSuDung = res;
    })
  }

  GetListdmDonViSoHuuDatNha(ID?:any) {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this._services.GetListdmDonViSoHuuDatNha(data).subscribe((res: any) => {
      this.listdmDonViSoHuuDatNha = res;
      if(ID!==null && ID!== undefined){
        this.newHTSD.IDDonViSoHuuNhaDat = res.filter(ele=>ele.ID===ID)[0];
      }
    })
  }


  getChangeEdit(aValue) {
    if (aValue === null || aValue === undefined) {
      return false;
    }

    if (this.listdmHienTrangSuDung != null && this.listdmHienTrangSuDung != undefined) {
      this.listdmHienTrangSuDung.forEach(x => {
        if (x.ID == aValue.IDdmHienTrangSuDung) {
          aValue.IDdmHienTrangSuDung = x;
        }
      });
    }
    if (this.listdmDonViSoHuuDatNha != null && this.listdmDonViSoHuuDatNha != undefined) {
      this.listdmDonViSoHuuDatNha.forEach(x => {
        if (x.ID == aValue.IDDonViSoHuuNhaDat) {
          aValue.IDDonViSoHuuNhaDat = x;
        }
      });
    }
  }

  changeHienTrangSuDung(event){
    if(event.value.Ma==='CHO_THUE'){
      this.addThongTinChoThue();
    }
  }

  addThongTinChoThue(){
    let modalOpt = '';
    let item:any = {};
    if(this.newHTSD?.IDDonViSoHuuNhaDat!==undefined &&this.newHTSD?.IDDonViSoHuuNhaDat!==null){
      item = this.newHTSD.IDDonViSoHuuNhaDat;
    }else{
      modalOpt = 'doitacmoi';
      item.ID = 0;
    }
    let modalRef = this._modal.open(ModalthongtinchothueComponent,{
      backdrop:'static'
    })
    modalRef.componentInstance.opt = modalOpt;
    modalRef.componentInstance.title = this.newHTSD?.IDdmHienTrangSuDung?.Ma!=='CHO_THUE'?'Thông tin người sử dụng':'Thông tin cho thuê';
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.thongTinHopDong = JSON.parse(JSON.stringify({
      GiaChoThue:this.newHTSD.GiaChoThue,
      TepDinhKemHopDong:this.newHTSD?.TepDinhKemHopDong||{},
      SoNamThue:this.newHTSD.SoNamThue
    }));
    modalRef.result.then(res=>{
      let item = JSON.parse(JSON.stringify(res))
      this._toastr.success(res.message);
      this.newHTSD.GiaChoThue = item.thongTinHopDong?.GiaChoThue;
      this.newHTSD.SoNamThue = item.thongTinHopDong?.SoNamThue;
      this.newHTSD.TepDinhKemHopDong = item.thongTinHopDong?.TepDinhKemHopDong;
      if(res.ID!==undefined && res.ID !== null){
        this.GetListdmDonViSoHuuDatNha(res.ID);
      }
    }).catch(er=>{console.log(er)})
  }
  editThongTinChoThue(HienTrangSuDung){
    console.log(HienTrangSuDung);
    let modalOpt = '';
    let item:any = {};
    if(HienTrangSuDung?.IDDonViSoHuuNhaDat!==undefined &&HienTrangSuDung?.IDDonViSoHuuNhaDat!==null){
      item = HienTrangSuDung.IDDonViSoHuuNhaDat;
    }else{
      modalOpt = 'doitacmoi';
      item.ID = 0;
    }
    let modalRef = this._modal.open(ModalthongtinchothueComponent,{
      backdrop:'static'
    })
    modalRef.componentInstance.opt = modalOpt;
    modalRef.componentInstance.title = HienTrangSuDung?.IDdmHienTrangSuDung?.Ma!=='CHO_THUE'?'Thông tin người sử dụng':'Thông tin cho thuê';
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.thongTinHopDong = JSON.parse(JSON.stringify({
      GiaChoThue:HienTrangSuDung.GiaChoThue,
      TepDinhKemHopDong:HienTrangSuDung?.TepDinhKemHopDong||{},
      SoNamThue:HienTrangSuDung.SoNamThue
    }));
    modalRef.result.then(res=>{
      let item = JSON.parse(JSON.stringify(res))
      this._toastr.success(res.message);
      HienTrangSuDung.GiaChoThue = item.thongTinHopDong?.GiaChoThue;
      HienTrangSuDung.SoNamThue = item.thongTinHopDong?.SoNamThue;
      HienTrangSuDung.TepDinhKemHopDong = item.thongTinHopDong?.TepDinhKemHopDong;
      if(res.ID!==undefined && res.ID !== null){
        this.GetListdmDonViSoHuuDatNha(res.ID);
      }
    }).catch(er=>{console.log(er)})
  }
  edit(item){
    
    if (item === null || item === undefined) {
      return false;
    }

    if (this.listdmHienTrangSuDung != null && this.listdmHienTrangSuDung != undefined) {
      this.listdmHienTrangSuDung.forEach(x => {
        if (x.ID == item.IDdmHienTrangSuDung) {
          item.IDdmHienTrangSuDung = x;
        }
      });
    }
    if (this.listdmDonViSoHuuDatNha != null && this.listdmDonViSoHuuDatNha != undefined) {
      this.listdmDonViSoHuuDatNha.forEach(x => {
        if (x.ID == item.IDDonViSoHuuNhaDat) {
          item.IDDonViSoHuuNhaDat = x;
        }
      });
    }
    item.editting = true;
  }
}
