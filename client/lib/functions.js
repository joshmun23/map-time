
getParents = function(el) {
    var parents = [];

    var p = el.parentNode;

    while (p !== null) {
        var o = p;
        parents.push(o.className);
        p = o.parentNode;
    }
    return parents; // returns an Array []
}

round5 = function(x){
	if(!x){
		x = 0;
	}
    return Math.ceil(x/5)*5;
}

formatPhone = function(number){ 
    if(number !=undefined){
        return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
}

formatMoney = function(n, c, d, t){
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

parseColorDarkness = function(color){
    
    var c = color; //color must be HEX VALUE
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = (r + g + b)/3;

    if (luma < 128) {
        return true;
    }
    return false;
}

positionSlide = function(slideNum){
    return {
        WebkitTransform: "translate("+(slideNum * 100)+"%,0)",
        transform: "translate("+(slideNum * 100)+"%,0)",
    };
}

isSingle = function(num,input){ 
    if(num > 1){
        return input;
    }
    return;
}