import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thong-ke-thong-tin-thua-dat',
  templateUrl: './thong-ke-thong-tin-thua-dat.component.html',
  styleUrls: ['./thong-ke-thong-tin-thua-dat.component.css']
})
export class ThongKeThongTinThuaDatComponent implements OnInit {
  
  @Input('item') items:any= [];

  constructor() { }

  ngOnInit(): void {
  }

}
