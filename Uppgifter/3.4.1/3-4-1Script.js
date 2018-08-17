
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
//Animering med jQuery som använder swing och har en callback-funktion
function startAnimationSwing() {
	//Syntax: (selector).animate({styles},speed,easing,callback)
	$('#animateObjectSwing').animate({ width: "530px" }, 1000, 'swing', function () { alert('Animeringen är klar') });
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

//Resetar animeringen
function resetAnimation() {
	document.getElementById('animateObject').style.left = 0 + 'px';
}