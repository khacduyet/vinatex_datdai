import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-lohangmodal',
  templateUrl: './lohangmodal.component.html',
  styleUrls: ['./lohangmodal.component.css']
})
export class LohangmodalComponent implements OnInit {

  opt: any = ''
  listGiaoKeHoachFull: any = [];
  listGiaoKeHoach: any = [];
  listTrienKhaiKeHoach: any = [];
  item: any = {};
  khongclicknhieu: any = false;
  lang: any = vn;
  listGiaoKeHoach_TrienKhai: any = [];
  constructor(public activeModal: NgbActiveModal,
     private services: SanXuatService,
      public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.getListGiaoKeHoach();
    this.getListTrienKhaiKeHoach();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    console.log(this.item)
  }
  
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Ngay !== undefined) {
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this.services.LoHang().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  getListGiaoKeHoach(){
    this.services.GetOptions().GetListGiaoKeHoachSanXuatChuaLapKeHoach().subscribe((res:any)=>{
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
      this.listGiaoKeHoachFull = res;
    })
  }

  getListTrienKhaiKeHoach(){
    let data={
      CurrentPage: 0,
    }
    this.services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res:any)=>{
      this.listGiaoKeHoach_TrienKhai = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  giaoKeHoach(event){
    var itemFind = this.listGiaoKeHoachFull.find(function (obj) {
          return obj.Id == event.value; 
    });
    this.item.IddmPhanXuong = itemFind.IddmPhanXuong;
    this.item.IdGiaoKeHoachSanXuat = itemFind.Id;
  }
}
