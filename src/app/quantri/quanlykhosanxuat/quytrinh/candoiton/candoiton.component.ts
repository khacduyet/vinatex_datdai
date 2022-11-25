import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-candoiton',
  templateUrl: './candoiton.component.html',
  styleUrls: ['./candoiton.component.css']
})
export class CandoitonComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  listItem: any = [];
  paging: any = {};
  filter:any={};
  trangThai:any=1;
  cols: any = [
    {
      header: 'Tên lô bông',
      field: 'TenLoBong',
      width: '150px'
    },
    {
      header: 'Số lượng',
      field: 'SoLuongTon',
      width: '150px'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listdmKho : any = [];
  listDuAn : any = [];
  listLuuKho : any = [];
  userInfo: any={};
  dmKho: any={Id:''};
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router,private _auth: AuthenticationService) { 
      this.userInfo = this._auth.currentUserValue;
    }

  ngOnInit(): void {
    this.getListDuAn();
  }
  
  getListDuAn(){
     this._service.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res:any)=>{
       res.filter(obj => {
        obj.collspan = false;
      });
      this.listDuAn = res
      this.listDuAn[0].collspan =  true;
      console.log(this.listDuAn)
      this.getListKho(res[0]);
     })
  }
  getListKho(item){
    this.items = [];
    item.collspan=!item.collspan
    var data: any = {};
    data.IdDuAn = item.Id;
    data.CurrentPage = 0;
    // data.Loai = 2;
    this._service.GetListdmKho(data).subscribe((res:any)=>{
      res.filter(obj => {
          obj.select = false;
      });
    this.listdmKho =  res;
    })
 }
  getListLuuKho(CurrentPage,item?, reset? ){
    if(reset){
      this.dmKho = item;
      this.listdmKho.forEach(element => {
        element.select= false;
      });
      item.select = true;
    }
    if(this.dmKho.LoaiNhomKho == 1)
    {
      this.cols = [
        {
          header: 'Tên lô bông',
          field: 'TenLoBong',
          width: '150px'
        },
        {
          header: 'Số cân',
          field: 'SoLuong',
          width: '150px'
        },
        {
          header: 'Vị trí',
          field: 'TendmViTri',
          width: '150px'
        },
      ];
    }
    else{
      this.cols = [
        {
          header: 'Tên lô bông',
          field: 'TenLoBong',
          width: '150px'
        },
        {
          header: 'Số lượng',
          field: 'SoLuongTon',
          width: '150px'
        },
      ];
    }
    this._service.getLuuKho(this.dmKho.Id, '', CurrentPage,'').subscribe((res:any)=>{
      this.items =  res.items;
      this.paging = res.paging;
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    this.getListLuuKho(event.page + 1);
  }
}
