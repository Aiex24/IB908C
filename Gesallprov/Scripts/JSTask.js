//global variabel
var global;


$('.scrollToContent').on('click', function () {
	$('html, body').animate({ scrollTop: $(this.hash).offset().top - 50 }, 1);
	return false;
});
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


$(window).bind("load", function () {
	//Skriver ut dagens datum
	var date = new Date();
	document.getElementById('displayDate').innerText = date;
	//När användaren matar in någon i textboxarna anropas beräkningsfunktionen
	$('.additionBox').keyup(function () {
		calculate();
	});
	//Ger ett felmeddelande om matar in något i fältet
	$('#textBoxCaps').keyup(function () {
		alert('Detta fält är ej till för inmatning');
	});
	//click-function med hjälp av jQuery
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


	//Byter ut bilden om man hoovrar över den
	$('#imageSwitchImage').hover(function () {
		$(this).attr('src', '../Resources/monkey.png');
	}, function () {
		$(this).attr('src', '../Resources/Planets2013.svg.png');
	});

	//https://jqueryui.com/tabs/ Skapar tab-funktion med hjälp av jQuery
	$(function () {
		$("#tabs").tabs();
	});

	$('.square2').click(function () {
		alert('Hej!');
	});
});

//Kontrollerar inmatningen och beräknar upphöjt till av de två inmatade värdena
function calculate() {
	var number1 = document.getElementById('number1').value;
	var number2 = document.getElementById('number2').value;
	global = [number1, number2];

	//Kontrollerar att global[] endast innehåller siffror
	for (var i = 0; i < global.length; i++) {
		global[i] = global[i].match(/[0-9]/g);
	}
	//Skriver tillbaks den tvättade strängen till textboxarna
	document.getElementById('number1').value = global[0];
	document.getElementById('number2').value = global[1];
	power();
}

//Upphöjtfunktion
function power() {
	//beräknar global[0] upphöjt till global[1]
	var result = Math.pow(global[0], global[1]);
	document.getElementById('sum').value = result;
}

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

//öpnnar ett ja/avbryt fönster
function confirmButton() {
	var answer = confirm('Is CSS Awesome?!');
	if (answer) {
		alert('Your answer is correct!');
	}
	else {
		alert('Your answer is wrong!');
	}
}

//Öppnar ett inmatningsfält
function nameButton() {
	var name = prompt('What is your name?', 'Name')
	if (name != 'Alex') {
		alert('Wrong!');
	}
	else {
		alert('Correct!');
	}
}

//globgal variabel för att kunna användas av både openButton och closeButton
var newWindow;

//Öppnar en ny tab med adressen www.su.se
function openButton() {
	newWindow = window.open('https://www.su.se', 'newWindow', 'width=500, height=600');
}

//Stänger fönstret om det existerar
function closeButton() {
	if (newWindow !== 'undefined') {
		newWindow.close();
	}
}


var counter;
var warning;
//Räknar upp varje sekund
function interval() {
	var iteration = 0;
	counter = setInterval(function () {
		iteration++;
		document.getElementById('iterationP').innerText = iteration;
	}, 1000);
	//När 5 sekunder passerat kommer en varning
	warning = setTimeout(function () { alert('5 sekunder har passerat'); }, 5000);
}

//Stoppar uppräkningen
function stopCounter() {
	clearInterval(counter);
}
//Tar bort varningen vid 5 sekunder
function clearWarning() {
	clearTimeout(warning);
}

//Visar elementet
function showElement() {
	$('#hideShowDiv').show();
}

//Gömmer elementet
function hideElement() {
	$('#hideShowDiv').hide();
}

//Visar eller gömmer elementet beroende på nuvarande status
function toggleElement() {
	$('#hideShowDiv').toggle();
}


//Gör ett element stegvis synligt 
function fadeInExample() {
	$('#fadeDiv').fadeIn(4000);
}

//Tonar ut ett element
function fadeOutExample() {
	$('#fadeDiv').fadeOut(4000);
}

//Gör ett element synligt eller tonar ut det beroende på nuvarande status
function fadeToggleExample() {
	$('#fadeDiv').fadeToggle(4000);
}

