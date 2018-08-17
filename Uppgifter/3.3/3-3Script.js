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