import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bieu2b',
  templateUrl: './bieu2b.component.html',
  styleUrls: ['./bieu2b.component.css']
})
export class Bieu2bComponent implements OnInit {
  r1:any=[];
  r2:any=[];
  r3:any=[];
  cols:any=[1,2,3,4,5,6,7,8,9,10,11];
  tds:any=[];
  products:any=[1];
  constructor() { }

  ngOnInit(): void {
    this.r1 = [
      {rs:3,cs:1,label:'STT'},
      {rs:3,cs:1,label:'Diễn giải'},
      {rs:2,cs:3,label:'Số cơ sở nhà đất đã được phê duyệt'},
      {rs:1,cs:24,label:'Phương án sắp xếp lại, xử lý nhà đất đã phê duyệt (lần cuối)'},
      {rs:1,cs:6,label:'Kết quả thực hiện phương án'},
      {rs:3,cs:1,label:'Ghi chú'}
    ]
    this.r2 = [
      {rs:1,cs:3,label:'Giữ lại tiếp tục sử dụng'},
      {rs:1,cs:3,label:'Thu hồi'},
      {rs:1,cs:3,label:'Điều chuyển'},
      {rs:1,cs:3,label:'Bán TS trên đất, chuyển nhượng QSD đất'},
      {rs:1,cs:3,label:'Chuyển mục đích sử dụng'},
      {rs:1,cs:3,label:'Chuyển giao về địa phương'},
      {rs:1,cs:3,label:'Tạm giữ lại tiếp tục sử dụng'},
      {rs:1,cs:3,label:'Phương án xử lý khác'},
      {rs:1,cs:3,label:'Đã hoàn thành'},
      {rs:1,cs:3,label:'Chưa hoàn thành'},
    ];
    this.r3 = [];
    for(let i=1;i<=11;i++){
      this.r3.push(
        {rs:1,cs:1,label:'Số cơ sở'},
        {rs:1,cs:1,label:'Đất (m2)'},
        {rs:1,cs:1,label:'Nhà (m2)'},
      )
    }
    for(let i=1;i<=36;i++){
      this.tds.push(i);
    }
  }
}
