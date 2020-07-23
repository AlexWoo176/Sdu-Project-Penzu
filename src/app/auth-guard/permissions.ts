import {Injectable} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable()
export class Permissions {
  constructor(private token: TokenStorageService) {
  }

  canActivate(): boolean {
    return this.token.getToken() ? true : false;
  }

  isAdmin(): boolean {
    return this.token.getAuthorities()[0] === 'ROLE_ADMIN' ? true : false;
  }

}
