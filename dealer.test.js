var superagent = require('superagent')
var expect = require('expect.js')

var url = 'http://localhost:8088/';

describe('express rest api server', function(){
  var id

	//Find all
	it('retrieves dealer inventory', function(done){
		console.log('Test 1 - Retrieve dealer inventory...')

	    superagent.get(url+'vehicles')
	      .end(function(e, res){
	        expect(e).to.eql(null)
	        expect(res.body.length).to.be.above(0)
	        expect(res.body.map(function (item){return item._id})).to.contain(id)
			console.log('...got ' + res.body.length + ' vehicle(s)')
	        done()
	      })
  })

//Create
  it('creates vehicle', function(done){
	  console.log('Test 2 - Add vehicle to dealer inventory...')
      superagent.post(url+'vehicles/create')
        .send({
			year: '2011'
			, make: 'BMW'
			, model: '335i'
			, trim: 'Convertible'
			, transmission: 'Automatic'
			, mileage: '6678'
			, stock_number: 'A43955'
			, ext_color: 'Black Sapphire'
			, int_color: 'Charcoal'
			, short_desc: '2011 BMW 3-Series 335I NAV Convertible'
			, long_desc: 'Navigation System, Bluetooth,  19-inch Wheels,  Air Conditioning,  Alloy Wheels,  AM/FM Radio,  Anti-Lock Brakes,  Auto Climate Control,  Compact Disc Player,  Cruise Control,  Hard Top,  Heated Seats,  Leather Seats'
			, price: '26995'
        })
        .end(function(e,res){
          expect(e).to.eql(null)
          id = res.body[0].idvehicle
          console.log('...vehicle created with ID:' + id)
          done()
        })
  })

  //Find By ID
  it('retrieves vehicle', function(done){
	  console.log('Test 3 - Find new vehicle in dealer inventory...')

      superagent.get(url+'vehicles/'+id)
        .end(function(e, res){
          expect(e).to.eql(null)
          expect(typeof res.body).to.eql('object')
          expect(res.body[0].idvehicle).to.eql(id)
          console.log('...vehicle found with ID:' + res.body[0].idvehicle)
          done()
        })
  })


  //Update
 it('updates vehicle', function(done){
	 console.log('Test 4 - Update vehicle attributes')
	 console.log('       set mileage to 16678 and transmission to Manual...')
    superagent.put(url+'vehicles/update/'+id)
      .send({mileage: '16678'
        , transmission: 'Manual'})
      .end(function(e, res){
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        console.log('...vehicle updated!')
        done()
      })
  })

  it('checks an updated vehicle', function(done){
	  console.log('Test 5 - Check updates to vehicle attributes...')
    superagent.get(url+'vehicles/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body[0].idvehicle).to.eql(id)
        expect(res.body[0].mileage).to.eql('16678')
        console.log('...mileage is ' + res.body[0].mileage)
        console.log('...transmission is ' + res.body[0].transmission)
        done()
      })
  })

  //Delete
  it('deletes vehicle', function(done){
	  console.log('Test 6 - Remove the vehicle from dealer inventory...')

      superagent.del(url+'vehicles/delete/'+id)
        .end(function(e, res){
          expect(e).to.eql(null)
          expect(typeof res.body).to.eql('object')
          expect(res.body.msg).to.eql('success')
          console.log('...vehicle removed!')
          done()
        })
  })
})