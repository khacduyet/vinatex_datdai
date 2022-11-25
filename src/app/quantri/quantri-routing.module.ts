import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuantriComponent } from './quantri.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuanlytaisannhadatComponent } from './quanlytaisannhadat/quanlytaisannhadat.component';
import { YeucausapxepComponent } from './sapxepxuly/yeucausapxep/yeucausapxep.component';
import { QuytrinhsapxepComponent } from './sapxepxuly/quytrinhsapxep/quytrinhsapxep.component';
import { DmdonviComponent } from './danhmuc/dmdonvi/dmdonvi.component';
import { DmhinhthucxulyComponent } from './danhmuc/dmhinhthucxuly/dmhinhthucxuly.component';
import { DmtaisanComponent } from './danhmuc/dmtaisan/dmtaisan.component';
import { BiendongComponent } from './danhmuc/biendong/biendong.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { DmmucdichsudungComponent } from './danhmuc/dmmucdichsudung/dmmucdichsudung.component';
import { DmnguongocdatComponent } from './danhmuc/dmnguongocdat/dmnguongocdat.component';
import { TinhComponent } from './danhmuc/tinh/tinh.component';
import { QuanComponent } from './danhmuc/quan/quan.component';
import { PhuongComponent } from './danhmuc/phuong/phuong.component';
import { DmcaphangcongtrinhComponent } from './danhmuc/dmcaphangcongtrinh/dmcaphangcongtrinh.component';
import { TheodoithongkebaocaoComponent } from './theodoithongkebaocao/theodoithongkebaocao.component';
import { Bieu1aComponent } from './baocao/bieu1a/bieu1a.component';
import { Bieu1bComponent } from './baocao/bieu1b/bieu1b.component';
import { Bieu1cComponent } from './baocao/bieu1c/bieu1c.component';
import { Bieu2aComponent } from './baocao/bieu2a/bieu2a.component';
import { Bieu2bComponent } from './baocao/bieu2b/bieu2b.component';
import { Bieu3Component } from './baocao/bieu3/bieu3.component';
import { Bieu4Component } from './baocao/bieu4/bieu4.component';
import { Bieu5Component } from './baocao/bieu5/bieu5.component';
import { BaocaochitietcaccosoComponent } from './baocao/baocaochitietcaccoso/baocaochitietcaccoso.component';
import { DmhientrangsudungComponent } from './danhmuc/dmhientrangsudung/dmhientrangsudung.component';
import { DonvisohuudatnhaComponent } from './danhmuc/donvisohuudatnha/donvisohuudatnha.component';
import { DmloaivanbanComponent } from './danhmuc/dmloaivanban/dmloaivanban.component';
import { BaocaotaichinhComponent } from './baocao/baocaotaichinh/baocaotaichinh.component';
import { UploadhdsdComponent } from './uploadhdsd/uploadhdsd.component';
import { DmkhoComponent } from './danhmuc/dmkho/dmkho.component';
import { KiemkekhoComponent } from './quanlykhosanxuat/quytrinh/kiemkekho/kiemkekho.component';
import { NhapkhoComponent } from './quanlykhosanxuat/quytrinh/nhapkho/nhapkho.component';
import { PhabongComponent } from './quanlykhosanxuat/phuongan/phabong/phabong.component';
import { ThongsochatluongComponent } from './quanlykhosanxuat/quytrinh/thongsochatluong/thongsochatluong.component';
import { ThongkesanluongComponent } from './quanlykhosanxuat/thongke/thongkesanluong/thongkesanluong.component';
import { SanluongtonghopComponent } from './quanlykhosanxuat/baocao/sanluongtonghop/sanluongtonghop.component';
import { SanluongchitietComponent } from './quanlykhosanxuat/baocao/sanluongchitiet/sanluongchitiet.component';
import { LoaibongComponent } from './danhmuc/danhmucsanxuat/loaibong/loaibong.component';
import { CapbongComponent } from './danhmuc/danhmucsanxuat/capbong/capbong.component';
import { CasanxuatComponent } from './danhmuc/danhmucsanxuat/casanxuat/casanxuat.component';
import { DanhsachmayComponent } from './danhmuc/danhmucsanxuat/danhsachmay/danhsachmay.component';
import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat/dieuhanhsanxuat.component';
import { KehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuat/kehoachsanxuat.component';
import { XuatkhoComponent } from './quanlykhosanxuat/quytrinh/xuatkho/xuatkho.component';
import { HacapComponent } from './quanlykhosanxuat/quytrinh/hacap/hacap.component';
import { DieuchuyenComponent } from './quanlykhosanxuat/quytrinh/dieuchuyen/dieuchuyen.component';
import { TrienkhaikehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';
import { TimbongComponent } from './quanlykhosanxuat/phuongan/timbong/timbong.component';
import { MathangComponent } from './danhmuc/danhmucsanxuat/mathang/mathang.component';
import { PhanxuongComponent } from './danhmuc/danhmucsanxuat/phanxuong/phanxuong.component';
import { LoaisoiComponent } from './danhmuc/danhmucsanxuat/loaisoi/loaisoi.component';
import { NhomkhoComponent } from './danhmuc/danhmucsanxuat/nhomkho/nhomkho.component';
import { KhoComponent } from './danhmuc/danhmucsanxuat/kho/kho.component';
import { KehoachnhapnguyenlieuComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieu/kehoachnhapnguyenlieu.component';
import { KehoachxuathangComponent } from './quanlykhosanxuat/quytrinh/kehoachxuathang/kehoachxuathang.component';
import { NhapkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhpham/nhapkhothanhpham.component';
import { DmmaybienapComponent } from './danhmuc/thongkedientheoca/dmmaybienap/dmmaybienap.component';
import { LoaidienkvComponent } from './danhmuc/thongkedientheoca/loaidienkv/loaidienkv.component';
import { NhapkhohoiamComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiam/nhapkhohoiam.component';
import { ChatluongsoiComponent } from './quanlykhosanxuat/quytrinh/chatluongsoi/chatluongsoi.component';
import { DmnhomcongtoComponent } from './danhmuc/thongkedientheoca/dmnhomcongto/dmnhomcongto.component';
import { DmcongtoComponent } from './danhmuc/thongkedientheoca/dmcongto/dmcongto.component';
import { DmthongkedienComponent } from './danhmuc/thongkedientheoca/dmthongkedien/dmthongkedien.component';
import { DinhmuctieuhaoComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuhao/dinhmuctieuhao.component';
import { VitriComponent } from './danhmuc/danhmucsanxuat/vitri/vitri.component';
import { CandoitonComponent } from './quanlykhosanxuat/quytrinh/candoiton/candoiton.component';
import { DieuhanhsanxuattonghopComponent } from './dieuhanhsanxuattonghop/dieuhanhsanxuattonghop.component';
import { DmtieuchichatluongsoiComponent } from './danhmuc/dmtieuchichatluongsoi/dmtieuchichatluongsoi.component';
import { SanxuatComponent } from './quanlykhosanxuat/phuongan/sanxuat/sanxuat.component';
import { DmphannhommayComponent } from './danhmuc/dmphannhommay/dmphannhommay.component';
import { PhieudieuchinhComponent } from './quanlykhosanxuat/quytrinh/phieudieuchinh/phieudieuchinh.component';
import { QuycachdonggoiComponent } from './danhmuc/quycachdonggoi/quycachdonggoi.component';
import { SanluongComponent } from './sanluong/sanluong.component';
import { XepbanbongComponent } from './quanlykhosanxuat/phuongan/xepbanbong/xepbanbong.component';
import { XuatkhoxoComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxo/xuatkhoxo.component';
import { XuatkhobonghoiComponent } from './quanlykhosanxuat/quytrinh/xuatkhobonghoi/xuatkhobonghoi.component';
import { XuatkhobongpheComponent } from './quanlykhosanxuat/quytrinh/xuatkhobongphe/xuatkhobongphe.component';
import { DinhmuctieuchichatluongsoiComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoi/dinhmuctieuchichatluongsoi.component';
import { NhapkhokhacComponent } from './quanlykhosanxuat/quytrinh/nhapkhokhac/nhapkhokhac.component';
import { XuatkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/xuatkhothanhpham/xuatkhothanhpham.component';
import { PhanquyentheophanxuongComponent } from './phanquyen/phanquyentheophanxuong/phanquyentheophanxuong.component';
import { NhucauxuathangComponent } from './nhucauxuathang/nhucauxuathang.component';
import { DashboardthongluongComponent } from './dashboardthongluong/dashboardthongluong.component';
import { GiaokehoachsanxuathoanthanhComponent } from './quanlykhosanxuat/quytrinh/giaokehoachsanxuathoanthanh/giaokehoachsanxuathoanthanh.component';
import { KiemkebcpComponent } from './quanlykhosanxuat/quytrinh/kiemkebcp/kiemkebcp.component';
import { CandoichuyenComponent } from './quanlykhosanxuat/candoichuyen/candoichuyen.component';
import { LohangComponent } from './quanlykhosanxuat/thongke/lohang/lohang.component';
import { DactinhbongComponent } from './danhmuc/danhmucsanxuat/dactinhbong/dactinhbong.component';
import { KehoachnhapnguyenlieuinvoiceComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuinvoice/kehoachnhapnguyenlieuinvoice.component';

const routes: Routes = [
  {
    path: '', component: QuantriComponent,
    children: [
      //quantrisanxuat/tonghop dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'quanlytaisannhadat', component: QuanlytaisannhadatComponent },
      { path: 'sapxepxuly/yeucau', component: YeucausapxepComponent },
      { path: 'sapxepxuly/quytrinh', component: QuytrinhsapxepComponent },
      { path: 'huongdansudung', component: UploadhdsdComponent },

      { path: 'danhmuc/dmdonvi', component: DmdonviComponent },
      { path: 'danhmuc/dmhinhthucxuly', component: DmhinhthucxulyComponent },
      { path: 'danhmuc/dmtaisan', component: DmtaisanComponent },
      { path: 'danhmuc/dmbiendong', component: BiendongComponent },
      { path: 'danhmuc/dmtinhtrangtaisan', component: TinhtrangtaisanComponent },
      { path: 'danhmuc/dmmucdichsudung', component: DmmucdichsudungComponent },
      { path: 'danhmuc/dmnguongocdat', component: DmnguongocdatComponent },
      { path: 'danhmuc/dmtinh', component: TinhComponent },
      { path: 'danhmuc/dmquan', component: QuanComponent },
      { path: 'danhmuc/dmphuong', component: PhuongComponent },
      { path: 'danhmuc/dmcaphangcongtrinh', component: DmcaphangcongtrinhComponent },
      { path: 'danhmuc/dmhientrangsudung', component: DmhientrangsudungComponent },
      { path: 'danhmuc/dmdonvisohuudatnha', component: DonvisohuudatnhaComponent },
      { path: 'danhmuc/dmloaivanban', component: DmloaivanbanComponent },


      { path: 'theodoithongkebaocao', component: TheodoithongkebaocaoComponent },
      { path: 'theodoithongkebaocao/bieu1a', component: Bieu1aComponent },
      { path: 'theodoithongkebaocao/bieu1b', component: Bieu1bComponent },
      { path: 'theodoithongkebaocao/bieu1c', component: Bieu1cComponent },
      { path: 'theodoithongkebaocao/bieu2a', component: Bieu2aComponent },
      { path: 'theodoithongkebaocao/bieu2b', component: Bieu2bComponent },
      { path: 'theodoithongkebaocao/bieu3', component: Bieu3Component },
      { path: 'theodoithongkebaocao/bieu4', component: Bieu4Component },
      { path: 'theodoithongkebaocao/bieu5', component: Bieu5Component },
      { path: 'theodoithongkebaocao/baocaochitietcaccoso', component: BaocaochitietcaccosoComponent },
      { path: 'theodoithongkebaocao/baocaodonvi', component: BaocaotaichinhComponent },

      { path: 'quantrisanxuat/nguyenlieu', component: DieuhanhsanxuatComponent },
      { path: 'quantrisanxuat/nhucauxuathang', component: NhucauxuathangComponent },
      
      { path: 'quantrisanxuat/sanluong', component: SanluongComponent },
      { path: 'quantrisanxuat/tonghop', component: DieuhanhsanxuattonghopComponent },
      { path: 'quantrisanxuat/chatluong', component: DieuhanhsanxuatComponent },
      { path: 'quantrisanxuat/thongluong', component: DashboardthongluongComponent },
      // { path: 'quantrisanxuat/sanluong', component: DieuhanhsanxuatComponent },


      { path: 'baocaosanxuat/sanluongtonghop', component: SanluongtonghopComponent },
      { path: 'baocaosanxuat/sanluongchitiet', component: SanluongchitietComponent },
      { path: 'danhmucsanxuat/dmkho', component: DmkhoComponent },
      { path: 'danhmucsanxuat/dmloaibong', component: LoaibongComponent },
      { path: 'danhmucsanxuat/dmcapbong', component: CapbongComponent },
      { path: 'danhmucsanxuat/dmcasanxuat', component: CasanxuatComponent },
      { path: 'danhmucsanxuat/dmdsmay', component: DanhsachmayComponent },
      { path: 'danhmucsanxuat/dmmathang', component: MathangComponent },
      { path: 'danhmucsanxuat/dmphanxuong', component: PhanxuongComponent },
      { path: 'danhmucsanxuat/dmloaisoi', component: LoaisoiComponent },
      { path: 'danhmucsanxuat/dmnhomkho', component: NhomkhoComponent },
      { path: 'danhmucsanxuat/dmmaybienap', component: DmmaybienapComponent },
      { path: 'danhmucsanxuat/loaidienkv', component: LoaidienkvComponent },
      { path: 'danhmucsanxuat/dmnhomcongto', component: DmnhomcongtoComponent },
      { path: 'danhmucsanxuat/dmcongto', component: DmcongtoComponent },
      { path: 'danhmucsanxuat/dmtieuchichatluongsoi', component: DmtieuchichatluongsoiComponent },
      { path: 'danhmucsanxuat/dmphannhommay', component: DmphannhommayComponent },
      { path: 'danhmucsanxuat/dmquycachdonggoi', component: QuycachdonggoiComponent },
      { path: 'danhmucsanxuat/dmthongkedien/:id', component: DmthongkedienComponent },
      { path: 'danhmucsanxuat/dmdinhmucchatluongsoi', component: DinhmuctieuchichatluongsoiComponent },
      { path: 'danhmucsanxuat/dmdinhmuctieuhao', component: DinhmuctieuhaoComponent },
      { path: 'danhmucsanxuat/dmvitri', component: VitriComponent },
      { path: 'theodoithongkebaocaosanxuat/thongkedien/:id', component: DmthongkedienComponent },
      { path: 'danhmucsanxuat/dmdactinhbong', component: DactinhbongComponent },

      { path: 'theodoithongkebaocaosanxuat/thongkesanluong/:id', component: ThongkesanluongComponent },

      { path: 'trienkhaisanxuat/phabong/:id', component: PhabongComponent },
      { path: 'trienkhaisanxuat/timbong/:id', component: TimbongComponent },
      { path: 'kehoachsanxuat/sanxuat/:id', component: SanxuatComponent },
      //XepBanBong
      { path: 'trienkhaisanxuat/xepbanbong/:id', component: XepbanbongComponent },

      { path: 'trienkhaisanxuat/phieudieuchinh/:id', component: PhieudieuchinhComponent },

      { path: 'quanlykhosanxuat/:kho/nhapkho/:id', component: NhapkhoComponent },
      { path: 'quanlykhosanxuat/khobong/thongsochatluong/:id', component: ThongsochatluongComponent },
      { path: 'quanlykhosanxuat/khobong/xuatkho/:id', component: XuatkhoComponent },
      { path: 'quanlykhosanxuat/:kho/kiemkekho/:id', component: KiemkekhoComponent },
      { path: 'quanlykhosanxuat/khobong/dieuchuyen/:id', component: DieuchuyenComponent },
      { path: 'quanlykhosanxuat/khobong/kehoachnhapnguyenlieu/:id', component: KehoachnhapnguyenlieuComponent },
      { path: 'quanlykhosanxuat/khobong/kehoachnhapnguyenlieuinvoice/:id', component: KehoachnhapnguyenlieuinvoiceComponent },
      { path: 'quanlykhosanxuat/khobong/candoiton/:id', component: CandoitonComponent },

      { path: 'quanlykhosanxuat/khoxo/xuatkho/:id', component: XuatkhoxoComponent },
      { path: 'quanlykhosanxuat/khoxo/dieuchuyen/:id', component: DieuchuyenComponent },
      { path: 'quanlykhosanxuat/khoxo/kehoachnhapnguyenlieu/:id', component: KehoachnhapnguyenlieuComponent },

      { path: 'quanlysanxuatkhohoiam/khohoiam/nhapkho/:id', component: NhapkhohoiamComponent },
      { path: 'quanlysanxuatkhohoiam/khohoiam/hacap/:id', component: HacapComponent },
      { path: 'quanlysanxuatkhohoiam/khohoiam/chatluongsoi/:id', component: ChatluongsoiComponent },


      { path: 'quanlykhosanxuatbongkhac/:kho/nhapkho/:id', component: NhapkhokhacComponent },
      { path: 'quanlykhosanxuatbongkhac/khobonghoi/xuatkho/:id', component: XuatkhobonghoiComponent },
      { path: 'quanlykhosanxuatbongkhac/khobonghoi/kiemkekho/:id', component: KiemkekhoComponent },
      { path: 'quanlykhosanxuatbongkhac/khobonghoi/dieuchuyen/:id', component: DieuchuyenComponent },

      { path: 'quanlykhosanxuatbongkhac/khobongphe/xuatkho/:id', component: XuatkhobongpheComponent },
      { path: 'quanlykhosanxuatbongkhac/khobongphe/kiemkekho/:id', component: KiemkekhoComponent },

      { path: 'quanlysanxuatkhothanhpham/khothanhpham/nhapkho/:id', component: NhapkhothanhphamComponent },
      { path: 'quanlysanxuatkhothanhpham/khothanhpham/kiemkekho/:id', component: KiemkekhoComponent },
      { path: 'quanlysanxuatkhothanhpham/khothanhpham/kehoachxuathang/:id', component: KehoachxuathangComponent },
      { path: 'quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/:id', component: XuatkhothanhphamComponent },

      { path: 'kehoachsanxuat/giaokehoachsanxuat/:id', component: KehoachsanxuatComponent },
      { path: 'kehoachsanxuat/giaokehoachsanxuathoanthanh/:id', component: GiaokehoachsanxuathoanthanhComponent },
      { path: 'kehoachsanxuat/trienkhaikehoachsanxuat/:id', component: TrienkhaikehoachsanxuatComponent },
      { path: 'kehoachsanxuat/candoichuyen', component: CandoichuyenComponent },
      
      { path: 'phanquyensanxuat/phanquyentheophanxuong', component: PhanquyentheophanxuongComponent },
      { path: 'quanlykhosanxuat/kiemkeBCP/:id', component: KiemkebcpComponent },

      { path: 'kehoachsanxuat/lohang', component: LohangComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuantriRoutingModule { }
