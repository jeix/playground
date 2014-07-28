package collection;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListToArrayTester {
	
	private void test_List_toArray() {
		/*
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < 3; i++) {
			list.add(String.valueOf(i + 1));
		}
		//*/
		List<String> list = Arrays.asList("1", "2", "3");
		
		String[] a = {};
		//a = new String[0];
		//a = new String[list.size()];
		a = list.toArray(a);
		System.out.println(a.length);
		for (int i = 0; i < a.length; i++) {
			System.out.print(a[i]);
		}
		System.out.println();
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_List_toArray();
		test_nothing();
	}
	
	public static void main(String[] args) {
		ListToArrayTester worker = new ListToArrayTester();
		worker.test();
	}
}
