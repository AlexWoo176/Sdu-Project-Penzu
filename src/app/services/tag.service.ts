import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Tag} from '../model/tag';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private sduTagUrl = environment.tagUrl;

  constructor(private http: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.sduTagUrl);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.sduTagUrl , tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.sduTagUrl + tag.id , tag);
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(this.sduTagUrl + id);
  }

  searchTagByName(tag: Tag): Observable<Tag[]> {
    return this.http.post<Tag[]>(this.sduTagUrl + 'search-by-name', tag);
  }
}
