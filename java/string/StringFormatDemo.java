package string;

import java.sql.Date;
import java.sql.Time;
import java.util.Locale;

public class StringFormatDemo {
	
	private void test_String_format() {
		System.out.println(String.format("%b:%b", false, true));	// ==> false:true
		System.out.println(String.format("%b:%b", -1, 0, 1));		// ==> true:true
		System.out.println(String.format("%b:%b", null, "String"));	// ==> false:true
		
		System.out.println(String.format("%h:%h", false, true));	// ==> 4d5:4cf
		System.out.println(String.format("%h:%h", -1, 0, 1));		// ==> ffffffff:0
		System.out.println(String.format("%h:%h", null, "String"));	// ==> null:943a4c31
		
		System.out.println(String.format("%s:%s", false, true));	// ==> false:true
		System.out.println(String.format("%s:%s", -1, 0, 1));		// ==> -1:0
		System.out.println(String.format("%s:%s", null, "String"));	// ==> null:String
		
		System.out.println(String.format("%d:%d:%d", -10, 0, 10));	// ==> -10:0:10
		System.out.println(String.format("%o:%o:%o", -8, 0, 8));	// ==> 37777777770:0:10
		System.out.println(String.format("%x:%x:%x", -16, 0, 16));	// ==> fffffff0:0:10
		
		System.out.println(String.format(":%10d:%10d:%10d:", -10, 0, 10));		// ==> :       -10:         0:        10:
		System.out.println(String.format(":% 10d:% 10d:% 10d:", -10, 0, 10));	// ==> :       -10:         0:        10:
		System.out.println(String.format(":%010d:%010d:%010d:", -10, 0, 10));	// ==> :-000000010:0000000000:0000000010:
		System.out.println(String.format(":%(10d:%(10d:%(10d:", -10, 0, 10));	// ==> :      (10):         0:        10:
		System.out.println(String.format(":%+10d:%+10d:%+10d:", -10, 0, 10));	// ==> :       -10:        +0:       +10:
		System.out.println(String.format(":%-10d:%-10d:%-10d:", -10, 0, 10));	// ==> :-10       :0         :10        :
		
		System.out.println(String.format(":%10.4f:%10.4g:", Math.E, Math.E));	// ==> :    2.7183:     2.718:
		System.out.println(String.format(":% 10.4f:% 10.4g:", Math.E, Math.E));	// ==> :    2.7183:     2.718:
		System.out.println(String.format(":%010.4f:%010.4g:", Math.E, Math.E));	// ==> :00002.7183:000002.718:
		System.out.println(String.format(":%(10.4f:%(10.4g:", Math.E, Math.E));	// ==> :    2.7183:     2.718:
		System.out.println(String.format(":%+10.4f:%+10.4g:", Math.E, Math.E));	// ==> :   +2.7183:    +2.718:
		System.out.println(String.format(":%-10.4f:%-10.4g:", Math.E, Math.E));	// ==> :2.7183    :2.718     :
		
		System.out.println(String.format("%3$d:%2$d:%1$d", 1, 2, 3));	// ==> 3:2:1
		System.out.println(String.format("%1$d:%1$o:%1$x", 42));		// ==> 42:52:2a
		
		Date d = Date.valueOf("2003-04-05");
		System.out.println(String.format("%tC:%tY:%ty", d, d, d));	// ==> 20:2003:03
		System.out.println(String.format(Locale.US, "%tm:%tB:%tb:%th", d, d, d, d));	// ==> 04:April:Apr:Apr
		System.out.println(String.format(Locale.US, "%td:%te:%tj:%tA:%ta", d, d, d, d, d));	// ==> 05:5:095:Saturday:Sat
		System.out.println(String.format("%tF:%tD", d, d));	// ==> 2003-04-05:04/05/03
		
		Time t = Time.valueOf("02:03:04");
		System.out.println(String.format(Locale.US, "%tH:%tI:%tk:%tl:%tp", t, t, t, t, t));	// ==> 02:02:2:2:am
		System.out.println(String.format("%tM:%tS", t, t));	// ==> 03:04
		System.out.println(String.format(Locale.US, "%tz:%tZ", t, t));	// ==> +0900:KST
		System.out.println(String.format("%tR:%tT", t, t));	// ==> 02:03:02:03:04
		
		t = Time.valueOf("14:03:04");
		System.out.println(String.format(Locale.US, "%tH:%tI:%tk:%tl:%tp", t, t, t, t, t));	// ==> 14:02:14:2:pm
		System.out.println(String.format("%tM:%tS", t, t));	// ==> 03:04
		System.out.println(String.format(Locale.US, "%tz:%tZ", t, t));	// ==> +0900:KST
		System.out.println(String.format("%tR:%tT", t, t));	// ==> 14:03:14:03:04
		
		/*
		%tR   %tT      %tH %tI %tk %tl %tp %tM %tS %tz   %tZ
		----- -------- --- --- --- --- --- --- --- ----- ---
		14:03 14:03:04 14  02  14  2   pm  03  04  +0900 KST
		02:03 02:03:04 02  02  2   2   am
		
		%tF        %tD      %tC %tY  %ty %tm %tB   %tb %th %td %te %tj %tA      %ta
		---------- -------- --- ---- --- --- ----- --- --- --- --- --- -------- ---
		2003-04-05 04/05/03 20  2003 03  04  April Apr Apr 05  5   095 Saturday Sat
		//*/
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_String_format();
		test_nothing();
	}
	
	public static void main(String[] args) {
		StringFormatDemo worker = new StringFormatDemo();
		worker.test();
	}
}