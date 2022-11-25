import { formatNumber } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dieuhanhsanxuattonghop',
  templateUrl: './dieuhanhsanxuattonghop.component.html',
  styleUrls: ['./dieuhanhsanxuattonghop.component.css']
})
export class DieuhanhsanxuattonghopComponent implements OnInit, AfterViewInit {
  filter: any =
    {
      IdDuAn: 0,
      IddmPhanXuong: "",
      IddmCaSanXuat: "",
      nNam: 0,
      nThang: 0,
      nNgay: 0,
    };
  @ViewChild('bangScroll') bangScroll: ElementRef;
  listNhaMay: any = [];
  listMatHang: any = [];
  listSanLuongOng: any = [];
  listPhanXuong: any = [];
  listCa: any = [];
  listThang: any = [];
  listtieuchi: any = [];
  listNgay: any = [];
  thongKes: any = [];
  thongKes1: any = [];
  Nams: any = [];
  dataSet1: any = {};
  showSanLuong = false;
  showTruySuatNguonGoc = false;
  currentUser: any;
  IdDuAn: any;
  listTruySuatNguonGoc:any=[];
  optionPie: any = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
      }
    },
    legend: {
      position: 'left'
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'vi-VN')} kg`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
        // type: 'category',
        // labels: ['January', 'February', 'March', 'April', 'May', 'June']
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 2) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  SelectItem: any = {};
  dataPie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
  chatLuongSanPham: any = [];
  headerChatLuongSanPham: any = [];
  chatLuongSanPhamScrollHeight: any = 0;

  constructor(private _services: SanXuatService, private _auth: AuthenticationService, private store: StoreService, public toastr: ToastrService) {
    this.currentUser = this._auth.currentUserValue;
    this.store.getNhaMay().subscribe(res => {
      this.IdDuAn = res;
      this.BieuDoCoCau();
    })
    // this.IdDuAn = this.store.getCurrent();
  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.Nams.push({ value: (new Date()).getFullYear() - i, label: (new Date()).getFullYear() - i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ value: i, label: `Tháng ${i}` });
      this.headerChatLuongSanPham.push({
        label: `T ${i}`,
        prop: `Thang${i}`
      })
    }
    for (let i = 1; i <= 31; i++) {
      this.listNgay.push({ value: i, label: `${i}` });
    }
    this.filter.nNgay = (new Date()).getDate();
    this.filter.nThang = (new Date()).getMonth() + 1;
    this.filter.nNam = (new Date()).getFullYear();
    // this.dataSet1 = {
    //   labels: this.listThang.map(ele => ele.label),
    //   datasets: [
    //     {
    //       type: 'line',
    //       label: 'NE 30 CVCM 60/40',
    //       borderColor: '#FF0000',
    //       // borderWidth: 2,
    //       fill: false,
    //       data: [928, 862, 928, 848, 765, 806, 721, 655, 655, 655, 655, 655],
    //       // steppedLine: 'before'
    //     },
    //     {
    //       type: 'line',
    //       label: 'Tiêu chuẩn',
    //       borderColor: '#0000E5',
    //       // borderDash: [10, 5],
    //       // borderWidth: 2,
    //       fill: false,
    //       data: Array.from({ length: 12 }, () => 800),
    //     },
    //   ]
    // }
    // this.thongKes = [
    //   { Ten: 'Sản lượng ống', TieuHao: 15268, DonVi: 'quả', ManHinh: 15268 },
    //   { Ten: 'Lũy kế', TieuHao: 407465, DonVi: 'quả', ManHinh: 407465 },
    //   { Ten: 'Điện AC', TieuHao: 3606, DonVi: 'KW', ManHinh: 3606 },
    //   { Ten: 'Tổng điện', TieuHao: 45150, DonVi: 'KW', ManHinh: 45150 },
    //   { Ten: 'Điện AC', TieuHao: 8, DonVi: '%', ManHinh: 8 },
    // ]
    // this.thongKes1 = [
    //   { Ten: 'Ne BQ:', GiaTri: 28 },
    //   { Ten: 'Sản lượng quy Ne 30:', GiaTri: 14131 },
    //   { Ten: 'Lũy kế quy Ne 30:', GiaTri: 379106 },
    //   { Ten: 'Sản lượng quy Ne 30/ca:', GiaTri: 4710 },
    //   { Ten: 'Sản lượng Ne 30 KH/ca:', GiaTri: 5000 },
    //   { Ten: 'LK % hoàn thành KHSX:', GiaTri: 90 },
    // ]
    // this.dataPie = {
    //   labels: ['Ne 16 CD', 'Ne 20 CD', 'Ne 32 CD', 'Khác'],
    //   datasets: [
    //     {
    //       data: [300, 50, 100, 200],
    //       backgroundColor: [
    //         "#009900",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF671F"
    //       ],
    //       hoverBackgroundColor: [
    //         "#009900",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF671F"
    //       ]
    //     }
    //   ]
    // };
    this.getAllOptions();
  }

  ngAfterViewInit(): void {
    this.chatLuongSanPhamScrollHeight = `${this.bangScroll.nativeElement.offsetHeight - 35}px`;
  }

  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    let data2 = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      CongDoan: this.filter.CongDoan ? this.filter.CongDoan : '',
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmPhanXuong(data2).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this._services.BaoCao().GetDanhSachChiTieuChatLuong_BieuDo().subscribe((res: any) => {
      this.listtieuchi = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmChiTieu = this.listtieuchi.filter(obj => obj.value == "2a3dbea0-6c3f-4e10-9774-6201027f4bd0")[0].value;
    })
    // this._services.GetOptions().GetMatHang().subscribe((res: any) => {
    //   let fakeMatHang = [
    //     { label: 'Ne 20 CD', TC: 110, T1: 85, T2: 104, T3: 98, T4: 104, T5: 149, T6: 98, T7: 85, T8: 115, T9: 80, T10: 78, T11: 115, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 14101 },
    //     { label: 'Ne 30 CD', TC: 400, T1: 503, T2: 467, T3: 371, T4: 619, T5: 474, T6: 426, T7: 322, T8: null, T9: 411, T10: 398, T11: 453, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 12021 },
    //     { label: 'Ne 36 CD', TC: 800, T1: 794, T2: 756, T3: 771, T4: null, T5: 909, T6: 717, T7: null, T8: null, T9: null, T10: null, T11: null, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 13803 },
    //     { label: 'Ne 40 CD', TC: 980, T1: 956, T2: 946, T3: 1143, T4: 1208, T5: 1163, T6: 962, T7: 972, T8: 801, T9: 823, T10: null, T11: null, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 15070 },
    //   ]
    //   this.listMatHang = [...fakeMatHang, ...mapArrayForDropDown(res, 'Ten', 'Id')];
    //   this.listMatHang.forEach(mathang => {
    //     mathang.checked = false;
    //   });
    // });
    // this._services.GetListdmKho(data).subscribe((res: any) => {
    //   this.listKho = mapArrayForDropDown(res, 'Ten', 'Id')
    // });
    // this._services.GetListCongDoan().subscribe((res: any) => {
    //   this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
    // });
    // this._services.GetListdmMay(data).subscribe((res: any) => {
    //   this.listMay = mapArrayForDropDown(res, "Ma", 'Id')
    // });
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng ca' });
      this.listCa = mapArrayForDropDown(res, "Ten", 'Id')
    });
    // this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
    //   res.unshift({ Id: '', Ten: 'Tổng hợp' });
    //   this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    // })
    this._services.GetOptions().GetNhaMay().subscribe(async (res: any) => {
      this.listNhaMay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.filter.IdDuAn = await res[0].Id;
      this.TongHop();
      this.BieuDoCoCau();
      this.GetBaoCaoQuyTrinhKiemTraChatLuong();
    });
  }

  filterdata() {
    this.TongHop();
    this.BieuDoCoCau();
    this.GetBaoCaoQuyTrinhKiemTraChatLuong();
    this.SelectItem = null;
  }

  filterdatatonghop() {
    this.TongHop();
    this.BieuDoCoCau();
  }

  TongHop() {
    this.filter.IdDuAn = this.IdDuAn;
    this._services.BaoCao().TongHop(this.filter).subscribe((res: any) => {
      this.thongKes = res;
      this.thongKes = [
        { Ten: 'Sản lượng ống', TieuHao: res.SanLuongOng, DonVi: 'quả', ManHinh: res.SanLuongOng_ManHinh },
        { Ten: 'Lũy kế', TieuHao: res.LuyKe, DonVi: 'quả', ManHinh: res.LuyKe_ManHinh },
        // Điện k có màn hình
        { Ten: 'Điện AC', TieuHao: "KwH", DonVi: 'KW', ManHinh: res.DienAC_KW },
        { Ten: 'Tổng điện', TieuHao: "KwH", DonVi: 'KW', ManHinh: res.TongDien_KW, button: 'xuatexcel' },
        { Ten: 'Tỷ lệ điện AC', TieuHao: '%', DonVi: '%', ManHinh: res.DienAC_PhanTram },
      ]
      this.thongKes1 = [
        { Ten: 'Ne BQ:', GiaTri: res.NeBQ },
        { Ten: 'Sản lượng quy Ne 30:', GiaTri: res.SanLuongQuyNe30 },
        { Ten: 'Lũy kế quy Ne 30:', GiaTri: res.LuyKeQuyNe30 },
        // { Ten: 'Sản lượng quy Ne 30/ca:', GiaTri: res.SanLuongQuyNe30_Ca },
        // { Ten: 'Sản lượng Ne 30 KH/ca:', GiaTri: res.SanLuongQuyNe30KH_Ca },
        { Ten: 'LK % hoàn thành KHSX:', GiaTri: res.LuyKePhanTramHoanThanhKHSX },
      ]
    });
    this._services.BaoCao().GetDashBoard_SanLuongOng(this.filter).subscribe((res: any) => {
      this.listSanLuongOng = res;
    })
  }

  BieuDoCoCau() {
    this.filter.IdDuAn = this.IdDuAn;
    let data: any = { IdDuAn: this.filter.IdDuAn, IddmPhanXuong: this.filter.IddmPhanXuong, nNam: this.filter.nNam };
    this._services.BaoCao().BieuDoCoCau(data).subscribe((res: any) => {
      this.dataPie = res;
    });
  }

  GetBaoCaoQuyTrinhKiemTraChatLuong() {
    // this._services.BaoCao().GetBaoCaoQuyTrinhKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39").subscribe((res: any) => {
    this._services.BaoCao().GetBaoCaoQuyTrinhKiemTraChatLuong(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, '').subscribe((res: any) => {
      this.listMatHang = res;
      this.listMatHang.forEach(mathang => {
        mathang.checked = false;
      });
      this.SelectItem = {};
      this.dataSet1 = [];
    });
  }

  resetFilter() {
    this.filter.KeyWord = '';
    this.GetBaoCaoQuyTrinhKiemTraChatLuong();
  }

  GetBieuDoDuongKiemTraChatLuong() {
    this.GetBaoCaoQuyTrinhKiemTraChatLuong();

    this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, this.SelectItem.IddmItem).subscribe((res: any) => {
      // this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39", "02bd1952-5092-496f-a566-2f0ac6ab4940").subscribe((res: any) => {
      // this.dataSet1 = res;
      let label = this.listtieuchi.filter(obj => obj.value == this.filter.IddmChiTieu)[0].label;

      this.dataSet1 = {
        labels: this.listThang.map(ele => ele.label),
        datasets: [
          {
            type: 'line',
            label: this.SelectItem.TenItem,
            borderColor: '#FF0000',
            // borderWidth: 2,
            fill: false,
            data: res.listThucTe,
            // steppedLine: 'before'
          },
          {
            type: 'line',
            label: label,
            borderColor: '#0000E5',
            // borderDash: [10, 5],
            // borderWidth: 2,
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
    });
  }

  xemSanLuong() {
    this.showSanLuong = true;
  }

  checkMatHang(e, item, index) {
    if (e.checked) {
      this.listMatHang.forEach(mathang => {
        mathang.checked = false
      });
      this.listMatHang[index].checked = true;
      this.SelectItem = this.listMatHang[index];
      this.GetBieuDoDuongKiemTraChatLuong_js();
    }
    else {
      this.SelectItem = {};
      this.dataSet1 = [];
    }
  }
  checkXuatMatHang(e,item,index){
    if(item.xuatChecked){
      item.xuatChecked = !item.xuatChecked;
    }else{
      item.xuatChecked = true;
    }
  }
  GetBieuDoDuongKiemTraChatLuong_js() {

    this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, this.SelectItem.IddmItem).subscribe((res: any) => {
      // this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39", "02bd1952-5092-496f-a566-2f0ac6ab4940").subscribe((res: any) => {
      // this.dataSet1 = res;
      let label = this.listtieuchi.filter(obj => obj.value == this.filter.IddmChiTieu)[0].label;

      this.dataSet1 = {
        labels: this.listThang.map(ele => ele.label),
        datasets: [
          {
            type: 'line',
            label: this.SelectItem.TenItem,
            borderColor: '#FF0000',
            // borderWidth: 2,
            fill: false,
            data: res.listThucTe,
            // steppedLine: 'before'
          },
          {
            type: 'line',
            label: label,
            borderColor: '#0000E5',
            // borderDash: [10, 5],
            // borderWidth: 2,
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
    });
  }
  xuatBaoCaoDien() {
    this._services.DashBoard().ExportBaoCaoThongKeDien(this.filter).subscribe((res:any) => {
      this._services.download(res.TenFile);
    })
  }
  xuatBaoCaoTieuChi(){
    let data = this.filter;
    data.listItem = this.listMatHang.filter(mathang=>mathang.xuatChecked ===true).map(ele=>ele.Id);
    this._services.DashBoard().ExportBaoCaoThongKeChatLuong(this.filter).subscribe((res:any) => {
      if(res){
        if(validVariable(res.State)){
          this.toastr.error(res.message);
        }else{
          this._services.download(res.TenFile);
        }
      }
    })
  }
  xemTruySuatNguonGoc() {
    if (this.SelectItem.IddmItem != undefined) {
      if (validVariable(this.SelectItem?.IddmItem)) {
        let data=this.filter;
        data.IddmItem = this.SelectItem.IddmItem;
        this._services.DashBoard().GetDashBoard_TruyXuatNguonGocTongHop(data).subscribe((res: any) => {
          this.showTruySuatNguonGoc = true;
          this.listTruySuatNguonGoc = res;
          this.listTruySuatNguonGoc.forEach(obj=>{            
            obj.herfgiaokehoachsanxuat = `#/quantri/kehoachsanxuat/giaokehoachsanxuat/${obj.IdGiaoKeHoachSanXuat}`;
            obj.herftrienkhaikehoachsanxuat = `#/quantri/kehoachsanxuat/trienkhaikehoachsanxuat/${obj.IdGiaoKeHoachSanXuat_TrienKhai}`;
            obj.herfphabong = `#/quantri/trienkhaisanxuat/phabong/${obj.IdPhuongAnPhaBong}`;
          });          
        })
      }
      else {
        this.toastr.error("Yêu cầu chọn mặt hàng");
      }
    }
    else {
      this.toastr.error("Yêu cầu chọn mặt hàng");
    }
  }
}
