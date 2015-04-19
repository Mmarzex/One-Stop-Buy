'user strict';

/**
* Module dependencies.
*/
var Sequelize = require('sequelize');
var db = require('../../config/sequelize');
var sequelize = db.sequelize;
var schema = db.schema;


/**
* Bought Schema
*/

var Bought = sequelize.define('bought', {
	buyer_name: Sequelize.STRING,
	item_name: Sequelize.STRING,
	item_id: Sequelize.STRING,
	auction_item: Sequelize.BOOLEAN
});

Bought.sync({force: true}).then(function() {
	console.log("Bought schema synced successfully");
});

schema['Bought'] = Bought;