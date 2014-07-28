package collection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderedKeyValPairsDemo {
	
	class OrderedKeyValPairs<K,V> {
		
		private List<K> keys;
		private Map<K,V> vals;
		
		public OrderedKeyValPairs() {
			keys = new ArrayList<K>();
			vals = new HashMap<K,V>();
		}
		
		public void add(K k, V v) {
			if (k != null) {
				if (! contains(k)) { // avoid key duplication
					keys.add(k);
				}
				vals.put(k, v);
			}
		}
		public V remove(K k) {
			if (k != null && contains(k)) {
				keys.remove(keys.indexOf(k));
				return vals.remove(k);
			}
			return null;
		}
		public boolean contains(K k) {
			return keys.contains(k);
		}
		public void clear() {
			keys.clear();
			vals.clear();
		}
		public V get(K k) {
			return vals.get(k);
		}
		public List<K> keys() {
			return keys;
		}
		public List<V> values() {
			List<V> vs = new ArrayList<V>();
			for (K k : keys) {
				vs.add(get(k));
			}
			return vs;
		}
		public int size() {
			return keys.size();
		}
		
		public String toString() {
			StringBuffer sb = new StringBuffer();
			sb.append("[");
			int i = 0;
			for (K k : keys) {
				if (i++ > 0) sb.append(",");
				sb.append("{'" + k + "':" + get(k) + "}");
			}
			// for (V v : values()) {
			// 	if (i++ > 0) sb.append(",");
			// 	sb.append(v);
			// }
			sb.append("]");
			return sb.toString();
		}
	}
	
	class Code {
		
		private final String k;
		private final String v;
		
		public Code(String k, String v) {
			this.k = k;
			this.v = v;
		}
		
		public String getK() {
			return k;
		}
		public String getV() {
			return v;
		}
		
		public String toString() {
			return "{'" + k + "':'" + v + "'}";
		}
	}
	
	private void test_ordered_kv_pairs() {
		OrderedKeyValPairs<String,Code> pairs = new OrderedKeyValPairs<String,Code>();
		pairs.add("1745", new Code("1745", "ADEV"));
		pairs.add("2371", new Code("2371", "GEJV"));
		pairs.add("3649", new Code("3649", "PKCF"));
		
		System.out.println("'2371' => " + pairs.get("2371"));

		System.out.println("iteration:");
		for (String key : pairs.keys()) {
			System.out.println("\t'" + key + "' => " + pairs.get(key));
		}
		
		System.out.println("iteration:");
		for (Code code : pairs.values()) {
			System.out.println("\t" + code);
		}
		
		System.out.println(pairs);
		
		if (pairs.contains("3649")) {
			System.out.println("contains key '3649'");
		}
		if (! pairs.contains("668")) {
			System.out.println("not contains key '668'");
		}
		
		pairs.add("2371", new Code("2371", "HVKW"));
		System.out.println("now '2371' => " + pairs.get("2371"));
		
		System.out.println("remove " + pairs.remove("3649"));
		
		System.out.println(pairs);
		
		pairs.clear();
		
		System.out.println("cleared, " + pairs.size() + " remains, " + pairs);
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_ordered_kv_pairs();
		test_nothing();
	}
	
	public static void main(String[] args) {
		OrderedKeyValPairsDemo worker = new OrderedKeyValPairsDemo();
		worker.test();
	}
}
