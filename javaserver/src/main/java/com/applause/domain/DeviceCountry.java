package com.applause.domain;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class DeviceCountry {

	public static class Device {
		long id;
		String name;
		
		public Device(long id, String name) {
			this.id = id;
			this.name = name;
		}
		
		public long getId() {
			return id;
		}
		
		public String getName() {
			return name;
		}
	}
	
	private List<String> countries;
	
	private List<Device> devices;

	public DeviceCountry() {}
	
	public void setDevice(List<Device> devices) {
		this.devices = devices;
	}
	
	public void setCountries(List<String> countries) {
		this.countries = countries;
	}

    @XmlAttribute(name = "devices")
	public List<Device> getDevices() {
		return devices;
	}

    @XmlAttribute(name = "countries")
	public List<String> getCountries() {
		return countries;
	}

}