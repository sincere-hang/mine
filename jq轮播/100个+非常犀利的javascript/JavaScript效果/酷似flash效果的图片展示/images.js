<!--
// ====================================================

window.onerror = new Function("return true");
screen.bufferDepth = 16;
document.onselectstart = function () { return false; }

////////////////////////////
var NX     = 3;
var NY     = 3;
var SP     = 20;
var DELAY  = 96;
////////////////////////////

var object = new Array();
var nI     = 0;
var run    = false;
var xrun   = 0;
var dR     = 1;
var iW     = 0;
var iH     = 0;
var oH     = 0;
var oW     = 0;

function CObj(N,y,x){

 this.obj = document.createElement("span");
 this.obj.onclick = new Function("object["+N+"].GE1()");
 this.obj.onmousedown = new Function("return false;");
 this.obj.style.cursor = "pointer";
 this.obj.style.position = "absolute";
 this.img = document.createElement("img");
 this.img.style.position = "absolute";
 this.img.src = IMGSRC[N%nI].src;
 this.obj.appendChild(this.img);
 IMGBOX.appendChild(this.obj);

 this.object = new Array();
 this.x      = x;
 this.y      = y;
 this.N      = N;
 this.W      = 0;
 this.H      = 0;
 this.L      = 0;
 this.T      = 0;

 function CImg(Parent,y,x){
  this.Parent = Parent;

  this.obj = document.createElement("span");
  this.obj.style.position="absolute";
  this.obj.style.overflow="hidden";
  this.obj.style.cursor = "pointer";
  this.img = document.createElement("img");
  this.img.style.position = "absolute";
  this.img.src = IMGSRC[N%nI].src;
  this.obj.appendChild(this.img);
  this.Parent.obj.appendChild(this.obj);

  this.N   = Parent.N;
  this.x   = x;
  this.y   = y;
  this.W   = 0;
  this.H   = 0;
  this.L   = 0;
  this.T   = 0;
  this.dx  = 0;
  this.dy  = 0;
  this.px  = 0;
  this.py  = 0;
  this.dw  = 0;
  this.dh  = 0;
  this.pw  = 0;
  this.ph  = 0;
  this.ipx = 0;
  this.ipy = 0;
  this.idx = 0;
  this.idy = 0;

  this.GE2 = function (){
   with(this){
    px -= dx * dR;
    py -= dy * dR;
    pw += dw * dR;
    ph += dh * dR;
    ipx -= idx * dR;
    ipy -= idy * dR;

    with(obj.style){
     left   = Math.round(px);
     top    = Math.round(py);
     width  = Math.round(pw)+1;
     height = Math.round(ph)+1;
     if(dR==-1)if(pw<=W+1)obj.style.visibility="hidden";
    }

    with(img.style){
     left   = Math.round(ipx-oW);
     top    = Math.round(ipy-oH);
    }

    if(++xrun>=NX*NY*SP){
     xrun=0;
     run=false;
     if(dR==-1)Parent.obj.style.zIndex = 0;
     dR = -dR;
    }
   }
  }

  this.GE1 = function (N1,N2){
   with(this){
    if(dR==1){
     px  = L;
     py  = T;
     dx  = ((Parent.L + L) - (x * Parent.W)) / SP;
     dy  = ((Parent.T + T) - (y * Parent.H)) / SP;
     pw  = W;
     ph  = H;
     dw  = (Parent.W - W) / SP;
     dh  = (Parent.H - H) / SP;
     ipx = -L;
     ipy = -T;
     idx = ((x * Parent.W) - L) / SP;
     idy = ((y * Parent.H) - T) / SP;
    }
    obj.style.visibility="visible";
    if(img.height>document.body.offsetHeight)oH=(img.height-document.body.offsetHeight)/2; else oH = 0;
    if(img.width>document.body.offsetWidth/2)oW=(img.width-(document.body.offsetWidth/2))/2; else oW = 0;
    for(i=0;i<SP;i++) setTimeout("object["+N1+"].object["+N2+"].GE2()",16*i);
   }
  }

  this.DOOT = function (){
   with(this){
    W =  Parent.W  / NX;
    H =  Parent.H / NY;
    L =  x * W;
    T =  y * H;
   }
  }
 }

 var  k = 0;
 for(var i=0;i<NY;i++)
  for(var j=0;j<NX;j++)
   this.object[k++] = new CImg(this,i,j);

 this.GE1  = function (){
  with(this){
   if(!run){
    TXTBOX.innerHTML = "<div style='margin:2%'>"+TXTSRC[N%nI].innerHTML+"</div>";
    run = true;
    obj.style.zIndex = 1;
    for(var i=0;i<NX*NY;i++) setTimeout("object["+N+"].object["+i+"].GE1("+N+","+i+")",i*DELAY);
   }
  }
 }

 this.DOOT = function (){
  with(this){
   if(img.width<iW)iW=img.width;
   if(img.height<iH)iH=img.height;
   with(obj.style){
    W = width  = iW  / NX;
    H = height = iH / NY;
    L = left   = x * W;
    T = top    = y * H;
   }
   with(img.style){
    width  = W;
    height = H;
   }
   for(var i in object) object[i].DOOT();
  }
 }
}


onload = function() {
 IMGSRC = document.getElementById("imgsrc").getElementsByTagName("img");
 TXTSRC = document.getElementById("txtsrc").getElementsByTagName("div");
 IMGBOX = document.getElementById("imgbox");
 TXTBOX = document.getElementById("txtbox");
 CENTER = document.getElementById("center");
 iH = document.body.offsetHeight;
 iW = document.body.offsetWidth/2;
 nI = IMGSRC.length;
 var k = 0;
 for(var i=0;i<NY;i++){
  for(var j=0;j<NX;j++){
   object[k] = new CObj(k,i,j);
   object[k++].DOOT();
  }
 }
 IMGBOX.style.width  = iW;
 IMGBOX.style.height = iH;
 TXTBOX.style.width  = iW;
 TXTBOX.style.height = iH;
 TXTBOX.style.left   = iW;
 TXTBOX.style.visibility="visible";
 CENTER.style.left   = -iW;
 CENTER.style.top    = -iH/2;
}
//-->