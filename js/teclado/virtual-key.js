$(document).ready(function(){
	$('.table_teclado tr td').click(function(){


    let campo = $('#campo')[0];
    

		var command = $(this).text();
    let number = Number(command)
		if (isNaN(number)){
			
      if(command=="Corrige"){
        campo.value="";
        $('#campo').trigger('change')
        return;
      }else if(command=="Branco"){
        campo.value="0";
        $('#campo').trigger("change");
        return;
      }
      
		} else {
      if (campo.value.length >= 2){
      
        console.log('somente dois digitos')
        return;
      }
      //escreve
			$('#campo').val($('#campo').val() + number).trigger("change");


		}
	});
});