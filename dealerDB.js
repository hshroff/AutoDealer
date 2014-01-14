/*
 *	Database Access Object
 *	@author shroffh
 */

 var mysql = require("mysql");

 exports.getConnection = new function(){
	var connection = mysql.createConnection({
	   host     : 'localhost',
	   user     : 'root',
	   password : 'some_password',
	   database : 'dealer'
	});

	return connection;
 };


