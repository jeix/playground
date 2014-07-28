/***************************************
 * get the position on the page of the given element
 * 
 * usage snippet :
var trigger_div = document.getElementById('addr_trigger');
var trigger_pos = page_position(trigger_div);
var layer_div = document.getElementById('show_addr_layer');
layer_div.style.left = (trigger_pos.x - 20) + 'px';
layer_div.style.top = (trigger_pos.y + 10) + 'px';
 *
 **************************************/
function page_position(elem) {
    var x = 0;
    var y = 0;
    if (elem != undefined) {
	    while (elem.offsetParent) {
	    	x += elem.offsetLeft;
	    	y += elem.offsetTop;
	        elem = elem.offsetParent;
	    }
    }
    return {x:x, y:y};
}