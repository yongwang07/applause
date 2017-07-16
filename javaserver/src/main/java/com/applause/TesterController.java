package com.applause;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.applause.db.BugDB;
import com.applause.db.DeviceDB;
import com.applause.db.TesterDB;
import com.applause.domain.DeviceCountry;
import com.applause.domain.Tester;

@Path("/")
public class TesterController {

    public TesterController() {}

    @GET
    @Path("info")
    @Produces(MediaType.APPLICATION_JSON)
    public DeviceCountry get() {
    	DeviceCountry ret = new DeviceCountry();
    	ret.setCountries(TesterDB.getCountries());
    	ret.setDevice(DeviceDB.getDevices());
    	return ret;
    }

    @GET
    @Path("search")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tester> search(@QueryParam("country") List<String> country,
    		@QueryParam("deviceId") final List<String> deviceId) {
    	if (country.indexOf("All") >= 0) country = Arrays.asList("*");
    	List<Long> deviceIds;
    	if (deviceId.indexOf("All") >= 0) {
    		deviceIds = Arrays.asList(-1L);
    	} else {    		
    		deviceIds = deviceId
    					.stream()
    					.filter(id -> id.matches("\\d+"))
    					.map(Long::parseLong)
    					.collect(Collectors.toList());
    	}
    	return BugDB.searchByCountryAndDevice(country, deviceIds);   	
    }
}