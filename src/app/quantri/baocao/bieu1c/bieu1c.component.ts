import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bieu1c',
  templateUrl: './bieu1c.component.html',
  styleUrls: ['./bieu1c.component.css']
})
export class Bieu1cComponent implements OnInit {
  r1:any=[];
  r2:any=[];
  r3:any=[];
  cols:any=[1,2,3,4,5,6,7,8];
  tds:any=[];
  products:any=[1];
  constructor() { }

  ngOnInit(): void {
    this.r1 = [
      {rs:3,cs:1,label:'STT'},
      {rs:3,cs:1,label:'Tên đơn vị'},
      {rs:3,cs:1,label:'Số cơ sở'},
      {rs:1,cs:2,label:'Đất'},
      {rs:1,cs:4,label:'Nhà'},
      {rs:1,cs:12,label:'Hiện trạng sử dụng'},
      {rs:2,cs:3,label:'Có Đề án đã được phê duyệt'},
      {rs:2,cs:3,label:'Chưa có Đề án'},
      {rs:1,cs:6,label:'Hiện trạng đang cập nhật trên hệ thống dữ liệu tài sản công'},
      {rs:3,cs:1,label:'Ghi chú'}
    ]
    this.r2 = [
      {rs:2,cs:1,label:'m2'},
      {rs:2,cs:1,label:'Giá trị theo sổ sách kế toán'},
      {rs:2,cs:1,label:'m2 sàn xây dựng'},
      {rs:1,cs:2,label:'Nguyên giá'},
      {rs:2,cs:1,label:'Giá trị còn lại'},
      {rs:1,cs:3,label:'Kinh doanh'},
      {rs:1,cs:3,label:'Cho thuê'},
      {rs:1,cs:3,label:'Liên doanh'},
      {rs:1,cs:3,label:'Liên kết'},
      {rs:1,cs:3,label:'Hoạt động sự nghiệp'},
      {rs:1,cs:3,label:'Bị lấn chiếm'},
    ];
    this.r3 = [
      {rs:1,cs:1,label:'Ngân sách'},
      {rs:1,cs:1,label:'Nguồn khác'},
    ]
    for(let i=1;i<=8;i++){
      this.r3.push(
        {rs:1,cs:1,label:'Số cơ sở'},
        {rs:1,cs:1,label:'Đất (m2)'},
        {rs:1,cs:1,label:'Nhà (m2)'},
      )
    }
    for(let i=1;i<=34;i++){
      this.tds.push(i);
    }
  }

}
