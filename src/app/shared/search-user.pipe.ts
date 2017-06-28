import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({ name: 'searchUsers' })
export class SearchUsersPipe implements PipeTransform {
  transform(users: User[], text: string): User[] {
    if (users.length && text) {
      return users.filter((user: User) => user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
    }
    return users;
  }
}
