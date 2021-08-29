(function() {
  if ($(window).width() >1000) {
    // code for small viewports
    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {

      for(var i in data){

        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        var Xcoord=(Math.floor(((event.pageX-500)/(window.innerWidth-500))*90)+1)
       // console.log(Xcoord+"   "+ event.pageX+"   "+ window.innerWidth)
        if(Xcoord<=1)Xcoord=1;
        if(Xcoord>=90)Xcoord=90;
        var url_project = data[i].animation.url;
        if(Xcoord<=9){
          url_project=url_project +"000"
        }
        if(Xcoord>=10&&Xcoord<=99){
          url_project=url_project +"00"
        }
        if(Xcoord>=100&&Xcoord<=999){
          url_project=url_project +"0"

        }
          url_project = url_project + Xcoord.toString(10);
          url_project = url_project+data[i].animation.extension;
          if(document.getElementById(data[i].id))document.getElementById(data[i].id).src = url_project;

      }
    }
  }
  else{
        
    document.body.addEventListener("touchmove", checkscroll, false);



    function checkscroll(){

        var scroll = $(window).scrollTop();

        for(var i in data){

        // Do something
        //console.log(scroll - $("#blinkr").offset().top);
    
    
        var Xcoord=(Math.floor((scroll - $("#"+data[i].id).offset().top+800)/7));
        // console.log(Xcoord+"   "+ event.pageX+"   "+ window.innerWidth)
         if(Xcoord<=1)Xcoord=1;
         if(Xcoord>=120)Xcoord=120;
         var url_project = data[i].animation.url;
         if(Xcoord<=9){
          url_project=url_project +"000"
         }
         if(Xcoord>=10&&Xcoord<=99){
          url_project=url_project +"00"
         }
         if(Xcoord>=100&&Xcoord<=999){
          url_project=url_project +"0"
 
         }
         url_project = url_project + Xcoord.toString(10);
         url_project = url_project+data[i].animation.extension;
         if(document.getElementById(data[i].id))document.getElementById(data[i].id).src = url_project;
    
    
        }
    
      }


        
    }
  


})();