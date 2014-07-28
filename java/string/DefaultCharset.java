package string;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

public class DefaultCharset {
	
	private void println(Object x, int n) {
		System.out.print(x);
		System.out.print("[");
		System.out.print(n);
		System.out.print("]");
		System.out.println();
	}
	
	private void println(byte[] x, int n) {
		for (byte b : x) {
//			System.out.print(b);
//			System.out.print(Integer.toHexString((int)b).toUpperCase());
//			System.out.print(Integer.toString((int)b, 16).toUpperCase());
//			System.out.print(Integer.toString(new BigDecimal((int)b).abs().intValue(), 16).toUpperCase());
			System.out.print(Integer.toHexString(0xFF & (int)b).toUpperCase());
//			System.out.print(Integer.toString(0xFF & (int)b, 16).toUpperCase());
			System.out.print(":");
		}
		System.out.print("[");
		System.out.print(n);
		System.out.print("]");
		System.out.println();
	}
	
	private void to_bytes_then_to_string(String s) {
		byte[] ba = s.getBytes();
		println(ba, ba.length);
		s = new String(ba);
		println(s, s.length());
	}
	
	private void to_bytes_then_to_string(String s, String charset) throws UnsupportedEncodingException {
		byte[] ba = s.getBytes(charset);
		println(ba, ba.length);
		s = new String(ba, charset);
		println(s, s.length());
	}
	
	private void test_charset() {
		String s = "고구마펲똠떄";
		println(s, s.length()); // -> 고구마펲똠떄[6]
		try {
				// Eclipse				// Java
			// <default>
			to_bytes_then_to_string(s);
				// -> [B@c17164[18]		// -> [B@c17164[12]
				// -> 고구마펲똠떄[6]
			// us-ascii
			to_bytes_then_to_string(s, "us-ascii");
			// -> [B@14318bb[6]			// -> [B@14318bb[6]
			// -> ??????[6]
			// 8859_1
			to_bytes_then_to_string(s, "8859_1");
			// -> [B@ca0b6[6]			// -> [B@ca0b6[6]
			// -> ??????[6]
			// euc-kr
			to_bytes_then_to_string(s, "euc-kr");
			// -> [B@69b332[9]			// -> [B@69b332[9]
			// -> 고구마???[6]
			// ms949
			to_bytes_then_to_string(s, "ms949");
			// -> [B@173a10f[12]		// -> [B@173a10f[12]
			// -> 고구마펲똠떄[6]
			// utf-8
			to_bytes_then_to_string(s, "utf-8");
			// -> [B@530daa[18]			// -> [B@530daa[18]
			// -> 고구마펲똠떄[6]
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_charset();
		test_nothing();
	}
	
	public static void main(String[] args) {
		DefaultCharset worker = new DefaultCharset();
		worker.test();
	}
}