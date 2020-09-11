$(window).ready(function(){
	$('#MenuIcons svg').keydown(function(key){
		if (key.keyCode === 13) {  //checks whether the pressed key is "Enter"
        	callMenus (parseInt(this.getAttribute('id').replace(/[^0-9]/g, '')));
    }

	});
	$('#MenuIcons svg').click(function(){
		callMenus (parseInt(this.getAttribute('id').replace(/[^0-9]/g, '')));
	});
});


function callMenus (num) {
	
}