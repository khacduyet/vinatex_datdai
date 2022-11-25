import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-botrimaymodal',
  templateUrl: './botrimaymodal.component.html',
  styleUrls: ['./botrimaymodal.component.css'],
  providers: [DatePipe]
})
export class BotrimaymodalComponent implements OnInit {
  item: any = {};
  listMay: any = [];
  filter: any = {};
  labelProp: any = {};
  opt: string = '';
  listCongDoan: Array<any> = []
  IddmPhanXuong: string = '';
  PoolMaySanXuat: any = {};
  DateArray: any = [];
  listDate: any = [];
  listChuThich1: any = [];
  listChuThich2: any = [];
  constructor(private _services: SanXuatService, private _activeModal: NgbActiveModal, private _modal: NgbModal, private datepipe: DatePipe, private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.listChuThich1 = [
      { color: 'green', GhiChu: 'Máy rảnh' },
      { color: 'blue', GhiChu: 'Máy của công đoạn và mặt hàng hiện tại' },
    ]
    this.listChuThich2 = [
      { color: 'yellow', GhiChu: 'Máy của công đoạn và mặt hàng khác' },
      { color: 'red', GhiChu: 'Máy đang sử dụng trong kế hoạch khác' },
    ]
    // console.log(this.PoolMaySanXuat);
    // if (this.opt !== 'edit') {
    this.GetCongDoanTheoMatHang()
    // }

    // console.log(this.PoolMaySanXuat);
    // console.log(this.item);
    this.listDate = this.getDates(UnixToDate(this.labelProp.TuNgayUnix), UnixToDate(this.labelProp.DenNgayUnix));
    // console.log(this.listDate);
    // this.item.listCongDoan= [
    //   {Ten:'Bông chải',listMay:[
    //     {Ten:'TC05',ChiSo:0.2,Loai:'CM'},
    //     {Ten:'TC06',ChiSo:0.2,Loai:'CM'},
    //     {Ten:'TC02',ChiSo:0.2,Loai:'CM'},
    //   ]},
    //   {Ten:'Cuộn cúi'},
    //   {Ten:'Chải kỹ'},
    //   {Ten:'Ghép thô'},
    // ]
    // this.TinhLaiSoMay()
    this.TinhLaiHeSo();
  }
  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      let data: any = {};
      if (currentDate.getDate() === 1) {
        data.header = `01/${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : (currentDate.getMonth() + 1)}`
      } else {
        data.header = this.datepipe.transform(currentDate, 'dd')
      }
      data.prop = this.datepipe.transform(currentDate, 'dd_MM_yyyy');
      dates.push(data);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  GetCongDoanTheoMatHang() {
    for (let prop in this.PoolMaySanXuat[this.labelProp.CongDoan.value]) {
      this.listMay.push({
        Ten: this.PoolMaySanXuat[this.labelProp.CongDoan.value][prop].Ten,
        prop: prop,
        SoMay: null,
      })
    }
    // this._services.GetOptions().GetListCongDoanTheoMatHang(this.item.IddmItem).subscribe((res: any) => {
    //   this.listCongDoan = res;
    // if (this.opt !== 'edit') {
    //   res.forEach(cd => {
    //     let data = []
    //     for (let key in this.PoolMaySanXuat[cd.Ma]) {
    //       if (this.PoolMaySanXuat[cd.Ma][key]) {
    //         data.push(this.PoolMaySanXuat[cd.Ma][key]);
    //       }
    //     }
    //     this.item.listItemTemp[cd.Ma] = data.map(
    //       ele => {
    //         return {
    //           prop: ele.Id.split('-').join('_'),
    //           MadmLoaiSoi:this.item.MadmLoaiSoi,
    //           IddmMay: ele.Id,
    //           Id: ''
    //         }
    //       })
    //   });
    // }
    // })
  }
  checkMay(CongDoan, May, event) {
    if (event.checked) {
      if (validVariable(this.PoolMaySanXuat[CongDoan][May].HeSo) && this.PoolMaySanXuat[CongDoan][May].HeSo > 0 && this.PoolMaySanXuat[CongDoan][May].HeSo <= 1) {
        this.listDate.forEach(date => {
          if (this.PoolMaySanXuat[CongDoan][May][date.prop].TinhTrang !== 2) {
            this.PoolMaySanXuat[CongDoan][May][date.prop].TinhTrang = event.checked ? 1 : 0;
            this.PoolMaySanXuat[CongDoan][May][date.prop].IdGiaoKeHoachSanXuat_TrienKhaiMatHang = event.checked ? this.item.Id : null;
            this.PoolMaySanXuat[CongDoan][May][date.prop].HeSo = event.checked ? this.PoolMaySanXuat[CongDoan][May].HeSo : 0;
          }
        });
      }else{
        this._toastr.warning('Vui lòng nhập hệ số lớn hơn 0 và nhỏ hơn 1!')
      }
    }

  }
  collapseCongDoan(congDoan) {
    congDoan.show = !!!congDoan.show;
  }
  accept() {
    this._activeModal.close(this.item);
  }
  ChangeMay(e) {
    // console.log(e);
    // this.TinhTongSoMay()
  }
  TinhLaiHeSo(){
    this.listMay.forEach(may => {
          let HeSo = 0
          this.listDate.forEach(date => {
            if(validVariable(this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].HeSo)&&this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].IdGiaoKeHoachSanXuat_TrienKhaiMatHang===this.item.Id){
              HeSo = this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].HeSo;
            }
          });
          this.PoolMaySanXuat[this.item.CongDoan][may.prop].HeSo = HeSo;
        });
  }
  // TinhLaiSoMay(){
  //   this.listMay.forEach(may => {
  //     let TongSoMayDaBoTri = 0
  //     this.listDate.forEach(date => {
  //       if(validVariable(this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].SoMay)&&this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].IddmItem===this.item.Id){
  //         TongSoMayDaBoTri += this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].SoMay;
  //       }
  //     });
  //     this.PoolMaySanXuat[this.item.CongDoan][may.prop].SoMay = TongSoMayDaBoTri;
  //     this.PoolMaySanXuat[this.item.CongDoan][may.prop].SoMayConLai = 0;
  //   });
  // }
  // TinhTongSoMay() {
  //   this.listMay.forEach(may => {
  //     let TongSoMayDaBoTri = 0
  //     this.listDate.forEach(date => {
  //       if(validVariable(this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].SoMay)&&this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].IddmItem===this.item.Id){
  //         TongSoMayDaBoTri += this.PoolMaySanXuat[this.item.CongDoan][may.prop][date.prop].SoMay;
  //       }
  //     });
  //     this.PoolMaySanXuat[this.item.CongDoan][may.prop].SoMayConLai = this.PoolMaySanXuat[this.item.CongDoan][may.prop].SoMay - TongSoMayDaBoTri;
  //   });
  // }
}
