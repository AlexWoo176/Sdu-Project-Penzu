import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Permissions} from './permissions';

@Injectable({
  providedIn: 'root'
})
export class NotActivateTeamGuard implements CanActivate {
  constructor(private permission: Permissions,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.permission.canActivate() === false) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }

  }

}
