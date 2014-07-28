<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>modal_2</title>
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

function handle_ok() {
	var sb = 'a=' + $('a').innerHTML + '&b=' + $('b').innerHTML + '&c=' + $('c').innerHTML;
	window.returnValue = sb;
	window.close();
}

onload = function() {
	
};
</script>
</head>
<body>
<!-- BODY_HERE -->
<div>
a : <span id="a">${param.a}</span><br>
b : <span id="b">${param.b}</span><br>
c : <span id="c">${param.c}</span><br>
<span onclick="handle_ok()" style="text-decoration:underline;cursor:pointer">OK</span>
</div>
</body>
</html>
