$(window).ready(function() {
	$('.ButtonSelect').click(function(){
		RegisterBoxSwitch(this.innerHTML == 'Estudante' ? "0" : "1");
	});

	$('#BoxCadastro').on('click', 'svg', function(){
		RegisterBoxBackward();
	});

	
});

function RegisterBoxSwitch (condition) {
	$('#Footer').css('position', 'relative');
	if (condition != 0) {
		$('#BoxCadastro p:first-of-type').html('Cadastro De Palestrante');
		$('#BoxCadastro form').append(
			'<li><label for="Escolas">Instituições que atua/atuou</label><input type="text" list="Escolas" name="Escolas" required/></li>' +
			'<li><label id="CurriculoLabel">Envie Seu Currículo por:</label></li>' +
			'<li><label for="CurriculoLink">Link</label><input type="text" name="CurriculoLink"/></li>' +
			'<li><label for="Curriculo">Arquivo</label><input type="file" name="Curriculo"/></li>' + 
			'<li><label for="Informação">Conte um pouco sobre você e suas áreas de interesse</label><textarea placeholder="Resumo......" name="Informação" rows="5" required></textarea></li>' +
			'<button type="submit">Send</button>');
	} else if (condition == 0) {
		$('#BoxCadastro p:first-of-type').html('Cadastro De Estudante');
		$('#BoxCadastro form').append('<button type="submit">Send</button>');
	}
	var Buttons = $('#BoxCadastro nav:nth-of-type(2)'),
		baseForm = $('#BoxCadastro nav:first-of-type');

	$('#BoxCadastro').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-1 -1 27 27"><circle cx="12" cy="13" r="10" fill="black"></circle><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z" stroke="black" stroke-width="1"/></svg>');
	Buttons.css('opacity', '0');
	setTimeout(function(){
		Buttons.css('display', 'none');
		baseForm.css('display', 'block');
		setTimeout(function(){
			baseForm.css('opacity', '1');
		}, 300);
	}, 300);
}

function RegisterBoxBackward () {
	$('#Footer').removeAttr('style');
		var Buttons = $('#BoxCadastro nav:nth-of-type(2)'),
			baseForm = $('#BoxCadastro nav:first-of-type');

			$('#BoxCadastro p:first-of-type').html('Escolha qual tipo de cadastro deseja realizar');
			$('#BoxCadastro form button').remove();
			$('#BoxCadastro svg').remove();
			baseForm.css('opacity', '0');
			setTimeout(function(){
				baseForm.css('display', 'none');
				for (var i = 12; i >= 8; i--) {
					$('#BoxCadastro form li:nth-of-type('+(i)+')').remove();
				}
				Buttons.css('display', 'block');
				setTimeout(function(){
					Buttons.css('opacity', '1');
				}, 300);
			}, 300);

}