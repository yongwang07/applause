package com.applause.db;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.applause.domain.Tester;

public class BugDB {
	private static final String fileName = "tester_device.csv";
	
	private static final String bugsFile = "bugs.csv";
	
	private BugDB(){}
	
	private static Map<Long, Map<String, Map<Long, Long>>> bugs = new HashMap<>();
	
	public static void init() {
		bugs.put(-1L, new HashMap<String, Map<Long, Long>>());
		DataParser.parse(fileName, info -> {
			long testerId = Long.parseLong(info[0]);
			String country = TesterDB.getTesterCountry(testerId);
			long deviceId = Long.parseLong(info[1]);
			Map<String, Map<Long, Long>> countryBugs = bugs.get(deviceId);
			if (countryBugs == null) {
				countryBugs = new HashMap<String, Map<Long, Long>>();
				bugs.put(deviceId, countryBugs);
			}
			
			createColumnSchema(deviceId, country, testerId);
				
			createColumnSchema(deviceId, "*", testerId);
			
			createColumnSchema(-1L, country, testerId);
			
			createColumnSchema(-1L, "*", testerId);			
		});
	}
	
	private static void createColumnSchema(long deviceId, String country, long testerId) {
		Map<Long, Long> cell = bugs.get(deviceId).get(country);
		if (cell == null) {
			cell = new HashMap<Long, Long>();
			bugs.get(deviceId).put(country, cell);
		}
		cell.put(testerId, 0L);
	}
		
	public static void populateBugData() {
		DataParser.parse(bugsFile, info -> {
			long testerId = Long.parseLong(info[2]);
			String country = TesterDB.getTesterCountry(testerId);
			long deviceId = Long.parseLong(info[1]);						
			
			reportBug(deviceId, country, testerId);
			
			reportBug(-1L, country, testerId);
			
			reportBug(deviceId, "*", testerId);
			
			reportBug(-1L, "*", testerId);
		});
	}
	
	private static void reportBug(long deviceId, String country, long testerId) {
		Map<Long, Long> cell = bugs.get(deviceId).get(country);
		cell.put(testerId, cell.get(testerId) + 1);
	}
	
	public static List<Tester> searchByCountryAndDevice(List<String> countries, List<Long> deviceIds) {
		Map<Long, Tester> testers = new HashMap<Long, Tester>();
	    deviceIds.forEach(deviceId -> {
	        countries.forEach(country -> {
	        	if (bugs.get(deviceId) != null) {
	        		Map<Long, Long> ts = bugs.get(deviceId).get(country);
	        		if (ts != null) {
	        			ts.entrySet().stream().forEach(entry -> {
	        				long id = entry.getKey();
			        		Tester tr = testers.get(id);
			        		if (tr == null) {
			        			tr = TesterDB.getTesterById(id).clone();
			        			testers.put(id, tr);
			        		}
	        				tr.addBugs(entry.getValue());
	        			});
	        		}
	        	}
	        });
	    });
	    
	    return testers
	    		.values()
	    		.stream()
	    		.sorted((a, b) -> b.getTotal() - a.getTotal())
	    		.collect(Collectors.toList());
	}
		
}