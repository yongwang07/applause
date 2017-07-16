package com.applause.db;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.applause.domain.DeviceCountry.Device;

public class DeviceDB {	
	private static final String fileName = "devices.csv";

	private DeviceDB() {}
	
	private static Map<Long, String> devices = new HashMap<>();
	
	public static List<Device> getDevices() {
		return devices
				.entrySet()
				.stream()
				.map(entry -> new Device(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
	}
	
	public static void init() {
		DataParser.parse(fileName, info -> devices.put(Long.parseLong(info[0]), info[1]));
	}
}