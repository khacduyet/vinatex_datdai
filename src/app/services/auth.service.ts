import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API, httpOptions } from './host';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    loginurl = API.auth + 'QuanTri/Login_Winform';
    // loginurl = API.danhmuc + 'DangNhap';

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient,private router: Router,) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    public GetCurrentUser() {
        const url = API.auth + 'QuanTri/GetCurrentUser';
        this.http.get(url, httpOptions).subscribe(res => {
            this.currentUserSubject.next(res);
            return res;
        });
    }
    login(data) {
        return this.http.post(this.loginurl, data, httpOptions).pipe(map((user: any) => {
            if (user !== false) {
                if (user.Error === 4) {
                    // console.log(user);
                    // console.log(data);
                    if(data.RememberMe){
                        localStorage.setItem('loginData', JSON.stringify(data));
                    }
                    localStorage.setItem('currentUser', JSON.stringify(user.Value));
                    this.currentUserSubject.next(user.Value);
                }
            }
            return user;
        }));
    }
    public logout() {
        // this.services.LogOut().subscribe((res: any) => {
        // });
        (window as any).autoLogin = false;
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
        return true;
    }
}