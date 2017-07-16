package com.applause.domain;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Tester {
	private String name;
	private String country;
	private int total;
	
	public Tester(String firstName, String lastName, String country) {
		this.name = String.format("%s %s", firstName, lastName);
		this.country = country;
	}
	
	public Tester(String name, String country) {
		this.name = name;
		this.country = country;
	}
	
	public void addBugs(long bugs) {
		total += bugs;
	}
	
	public int getTotal() {
		return total;
	}
	
	public Tester clone(){  
		return new Tester(name, country);
	}  
			
	public String getName() {
		return name;
	}
	
	public String getCountry() {
		return country;
	}
	
}
