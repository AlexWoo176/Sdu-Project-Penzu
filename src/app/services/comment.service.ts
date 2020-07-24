import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../model/comment';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private sduCommentUrl = environment.commentUrl;

  constructor(private http: HttpClient) { }

  getAllCommentByDiaryId(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.sduCommentUrl + 'diary/' + id);
  }

  getAllCommentByAlbumId(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.sduCommentUrl + 'album/' + id);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.sduCommentUrl , comment);
  }

  editComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.sduCommentUrl + comment.id , comment);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(this.sduCommentUrl +  id);
  }
}
