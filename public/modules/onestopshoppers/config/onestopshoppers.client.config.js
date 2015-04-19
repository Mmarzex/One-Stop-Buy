'use strict';

// Configuring the Articles module
angular.module('onestopshoppers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Onestopshoppers', 'onestopshoppers', 'dropdown', '/onestopshoppers(/create)?');
		Menus.addSubMenuItem('topbar', 'onestopshoppers', 'List Onestopshoppers', 'onestopshoppers');
		Menus.addSubMenuItem('topbar', 'onestopshoppers', 'New Onestopshopper', 'onestopshoppers/create');
	}
]);