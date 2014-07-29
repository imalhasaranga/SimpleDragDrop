## Touch friendly Drag and Drop Component

You can use this component for very small drag and drop requirments and situations where you do not want to 
add JQuery-UI,
this light weight Component basically support for both touch drag and drop as well as mouse drag and drop


###Usage 

linking script files 

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script type="text/javascript" src="SimpleDrag.js"></script>
```

Initializing 

```html

$(".dragme").SimpleDragDrop(
			{
				"dropClass" : "dropzone",
				"dropthreshold" : 20,
				"onstart" :onstartmove,
				"onmove" : onmove,
				"onstop" : onmovestop,
				"ondropped" : ondropped
			}
);

```


###Here is an Example 

```html
<html>
	<head>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script>
	 	<script type="text/javascript" src="SimpleDragDrop.js"></script>
	</head>
	<body>
		<!--Dragging item -->
		<div class="dragme" style="width:100px; height:100px; background:red; position: absolute; top: 10px; left: 10px; z-index:100"></div>
		<!--Dropping item-->
		<div class="dropzone" style="position: absolute; top: 500px; left: 500px; width:300px; height:300px; background:green"></div>

	</body>

<script>

$(function(){
	$(".dragme").SimpleDragDrop(
			{
				"dropClass" : "dropzone",
				"dropthreshold" : 20,
				"onstart" :onstartmove,
				"onmove" : onmove,
				"onstop" : onmovestop,
				"ondropped" : ondropped
			}
	);

	function onmove(e){
		console.log(e.left +" "+e.top);
	}

	function onstartmove(e){
		console.log(e.left +" "+e.top);
	}

	function onmovestop(e){
		console.log(e.left +" "+e.top);
	}

	function ondropped(objs){
		var movingob = objs.draggingobject;
		var dropzone = objs.droppingzone;
		dropzone.css("background", "yellow");
	}

});

</script>

</html>



</html>

```