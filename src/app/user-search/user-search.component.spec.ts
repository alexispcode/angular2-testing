import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserSearchComponent } from './user-search.component';
import { UserService } from '../shared/user.service';
import { SearchUsersPipe } from '../shared/search-user.pipe';
import { User } from '../shared/user.model';
import { usersMock } from '../shared/user.mock';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture < UserSearchComponent > ;
  let debug: DebugElement;
  let element: HTMLElement;
  let userService: UserService;
  let spyGetUsers: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [UserService],
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

    debug = fixture.debugElement.query(By.css('.user-search'));
    element = debug.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /* Input */
  describe('Input test' , () => {
    let inputEl: DebugElement;

    beforeEach(() => {
      inputEl = fixture.debugElement.query(By.css('#search-box'));
    });

    it('should change search text when typing', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      expect(component.searchText).toBeUndefined();

      inputEl.nativeElement.value = usersMock[0].name;
      inputEl.triggerEventHandler('keyup', null);
      tick();

      expect(component.searchText).toBe(usersMock[0].name);
    }));

  });

  /** List */
  it('should call getUsers and set users to the returned object', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges(); // updates the view
      expect(spyGetUsers).toHaveBeenCalledTimes(1);
      expect(component.users).toBe(usersMock);
    });
  }));

  it('should render a list of users', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges(); // updates the view
      const userItems = fixture.debugElement.queryAll(By.css('app-user-item'));
      expect(userItems.length).toBe(usersMock.length);
    });
  }));

});
