package collection;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

public class QueueDemo {
	
	private void demo_Queue() {
		Queue<String> q = new LinkedList<String>();
		q.add("qaz");
		q.add("wsx");
		q.add("edc");
		while (q.size() > 0) {
			System.out.println(q.poll());
		}
	}
	
	private void demo_PriorityQueue() {
		Queue<String> q = new PriorityQueue<String>(11, new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				System.out.println(o1 + "::" + o2);
				return Integer.valueOf(o1).compareTo(Integer.valueOf(o2));
			}
		});
		q = new PriorityQueue<String>(11, new XComparator());
		q.add("384");
		for (String s : q) {
			System.out.println(s);	// 384
		}
		System.out.println("----");	// ----
		q.add("157");				// 157::384
		for (String s : q) {
			System.out.println(s);	// 157 384
		}
		System.out.println("----");	// ----
		q.add("548");				// 548::157
		for (String s : q) {
			System.out.println(s);	// 157 384 548
		}
		System.out.println("----");	// ----
		q.add("436");				// 436::384
		for (String s : q) {
			System.out.println(s);	// 157 384 548 436
		}
		System.out.println("----");	// ----
		q.add("217");				// 217::384
									// 217::157
		for (String s : q) {
			System.out.println(s);	// 157 217 548 436 384
		}
		while (q.size() > 0) {
			System.out.println("----");
			System.out.println(q.poll());
		}
			// ----
			// 217::548
			// 384::217
			// 384::436
			// 157
			// ----
			// 384::548
			// 436::384
			// 217
			// ----
			// 548::436
			// 384
			// ----
			// 436
			// ----
			// 548
	}
	
	@SuppressWarnings("rawtypes")
	static class XComparator implements Comparator {
		@Override
		public int compare(Object o1, Object o2) {
			System.out.println(o1 + "::" + o2);
			return Integer.valueOf((String) o1).compareTo(Integer.valueOf((String) o2));
		}
	}
	
	public void work() {
		demo_Queue();
		System.out.println("--------");
		demo_PriorityQueue();
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new QueueDemo().work();
		System.out.println("------------");
	}
}
