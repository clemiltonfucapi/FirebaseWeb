$(document).ready(function(){
	$('.table_teclado tr td').click(function(){


    let campo = $('#campo')[0];
    

		var command = $(this).text();
    let number = Number(command)
		if (isNaN(number)){
			
      if(command=="Corrige"){
        campo.value="";
        return;
      }
      
		} else {
      if (campo.value.length >= 2){
      
        console.log('somente dois digitos')
        return;
      }
			$('#campo').val($('#campo').val() + number).focus();
		}
	});
});