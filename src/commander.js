define(function (require, exports, module) {
	var $ = require('$');
	var mdConverter = require('./converter');
	var ret = '';

	//debugger;
	$('#input').keyup(function() {
		ret = mdConverter.convert($(this).val());
		//console.log('final string -> ' + ret);
		$('#output').html(ret);
	}).focus();


});