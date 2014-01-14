/*
 *	Dealer REST Service
 *	@author shroffh
 */

var express = require('express'),
    vehicle_service = require('./vehicle_service');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
});


//Vehicle
app.get('/inventory', vehicle_service.findAll);
app.get('/vehicles', vehicle_service.findAll);
app.get('/vehicles/:id', vehicle_service.findById);
app.post('/vehicles/create', vehicle_service.create);
app.put('/vehicles/update/:id', vehicle_service.update);
app.delete('/vehicles/delete/:id', vehicle_service.delete);

app.listen(8088);
console.log('Dealer REST Service reporting live from port 8088...');