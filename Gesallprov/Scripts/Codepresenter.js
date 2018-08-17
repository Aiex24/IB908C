//CodepresenterScript
//Script för att visuellt presentera kod så som det ser ut i Visual Studio 2017 Dark Theme
//Kräver [jQuery], [Codepresenter.js], [Codepresenter.css]
//Alexander Krasse 2018
//Webbprogrammering - Klientsidan DSV

//Körs när sidan har laddats klart
window.addEventListener('load', function () {
	//Bygger behållaren för som innehåller de olika kodsektionerna
	createCodepresenterContainer();
	//Anropar funktioner där divar vars innehåll skall omvandlas till kodutseende
	parseCode('codepresenter-HTML');
	parseCode('codepresenter-CSS');
	parseCode('codepresenter-JavaScript');
});

//Letar upp alla divar med class "codepresenter" och skapar ett grundutseende på dessa
function createCodepresenterContainer() {
	var parent = document.getElementsByClassName('codepresenter');
	for (var i = 0; i < parent.length; i++) {
		var node = parent[i];
		var parentcode = '';
		var childelements = node.children;
		var labeltext = '';
		var elementType;
		var resultBackground;
		//Skapar nya divar beroende på vilken sorts kod som har angivits

		var collectionDiv = document.createElement("div");
		for (var j = 0; j < childelements.length; j++) {
			switch (childelements[j].className) {
				case 'codepresenter-html':
					labeltext = 'HTML';
					break;
				case 'codepresenter-resultat':
					labeltext = 'Resultat';
					break;
				case 'codepresenter-css':
					labeltext = 'CSS';
					break;
				case 'codepresenter-js':
					labeltext = 'JavaScript';
					break;
				default:
					labeltext = '';
					break;
			}
			var text = childelements[j].innerHTML;
			//Tar bort taggar som ska skrivas ut som tecken och inte som kod i html. Resultatrutan ska behålla taggarna
			if (labeltext !== 'Resultat') {
				if (labeltext !== 'JavaScript') {
				text = replaceAll(text, '<', '&lt;');
				text = replaceAll(text, '>', '&gt;');
				}
				resultBackground = '';
			}
			//class för resultat så en egen CSS egenskap anropas
			else {
				resultBackground = 'Res';
			}

			//Bygger utseendet på den nya behållaren för koden (skapar nya divar med olika class-namn som anropar CSS)
			var name = "codepresenter-container";
			if (resultBackground != '') {
				name += resultBackground;
			}

			var outerDiv = createElement("div", name, "");
			var middleDiv = createElement("div", "codepresenter-menu", "");
			var innerDiv = createElement("div", labeltext + "-example", labeltext);

			middleDiv.appendChild(innerDiv);
			outerDiv.appendChild(middleDiv);

			var sourceDiv = createElement("div", "codepresenter-source", "");
			var typeDiv = createElement("div", "codepresenter-" + labeltext, text);

			sourceDiv.appendChild(typeDiv);
			outerDiv.appendChild(sourceDiv);

			collectionDiv.appendChild(outerDiv);

		}
		node.innerHTML = ""; //Tar bort det gamla innehållet
		node.appendChild(collectionDiv); //Lägger till de nya elementen
	}
}

//Plockar ut allt innehåll för divar med ett specifikt namn. Beroende på namnet anropas funktioner som sätter olika färger
//på innehållet
function parseCode(className) {
	var node = document.getElementsByClassName(className);
	//Utförs för alla divar med classen "className"
	for (var i = 0; i < node.length; i++) {
		//Plockar ut all kod som finns i diven
		var text = node[i].innerHTML;
		//Lagrar varje rad text som finns i diven i en array
		var arr = text.split('\n');
		//Lägger till den uppdaterade texten till html-dokumentet och
		node[i].innerHTML = ""; //Tar bort det gamla innehållet

		//Skriver tillbaks det behandlade innehållet till diven. 
		//Beroende på om det rör sig om HTML, CSS eller JS anropas olika funktioner
		switch (className) {
			case 'codepresenter-HTML':
				node[i].appendChild(IdeAppearanceHTML(arr));
				break;
			case 'codepresenter-CSS':
				node[i].appendChild(IdeAppearanceCSS(arr));
				break;
			case 'codepresenter-JavaScript':
				node[i].appendChild(IdeAppearanceJavaScript(arr));
				break;
			default:
				break;
		}
	}
}

