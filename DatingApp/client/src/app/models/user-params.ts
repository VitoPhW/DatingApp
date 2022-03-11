import { User } from './user';
import { Gender } from './Gender.enum';

export class UserParams {
  gender: Gender;
  minAge = 18;
  maxAge = 150;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';

  constructor({ gender }: User) {
    this.gender = gender === Gender.female ? Gender.male : Gender.female;
  }
}
