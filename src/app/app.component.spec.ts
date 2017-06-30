import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; // to access properties and methods
    debug = fixture.debugElement.query(By.css('.app'));
    element = debug.nativeElement; // to access DOM
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(component.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(element.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));

  it('should render <app-user-search/>', () => {
    expect(element.innerHTML).toContain('app-user-search');
  });

  describe('when user is selected', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
  })
});
