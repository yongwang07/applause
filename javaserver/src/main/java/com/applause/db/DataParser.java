package com.applause.db;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.function.Consumer;


public class DataParser {
	public static void parse(String filePath, Consumer<String[]> consumer) {
		InputStream is = DataParser.class
				.getClassLoader()
				.getResourceAsStream(filePath);
		new BufferedReader(new InputStreamReader(is))
		.lines()
		.skip(1)
		.map(line -> line.replace("\"", "").split(","))
		.forEach(consumer::accept);
	}
}