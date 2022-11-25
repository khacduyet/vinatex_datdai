import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './host';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root'
})
export class SanXuatService {
    constructor(private http: HttpClient, private store: StoreService) {

    }
    //Cấp bông
    //this.store.getCurrent();
    //data.IdNhaMay =this.store.getCurrent().toString();
    GetAllQuyen() {
        let url = API.auth;
        return this.http.get(url + `QuanTri/GetAllQuyen`, httpOptions);
    }

    GetListOptdmCapBong() {
        let url = API.SCMDanhMuc + 'GetListdmCapBong';
        return this.http.get(url, httpOptions);
    }
    GetListdmCapBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmCapBong(data) {
        let url = API.SCMDanhMuc + 'SetdmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmCapBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    //#region  Danh Muc Kho
    GetListdmKho(data) {
        let url = API.SCMDanhMuc + 'GetListdmKho';
        return this.http.post(url, data, httpOptions);
    }
    SetdmKho(data) {
        let url = API.SCMDanhMuc + 'SetdmKho';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmKho(data) {
        let url = API.SCMDanhMuc + 'DeletedmKho';
        return this.http.post(url, data, httpOptions);
    }
    GetDashBoard_TruyXuatNguonGoc(IddmItem, TuNgay, DenNgay) {
        let url = API.SCMDashBoard + `GetDashBoard_TruyXuatNguonGoc?IddmItem=${IddmItem}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`;
        return this.http.get(url, httpOptions);
    }
    //#endregion

    //#region  Danh mục máy biến áp
    DMMayBienAp() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachMayBienAp', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemMayBienAp?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemMayBienAp', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteMayBienAp', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục loại điện
    dmLoaiDienKV() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachLoaiDienKV', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemLoaiDienKV?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemLoaiDienKV', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteLoaiDienKV', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục nhóm công tơ
    dmNhomCongToDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachNhomCongToDien', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemNhomCongToDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemNhomCongToDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteNhomCongToDien', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục nhóm công tơ
    dmQuyCachDongGoi() {
        let url = API.SCMDanhMuc;
        return {
            GetList: () => {
                return this.http.get(url + 'GetListdmQuyCachDongGoi', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetListdmQuyCachDongGoi?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmQuyCachDongGoi', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmQuyCachDongGoi', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục phân nhóm máy
    dmPhanNhomMaySanXuat() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetListdmPhanNhomMaySanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetdmPhanNhomMay?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmPhanNhomMay', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeletedmPhanNhomMaySanXuat?Id=${Id}`, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Báo cáo
    BaoCao() {
        let url = API.SCMBaoCao;
        let url2 = API.SCMKiemTraChatLuong;
        return {
            TongHop: (data) => {
                return this.http.post(url + 'GetDashBoard_TongHop', data, httpOptions);
            },
            BieuDoCoCau: (data) => {
                return this.http.post(url + 'GetDashBoard_BieuDoCoCau', data, httpOptions);
            },
            GetDashBoard_NhuCauXuatHang: (data) => {
                return this.http.post(url + 'GetDashBoard_NhuCauXuatHang', data, httpOptions);
            },
            GetDashBoard_CoCauMatHang: (data) => {
                return this.http.post(url + 'GetDashBoard_CoCauMatHang', data, httpOptions);
            },
            GetBaoCaoQuyTrinhKiemTraChatLuong: (Nam, IddmPhanXuong, IddmChiTieu, KeyWord) => {
                return this.http.get(url2 + `GetBaoCaoQuyTrinhKiemTraChatLuong?Nam=${Nam}&IddmPhanXuong=${IddmPhanXuong}&IddmChiTieu=${IddmChiTieu}&KeyWord=${KeyWord}`, httpOptions);
            },
            GetBieuDoDuongKiemTraChatLuong: (Nam, IddmPhanXuong, IddmChiTieu, IddmItem) => {
                return this.http.get(url2 + `GetBieuDoDuongKiemTraChatLuong?Nam=${Nam}&IddmPhanXuong=${IddmPhanXuong}&IddmChiTieu=${IddmChiTieu}&IddmItem=${IddmItem}`, httpOptions);
            },
            GetDanhSachChiTieuChatLuong_BieuDo: () => {
                return this.http.get(url2 + 'GetDanhSachChiTieuChatLuong_BieuDo', httpOptions);
            },
            GetDashBoard_CanDoiTonXuatHang: (data) => {
                return this.http.post(url + 'GetDashBoard_CanDoiTonXuatHang', data, httpOptions);
            },
            GetDashBoard_SanLuongOng: (data) => {
                return this.http.post(url + 'GetDashBoard_SanLuongOng', data, httpOptions);
            },
            BaoCaoThongLuongSanXuat: (data) => {
                return this.http.post(`${url}BaoCaoThongLuongSanXuat`, data, httpOptions);
            },
            BaoCaoThongLuongSanXuatMinMax: (data) => {
                return this.http.post(`${url}BaoCaoThongLuongSanXuatMinMax`, data, httpOptions)
            },
            GetListdmMayTheoCongDoan: (congDoan) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmMayTheoCongDoan?CongDoan=${congDoan}`, httpOptions);
            }
        }
    }
    //#endregion


    //#region Định mức tiêu chí chất lượng sợi
    dmDinhMucTieuChiChatLuongSoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            Get: (data) => {
                return this.http.post(url + `GetDanhSachChiTieuChatLuongTheoSanPham`, data, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetDanhSachChiTieuChatLuongTheoSanPham', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục tiêu chí chất lượng sợi
    dmTieuChiChatLuongsoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachChiTieuChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemChiTieuChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemChiTieuChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteChiTieuChatLuong', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục công tơ
    dmCongToDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + `GetDanhSachCongToDien`, data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemCongToDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemCongToDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteCongToDien', data, httpOptions);
            },
        }
    }
    //#endregion

    //Ca sản xuất
    GetListOptdmCaSanXuat() {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuat';
        return this.http.get(url, httpOptions);
    }
    GetListdmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }
    SetdmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'SetdmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'DeletedmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }


    // Loại bông
    GetListdmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    GetListdmLoaiBongHoiPhe() {
        let url = API.SCMDanhMuc + 'GetListdmLoaiBongHoiPhe';
        return this.http.get(url, httpOptions);
    }
    SetdmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'SetdmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }


    //máy
    GetListOptdmMay() {
        let url = API.SCM + 'GetListdmMay';
        return this.http.get(url, httpOptions);
    }
    GetListdmMay(data) {
        let url = API.SCMDanhMuc + 'GetListdmMay';
        return this.http.post(url, data, httpOptions);
    }
    SetdmMay(data) {
        let url = API.SCMDanhMuc + 'SetdmMay';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmMay(data) {
        let url = API.SCMDanhMuc + 'DeletedmMay';
        return this.http.post(url, data, httpOptions);
    }

    //#region  mặt hàng

    GetListdmItem(data) {
        let url = API.SCMDanhMuc + 'GetListdmItem';
        return this.http.post(url, data, httpOptions);
    }
    SetdmItem(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmItem';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmItem(data) {
        let url = API.SCMDanhMuc + 'DeletedmItem';
        return this.http.post(url, data, httpOptions);
    }
    ImportDanhSachChiTieuChatLuongTheoSanPham(IdDuAn, TableName, FileName) {
        let url = API.SCMKiemTraChatLuong + `ImportDanhSachChiTieuChatLuongTheoSanPham?IdDuAn=${IdDuAn}&TableName=${TableName}&FileName=${FileName}`;
        return this.http.get(url, httpOptions);
    }
    ExportDanhSachChiTieuChatLuongTheoSanPham(data) {
        let url = API.SCMKiemTraChatLuong + 'ExportDanhSachChiTieuChatLuongTheoSanPham';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  phân xưởng
    GetListdmPhanXuongOpt() {
        let url = API.SCMDanhMuc + 'GetListdmPhanXuong';
        return this.http.get(url, httpOptions);
    }
    GetListdmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'GetListdmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'SetdmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'DeletedmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  loại sợi
    GetListOptdmLoaiSoi() {
        let url = API.SCMDanhMuc + 'GetListdmLoaiSoi';
        return this.http.get(url, httpOptions);
    }
    GetListdmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    SetdmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'SetdmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  nhóm kho
    GetListdmNhomKho(data) {
        let url = API.SCMDanhMuc + 'GetListdmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    SetdmNhomKho(data) {
        let url = API.SCMDanhMuc + 'SetdmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmNhomKho(data) {
        let url = API.SCMDanhMuc + 'DeletedmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region lô bông
    GetListLoBong(data) {
        let url = API.SCMDanhMuc + 'GetListLoBong';
        return this.http.post(url, data, httpOptions);
    }
    SetLoBong(data) {
        let url = API.SCMDanhMuc + 'SetLoBong';
        return this.http.post(url, data, httpOptions);
    }
    DeleteLoBong(data) {
        let url = API.SCMDanhMuc + 'DeleteLoBong';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //Dùng chung
    GetListCongDoan() {
        let url = API.SCMDanhMuc + 'GetListCongDoan';
        return this.http.get(url, httpOptions);
    }
    KiemTraTabTrangThai(eAction) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraTab?eAction=${eAction}`;
        return this.http.get(url, httpOptions);
    }

    KiemTraButton(IdTable, IdTrangThai) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraButton?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}`;
        return this.http.get(url, httpOptions);
    }
    KiemTraButtonUser(IdTrangThai, IdTable, IdUser) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraButtonUser?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}&IdUser=${IdUser}`;
        return this.http.get(url, httpOptions);
    }
    GetListUser() {
        var IdDuAn = this.store.getCurrent();
        let url = API.auth + `DanhMuc/GetListNhanSuDuAn?IdDuAn=53&MaDuAn=`;
        return this.http.get(url, httpOptions);
    }

    GetOptions() {
        return {
            GetMatHang: () => {
                return this.http.post(`${API.SCMDanhMuc}GetListdmItem`, { Loai: 1 }, httpOptions)
            },
            GetNhaMay: () => {
                return this.http.post(`${API.auth}DanhMuc/GetDanhSachDuAn_Advance`, {}, httpOptions)
            },
            GetPhanXuong: (IdDuAn?) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmPhanXuongForIdDuAn?IdDuAn=${IdDuAn ? IdDuAn : this.store.getCurrent()}`, httpOptions)
            },
            GetListGiaoKeHoachSanXuatChuaLapKeHoach: () => {
                return this.http.get(`${API.SCMQuanLyKho}GetListGiaoKeHoachSanXuatChuaLapKeHoach`, httpOptions)
            },
            // GetListMatHangChuaLapKeHoach: (IdGiaoKeHoachSanXuat) => {
            //     return this.http.get(`${API.SCMQuanLyKho}GetListMatHangChuaLapKeHoach?IdGiaoKeHoachSanXuat=${IdGiaoKeHoachSanXuat}`, httpOptions)
            // },
            GetListMatHangChuaLapKeHoach: (IddmPhanXuong) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListMatHangChuaLapKeHoach?IddmPhanXuong=${IddmPhanXuong}`, httpOptions)
            },
            GetListCongDoanTheoMatHang: (IddmMatHang) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListCongDoanTheoMatHang?IddmMatHang=${IddmMatHang}`, httpOptions)
            },
            GetListMayTheoCongDoan: (IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListMayTheoCongDoan?IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
            },
            GetDanhSachDuAnByIdUser: (IdUser) => {
                return this.http.get(`${API.auth}DanhMuc/GetDanhSachDuAnByIdUser?IdUser=${IdUser}`, httpOptions)
            },
            GetListTinhTrangMay: (Id, IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListTinhTrangMay?Id=${Id}&IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
            },
            GetTonKhoCuaNguyenLieu: (idKho, idNguyenLieu) => {
                return this.http.get(`${API.KeHoachNguyenLieu}GetTonKhoCuaNguyenLieu?idKho=${idKho}&idNguyenLieu=${idNguyenLieu}`, httpOptions)
            },
            // DanhMuc/GetListdmLoaiBong_DashBoard
            GetListdmLoaiBong_DashBoard:()=>{
                return this.http.get(`${API.SCMDanhMuc}GetListdmLoaiBong_DashBoard`,httpOptions)
            },
            GetdmKhoTheoDuAn_DashBoard:()=>{
                return this.http.get(`${API.SCMDanhMuc}GetdmKhoTheoDuAn_DashBoard?IdDuAn=${this.store.getCurrent()}`,httpOptions)
            }
        }
    }

    //GiaoKeHoachSanXuat
    GiaoKeHoachSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListGiaoKeHoachSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetGiaoKeHoachSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetGiaoKeHoachSanXuat', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepGiaoKeHoachSanXuat', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            },
            HoanThanh: (data) => {
                return this.http.post(url + 'HoanThanhGiaoKeHoachSanXuat', data, httpOptions);
            },
        }
    }
    //TrienKhaiKeHoachSanXuat
    TrienKhaiKeHoachSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhTrienKhaiKeHoachSanXuat', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            Get: (Id, ChiTiet?) => {
                return this.http.get(url + `GetTrienKhaiKeHoachSanXuat?Id=${Id}&ChiTiet=${ChiTiet === false ? false : true}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepTrienKhaiKeHoachSanXuat', data, httpOptions)
            },
            KhongDuyet: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'KhongDuyetTrienKhaiKeHoachSanXuat', data, httpOptions)
            },
            TinhNangSuat: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'TinhNangSuat', data, httpOptions)
            }
        }
    }
    //CanDoiChuyen
    CanDoiChuyen() {
        let url = API.SCMQuanLyKho;
        return {
            GetListCanDoiChuyen: (IddmPhanXuong, CongDoan, TuNgayUnix, DenNgayUnix) => {
                return this.http.get(`${url}GetListCanDoiChuyen?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&TuNgay=${TuNgayUnix}&DenNgay=${DenNgayUnix}`, httpOptions);
            },
            GetCanDoiChuyen: (IddmPhanXuong, CongDoan, NgayUnix) => {
                return this.http.get(`${url}GetCanDoiChuyen?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&Ngay=${NgayUnix}`, httpOptions);
            },
            SetCanDoiChuyen: (data) => {
                data.IdDuAn = this.store.getCurrent().toString();
                return this.http.post(`${url}SetCanDoiChuyen`, data, httpOptions);
            },
            SetCanDoiChuyen_ApDungNgay: (data) => {
                return this.http.get(`${url}SetCanDoiChuyen_ApDungNgay?IddmPhanXuong=${data.IddmPhanXuong}&CongDoan=${data.CongDoan}&Ngay=${data.NgayUnix}&TuNgay=${data.TuNgayUnix}&DenNgay=${data.DenNgayUnix}&Xoa=true`)
            }
        }
    }
    //#region  NhapLoBong
    QuyTrinhPhieuNhapLoBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapLoBong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapLoBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapLoBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapLoBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapLoBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapLoBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapLoBong', data, httpOptions)
            },
            GetNextSoLoBong: (IddmLoaiBong, IddmCapBong) => {
                return this.http.get(url + `GetNextSoLoBong?IddmLoaiBong=${IddmLoaiBong}&IddmCapBong=${IddmCapBong}`, httpOptions)
            },
        }
    }
    //#endregion

    //#region  NhapChatLuong
    PhieuNhapLoBong_ChatLuong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapLoBong_ChatLuong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapLoBong_ChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapLoBong_ChatLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapLoBong_ChatLuong', data, httpOptions)
            },
            Import: (Id, FileName) => {
                return this.http.get(url + `ImportExcelPhieuNhapLoBong_ChatLuong?Id=${Id}&FileName=${FileName}`, httpOptions)
            },
            Import_Mic: (Id, FileName) => {
                return this.http.get(url + `ImportExcelPhieuNhapLoBong_ChatLuong_Mic?Id=${Id}&FileName=${FileName}`, httpOptions)
            },
            exportExcelMau: (Loai) => {
                return this.http.get(url + `ExportMauExcelChatLuong?Loai=${Loai}`, httpOptions)
            },
        }
    }
    //#endregion

    //#region  phiếu bàn giao bông xơ
    PhieuBanGiaoBongXo() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuBanGiaoBongXo', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuBanGiaoBongXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuBanGiaoBongXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuBanGiaoBongXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuBanGiaoBongXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuBanGiaoBongXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuBanGiaoBongXo', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region  phiếu hạ cấp
    PhieuHaCap() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuHaCap', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuHaCap', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuHaCap?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuHaCap', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuHaCap', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuHaCap', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuHaCap', data, httpOptions)
            },
        }
    }
    //#endregion


    //#region  phiếu điều chuyển
    PhieuDieuChuyen() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuDieuChuyen', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuDieuChuyen', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuDieuChuyen?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuDieuChuyen', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuDieuChuyen', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuDieuChuyen', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuDieuChuyen', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region nhập kế hoạch nguyên liệu
    NhapKeHoachNguyenLieu() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachNhapNguyenLieu', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListKeHoachNhapNguyenLieu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachNhapNguyenLieu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachNhapNguyenLieu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachNhapNguyenLieu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachNhapNguyenLieu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachNhapNguyenLieu', data, httpOptions)
            },
            GetListChuaNhap: (IdKeHoachInvoice_Item) => {
                let IdDuAn = this.store.getCurrent();
                return this.http.get(url + `GetListKeHoachNhapNguyenLieu_ChuaNhapHang?IdDuAn=${IdDuAn}&IdKeHoachInvoice_Item=${IdKeHoachInvoice_Item}`, httpOptions)
            },
        }
    }

    //#region nhập kế hoạch nguyên liệu
    KeHoachXuatHang() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachXuatHang', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListKeHoachXuatHang', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachXuatHang?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachXuatHang', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachXuatHang', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachXuatHang', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachXuatHang', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region thống kê điện
    ThongKeDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                // data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListThongKeDien', data, httpOptions);
            },
            Get: (data) => {
                return this.http.post(url + `GetThongKeDien`, data, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeDien', data, httpOptions);
            },
        }
    }
    //#endregion

    ThongKeSanLuong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhThongKeSanLuong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListThongKeSanLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetThongKeSanLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeSanLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteThongKeSanLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepThongKeSanLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetThongKeSanLuong', data, httpOptions)
            },
            GetMatHang: (IddmPhanXuong, IddmCaSanXuat, Ngay) => {
                return this.http.get(url + `GetMatHangThongKeSanLuong?IddmPhanXuong=${IddmPhanXuong}&IddmCaSanXuat=${IddmCaSanXuat}&Ngay=${Ngay}`, httpOptions)
            },
        }
    }
    //Pha bông
    PhuongAnPhaBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhuongAnPhaBong', httpOptions);
            },
            GetLoBongTrongKho: (IdDuAn) => {
                return this.http.get(url + `GetLoBongTrongKho?IdDuAn=${IdDuAn}`, httpOptions)
            },
            TinhKhoiLuongBong: (data) => {
                return this.http.post(url + 'TinhKhoiLuongBong', data, httpOptions)
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnPhaBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnPhaBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = parseInt(this.store.getCurrent());
                return this.http.post(url + 'SetPhuongAnPhaBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhuongAnPhaBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnPhaBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnPhaBong', data, httpOptions)
            },
        }
    }



    Importdm(TableName, FileName) {
        let IdDuAn = this.store.getCurrent().toString()
        let url = API.SCMDanhMuc + `ImportDanhMuc?IdDuAn=${IdDuAn}&TableName=${TableName}&FileName=${FileName}`;
        return this.http.get(url, httpOptions);
    }
    Exportdm(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + `ExportDanhMuc`;
        return this.http.post(url, data, httpOptions);
    }
    download(url) {
        window.open(API.imgURL + url);
    }
    getLuuKho(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKho?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKhac(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKhoKhac?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKiemKe(IddmKho, IdLoBong, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `getLuuKhoKiemKe?IdDuAn=0&IddmKho=${IddmKho}&IdLoBong=${IdLoBong}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    KhoiTaoItem() {
        let url = API.SCMDanhMuc + 'KhoiTaoDinhMuc';
        return this.http.get(url, httpOptions);
    }
    PhieuNhapThanhPham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapThanhPham', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapThanhPham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapThanhPham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapThanhPham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapThanhPham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapThanhPham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapThanhPham', data, httpOptions)
            },
        }
    }
    PhieuNhapHoiAm() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapHoiAm', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapHoiAm', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapHoiAm?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapHoiAm', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapHoiAm', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapHoiAm', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapHoiAm', data, httpOptions)
            },
            GetListMatHang: (data) => {
                return this.http.post(url + 'GetlistdmMatHangHoiAm', data, httpOptions)
            },
        }
    }
    PhieuChatLuongSoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKiemTraChatLuong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListQuyTrinhKiemTraChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetQuyTrinhKiemTraChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetQuyTrinhKiemTraChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteQuyTrinhKiemTraChatLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepQuyTrinhKiemTraChatLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetQuyTrinhKiemTraChatLuong', data, httpOptions)
            },
        }
    }

    TimBong() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnTimBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnTimBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnTimBong', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnTimBong', data, httpOptions)
            },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            GetListKienBong: (data) => {
                return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            },
            TimBongTuDong: (IdTimBong) => {
                return this.http.get(`${url}TaoPhuongAnTimBong?Id=${IdTimBong}`, httpOptions)
            }
        }
    }

    SanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnSanXuat', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            // ChuyenTiep: (data) => {
            //     return this.http.post(url + 'ChuyenTiepPhuongAnSanXuat', data, httpOptions)
            // },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            GetListKienBong: (data) => {
                return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            }
        }
    }

    XepBanBong() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnXepBanBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnXepBanBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnXepBanBong', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            // ChuyenTiep: (data) => {
            //     return this.http.post(url + 'ChuyenTiepPhuongAnSanXuat', data, httpOptions)
            // },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            // GetListKienBong: (data) => {
            //     return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            // }
        }
    }

    //#region  định lượng

    GetListDinhMuc(data) {
        let url = API.SCMDanhMuc + 'GetListDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    GetDinhMuc(Id) {
        let url = API.SCMDanhMuc + `GetDinhMuc?Id=${Id}`;
        return this.http.get(url, httpOptions);
    }
    SetDinhMuc(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    DeleteDinhMuc(data) {
        let url = API.SCMDanhMuc + 'DeleteDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    PhieuKiemKeKho() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeKho', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuKiemKeKho', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeKho?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeKho', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeKho', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeKho', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeKho', data, httpOptions)
            },
        }
    }
    //#region  định lượng

    GetListdmViTri(data) {
        let url = API.SCMDanhMuc + 'GetListdmViTri';
        return this.http.post(url, data, httpOptions);
    }
    GetListdmViTriOpt() {
        let url = API.SCMDanhMuc + `GetListdmViTri`;
        return this.http.get(url, httpOptions);
    }
    SetdmViTri(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmViTri';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmViTri(data) {
        let url = API.SCMDanhMuc + 'DeletedmViTri';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    PhieuXuatSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBong', data, httpOptions)
            },
        }
    }
    PhuongAnDieuChinhTimBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhuongAnDieuChinhTimBong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnDieuChinhTimBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnDieuChinhTimBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhuongAnDieuChinhTimBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhuongAnDieuChinhTimBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnDieuChinhTimBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnDieuChinhTimBong', data, httpOptions)
            },
            GetKienLoBong: (IdPhuongAnPhaBong, IdLoBong, IddmKho, Mic) => {
                return this.http.get(url + `GetKienLoBongDieuChinh?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}&IdLoBong=${IdLoBong}&IddmKho=${IddmKho}&Mic=${Mic}`, httpOptions)
            },
        }
    }
    PhieuXuatKhoXo() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatXo', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatXo', data, httpOptions)
            },
        }
    }
    PhieuXuatBongPhe() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBongPhe', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatBongPhe', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBongPhe?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBongPhe', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBongPhe', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuXuatBongPhe', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBongPhe', data, httpOptions)
            },
        }
    }

    //Dashboard
    DashBoard() {
        let url = API.SCMDashBoard
        return {
            NhuCauSuDungBong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}GetDashBoard_NhuCauSuDungBong`, data, httpOptions);
            },
            CoCauTonBong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}GetDashBoard_CoCauTonBong`, data, httpOptions);
            },
            CanDoiTon: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}GetDashBoard_CanDoiTon`, data, httpOptions);
            },
            // GetCoCauTonBong:(data)=>{
            //     return this.http.post(`${url}/GetCoCauTonBong`,data,httpOptions);
            // },
            BaoCaoSanLuongLuyKe_BieuDoDuong: (data) => {
                return this.http.post(`${url}BaoCaoSanLuongLuyKe_BieuDoDuong`, data, httpOptions);
            },
            BaoCaoSanLuongLuyKe_BieuDoCot: (data) => {
                return this.http.post(`${url}BaoCaoSanLuongLuyKe_BieuDoCot`, data, httpOptions);
            },
            ExportBaoCaoThongKeDien:(data)=>{
                return this.http.post(`${url}ExportBaoCaoThongKeDien`, data, httpOptions);
            },
            ExportBaoCaoThongKeChatLuong:(data)=>{
                return this.http.post(`${url}ExportBaoCaoThongKeChatLuong`,data,httpOptions)
            },
            GetDashBoard_TruyXuatNguonGocTongHop:(data)=>{
                return this.http.post(`${url}GetDashBoard_TruyXuatNguonGocTongHop`,data,httpOptions)
            }
        }
    }


    GetDanhSachChiTieuChatLuong(data) {
        let url = API.SCMKiemTraChatLuong + 'GetDanhSachChiTieuChatLuong';
        return this.http.post(url, data, httpOptions);
    }

    PhieuXuatThanhPham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatThanhPham', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatThanhPham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatThanhPham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatThanhPham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatThanhPham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatThanhPham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatThanhPham', data, httpOptions)
            },
        }
    }
    PhanQuyen() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListUserTheoGiaoDien', data, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetUserTheoGiaoDien', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeleteUserTheoGiaoDien?Id=${Id}`, httpOptions);
            },
        }
    }
    LoHang() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListLoMatHang', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetLoMatHang?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetLoMatHang', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeleteLoMatHang?Id=${Id}`, httpOptions);
            },
        }
    }
    GetlistdmMatHangKiemTraChatLuong(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangKiemTraChatLuong';
        return this.http.post(url, data, httpOptions);
    }
    GetlistdmMatHangThanhPham(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangThanhPham';
        return this.http.post(url, data, httpOptions);
    }
    GetlistdmMatHangHaCap(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangHaCap';
        return this.http.post(url, data, httpOptions);
    }
    GetListLoaiSoiTietKiem() {
        let url = API.SCMDanhMuc + `GetListLoaiSoiTietKiem`;
        return this.http.get(url, httpOptions);
    }
    GetlistdmMatHangXuatThanhPham(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangXuatThanhPham';
        return this.http.post(url, data, httpOptions);
    }
    Notifications() {
        let url = API.auth + 'Notification/'
        return {
            GetListNotification: () => {
                return this.http.get(`${url}GetListNotification`, httpOptions)
            },
            GetMoreNotification: (lastId) => {
                return this.http.get(`${url}GetListNotification?idIdLast=${lastId}`, httpOptions)
            },
            GetNotiCounAndNew: () => {
                return this.http.get(`${url}GetNotification`, httpOptions)
            },

        }
    }
    PhieuKiemKeBanChePham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeBanChePham', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuKiemKeBanChePham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeBanChePham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeBanChePham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeBanChePham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeBanChePham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeBanChePham', data, httpOptions)
            },
        }
    }
    dmKiemKeBanChePham() {
        let url = API.SCMDanhMuc;
        return {
            GetListAll: () => {
                return this.http.get(url + `GetListdmKiemKeBanChePham`, httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListdmKiemKeBanChePham', data, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmKiemKeBanChePham', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeletedmKiemKeBanChePham?Id=${Id}`, httpOptions);
            },
        }
    }
    GetListCanDoiChuyenKiemKe(IddmPhanXuong, CongDoan, Ngay) {
        let url = API.SCMQuanLyKho + `GetListCanDoiChuyenKiemKe?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&Ngay=${Ngay}`;
        return this.http.get(url, httpOptions);
    }
    GetListThongKeSanLuong(IddmPhanXuong, CongDoan, Ngay) {
        let url = API.SCMQuanLyKho + `GetListThongKeSanLuong?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&Ngay=${Ngay}`;
        return this.http.get(url, httpOptions);
    }
    dmDacTinhBong() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListdmDacTinhBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetdmDacTinhBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmDacTinhBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmDacTinhBong', data, httpOptions);
            },
            GetDacTinh: (IddmLoaiBong, IddmCapBong) => {
                return this.http.get(url + `GetdmDacTinhBong?IddmLoaiBong=${IddmLoaiBong}&IddmCapBong=${IddmCapBong}`, httpOptions);
            },
        }
    }
    NhapKeHoachNguyenLieuInvoice() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachNhapNguyenLieuInvoice', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListKeHoachNhapNguyenLieuInvoice', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachNhapNguyenLieuInvoice?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachNhapNguyenLieuInvoice', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachNhapNguyenLieuInvoice', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachNhapNguyenLieuInvoice', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachNhapNguyenLieuInvoice', data, httpOptions)
            },
            KeHoachForInvoice: () => {
                return this.http.get(url + `GetListKeHoachNhapNguyenLieuForInvoice`, httpOptions)
            },
        }
    }
}
