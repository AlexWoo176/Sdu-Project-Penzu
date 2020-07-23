import {User} from './user';
import {Tag} from './tag';

export interface Album {
  id?: string;
  title?: string;
  description?: string;
  avatar?: string;
  date?: string;
  tag?: Tag;
  user?: User;
}