// Tar emot en string(text) där alla ord(find) i en medskickad string(text) ersätts med den string(replace)  man skickat med
function replaceAll(text, find, replacement) {
	return text.replace(new RegExp(find, 'g'), replacement); // g = global match
}
var tests = 0;

//Metod som returnerar om raden innehåller fler öppningstaggar än stängningstaggar eller vice versa (används för att beräkna indragning för HTML)
function calculateIndent(row) {
	var tagDifference = 0;
	if (row !== null) {
		var singletonTagsArr = ['&lt;br&gt;', '&lt;wbr&gt;'];

		var woSingletonString;
		var totalTags = 0;
		var selfClosingTag = 0;
		var closingTag = 0;
		woSingletonString = row;
		//Tvättar bort alla singleton-taggar vid beräkning av indent eftersom dessa ej påverkar indent
		for (var index = 0; index < singletonTagsArr.length; index++) {
			woSingletonString = replaceAll(woSingletonString, singletonTagsArr[index], '###');
		}

		//Om det inte finns några singletontaggar sätts variabeln till hela raden
		if (woSingletonString === undefined) {
			woSingletonString = row;
		}

		//Räknar antalet totala '<'
		var totalTags = woSingletonString.match(/&lt;.*?&gt;/g);
		if (totalTags !== null) {
			totalTags = totalTags.length;
		}

		//Räknar antalet <*/>
		var selfClosingTag = woSingletonString.match(/&lt;.*?\/&gt;/g);
		if (selfClosingTag !== null) {
			selfClosingTag = selfClosingTag.length;
		}

		//Räknar antalet </*>
		var closingTag = woSingletonString.match(/&lt;\/.*?&gt;/g);
		if (closingTag !== null) {
			closingTag = closingTag.length;
		}

		//Räknar differansen mellan start- och sluttaggar
		tagDifference = totalTags - 2 * selfClosingTag - 2 * closingTag;

		//Kontrollerar om indraget skall ökas eller minskas
		if (tagDifference < -1) {
			tagDifference = -1;
		}
		else if (tagDifference > 1) {
			tagDifference = 1;
		}
	}
	return tagDifference;
}

