function xprint_code(codelet) {
	// if (codelet.toSource) {
	// 	var buf = codelet.toSource().replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	// } else {
		var buf = codelet.toString().replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	// }
	var body = document.getElementsByTagName('body')[0];
	var code = document.createElement('code');
	var pre = document.createElement('pre');
	pre.appendChild(document.createTextNode(buf));
	code.appendChild(pre);
	body.appendChild(code);
}

function exec(expr, noret, cmt) {
	var buf = expr;
	var ret = eval.call(window, expr);
	if (ret != undefined && noret == undefined) buf += " // ==> " + ret;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_if(expr, cmt) {
	var buf = "if (" + expr + ")";
	//var ret = eval.call(window, expr + "?true:false");
	var ret = eval.call(window, expr);
	ret = ret ? "true" : "false"
	buf += " ==> " + ret;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_def(expr) {
	var buf = expr.replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	var ret = eval.call(window, expr);
	xprint_code(buf);
}