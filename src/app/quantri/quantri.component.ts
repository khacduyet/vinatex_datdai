import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../services/auth.service';
import { ModaldoimatkhauComponent } from './modal/modaldoimatkhau/modaldoimatkhau.component';
import { filter, timestamp } from 'rxjs/operators';
import { SanXuatService } from '../services/callApiSanXuat';
import { StoreService } from '../services/store.service';
import { mapArrayForDropDown } from '../services/globalfunction';
import { SignalRService } from '../services/signalR.service';
import { mapQuyTrinhRoute } from '../services/mapquytrinhroute';
import { ToastrService } from 'ngx-toastr';
import { HienTrangSuDungComponent } from './components/hien-trang-su-dung/hien-trang-su-dung.component';
@Component({
    selector: 'app-quantri',
    templateUrl: './quantri.component.html',
    styleUrls: ['./quantri.component.css']
})
export class QuantriComponent implements OnInit {
    userBtn: any;
    userInfo: any;
    userSub: any;
    newNoti: any = 0;
    listNotis: any = [];
    // userName: any = 'Vinatex';
    display: boolean = false;
    OSName: string = 'HỆ THỐNG Quản lý Nhà – Đất'
    menu: MenuItem[];
    menuQLTS: MenuItem[];
    menuQLNS: MenuItem[];
    dataphanquyen: any = {};
    listNhaMay: Array<any> = [];
    IdNhaMay: string = '';
    showDropDown: boolean = false;
    canSendMessage: any;
    mapQuyTrinhRoute: any = mapQuyTrinhRoute;
    @ViewChild('listNoti') listNoti;
    constructor(private _auth: AuthenticationService, private _modal: NgbModal, private _router: Router, private _services: SanXuatService, private store: StoreService, private _signalRService: SignalRService, private _toastr: ToastrService) {
        this.userInfo = this._auth.currentUserValue;
        this.getOSName(this._router.url);
        this.subscribeToEvents();
        this.canSendMessage = _signalRService.connectionExists;
    }
    close() {
        this.display = false;
    }
    getOSName(url) {
        if (url.includes('sanxuat')) {
            this.showDropDown = true;
            this.OSName = 'Hệ thống quản trị ngành sợi';
            this.getListNhaMay()
        } else {
            this.showDropDown = false;
            this.OSName = 'HỆ THỐNG Quản lý Nhà – Đất';
        }
    }
    getListNhaMay() {
        console.log(this.userInfo);
        this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
            this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", 'Id');
            this.IdNhaMay = res[0].Id;
            this.setGlobalNhaMay({ value: res[0].Id })
        })
    }
    setGlobalNhaMay(event) {
        this.store.setNhaMay(event.value);
    }
    open(event) {
        this.listNoti.toggle(event);
    }
    readedAllNoti() {
        this.newNoti = 0;
    }
    readOne(item) {
        let read = this.listNotis.find(ele => ele.Id === item.Id);
        if (read) {
            read.isRead = true
        }
        this.newNoti = this.listNotis.filter(ele => ele.isRead !== true).length;
        let routerURL = this.mapQuyTrinhRoute[item.LoaiThongBao];
        console.log(routerURL + item.IdQuyTrinh)
        if (routerURL) {
            this._router.navigate([`${routerURL}${item.IdQuyTrinh}`])
        } else {
            this._toastr.warning('Không tìm thấy điều hướng của thông báo!')
        }
    }
    refreshNotis() {
        this.GetCount();
        this.GetListNotis();
    }

    GetCount() {
        this._services.Notifications().GetNotiCounAndNew().subscribe((res: any) => {
            this.newNoti = res.Count;
            res.ListNew.forEach(noti => {
                this._toastr.info(noti.NoiDung, noti.TieuDe);
            });
        })
    }
    GetListNotis() {
        this._services.Notifications().GetListNotification().subscribe((res: any) => {
            this.listNotis = res.ListItem;
        })
    }
    GetMoreNotis() {
        this._services.Notifications().GetMoreNotification(this.listNotis[this.listNotis.length - 1].Id).subscribe((res: any) => {
            this.listNotis = [...this.listNotis, ...res.ListItem];
        })
    }



    ngOnInit(): void {
        this.refreshNotis();
        this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((res: any) => {
            this.getOSName(res.url);
        })
        this._services.GetAllQuyen().subscribe((res: any) => {
            this.dataphanquyen = res;
            this.CaiMeNu();
            console.log(this.checkmenu('CANDOICHUYEN'))
        })
        // this.CaiMeNu();        
        this.menuQLTS = [
            {
                label: 'Bàn làm việc',
                routerLink: '/quantri/dashboard',
                icon: 'fas fa-home',
                command: () => {
                    this.close()
                }
            },
            {
                label: 'Quản lý tài sản nhà đất',
                routerLink: '/quantri/quanlytaisannhadat',
                icon: 'pi pi-sitemap',
                command: () => this.close()
            },
            {
                label: 'Sắp xếp xử lý đất đai',
                icon: 'pi pi-sort-amount-up',
                routerLink: '/quantri/sapxepxuly',
                expanded: false,
                items: [
                    {
                        label: 'Yêu cầu sắp xếp',
                        routerLink: '/quantri/sapxepxuly/yeucau',
                        command: () => this.close()
                    },
                    {
                        label: 'Quy trình sắp xếp',
                        routerLink: '/quantri/sapxepxuly/quytrinh',
                        command: () => this.close()
                    }
                ]
            },
            {
                label: 'Theo dõi thống kê',
                icon: 'pi pi-chart-bar',
                routerLink: '/quantri/theodoithongkebaocao',
                expanded: false,
                items: [
                    {
                        label: 'Báo cáo chi tiết cơ sở',
                        routerLink: '/quantri/theodoithongkebaocao/baocaochitietcaccoso',
                        command: () => this.close()
                    },
                    {
                        label: 'Báo cáo tổng hợp',
                        routerLink: '/quantri/theodoithongkebaocao/baocaodonvi',
                        command: () => this.close()
                    },
                    // {
                    //     label: 'Báo cáo sản lượng tổng hợp',
                    //     routerLink: '/quantri/theodoithongkebaocaosanxuat/sanluongtonghop',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Báo cáo sản lượng chi tiết',
                    //     routerLink: '/quantri/theodoithongkebaocaosanxuat/sanluongchitiet',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Biểu 1A',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu1a',
                    // },
                    // {
                    //     label: 'Biểu 1B',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu1b',
                    // },
                    // {
                    //     label: 'Biểu 1C',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu1c',
                    // },
                    // {
                    //     label: 'Biểu 2A',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu2a',
                    // },
                    // {
                    //     label: 'Biểu 2B',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu2b',
                    // },
                    // {
                    //     label: 'Biểu 3',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu3',
                    // },

                    // {
                    //     label: 'Biểu 4',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu4',
                    // },
                    // {
                    //     label: 'Biểu 5',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu5',
                    // },
                ]
            },
            {
                label: 'Danh mục dùng chung',
                routerLink: '/quantri/danhmuc',
                icon: 'pi pi-bars',
                expanded: false,
                items: [
                    {
                        label: 'Tài sản',
                        routerLink: '/quantri/danhmuc/dmtaisan',
                        command: () => this.close()

                    },
                    {
                        label: 'Tình trạng tài sản',
                        routerLink: '/quantri/danhmuc/dmtinhtrangtaisan',
                        command: () => this.close()

                    },
                    {
                        label: 'Biến động',
                        routerLink: '/quantri/danhmuc/dmbiendong',
                        command: () => this.close()

                    },
                    {
                        label: 'Mục đích sử dụng đất',
                        routerLink: '/quantri/danhmuc/dmmucdichsudung',
                        command: () => this.close()

                    },
                    {
                        label: 'Đơn vị',
                        routerLink: '/quantri/danhmuc/dmdonvi',
                        command: () => this.close()

                    },
                    {
                        label: 'Đơn vị đối tác',
                        routerLink: '/quantri/danhmuc/dmdonvisohuudatnha',
                        command: () => this.close()
                    },
                    {
                        label: 'Nguồn gốc sử dụng đất',
                        routerLink: '/quantri/danhmuc/dmnguongocdat',
                        command: () => this.close()

                    },
                    {
                        label: 'Hình thức xử lý',
                        routerLink: '/quantri/danhmuc/dmhinhthucxuly',
                        command: () => this.close()

                    },
                    {
                        label: 'Cấp hạng công trình',
                        routerLink: '/quantri/danhmuc/dmcaphangcongtrinh',
                        command: () => this.close()
                    },
                    {
                        label: 'Hiện trạng sử dụng',
                        routerLink: '/quantri/danhmuc/dmhientrangsudung',
                        command: () => this.close()
                    },
                    {
                        label: 'Loại văn bản',
                        routerLink: '/quantri/danhmuc/dmloaivanban',
                        command: () => this.close()
                    },
                    {
                        label: 'Tỉnh/TP',
                        routerLink: '/quantri/danhmuc/dmtinh',
                        command: () => this.close()
                    },
                    {
                        label: 'Quận/Huyện',
                        routerLink: '/quantri/danhmuc/dmquan',
                        command: () => this.close()
                    },
                    {
                        label: 'Phường/Xã',
                        routerLink: '/quantri/danhmuc/dmphuong',
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Quản lý hệ thống',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'HDSD',
                        routerLink: '/quantri/huongdansudung',
                        command: () => this.close()
                    },
                ]
            },
        ];
        this.userBtn = [
            // {
            //     label: 'Thông tin tài khoản', command: () => {
            //     }
            // },
            {
                label: 'Đổi mật khẩu', command: () => {
                    let modalRef = this._modal.open(ModaldoimatkhauComponent, {
                        backdrop: 'static'
                    })
                }
            },

            { separator: true },
            {
                label: 'Đăng xuất',
                routerLink: ['/login'],
                command: () => {
                    this._auth.logout()
                }
            }
        ];
        // this.menu = this.menuQLTS;
        // this.menu = this.menuQLNS;
    }

    CaiMeNu() {
        this.menuQLNS = [
            {
                label: 'Quản trị sản xuất',
                routerLink: '/quantri/quantrisanxuat',
                icon: 'fas fa-warehouse',
                visible: !this.checkmenu("P_QUANTRISANXUAT"),
                items: [
                    {
                        label: 'Tổng hợp',
                        routerLink: '/quantri/quantrisanxuat/tonghop',
                        separator: this.checkmenu("DASHBOARD_TONGHOP"),
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Nhu cầu SD nguyên liệu',
                        routerLink: '/quantri/quantrisanxuat/nguyenlieu',
                        separator: this.checkmenu("DASHBOARD_NHUCAUNGUYENLIEU"),
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Nhu cầu xuất hàng',
                        routerLink: '/quantri/quantrisanxuat/nhucauxuathang',
                        separator: this.checkmenu("DASHBOARD_NHUCAUXUATHANG"),
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Sản lượng',
                        routerLink: '/quantri/quantrisanxuat/sanluong',
                        separator: this.checkmenu("DASHBOARD_SANLUONG"),
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Thông lượng',
                        routerLink: '/quantri/quantrisanxuat/thongluong',
                        separator: this.checkmenu("DASHBOARD_THONGLUONG"),
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                    // {
                    //     label: 'Tổng hợp nguyên liệu',
                    //     routerLink: '/quantri/dieuhanhsanxuatnguyenlieu',
                    //     icon: 'fas fa-circle',
                    //     command: () => {
                    //         this.close()
                    //     }
                    // },
                    // {
                    //     label: 'Tổng hợp sản lượng',
                    //     routerLink: '/quantri/dieuhanhsanxuatsanluong',
                    //     icon: 'fas fa-circle',
                    //     command: () => {
                    //         this.close()
                    //     }
                    // },
                    // {
                    //     label: 'Tổng hợp chất lượng',
                    //     routerLink: '/quantri/dieuhanhsanxuatchatluong',
                    //     icon: 'fas fa-circle',
                    //     command: () => {
                    //         this.close()
                    //     }
                    // },
                ],
            },
            {
                label: 'Giao kế hoạch',
                routerLink: '/quantri/giaokehoachsanxuat',
                icon: 'fas fa-circle',
                visible: !this.checkmenu("P_GIAOKEHOACH"),
                items: [
                    {
                        label: 'Giao kế hoạch sản xuất',
                        routerLink: '/quantri/kehoachsanxuat/giaokehoachsanxuat/0',
                        separator: this.checkmenu("GIAOKEHOACHSANXUAT"),
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Kế hoạch nhập bông',
                        routerLink: '/quantri/quanlykhosanxuat/khobong/kehoachnhapnguyenlieu/0',
                        separator: this.checkmenu("KEHOACHNHAPNGUYENLIEU"),
                        command: () => this.close()
                    },
                    {
                        label: 'Kế hoạch nhập bông invoice',
                        routerLink: '/quantri/quanlykhosanxuat/khobong/kehoachnhapnguyenlieuinvoice/0',
                        separator: this.checkmenu("KEHOACHNHAPNGUYENLIEU"),
                        command: () => this.close()
                    },
                    {
                        label: 'Kế hoạch xuất sợi',
                        routerLink: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/kehoachxuathang/0',
                        separator: this.checkmenu("KEHOACHXUATHANG"),
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Điều hành sản xuất',
                routerLink: '/quantri/kehoachsanxuat',
                icon: 'fas fa-circle',
                visible: !this.checkmenu("P_DIEUHANHSANXUAT"),
                items: [
                    {
                        label: 'Triển khai kế hoạch sản xuất',
                        routerLink: '/quantri/kehoachsanxuat/trienkhaikehoachsanxuat/0',
                        separator: this.checkmenu("TRIENKHAIKEHOACHSANXUAT"),
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Cân đối chuyền',
                        routerLink: '/quantri/kehoachsanxuat/candoichuyen',
                        separator: this.checkmenu("CANDOICHUYEN"),
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Yêu cầu xuất bông',
                        routerLink: '/quantri/kehoachsanxuat/sanxuat/0',
                        separator: this.checkmenu("PHUONGANSANXUAT"),
                        command: () => this.close()
                    },
                    {
                        label: 'Lô hàng',
                        routerLink: '/quantri/kehoachsanxuat/lohang',
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Phương án công nghệ',
                routerLink: '/quantri/trienkhaisanxuat',
                icon: 'fas fa-circle',
                visible: !this.checkmenu("P_PHUONGANCONGNGHE"),
                items: [
                    {
                        label: 'Phương án pha bông',
                        routerLink: '/quantri/trienkhaisanxuat/phabong/0',
                        separator: this.checkmenu("PHUONGANPHABONG"),
                        command: () => this.close()
                    },
                    {
                        label: 'Phương án tìm bông',
                        routerLink: '/quantri/trienkhaisanxuat/timbong/0',
                        separator: this.checkmenu("PHUONGANTIMBONG"),
                        command: () => this.close()
                    },

                    {
                        label: 'Xếp bàn bông',
                        routerLink: '/quantri/trienkhaisanxuat/xepbanbong/0',
                        separator: this.checkmenu("PHUONGANXEPBANBONG"),
                        command: () => this.close()
                    },
                    {
                        label: 'Phiếu điều chỉnh',
                        routerLink: '/quantri/trienkhaisanxuat/phieudieuchinh/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Thông số chất lượng',
                        routerLink: '/quantri/quanlykhosanxuat/khobong/thongsochatluong/0',
                        separator: this.checkmenu("PHIEUNHAPLOBONG_CHATLUONG"),
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Thống kê sản xuất',
                icon: 'pi pi-chart-bar',
                routerLink: '/quantri/theodoithongkebaocaosanxuat',
                expanded: false,
                visible: !this.checkmenu("P_THONGKESANXUAT"),
                items: [
                    {
                        label: 'Thống kê sản lượng',
                        routerLink: '/quantri/theodoithongkebaocaosanxuat/thongkesanluong/0',
                        separator: this.checkmenu("THONGKESANLUONG"),
                        command: () => this.close()
                    },
                    {
                        label: 'Thống kê điện',
                        routerLink: '/quantri/theodoithongkebaocaosanxuat/thongkedien/0',
                        separator: this.checkmenu("THONGKEDIEN"),
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Quản lý kho hồi ẩm',
                icon: 'fas fa-circle',
                routerLink: '/quantri/quanlysanxuatkhohoiam/khohoiam',
                expanded: false,
                visible: !this.checkmenu("P_KHOHOIAM"),
                items: [
                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlysanxuatkhohoiam/khohoiam/nhapkho/0',
                        separator: this.checkmenu("NHAPHOIAM"),
                        command: () => this.close()
                    },
                    {
                        label: 'Chất lượng sợi',
                        routerLink: '/quantri/quanlysanxuatkhohoiam/khohoiam/chatluongsoi/0',
                        separator: this.checkmenu("KIEMTRACHATLUONGSOI"),
                        command: () => this.close()
                    },
                    {
                        label: 'Hạ cấp',
                        routerLink: '/quantri/quanlysanxuatkhohoiam/khohoiam/hacap/0',
                        separator: this.checkmenu("PHIEUHACAP"),
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Quản lý kho thành phẩm',
                icon: 'fas fa-circle',
                routerLink: '/quantri/quanlysanxuatkhothanhpham/khothanhpham',
                expanded: false,
                visible: !this.checkmenu("P_KHOTHANHPHAM"),
                items: [
                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/nhapkho/0',
                        separator: this.checkmenu("NHAPTHANHPHAM"),
                        command: () => this.close()
                    },
                    {
                        label: 'Kiểm kê kho',
                        routerLink: '/quantri/quanlykhosanxuat/khothanhpham/kiemkekho/0',
                        command: () => this.close()
                    },

                    {
                        label: 'Xuất kho',
                        routerLink: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/0',
                        separator: this.checkmenu("XUATTHANHPHAM"),
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Quản lý kho bông',
                icon: 'fas fa-circle',
                routerLink: '/quantri/quanlykhosanxuat/khobong',
                expanded: false,
                visible: !this.checkmenu("P_KHOBONG"),
                items: [

                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlykhosanxuat/khobong/nhapkho/0',
                        separator: this.checkmenu("PHIEUNHAPLOBONG"),
                        command: () => this.close()
                    },
                    
                    {
                        label: 'Xuất kho',
                        routerLink: '/quantri/quanlykhosanxuat/khobong/xuatkho/0',
                        separator: this.checkmenu("PHIEUXUATBONG"),
                        command: () => this.close()
                    },
                    {
                        label: 'Kiểm kê kho',
                        routerLink: '/quantri/quanlykhosanxuat/khobong/kiemkekho/0',
                        command: () => this.close()
                    },
                    // {
                    //     label: 'Điều chuyển',
                    //     routerLink: '/quantri/quanlykhosanxuat/khobong/dieuchuyen/0',
                    //     command: () => this.close()
                    // },

                    // {
                    //     label: 'Cân đối tồn',
                    //     routerLink: '/quantri/quanlykhosanxuat/khobong/candoiton/0',
                    //     command: () => this.close()
                    // },
                ]
            },
            {
                label: 'Quản lý kho xơ',
                icon: 'fas fa-circle',
                routerLink: '/quantri/quanlykhosanxuat/khoxo',
                expanded: false,
                visible: !this.checkmenu("P_KHOXO"),

                items: [
                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlykhosanxuat/khoxo/nhapkho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Xuất kho',
                        routerLink: '/quantri/quanlykhosanxuat/khoxo/xuatkho/0',
                        separator: this.checkmenu("PHIEUXUATXO"),
                        command: () => this.close()
                    },
                    {
                        label: 'Kiểm kê kho',
                        routerLink: '/quantri/quanlykhosanxuat/khoxo/kiemkekho/0',
                        command: () => this.close()
                    },
                    // {
                    //     label: 'Điều chuyển',
                    //     routerLink: '/quantri/quanlykhosanxuat/khoxo/dieuchuyen/0',
                    //     command: () => this.close()
                    // },
                ]
            },
            {
                label: 'Quản lý kho bông hồi',
                icon: 'fas fa-circle',
                routerLink: '/quantri/quanlykhosanxuatbongkhac/khobonghoi',
                expanded: false,
                visible: !this.checkmenu("P_KHOBONGHOI"),

                items: [
                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlykhosanxuatbongkhac/khobonghoi/nhapkho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Xuất kho',
                        routerLink: '/quantri/quanlykhosanxuatbongkhac/khobonghoi/xuatkho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Kiểm kê kho',
                        routerLink: '/quantri/quanlykhosanxuat/khobonghoi/kiemkekho/0',
                        command: () => this.close()
                    },
                    // {
                    //     label: 'Điều chuyển',
                    //     routerLink: '/quantri/quanlykhosanxuatbongkhac/khobonghoi/dieuchuyen/0',
                    //     command: () => this.close()
                    // },
                ]
            },
            {
                label: 'Quản lý kho bông phế',
                icon: 'fas fa-circle',
                routerLink: '/quantri/quanlykhosanxuatbongkhac/khobongphe',
                expanded: false,
                visible: !this.checkmenu("P_KHOBONGPHE"),
                items: [
                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlykhosanxuatbongkhac/khobongphe/nhapkho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Xuất kho',
                        routerLink: '/quantri/quanlykhosanxuatbongkhac/khobongphe/xuatkho/0',
                        separator: this.checkmenu("PHIEUXUATBONGPHE"),
                        command: () => this.close()
                    },
                    {
                        label: 'Kiểm kê kho',
                        routerLink: '/quantri/quanlykhosanxuat/khobongphe/kiemkekho/0',
                        command: () => this.close()
                    },
                ]
            },
            // {
            //     label: 'Kiểm kê BCP',
            //     icon: 'fas fa-circle',
            //     routerLink: '/quantri/quanlykhosanxuat/kiemkeBCP/0',
            // },
            // {
            //     label: 'Báo cáo',
            //     icon: 'pi pi-chart-bar',
            //     routerLink: '/quantri/baocaosanxuat',
            //     expanded: false,
            //     items: [
            //         {
            //             label: 'Báo cáo sản lượng tổng hợp',
            //             routerLink: '/quantri/baocaosanxuat/sanluongtonghop',
            //             command: () => this.close()
            //         },
            //         {
            //             label: 'Báo cáo sản lượng chi tiết',
            //             routerLink: '/quantri/baocaosanxuat/sanluongchitiet',
            //             command: () => this.close()
            //         },
            //     ]
            // },
            {
                label: 'Danh mục dùng chung',
                routerLink: '/quantri/danhmuc',
                icon: 'pi pi-bars',
                expanded: false,
                visible: !this.checkmenu("P_DANHMUC"),
                items: [
                    {
                        label: 'Mặt hàng',
                        routerLink: '/quantri/danhmucsanxuat/dmmathang',
                        command: () => this.close()
                    },
                    {
                        label: 'Định mức chất lượng sợi',
                        routerLink: '/quantri/danhmucsanxuat/dmdinhmucchatluongsoi',
                        command: () => this.close()
                    },
                    {
                        label: 'Định mức tiêu hao',
                        routerLink: '/quantri/danhmucsanxuat/dmdinhmuctieuhao',
                        command: () => this.close()
                    },
                    {
                        label: 'Cấp bông',
                        routerLink: '/quantri/danhmucsanxuat/dmcapbong',
                        command: () => this.close()
                    },
                    {
                        label: 'Loại bông',
                        routerLink: '/quantri/danhmucsanxuat/dmloaibong',
                        command: () => this.close()
                    },
                    {
                        label: 'Loại sợi',
                        routerLink: '/quantri/danhmucsanxuat/dmloaisoi',
                        command: () => this.close()
                    },
                    {
                        label: 'Phân xưởng',
                        routerLink: '/quantri/danhmucsanxuat/dmphanxuong',
                        command: () => this.close()
                    },
                    {
                        label: 'Kho sản xuất',
                        routerLink: '/quantri/danhmucsanxuat/dmkho',
                        command: () => this.close()
                    },
                    {
                        label: 'Vị trí',
                        routerLink: '/quantri/danhmucsanxuat/dmvitri',
                        command: () => this.close()
                    },
                    {
                        label: 'Phân nhóm máy',
                        routerLink: '/quantri/danhmucsanxuat/dmphannhommay',
                        command: () => this.close()
                    },
                    {
                        label: 'Danh sách máy',
                        routerLink: '/quantri/danhmucsanxuat/dmdsmay',
                        command: () => this.close()
                    },
                    {
                        label: 'Ca sản xuất',
                        routerLink: '/quantri/danhmucsanxuat/dmcasanxuat',
                        command: () => this.close()
                    },
                    {
                        label: 'Nhóm kho',
                        routerLink: '/quantri/danhmucsanxuat/dmnhomkho',
                        command: () => this.close()
                    },
                    {
                        label: 'Loại điện áp',
                        routerLink: '/quantri/danhmucsanxuat/loaidienkv',
                        command: () => this.close()
                    },
                    {
                        label: 'Máy biến áp',
                        routerLink: '/quantri/danhmucsanxuat/dmmaybienap',
                        command: () => this.close()
                    },
                    {
                        label: 'Nhóm công tơ',
                        routerLink: '/quantri/danhmucsanxuat/dmnhomcongto',
                        command: () => this.close()
                    },
                    {
                        label: 'Công tơ',
                        routerLink: '/quantri/danhmucsanxuat/dmcongto',
                        command: () => this.close()
                    },
                    {
                        label: 'Tiêu chí chất lượng sợi',
                        routerLink: '/quantri/danhmucsanxuat/dmtieuchichatluongsoi',
                        command: () => this.close()
                    },
                    {
                        label: 'Quy cách đóng gói',
                        routerLink: '/quantri/danhmucsanxuat/dmquycachdonggoi',
                        command: () => this.close()
                    },
                    {
                        label: 'Đặc tính bông',
                        routerLink: '/quantri/danhmucsanxuat/dmdactinhbong',
                        command: () => this.close()
                    },
                    {
                        label: 'Phân quyền theo phân xưởng',
                        routerLink: '/quantri/phanquyensanxuat/phanquyentheophanxuong',
                        command: () => this.close()
                    },
                ]
            },
            // {
            //     label: 'Quản lý hệ thống',
            //     icon: 'pi pi-cog',
            //     items: [
            //         // {
            //         //     label: 'HDSD',
            //         //     routerLink: '/quantri/huongdansudung',
            //         //     command: () => this.close()
            //         // },
                    
            //     ]
            // },
            {
                label: 'HDSD',
                icon: 'pi pi-cog',
                routerLink: '/quantri/huongdansudung',
                // items: [
                //     {
                //         label: 'HDSD',
                //         routerLink: '/quantri/huongdansudung',
                //         command: () => this.close()
                //     },
                    
                // ]
            },
            // {
            //     label: 'Tài liệu tham khảo',
            //     icon: 'pi pi-copy',
            // }
        ];
        this.menu = this.menuQLTS;
    }

    checkmenu(maaction) {
        if (this.dataphanquyen == null) {
            return true;
        } else if (this.dataphanquyen[maaction] == undefined) {
            return true;
        } else if (this.dataphanquyen[maaction].length == 0) {
            return true;
        } else {
            for (var i = 0; i < this.dataphanquyen[maaction].length; i++) {
                if (this.dataphanquyen[maaction][i].MaRight == "XEM") {
                    if (this.dataphanquyen[maaction][i].GioiHan > 0) {
                        return false;
                    } else
                        return true;
                }
            }
        }
        // return false;
    }

    private subscribeToEvents(): void {
        // if connection exists it can call of method.  
        this._signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });
        this._signalRService.messageReceived.subscribe((message: any) => {
            this.refreshNotis()
        });
    }
}
