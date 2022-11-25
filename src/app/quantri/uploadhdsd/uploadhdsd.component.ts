import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { UploadmodalComponent } from '../modal/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-uploadhdsd',
  templateUrl: './uploadhdsd.component.html',
  styleUrls: ['./uploadhdsd.component.css']
})
export class UploadhdsdComponent implements OnInit {
  hdsd: any={};
  constructor(private _modal: NgbModal, private _danhmuc: Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.getiHDSD();
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.hdsd.ID = 0;
      this.hdsd.TenGui = data[data.length - 1].Name;
      this.hdsd.TenGoc = data[data.length - 1].NameLocal;
      this.hdsd.DuongDan = data[data.length - 1].Url;
    }, (reason) => {
    });
  }
  uploadHDSD(){
    this._danhmuc.SetTepDinhKemHuongDanSuDung(this.hdsd).subscribe((res:any)=>{
      if(res?.State===1){
        this._toastr.success(res.message)
      }else{
        this._toastr.error(res.message)
      }
    })
  }
  getiHDSD(){
    this._danhmuc.GetTepDinhKemHuongDanSuDung().subscribe((res:any)=>{
      console.log(res)
      this.hdsd = res;
    })
  }
}
