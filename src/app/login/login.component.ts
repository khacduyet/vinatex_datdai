import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Dat09Service } from '../services/callApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  images: any[] = [];
  account: any = {
    UserName: '',
    Password: '',
    RememberMe: true,
  };
  UserNameFG: string;
  timMKdialog: boolean = false;
  error: number;
  emes: any = '';
  loginState = true;
  seePass: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private _auth: AuthenticationService, private toastr: ToastrService, private _router: Router , private _services:Dat09Service) { }

  ngOnInit() {
    for (let i = 4; i <= 8; i++) {
      this.images.push(`assets/logo/${i}.png`)
    }
    this.autoLogin();
  }
  timMK() {
    this.timMKdialog = true;
    if (this.account.UserName !== undefined && this.account.UserName.trim() !== '') {
      this.UserNameFG = this.account.UserName;
    } else {
      this.UserNameFG = '';
    }
  }
  ForgotPass(){
    this._services.ForgotPass({UserName:this.UserNameFG}).subscribe((res:any)=>{
      if(res){
        if(res?.Error===4){
          this.toastr.success(res.Detail);
          this.UserNameFG = '';
          this.timMKdialog = false;
        }else{
          this.toastr.error(res.Detail);
        }
      }else{
        this.toastr.error('Có lỗi trong quá trình xử lý!');
      }
    })
  }
  validate() {
    if (this.account.UserName === undefined || this.account.UserName.trim() === '') {
      this.error = 1;
      this.emes = 'Vui lòng điền tên đăng nhập!';
      return false;
    } else if (this.account.Password === undefined || this.account.Password.trim() === '') {
      this.error = 2;
      this.emes = 'Vui lòng nhập mật khẩu!';
      return false;
    }
    // this.toastr.error(this.emes);
    return true;
  }
  async autoLogin() {
    let loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (loginData !== null) {
      this.account = loginData;
      if ((window as any).autoLogin === (undefined) || (window as any).autoLogin == true) {
        this.login();
      }
    }
  }
  login() {
    if (this.validate()) {
      this._auth.login(this.account).subscribe((res: any) => {
        if (res) {
          if (res.Error === 4) {
            (window as any).autoLogin = true;
            this.loginState = true;
            this.error = 0;
            this.toastr.success('Đăng nhập thành công!');
            if ((window as any).routeSnapShot !== undefined) {
              this._router.navigate([(window as any).routeSnapShot])
            } else {
              this._router.navigate(['/quantri'])
            }
          } else {
            this.loginState = false;
            this.error = 0;
            this.toastr.error('Đăng nhập thất bại!');
          }
        } else {
          this.loginState = false;
          this.error = 0;
          this.toastr.error('Đăng nhập thất bại!');
        }
      });
    } else {
      this.toastr.error(this.emes);
    }
  }
  revealPass() {
    this.seePass = !this.seePass;
  }
}
