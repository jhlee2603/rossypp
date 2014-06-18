/*Object.prototype.bg=function(clr){
	this.style.backgroundColor=clr;
};
Object.prototype.ttl=function(str){
	this.innerHTML=str;
};
Object.prototype.img=function(str){
	this.style.background="url("+str+") no-repeat";
};*/

var cf=new jCommon();
var jW=new jWidget();

var nf=cf.getWorkareaSize();

//back
var a=jW.callBackground({
	w:1000, h:0
});
cf.setCss(a, {
	backgroundImage: "url(/ros/img/rename_20120129.jpg)"
});

//jW.callBackgroundMusic();
//jW.musicPlayer();

//header
var hdr=jW.callHeader({
	p:a, h:80
});
cf.setCss(hdr, {
	background: "url(/ros/img/header.jpg) no-repeat"
});

var divInHdr=cf.mkTag("div",hdr);
cf.setCss(divInHdr, {
	position: "relative",
	height: "50px"
});

var clck=cf.mkAbsoluteDiv(880,10,100,30,divInHdr);
jW.callClock({
	p:clck,clr:"white", fontSize:25
});
var sldr=cf.mkAbsoluteDiv(670,15,200,20,divInHdr);
jW.callSlider({
	p:sldr, clr:"yellow"
});

var menuInHdr=cf.mkTag("div",hdr);
//menuInHdr.style.height=30+"px";
jW.callHeaderMenu({
	p:menuInHdr
});


//body
var bd=jW.callBody({
	p:a, h:667
});
cf.setCss(bd, {
	position: "relative",
	backgroundColor: "",
	background: "url(/ros/img/rename_20120129.jpg) no-repeat"
});

var blurInBody=cf.mkTag("div",bd);
cf.setCss(blurInBody, {
	//display: "inline-block",
	height: "", 
	backgroundColor: "rgba(255,255,255,0.9)", 
	paddingTop: "10px"
});
var t=cf.mkTable(1,2,blurInBody);
cf.setCss(t.cells[0][0],{
	width:780+"px",
	textAlign:"left"
});
cf.setCss(t.cells[0][1],{
	//width:200+"px",
	verticalAlign:"top",
	textAlign:"left"
});

//board in body
var spt;
jW.jp("gboardreg.html","work=gp",function(d){
	spt=d.split("|");
	t.cells[0][0].bn="<b>ROSSYPP MAKING BOARD</b>";
	jW.mkBoard("ros_undercon",t.cells[0][0]);
});

// rankup
var rightContent = cf.mkTag("div", t.cells[0][1]);
cf.setCss(rightContent, {
	verticalAlign:top,
	width: "200px"
});
jW.callRankup({
	p: rightContent
});

//footer
var ftr=jW.callFooter({
	p:a, h:50
});
cf.setCss(ftr, {
	position: "relative",
	backgroundColor: "gray",
	background: "url(/ros/img/footer.jpg) no-repeat"
});

var timer = cf.mkAbsoluteDiv(880,10,100,30,ftr);
jW.callClock({
	p: timer,
	clr: "white", 
	fontSize: 25
});

