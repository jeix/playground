package lang.for_each.v2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ForEachDemo {
	
	private void test_for_each() {
		final List<String> xlist = new ArrayList<String>();
		xlist.add("foo");
		xlist.add("bar");
		xlist.add("baz");
		
		new Array<String>(xlist).for_each(new Array.Iterator<String>() {
			public void apply(String param, int index, Object... vals) {
				xlist.set(index, param.toUpperCase());
			}
		});
		
		System.out.println(xlist); // -> [FOO, BAR, BAZ]
	}
	
	private void test_every() {
		List<Integer> numbers = Arrays.asList(0, 1, 2, 3);
		boolean result = new Array<Integer>(numbers).every(new Array.Filter<Integer>() {
			public boolean apply(Integer param, Object... vals) {
				return param % 2 == 0;
			}
		});
		System.out.println("every [0..3] is " + (result ? "" : "not ") + "even"); // -> false
		
		result = new Array<Integer>(numbers).every(new Array.Filter<Integer>() {
			public boolean apply(Integer param, Object... vals) {
				return param < 5;
			}
		});
		System.out.println("every [0..3] " + (result ? "" : "not ") + "less than 5"); // -> true
	}
	
	private void test_some() {
		List<Integer> numbers = Arrays.asList(0, 1, 2, 3);
		boolean result = new Array<Integer>(numbers).some(new Array.Filter<Integer>() {
			public boolean apply(Integer param, Object... vals) {
				return param % 2 == 1;
			}
		});
		System.out.println("some [0..3] is " + (result ? "" : "not ") + "odd"); // -> true
		
		result = new Array<Integer>(numbers).some(new Array.Filter<Integer>() {
			public boolean apply(Integer param, Object... vals) {
				return param > 5;
			}
		});
		System.out.println("some [0..3] " + (result ? "" : "not ") + "greater than 5"); // -> false
	}
	
	private void test_filter() {
		List<String> xlist = new ArrayList<String>();
		xlist.add("foo");
		xlist.add("bar");
		xlist.add("baz");
		
		List<String> filtered = new Array<String>(xlist).filter(new Array.Filter<String>() {
			public boolean apply(String param, Object... vals) {
				return similiar((String) vals[0], param);
			}
			
			private boolean similiar(String base, String s) {
				return base.equals(s.substring(0, base.length()));
			}
		}, "ba");
		
		System.out.println(filtered); // -> [bar, baz]
	}
	
	private void test_map() {
		List<String> xlist = new ArrayList<String>();
		xlist.add("foo");
		xlist.add("bar");
		xlist.add("baz");
		
		List<Object> ylist = new Array<String>(xlist).map(new Array.Mapper<String>() {
			public String apply(String param, Object... vals) {
				return capitalize(param);
			}
			
			private String capitalize(String s) {
				return s.substring(0, 1).toUpperCase() + s.substring(1);
			}
		});
		
		System.out.println(ylist); // -> [Foo, Bar, Baz]
	}
	
	private void test_reduce() {
		List<Integer> numbers = Arrays.asList(0, 1, 2, 3);
		
		int sum = new Array<Integer>(numbers).reduce(new Array.Reducer<Integer>() {
			public Integer apply(Integer sum, Integer number, Object... vals) {
				return sum + number;
			}
		}, 0);
		
		System.out.println(sum); // -> 6
	}
	
	private void test_reduce_2() {
		List<List<Integer>> numbers = new ArrayList<List<Integer>>();
		numbers.add(Arrays.asList(0, 1));
		numbers.add(Arrays.asList(2, 3));
		numbers.add(Arrays.asList(4, 5));
		
		List<Integer> result = new ArrayList<Integer>();
		
		result = new Array<List<Integer>>(numbers).reduce(new Array.Reducer<List<Integer>>() {
			public List<Integer> apply(List<Integer> dst, List<Integer> src, Object... vals) {
				dst.addAll(src);
				return dst;
			}
		}, result);
		
		System.out.println(result); // -> [0, 1, 2, 3, 4, 5]
		
		int sum = new Array<Integer>(result).reduce(new Array.Reducer<Integer>() {
			public Integer apply(Integer sum, Integer number, Object... vals) {
				return number - sum;
			}
		}, 0);
		
		System.out.println(sum); // -> 3
	}
	
	private void test_reduce_right() {
		List<Integer> numbers = Arrays.asList(0, 1, 2, 3);
		
		int sum = new Array<Integer>(numbers).reduce_right(new Array.Reducer<Integer>() {
			public Integer apply(Integer sum, Integer number, Object... vals) {
				return sum + number;
			}
		}, 0);
		
		System.out.println(sum); // -> 6
	}
	
	private void test_reduce_right_2() {
		List<List<Integer>> numbers = new ArrayList<List<Integer>>();
		numbers.add(Arrays.asList(0, 1));
		numbers.add(Arrays.asList(2, 3));
		numbers.add(Arrays.asList(4, 5));
		
		List<Integer> result = new ArrayList<Integer>();
		
		result = new Array<List<Integer>>(numbers).reduce_right(new Array.Reducer<List<Integer>>() {
			public List<Integer> apply(List<Integer> dst, List<Integer> src, Object... vals) {
				dst.addAll(src);
				return dst;
			}
		}, result);
		
		System.out.println(result); // -> [4, 5, 2, 3, 0, 1]
		
		int sum = new Array<Integer>(result).reduce_right(new Array.Reducer<Integer>() {
			public Integer apply(Integer sum, Integer number, Object... vals) {
				return number - sum;
			}
		}, 0);
		
		System.out.println(sum); // -> -3
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_for_each();
		test_every();
		test_some();
		test_filter();
		test_map();
		test_reduce();
		test_reduce_2();
		test_reduce_right();
		test_reduce_right_2();
		test_nothing();
	}
	
	public static void main(String[] args) {
		ForEachDemo worker = new ForEachDemo();
		worker.test();
	}
}