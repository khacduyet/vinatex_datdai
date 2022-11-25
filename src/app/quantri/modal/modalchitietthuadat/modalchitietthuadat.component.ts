import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalchitietthuadat',
  templateUrl: './modalchitietthuadat.component.html',
  styleUrls: ['./modalchitietthuadat.component.css']
})
export class ModalchitietthuadatComponent implements OnInit {
  selectedThuaDat:any={};
  ThongKeThongTinThuaDat:any=[];
  activedTab:string = '';
  constructor( public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
