	


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
	//Byter ut bilden om man hoovrar över den
	$('#imageSwitchImage').hover(function () {
		$(this).attr('src', '../../Gesallprov/Resources/monkey.png');
	}, function () {
		$(this).attr('src', '../../Gesallprov/Resources/Planets2013.svg.png');
	});
