import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { ModalchonthuadatComponent } from '../modalchonthuadat/modalchonthuadat.component';

@Component({
  selector: 'app-modalquytrinhsapxep',
  templateUrl: './modalquytrinhsapxep.component.html',
  styleUrls: ['./modalquytrinhsapxep.component.css']
})
export class ModalquytrinhsapxepComponent implements OnInit {
  opt: any = ''
  item: any = {
    ID: 0,
    TepDinhKems: [],
    listTaiSanQuyTrinh: []
  };
  checkbutton: any = {}
  listPhuongAnSapXep: any = [];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    this.GetListdmPhuongAnSapXep();
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
  }
  KiemTraButtonModal() {
    this.services.KiemTraButtonModal(this.item.ID || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      // console.log(data);
      // console.log(this.item.TepDinhKems);
      // let itemupload:any = {};
      // itemupload.ID = 0;
      // itemupload.TenGui = data[data.length - 1]?.Name||null;
      // itemupload.TenGoc = data[data.length - 1]?.NameLocal||null;
      // itemupload.DuongDan = data[data.length - 1]?.Url||null;
      // if(itemupload.TenGui!== null){
      //   if(this.item.TepDinhKems.length!==0){
      //     this.item.TepDinhKems.forEach(ele => {
      //       ele.isXoa =true;
      //     });
      //   }
      //   this.item.TepDinhKems.unshift(itemupload);
      //   console.log(this.item);
      // }
    }, (reason) => {

    });
  }
  ChuyenDuyet() {
    this.services.ChuyenTiepQuyTrinh(this.item).subscribe((res:any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  GetListdmPhuongAnSapXep() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this.services.GetListdmPhuongAnSapXep(data).subscribe((res: any) => {
      this.listPhuongAnSapXep = res;
      if (this.opt === 'edit') {
        if (this.item.listTaiSanQuyTrinh.length !== 0) {
          this.item.listTaiSanQuyTrinh.forEach(ele => {
            ele.tempPhuongAnSapXep = res.filter(pa => pa.ID === ele.IDdmPhuongAnDeXuat)[0];
          });
        }
      }
    })
  }
  GetNextSoQuyTrinh() {
    this.services.GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res;
    })
  }
  // GetQuyTrinh(Id){
  //   this.services.GetQuyTrinh(Id).subscribe(res=>{
  //     // this.item = res;
  //     console.log(res);
  //   })
  // }
  chonThuaDat() {
    let modalRef = this._modal.open(ModalchonthuadatComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.selectedList = JSON.parse(JSON.stringify(this.item.listTaiSanQuyTrinh));
    modalRef.result.then(res => {
      res.items.forEach(dat => {
        dat.TaiSanDat.tempPhuongAnSapXep = this.listPhuongAnSapXep.filter(ele => ele.ID === dat.TaiSanDat.IDdmPhuongAnSapXep)[0];
      });
      let templistTaiSanQuyTrinh = JSON.parse(JSON.stringify(res.items)).map((ele: any) => {
        return {
          ID: 0,
          IdQuyTrinh: this.item.ID,
          NoiDung: ele.TaiSanDat.DiaChi + ' - ' + ele.TaiSanDat.TendmPhuong + ' - ' + ele.TaiSanDat.TendmQuan + ' - ' + ele.TendmTinh,
          TenPhuongAnDeXuat: ele.TaiSanDat.tempPhuongAnSapXep?.Ten || '',
          MucDichSuDung: ele.TaiSanDat.TendmMucDichSuDung,
          IDdmPhuongAnDeXuat: ele.TaiSanDat.tempPhuongAnSapXep?.ID || null,
          tempPhuongAnSapXep: ele.tempPhuongAnSapXep,
          HienTrangSuDung: ele.HienTrangSuDungs[0]?.NoiDung || '',
          GhiChu: ele.GhiChu,
          IDTaiSan: ele.ID,
          DienTichDat: ele.TaiSanDat.DTSuDungRieng,
          DienTichNha: ele.TaiSanDat.DTSuDungChung,
          HoSos: ele.HoSos,
        }
      });
      this.item.listTaiSanQuyTrinh = this.merge(templistTaiSanQuyTrinh, this.item.listTaiSanQuyTrinh);
    }).catch(er => {
      console.log(er);
    })
  }
  GhiLai() {
    if (this.item.listTaiSanQuyTrinh.length !== 0) {
      this.services.SetQuyTrinh(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.GetListdmPhuongAnSapXep()
            this.KiemTraButtonModal();
            // this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.warning('Vui lòng chọn thửa đất để khởi tạo quy trình!');
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.DeleteQuyTrinh(this.item).subscribe((res: any) => {
        console.log(res);
        if(res?.State===1){
          this.activeModal.close();
        }else{
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  merge(newArr, existingArr) {
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle.IDTaiSan === oldEle.IDTaiSan
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      let indexCheck = newArr.findIndex(

        (newEle) => newEle.IDTaiSan === oldEle.IDTaiSan
      );
      if (indexCheck === -1) {
        removeIndex.push(index);
      }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      if (existingArr[i].ID === 0) {
        existingArr.splice(removeIndex[i], 1);
      } else {
        existingArr[i].isXoa = true;
      }
    }
    return existingArr;
  }
  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
}
