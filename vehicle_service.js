/*
* Vehicle Service
* @author shroffh
*/

var dealerDB = require('./dealerDB');

var connection = dealerDB.getConnection;

var table_name = 'vehicle';

function getCurrentTimestamp(){
	var date = new Date();
		var c = date.getFullYear()
							+ '-' + date.getMonth()
							+ '-' + date.getDate()
							+ ' ' + date.getHours()
							+ ':' + date.getMinutes()
					+ ':' + date.getSeconds();  //YYYY-MM-DD HH:MM:SS
	return c;
	}

exports.findAll = function(req, res) {
	var query = 'select * from ' + table_name;

	console.log('findAll:');
	connection.query(query, function (error, rows, fields) {
		 if (error) throw error;

		res.jsonp(rows);
	});
};

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);

    var query = 'select * from ' + table_name + ' where idvehicle='+id;

    	connection.query(query, function (error, rows, fields) {
			 if (error) throw error;

			res.jsonp(rows);
	});
};

exports.create = function(req, res){
	var v = req.body;

	var query = 'INSERT INTO ' + table_name + ' (year, make, model, trim, transmission, mileage, stock_number, ext_color, int_color, short_desc, long_desc, price, record_date_time) values(';

	query += '"' + v.year
		+ '","' + v.make
		+ '","' + v.model
		+ '","' + v.trim
		+ '","' + v.transmission
		+ '","' + v.mileage
		+ '","' + v.stock_number
		+ '","' + v.ext_color
		+ '","' + v.int_color
		+ '","' + v.short_desc
		+ '","' + v.long_desc
		+ '",' + v.price
		+ ',"' + getCurrentTimestamp() + '"';

	query += ')';

	console.log('Create query=' + query);

	connection.query(query, function (error, rows, fields) {
		if (error){
			console.log('Insert error: '+ error +', try updating...');
			exports.update(v);
		}else{
			console.log('Created vehicle '+ v.stock_number);
		}
	});

	query = 'select * from ' + table_name + ' where stock_number="'+v.stock_number + '"';

	connection.query(query, function (error, rows, fields) {
		if (error) throw error;

		res.jsonp(rows);
	});
};

exports.update = function(req, res){
	var v = req.body;
	var query = 'update ' + table_name + ' set '
	+ 'record_date_time="' + getCurrentTimestamp() + '"';

	for (var propName in req.body) {
		if (req.body.hasOwnProperty(propName)) {
			query += ', ' + propName + '="' + req.body[propName] + '"'
		}
	}

	query += ' where idvehicle=' + req.params.id;

	console.log('Update query=' + query);

	connection.query(query, function (error, rows, fields) {
		if (error){
			throw error;
		}
		console.log('Updated vehicle ' + req.params.id);
	});

	query = 'select * from ' + table_name + ' where idvehicle=' + req.params.id;

		connection.query(query, function (error, rows, fields) {
			if (error) throw error;

			res.jsonp(rows);
	});
};

exports.delete = function(req, res){

	var query = 'delete from ' + table_name
		+ ' where idvehicle=' + req.params.id;

	connection.query(query, function (error, rows, fields) {
		if (error){
			throw error;
		}
		console.log('Deleted vehicle ' + req.params.id);
	});

	res.send({msg:'success'});
};