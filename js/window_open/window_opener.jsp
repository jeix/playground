<script type="text/javascript">
function handle_submit() {
	var f = document.form;
	f.action = 'window_openee.jsp';
	f.target = 'x_pop';
	window.open('about:blank','x_pop','width=100,height=100');
	f.submit();
}
</script>

<form name="form" method="post">
<input type="text" name="aaa"><br>
<input type="text" name="bbb"><br>
<input type="submit" onclick="return handle_submit()"><br>
</form>
