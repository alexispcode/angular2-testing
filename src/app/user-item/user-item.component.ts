import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.less']
})
export class UserItemComponent {
  @Input() user: User;
  @Output() selected = new EventEmitter<User>();
  @Output() deleted = new EventEmitter<User>();

  constructor() { }

  handleSelected() {
    this.selected.emit(this.user);
  }

  handleDeleted() {
    this.deleted.emit(this.user);
  }
}
