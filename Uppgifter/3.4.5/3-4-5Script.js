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