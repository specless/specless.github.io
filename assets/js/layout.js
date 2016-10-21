function layout() {
 	var menu = $('#layout_menu'),
 		menuToggle = $('#layout_menu_toggle'),
 		nav = $('body > main > nav'),
 		article = $('body > main > article'),
 		main = $('body > main'),
 		dropdowns = $('.dropdown');

 		menuToggle.click(function() {
 			menu.toggleClass('showing');
 			menuToggle.toggleClass('icon-close');
 		});

 		nav.click(function() {
 			main.toggleClass('nav-showing');
 		});

 		article.click(function() {
 			main.removeClass('nav-showing');
 		})

 		dropdowns.click(function(event) {
 			var dropdown = $(this);
 			var isOpen = dropdown.hasClass('dropdown-open');
 			dropdowns.removeClass('dropdown-open');
 			if (!isOpen) {
 				dropdown.addClass('dropdown-open');
 				event.stopPropagation();
	 			$(document).click(function() {
	 				dropdown.removeClass('dropdown-open');
	 			});
 			}
 		});

 		dropdowns.children('ul').click(function() {
			var dropdown = $(this);
			dropdown.removeClass('dropdown-open');
		});

		dropdowns.children('ul').children('li').click(function() {
			var dropdownItem = $(this);
			dropdownItem.siblings().removeClass('dropdown-selected');
			dropdownItem.addClass('dropdown-selected');
		});
 }

 layout();