//Function för att dela upp texten i olika <span> med olika textfärg, för att efterlikna Visual Studio dark theme för HTML
function IdeAppearanceHTML(arr) {
	var container = createElement("code", "", "");
	if (arr !== null) {
		var comment = false;
		var indent = 0;
		//Tar bort ogiltiga tecken
		arr = cleanArray(arr);
		for (var i = 0; i < arr.length; i++) {
			

			if (i < arr.length && i != 0) {
				container.appendChild(createElement("br", "", ""));
			}

			//Räknar ut hur mycket indent raden skall ha. Om raden innehåller "{" skall NÄSTA rad indrag indrag ökas
			//om raden innehåller "}" skall NUVARANDE rad indrag minskas
			var tempIndent = calculateIndent(arr[i]);
			if (tempIndent < 0) {
				indent--;
				tempIndent = 0;
			}
			else if (tempIndent > 0) {
				tempIndent = 1;
			}
			container.innerHTML += nbspTab(indent);

			//Om raden är en kommentar sätts koden i ett <span> med grön färg 
			if (arr[i].includes('&lt;!--')) {
				container.appendChild(createElement("span", "HtmlCommentColor", arr[i]));
			}
			else {
				//Tar bort ="" som läggs till automatiskt av browsern för attribut som inte innehåller detta t.ex. required sätts till required=""
				arr[i] = replaceAll(arr[i], '=""', '');

				//RegEx 1. Splittar på allt inom och inklusiva '&lt;' och '&gt;'    2. Tar fram till  '&lt;'    3. Tar allt efter sista  '&gt;'
				//Exempel: Hej &lt;p&gt; mitten &lt;/p&gt; då!  splittas i 5 delar: 1. "Hej ", 2. "&lt;p&gt;", 3. " mitten " 4. &lt;/p&gt;, 5. " då!"
				var brackets = arr[i].match(/(&lt;).*?(&gt;)|.+?(?=&lt;)|.+/g);

				for (var j = 0; j < brackets.length; j++) {
					// //Om ett ord är en tagg

					if (brackets[j].startsWith('&lt;') && brackets[j].endsWith('&gt;')) {
						var endTag = '';
						// //Ersätter '</' med '<' för att läggas till i slutet för att lägga utanför <span> för taggar
						if (brackets[j].includes('&lt;/') || brackets[j].includes('/&gt;')) {
							endTag = '/';
							brackets[j] = brackets[j].replace('/', '');
						}

						// //Tvättar bort taggar eftersom dessa skall ha en egen färg
						brackets[j] = brackets[j].replace('&lt;', '');
						brackets[j] = brackets[j].replace('&gt;', '');

						//Lägger till "mindre än" symbol i mörkgrått
						container.appendChild(createElement("span", "HtmlBracket", "&lt;"));

						//Delar upp taggar i elementnamn, attribut och value
						var bracketWords = brackets[j].match(/("[^"]*")|[^" ]+/g);
						//Första positionen innehåller alltid element-namn
						container.appendChild(createElement("span", "HtmlElementColor", bracketWords[0]));

						//Skriver ut attribut-namn och value i respektive färger
						for (var k = 1; k < bracketWords.length; k++) {
							if (bracketWords[k].includes('"') === true) {
								container.appendChild(createElement("span", "HtmlTextColor", "=" + bracketWords[k]));
							}
							else {
								bracketWords[k] = bracketWords[k].replace('=', '');
								container.appendChild(createElement("span", "HtmlAttributeColor", " " + bracketWords[k]));
							}
						}
						//Lägger till "större än"-symbol i mörkgrått
						container.appendChild(createElement("span", "HtmlBracket", "&gt;"));
					}
					else {
						//Lägger till vanlig text
						container.appendChild(createElement("span", "HtmlTextColor", brackets[j]));
					}
					// arr[i] = brackets.join('');
					// arr[i] = nbspTab(indent) + arr[i];
					indent += tempIndent;
				}
			}
		}
	}
	return container;
}

//Function för att dela upp texten i olika <span> med olika textfärg, för att efterlikna Visual Studio dark theme för CSS
function IdeAppearanceCSS(arr) {
	var comment = false;
	var row = '';
	var indent = 0;
	//Tar bort ej utskrivbara tecken förutom space
	arr = cleanArray(arr);

	var container = createElement("code", "", "");

	for (var i = 0; i < arr.length; i++) {
		var indentTemp = 0;


		if (i < arr.length && i != 0) {
			container.appendChild(createElement("br", "", ""));
		}
		//Kontrollerar om det finns en  kommentar
		if (arr[i].includes('/*') || arr[i].includes('*/') || comment === true) {
			var commentSpan = createElement("span", "CssCommentColor", arr[i]);
			if (arr[i].includes('/*')) {
				comment = true;
			}
			if (arr[i].includes('*/')) {
				comment = false;
			}
			container.appendChild(commentSpan);
		}

		// //Om raden inte är en kommentar
		else if (comment === false) {

			//Sätter värdet på indraget
			if (arr[i].includes('{')) {
				indentTemp = 1;
			}
			if (arr[i].includes('}')) {
				indent--;
				indentTemp = 0;
			}
			container.innerHTML += nbspTab(indent);
			indent += indentTemp;
			arr[i] = arr[i].replace(';', '');
			//Om raden innehåller ett nyckelord som tex @media eller @import
			if (arr[i].includes('@') || arr[i].includes('&#64;')) {
				row = arr[i].split(' ');

				for (var j = 0; j < row.length; j++) {
					if (row[j].includes('@') || row[j].includes('&#64;')) {
						container.appendChild(createElement("span", "CssKeywordColor", row[j] + " "))
					}
					else if (row[j].startsWith('(') === true) {
						row[j] = row[j].replace('(', '');
						row[j] = row[j].replace(':', '');
						container.appendChild(createElement("span", "CssTextColor", "("));
						container.appendChild(createElement("span", "CssPropertyColor", row[j]));
						container.appendChild(createText(":"));
					}
					else if (row[j] === "{") {
						container.appendChild(createText("{"));
					}
					else {
						row[j] = row[j].replace(';', '');
						container.appendChild(createElement("span", "CssTextColor", row[j]));
					}
					if (j < row.length - 1) {
						container.appendChild(createText(" "));
					}
					else if (row[j] != "{") {
						container.appendChild(createText(";"));
					}
				}
			}

			//Sätter färg för rad med property
			else {
				if (arr[i].includes('{') === false && arr[i].includes('}') === false) {
					arr[i] = arr[i].replace(';', '');
					row = arr[i].split(':');
					//Använder string-färg på fonter som angetts som string annars sätts färgen till CSSText-färg
					var colorClassName = row[0].includes('font-family') && row[1].includes("'") ? 'CssStringColor' : 'CssTextColor';

					container.appendChild(createElement("span", "CssPropertyColor", row[0]));
					container.appendChild(createText(":"));
					container.appendChild(createElement("span", colorClassName, row[1]));
					container.appendChild(createText(";"));
				}
				//sätter färg på rad med selektor
				else if (arr[i].includes('{') === true) {
					arr[i] = arr[i].replace('{', '');
					row = arr[i].split(',');
					for (k = 0; k < row.length; k++) {
						container.appendChild(createElement("span", "CssSelectorColor", row[k]));
						if (k < row.length - 1) {
							container.appendChild(createText(","));
						}
					}
					container.appendChild(createText(" {"));
				}
				else {
					container.appendChild(createText("}"));
					if (i < arr.length - 1) {
						container.appendChild(createElement("br", "", ""));
					}
				}
			}
		}
	}
	return container;
}

