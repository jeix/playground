function do_ajax(target, args, callback) {
	var uri = '/' + target;
	var xmlhttp;
	if (typeof XMLHttpRequest != "undefined") {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		if (!xmlhttp) {
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	if (!xmlhttp) {
		return;
	}
	xmlhttp.open('POST', uri, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			var txt = xmlhttp.responseText.replace(/^\s*|\s*$/g,"");
			//var status = txt.charAt(0);
			//var data = txt.substring(2);
			callback(txt);
		}
	};
	xmlhttp.send(args);
	delete xmlhttp;
}