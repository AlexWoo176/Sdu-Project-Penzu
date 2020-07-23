import {Diary} from './diary';
import {User} from './user';
import {Album} from './album';

export interface Comment {
  id?: string;
  content?: string;
  date?: string;
  edit?: string;
  idDiary?: string;
  diary?: Diary;
  user?: User;
  album?: Album;
  idAlbum?: string;
}
