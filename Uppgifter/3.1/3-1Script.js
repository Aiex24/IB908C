						//global variabel
						var global;
						$(window).bind("load", function () {
						//Skriver ut dagens datum
						var date = new Date();
						document.getElementById('displayDate').innerText = date;
						//När användaren matar in någon i textboxarna anropas beräkningsfunktionen
						$('.additionBox').keyup(function () {
						calculate();
						});
						});
						//Kontrollerar inmatningen och beräknar upphöjt till av de två inmatade värdena
						function calculate() {
						var number1 = document.getElementById('number1').value;
						var number2 = document.getElementById('number2').value;
						global = [number1, number2];
						//Kontrollerar att global[] endast innehåller siffror
						for (var i = 0; i > global.length; i++) {
						global[i] = global[i].match(/[0-9]/g);
						}
						//Skriver tillbaks den tvättade strängen till textboxarna
						document.getElementById('number1').value = global[0];
						document.getElementById('number2').value = global[1];
						power();
						}
						function power() {
						//beräknar global[0] upphöjt till global[1]
						var result = Math.pow(global[0], global[1]);
						document.getElementById('sum').value = result;
						}