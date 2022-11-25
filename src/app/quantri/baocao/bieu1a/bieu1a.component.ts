import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bieu1a',
  templateUrl: './bieu1a.component.html',
  styleUrls: ['./bieu1a.component.css']
})
export class Bieu1aComponent implements OnInit {
  r1:any=[];
  r2:any=[];
  r3:any=[];
  cols:any=[1,2,3,4,5,6,7];
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
      {rs:1,cs:21,label:'Hiện trạng sử dụng'},
      {rs:3,cs:1,label:'Ghi chú'}
    ]
    this.r2 = [
      {rs:2,cs:1,label:'m2'},
      {rs:2,cs:1,label:'Giá trị theo sổ sách kế toán'},
      {rs:2,cs:1,label:'m2 sàn xây dựng'},
      {rs:1,cs:2,label:'Nguyên giá'},
      {rs:2,cs:1,label:'Giá trị còn lại'},
      {rs:1,cs:3,label:'Trụ sở làm việc'},
      {rs:1,cs:3,label:'Cơ sở hoạt động sự nghiệp'},
      {rs:1,cs:3,label:'Làm nhà ở'},
      {rs:1,cs:3,label:'Cho thuê'},
      {rs:1,cs:3,label:'Bỏ trống'},
      {rs:1,cs:3,label:'Bị lấn chiếm'},
      {rs:1,cs:3,label:'Sử dụng vào mục đích khác'},
    ];
    this.r3 = [
      {rs:1,cs:1,label:'Ngân sách'},
      {rs:1,cs:1,label:'Nguồn khác'},
    ]
    for(let i=1;i<=7;i++){
      this.r3.push(
        {rs:1,cs:1,label:'Số cơ sở'},
        {rs:1,cs:1,label:'Đất (m2)'},
        {rs:1,cs:1,label:'Nhà (m2)'},
      )
    }
    for(let i=1;i<=31;i++){
      this.tds.push(i);
    }
  }

}
