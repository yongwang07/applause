export class Device {
    id: number;
    name: String;
}

export class Country {
    name: String;
}

export class DeviceCountry {
    countries: Country[];
    devices: Device[];
}

export class Tester {
    name: String;
    country: String;
    total: number;
}