//Tonar ut ett element till en viss gräns
function fadeToExample() {
	$('#fadeDiv').fadeTo(2000, 0.5);
}

//Flyttar diven om man aktiverar funktionen
function startAnimation() {
	var element = document.getElementById('animateObject');
	var i = 0;
	//Lägger in en fördröjning så man hinner se diven röra på sig
	var animation = setInterval(move, 8);
	function move() {
		//Om diven har nått slutet ska den stanna
		if (i === 490) {
			clearInterval(animation);
		}
		//Ökar positionen på diven med en pixel i taget
		i++;
		element.style.left = i + 'px';
	}
}


//Resetar animeringen
function resetAnimation() {
	document.getElementById('animateObject').style.left = 0 + 'px';
}

//Animering med jQuery som använder swing och har en callback-funktion
function startAnimationSwing() {
	//Syntax: (selector).animate({styles},speed,easing,callback)
	$('#animateObjectSwing').animate({ width: '530px' }, 1000, 'swing', function () { alert('Animeringen är klar') });
}

//Ritar en bild med hjälp av line, arc och bezier
function canvasDrawing() {
	var c = document.getElementById('canvasExample');
	var ctx = c.getContext('2d');
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, 40);
	ctx.lineTo(50, 40);
	ctx.moveTo(130, 40);
	ctx.lineTo(180, 40);
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Hej", 75, 60);
	ctx.moveTo(0, 40);
	ctx.bezierCurveTo(0, 120, 180, 120, 180, 40);
	ctx.arc(90, 40, 40, 0, 2 * Math.PI);
	ctx.globalAlpha = 0.5;
	ctx.shadowBlur = 20;
	ctx.shadowColor = "black";
	var gradient = ctx.createLinearGradient(0, 0, 100, 0);
	gradient.addColorStop(0, "red");
	gradient.addColorStop(1, "white");
	ctx.fillStyle = gradient;
	ctx.fill();
	var img = new Image();
	ctx.drawImage(img, 10, 10);
	ctx.stroke();
}

//Sparar canvas som en png bild
function saveImage() {
	
	var canvas = document.getElementById("canvasExample");
	//https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
	// Multipurpose Internet Mail Extensions (MIME) type , octet stream (representerar binär data)
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	window.location.href = image;
}

//Visar frågeformuläret
function startQuiz() {
	document.getElementById('modal').style.display = 'block';
}

//Beroende på vilken typ av fråga man väljer visas motsvarande div
function radioClick(typOfQuestion) {
	if (typOfQuestion === 'math') {
		document.getElementById('mathQ').style.display = 'block';
		document.getElementById('programmingQ').style.display = 'none';
	}
	else {
		document.getElementById('mathQ').style.display = 'none';
		document.getElementById('programmingQ').style.display = 'block';
	}
}

//Stänger ner form
function closeFormQuiz() {
	document.getElementById('modal').style.display = 'none';
}


//Om all inmatning är validerad skrivs det hur många rätt man fick
$('#quizForm').submit(function (evt) {
	evt.preventDefault();
	if ($('#quizForm').valid()) {
		var name = document.getElementById('userName').value;
		var email = document.getElementById('email').value;
		var radioQuestion = document.getElementById('radioQuestion');
		var matteQ1 = document.getElementById('matteQ1');
		var matteQ2 = document.getElementById('matteQ2');
		var proQ1 = document.getElementById('proQ1');
		var proQ2 = document.getElementById('proQ2');

		var numberOfPoints = 0;
		//Kontrollerar svaret om man valde en matte-fråga
		if (radioQuestion.checked === false) {
			radioQuestion = 'Matte-';
			if (matteQ1.checked == true && matteQ2.checked == false) {
				numberOfPoints++;
			}
		}
		//Kontrollerar svaret om man valde en programmeringsfråga
		else {
			radioQuestion = 'Programmerings-';
			if (proQ1.checked === true && proQ2.checked === false) {
				numberOfPoints++;
			}
		}
		//Skriver ut resultatet
		alert(name + '(' + email + ')' + ' fick ' + numberOfPoints + ' rätt!');
		//Stänger ner formen
		closeFormQuiz();
	}
});

