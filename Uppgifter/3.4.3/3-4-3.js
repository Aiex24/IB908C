
//Lägger till attributet target="_blank" på alla länkar efter att DOM-en laddat klart
$( document ).ready(function() {
   $("a").attr('target', '_blank');
});

//Lägger till/tar bort .show till div
function toggleVisibility() {
    document.getElementById("dropdown-container").classList.toggle("show");
}

// Stänger diven med länkarna om man klickar någonstans utanför denna
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}