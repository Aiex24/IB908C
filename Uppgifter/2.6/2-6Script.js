//Lägger till click-funktion till div
$('.div-button').click(function () {
var table = document.getElementById('toggle-table-layout');
var button = document.getElementById('buttonCSS');
var buttonlabel = button.innerHTML;

//Togglar vilken class som ska sättas på table
if (buttonlabel === 'Fixed') {
//Ersätter nuvarande class som har CSS kopplat till sig med en ny class
table.className = table.className.replace('table-layout-auto', 'table-layout-fixed');
table.caption.innerHTML = 'Table med table-layout fixed';
button.innerHTML = 'Auto';
}
else {
table.className = table.className.replace('table-layout-fixed', 'table-layout-auto');
table.caption.innerHTML = 'Table med table-layout auto';
button.innerHTML = 'Fixed';
}
});