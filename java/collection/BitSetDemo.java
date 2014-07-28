package collection;

import java.util.BitSet;

public class BitSetDemo {
	
	public void work() {
		BitSet x = new BitSet(3);
		x.set(0);
		x.set(1);
		System.out.println("x = " + x); // x = {0, 1}
			// T T F F
		BitSet y = new BitSet(65);
		y.set(0);
		y.set(2);
		System.out.println("y = " + y); // y = {0, 2}
			// T F T F
		System.out.println("y.cardinality = " + y.cardinality()); // y.cardinality = 2
		System.out.println("y.isEmpty = " + y.isEmpty()); // y.isEmpty = false
		System.out.println("y.length = " + y.length()); // y.length = 3
		System.out.println("y.size = " + y.size()); // y.size = 128
		BitSet c = (BitSet) x.clone();
		System.out.println("x intersects y = " + c.intersects(y));
			// x intersects y = true
		c.and(y);
		System.out.println("x and y ==> " + c); // x and y ==> {0}
			// x	y	x and y
			// -	-	-------
			// T	T	T
			// T	F	F
			// F	T	F
			// F	F	F
		c = (BitSet) x.clone();
		c.andNot(y);
		System.out.println("x andNot y ==> " + c); // x andNot y ==> {1}
			// x	y	x andNot y -- complement -- (x - y)
			// -	-	----------
			// T	T	F
			// T	F	T
			// F	T	F
			// F	F	F
		c = (BitSet) x.clone();
		c.or(y);
		System.out.println("x or y ==> " + c); // x or y ==> {0, 1, 2}
			// x	y	x or y
			// -	-	------
			// T	T	T
			// T	F	T
			// F	T	T
			// F	F	F
		c = (BitSet) x.clone();
		c.xor(y);
		System.out.println("x xor y ==> " + c); // x xor y ==> {1, 2}
			// x	y	x xor y
			// -	-	-------
			// T	T	F
			// T	F	T
			// F	T	T
			// F	F	F
		x.flip(4);
		System.out.println("x.flip(4) ==> " + x);
			// x.flip(4) ==> {0, 1, 4}
		x.clear(4);
		System.out.println("x.clear(4) ==> " + x);
			// x.clear(4) ==> {0, 1}
		System.out.println("x.get(1) = " + x.get(1));
			// x.get(1) = true
		x.clear();
		System.out.println("x.clear() ==> " + x);
			// x.clear() ==> {}
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new BitSetDemo().work();
		System.out.println("------------");
	}
}
