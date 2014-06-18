jWidget.prototype.callPhoto=function(obj){
	var m=cf.mkTag("div",obj.p);
	cf.setCss(m,{
		padding:5+"px",
		color:"white",
	});
	var s=cf.mkTag("div",m);
	cf.setCss(s,{
		backgroundColor:"rgb(230,230,230)"
	});
	
	var cols=new Array();
	for(var i=0;i<3;i++){
		var col=cf.mkTag("div",s);
		cf.setCss(col,{
			display:"inline-block",
			width:266+"px",
			color:"black",
			marginRight:i==2?0:15+"px",
			marginBottom:15+"px",
			verticalAlign:"top"
		});
		cols.push(col);
	}

	var arImg=new Array();
	jW.jp("uploadlist.html","",function(str){
		var ar=eval(str);
		ar.trav(function(d,n){
			var title=d[2], dsc=d[3];
			if(title=="") title=d[1];
			if(dsc=="") dsc="ROSSY PHOTO_"+d[0];
			new PHOTOBOX({
				//url:"../img/artwork/"+d,
				url:d[1],
				title:title,
				dsc:dsc
			});
			//arImg.push(d[1]);
		});
		/*
		arImg.trav(function(d,n){
			new PHOTOBOX({
				//url:"../img/artwork/"+d,
				url:d,
				title:d,
				dsc:"photo test"
			});
		});
		*/
	});


	function getShort(){
		var h, r, th;
		cols.trav(function(d,n){
			th=d.clientHeight;
			if(th==0){
				r=n;
				return true;
			}
			if(n==0){
				h=th;
				r=n;
			}else{
				if(th<h){
					h=th;
					r=n;
				}
			}	
		});
		return r;
	};
	function PHOTOBOX(obj){
		var dv=document.createElement("div");
		cf.setCss(dv,{
			backgroundColor:"white",
			marginBottom:15+"px"
		});	
		var img=new Image();
		img.src="../img/upload/thumbnail/"+obj.url;
		img.style.display="none";
		//img.style.width=266+"px";
		//img.style.height=cf.getRandom(200,500)+"px";
		img.onload=function(){
			//log(this.width, this.height);	
			var w=this.width*1, h=this.height*1, r;
			var ow=266, oh;
			this.width=ow;
			r=ow/w;
			this.height=h*r;

			cols[getShort()].appendChild(dv);
			img.style.display="block";
		};
		dv.appendChild(img);
		var ttl=cf.mkTag("div",dv);
		cf.setCss(ttl,{
			padding:10+"px",
			fontSize:14+"px",
			borderBottom:"1px solid gray",
			fontFamily:"Courier New",
			color:"rgb(100,100,100)",
			fontWeight:"bold",
			wordBreak:"break-all"
		});
		var dsc=cf.mkTag("div",dv);
		cf.setCss(dsc,{
			padding:10+"px",
			fontSize:14+"px",
			fontFamily:"Courier New",
			color:"gray"
		});
		ttl.innerHTML=obj.title;
		dsc.innerHTML=obj.dsc;
		
		dv.onclick=function(){
			var scr=cf.mkAbsoluteDiv(0,0,cf.workareawidth, cf.workareaheight,document.body);
			cf.setCss(scr,{
				position:"fixed",
				backgroundColor:"rgba(50,50,50,0.9)"
			});
			scr.onclick=function(){
				cf.killTag(scr);
			};
			var rt=1.1;
			var conw=cf.workareawidth/rt, conh=cf.workareaheight/rt;
			var con=cf.mkAbsoluteDiv(
					cf.workareawidth/2-conw/2,
					cf.workareaheight/2-conh/2,
					conw,
					conh,
					scr
				);
			cf.setCss(con,{
				backgroundColor:"white",
				//backgroundImage:"url("+obj.url+")"
				overflow:"auto"
			});
			var conImg=new Image();
			conImg.src="../img/upload/"+obj.url;
			conImg.style.display="none";
			con.appendChild(conImg);
			conImg.onload=function(){
				sizeImg(this,conw,true);
				this.style.display="block";	
			};
		};
	};
	function sizeImg(el,num,opt){
		var w=el.width*1, h=el.height*1, r;
		var ow=num-15, oh=num-15;
		if(opt) toWidth();
		else toHeight();
		function toHeight(){
			el.height=oh;
			r=oh/h;
			el.width=w*r;
		};
		function toWidth(){
			el.width=ow;
			r=ow/w;
			el.height=h*r;
		};	
	};
};
