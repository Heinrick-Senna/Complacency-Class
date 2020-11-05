$(window).ready(function(){


	$('#MenuIcons svg').keydown(function(key){
		if (key.keyCode === 13) {  //checks whether the pressed key is "Enter"
        callMenus (this, parseInt(this.getAttribute('id').replace(/[^0-9]/g, '')));
    }

	});
	$('#MenuIcons svg').click(function(){
		callMenus (this, parseInt(this.getAttribute('id').replace(/[^0-9]/g, '')));
	});

	$(window).click(function(e){    
	       	if(e.target.class == "TopMenu")
	        	return;
	       
	       	if($(e.target).closest('.TopMenu').length)
	        	return;  

	        if(e.target.id == "MenuIcons")
	        	return;

	        if($(e.target).closest('#MenuIcons').length)
	        	return;       


	    var i = 0;
	    while (i < 3) {
	    	var	classMenu = document.getElementsByClassName('TopMenu');
	    	if (classMenu[i].style.display == 'block')
	    		closeMenus(classMenu[i], document.getElementById('MenuIcons').getElementsByTagName('svg')[i]);
	    	i++;
	    }
	   	
	});


});


function callMenus (icon, num) {
	var classMenu = document.getElementsByClassName('TopMenu'),
		calledMenu = classMenu[num],
		i = 0;


		while (i < 3 ){
			if (classMenu[i].style.display == 'block') {
				var menuCheck = classMenu[i];
				closeMenus(menuCheck, document.getElementById('MenuIcons').getElementsByTagName('svg')[i]);
			}
			i++
		}
		if (calledMenu != menuCheck) {
				openMenus (calledMenu, icon);			
		}
}

function openMenus (menu, icon) {
	var w = $(window).width();
	icon.style.transform = 'scale(1.5)';
	icon.style.fill = 'white';
	if (w >= 970) {
		menu.style.display = 'block';
		setTimeout(function(){
			menu.style.top = '3rem';
		}, 15);
	} else {
		menu.style.display = 'block';
		menu.style.top = '3rem';
	}
}

function closeMenus (menu, icon) {
	var w = $(window).width();
	icon.removeAttribute('style');
	icon.blur();
	if (w >= 970) {
		menu.style.top = '-45vh';
		setTimeout(function(){
			menu.style.display = 'none';
		}, 500);
	} else {
		menu.style.display = 'none';
	}
}