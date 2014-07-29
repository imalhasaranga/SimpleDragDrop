


$.fn.SimpleDragDrop = function(options) {

	var dragableitem = $(this);
	var dropzone = options.dropClass ? $("."+options.dropClass) : options.dropClass;
	var dropzonethreshold = options.dropthreshold ? options.dropthreshold : 0 ;
	initJqDragEvents(dragableitem,dropzone,dropzonethreshold);


 function saystartmove(cssleft, csstop){
 	cssleft = parseFloat(cssleft);
  	csstop = parseFloat(csstop);
 	if(options.onstart){
 		options.onstart({left : cssleft, top: csstop});	
 	}
 }

 function sayonmoving(cssleft, csstop){
 	cssleft = parseFloat(cssleft);
  	csstop = parseFloat(csstop);
 	if(options.onmove){
 		options.onmove({left : cssleft, top: csstop});	
 	}
 }

  function saymovestop(cssleft, csstop){
  	cssleft = parseFloat(cssleft);
  	csstop = parseFloat(csstop);
 	if(options.onstop){
 		options.onstop({left : cssleft, top: csstop});	
 	}
 }

 function saydropped(movingobject, target){
 	if(options.ondropped){
 		options.ondropped({draggingobject : movingobject, droppingzone: target});	
 	}
 }

	   
 function initJqDragEvents(dragableitem1,dropzone1,dropzonethreshold1){
	 dragableitem = dragableitem1;
	 dropzone = dropzone1;
	 dropzonethreshold = dropzonethreshold1;

	var startpoX,startpoY,leftcss,topcss,movingdiv;

	  dragableitem.on("touchstart",function(e){
	        e.preventDefault();
	        var touchobject = e.originalEvent.targetTouches[0];
	        startpoX = parseFloat(touchobject.clientX);
	        startpoY = parseFloat(touchobject.clientY);
	        leftcss  = parseFloat($(this).css("left"));
	        topcss   = parseFloat($(this).css("top"));
	        saystartmove(leftcss,topcss);
	  });

	  dragableitem.on("touchmove",function(e){
	        e.preventDefault();
	        movingdiv = $(this);
	        var touchobject = e.originalEvent.targetTouches[0];
	        var distX = parseFloat(touchobject.clientX) - startpoX;
	        var distY = parseFloat(touchobject.clientY) - startpoY;
	       $(this).css({ left : distX+leftcss , top : distY+topcss });
	       sayonmoving(distX+leftcss , distY+topcss);
	  });

	  dragableitem.on("touchend",function(e){
	    e.preventDefault();
	    saymovestop($(this).css("left") , $(this).css("top"));
	    hanldeDrop($(this), dropzone);

	  });
	  
	    var elementob;
	    var leftclickdivX;
	    var rightclicdivY;
	    var startingposmousex;
	    var startingposmousey;
	    var lockdata = false;
	    var startingmouseposX;
	    var startingmouseposY

	    $(document.body).on("mousemove", function(e) {
	        if (elementob) {
	            if(!lockdata){
	              startingmouseposX =  e.pageX;
	              startingmouseposY =  e.pageY;
	              lockdata = true;
	            }

	            var diffx = (e.pageX - startingmouseposX);
	            var diffy = (e.pageY - startingmouseposY);
	            elementob.css({ "left" : leftclickdivX+diffx , "top" : rightclicdivY+diffy });
	            saystartmove(leftclickdivX+diffx,rightclicdivY+diffy);
	        }
	    });

	    $(document.body).on("mousedown", dragableitem.get(0), function (e) {
	        elementob = $(e.target);
	        leftclickdivX = parseInt(elementob.css("left"));
	        rightclicdivY = parseInt(elementob.css("top"));
	        saystartmove(leftclickdivX,rightclicdivY);
	    });

	    $(document.body).on("mouseup", function (e) {
	       if (elementob) {
	       		saymovestop(elementob.css("left") ,elementob.css("top"));
	        	hanldeDrop(elementob, dropzone);
	        	elementob = null;
	        	lockdata = false;
	      }
	       
	    });
	}


	function hanldeDrop(movingobject, droppablezone){
			

		var mvX = movingobject.offset().left;
	    var mvY = movingobject.offset().top;
	    var realX = droppablezone.offset().left;
	    var realY = droppablezone.offset().top;
	    var threshold = dropzonethreshold;

	    var topx = realX-threshold;
	    var topy = realY-threshold;
	    var endboundryX = topx+parseFloat(droppablezone.css("width")+(2*threshold));
	    var endboundryY = topx+parseFloat(droppablezone.css("height")+(2*threshold));

	    var obtopx = mvX;
	    var obtopy = mvY;
	    var obbotx = obtopx+parseFloat(movingobject.css("width")+(2*threshold));
	    var obboty = obtopy+parseFloat(movingobject.css("height")+(2*threshold));

	    var istopedgeisInside = ((topx <= obtopx) && (topy <= obtopy));
	    var isbottomedgeisInside = ((endboundryX >= obbotx) && (endboundryY >= obboty));

	    if(istopedgeisInside && isbottomedgeisInside){
	     	console.log("dropped");
	     	saydropped(movingobject , droppablezone);
	      
	    }


	}


	    return this;
}


	 
