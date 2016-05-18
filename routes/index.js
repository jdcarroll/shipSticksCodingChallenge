//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Main Routes File
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const mongojs = require('mongojs');
const db = mongojs('ShipSticks', ['products']);

module.exports = (function(){
	// passing the public directory foward to the front end
	_publicDir = {
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'public'
			}
		}
	}
	// givving access to the bower compoents for the front end
	_bower = {
		method: 'GET',
		path: '/bower/{param*}',
		handler: {
			directory: {
				path: 'bower_components'
			}
		}
	}
	// finding all the distinct types of packages
	_getProductOpt = {
		method: 'GET',
		path: '/open',
		handler : function(req, res){
			db.products.distinct('type', {}, function(err, docs){
				res(docs);
			});
		}
	}
	// route that handles the calculation
	_getProducts = {
		method: 'POST',
		path: '/calculate',
		handler : function(req, res){
			// convert string data to numerical data for db comparison
			var data = {
				type : req.payload.type,
				length : Number(req.payload.length),
				width : Number(req.payload.width),
				height : Number(req.payload.height),
				weight : Number(req.payload.height)
			}
			// use coverted values to search the db
			// I want the closest so setting everyhting to asc will give me just that
			db.products.find({ $and : [{ 
				type : data.type
			},{
				length : { 
					$gte : data.length
				}},{ 
				height : { 
					$gte : data.height
				}}, {
				width : {
					$gte : data.width
				}}, {
				weight : {
					$gte : data.weight
				}}]}).sort({ length : 1, width : 1, height : 1, weight : 1}, 
				function(err, docs){
					if (err){ throw err }
					res(docs);
				})
		}
	}
	// return routes to allow my main index.js file access to the routes
	return {
		public : _publicDir,
		bower : _bower,
		getProducts : _getProducts,
		getProductOpts : _getProductOpt
	}

}())