package com.applause.db;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.applause.domain.Tester;

public class TesterDB {
	private static final String fileName = "testers.csv";
	
	private static Map<Long, Tester> testers = new HashMap<>();
		
	private TesterDB() {}
	
	public static String getTesterCountry(long id) {
		Tester tester = testers.get(id);
		return tester == null ? null : tester.getCountry();
	}
	
	public static Tester getTesterById(long id) {
		return testers.get(id);
	}
	
	public static List<String> getCountries() {
		return testers
				.values()
				.stream()
				.map(Tester::getCountry)
				.distinct()
				.collect(Collectors.toList());
	}
	
	public static void init() {
		DataParser.parse(fileName, info -> testers.put(Long.parseLong(info[0]), new Tester(info[1], info[2], info[3])));
	}	
}