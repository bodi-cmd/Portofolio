function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

img1 = new Array();

function preload(i){
    img1[i] = new Image();
    var url = "./img/Cadre_sportier/sportier";
    if(i<=9) url=url +"000"
    if(i>=10&&i<=99) url=url +"00"
    if(i>=100&&i<=999) url=url +"0"
    url = url + i.toString(10);
    url = url+".png";
    img1[i].src = url;
   // console.log(1);
    sleep(100);
}
function binary_load(l,r){
    for(i=1;i<=Math.floor(Math.log2(r))+1;i++){
      //  console.log("i="+i);
        for(j=1;j<=Math.pow(2,i);j++){
      //      console.log("j="+j)
            preload(Math.floor(r/Math.pow(2,i)*j));
      //      console.log(1)
        }
    }
}
if (document.images) {
    preload(1);
    preload(120);
    binary_load(1,120);
}
