import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserDetailComponent } from './user-detail.component';
import { User } from '../shared/user.model';
import { firstUserMock } from '../shared/user.mock';
import { UserService } from '../shared/user.service';

let component: UserDetailComponent;
let fixture: ComponentFixture<UserDetailComponent>;
let page: Page;

describe('UserDetailComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterModule],
      declarations: [UserDetailComponent],
      providers: [UserService,
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents()
    .then(createComponent)
  }));

  it('should call getUser on init', () => {
    expect(page.spyUserServiceGetUser).toHaveBeenCalled();
  });

});

/////////// Helpers /////
/** Create the UserDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(UserDetailComponent);
  component = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  navSpy: jasmine.Spy;
  spyUserServiceGetUser: jasmine.Spy;

  userFullnameDisplay: HTMLElement;
  inputUsername: HTMLInputElement;
  inputEmail: HTMLInputElement;

  constructor() {
    const router = TestBed.get(Router);
    const userService = fixture.debugElement.injector.get(UserService);
    this.spyUserServiceGetUser = spyOn(userService, 'getUser').and.returnValue(Observable.of(firstUserMock));
  }

  /** Add page elements after user arrives */
  addPageElements() {
    if (component.user) {
      this.inputUsername = fixture.debugElement.query(By.css('#user-username')).nativeElement;
      this.inputEmail = fixture.debugElement.query(By.css('#user-email')).nativeElement;
    }
  }
}
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

