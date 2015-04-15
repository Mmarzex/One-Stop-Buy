'use strict';

// Configuring the Articles module
angular.module('auctionitems').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Auctionitems', 'auctionitems', 'dropdown', '/auctionitems(/create)?');
		Menus.addSubMenuItem('topbar', 'auctionitems', 'List Auctionitems', 'auctionitems');
		Menus.addSubMenuItem('topbar', 'auctionitems', 'New Auctionitem', 'auctionitems/create');
	}
]);