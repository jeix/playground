package test;

public class Foo {
	
	public int add(int a, int b) {
		return op(Op.PLUS, a, b);
	}
	
	enum Op {
		PLUS, MINUS
	}
	
	private int op(Op op, int a, int b) {
		if (op == Op.PLUS) {
			return a + b;
		}
		throw new UnsupportedOperationException();
	}
}
