package lang.is_in;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

public class IsOneOf {
	
	private boolean is_one_of_v1(String s) {
		return ("01,02,03".indexOf(s) > -1);
	}
	
	private boolean is_one_of_v1a(String s) {
		return (s != null && "01,02,03".indexOf(s) > -1);
	}
	
	private boolean is_one_of_v2(String s) {
		return (s != null && ",01,02,03".indexOf(s) > 0);
	}
	
	private boolean is_one_of_v3(String s) {
		return (s != null && s.trim().length() > 0 && "01,02,03".indexOf(s.trim()) > -1);
	}
	
	private boolean is_one_of_v4(String s) {
		if (s != null) {
			s = s.trim();
			if (s.length() == 2) {
				for (String x : new String[] {"01","02","03"}) {
					if (s.equals(x)) return true;
				}
			}
		}
		return false;
	}
	
	private boolean is_one_of_v5(String s) {
		return Arrays.asList("01","02","03").contains(s);
	}
	
	private boolean is_one_of_v5a(String s) {
		return (s != null && Arrays.asList("01","02","03").contains(s.trim()));
	}
	
	public void work() {
		Map<String,Boolean> tests = new LinkedHashMap<String,Boolean>();
		tests.put("01", true);
		tests.put("05", false);
		tests.put("", false);
		tests.put("01 ", true);
		tests.put("1 ", false);
		
		for (String t : tests.keySet()) {
			if (is_one_of_v1(t) != tests.get(t)) {
				System.out.println("is_one_of_v1(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
		
		for (String t : tests.keySet()) {
			if (is_one_of_v1a(t) != tests.get(t)) {
				System.out.println("is_one_of_v1a(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
		
		for (String t : tests.keySet()) {
			if (is_one_of_v2(t) != tests.get(t)) {
				System.out.println("is_one_of_v2(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
		
		for (String t : tests.keySet()) {
			if (is_one_of_v3(t) != tests.get(t)) {
				System.out.println("is_one_of_v3(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
		
		for (String t : tests.keySet()) {
			if (is_one_of_v4(t) != tests.get(t)) {
				System.out.println("is_one_of_v4(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
		
		for (String t : tests.keySet()) {
			if (is_one_of_v5(t) != tests.get(t)) {
				System.out.println("is_one_of_v5(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
		
		for (String t : tests.keySet()) {
			if (is_one_of_v5a(t) != tests.get(t)) {
				System.out.println("is_one_of_v5a(); with \"" + t + "\" failed: " + tests.get(t) + " expected");
			}
		}
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new IsOneOf().work();
		System.out.println("------------");
	}
}
