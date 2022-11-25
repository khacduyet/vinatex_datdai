import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-xepbanbongmodal',
  templateUrl: './xepbanbongmodal.component.html',
  styleUrls: ['./xepbanbongmodal.component.css']
})
export class XepbanbongmodalComponent implements OnInit {

  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
  }

}
