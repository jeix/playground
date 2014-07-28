import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.simple.util.Base64;

import file.NioRw;


public class MD5Demo {
	
	private void test_md5() {
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException nsae) {
			nsae.printStackTrace();
			return;
		}
		md.update("Hello World".getBytes());
		byte[] digest = md.digest();
		try {
			NioRw.nio_write("digest_1", digest);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		System.out.println(new String(Base64.encode(digest)));
		
		byte[] digest_2 = md.digest("Hello World".getBytes());
		try {
			NioRw.nio_write("digest_2", digest_2);
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		System.out.println(new String(Base64.encode(digest_2)));
		
		if (! MessageDigest.isEqual(digest, digest_2)) {
			System.out.println("diff");
		}
	}
	
	private void test_nothing() {
		System.out.println(":wq");
	}
	
	public void test() {
		test_md5();
		test_nothing();
	}
	
	public static void main(String[] args) {
		MD5Demo worker = new MD5Demo();
		worker.test();
	}
}
