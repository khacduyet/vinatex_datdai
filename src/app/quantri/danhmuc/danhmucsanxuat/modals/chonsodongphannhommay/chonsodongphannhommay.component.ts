import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs/internal/scheduler/async';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chonsodongphannhommay',
  templateUrl: './chonsodongphannhommay.component.html',
  styleUrls: ['./chonsodongphannhommay.component.css']
})
export class ChonsodongphannhommayComponent implements OnInit {

  item: any = {};

  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  accept() {
    this.activeModal.close();
  }

}
