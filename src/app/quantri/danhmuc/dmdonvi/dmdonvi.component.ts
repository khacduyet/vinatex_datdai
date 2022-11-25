import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaldmdonviComponent } from '../modal/modaldmdonvi/modaldmdonvi.component';
import { Dat09Service } from 'src/app/services/callApi';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';
import { DateToDatePicker, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmdonvi',
  templateUrl: './dmdonvi.component.html',
  styleUrls: ['./dmdonvi.component.css']
})
export class DmdonviComponent implements OnInit {
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  listLoaiHinhCongTy: any = [
    { value: 'CONG_TY_100_VON', label: 'Công ty 100% vốn' },
    { value: 'CONG_TY_CON', label: 'Công ty con' },
    { value: 'CONG_TY_LIEN_KET', label: 'Công ty liên kết' },
    { value: 'KHOAN_DAU_TU_KHAC', label: 'Khoản đầu tư khác' },
    { value: 'DON_VI_SU_NGHIEP', label: 'Đơn vị sự nghiệp' },
  ];

  cols: any = [
    {
      header: 'Mã doanh nghiệp',
      field: 'Ma',
      width: '100px',
      align: 'center'
    },
    {
      header: 'Tên pháp lý',
      field: 'Ten',
      width: '200px'
    },
    {
      header: 'Tên đơn vị đại diện vốn',
      field: 'TenDonViCha',
      width: '200px'
    },
    {
      header: 'Loại hình công ty',
      field: 'TenLoaiHinhCongTy',
      width: '200px'
    },
    {
      header: 'Phòng ban',
      field: 'isPhongBan',
      width: '200px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];

  constructor(private _modal: NgbModal, private _services: Dat09Service, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdmDonVi();
  }
  resetFilter() {
    this.keyWord = '';
    this.GetListdmDonVi()
  }
  GetListdmDonVi() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.keyWord,
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmDonVi(data).subscribe((res: any) => {
      // res.forEach(ele => {
      //   ele.TenCha = res.filter()
      // });
      this.items = res.items.map((ele:any)=>{
        return {
          ...ele,
          TenLoaiHinhCongTy: this.listLoaiHinhCongTy.find((loai:any)=>loai.value ===ele.LoaiHinhCongTy)?.label||''
        }
      });
      console.log(this.items)
      this.paging = res.paging;
    })
  }
  add() {
    let modalRef = this._modal.open(ModaldmdonviComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = { ID: 0 };
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetListdmDonVi()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(ModaldmdonviComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.item.NgayCapGiayPhepKinhDoanh = UnixToDate(item.NgayCapGiayPhepKinhDoanhUnix);
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetListdmDonVi()
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa dữ liệu này chứ?"
    modalRef.result.then(res => {
      this._services.DeletedmDonVi(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmDonVi();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdmDonVi();
  }
  importExcel() {
    let modalRef = this._modal.open(ModalimportexcelComponent, {
      backdrop: 'static',
    })
    modalRef.componentInstance.importFunc = 'DonVi';
    modalRef.result.then(res => {
      this.GetListdmDonVi();
      this._toastr.success(res.mess);
    })
      .catch(er => console.log(er))
  }
}
