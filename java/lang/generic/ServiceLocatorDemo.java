package lang.generic;

import java.util.HashMap;
import java.util.Map;

public class ServiceLocatorDemo {
	
	static class ServiceLocator {
		private static Map<Class<?>,Object> objects = new HashMap<Class<?>,Object>();
		
		@SuppressWarnings("unchecked")
		public static <T> T get(Class<T> klass) {
			return (T) objects.get(klass);
		}
		
		public static void regist(Class<?> klass, Object obj) {
			objects.put(klass, obj);
		}
	}
	
	static class Foo {
		public void act() {
			System.out.println("Foo");
		}
	}
	
	static class Bar {
		public void act() {
			System.out.println("Bar");
		}
	}
	
	private void test_service_locator() {
		ServiceLocator.regist(Foo.class, new Foo());
		ServiceLocator.regist(Bar.class, new Bar());
		
		Foo foo = ServiceLocator.get(Foo.class);
		foo.act();
		
		Bar bar = ServiceLocator.get(Bar.class);
		bar.act();
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_service_locator();
		test_nothing();
	}
	
	public static void main(String[] args) {
		ServiceLocatorDemo worker = new ServiceLocatorDemo();
		worker.test();
	}
}