//Function för att dela upp texten i olika <span> med olika textfärg, för att efterlikna Visual Studio dark theme för JavaScript
function IdeAppearanceJavaScript(arr) {
	arr = cleanArray(arr);
	var container = createElement("code", "", "");

	var indent = 0;

	for (var i = 0; i < arr.length; i++) {
		//Lägger till radbrytning mellan varje rad
		if (i < arr.length && i != 0) {
			container.appendChild(createElement("br", "", ""));
		}

		//Delar upp raden i kod- respektive kommentars-del
		var codeAndComment = arr[i].match(/.+?(?=\/\/)|.+/g);
		var commentPart = '';
		var codePart = '';

		if (codeAndComment.length > 1) {
			codePart = codeAndComment[0];
			commentPart = codeAndComment[1];
		}
		else {
			if (!codeAndComment[0].startsWith('//')) {
				codePart = codeAndComment[0];
			}
			else {
				commentPart = codeAndComment[0];
			}
		}

		//Plockar ut strängar (oberoende av " eller ') och regex uttryck från koden
		var part = '';
		var sign = '';
		var stringOrRegex = false;
		var array = new Array();

		if (codePart != '') {
			codePart = replaceAll(codePart, '&lt;','<');
			codePart = replaceAll(codePart, '&gt;','>');
			//Kontrollerar varje tecken i raden
			for (x = 0; x < codePart.length; x++) {
				//delar upp raden i string, regex och övrigt (obs! string kan antingen startas med " eller ')
				if (stringOrRegex === false) {
					if (codePart[x] == '\/' || codePart[x] == "'" || codePart[x] == '"') {
						if (part != '') {
							part = part.match(/[^\W_]+|[\W_]+|[&]/g);
							array = array.concat(part);
						}
						part = codePart[x];
						sign = codePart[x];
						stringOrRegex = true;
					}
					else {
						part += codePart[x];
					}
				}
				else {
					part += codePart[x];
					//Om man träffade på en likadan char som startade en string dvs antingen " eller ', eller ett regexuttryck
					if (codePart[x] == sign) {
						//Kontrollerar om man träffade på ett likadant tecken som startade uttrycket och att det inte rör sig
						//om escape-uttryck i regex
						if ((sign == '"' || sign == "'") || (sign == '/' && codePart[x - 1] != '\\')) {
							stringOrRegex = false;
							//Lägger till string/regex till arrayen
							if (part != '') {
								array.push(part);
							}
							part = '';
						}

						//Om det är ett regexuttryck så bryts även flaggorna ut i en egen array-del
						if (sign == '/' && codePart[x - 1] != '\\') {
							var run = true;
							x++;
							while (run) {
								if (x < codePart.length) {
									if (codePart[x] == 'g' || codePart[x] == 'm' || codePart[x] == 'i') {
										part += codePart[x];
										x++;
									}
									else {
										run = false;
										x--;
									}
								}
								else {
									run = false;
									x--;
								}
							}
							//Lägger till regex-flaggorna, adderar en string så att flaggan kan skrivas ut i rätt färg
							//senare och inte blandas ihop med variabelnamn
							if (part != '') {
								array.push('/flag/' + part);
								part = '';
							}
						}
					}
				}
			}

			//Lägger till slutet av raden
			if (part != '') {
				part = part.match(/[^\W_]+|[\W_]+/g);
				array = array.concat(part);
			}

			//Avgör hur indraget skall se ut, om raden innehåller avslutningstecken skall indraget för nuvarande rad minskas. Om raden innehåller starttecken
			//skall indraget vara oförändrat för nuvarande rad men ökas för nästa.
			var tempIndent = 0;
			if (codePart != 'undefined') {
				if (codePart.includes('{')) {
					tempIndent = 1;
				}
				else if (codePart.includes('}')) {
					indent--;
				}
			}
			//Lägger till indraget till raden
			container.innerHTML += nbspTab(indent);

			for (j = 0; j < array.length; j++) {
				var classColorName = '';
				var reservedWords = ['function', 'var', 'if', 'else', 'for', 'null', 'return', 'false', 'true', 'new', 'case', 'break', 'switch'];
				var regexFlags = ['g',];
				if (array[j] != 'undefined') {
					if (array[j].startsWith('"') || array[j].startsWith("'")) {
						classColorName = 'JsStringColor';
					}

					else if (array[j].startsWith('/')) {
						if (array[j].startsWith('/flag/') === true) {
							array[j] = array[j].replace('/flag/', '');
							classColorName = 'JsKeyWordColor';
						}
						else {
							classColorName = 'JsRegExColor';
						}
					}

					else if (reservedWords.indexOf(array[j]) > -1) {
						classColorName = 'JsKeyWordColor';
					}

					//Om ordet endast består av siffror (ej infinity) sätts textfärgen till ljusgrön
					else if (isNumber(array[j])) {
						classColorName = 'JsNumberColor';
					}
					container.appendChild(createElement("span", classColorName, array[j]));
				}
			}
			indent += tempIndent;
		}
		else {
			container.innerHTML += nbspTab(indent);
		}
		container.appendChild(createElement("span", "JsCommentColor", commentPart));
	}
	return container;
}

