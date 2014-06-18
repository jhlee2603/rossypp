jWidget.prototype.musicPlayer=function(){
	var chk=false;
	var ox, oy, nf;
	var mp=cf.mkTag("div",document.body);
	cf.setCss(mp,{
		backgroundColor:"white",
		position:"fixed",
		top:250+"px",
		left:550+"px",
		width:250+"px",
		height:350+"px",
		border:"1px solid gray"
	});

	var hdr=cf.mkTag("div",mp);
	cf.setCss(hdr,{
		height:20+"px",
		paddingLeft:10+"px",
		paddingTop:5+"px",
		paddingBottom:5+"px",
		backgroundColor:"black",
		color:"white",
		fontWeight:"bold",
		fontSize:14+"px"
	});
	hdr.innerHTML="RossyPP Music Player v.1.0";
	
	var img=cf.mkTag("div",mp);
	cf.setCss(img,{
		height:100+"px",
		backgroundColor:"gray"
	});

	var prg=cf.mkTag("div",mp);
	cf.setCss(prg,{
		height:5+"px",
		backgroundColor:cf.blue
	});

	var btns=cf.mkTag("div",mp);
	cf.setCss(btns,{
		height:25+"px",
		backgroundColor:"black"
	});

	var lst=cf.mkTag("div",mp);
	cf.setCss(lst,{
		height:170+"px",
		backgroundColor:"gray",
		padding:10+"px",
		overflow:"auto"
	});
	
	var ado=new Audio();
	ado.addEventListener("ended",function(){
		adoCnt++;
		var n=cf.countClock(jW.arBg.length,adoCnt);
		RWS[n].onclick();
	});
	var adoCnt=0;
	var RWS=new Array();
	jW.arBg.trav(function(d,n){
		var name=getSongName(d);
		var rw=cf.mkTag("div",lst);
		cf.setCss(rw,{
			color:"white",
			fontSize:14+"px"
		});
		rw.innerHTML=cf.addzero(n+1)+". "+name;
		RWS.push(rw);

		rw.onmousemove=function(){
			this.style.backgroundColor="rgb(120,120,120)";
		};
		rw.onmouseout=function(){
			this.style.backgroundColor="";
		};
		rw.onclick=function(){
			RWS.trav(function(t,m){
				t.style.color="white";
			});
			this.style.color="yellow";
			adoCnt=n;
			ado.src=jW.arBg[n];
			ado.play();
		};
	});
	RWS[0].onclick();

	function getSongName(d){
		var sng=cf.getTail(d,9);
		sng=sng.split(".")[0].split("_");
		var abm=sng[0]*1+3-1, trk=sng[1]*1-1;
		return jW.album[abm].list[trk];
	};

	//event
	hdr.onmousedown=function(){
		chk=true;
		this.style.cursor="move";
	};
	hdr.onmousemove=function(){
		this.style.cursor=chk?"move":"pointer";
	};
	hdr.onmouseup=function(){
		chk=false;
	};
	
	document.body.onmousedown=function(e){
		var xy=cf.getEventPos(e,this);
		nf=cf.getxywhfromdiv(mp);
		ox=xy.x, oy=xy.y;
	};	
	document.body.onmousemove=function(e){
		if(ox==undefined||chk==false) return false;
		var xy=cf.getEventPos(e,this);
		var dx=xy.x-ox, dy=xy.y-oy;
		mp.style.left=(nf.x+dx)+"px";
		mp.style.top=(nf.y+dy)+"px";
	};
	document.body.onmouseup=function(e){
		var xy=cf.getEventPos(e,this);
		ox=undefined, oy=undefined;
		nf=undefined, chk=false;
	};
};
