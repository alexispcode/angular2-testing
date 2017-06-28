import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserService } from './shared/user.service';
import { UserItemComponent } from './user-item/user-item.component';
import { SearchUsersPipe } from './shared/search-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserItemComponent,
    SearchUsersPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
