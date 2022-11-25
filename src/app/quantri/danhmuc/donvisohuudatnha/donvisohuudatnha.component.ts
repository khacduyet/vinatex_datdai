import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModaldonvisohuunhadatComponent } from '../modal/modaldonvisohuunhadat/modaldonvisohuunhadat.component';

@Component({
  selector: 'app-donvisohuudatnha',
  templateUrl: './donvisohuudatnha.component.html',
  styleUrls: ['./donvisohuudatnha.component.css']
})
export class DonvisohuudatnhaComponent implements OnInit {

  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '200px'
    },
    // {
    //   header: 'Tên công ty',
    //   field: 'TenCongTy',
    //   width: 'unset'
    // },
    {
      header: 'Địa chỉ',
      field: 'DiaChi',
      width: '300px'
    },
    {
      header: 'Giấy phép kinh doanh',
      field: 'SoGiayPhepKinhDoanh',
      width: '200px',
    },
    {
      header: 'Ngày cấp giấy phép',
      field: 'NgayCapGiayPhep',
      width: '200px',
      type:'date',
      align:'center'
    },
    {
      header: 'Người đại diện pháp luật',
      field: 'TenNguoiDaiDienPhapLuat',
      width: '200px'
    },
    {
      header: 'Chức vụ',
      field: 'ChucVu',
      width: '100px',
      align:'center'
    },
    {
      header: 'Số tài khoản',
      field: 'SoTaiKhoan',
      width: '200px'
    },
    {
      header: 'Địa chỉ ngân hàng',
      field: 'DiaChiNganHang',
      width: '200px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];
  item:any={};
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListDanhMuc();
  }
  

  GetListDanhMuc(){
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.keyWord,
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmDonViSoHuuDatNha(data).subscribe((res:any)=>{
      this.items = res.items;
      // if(this.items != null && this.items != undefined && this.item.length > 0){
      //   this.items.forEach(x=>{
      //     x.NgayCapGiayPhep = new Date(new Date(x.NgayCapGiayPhep).getFullYear(),new Date(x.NgayCapGiayPhep).getMonth(),new Date(x.NgayCapGiayPhep).getDate());
      //   });
      // }
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListDanhMuc();
  }

  add(){
    let modalRef = this._modal.open(ModaldonvisohuunhadatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListDanhMuc();
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldonvisohuunhadatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListDanhMuc()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmDonViSoHuuNhaDat(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListDanhMuc();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListDanhMuc();
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'DonViSoHuuNhaDat';
    modalRef.result.then(res=>{
      this.GetListDanhMuc();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
