package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.junit.Test;

public class FooTest {
	
	@Test
	public void test_private_method() {
		
		Foo foo = new Foo();
		
		Method m = null;
		try {
			m = foo.getClass().getDeclaredMethod("op", Foo.Op.class, int.class, int.class);
		} catch (NoSuchMethodException nsme) {
			//nsme.printStackTrace();
			fail("NoSuchMethodException: " + nsme.getMessage());
		}
		int result = 0;
		try {
			m.setAccessible(true);
			result = (int) m.invoke(foo, Foo.Op.PLUS, 1, 2);
		} catch (IllegalAccessException iae) {
			fail("IllegalAccessException: " + iae.getMessage());
		} catch (InvocationTargetException ite) {
			fail("InvocationTargetException: " + ite.getMessage());
		}
		
		assertEquals(3, result);
	}
}
