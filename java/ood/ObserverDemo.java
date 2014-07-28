package ood;

import java.util.Observable;
import java.util.Observer;

public class ObserverDemo {
	
	static class XObservable extends Observable {
		public void boom() {
			setChanged();
			notifyObservers("foo");
		}
	}
	
	public void work() {
		XObservable observable = new XObservable();
		observable.addObserver(new Observer() {
			@Override
			public void update(Observable o, Object arg) {
				String s = (String) arg;
				System.out.println(s);
			}
		});
		observable.boom();
	}
	
	public static void main(String[] args) {
		System.out.println("------------");
		new ObserverDemo().work();
		System.out.println("------------");
	}
}
