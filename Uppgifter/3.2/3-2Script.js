$(document).ready(function () {
	//Om Fönstret bredd ändras 
	$(window).resize(function () {
		var w = window.innerWidth;
		//Skriver endast ut bredden om p-elementet innehåller ordet 'bredden'
		if (document.getElementById('instructions').innerText.includes('bredden') === true) {
			document.getElementById('resized').innerText = 'Fönsterbredd:' + w;
		}
	});

});
	//Ger ett felmeddelande om matar in något i fältet
	$('#textBoxCaps').keyup(function () {
		alert('Detta fält är ej till för inmatning');
	});
	
	$('#clickableDiv').click(function () {
		//Tar bort gamla classen
		document.getElementById('instructions').classList.remove('tempClass');
		//Lägger till en ny class
		document.getElementById('instructions').classList.add('newClass');
		//Tar bort ett element
		$('#clickableDiv').remove();
		//Ändrar texten i p elementet
		document.getElementById('instructions').innerText = 'Ändra bredden på fönstret';
	});
	
	//Tar bort fokuseringen från elementet med ID=focused
function blurfunction() {
	document.getElementById('focused').blur();
}

//Fokuserar elementet med ID=focused
function focusfunction() {
	document.getElementById('focused').focus();
}

//alertar vilken typ av element som anropade funktionen
function eventAlert(event) {
	alert(event.target.nodeName);
}

	//Ändrar bakgrundsfärgen om man hoovrar över textfältet
	$('#textBoxCaps').hover(function () {
		$(this).css("background-color", 'red');
	}, function () {
		$(this).css("background-color", 'white');
	});

	//Tar bort klickmöjligheten på a-elementet
	$('#linkWithPreventDefault').click(function (event) {
		event.preventDefault();
	});

	$('#alert').click(function () {
		alert('You clicked me!');
	});

	//Tar bort click-eventet från elementet med ID=activateOff
	$('#activateOff').click(function () {
		$('#alert').off('click');
	});