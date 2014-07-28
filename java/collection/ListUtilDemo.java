package collection;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class ListUtilDemo {
	
	static class Tomato implements Comparable<Tomato> {
		
		public Tomato(String name) {
			this.name = name;
		}
		
		protected String name;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		
		public String toString() {
			if (name == null)
				return "{" + name + "}";
			else
				return "{\"" + name + "\"}";
		}
		
		public boolean equals(Object obj) {
			if (obj == null) return false;
			if (!(obj instanceof Tomato)) return false;
			Tomato t = (Tomato) obj;
			return name.equals(t.name);
		}
		
		public int hashCode() {
			int hash_code = 17;
			return 31 * hash_code + name.hashCode();
		}
		
		public int compareTo(Tomato t) {
			if (t == null) return 1;
			if (this == t) return 0;
			String t_name = t.getName();
			if (name == null) {
				if (t_name == null) return 0;
				return -1;
			}
			if (t_name == null) return 1;
			return name.compareTo(t_name);
		}
	}
	
	static class Sorter<T> {
		public List<T> sort(List<T> list) {
			Object[] array = list.toArray();
			Arrays.sort(array);
			/*
			List<T> res = new ArrayList<T>();
			for (Object item : array) {
				res.add((T) item); // warning: [unchecked] unchecked cast
			}
			return res;
			//*/
			return (List<T>) Arrays.asList(array); // warning: [unchecked] unchecked cast
		}
		
		public String concat(List<T> list, String delimiter) {
			StringBuffer sb = new StringBuffer();
			for (T item : list) {
				sb.append(delimiter).append(item);
			}
			return sb.substring(delimiter.length());
		}
		
		public List<T> unique(List<T> list) {
			Set<T> set = new LinkedHashSet<T>(list);
			return new ArrayList<T>(set);
		}
	}
	
	public void work() {
		List<Tomato> list = Arrays.asList(new Tomato("고라니"), new Tomato("고사리"), new Tomato("고구마"), new Tomato("고라니"), new Tomato("고드름"));
		System.out.println(new Sorter<Tomato>().concat(list, "+"));
			// ==> {"고라니"}+{"고사리"}+{"고구마"}+{"고라니"}+{"고드름"}
		list = new Sorter<Tomato>().unique(list);
		System.out.println(new Sorter<Tomato>().concat(list, "+"));
			// ==> {"고라니"}+{"고사리"}+{"고구마"}+{"고드름"}
		list = new Sorter<Tomato>().sort(list);
		System.out.println(new Sorter<Tomato>().concat(list, "+"));
			// ==> {"고구마"}+{"고드름"}+{"고라니"}+{"고사리"}
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new ListUtilDemo().work();
		System.out.println("------------");
	}
}
