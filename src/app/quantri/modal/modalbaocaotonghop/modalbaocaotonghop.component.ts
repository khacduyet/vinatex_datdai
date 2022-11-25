import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalbaocaotonghop',
  templateUrl: './modalbaocaotonghop.component.html',
  styleUrls: ['./modalbaocaotonghop.component.css']
})
export class ModalbaocaotonghopComponent implements OnInit {
  IDVung:any;
  constructor(public _modalActive:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
