import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DeviceCountry, Tester } from '../model';
import { UserSelectService } from './UserSelectService';
import { environment } from '../../environments/environment';


@Injectable()
export class ApplauseService {
  constructor(private http: Http, private userSelectService: UserSelectService) {}
  getDeviceAndCountry(): Observable<DeviceCountry> {
      return this.http.get(environment.info).map(response => response.json());
  }

  search(): Observable<Tester[]> {
      return this.http
            .get(`${environment.search}?${this.userSelectService.searchUrl()}`)
            .map(response => response.json());
  }
}
