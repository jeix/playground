<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>modal_trigger</title>
<link rel="stylesheet" type="text/css" href="style.css" />
<style>
<!-- STYLE_HERE -->
</style>
<!--
<script type="text/javascript" src="simple.util.js"></script>
-->
<script type="text/javascript">
// SCRIPT_HERE
var $ = function(id) { return document.getElementById(id); };

function xprint(s) {
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createTextNode(s));
}
function xprintln(s) {
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(document.createTextNode(s));
	body.appendChild(document.createElement('br'));
	body.appendChild(document.createTextNode('\n'));
}

function handle_submit() {
	var f = document.frm;
	var o = {};
	o.a = f.a.value;
	o.b = f.b.value;
	o.c = f.c.value;
	o.target = 'modal_2.jsp';
	var modal = window.showModalDialog('modal_1.jsp', o, 'dialogHeight:200px; dialogWidth:200px; dialogTop:200px; dialogLeft:200px; help:no; scroll:no; status:no; resizable:yes');
	xprintln(modal);
	return false;
}

onload = function() {
	
};
</script>
</head>
<body>
<!-- BODY_HERE -->
<form name="frm">
a : <input type="text" name="a" value="고구마"><br>
b : <input type="text" name="b" value="고등어"><br>
c : <input type="text" name="c" value="고사리"><br>
<input type="submit" value="Submit" onclick="return handle_submit()">
</form>
</body>
</html>
