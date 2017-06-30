import { async, inject, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserSearchComponent } from './user-search.component';
import { UserService } from '../shared/user.service';
import { SearchUsersPipe } from '../shared/search-user.pipe';
import { User } from '../shared/user.model';
import { usersMock, firstUserMock } from '../shared/user.mock';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let debug: DebugElement;
  let element: HTMLElement;
  let userService: UserService;
  let spyGetUsers: jasmine.Spy;
  let spyDeleteUser: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UserService, { provide: Router, useClass: RouterStub }],
      declarations: [UserSearchComponent, SearchUsersPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;

    userService = fixture.debugElement.injector.get(UserService);
    spyGetUsers = spyOn(userService, 'getUsers').and.returnValue(Observable.of(usersMock));
    spyDeleteUser = spyOn(userService, 'editUser').and.returnValue(Observable.of(firstUserMock));

    debug = fixture.debugElement.query(By.css('.user-search'));
    element = debug.nativeElement;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('after get users', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => fixture.detectChanges())
    }));

    it('should change search text when typing', fakeAsync(() => {
      const inputEl = fixture.debugElement.query(By.css('#search-box'));
      inputEl.nativeElement.value = firstUserMock.name;
      inputEl.triggerEventHandler('keyup', null);
      tick();

      expect(component.searchText).toEqual(firstUserMock.name);
    }));

    it('should call getUsers and set users to the returned object', () => {
      expect(spyGetUsers).toHaveBeenCalledTimes(1);
    });

    it('should render a list of users', () => {
      const userItems = fixture.debugElement.queryAll(By.css('app-user-item'));
      expect(userItems.length).toBe(usersMock.length);
    });

    it('should go to detail page',
      inject([Router], (router: Router) => {

        const spyNav = spyOn(router, 'navigateByUrl');

        const firstChildren = fixture.debugElement.queryAll(By.css('app-user-item'))[0];
        firstChildren.triggerEventHandler('selected', firstUserMock);

        const navArgs = spyNav.calls.first().args[0];

        const { id } = firstUserMock;
        expect(navArgs).toBe(id.toString(), 'should go to UserDetail for first user');
      }));
  });
});
