Object.prototype.bg=function(clr){
	this.style.backgroundColor=clr;
};
Object.prototype.ttl=function(str){
	this.innerHTML=str;
};
Object.prototype.img=function(str){
	this.style.background="url("+str+") no-repeat";
};

var cf=new jCommon();
var jW=new jWidget();

var nf=cf.getWorkareaSize();

//back
var a=jW.callBackground({
	w:1000, h:0
});
a.style.backgroundImage="url(/ros/img/rename_20120129.jpg)";

//header
var hdr=jW.callHeader({
	p:a, h:80
});
//hdr.bg("gray");
hdr.img("/ros/img/header.jpg");
//hdr.ttl("HEADER");
var divInHdr=cf.mkTag("div",hdr);
divInHdr.style.position="relative";
divInHdr.style.height=50+"px";


var home=cf.mkAbsoluteDiv(0,0,150,50,divInHdr);
home.onclick=function(){
	location.href="http://www.rossypp.com/ros/html/index.html";
};

var clck=cf.mkAbsoluteDiv(880,10,100,30,divInHdr);
jW.callClock({
	p:clck,clr:"white", fontSize:25
});
var sldr=cf.mkAbsoluteDiv(670,15,200,20,divInHdr);
jW.callSlider({
	p:sldr, clr:"yellow"
});
/*
var menuInHdr=cf.mkTag("div",hdr);
//menuInHdr.style.height=30+"px";
jW.callHeaderMenu({
	p:menuInHdr
});
*/
//body
var bd=jW.callBody({
	p:a, h:667
});
bd.bg("");
bd.img("/ros/img/rename_20120129.jpg");
//bd.ttl("BODY");
var blurInBody=cf.mkTag("div",bd);
//blurInBody.style.height=500+"px";
blurInBody.style.backgroundColor="rgba(255,255,255,0.9)";
blurInBody.style.paddingTop=10+"px";




var prms=cf.getGet();
var numSub=prms.sub;


var bt=cf.mkTable(1,2,blurInBody);
var submenu=bt.cells[0][0];
var submain=bt.cells[0][1];

submenu.style.width=150+"px";
submenu.style.textAlign="left";
submenu.style.padding=5+"px";
submenu.style.verticalAlign="top";

var spt;
jW.menu[prms.main].sub.trav(function(d,n){
	var div=cf.mkTag("div",submenu);
	div.style.padding=5+"px";
	div.style.fontWeight="bold";
	div.innerHTML=d;
	div.onmousemove=function(){
		this.bg("rgb(220,220,200)");
	};
	div.onmouseout=function(){
		this.bg("");
	};
	div.onclick=function(){
		numSub=n;
		submain.innerHTML="";
		//blurInBody.innerHTML=jW.menu[prms.main].name+">>"+jW.menu[prms.main].sub[prms.sub];
		if(prms.main==3||prms.main==5) callBoard();
		if(prms.main==0&&n==1) 
			jW.callPhoto({
				p:submain
			});
		if(prms.main==0&&n==2) jW.callUpload(submain);
	};
});
if(prms.main==3||prms.main==5) callBoard();
if(prms.main==0&&prms.sub==1) 
	jW.callPhoto({
		p:submain
	});
if(prms.main==0&&prms.sub==2) jW.callUpload(submain);

//board in body
submain.style.textAlign="left";
function callBoard(){
	jW.jp("gboardreg.html","work=gp",function(d){
		spt=d.split("|");
		submain.bn="<b>ROSSYPP "+jW.menu[prms.main].sub[numSub]+"</b>";
		jW.mkBoard("ros_"+jW.menu[prms.main].sub[numSub],submain);
	});
};

//footer
var ftr=jW.callFooter({
	p:a, h:50
});
ftr.style.position = "relative";
ftr.bg("gray");
ftr.img("/ros/img/footer.jpg");
/*
jW.callClock({
	p: timer,
	clr: "white", 
	fontSize: 25
});
*/
//ftr.ttl("FOOTER");

