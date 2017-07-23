import { Injectable } from '@angular/core';

@Injectable()
export class UserSelectService {
    public selectedCountries: string[] = [];
    public selectedDevices: string[] = [];

    addCriteria(type: string, criteria: string) {
        ((selecteds: string[]) => {
            if (criteria === 'All' || selecteds.indexOf('All') >= 0) {
                selecteds.length = 0;
                selecteds.push(criteria);
            } else if (selecteds.indexOf(criteria) < 0) {
                selecteds.push(criteria);
            }
        })(type === 'countries' ? this.selectedCountries : this.selectedDevices);
    }

    removeCriteria(type: string, criteria: string) {
        ((selecteds: string[]) => {
            const index = selecteds.findIndex(c => c === criteria);
            selecteds.splice(index, 1);
        })(type === 'countries' ? this.selectedCountries : this.selectedDevices);
    }

    isSearchable() {
        return this.selectedCountries.length === 0 || this.selectedDevices.length === 0;
    }

    searchUrl(): String {
        return this.selectedCountries.map(country => `country=${country}`).join('&') + '&' +
            this.selectedDevices.map(deviceId => `deviceId=${deviceId}`).join('&');
    }

}
