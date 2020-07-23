import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Diary} from '../model/diary';
import {User} from '../model/user';
import {FileForm} from '../model/file-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sduUserUrl = environment.userUrl;
  private sduUserAvatarUrl = environment.UserAvatarUrl;

  constructor(private http: HttpClient) { }

  getDiaryByUser(userId: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.sduUserUrl + userId + '/diary' );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.sduUserUrl + userId);
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.sduUserUrl);
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(this.sduUserUrl + id);
  }

  uploadUserAvatar(file: FormData, userId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.sduUserAvatarUrl + userId, file, {headers});
  }

/*  searchUserByName(user: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>(this.svUserUrl + 'search-by-name' , user);
  }*/

}
