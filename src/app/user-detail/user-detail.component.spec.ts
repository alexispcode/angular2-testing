import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { RouterStub, ActivatedRouteStub } from '../shared/testing/router.stub';
import { firstUserMock } from '../shared/user.mock';

import { User } from '../shared/user.model';
import { UserDetailComponent } from './user-detail.component';
import { UserNotesComponent } from '../user-notes/user-notes.component';

import { UserService } from '../shared/user.service';

let activatedRoute: ActivatedRouteStub;
let component: UserDetailComponent;
let fixture: ComponentFixture<UserDetailComponent>;
let page: Page;

describe('UserDetailComponent', () => {

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, RouterModule],
      declarations: [UserDetailComponent, UserNotesComponent],
      providers: [
        UserService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  describe('when navigate to existing user', () => {
    beforeEach(async(() => {
      activatedRoute.testParamMap = { id: firstUserMock.id };
      createComponent();
    }));

    it('should display user name', () => {
      expect(page.userFullnameDisplay.textContent).toBe(firstUserMock.name);
    });

    it('should call getHero on init', () => {
      expect(page.spyUserServiceGetUser).toHaveBeenCalledTimes(1);
    });
  })
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

  formInputs: HTMLElement[];
  userFullnameDisplay: HTMLElement;
  inputUsername: HTMLInputElement;
  inputEmail: HTMLInputElement;

  constructor() {
    const router = TestBed.get(Router);
    const userService = fixture.debugElement.injector.get(UserService);
    this.spyUserServiceGetUser = spyOn(userService, 'getUser').and.returnValue(Observable.of(firstUserMock));
    this.navSpy = spyOn(router, 'navigate');
  }

  /** Add page elements after user arrives */
  addPageElements() {
    if (component.user) {
      // have user so these elements are in the DOM
      // this.formInputs = fixture.debugElement.queryAll(By.css('form input.editable')).map(e => e.nativeElement);
      this.userFullnameDisplay = fixture.debugElement.query(By.css('.user-fullname')).nativeElement;
      // this.inputUsername = fixture.debugElement.query(By.css('#user-username')).nativeElement;
      // this.inputEmail = fixture.debugElement.query(By.css('#user-email')).nativeElement;
    }
  }
}
