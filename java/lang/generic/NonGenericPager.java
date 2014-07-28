package lang.generic;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class NonGenericPager {
	
	static class Page {
		private List<Object> list;
		
		public int size() {
			return (list != null ? list.size() : 0);
		}
		
		public Object get(int i) {
			return (list != null && size() > i && i >= 0 ? list.get(i) : null);
		}
		
		public void add(Object item) {
			if (list == null) list = new ArrayList<Object>();
			list.add(item);
		}
	}
	
	static class Fetcher {
		private Mapper mapper;
		
		public Fetcher(Mapper mapper) {
			this.mapper = mapper;
		}
		
		public Page fetch(int n) {
			Page page = new Page();
			for (int i = 0; i < 3; i++) {
				String row = String.valueOf(i+1);
				page.add(mapper.map(row));
			}
			return page;
		}
	}
	
	static interface Mapper {
		public Object map(String row);
	}
	
	public void work() {
		Page page = new Fetcher(new Mapper() {
			public Object map(String row) {
				return row;
			}
		}).fetch(1);
		for (int i = 0; i < page.size(); i++) {
			String s = (String) page.get(i);
			System.out.println(s);
		}
		Page page2 = new Fetcher(new Mapper() {
			public Object map(String row) {
				return Date.valueOf("2013-08-2" + row);
			}
		}).fetch(1);
		for (int i = 0; i < page2.size(); i++) {
			Date d = (Date) page2.get(i);
			System.out.println(d);
		}
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new NonGenericPager().work();
		System.out.println("------------");
	}
}
