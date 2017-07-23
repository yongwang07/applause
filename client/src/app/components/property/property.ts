import { Component, OnInit, Input } from '@angular/core';
import { ApplauseService } from '../../services/ApplauseService';
import { DeviceCountry, Country, Device } from '../../model';
import { UserSelectService } from '../../services/UserSelectService';

@Component({
  selector: 'app-property',
  templateUrl: './property.html'
})

export class ApplausePropertyComponent implements OnInit {
  @Input() type: String;
  properties: Country[]|Device[];
  selectProperties: String[];
  constructor(private applauseService: ApplauseService,
    public userSelectService: UserSelectService ) {}
  ngOnInit() {
    this.applauseService
        .getDeviceAndCountry()
        .map((deviceCountry: DeviceCountry) => deviceCountry[this.type.toString()])
        .subscribe(properties => this.properties = properties);
    const selected = this.type === 'countries' ? 'selectedCountries' : 'selectedDevices';
    this.selectProperties = this.userSelectService[selected];
  }
  name(id: String): String {
    if (this.type === 'devices' && id !== 'All') {
      const device = (<Device[]>this.properties).find(prop => prop.id.toString() === id);
      return device && device.name;
    }
    return id;
  }
}
