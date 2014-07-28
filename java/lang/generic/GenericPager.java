package lang.generic;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class GenericPager {
	
	static class Page<T> {
		private List<T> list;
		
		public int size() {
			return (list != null ? list.size() : 0);
		}
		
		public T get(int i) {
			return (list != null && size() > i && i >= 0 ? list.get(i) : null);
		}
		
		public void add(T item) {
			if (list == null) list = new ArrayList<T>();
			list.add(item);
		}
	}
	
	static class Fetcher<T> {
		private Mapper<T> mapper;
		
		public Fetcher(Mapper<T> mapper) {
			this.mapper = mapper;
		}
		
		public Page<T> fetch(int n) {
			Page<T> page = new Page<T>();
			for (int i = 0; i < 3; i++) {
				String row = String.valueOf(i+1);
				page.add(mapper.map(row));
			}
			return page;
		}
	}
	
	static interface Mapper<T> {
		public T map(String row);
	}
	
	public void work() {
		Page<String> page = new Fetcher<String>(new Mapper<String>() {
			public String map(String row) {
				return row;
			}
		}).fetch(1);
		for (int i = 0; i < page.size(); i++) {
			String s = page.get(i);
			System.out.println(s);
		}
		Page<Date> page2 = new Fetcher<Date>(new Mapper<Date>() {
			public Date map(String row) {
				return Date.valueOf("2013-08-2" + row);
			}
		}).fetch(1);
		for (int i = 0; i < page2.size(); i++) {
			Date d = page2.get(i);
			System.out.println(d);
		}
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new GenericPager().work();
		System.out.println("------------");
	}
}
