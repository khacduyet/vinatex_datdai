import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { DateToUnix } from 'src/app/services/globalfunction';
import { ModalquytrinhsapxepComponent } from '../modal/modalquytrinhsapxep/modalquytrinhsapxep.component';

@Component({
  selector: 'app-quytrinhsapxep',
  templateUrl: './quytrinhsapxep.component.html',
  styleUrls: ['./quytrinhsapxep.component.css']
})
export class QuytrinhsapxepComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    // {
    //   header: 'Đơn vị',
    //   field: 'DonVi',
    //   width: '150px'
    // },
    // {
    //   header: 'Ngày khởi tạo',
    //   field: 'NgayKhoiTao',
    //   width: '150px'
    // },
    {
      header: 'Số quy trình',
      field: 'SoQuyTrinh',
      width: '150px'
    },
    {
      header: 'Nội dung',
      field: 'NoiDung',
      width: '200px'
    },
    // {
    //   header: 'Diện tích',
    //   field: 'DienTich',
    //   width: '150px'
    // },
    // {
    //   header: 'Hiện trạng sử dụng',
    //   field: 'HienTrangSuDung',
    //   width: '400px'
    // },
    // {
    //   header: 'Phương án đề xuất',
    //   field: 'PhuongAnDeXuat',
    //   width: '150px'
    // },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: '150px'
    }
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true};
  colsQuyTrinh: any = [
    {
      header: 'Ngày nhận',
      field: 'NgayKhoiTao',
      width: '150px'
    },
    {
      header: 'Ngày chuyển',
      field: 'SoQuyTrinh',
      width: '150px'
    },
    {
      header: 'Thời gian xử lý',
      field: 'DiaChi',
      width: '200px'
    },
    {
      header: 'Bộ phận xử lý',
      field: 'DienTich',
      width: '150px'
    },
    {
      header: 'Nội dung xử lý',
      field: 'HienTrangSuDung',
      width: '400px'
    },
  ];


  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:Dat09Service) { }

  ngOnInit(): void {
    this.KiemTraTabTrangThai();
    // this.GetListQuyTrinh()
  }
  add(){
    let modalRef = this._modal.open(ModalquytrinhsapxepComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      ID:null,
      TepDinhKems:[],
      templistTaiSanQuyTrinh:[],
      listTaiSanQuyTrinh:[]
    }
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(item){
    console.log(item);
    let modalRef = this._modal.open(ModalquytrinhsapxepComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data={
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.GetListQuyTrinh(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
    this._service.KiemTraButtonThemMoi().subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
}
