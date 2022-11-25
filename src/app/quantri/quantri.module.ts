import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { QuantriRoutingModule } from './quantri-routing.module';
import { QuantriComponent } from './quantri.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeModule } from 'primeng/tree';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'ng2-file-upload';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ProgressBarModule} from 'primeng/progressbar';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'primeng/colorpicker';

// import { FileUploadModule } from 'primeng/fileupload';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);
import { QuanlytaisannhadatComponent } from './quanlytaisannhadat/quanlytaisannhadat.component';
import { ThongTinChungComponent } from './components/thong-tin-chung/thong-tin-chung.component';
import { HienTrangSuDungComponent } from './components/hien-trang-su-dung/hien-trang-su-dung.component';
import { ModalThuaDatComponent } from './modal/modal-thua-dat/modal-thua-dat.component';
import { HttpClientModule } from '@angular/common/http';
import { TaiSanTrenDatComponent } from './components/tai-san-tren-dat/tai-san-tren-dat.component';
import { SoDoComponent } from './components/so-do/so-do.component';
import { TinhTrangPhapLyComponent } from './components/tinh-trang-phap-ly/tinh-trang-phap-ly.component';
import { HoSoVanBanPhapQuyComponent } from './components/ho-so-van-ban-phap-quy/ho-so-van-ban-phap-quy.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudThongTinChungComponent } from './modal/crudcomponents/crud-thong-tin-chung/crud-thong-tin-chung.component';
import { CrudHsvbPhapQuyComponent } from './modal/crudcomponents/crud-hsvb-phap-quy/crud-hsvb-phap-quy.component';
import { CrudHienTrangSuDungComponent } from './modal/crudcomponents/crud-hien-trang-su-dung/crud-hien-trang-su-dung.component';
import { CrudSoDoComponent } from './modal/crudcomponents/crud-so-do/crud-so-do.component';
import { CrudTaiSanTrenDatComponent } from './modal/crudcomponents/crud-tai-san-tren-dat/crud-tai-san-tren-dat.component';
import { CrudTinhTrangPhapLyComponent } from './modal/crudcomponents/crud-tinh-trang-phap-ly/crud-tinh-trang-phap-ly.component';
import { ModalTaiSanTrenDatComponent } from './modal/modal-tai-san-tren-dat/modal-tai-san-tren-dat.component';
import { ModalHsvbPhapQuyComponent } from './modal/modal-hsvb-phap-quy/modal-hsvb-phap-quy.component';
import { ModalTinhTrangPhapLyComponent } from './modal/modal-tinh-trang-phap-ly/modal-tinh-trang-phap-ly.component';
import { ModalGiaDatComponent } from './modal/modal-gia-dat/modal-gia-dat.component';
import { YeucausapxepComponent } from './sapxepxuly/yeucausapxep/yeucausapxep.component';
import { QuytrinhsapxepComponent } from './sapxepxuly/quytrinhsapxep/quytrinhsapxep.component';
import { DmdonviComponent } from './danhmuc/dmdonvi/dmdonvi.component';
import { DmhinhthucxulyComponent } from './danhmuc/dmhinhthucxuly/dmhinhthucxuly.component';
import { ModaldmdonviComponent } from './danhmuc/modal/modaldmdonvi/modaldmdonvi.component';
import { ModaldmhinhthucxulyComponent } from './danhmuc/modal/modaldmhinhthucxuly/modaldmhinhthucxuly.component'
import { ModaldanhmucchungComponent } from './danhmuc/modal/modaldanhmucchung/modaldanhmucchung.component';
import { DmtaisanComponent } from './danhmuc/dmtaisan/dmtaisan.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { BiendongComponent } from './danhmuc/biendong/biendong.component';
import { DmmucdichsudungComponent } from './danhmuc/dmmucdichsudung/dmmucdichsudung.component';
import { DmnguongocdatComponent } from './danhmuc/dmnguongocdat/dmnguongocdat.component';
import { ModalthongbaoComponent } from './modal/modalthongbao/modalthongbao.component';
import { ModaldmtaisanComponent } from './danhmuc/modal/modaldmtaisan/modaldmtaisan.component';

