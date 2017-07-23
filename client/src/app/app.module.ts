import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ApplausePropertyComponent } from './components/property/property';
import { ApplauseService } from './services/ApplauseService';
import { UserSelectService } from './services/UserSelectService';

@NgModule({
  declarations: [
    AppComponent,
    ApplausePropertyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ApplauseService, UserSelectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
