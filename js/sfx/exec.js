function xprint_code(codelet) {
	// if (codelet.toSource) {
	// 	var buf = codelet.toSource().replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	// } else {
		if (codelet === null) codelet = 'null';
		if (codelet === undefined) codelet = 'undefined';
		var buf = codelet.toString().replace(/ {4}/g, "  ").replace(/\t/g, "  ");
	// }
	var body = document.getElementsByTagName('body')[0];
	var code = document.createElement('code');
	var pre = document.createElement('pre');
	pre.appendChild(document.createTextNode(buf));
	code.appendChild(pre);
	body.appendChild(code);
}
function xprint_result(reault) {
	xprintln(' // ==> ' + reault)
}

function exec(expr, cmt) {
	var buf = expr;
	var ret = eval.call(window, expr);
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_o_ret(expr, cmt) {
	var buf = expr;
	var ret = eval.call(window, expr);
	buf += " // ==> " + ret;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_p_o_ret(expr, cmt) {
	exec_o_ret("(" + expr + ")", cmt);
}
function exec_if(expr, cmt) {
	var buf = "if (" + expr + ")";
	//var ret = eval.call(window, expr + "?true:false");
	var ret = eval.call(window, expr);
	ret = ret ? "true" : "false"
	buf += " // ==> " + ret;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
}
function exec_def(expr) {
	var buf = expr;
	var ret = eval.call(window, expr);
	xprint_code(buf);
}
function exec_after_print(expr, cmt) {
	var buf = expr;
	if (cmt) buf += " // " + cmt;
	xprintln(buf);
	var ret = eval.call(window, expr);
}