import { Dat09Service } from '../services/callApi';
import { SignalRService } from '../services/signalR.service';
import { SanXuatService } from '../services/callApiSanXuat';
import { isXoaPipe } from './../services/isXoaPipe';
import { VNDPipe } from './../services/vnd.pipe';
import { FilterPipe } from './../services/filter.pipe';
import { CongDoanPipe } from './../services/congdoan.pipe';
import {CaPipe} from './../services/ca.pipe';

import { UploadmodalComponent } from './modal/uploadmodal/uploadmodal.component';
import { ThongKeThongTinThuaDatComponent } from './components/thong-ke-thong-tin-thua-dat/thong-ke-thong-tin-thua-dat.component';
import { TinhComponent } from './danhmuc/tinh/tinh.component';
import { QuanComponent } from './danhmuc/quan/quan.component';
import { PhuongComponent } from './danhmuc/phuong/phuong.component';
import { ModaltinhComponent } from './danhmuc/modal/modaltinh/modaltinh.component';
import { DmcaphangcongtrinhComponent } from './danhmuc/dmcaphangcongtrinh/dmcaphangcongtrinh.component';
import { ModalquanComponent } from './danhmuc/modal/modalquan/modalquan.component';
import { ModalphuongComponent } from './danhmuc/modal/modalphuong/modalphuong.component';
import { ModalcaphangcongtrinhComponent } from './danhmuc/modal/modalcaphangcongtrinh/modalcaphangcongtrinh.component';
import { ModalphuongansapxepComponent } from './sapxepxuly/modal/modalphuongansapxep/modalphuongansapxep.component';
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
import { ModalchitietthuadatComponent } from './modal/modalchitietthuadat/modalchitietthuadat.component';
import { ModalquytrinhsapxepComponent } from './sapxepxuly/modal/modalquytrinhsapxep/modalquytrinhsapxep.component';
import { ModalchonthuadatComponent } from './sapxepxuly/modal/modalchonthuadat/modalchonthuadat.component';
import { ModaldoimatkhauComponent } from './modal/modaldoimatkhau/modaldoimatkhau.component';
import { DmhientrangsudungComponent } from './danhmuc/dmhientrangsudung/dmhientrangsudung.component';
import { DonvisohuudatnhaComponent } from './danhmuc/donvisohuudatnha/donvisohuudatnha.component';
import { ModaldonvisohuunhadatComponent } from './danhmuc/modal/modaldonvisohuunhadat/modaldonvisohuunhadat.component';
import { ModalthongtinchothueComponent } from './modal/modalthongtinchothue/modalthongtinchothue.component';
import { ModalimportexcelComponent } from './modal/modalimportexcel/modalimportexcel.component';
import { ModaladvancedsearchComponent } from './modal/modaladvancedsearch/modaladvancedsearch.component';
import { DmloaivanbanComponent } from './danhmuc/dmloaivanban/dmloaivanban.component';
import { BaocaotaichinhComponent } from './baocao/baocaotaichinh/baocaotaichinh.component';
import { UploadhdsdComponent } from './uploadhdsd/uploadhdsd.component';
import { ModalbaocaotonghopComponent } from './modal/modalbaocaotonghop/modalbaocaotonghop.component';
import { ModalShowgiadatComponent } from './modal/modal-showgiadat/modal-showgiadat.component';
import { DmkhoComponent } from './danhmuc/dmkho/dmkho.component';
import { ModaldmkhoComponent } from './danhmuc/modal/modaldmkho/modaldmkho.component';
import { KiemkekhoComponent } from './quanlykhosanxuat/quytrinh/kiemkekho/kiemkekho.component';
import { KiemkekhomodalComponent } from './quanlykhosanxuat/quytrinh/kiemkekhomodal/kiemkekhomodal.component';
import { NhapkhoComponent } from './quanlykhosanxuat/quytrinh/nhapkho/nhapkho.component';
import { NhapkhomodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhomodal/nhapkhomodal.component';
import { PhabongComponent } from './quanlykhosanxuat/phuongan/phabong/phabong.component';
import { ThongsochatluongComponent } from './quanlykhosanxuat/quytrinh/thongsochatluong/thongsochatluong.component';
import { ThongsochatluongmodalComponent } from './quanlykhosanxuat/quytrinh/thongsochatluongmodal/thongsochatluongmodal.component';
import { ThongkesanluongComponent } from './quanlykhosanxuat/thongke/thongkesanluong/thongkesanluong.component';
import { ThongkesanluongmodalComponent } from './quanlykhosanxuat/thongke/thongkesanluongmodal/thongkesanluongmodal.component';
import { SanluongtonghopComponent } from './quanlykhosanxuat/baocao/sanluongtonghop/sanluongtonghop.component';
import { SanluongchitietComponent } from './quanlykhosanxuat/baocao/sanluongchitiet/sanluongchitiet.component';
import { LoaibongComponent } from './danhmuc/danhmucsanxuat/loaibong/loaibong.component';
import { CapbongComponent } from './danhmuc/danhmucsanxuat/capbong/capbong.component';
import { CasanxuatComponent } from './danhmuc/danhmucsanxuat/casanxuat/casanxuat.component';
import { DanhsachmayComponent } from './danhmuc/danhmucsanxuat/danhsachmay/danhsachmay.component';
import { DanhsachmaymodalComponent } from './danhmuc/danhmucsanxuat/modals/danhsachmaymodal/danhsachmaymodal.component';
import { PhabongmodalComponent } from './quanlykhosanxuat/phuongan/phabongmodal/phabongmodal.component';
import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat/dieuhanhsanxuat.component';
import { KehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuat/kehoachsanxuat.component';
import { KehoachsanxuatmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuatmodal/kehoachsanxuatmodal.component';
import { XuatkhoComponent } from './quanlykhosanxuat/quytrinh/xuatkho/xuatkho.component';
import { XuatkhomodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhomodal/xuatkhomodal.component';
import { DieuchuyenComponent } from './quanlykhosanxuat/quytrinh/dieuchuyen/dieuchuyen.component';
import { DieuchuyenmodalComponent } from './quanlykhosanxuat/quytrinh/dieuchuyenmodal/dieuchuyenmodal.component';
import { HacapComponent } from './quanlykhosanxuat/quytrinh/hacap/hacap.component';
import { HacapmodalComponent } from './quanlykhosanxuat/quytrinh/hacapmodal/hacapmodal.component';
import { ChonhanghoamodalComponent } from './quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { TrienkhaikehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';
import { TrienkhaikehoachsanxuatmodalComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuatmodal/trienkhaikehoachsanxuatmodal.component';
import { TimbongComponent } from './quanlykhosanxuat/phuongan/timbong/timbong.component';
import { TimbongmodalComponent } from './quanlykhosanxuat/phuongan/timbongmodal/timbongmodal.component';
import { BotrimaymodalComponent } from './quanlykhosanxuat/modals/botrimaymodal/botrimaymodal.component';
import { MathangComponent } from './danhmuc/danhmucsanxuat/mathang/mathang.component';
import { MathangmodelComponent } from './danhmuc/danhmucsanxuat/modals/mathangmodel/mathangmodel.component';
import { PhanxuongComponent } from './danhmuc/danhmucsanxuat/phanxuong/phanxuong.component';
import { PhanxuongmodalComponent } from './danhmuc/danhmucsanxuat/modals/phanxuongmodal/phanxuongmodal.component';
import { LoaisoiComponent } from './danhmuc/danhmucsanxuat/loaisoi/loaisoi.component';
import { ChonmaytheocongdoanComponent } from './quanlykhosanxuat/modals/chonmaytheocongdoan/chonmaytheocongdoan.component';
import { ImportdanhmucmodelComponent } from './danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { TrangthaimaysanxuatComponent } from './quanlykhosanxuat/quytrinh/trangthaimaysanxuat/trangthaimaysanxuat.component';
import { NhomkhoComponent } from './danhmuc/danhmucsanxuat/nhomkho/nhomkho.component';
import { XuatkhomathangmodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhomathangmodal/xuatkhomathangmodal.component';
import { KhoComponent } from './danhmuc/danhmucsanxuat/kho/kho.component';
import 'chartjs-plugin-labels';
import { KehoachnhapnguyenlieuComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieu/kehoachnhapnguyenlieu.component';
import { KehoachnhapnguyenlieumodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieumodal/kehoachnhapnguyenlieumodal.component';
import { KehoachxuathangComponent } from './quanlykhosanxuat/quytrinh/kehoachxuathang/kehoachxuathang.component';
import { KehoachxuathangmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachxuathangmodal/kehoachxuathangmodal.component';
import { VoiLibModule } from 'voi-lib';
import { NhapkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhpham/nhapkhothanhpham.component';
import { NhapkhothanhphammodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhphammodal/nhapkhothanhphammodal.component';
import { NhapkhohoiamComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiam/nhapkhohoiam.component';
import { NhapkhohoiammodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiammodal/nhapkhohoiammodal.component';
import { ChatluongsoiComponent } from './quanlykhosanxuat/quytrinh/chatluongsoi/chatluongsoi.component';
import { ChatluongsoimodalComponent } from './quanlykhosanxuat/quytrinh/chatluongsoimodal/chatluongsoimodal.component';
import { DmmaybienapComponent } from './danhmuc/thongkedientheoca/dmmaybienap/dmmaybienap.component';
import { DmmaybienapmodalComponent } from './danhmuc/thongkedientheoca/dmmaybienapmodal/dmmaybienapmodal.component';
import { LoaidienkvComponent } from './danhmuc/thongkedientheoca/loaidienkv/loaidienkv.component';
import { DmnhomcongtoComponent } from './danhmuc/thongkedientheoca/dmnhomcongto/dmnhomcongto.component';
import { DmcongtoComponent } from './danhmuc/thongkedientheoca/dmcongto/dmcongto.component';
import { DmcongtomodalComponent } from './danhmuc/thongkedientheoca/dmcongtomodal/dmcongtomodal.component';
import { ChonkienbongmodalComponent } from './quanlykhosanxuat/phuongan/chonkienbongmodal/chonkienbongmodal.component';
import { DmthongkedienComponent } from './danhmuc/thongkedientheoca/dmthongkedien/dmthongkedien.component';
import { DmthongkedienmodalComponent } from './danhmuc/thongkedientheoca/dmthongkedienmodal/dmthongkedienmodal.component';
import { DinhmuctieuhaoComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuhao/dinhmuctieuhao.component';
import { DinhmuctieuhaomodalComponent } from './danhmuc/danhmucsanxuat/modals/dinhmuctieuhaomodal/dinhmuctieuhaomodal.component';
import { VitriComponent } from './danhmuc/danhmucsanxuat/vitri/vitri.component';
import { VitrimodalComponent } from './danhmuc/modal/vitrimodal/vitrimodal.component';
import { CandoitonComponent } from './quanlykhosanxuat/quytrinh/candoiton/candoiton.component';
import { DieuhanhsanxuattonghopComponent } from './dieuhanhsanxuattonghop/dieuhanhsanxuattonghop.component';
import { DmtieuchichatluongsoiComponent } from './danhmuc/dmtieuchichatluongsoi/dmtieuchichatluongsoi.component';
import { DmtieuchichatluongsoimodalComponent } from './danhmuc/dmtieuchichatluongsoimodal/dmtieuchichatluongsoimodal.component';
import { SanxuatComponent } from './quanlykhosanxuat/phuongan/sanxuat/sanxuat.component';
import { SanxuatmodalComponent } from './quanlykhosanxuat/phuongan/sanxuatmodal/sanxuatmodal.component';
import { DmphannhommayComponent } from './danhmuc/dmphannhommay/dmphannhommay.component';
import { DmphannhommaymodalComponent } from './danhmuc/dmphannhommaymodal/dmphannhommaymodal.component';
import { DmphannhommayChonmathangmodalComponent } from './danhmuc/dmphannhommay-chonmathangmodal/dmphannhommay-chonmathangmodal.component';
import { PhieudieuchinhComponent } from './quanlykhosanxuat/quytrinh/phieudieuchinh/phieudieuchinh.component';
import { PhieudieuchinhmodalComponent } from './quanlykhosanxuat/quytrinh/phieudieuchinhmodal/phieudieuchinhmodal.component';
import { QuycachdonggoiComponent } from './danhmuc/quycachdonggoi/quycachdonggoi.component';
import { SanluongComponent } from './sanluong/sanluong.component';
import { ChonquycachdonggoimodalComponent } from './quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';
import { XepbanbongComponent } from './quanlykhosanxuat/phuongan/xepbanbong/xepbanbong.component';
import { XepbanbongmodalComponent } from './quanlykhosanxuat/phuongan/xepbanbongmodal/xepbanbongmodal.component';
import { Dongvanpx1Component } from './quanlykhosanxuat/phuongan/layoutmodals/dongvanpx1/dongvanpx1.component';
import { Dongvanpx2Component } from './quanlykhosanxuat/phuongan/layoutmodals/dongvanpx2/dongvanpx2.component';
import { KienlocongdieuchinhmodalComponent } from './quanlykhosanxuat/quytrinh/kienlocongdieuchinhmodal/kienlocongdieuchinhmodal.component';
import { XuatkhoxoComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxo/xuatkhoxo.component';
import { XuatkhoxomodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxomodal/xuatkhoxomodal.component';
import { XuatkhobonghoiComponent } from './quanlykhosanxuat/quytrinh/xuatkhobonghoi/xuatkhobonghoi.component';
import { XuatkhobonghoimodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhobonghoimodal/xuatkhobonghoimodal.component';
import { XuatkhobongpheComponent } from './quanlykhosanxuat/quytrinh/xuatkhobongphe/xuatkhobongphe.component';
import { XuatkhobongphemodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhobongphemodal/xuatkhobongphemodal.component';
import { DinhmuctieuchichatluongsoiComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoi/dinhmuctieuchichatluongsoi.component';
import { DinhmuctieuchichatluongsoimodalComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoimodal/dinhmuctieuchichatluongsoimodal.component';
import { NhapkhokhacComponent } from './quanlykhosanxuat/quytrinh/nhapkhokhac/nhapkhokhac.component';
import { NhapkhokhacmodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhokhacmodal/nhapkhokhacmodal.component';
import { XuatkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/xuatkhothanhpham/xuatkhothanhpham.component';
import { XuatkhothanhphammodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhothanhphammodal/xuatkhothanhphammodal.component';
import { PhanquyentheophanxuongComponent } from './phanquyen/phanquyentheophanxuong/phanquyentheophanxuong.component';
import { PhanquyentheophanxuongmodalComponent } from './phanquyen/phanquyentheophanxuongmodal/phanquyentheophanxuongmodal.component';
import { NhucauxuathangComponent } from './nhucauxuathang/nhucauxuathang.component';
import { LohangComponent } from './quanlykhosanxuat/thongke/lohang/lohang.component';
import { LohangmodalComponent } from './quanlykhosanxuat/thongke/lohangmodal/lohangmodal.component';
import { DashboardthongluongComponent } from './dashboardthongluong/dashboardthongluong.component';
import { GiaokehoachsanxuathoanthanhComponent } from './quanlykhosanxuat/quytrinh/giaokehoachsanxuathoanthanh/giaokehoachsanxuathoanthanh.component';
import { GiaokehoachsanxuathoanthanhmodalComponent } from './quanlykhosanxuat/quytrinh/giaokehoachsanxuathoanthanhmodal/giaokehoachsanxuathoanthanhmodal.component';
import { ChonsodongphannhommayComponent } from './danhmuc/danhmucsanxuat/modals/chonsodongphannhommay/chonsodongphannhommay.component';
import { KiemkebcpComponent } from './quanlykhosanxuat/quytrinh/kiemkebcp/kiemkebcp.component';
import { KiemkebcpmodalComponent } from './quanlykhosanxuat/quytrinh/kiemkebcpmodal/kiemkebcpmodal.component';
import { CandoichuyenComponent } from './quanlykhosanxuat/candoichuyen/candoichuyen.component';
import { BotrimayOngComponent } from './quanlykhosanxuat/candoichuyen/modals/botrimay-ong/botrimay-ong.component';
import { BotrimayChungComponent } from './quanlykhosanxuat/candoichuyen/modals/botrimay-chung/botrimay-chung.component';
import { DactinhbongComponent } from './danhmuc/danhmucsanxuat/dactinhbong/dactinhbong.component';
import { DactinhbongmodalComponent } from './danhmuc/danhmucsanxuat/dactinhbongmodal/dactinhbongmodal.component';
import { KehoachnhapnguyenlieuitemmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuitemmodal/kehoachnhapnguyenlieuitemmodal.component';
import { KehoachnhapnguyenlieuinvoiceComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuinvoice/kehoachnhapnguyenlieuinvoice.component';
import { KehoachnhapnguyenlieuinvoicemodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuinvoicemodal/kehoachnhapnguyenlieuinvoicemodal.component';
import { ChonkienbonghoimodalComponent } from './quanlykhosanxuat/phuongan/chonkienbonghoimodal/chonkienbonghoimodal.component';
import { BanchephamComponent } from './danhmuc/danhmucsanxuat/banchepham/banchepham.component';
import { BanchephammodalComponent } from './danhmuc/danhmucsanxuat/banchephammodal/banchephammodal.component';
@NgModule({
  declarations: [
    QuantriComponent,
    DashboardComponent,
    QuanlytaisannhadatComponent,
    ThongTinChungComponent,
    HienTrangSuDungComponent,
    ModalThuaDatComponent,
    TaiSanTrenDatComponent,
    SoDoComponent,
    TinhTrangPhapLyComponent,
    HoSoVanBanPhapQuyComponent,
    CrudThongTinChungComponent,
    CrudHsvbPhapQuyComponent,
    CrudHienTrangSuDungComponent,
    CrudSoDoComponent,
    CrudTaiSanTrenDatComponent,
    CrudTinhTrangPhapLyComponent,
    ModalTaiSanTrenDatComponent,
    ModalHsvbPhapQuyComponent,
    ModalTinhTrangPhapLyComponent,
    ModalGiaDatComponent,
    YeucausapxepComponent,
    QuytrinhsapxepComponent,
    DmdonviComponent,
    DmhinhthucxulyComponent,
    ModaldmdonviComponent,
    ModaldmhinhthucxulyComponent,
    ModaldanhmucchungComponent,
    DmtaisanComponent,
    TinhtrangtaisanComponent,
    BiendongComponent,
    DmmucdichsudungComponent,
    DmnguongocdatComponent,
    ModalthongbaoComponent,
    ModaldmtaisanComponent,
    isXoaPipe,
    VNDPipe,
    CaPipe,
    UploadmodalComponent,
    ThongKeThongTinThuaDatComponent,
    TinhComponent,
    QuanComponent,
    PhuongComponent,
    ModaltinhComponent,
    DmcaphangcongtrinhComponent,
    ModalquanComponent,
    ModalphuongComponent,
    ModalcaphangcongtrinhComponent,
    ModalphuongansapxepComponent,
    TheodoithongkebaocaoComponent,
    Bieu1aComponent,
    Bieu1bComponent,
    Bieu1cComponent,
    Bieu2aComponent,
    Bieu2bComponent,
    Bieu3Component,
    Bieu4Component,
    Bieu5Component,
    BaocaochitietcaccosoComponent,
    ModalchitietthuadatComponent,
    ModalquytrinhsapxepComponent,
    ModalchonthuadatComponent,
    ModaldoimatkhauComponent,
    DmhientrangsudungComponent,
    DonvisohuudatnhaComponent,
    ModaldonvisohuunhadatComponent,
    ModalthongtinchothueComponent,
    ModalimportexcelComponent,
    ModaladvancedsearchComponent,
    DmloaivanbanComponent,
    BaocaotaichinhComponent,
    UploadhdsdComponent,
    ModalbaocaotonghopComponent,
    ModalShowgiadatComponent,
    DmkhoComponent,
    ModaldmkhoComponent,
    KiemkekhoComponent,
    KiemkekhomodalComponent,
    NhapkhoComponent,
    NhapkhomodalComponent,
    PhabongComponent,
    ThongsochatluongComponent,
    ThongsochatluongmodalComponent,
    ThongkesanluongComponent,
    ThongkesanluongmodalComponent,
    SanluongtonghopComponent,
    SanluongchitietComponent,
    LoaibongComponent,
    CapbongComponent,
    CasanxuatComponent,
    DanhsachmayComponent,
    DanhsachmaymodalComponent,
    PhabongmodalComponent,
    DieuhanhsanxuatComponent,
    KehoachsanxuatComponent,
    KehoachsanxuatmodalComponent,
    XuatkhoComponent,
    XuatkhomodalComponent,
    DieuchuyenComponent,
    DieuchuyenmodalComponent,
    HacapComponent,
    HacapmodalComponent,
    ChonhanghoamodalComponent,
    TrienkhaikehoachsanxuatComponent,
    TrienkhaikehoachsanxuatmodalComponent,
    TimbongComponent,
    TimbongmodalComponent,
    BotrimaymodalComponent,
    MathangComponent,
    MathangmodelComponent,
    PhanxuongComponent,
    PhanxuongmodalComponent,
    FilterPipe,
    CongDoanPipe,
    LoaisoiComponent,
    ChonmaytheocongdoanComponent,
    ImportdanhmucmodelComponent,
    TrangthaimaysanxuatComponent,
    NhomkhoComponent,
    XuatkhomathangmodalComponent,
    KhoComponent,
    KehoachnhapnguyenlieuComponent,
    KehoachnhapnguyenlieumodalComponent,
    KehoachxuathangComponent,
    KehoachxuathangmodalComponent,
    NhapkhothanhphamComponent,
    NhapkhothanhphammodalComponent,
    NhapkhohoiamComponent,
    NhapkhohoiammodalComponent,
    ChatluongsoiComponent,
    ChatluongsoimodalComponent,
    DmmaybienapComponent,
    DmmaybienapmodalComponent,
    LoaidienkvComponent,
    DmnhomcongtoComponent,
    DmcongtoComponent,
    DmcongtomodalComponent,
    ChonkienbongmodalComponent,
    DmthongkedienComponent,
    DmthongkedienmodalComponent,
    DinhmuctieuhaoComponent,
    DinhmuctieuhaomodalComponent,
    VitriComponent,
    VitrimodalComponent,
    CandoitonComponent,
    DieuhanhsanxuattonghopComponent,
    DmtieuchichatluongsoiComponent,
    DmtieuchichatluongsoimodalComponent,
    SanxuatComponent,
    SanxuatmodalComponent,
    DmphannhommayComponent,
    DmphannhommaymodalComponent,
    DmphannhommayChonmathangmodalComponent,
    PhieudieuchinhComponent,
    PhieudieuchinhmodalComponent,
    QuycachdonggoiComponent,
    SanluongComponent,
    ChonquycachdonggoimodalComponent,
    XepbanbongComponent,
    XepbanbongmodalComponent,
    Dongvanpx1Component,
    Dongvanpx2Component,
    KienlocongdieuchinhmodalComponent,
    XuatkhoxoComponent,
    XuatkhoxomodalComponent,
    XuatkhobonghoiComponent,
    XuatkhobonghoimodalComponent,
    XuatkhobongpheComponent,
    XuatkhobongphemodalComponent,
    DinhmuctieuchichatluongsoiComponent,
    DinhmuctieuchichatluongsoimodalComponent,
    NhapkhokhacComponent,
    NhapkhokhacmodalComponent,
    XuatkhothanhphamComponent,
    XuatkhothanhphammodalComponent,
    PhanquyentheophanxuongComponent,
    PhanquyentheophanxuongmodalComponent,
    NhucauxuathangComponent,
    LohangComponent,
    LohangmodalComponent,
    DashboardthongluongComponent,
    GiaokehoachsanxuathoanthanhComponent,
    GiaokehoachsanxuathoanthanhmodalComponent,
    ChonsodongphannhommayComponent,
    KiemkebcpComponent,
    KiemkebcpmodalComponent,
    CandoichuyenComponent,
    BotrimayOngComponent,
    BotrimayChungComponent,
    DactinhbongComponent,
    DactinhbongmodalComponent,
    KehoachnhapnguyenlieuitemmodalComponent,
    KehoachnhapnguyenlieuinvoiceComponent,
    KehoachnhapnguyenlieuinvoicemodalComponent,
    ChonkienbonghoimodalComponent,
    BanchephamComponent,
    BanchephammodalComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    QuantriRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    SidebarModule,
    PanelMenuModule,
    ChartModule,
    TableModule,
    OverlayPanelModule,
    TreeModule,
    ToolbarModule,
    PaginatorModule,
    TabViewModule,
    PanelModule,
    DynamicDialogModule,
    DialogModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    FormsModule,
    GalleriaModule,
    NgbModule,
    CheckboxModule,
    RadioButtonModule,
    MenuModule,
    InputMaskModule,
    PasswordModule,
    InputSwitchModule,
    TooltipModule,
    MultiSelectModule,
    VoiLibModule,
    InputTextareaModule,
    ProgressBarModule,
    NgbProgressbarModule,
    ColorPickerModule
  ],
  entryComponents: [
    ModalThuaDatComponent,
    ModalTaiSanTrenDatComponent,
    ModalHsvbPhapQuyComponent,
    ModalTinhTrangPhapLyComponent,
    ModalGiaDatComponent,
    ModaldmdonviComponent,
    ModaldmhinhthucxulyComponent,
    ModaldanhmucchungComponent,
    ModalthongbaoComponent,
    ModaldmtaisanComponent,
    UploadmodalComponent,
    ModaltinhComponent,
    ModalquanComponent,
    ModalphuongComponent,
    ModalcaphangcongtrinhComponent,
    ModalphuongansapxepComponent,
    ModalchitietthuadatComponent,
    ModalquytrinhsapxepComponent,
    ModalchonthuadatComponent,
    ModaldoimatkhauComponent,
    ModaldonvisohuunhadatComponent,
    ModalthongtinchothueComponent,
    ModalimportexcelComponent,
    ModaladvancedsearchComponent,
    ModalbaocaotonghopComponent,
    ModalShowgiadatComponent,
    ModaldmkhoComponent,
    KiemkekhomodalComponent,
    NhapkhomodalComponent,
    ThongsochatluongmodalComponent,
    ThongkesanluongmodalComponent,
    DanhsachmaymodalComponent,
    PhabongmodalComponent,
    KehoachsanxuatmodalComponent,
    XuatkhomodalComponent,
    HacapmodalComponent, DieuchuyenmodalComponent,
    ChonhanghoamodalComponent,
    TrienkhaikehoachsanxuatmodalComponent,
    TimbongmodalComponent,
    BotrimaymodalComponent,
    MathangmodelComponent,
    PhanxuongmodalComponent,
    ChonmaytheocongdoanComponent,
    ImportdanhmucmodelComponent,
    XuatkhomathangmodalComponent,
    KehoachnhapnguyenlieumodalComponent,
    KehoachxuathangmodalComponent,
    NhapkhothanhphammodalComponent,
    DmmaybienapmodalComponent,
    NhapkhohoiammodalComponent,
    ChatluongsoimodalComponent,
    DmcongtomodalComponent,
    ChonkienbongmodalComponent,
    DmthongkedienmodalComponent,
    DinhmuctieuhaomodalComponent,
    VitrimodalComponent,
    DmtieuchichatluongsoimodalComponent,
    DmphannhommaymodalComponent,
    DmphannhommayChonmathangmodalComponent,
    PhieudieuchinhmodalComponent,
    ChonquycachdonggoimodalComponent,
    SanxuatmodalComponent,
    XepbanbongmodalComponent,
    Dongvanpx1Component,
    Dongvanpx2Component,
    KienlocongdieuchinhmodalComponent,
    XuatkhoxomodalComponent,
    XuatkhobonghoimodalComponent,
    XuatkhobongphemodalComponent,
    DinhmuctieuchichatluongsoimodalComponent,
    NhapkhokhacmodalComponent,
    XuatkhothanhphammodalComponent,
    PhanquyentheophanxuongmodalComponent,
    LohangmodalComponent,
    GiaokehoachsanxuathoanthanhmodalComponent,
    KiemkebcpmodalComponent,
    BotrimayOngComponent,
    DactinhbongmodalComponent,
    BotrimayChungComponent,
    KehoachnhapnguyenlieuitemmodalComponent,
    KehoachnhapnguyenlieuinvoicemodalComponent,
    ChonkienbonghoimodalComponent,
    BanchephammodalComponent,

  ],
  providers: [
    SanXuatService,
    Dat09Service,
    SignalRService,
    isXoaPipe,
    VNDPipe,
    FilterPipe,
    CongDoanPipe,
    CaPipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],
})
export class QuantriModule { }
