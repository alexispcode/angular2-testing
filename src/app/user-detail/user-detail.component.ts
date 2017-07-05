import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import 'rxjs/add/operator/map';

import {
  User
} from '../shared/user.model';
import {
  UserService
} from '../shared/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  private userBackup: User;
  private isEditing = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => this.getUser(param.has('id') && param.get('id')));
  }

  private getUser(id: string): void {

    this.userService.getUser(id).subscribe(user => {
      if (user) {
        this.userBackup = Object.assign({}, user);
        this.user = user;
      } else {
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  toogleEditingMode() {
    this.isEditing = !this.isEditing;
  }

  discard(): void {
    this.user = Object.assign({}, this.userBackup);
    this.isEditing = false;
  }
}
