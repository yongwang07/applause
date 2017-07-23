import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tester } from './model';
import { ApplauseService } from './services/ApplauseService';
import { UserSelectService } from './services/UserSelectService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'applause';
  testers: Observable<Tester[]>;
  constructor(private applauseService: ApplauseService, public userSelectService: UserSelectService) { }
  search() {
    this.testers = this.applauseService.search();
  }
}
