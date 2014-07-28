package lang.for_each.v2;

import java.util.ArrayList;
import java.util.List;

class Array<T> {
	
	List<T> items;
	
	public Array(List<T> items) {
		this.items = items;
	}
	
	public void for_each(Iterator<T> func, Object... vals) {
		int ix = 0;
		for (T item : this.items) {
			func.apply(item, ix++, vals);
		}
	}
	
	public boolean every(Filter<T> filt, Object... vals) {
		for (T item : this.items) {
			if (! filt.apply(item, vals)) {
				return false;
			}
		}
		return true;
	}
	
	public boolean some(Filter<T> filt, Object... vals) {
		for (T item : this.items) {
			if (filt.apply(item, vals)) {
				return true;
			}
		}
		return false;
	}
	
	public List<T> filter(Filter<T> filt, Object... vals) {
		List<T> results = new ArrayList<T>();
		for (T item : this.items) {
			if (filt.apply(item, vals)) {
				results.add(item);
			}
		}
		return results;
	}
	
	public List<Object> map(Mapper<T> map, Object... vals) {
		List<Object> dsts = new ArrayList<Object>();
		for (T src : this.items) {
			dsts.add(map.apply(src, vals));
		}
		return dsts;
	}
	
	public T reduce(Reducer<T> reducer, T dst, Object... vals) {
		for (T src : this.items) {
			dst = reducer.apply(dst, src, vals);
		}
		return dst;
	}
	
	public T reduce_right(Reducer<T> reducer, T dst, Object... vals) {
		int size = this.items.size();
		for (int i = size - 1; i >= 0; i--) {
			T src = this.items.get(i);
			dst = reducer.apply(dst, src, vals);
		}
		return dst;
	}
	
	interface Iterator<T> {
		void apply(T param, int index, Object... vals);
	}
	
	interface Filter<T> {
		boolean apply(T param, Object... vals);
	}
	
	interface Mapper<T> {
		Object apply(T param, Object... vals);
	}
	
	interface Reducer<T> {
		T apply(T accumulator, T param, Object... vals);
	}
}