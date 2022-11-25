import { Component, OnInit, Input } from '@angular/core';
import { Dat09Service } from 'src/app/services/callApi';
import { validVariable } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-ho-so-van-ban-phap-quy',
  templateUrl: './ho-so-van-ban-phap-quy.component.html',
  styleUrls: ['./ho-so-van-ban-phap-quy.component.css']
})
export class HoSoVanBanPhapQuyComponent implements OnInit {
  @Input('item') items: any = [];
  // items: any = [
  //   {
  //     SoVanBan:'QC-1308',
  //     TenVanBan:'Giấy chứng nhận quyền sử dụng đất',
  //     NgayQuyetDinh:'20/02/2009',
  //     CoQuanBanHanh:'Sở tài nguyên và môi trường',
  //     GhiChu:'',
  //     NoiLuuTru:'D:/ádjklaklsdjklasjkld/ạkhdjkahjkdhas/ạkldhakl.png',
  //     TepDinhKem:'GCN-QC-1308.pdf',
  //   }
  // ];
  listLoaiVanBan:any=[];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Loại văn bản',
      field: 'TenLoaiVanBan',
      width: '100px'
    },
    {
      header: 'Trích yếu',
      field: 'GhiChu',
      width: '150px'
    },
    {
      header: 'Tên văn bản',
      field: 'TenVanBan',
      width: '150px'
    },
    {
      header: 'CQ ban hành',
      field: 'CoQuanBanHanh',
      width: '200px'
    },
    {
      header: 'Số văn bản',
      field: 'SoVanBan',
      width: '100px'
    },
    {
      header: 'Ngày quyết định',
      field: 'NgayQuyetDinh',
      width: '100px',
      type:'date'
    },
    {
      header: 'Nơi lưu trữ văn bản gốc',
      field: 'NoiLuuTru',
      width: '200px'
    },
    {
      header: 'Tệp đính kèm',
      field: 'TepDinhKem',
      width: '150px'
    },
  ];

  constructor(private _services:Dat09Service) { }

  ngOnInit(): void {
    this.GetListLoaiVanBan()
  }
  download(endpoint) {
    window.open(API.imgURL + endpoint+'&viewOnly=true');
  }
  getLabel(Id){
    if(validVariable(Id)){
      return this.listLoaiVanBan.find(ele=>ele.value === Id)?.label;
    }else{
      return '';
    }
  }
  GetListLoaiVanBan(){
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this._services.GetListLoaiVanBan(data).subscribe((res: any) => {
      this.listLoaiVanBan = res.map(ele=>{
        return {
          value:ele.ID,
          label:ele.Ten
        }
      });
    })
  }
}
