import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTinhTrangPhapLyComponent } from '../../modal-tinh-trang-phap-ly/modal-tinh-trang-phap-ly.component';

@Component({
  selector: 'app-crud-tinh-trang-phap-ly',
  templateUrl: './crud-tinh-trang-phap-ly.component.html',
  styleUrls: ['./crud-tinh-trang-phap-ly.component.css']
})
export class CrudTinhTrangPhapLyComponent implements OnInit,DoCheck {
  @Input('BienDongs')items:any=[];
  @Output('BienDongs')itemChange: EventEmitter<any> = new EventEmitter<any>();
  
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols:any=[
    {
      header:'Loại Biến động',
      field:'LoaiBienDong',
      width:'200px',
      class:''
    },
    {
      header:'Nội dung biến động',
      field:'NoiDungBienDong',
      width:'400px',
      class:'text'
    },
    {
      header:'Ngày ký',
      field:'NgayKy',
      width:'150px',
      class:''
    },
    {
      header:'Người ký',
      field:'NguoiKy',
      width:'150px',
      class:''
    }
  ];

  constructor(private _modal:NgbModal) { }

  ngOnInit(): void {
  }
  ngDoCheck():void{
    this.itemChange.emit(this.items);
  }
  add(){
    let modalRef = this._modal.open(ModalTinhTrangPhapLyComponent,{
      size:'xl',
      backdrop:'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {ID:0};
    modalRef.result.then(res=>{
      this.items.push(res.item);
      if(res.opt!=='add'){
        this.add()
      }
    }).catch(er=>{});
  }
  edit(item,i){
    let modalRef = this._modal.open(ModalTinhTrangPhapLyComponent,{
      size:'xl',
      backdrop:'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.item.NgayKy = new Date(item.NgayKy);
    modalRef.componentInstance.item.ThoiGianBienDong = new Date(item.ThoiGianBienDong);
    modalRef.result.then(res=>{
      this.items.splice(i,1);
      this.items.push(res.item);
      if(res.opt!=='add'){
        this.add()
      }
    }).catch(er=>{});
  }
  delete(i){
    let item = this.items.splice(i, 1)[0];
    if(item.ID===0){
    }else{
      item.isXoa = true;
      this.items.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
