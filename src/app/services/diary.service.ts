import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Pagination} from '../model/pagination';
import {Diary} from '../model/diary';
import {FileForm} from '../model/file-form';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) {
  }

  private sduDiaryUrl = environment.diaryUrl;
  private sduUploadFile = environment.diaryUploadFileUrl;

  getListDiaryAndPaginationASC(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.sduDiaryUrl + 'pagination/ASC?page=' + page);
  }

  getListDiaryAndPaginationDESC(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.sduDiaryUrl + 'pagination/DESC?page=' + page);
  }

  getListDiary(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.sduDiaryUrl);
  }

  createDiary(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>(this.sduDiaryUrl, diary);
  }

  uploadFile(file: FormData, diaryId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.sduUploadFile + diaryId, file, {headers});
  }

  findDiaryById(id: string): Observable<Diary> {
    return this.http.get<Diary>(this.sduDiaryUrl + id);
  }

  deleteDiaryById(id: string): Observable<void> {
    return this.http.delete<void>(this.sduDiaryUrl + id);
  }

  updateDiary(diary: Diary): Observable<Diary> {
    return this.http.put<Diary>(this.sduDiaryUrl + diary.id, diary);
  }

}
