import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'applause';
  countries: [string];
  devices: [{id: string, name: string}];
  testers: [{country: string, name: string, total: number}];
  deviceMap: {};
  selectedCountries: string[] = [];
  selectedDevices: string[] = [];
  constructor(private http: Http) {}
  ngOnInit() {
    this.http.get('http://localhost:10010/info').subscribe(
      response => {
        const infos = response.json();
        this.countries = infos.countries;
        this.devices = infos.devices;
        this.deviceMap = this.devices.reduce((acc, device) => {
          acc[device.id] = device.name;
          return acc;
        }, {});
      });
  }
  addCriteria(type: string, criteria: string) {
    (function(selecteds: string[]) {
      if (criteria === 'All' || selecteds.indexOf('All') >= 0) {
        selecteds.length = 0;
        selecteds.push(criteria);
      } else if (selecteds.indexOf(criteria) < 0) {
        selecteds.push(criteria);
      }
    })(type === 'country' ? this.selectedCountries : this.selectedDevices);
    return false;
  }
  removeCriteria(type: string, criteria: string) {
    (function(selecteds: string[]) {
      const index = selecteds.findIndex(c => c === criteria);
      selecteds.splice(index, 1);
    })(type === 'country' ? this.selectedCountries : this.selectedDevices);
    return false;
  }
  search() {
    const params = 'http://localhost:10010/search?' +
        this.selectedCountries.map(country => `country=${country}`).join('&') + '&' +
        this.selectedDevices.map(deviceId => `deviceId=${deviceId}`).join('&');
    this.http.get(params).subscribe(response => this.testers = response.json());
    return false;
  }
}
