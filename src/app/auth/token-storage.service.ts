import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'AuthUserId';
const NAME_KEY = 'Name';
const EMAIL_KEY = 'Email';
const AVATAR_KEY = 'Avatar';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
