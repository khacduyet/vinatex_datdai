import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Dat09Service } from 'src/app/services/callApi';

@Component({
  selector: 'app-modalchonthuadat',
  templateUrl: './modalchonthuadat.component.html',
  styleUrls: ['./modalchonthuadat.component.css']
})
export class ModalchonthuadatComponent implements OnInit {
  @ViewChild('chonVung') chonVung: any;
  thuaDats:any=[];
  selectedThuaDats:any=[];
  vung: any = {

  };
  selectedList:any=[];
  keyWord:string ="";
  showSoDos:boolean = false;
  ThongKeThongTinThuaDat: any = [];
  currentUser: any;
  selectedVung: TreeNode = {};
  vungs: TreeNode[] = [];
  constructor(private _modal: NgbModal, private _services: Dat09Service, private _auth: AuthenticationService, private _toast: ToastrService,private _activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.GetListdmDonVi();
  }
  GetListdmDonVi() {
    let data = {
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: "",
    };
    this._services.GetListdmDonVi(data).subscribe(
      (res: any) => {
        let data = res.map((ele: any) => {
          return {
            label: ele.Ten,
            data: ele,
            key: ele.ID.toString(),
            parentKey: ele.IDParent?.toString() || null
          }
        })
        this.flatToTreeArray(data, "key", "parentKey");
        this.GetListTaiSanDat();
      },
      (err: any) => {
        this.vung["Ten"] = "Có lỗi xảy ra";
      }
    );
  }
  flatToTreeArray(list, Id: string, pId: string) {
    let finalData = [];
    list.forEach((element) => {
      element.children = [];
    });
    list.forEach((element) => {
      if (element[pId] !== null) {
        if (
          list.filter((e: any) => e[Id] === element[pId])[0] !== null &&
          list.filter((e: any) => e[Id] === element[pId])[0] !== undefined
        ) {
          list
            .filter((e: any) => e[Id] === element[pId])[0]
            .children.push(element);
        } else {
          finalData.push(element);
        }
      } else {
        finalData.push(element);
      }
    });
    this.vungs = finalData;
    this.selectedVung = list[0];
    this.vung = this.selectedVung.data;
  }
  nodeSelect(event): void {
    this.chonVung.hide();
    this.vung = event.node.data;
    this.selectedThuaDats = [];
    this.GetListTaiSanDat();
  }
  GetListTaiSanDat() {
    let data = {
      PageSize: 5,
      CurrentPage: 0,
      IDdmDonVi: this.vung.ID,
      sFilter: this.keyWord
    };
    this._services.GetListTaiSanDat(data).subscribe((res: any) => {      
      if(this.selectedList.length!==0){
        this.selectedList.forEach(ele => {
          let item = res.filter(e=>e.ID === ele.IDTaiSan)[0];
          if(item){
            this.selectedThuaDats.push(item);
          }
        });
      }
      console.log(this.selectedThuaDats);
      this.thuaDats = res;
    });
  }
  XacNhanChon(){
    this._activeModal.close({items:this.selectedThuaDats});
  }
}
