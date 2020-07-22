import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {AuthLoginInfo} from './auth-login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpInfo} from './sign-up-info';
import {UserForm} from './profile/user-form';
import {PassForm} from './profile/pass-form';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sduLoginUrl = environment.loginUrl;
  private sduSignUpUrl = environment.signupUrl;
  private sduUpdateProfileUrl = environment.updateProfileUrl;
  private sduUpdatePasswordUrl = environment.updatePasswordUrl;

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.sduLoginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.sduSignUpUrl, info, httpOptions);
  }

  updateUser(userForm: UserForm): Observable<string> {
    return this.http.put<string>(this.sduUpdateProfileUrl + '/' + userForm.id, userForm);
  }

  updatePassword(passForm: PassForm): Observable<string> {
    return this.http.put<string>(this.sduUpdatePasswordUrl + '/' + passForm.id, passForm);
  }
}
