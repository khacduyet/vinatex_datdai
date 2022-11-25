import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Dat09Service } from 'src/app/services/callApi';

@Component({
  selector: 'app-baocaochitietcaccoso',
  templateUrl: './baocaochitietcaccoso.component.html',
  styleUrls: ['./baocaochitietcaccoso.component.css']
})
export class BaocaochitietcaccosoComponent implements OnInit {
  vung: any = {

  };
  @ViewChild('chonVung') chonVung: any;
  currentUser: any;
  selectedVung: TreeNode = {};
  vungs: TreeNode[] = [];
  pagingThuaDat: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  keyWord:string ='';
  items:any=[];
  constructor(private _modal: NgbModal, private _services: Dat09Service, private _auth: AuthenticationService, private _toast: ToastrService) {
    this.currentUser = this._auth.currentUserValue;
  }

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
        // this.selectedVung = res[0];
        this.flatToTreeArray(data, "key", "parentKey");
        this.GetBaoCaoChiTiet();
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
    // this.selectedVung = list.filter(ele => ele[Id] === this.currentUser.IDdmDonVi.toString())[0];
    this.selectedVung = list[0];
    this.vung = this.selectedVung.data;
  }
  nodeSelect(event): void {
    this.chonVung.hide();
    this.vung = event.node.data;
    this.GetBaoCaoChiTiet();
  }
  GetBaoCaoChiTiet(){
    // let data ={
    //   IDdmDonVi:this.vung.ID
    // }
    this._services.GetBaoCaoChiTietCoSo(this.vung.ID).subscribe(res=>{
      this.items = [];
      // console.log(res);
      this.flattenRecursive(res,1);
    });
  }
  flattenRecursive(tree,level){
    tree.forEach(ele => {
      ele.Level = level;
      this.items.push(ele);
      if(ele.listBaocao!==undefined && ele.listBaocao!==null && ele.listBaocao.length !== 0){
        this.flattenRecursive(ele.listBaocao,level+1);
      }
    });
  }
  test(){
    console.log(this.items);
  }
}
