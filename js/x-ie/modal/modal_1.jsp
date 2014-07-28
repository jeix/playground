<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>modal_1</title>
<base target="_self"> 
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

onload = function() {
	var f = document.frm;
	f.action = dialogArguments.target;
	f.a.value = dialogArguments.a;
	f.b.value = dialogArguments.b;
	f.c.value = dialogArguments.c;
	f.submit();
};
</script>
</head>
<body>
<!-- BODY_HERE -->
<form name="frm" method="post">
a : <input type="text" name="a"><br>
b : <input type="text" name="b"><br>
c : <input type="text" name="c"><br>
</form>
</body>
</html>
