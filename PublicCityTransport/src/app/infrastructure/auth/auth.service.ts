import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from 'src/env/environment';
import { User, UserRole } from './model/user.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { Login } from './model/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerRegistration, EmployeeRegistration } from './model/registration.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>({email: "", id: 0, role: 0 });

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router) { }

    login(login: Login): Observable<AuthenticationResponse> {
      return this.http
        .post<AuthenticationResponse>(environment.apiHost + 'users/login', login)
        .pipe(
          tap((authenticationResponse) => {
            this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
            this.setUser();
          })
        );
    }

    registerCustomer(registration: CustomerRegistration): Observable<AuthenticationResponse> {
      return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/register-customer', registration)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
    }

    registerEmployee(registration: EmployeeRegistration): Observable<AuthenticationResponse> {
      return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/register-employee', registration)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
    }

    private setUser(): void {
      const jwtHelperService = new JwtHelperService();
      const accessToken = this.tokenStorage.getAccessToken() || "";
      const user: User = {
        id: +jwtHelperService.decodeToken(accessToken).id,
        email: jwtHelperService.decodeToken(accessToken).email,
        role: jwtHelperService.decodeToken(accessToken)[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
      };
      this.user$.next(user);
  }
}