//Ersätter alla tecken som ligger utanför "space" och "tilde" med en <br>-tagg om man vill använda tab i textfältet kan man använda sig av {tab} som automatiskt lägger till ett span med padding
function removeSpecialChars(arr) {
	if (arr !== null) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].match(/[^\x20-\x7E]/gmi)) {
				arr[i] = '<br>';
			}
		}
	}
	return arr;
}

//Kontrollerar om den medskickade strängen endast innehåller tecken mellan space och tilde och åäö
function containsChars(string) {
	return string.match(/[^\x20-\x7E-äöå]/g);
}

//Kontrollerar om det inskickade värdet är ett ändligt nummer
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

//Tar in en array och returnerar en array utan ej utskrivbara tecken
function cleanArray(arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].replace(/[^\x20-\x7E-äöå]/g, ''); //Tecken föutom de från space till tilde och åäö behålls
		if (arr[i] !== '') {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

//Lägger till ett span med padding för att simulera ett tab-indrag
function spanTab(times) {
	var stringTab = '';
	for (var i = 0; i < times; i++) {
		stringTab += '<span class="tab"></span>';
	}
	return stringTab;
}

//Lägger till nbsp för att simulera ett tab-indrag
function nbspTab(times) {
	var stringTab = '';
	for (var i = 0; i < times; i++) {
		stringTab += '&nbsp;&nbsp;&nbsp;';
	}
	return stringTab;
}

//Skapar ett element av typen "type" med class-namnet "cName och innehållet "content"
function createElement(type, cName, content) {
	var element = document.createElement(type);
	if (cName != "") {
		element.className = cName;
	}
	if (content != "") {
		element.innerHTML += content;
	}
	return element;
}

//Skapar en textnode
function createText(text) {
	return document.createTextNode(text);
}