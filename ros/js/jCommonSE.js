(function(window){
	var jaehyun=function(str,p){
		if(p) return new jaehyun.prototype.a(str,p);
		else return new jaehyun.prototype.a(str);
	};
	jaehyun.prototype.a=function(str,p){
		if(typeof str =="string"){
			var a = document.getElementById(str);
			if(a){
			}else{
				var a = document.createElement("div");
				mkDefault();
				a.id=str;
				if(p!=undefined){
					p.appendChild(a);
				}
			}
		}else if(typeof str=="object"){
			var a = document.createElement("div");
			mkDefault();
			str.appendChild(a);
		}
		function mkDefault(){
			a.style.position="absolute";
			a.style.top=0+"px";
			a.style.left=0+"px";
			a.style.width=100+"px";
			a.style.height=50+"px";
			//a.style.backgroundColor="gray";
		};
		a.click=function(fnc){
			a.onclick=fnc;
		};
		a.css=function(jsn){
			var b=this.style.cssText;
			var str=";";
			for(var el in jsn){
				str+=getUpper(el)+":"+jsn[el]+";"
			}
			this.style.cssText=b+str;
		};
		function getUpper(str){
			var chars="abcdefghijklmnopqrstuvwxyz";
			for(var i=0,lng=str.length;i<lng;i++){
				if(chars.indexOf(str.charAt(i))==-1){
					//대문자일 경우(소문자집합인 chars랑 비교해서 겹치는 게 없으니 대문자임)
					var tp=str.split(str.charAt(i));
					tp=tp.join("-"+str.charAt(i).toLowerCase());
					return tp;
				}
			}
			return str;
		};
		return a;
	};
	//about NodeList
	var np=NodeList.prototype;
	np.trav=function(fnc){
		for(var i=0,lng=this.length;i<lng;i++){
			var a=fnc(this[i],i);
			if(a) break;
		}
	};
	//about HTMLCollection
	HTMLCollection.prototype.trav=function(fnc){
		for(var i=0,lng=this.length;i<lng;i++){
			var a=fnc(this[i],i);
			if(a) break;
		}
	};
	//about Array
	var ap=Array.prototype;
	ap.between=function(num,col){
		var min=0, max=this.length-1, status,
			cur=parseInt((max-min)/2)+min,
			l=this;
		
			if(num<this[min][col]){
				return {min:min, max:max, status:0}
			}
			if(num>this[max][col]){
				return {min:min, max:max, status:4}
			}
		
		
			match();
			return {min:min, max:max, status:status}
		function match(){
			if(num>l[cur][col]){
				min=cur;
				//log("it's bigger than "+l[cur][col]);
				//log(min, max);
			}else if(num<l[cur][col]){
				max=cur;
				//log("it's smaller than "+l[cur][col]);
				//log(min, max);
			}else if(num=l[cur][col]){
				min=cur;
				max=cur;
				//log("you got it ==> "+l[cur][col] + " on " + min);
				//log(min, max);
				status=1;
				return false;
			}
			var bt=max-min;
			cur=parseInt(bt/2)+min;
			if(bt<2){
				if(num==l[min][col]){
					//log(num+":: you got it on min :: "+min);
					status=1;
				}else if(num==l[max][col]){
					//log(num+":: you got it on max :: "+max);
					status=3;
				}else{
					//log("result :: " + min, max);
					status=2;
				}
				return false;
			}else{
				match();
			}
		};
	};
	ap.rev=function(){
		var l=this;
		var arr=new Array();
		while(this.length!=0){
			arr.push(this.pop());
		}
		arr.trav(function(d){
			l.push(d);
		});
	};
	ap.arrSum=function(){
		var arg=arguments.length, sum=0;
		var ag=arguments;
		if(arg==0){
			this.trav(function(d,n){
				sum+=d;
			});
		}else{
			sum=new Array();
			this.trav(function(d,n){
				for(var i=0;i<arg;i++){
					if(n==0) sum[i]=0;
					var num;
					typeof d[ag[i]]=="string"? num=d[ag[i]].split(",").join("")*1:num=d[ag[i]];
					sum[i]+=num;
				}
			});
		}
		return sum;
	};
	ap.cut=function(col,opt,lmt){
		var rslt=new Array(), sum=0;
		opt=="asc"?this.asc(col):this.desc(col);
		this.trav(function(d,n){
			n<lmt?rslt.push(d):sum+=d[col];
		});
		
		if(this.length<lmt){
			while(rslt.length<lmt){rslt.push([""]);}
		}else{	
			//rslt[lmt-1]=new Array();
			//rslt[lmt-1][0]="기타";
			//rslt[lmt-1][col]=sum/(this.length-lmt);
		}
		return rslt;
	};
	ap.log=function(){
		this.trav(function(d){
			log(d);
		});
	};
	ap.desc=function(col,opt){
		this.sort(function(a,b){
			if(typeof a[col]=="string") a[col]=a[col].toLowerCase();
			if(typeof b[col]=="string") b[col]=b[col].toLowerCase();
			var ac=opt?a[col]*1:a[col], bc=opt?b[col]*1:b[col];
			return (
			(ac>bc)?
				-1:
				((ac<bc)?1:0)
			)
		});
	};
	ap.asc=function(col,opt){
		this.sort(function(a,b){
			if(typeof a[col]=="string") a[col]=a[col].toLowerCase();
			if(typeof b[col]=="string") b[col]=b[col].toLowerCase();
			var ac=opt?a[col]*1:a[col], bc=opt?b[col]*1:b[col];
			return (
				(ac>bc)?
					((ac<bc)?0:1):
					-1
			)
		});
	};
	ap.getmax=function(col){
		var max,row;
		var len=this.length;
		if(col==undefined){
			col=3;
		}
		for(var i=0;i<len;i++){
			if(this[i][col]!="void"){
				if(max==undefined){
					row=i;
					max=this[i][col];
				}else{
					if(this[i][col]*1>max){
						row=i;
						max=this[i][col];
					}
				}
			}
		}
		if(max==undefined){
			return "void";
		}
		return {max:max*1,row:row};
	};
	ap.getmin=function(col){
		var min,row;
		var len=this.length;
		if(col==undefined){
			col=4;
		}
		for(var i=0;i<len;i++){
			if(this[i][col]!="void"){
				if(min==undefined){
					row=i;
					min=this[i][col]
				}else{
					if(this[i][col]*1<min){
						row=i;
						min=this[i][col]
					}
				}
			}
		}
		if(min==undefined){
			return "void";
		}
		return {min:min*1,row:row}
	};
	ap.getminmax=function(col){
		var a=this.getmin(col);
		var b=this.getmax(col);
		return {
			min:{
				val:a.min,
				row:a.row
			},
			max:{
				val:b.max,
				row:b.row
			}
		}
	};
	ap.getClip=function(start,end){
		var jDataEx=new Array();
		var count=0;
		for(var i=start;i<=end;i++){
			jDataEx[count]=this[i];
			count++;
		}
		return jDataEx;
	};
	ap.pile=function(limit,opt,str){
		if(this.length==0) return false;
		var a=new Array();
		var b=new Array();
		
		var tp=str==undefined?"void":str;
		
		this[0].trav(function(d,n){
			b.push(tp);
		});
		
		if(opt=="new"){
			for(var i=0;i<limit;i++){
				if(i>=limit-this.length){
					a.push(
						this[
							i-(limit-this.length)
						]
					);
				}else{
					a.push(b);
				}
			}
		}else if(opt=="old"){
			for(var i=0;i<limit;i++){
				if(i<this.length){
					a.push(this[i]);
				}else{
					a.push(b);
				}
			}
		}
		
		return a;
	};
	ap.draw=function(jsn){
	
		var ctx,clr,col,mgn,ntvl;
		var a=jsn["ctx"]?ctx=jsn.ctx:false;
		if(!a) return false;
		jsn["color"]==undefined?clr="#006fb9":clr=jsn.color;
		jsn["col"]==undefined?col=5:col=jsn.col;
		
		//chart style
		jsn["interval"]==undefined?ntvl=((ctx.canvas.width)/this.length):ntvl=jsn.interval;
		
		ctx.beginPath();
		var nx=this.getminmax(col);
			max=jsn.max==undefined?nx.max.val+((nx.max.val-nx.min.val)/10):jsn.max,
			min=jsn.min==undefined?nx.min.val-((nx.max.val-nx.min.val)/10):jsn.min;
		
		if(max==min){
			max+=max/10;
			min-=max/10;
		}
		
		var margin=(max-min)/ctx.canvas.height*mgn;
		var ox=ntvl/2;
		
		for(var i=0,lng=this.length;i<lng;i++){
			var y=datapositionY(
				ctx.canvas.height,
				max,min,this[i][col]
			);
			i==0?ctx.moveTo(0+ox,y):ctx.lineTo(ntvl*i+ox,y);
			ctx.strokeStyle=clr;
		}
		ctx.stroke();
		
		ctx.fillStyle=clr;
		var lbl=new Array(),cnt=0;
		
		while(true){
			lbl.push(30*cnt+15);
			cnt++;
			if(30*cnt+15>=ctx.canvas.width) break;
		}
		
		var size=6,shape=jsn.shape==undefined?0:jsn.shape;
		if(this.length != 0){
		for(var i=0,lng=lbl.length;i<lng;i++){
			var x=lbl[i], idx=getIdx(x);
			var y=datapositionY(
				ctx.canvas.height,
				max,min,this[idx][col]
			);
			if(shape==0){
				//속찬사각형
				ctx.fillRect(ntvl*idx+ntvl/2-size/2,y-size/2,size,size);
			}else if(shape==1){
				//속찬원형
				ctx.beginPath();
				ctx.arc(ntvl*idx+ntvl/2,y,size/2,0,2*Math.PI,false);
				ctx.fill();
			}else if(shape==2){
				//속빈사각형
				ctx.beginPath();
				ctx.fillStyle=clr;
				ctx.fillRect(ntvl*idx+ntvl/2-size/2,y-size/2,size,size);
				
				ctx.beginPath();
				ctx.fillStyle="white";
				ctx.fillRect(ntvl*idx+ntvl/2-(size-2)/2,y-(size-2)/2,size-2,size-2);
			}else if(shape==3){
				//속빈원형
				ctx.beginPath();
				ctx.fillStyle=clr;
				ctx.arc(ntvl*idx+ntvl/2,y,size/2,0,2*Math.PI,false);
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle="white";
				ctx.arc(ntvl*idx+ntvl/2,y,(size-2)/2,0,2*Math.PI,false);
				ctx.fill();
			}else if(shape==4){
				//속찬삼각형
				size=4;
				//외접원의 반지름이 size인 정삼각형의 변의 길이
				var lng=3*size/Math.sqrt(3);
			
				ctx.beginPath();
				ctx.moveTo(ntvl*idx+ntvl/2,y);
				ctx.moveTo(ntvl*idx+ntvl/2,y-size);
				ctx.lineTo(ntvl*idx+ntvl/2-lng/2,y+size/3);
				ctx.lineTo(ntvl*idx+ntvl/2+lng/2,y+size/3);
				ctx.closePath();
				ctx.fill();
			}else if(shape==5){
				//속찬마름모
				size=7;
				ctx.beginPath();
				ctx.moveTo(ntvl*idx+ntvl/2,y);
				ctx.moveTo(ntvl*idx+ntvl/2,y-size/2);
				ctx.lineTo(ntvl*idx+ntvl/2-size/2,y);
				ctx.lineTo(ntvl*idx+ntvl/2,y+size/2);
				ctx.lineTo(ntvl*idx+ntvl/2+size/2,y);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
		
		function getIdx(w){
			return(parseInt(w/ntvl));
		};
		
	};
	ap.RW=function(jsn){
		var x,y,w,h,p,
			lbl,pdT,
		x=jsn.x;y=jsn.y;w=jsn.w;h=jsn.h,
		lbl=jsn.lbl, col=jsn.col,
		jsn.p?p=jsn.p:p=document.body,
		ctx=jsn.ctx, bg=jsn.bg==undefined?"white":jsn.bg,
		pnt=jsn.point_opt==undefined?0:jsn.point_opt,
		pdT=jsn.paddingTop;
		var nums=this.getminmax(col);
		var	max=jsn.max==undefined?nums.max.val+((nums.max.val-nums.min.val)/10):jsn.max,
			min=jsn.min==undefined?nums.min.val-((nums.max.val-nums.min.val)/10):jsn.min;
		
		if(max==min){
			max+=max/10;
			min-=max/10;
		}
		
		
		j("rw_"+p.id,p).css({
			left:x+"px",
			top:y+"px",
			width:w+"px",
			height:h+"px",
			backgroundColor:bg
		});
		j("rw_"+p.id).innerHTML="";
		
		//단위 표시
		var unit="";
		if(jsn.unit!=undefined&&jsn.unit_ind==false){
			j("rwunit_"+p.id,j("rw_"+p.id)).css({
				left:0+"px",top:-10+"px",width:w+"px",height:15+"px",textAlign:"right"
			});
			j("rwunit_"+p.id).innerHTML=jsn.unit!=undefined?jsn.unit:"";
		}else if(jsn.unit!=undefined&&jsn.unit_ind==true){
			unit=jsn.unit;
		}
		
		//축명 표시
		if(jsn.axisname){
			j("rwaxisname_"+p.id,j("rw_"+p.id)).css({
				left:0+"px",top:-10+"px",width:w+"px",height:15+"px",textAlign:"left", fontWeight:"bold"
			});
			j("rwaxisname_"+p.id).innerHTML=jsn.axisname!=undefined?jsn.axisname:"";
		}
		
		for(var i=0,lng=lbl.length;i<lng;i++){
			j("rwlbl_"+p.id+i,j("rw_"+p.id)).css({
				top:(lbl[i]+(pdT-10)+4)+"px",
				width:w+"px",
				height:13+"px",
				fontSize:11+"px",
				color:"#444444",
				//backgroundColor:"green",
				textAlign:"left"
			});
			var strData=getdatabyposition(
				ctx.canvas.height,
				lbl[i],
				max,min
			);
			j("rwlbl_"+p.id+i).innerHTML=pt(rommify(strData,pnt))+unit;
			
		}
		
	};
	ap.LW=function(jsn){
		var x,y,w,h,lbl,p;
		x=jsn.x;y=jsn.y;w=jsn.w;h=jsn.h,
		lbl=jsn.lbl,col=jsn.col,
		ctx=jsn.ctx, bg=jsn.bg==undefined?"white":jsn.bg,
		pnt=jsn.point_opt==undefined?0:jsn.point_opt,
		jsn.p?p=jsn.p:p=document.body;
		pdT=jsn.paddingTop;
		
		var nums=this.getminmax(col);
			max=jsn.max==undefined?nums.max.val+((nums.max.val-nums.min.val)/10):jsn.max,
			min=jsn.min==undefined?nums.min.val-((nums.max.val-nums.min.val)/10):jsn.min;
		
		if(max==min){
			max+=max/10;
			min-=max/10;
		}
		
		j("lw_"+p.id,p).css({
			left:x+"px",
			top:y+"px",
			width:w+"px",
			height:h+"px",
			textAlign:"right",
			backgroundColor:bg
		});
		j("lw_"+p.id).innerHTML="";
		
		//단위 표시
		var unit="";
		if(jsn.unit!=undefined&&jsn.unit_ind==false){
			j("lwunit_"+p.id,j("lw_"+p.id)).css({
				left:0+"px",top:-10+"px",width:w+"px",height:15+"px",textAlign:"right"
			});
			j("lwunit_"+p.id).innerHTML=jsn.unit!=undefined?jsn.unit:"";
		}else if(jsn.unit!=undefined&&jsn.unit_ind==true){
			unit=jsn.unit;
		}
		
		//축명 표시
		if(jsn.axisname){
			j("lwaxisname_"+p.id,j("lw_"+p.id)).css({
				left:0+"px",top:-10+"px",width:w+"px",height:15+"px",textAlign:"right", fontWeight:"bold"
			});
			j("lwaxisname_"+p.id).innerHTML=jsn.axisname!=undefined?jsn.axisname:"";
		}
		
		for(var i=0;i<lbl.length;i++){
			j("lwlbl_"+p.id+i,j("lw_"+p.id)).css({
				top:(lbl[i]+(pdT-10)+4)+"px",
				width:95+"%",
				height:13+"px",
				fontSize:11+"px",
				color:"#444444",
				//backgroundColor:"white",
				textAlign:"right"
			});
			var strData=getdatabyposition(
				ctx.canvas.height,
				lbl[i],
				max,
				min
			);
			j("lwlbl_"+p.id+i).innerHTML=pt(rommify(strData,pnt))+unit;
		}
	};
	ap.BT=function(jsn){
		var x,y,w,h,p,
			lbl,pdL,col;
		x=jsn.x;y=jsn.y;w=jsn.w;h=jsn.h,
		lbl=jsn.lbl;p=jsn.p,
		pdL=jsn.paddingLeft,
		ctx=jsn.ctx, bg=jsn.bg==undefined?"white":jsn.bg,
		col=jsn.col==undefined?0:jsn.col;
		
		if(!p) p=document.body;
		
		j("bt_"+p.id,p).css({
			left:x+"px",
			top:y+"px",
			width:w+"px",
			height:h+"px",
			backgroundColor:bg
		});
		j("bt_"+p.id).innerHTML="";
		for(var i=0;i<lbl.length;i++){
			var posLeft=ctx.canvas.width/this.length*lbl[i]+pdL-35;
			j("btm_"+p.id+i,j("bt_"+p.id)).css({
				left:posLeft+"px",
				top:0+"px",
				width:50+"px",
				height:15+"px",
				wordWrap:"break-word",
				padding:2+"px",
				textAlign:"center",
				fontSize:11+"px",
				color:"#444444"
			});
		    if(this.length != 0){
			    if(jsn.type=="time")
    				if(jsn.type_opt=="short")
    					j("btm_"+p.id+i).innerHTML=timify(this[lbl[i]][col]).substring(0,5);
    				else
    					j("btm_"+p.id+i).innerHTML=timify(this[lbl[i]][col]);
    			else
    				j("btm_"+p.id+i).innerHTML=datify(this[lbl[i]][col]);
			}	
		}
	};
	ap.BG=function(ctx){
		for(var i=0;i<this.length;i++){
			lineDraw((this[i]));
		}
		function lineDraw(lc){
			ctx.beginPath();
			ctx.fillStyle="rgb(230,230,230)";
			ctx.fillRect(0,lc,ctx.canvas.width,1);
		};
	};
	ap.trav=function(fnc){
		for(var i=0,lng=this.length;i<lng;i++){
			var a=fnc(this[i],i);
			if(a) break;
		}
	};
	ap.ntvl=function(fnc){
		var cnt=0;
		var l=this;
		var tmr=setInterval(function(){
			if(cnt>l.length-1){
				clearInterval(tmr);
			}else{
				fnc(l[cnt],cnt);
			}
			cnt++;
		},50);
	};
	
	//2014.01 in dongbu
	ap.pieChart=function(pr){
	
		/*call sample
			arr.pieChart({
				x:10,
				y:0,
				width:500,
				height:500,
				id:"test",
				name_col:0,
				target_col:2,
				color_type:0,
				display_count:10,
				font_size:13,
				font_white:false
			});
		*/
	
	
		var cf=new jCommon(), html5=cf.html5
			x=pr.x, y=pr.y, width=pr.width, height=pr.height,
			id=pr.id, name_col=pr.name_col, target_col=pr.target_col,
			color_type=pr.color_type, display_count=pr.display_count,
			font_size=pr.font_size, font_white=pr.font_white,
			setEvent=pr.setEvent,
		
			tmpwidth=width>height?height:width,
			mainx=tmpwidth/2, mainy=mainx, outradius=(tmpwidth*6/7)/2, inradius=outradius/3,
			middleradius=(outradius-inradius)/2+inradius, armlength=5, armmax=15, 
			datamax=display_count, rad=(Math.PI/180),
			arrcol=[
				["rgb(231,81,106)","rgb(106,136,219)","rgb(255,215,56)","rgb(255,147,104)","rgb(50,186,156)","rgb(127,114,188)","rgb(122,187,232)","rgb(129,197,120)","rgb(46,171,196)","rgb(112,112,112)"],
				["rgb(109,164,225)","rgb(101,212,221)","rgb(139,152,166)","rgb(203,213,222)","rgb(93,93,93)","rgb(255,177,50)","rgb(131,149,169)","rgb(106,121,153)","rgb(155,181,224)","rgb(85,124,166)","rgb(255,222,235)"],
				["rgb(205,2,101)","rgb(253,101,60)","rgb(255,139,45)","rgb(255,179,33)","rgb(184,217,0)","rgb(130,187,7)","rgb(141,214,101)","rgb(155,16,69)","rgb(251,77,142)","rgb(255,168,201)","rgb(255,222,235)"],
				["rgb(109,164,225)","rgb(101,212,221)"],
				["rgb(255,177,50)","rgb(93,93,93)"],
				["rgb(228,112,112)","rgb(109,164,225)","rgb(119,119,119)"]
			],
			
			color=arrcol[color_type],
		
			tmpsum=0,
			data = this, names = new Array(),
			inmove=false,
			minlength=width>=height?height:width;
		
		
		for(var i=0,lng=data.length;i<lng;i++){
			names[i] = [data[i][name_col],data[i][target_col]*1];
			tmpsum+=data[i][target_col]*1;
		}

		//percent and accumulated percent
		for(var i=0, lng=data.length;i<lng;i++){
			names[i][2] = roundXL(names[i][1]/tmpsum*100,2);
			if(i==0){
				names[i][3] = names[i][2];
			}else{
				names[i][3] = names[i-1][3]+names[i][2];
			}
		}
		
		names.desc(2);
		var parent = document.getElementById(id);
		parent.style.position="relative";
		parent.style.height=height+"px";
		parent.style.width=width+"px";
		parent.style.overflow="hidden";
		//parent.style.border="1px solid gray";
		//parent.style.backgroundColor="red";
		
		var chart=cf.mkAbsoluteDiv(x,y,width,height,parent);
		var context=cf.mkCanvas(chart);
		chart.id=id+"area";
		
		
		//effect용 캔버스 추가
		if(setEvent){
			var chrt=cf.mkAbsoluteDiv(x-10,y-10,width,height,parent);
			var ctx=cf.mkCanvas(chrt);
		}

		var neoarrportion = new Array();
		if(names.length>datamax){
			for(var i=0, lng=names.length;i<lng;i++){
				if(i<datamax-1){
				
					var val=percenttodegree(names[i][2]), 
						st=i==0?0:neoarrportion[i-1][4],
						ac=i==0?val:val+neoarrportion[i-1][4],
						dac=i==0?names[i][2]:names[i][2]+neoarrportion[i-1][5];
				
					neoarrportion[i]=[
						val,
						names[i][2],
						names[i][0],
						st,
						ac,
						dac
					];
				
				}else{
					var tmpsum=0;
					for(var k=datamax-1, klng=names.length;k<klng;k++){
						tmpsum+=names[k][2];
					}
					neoarrportion[i]=[
						percenttodegree(tmpsum),
						tmpsum,
						"기타",
						neoarrportion[i-1][4],
						360,
						100
					];
					break;
				}
			}
		}else{
			for(var i=0, lng=names.length;i<lng;i++){
				var val=percenttodegree(names[i][2]), 
					st=i==0?0:neoarrportion[i-1][4],
					ac=i==0?val:val+neoarrportion[i-1][4],
					dac=i==0?names[i][2]:names[i][2]+neoarrportion[i-1][5];
				neoarrportion[i]=[
					val,
					names[i][2],
					names[i][0],
					st,
					ac,
					dac
				];
			}
		}
		
		var count=0, lng=neoarrportion.length;
		//var img=new Image(), path="";
		var imgs=new Array(), path="";
		for(var i=0;i<10;i++){
			var img=new Image();
			img.src=path+"p"+i+".png";
			imgs.push(img);
		}
		
		imgs[0].onload=function(){
			//donutportion(context,count,true);
			initPie();
		};
		
		function initPie(){
			var tmr = setInterval(function(){
				donutportion(context,count,true);
				count++;
				if(count>=lng)
					clearInterval(tmr);
			},50);
		};
		
		//범례생성
		mkIndex();
		
		//ie8 이하에서 canvas가 0되는 거 보정...
		if(!html5){
			canvas.childNodes[0].style.height=tmpwidth+"px";
			canvas.childNodes[0].style.width=tmpwidth+"px";
		}
		
		//이벤트영역 생성
		var a=cf.mkAbsoluteDiv(x,y,minlength,minlength,parent);
		
		//툴팁 생성
		var tip=cf.mkAbsoluteDiv(0,0,60,35,parent);
		tip.style.display="none";
		//tip.style.background="url("+cf.imgPath+"3.png)";
		tip.style.backgroundColor="white";
		var tiptext=cf.mkTextbox(0,0,60,35,tip);
		tiptext.cell.style.paddingLeft=7+"px";
		tiptext.cell.style.fontSize=11+"px";
		
		if(setEvent)
		a.onmousemove=function(e){
			var tx = cf.html5?e.pageX:event.x, ty = cf.html5?e.pageY:event.y, 
				os=8, xx=tx-os, yy=ty-os, dtr=cf.degreetoradian, rtd=cf.radiantodegree, 
				hpt=cf.gethypotenuse, btm=xx-mainx, vtc=yy-mainy, hyp=hpt(btm,vtc);

			var rslt=cf.sintodegree(btm,vtc), prslt=mvangle(rslt)/360*100, nap=neoarrportion, idx;
			nap.trav(function(d,n){
				if(d[5]>=prslt){
					idx=n; 
					return true;
				}
			});
			if(hyp<outradius&&hyp>inradius){
				inmove=true;
				moveaction(nap[idx]);
			}else{
				inmove=false;
				moveaction();
			}
			function moveaction(arr){
				if(inmove){
					tip.style.display="block";
					tip.style.top=ty+15+"px";
					tip.style.left=tx+5+"px";
					var str="";
					str+=arr[2]+"<br>";
					str+=cf.roundXL(arr[1],2)+" %";
					tiptext.cell.innerHTML=str;
					
					context.canvas.width=context.canvas.width;
					draw(idx,0);
					
					ctx.canvas.width=ctx.canvas.width;
					donutportion(ctx,idx,true);
					
				}else{
					context.canvas.width=context.canvas.width;
					draw(idx,1);
					ctx.canvas.width=ctx.canvas.width;
					tip.style.display="none";
				}
				
			};
			function mvangle(angle){
				angle=angle+90;
				if(angle>360){
					angle=angle-360;
				}
				return angle;
			};
		};
		
		function draw(idx,opt){
			if(opt==0){
				neoarrportion.trav(function(d,n){
					if(n!=idx)
						donutportion(context,n,true);
				});
			}else if(opt==1){
				neoarrportion.trav(function(d,n){
					donutportion(context,n,true);
				});
			}else{
				donutportion(context,opt);
			}
		};
		function donutportion(ctx,idx,chk){
			var start=neoarrportion[idx][3], 
				end=neoarrportion[idx][4], 
				data=neoarrportion[idx][1],
				opt=neoarrportion[idx][0]>=armmax?false:true,
				fillcolor=color[idx];
			
			donutsplit(ctx,start,end,fillcolor,idx);
			if(chk)
				opt?centerline(ctx,start,end,data):donutsplitlabel(ctx,start,end,data);
		};
		function centerline(ctx,startangle,endangle,data){
			var sa = offsetangle(startangle);
			var ea = offsetangle(endangle);
			
			if(ea==sa) return false;
			
			if(ea<sa){
				var centerangle = offsetangle(((endangle-startangle)/2)+startangle);
			}else{
				var centerangle = ((ea-sa)/2)+sa;
			}

			ctx.beginPath();
			ctx.strokeStyle="rgb(51,51,51)";
			ctx.moveTo(
				mainx+Math.cos(rad*centerangle)*outradius,
				mainy+Math.sin(rad*centerangle)*outradius
			);
			ctx.lineTo(
				mainx+Math.cos(rad*centerangle)*(outradius+armlength),
				mainy+Math.sin(rad*centerangle)*(outradius+armlength)
			);
			ctx.stroke();
			
			if(centerangle>=180&&centerangle<270){
				var tmpwidth = 25;
				var tmpheight = 15;
				var mainpointx = mainx+Math.cos(rad*centerangle)*(outradius+armlength);
				var mainpointy = mainy+Math.sin(rad*centerangle)*(outradius+armlength);
				var labelx = mainpointx;// - tmpwidth;
				var labely = mainpointy;// - tmpheight;
			}else if(centerangle>=90&&centerangle<180){
				var tmpwidth = 25;
				var tmpheight = 15;
				var mainpointx = mainx+Math.cos(rad*centerangle)*(outradius+armlength);
				var mainpointy = mainy+Math.sin(rad*centerangle)*(outradius+armlength);
				var labelx = mainpointx;// - tmpwidth;
				var labely = mainpointy;
			}else if(centerangle>=0&&centerangle<90){
				var tmpwidth = 25;
				var tmpheight = 15;
				var mainpointx = mainx+Math.cos(rad*centerangle)*(outradius+armlength);
				var mainpointy = mainy+Math.sin(rad*centerangle)*(outradius+armlength);
				var labelx = mainpointx;
				var labely = mainpointy;
			}else{
				var tmpwidth = 25;
				var tmpheight = 15;
				var mainpointx = mainx+Math.cos(rad*centerangle)*(outradius+armlength);
				var mainpointy = mainy+Math.sin(rad*centerangle)*(outradius+armlength);
				var labelx = mainpointx;
				var labely = mainpointy;// - tmpheight;
			}

			ctx.beginPath();
			ctx.fillStyle="black";
			ctx.font=font_size+"px Georgia";
			ctx.textAlign="end";
			ctx.fillText(cf.roundXL(data,1),labelx-3,labely);
		};
		function donutsplit(ctx,startangle,endangle,fillcolor,idx){
			if(startangle==0&&endangle==0)return false;
			if(startangle==0&&endangle==360)
				endangle--;
			var tmpshadowlocation=5;
			ctx.beginPath();
			ctx.arc(
				mainx+tmpshadowlocation,
				mainy+tmpshadowlocation,
				outradius,
				rad*offsetangle(startangle),
				rad*offsetangle(endangle),
				false
			);

			ctx.arc(
				mainx+tmpshadowlocation,
				mainy+tmpshadowlocation,
				inradius,
				rad*offsetangle(endangle),
				rad*offsetangle(startangle),
				true
			);

			ctx.fillStyle="rgba(51,51,51,0.1)";
			ctx.fill();

			ctx.beginPath();
			ctx.arc(mainx,mainy,outradius,rad*offsetangle(startangle),rad*offsetangle(endangle),false);
			ctx.arc(mainx,mainy,inradius,rad*offsetangle(endangle),rad*offsetangle(startangle),true);
			ctx.strokeStyle="rgb(255,255,255)";
			ctx.closePath();
			ctx.stroke();
			ctx.fillStyle=fillcolor;
			ctx.fill();
			
			//patter insertion
			var pat=ctx.createPattern(imgs[idx],"repeat");
			ctx.fillStyle=pat;
			ctx.fill();
		};
		function donutsplitlabel(ctx,startangle,endangle,data){
			var sa = startangle;
			var ea = endangle;
			var centerangle = offsetangle(((ea-sa)/2)+sa);

			var tmpwidth = 50;
			var tmpheight = 20;
			var mainpointx = mainx+Math.cos(rad*centerangle)*middleradius;
			var mainpointy = mainy+Math.sin(rad*centerangle)*middleradius;
			
			var labelx = mainpointx;// - (tmpwidth/2);
			var labely = mainpointy;// - (tmpheight/2);
			
			ctx.beginPath();
			ctx.fillStyle="white";
			ctx.font=font_size*1.5+"px Georgia";
			ctx.textAlign="center";
			ctx.fillText(cf.roundXL(data,1),labelx,labely);
		};
		function offsetangle(angle){
			while(angle>360){
				angle-=360;
			}
			var neoangle = angle-90;
			if(neoangle<0){
				neoangle=360+neoangle;
			}
			return neoangle;
		};
		function percenttodegree(percent){
			var result = 360*percent/100;
			return result;
		};
		function mkIndex(){
			//범례 영역 추가
			var namearea = document.createElement("div");
			chart.appendChild(namearea);
			var namex, namey, namewidth, nameheight, vertical, namecursorx=0, namecursory=0, indivnameheight=18;

			if(width>height){
				namewidth=width-height;
				nameheight=neoarrportion.length*indivnameheight;
				namey=height/2 - nameheight/2;
				namex=height;
				vertical=false;
			}else{
				namex=mainx+Math.cos(rad*180)*outradius+10;
				namey=width;
				namewidth=outradius*2;
				nameheight=height-width;
				vertical=true;
			}
			namearea.style.position="absolute";
			namearea.style.top=namey + "px";
			namearea.style.left=namex + "px";
			namearea.style.width=namewidth + "px";
			namearea.style.height=nameheight + "px";
			namearea.style.padding=0+"px";
			//namearea.style.display="none";
			//namearea.style.border="1px solid gray";


			if(vertical)
				for(var i=0;i<neoarrportion.length;i++)
					setnames(color[i],neoarrportion[i][2]);
			else
				for(var i=0;i<neoarrportion.length;i++)
					setnames(color[i],neoarrportion[i][2]);
			
			function setnames(color,strname){
				var name = document.createElement("div");
				name.style.position="absolute";
				name.style.top=namecursory + "px";
				name.style.left=namecursorx + "px";
				if(vertical)
					name.style.width=namewidth/2 + "px";
				else
					name.style.width=namewidth + "px";
				name.style.height=18 + "px";
				//name.style.backgroundColor="green";

				var box = document.createElement("div");
				box.style.position="absolute";
				box.style.top = 3 + "px";
				box.style.left = 0 + "px";
				box.style.width = (font_size-font_size/3) + "px";
				box.style.height=(font_size-font_size/3)+"px";
				//box.style.border = "1px solid gray";
				box.style.backgroundColor=color;
				box.style.padding=0+"px";
				name.appendChild(box);

				var label = document.createElement("div");
				label.style.position = "absolute";
				label.style.top = 0 + "px";
				label.style.left = (font_size+5) + "px";
				label.style.width = 100 + "px";
				label.style.height = 10 + "px";
				label.style.fontSize = font_size + "px";
				if(font_white)
					label.style.color = "white";
				label.style.textAlign="left";
				label.style.padding=0+"px";
				label.innerHTML=wordshortener(strname);
				
				name.appendChild(label);

				if(!vertical){
					namecursory += 18;
				}else{
					if(namecursorx==namewidth/2){
						namecursorx=0;
						namecursory += 18;
					}else{
						namecursorx += namewidth/2;
					}

				}

				namearea.appendChild(name);
			};
			function wordshortener(word){
				word=word.replace("&","&#38;");
				var offset;
				var result="";
				if(vertical){
					offset=namewidth/2-font_size*2;
				}else{
					offset=namewidth-font_size*2;
				}

				if(word.length*font_size>offset){
					if(word.length>4){
						result = word.substring(0,4)+"...";
					}else{
						result = word;
					}
				}else{
					result = word;
				}
				return result;
			};
		};
	};
	
	ap.barChart=function(jsn){
		var cf=new jCommon(),
			disparity=jsn.disparity?jsn.disparity:0,
			col=jsn.col?jsn.col:0,
			name_col=jsn.name_col==undefined?0:jsn.name_col,
			ctx=jsn.ctx,
			color=jsn.color?jsn.color:[cf.blue,cf.red,cf.yellow,"green","orange","brown","gold","silver"],
			id=jsn.id?jsn.id:"document.body",
			nx=this.getminmax(col),
			max=jsn.max==undefined?nx.max.val+((nx.max.val-nx.min.val)/10):jsn.max,
			min=jsn.min==undefined?nx.min.val-((nx.max.val-nx.min.val)/10):jsn.min,
			min=min<0?0:min,
			ntvl=((ctx.canvas.height)/this.length),
			startpoint=ntvl/2,
			bg=jsn.bg==undefined?"white":jsn.bg;
		
		var arr=[
			0,jsn.w*1/10,jsn.w*2/10,jsn.w*3/10,jsn.w*4/10,jsn.w*5/10,
			jsn.w*6/10,jsn.w*7/10,jsn.w*8/10,jsn.w*9/10,jsn.w*10/10
		];
		arr.trav(function(d,n){
			j(id+"dt"+n,ctx.canvas.parentNode).css({
				left:(d-50/2)+"px",top:(ctx.canvas.height+4)+"px",
				width:50+"px",height:25+"px",
				fontSize:11+"px",color:"#444444",textAlign:"center",fontFamily:"Tomaho,Dotum"
			});
			var dbyp=d*(max-min)/ctx.canvas.width+min;
			
			j(id+"dt"+n).innerHTML=cf.rommify(dbyp,1);
		});
		arr.trav(function(d,n){
			if(n!=0&&n!=arr.length-1){
				ctx.beginPath();
				ctx.fillStyle="#dddddd";
				ctx.fillRect(d,0,1,ctx.canvas.height);
			}
		});
		
		var pos=new Array();
		var flg, thck=jsn.thick==undefined?20:jsn.thick, th;
		this.trav(function(d,n){
			var val=(d[col]-min)*(ctx.canvas.width/(max-min));
			th=(function(){
				if(ntvl-disparity<thck){
					flg=true;
					return thck;
				}else{ 
					return ntvl-disparity;
				}
			})();
			
			var tp=flg?ntvl*n:ntvl*n+disparity/2;
			pos.push([0,tp,val,th,d[name_col]+"",d[col]]);
		});
		
		pos.trav(function(d,n){
			ctx.beginPath();
			ctx.fillStyle=color[n];
			ctx.fillRect(d[0],d[1],d[2],d[3]);
			j(id+"label"+n,ctx.canvas.parentNode).css({
				left:-105+"px",
				top:(d[1]+th/2-4)+"px",
				width:100+"px",
				height:13+"px",
				fontSize:11+"px",
				color:"#444444",
				textAlign:"right",
				fontFamily:"Tomaho,Dotum"
			});
			j(id+"label"+n).innerHTML=d[4].substring(0,12);
		});
		
		pos.trav(function(d,n){
			var xx,align,tc;
			if(d[2]<30){
				xx=d[2]+5; align="left"; tc="black";
			}else{
				xx=d[2]-30-5; align="right"; tc="white";
			}
			
			j(id+"cont"+n, ctx.canvas.parentNode).css({
				left:xx+"px", top:(d[1]+5)+"px", 
				width:30+"px", height:15+"px",
				fontSize:11+"px", textAlign:align,
				//backgroundColor:"red",
				color:tc
			});
			j(id+"cont"+n).innerHTML=d[5]<1?"":jsn.cont?parseInt(d[5]):cf.rommify(d[5],1);
		});
		
		
	};
	ap.barChartV=function(jsn){
		var cf=new jCommon(),
			disparity=jsn.disparity?jsn.disparity:0,
			col=jsn.col?jsn.col:0,
			ctx=jsn.ctx,
			color=jsn.color?jsn.color:[cf.blue,cf.red,cf.yellow,"green","orange","brown","gold","silver"],
			id=jsn.id?jsn.id:"document.body";
		
		nx=this.getminmax(col),
		max=jsn.max==undefined?nx.max.val+((nx.max.val-nx.min.val)/10):jsn.max,
		min=jsn.min==undefined?nx.min.val-((nx.max.val-nx.min.val)/10):jsn.min,
		
		ntvl=((ctx.canvas.width)/this.length),
		startpoint=ntvl/2;
		if(max==min) max>0?min=0:(max<0?max=0:max=100);
		var mean=(function(){
			if(jsn.mean!=undefined){
				if(jsn.mean>max){
					max=jsn.mean;
					return max;
				}else if(jsn.mean<min){
					min=jsn.mean;
					return min;
				}else{
					return jsn.mean;
				}
			}else{
				return jsn.mean;
			}
		})(),
			//jsn.mean!=undefined?(jsn.mean>max||jsn.mean<min?undefined:jsn.mean):jsn.mean,
			meanh=mean!=undefined?
				cf.datapositionY(ctx.canvas.height,max,min,mean):
				cf.datapositionY(ctx.canvas.height,max,min,cf.getdatabyposition(ctx.canvas.height,ctx.canvas.height/2,max,min));
		
		var dten=cf.datapositionY(ctx.canvas.height,max,min,mean+10);
		dten=Math.abs(meanh-dten);
		
		var h=ctx.canvas.height,
			arr=(function(){
				var a=new Array();
				if(mean==undefined){
					a=[0,h/4,h/2,h*3/4,h-1];
					
				}else{
					var go=true, cnt=0,
						up=true,down=true;
					while(go){
						var b;
						if(up){b=meanh+dten*cnt;if(b<=ctx.canvas.height) a.push(b); else up=false}
						if(down){b=meanh+dten*-cnt;if(b>=0) a.push(b); else down=false}
						if(!up&&!down) break;
						cnt++;
					}
				}
				return a;
			})();
		arr.BG(ctx);
		
		arr.trav(function(d,n){
			var lb2=id+"dt"+n;
			j(lb2,ctx.canvas.parentNode).css({
				left:-50-4-5+"px",
				top:(d-15/2)+"px",
				width:50+"px",
				height:25+"px",
				fontSize:11+"px",
				textAlign:"right"
			});
			var dbyp=cf.getdatabyposition(ctx.canvas.height,d,max,min);
			j(lb2).innerHTML=cf.rommify(dbyp,0);
		});		
		
		var pos=new Array();
		this.trav(function(d,n){
			var val=cf.datapositionY(ctx.canvas.height,max,min,d[col]);
			if(meanh-val>0){
				pos.push([ntvl*n+disparity/2,val,ntvl-disparity,meanh-val,d[0],"up"]);
			}else{
				pos.push([ntvl*n+disparity/2,meanh,ntvl-disparity,val-meanh,d[0],"down"]);
			}
		});
		var clr=["red","orange","yellow","green","blue","violet","purple",cf.red,cf.yellow,cf.blue];
		pos.trav(function(d,n){
			ctx.beginPath();
			
			//log(d[0],d[1],d[2],d[3]);
			d[5]=="up"?ctx.fillStyle=color[0]:ctx.fillStyle=color[1];
			
			ctx.fillRect(d[0],d[1],d[2],d[3]);
			var lb=id+"label"+n;
			j(lb,ctx.canvas.parentNode).css({
				left:(d[0]-ntvl+10)+"px",
				top:(ctx.canvas.height+(15*(n%2))+jsn.padding.top+jsn.padding.bottom)+"px",
				width:ntvl*2+"px",
				height:11+"px",
				fontSize:11+"px",
				textAlign:"center"
			});
			j(lb).innerHTML=d[4].length>7?d[4].substring(0,7)+"..":d[4];
		});
		return pos;
	};
	ap.barChartG=function(jsn){
		var ctx=jsn.ctx, 
			tw=ctx.canvas.width-jsn.padding.left-jsn.padding.right,
			w=tw/this.length, ox=jsn.disparity/2;
			
		
		
		var nx=this.getminmax(jsn.col),
		max=jsn.max==undefined?nx.max.val+((nx.max.val-nx.min.val)/10):jsn.max,
		min=jsn.min==undefined?nx.min.val-((nx.max.val-nx.min.val)/10):jsn.min;
		min=min<0?0:min;

		
		this.trav(function(d,n){
			ctx.beginPath();
			typeof jsn.color!="object"?ctx.fillStyle=jsn.color:ctx.fillStyle=jsn.color[n];
			var a=datapositionY(ctx.canvas.height,max,min,d[jsn.col]);
			ctx.fillRect(w*n+ox,a,w-ox*2,ctx.canvas.height-a);
		});
	};
	ap.clsChar=function(col,str){
		var num=str.charCodeAt(0);
		var rslt=0;
		this.trav(function(d,n){
			var a=d[col].charCodeAt(0);
			if(a==num){
				rslt=n;
				return true;
			}
		});
		return rslt;
	};
	ap.event=function(jsn){
		var cf=new jCommon();
		var l=this;
		var ctx=jsn.ctx, h=ctx.canvas.height+jsn.padding.bottom+jsn.padding.top,
			y=-jsn.padding.top,
			lng=ctx.canvas.width/this.length,
			col=jsn.col==undefined?0:jsn.col, col_opt=jsn.col_opt==undefined?false:jsn.col_opt,
			chartId=ctx.canvas.parentNode.parentNode.id;
			
		var d=cf.mkAbsoluteDiv(0,y,1,h,ctx.canvas.parentNode);
		d.id="vline_"+chartId;
		var bt=cf.mkAbsoluteDiv(
			0,ctx.canvas.height+jsn.padding.bottom,
			60,15,ctx.canvas.parentNode
		);
		bt.id="vlabel_"+chartId;
		bt.style.zIndex=1000;
		bt.style.paddingTop=3+"px";
		bt.style.border="1px solid gray";
		bt.style.textAlign="center";
		bt.style.backgroundColor="white";
		bt.style.fontSize=11+"px";
		bt.style.display="none";
		
		var eventObj=jsn.eventObj?jsn.eventObj:ctx.canvas.parentNode.parentNode;
		
		eventObj.onmousemove=function(e){
			var a=cf.getEventPos(e,this),
				jsny=jsn.y==undefined?0:jsn.y,
				ax=a.x, ay=a.y-jsny;
			if(ax>jsn.padding.left&&ay>jsn.padding.top){
				if(ax<jsn.padding.left+ctx.canvas.width&&ay<jsn.padding.top+ctx.canvas.height){
					gadgets(ax-jsn.padding.left-1,ay);
					if(jsn.yTip&&typeof jsn.yTip_col=="number")
						yTip(ax-jsn.padding.left-1,ay);
					else if(jsn.yTip&&typeof jsn.yTip_col=="object")
						yTips(ax-jsn.padding.left-1,ay);
				}
			}
		};
		eventObj.onmouseout=function(e){
			dpnone(d); dpnone(bt);
			if(jsn.yTip&&typeof jsn.yTip_col=="number")
				dpnone(j("dv_"+jsn.id));
			else if(jsn.yTip&&typeof jsn.yTip_col=="object")
				for(var i=0;i<jsn.yTip_col.length;i++) dpnone(j("dv_"+jsn.id+"_"+i));
			
			
			var a=cf.getEventPos(e,this),
				jsny=jsn.y==undefined?0:jsn.y,
				ax=a.x, ay=a.y;
			if(jsn.out)
				jsn.out(ax,ay);
		};
		eventObj.onclick=function(e){
			var a=cf.getEventPos(e,this),
				jsny=jsn.y==undefined?0:jsn.y,
				ax=a.x, ay=a.y-jsny;
			jsn.click(parseInt(ax/lng));
		};
		
		function dpnone(el){
			el.style.display="none";
		};
		function dp(el){
			el.style.display="block";
		};
		var cssjsn={
			backgroundColor:"white",
			top:0+"px",left:0+"px",
			width:50+"px",height:13+"px",
			display:"none",textAlign:"center",
			fontSize:11+"px",border:"1px solid gray"
		};
		var ap=j("cover_"+jsn.id);
		if(jsn.yTip&&typeof jsn.yTip_col=="number"){
			j("dv_"+jsn.id,ap).css(cssjsn);
		}else if(jsn.yTip&&typeof jsn.yTip_col=="object"){
			for(var i=0;i<jsn.yTip_col.length;i++){
				j("dv_"+jsn.id+"_"+i,ap).css(cssjsn);
			}
		}
		function yTips(x,y){
			for(var i=0;i<jsn.yTip_col.length;i++){
				dp(j("dv_"+jsn.id+"_"+i));
			}
			var a=ctx.canvas.width/l.length;
			var idx=parseInt(x/lng);
			//var max=jsn.max, min=jsn.min;
			if(jsn.yTip_opt)
				gadgets(idx*a+a/2,y);
			
			for(var i=0;i<jsn.yTip_col.length;i++){
				var nx=l.getminmax(jsn.yTip_col[i]), 
					max=jsn.max==undefined?nx.max.val+((nx.max.val-nx.min.val)/10):jsn.max,
					min=jsn.min==undefined?nx.min.val-((nx.max.val-nx.min.val)/10):jsn.min;
					
				var value=l[idx][jsn.yTip_col[i]];
				var vl=cf.datapositionY(ctx.canvas.height,max,min,value);
				movingTip(
					idx*a+a/2-50/2,
					vl+jsn.padding.top-5-15,
					j("dv_"+jsn.id+"_"+i),
					rommify(value,1)
				);
			}
		};
		function yTip(x,y){
			dp(j("dv_"+jsn.id));
			var a=ctx.canvas.width/l.length;
			var idx=parseInt(x/lng);
			if(jsn.yTip_opt)
				gadgets(idx*a+a/2,y);
			
			var nx=l.getminmax(jsn.yTip_col), 
				max=jsn.max==undefined?nx.max.val+((nx.max.val-nx.min.val)/10):jsn.max,
				min=jsn.min==undefined?nx.min.val-((nx.max.val-nx.min.val)/10):jsn.min;	

			var value=l[idx][jsn.yTip_col];
			var vl=cf.datapositionY(ctx.canvas.height,max,min,value);
			movingTip(
				idx*a+a/2-50/2,
				vl+jsn.padding.top-5-15,
				j("dv_"+jsn.id),
				rommify(value,1)
			);
		};
		function movingTip(x,y,p,str){
			p.css({
				top:y+"px",left:x+"px"
			});
			p.innerHTML=str;
		};
		function gadgets(x,y){
			if(!jsn.no_gadget){
				dp(d); dp(bt);
				d.style.backgroundColor="gray";
				d.style.left=(x)+"px";
				bt.style.left=(x-30)+"px";
			}
			if(l[parseInt(x/lng)]){
				if(!jsn.no_gadget){
					if(col_opt){
						bt.innerHTML=(l[parseInt(x/lng)][col]).substring(0,6);
					}else{
						if(jsn.col_unit=="date")
							bt.innerHTML=datify(l[parseInt(x/lng)][col]);
						else
							bt.innerHTML=timify(l[parseInt(x/lng)][col]);
					}
				}
				jsn.fnc({
					x:x,y:y,ctx:ctx,
					arr:l,idx:parseInt(x/lng),
					padding:jsn.padding
				});
			}
		};
	};
	ap.pixel=function(x,y,r,g,b,a){
		if(y>=367) return undefined;
		if(x>=330) return undefined;
		this[y][x][0]=r;
		this[y][x][1]=g;
		this[y][x][2]=b;
		this[y][x][3]=a;
	};
	
	
	//about String
	var sp=String.prototype;
	sp.xmlparse=function(){
		if (window.DOMParser){
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(this,"text/xml");
		}else{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(this); 
		}
		return xmlDoc;
	};
	sp.mkArr=function(){
		var ag=arguments;
		if(ag.length==0){
			var arr=new Array();
			var tmp=this.toString().split("|&");
			for(var i=0;i<tmp.length-1;i++){
				arr[i]=tmp[i].split("|");
			}
		}else{
			var arr=new Array();
			var tmp=this.toString().split(ag[0]);
			for(var i=0;i<tmp.length-1;i++){
				arr[i]=tmp[i].split(ag[1]);
			}
		}
		return arr;
	};
	sp.mkRarr=function(){
		var arr=new Array();
		var tmp=this.toString().split("|&");
		for(var i=tmp.length-2;i>=0;i--){
			arr.push(tmp[i].split("|"));
		}
		return arr;
	};
	sp.trim=function(){
		return this.replace(/^\s*/,"").replace(/\s+$/,"");
	};
	sp.jsonparse=function(){
		return JSON.parse(this);
	};
	sp.trav=function(fnc){
		for(var i=0;i<this.length;i++){
			fnc(this[i],i);
		}
	};
	
	//about object
	var op=Object.prototype;
	op.bimg=function(){
		//2013.8.9
		//element의 배경 이미지를 채워주는 함수
		var a=arguments[0];
		if(arguments.length==1){
			this.style.background="url("+a+") no-repeat";
		}else{
			this.style.background="url("+a+") "+arguments[1]+"px "+arguments[2]+"px";
		}
	};
	op.bg=function(clr){
		//2013.8.9
		//element의 배경색을 칠해주는 함수
		this.style.backgroundColor=clr?clr:"rgba(0,0,0,0.7)";
	};
	op.ins=function(el,num){
		//2013.8.9
		//지정한 번호 앞에 element를 삽입해주는 함수, 자기가 지정한 번호의 노드가 됨.
		this.insertBefore(el,this.childNodes[num]);
	};
	var ip=ImageData.prototype;
	ip.xy=function(x,y){
		var a=this.data;
		var n=(y*this.width+x)*4,nr=n,ng=n+1,nb=n+2,na=n+3;
		var b={
				r:a[nr],g:a[ng],b:a[nb],a:a[na],
				str:"rgba("+a[nr]+","+a[ng]+","+a[nb]+","+a[na]/255+")"
			};
		return b;
	};
	ip.transparent=function(x,y){
		var w=this.width;
		var r=(y*w+x)*4, g=(y*w+x)*4+1,b=(y*w+x)*4+2,a=(y*w+x)*4+3;
		
		var rng=20;
		for(var i=0;i<rng;i++){
			for(var k=0;k<rng;k++){
				this.data[((y+i)*w+(x+k))*4+3]=0;
			}
		}
	};
	ip.trav=function(fnc){
		for(var i=0,lng=this.data.length;i<lng;i+=4){
			fnc(this.data[i],i);
		}
	};
	ip.getClr=function(x,y,w){
		var n=this.getNum(x,y,0,w);
		var r=this.data[n],g=this.data[n+1],b=this.data[n+2],a=this.data[n+3];
		return [r,g,b,a];
	};
	ip.setClr=function(x,y,w,clr){
		if(x<0||x>=w) return undefined;
		var n=this.getNum(x,y,0,w),
		r=clr[0],g=clr[1],b=clr[2],a=clr[3];
		
		//log(x,y,n,r,g,b,a);
		
		this.data[n]=r;
		this.data[n+1]=g;
		this.data[n+2]=b;
		this.data[n+3]=a;
	};
	ip.getNum=function(x,y,th,w){
		if(x<0||x>=w) return undefined;
		var rslt=4*(x+y*w)+th;
		return rslt;
	};
	ip.getXYTh=function(num,w){
		var a=parseInt(num/4);
		var x=a%w, y=parseInt(a/w), th=num%4;
		return {x:x, y:y, th:th}
	};
	ip.clrCompensate=function(cords,w){
		//이것은 전반적인 보간 절차이며,
		//특정 픽셀에 대한 보간 절차가 따로 있어야 함.
		var vd=new Array(), c=this;
		cords.trav(function(t,m){
			var nx=c.getNum(t[1]-1,t[2],0,w);
			if(c.data[nx+3]!=0&&c.data[nx+3]!=undefined){
				for(var i=0;i<4;i++)
					c.data[t[0]+i]=c.data[nx+i];
			}else{
				nx=c.getNum(t[1],t[2]-1,0,w);
				vd.push([t[0],nx]);
			}
		});
		vd.trav(function(t,m){
			c.data[t[0]]=c.data[t[1]];
			c.data[t[0]+1]=c.data[t[1]+1];
			c.data[t[0]+2]=c.data[t[1]+2];
			c.data[t[0]+3]=c.data[t[1]+3];
		});
	};
	
	var cp=CanvasRenderingContext2D.prototype;
	cp.test=function(){
		this.moveTo(0,0);
		this.lineTo(100,100);
		this.stroke();
	};
	cp.clr=function(){
		this.canvas.width=this.canvas.width;
	};
	cp.img=function(){
		var img=new Image(); 
		img.src=arguments[0];
		var args=arguments;
		var l=this, x=0, y=0;
		if(arguments.length!=1){
			x=arguments[1], y=arguments[2];
		}
		img.onload=function(){
			var w=img.width, h=img.height;
			if(args.length>3){
				w=args[3], h=args[4];
			}
			setTimeout(function(){
				l.drawImage(img,0,0,img.width,img.height,x,y,w,h)
			},10);
		};
	};
	cp.toXY=function(id,w,h){
		var arr=new Array();
		for(var i=0;i<h;i++){
			arr[i]=new Array();
			for(var k=0;k<w;k++){
				arr[i][k]=new Array();
				for(var m=0;m<4;m++){
					arr[i][k][m]=id.data[(i*w)*4+k*4+m];
				}
			}
		}
		return arr;
	};
	cp.toX=function(id,ar,sh,eh,sw,ew){
		var w=ar[0].length;
		for(var i=sh;i<eh;i++){
			if(i>=ar.length) return false;
			for(var k=0;k<ew;k++){
				if(k>=ar[0].length) break;
				for(var m=0;m<4;m++){
					id.data[(i*w)*4+k*4+m]=ar[i][k][m];
				}
			}
			
		}
	};
	cp.eraseLine=function(ad,num){
		if(num>=ad.length) return false;
		var w=ad[0].length;
		if(num<0) return false;
		for(var i=0;i<w;i++){
			ad[num][i][3]=0;
		}
	};
	cp.eraseColumn=function(ad,num){
		if(num>=ad[0].length) return false;
		var h=ad.length;
		if(num<0) return false;
		for(var i=0;i<h;i++){
			ad[i][num][3]=0;
		}
	};
	cp.wipeout=function(opt,fnc){
		var cnt=0,weight=10,l=this, w=330, h=367;
		var a=l.getImageData(0,0,w,h),d=a.data;
		var ad=l.toXY(a,w,h);
		var c=l.createImageData(a);
		l.clr();
		l.toX(c,ad,0,h,0,w);
		l.putImageData(c,0,0);
		var tmr=setInterval(function(){
			effect(cnt,opt);
			cnt+=weight;
			if(cnt>=h){
				clearInterval(tmr);
				revive();
			}
		},20);
	 
		
		function effect(cnt,opt){
			if(opt==0){
				updown(cnt,true);
			}else if(opt==1){
				updown(cnt,false);
			}else if(opt==2){
				leftright(cnt,true);
			}else if(opt==3){
				leftright(cnt,false);
			}
		};
		function revive(){
			setTimeout(function(){
				l.putImageData(a,0,0);
				fnc();
			},500);
		};
		function updown(cnt,op){
			for(var i=0;i<weight;i++)
				l.eraseLine(ad,op?cnt+i:h-cnt-i);
			l.toX(c,ad,0,h,0,w);
			l.putImageData(c,0,0);
		};
		function leftright(cnt,op){
			for(var i=0;i<weight;i++)
				l.eraseColumn(ad,op?cnt+i:h-cnt-i);
			l.toX(c,ad,0,h,0,w);
			l.putImageData(c,0,0);
		};
	};
	cp.rgbLine=function(ad,num,str){
		var l=this;
		if(num>=ad.length) return false;
		var w=ad[0].length;
		if(num<0) return false;
		for(var i=0;i<w;i++){
			filtering(i,str);
		}
		function filtering(n,str){
			for(var i=0;i<3;i++)
				if(str[i]==0)
					ad[num][n][i]=0;
				else
					ad[num][n][i]=ado[num][n][i];
		};
	};
	cp.rgbFilter=function(str,fnc){
		var cnt=0,weight=10,l=this, w=330, h=367;
		var a=l.getImageData(0,0,w,h),d=a.data;
		var ad=l.toXY(a,w,h);
		
		var c=l.createImageData(a);
		l.clr();
		l.toX(c,ad,0,h,0,w);
		l.putImageData(c,0,0);
		
		var tmr=setInterval(function(){
			filter(cnt,str);
			cnt+=weight;
			if(cnt>=h){
				clearInterval(tmr);
				revive();
			}
		},20);
		
		function filter(cnt,str){
			for(var i=0;i<weight;i++)
				l.rgbLine(ad,cnt+i,str);
			l.toX(c,ad,0,h,0,w);
			l.putImageData(c,0,0);
		};
		function revive(){
			setTimeout(function(){
				//l.putImageData(a,0,0);
				fnc();
			},500);
		};
	};
	cp.operating=function(w,h){
		var l=this;
		var a=l.getImageData(0,0,w,h),d=a.data;
		var ad=l.toXY(a,w,h);
		var where;
		
		
		var c=l.createImageData(a);
		l.clr();
		
		var gs=[1.8,3,2,1.9,2.4,4,1.5];
		var cnt1=0;
		var tmr1=setInterval(function(){
			var k=getRandom(0,7), i=getRandom(0,7);
			var ob=new obj(50*k,50*i,50,50);
			ob.g=gs[i]+3;
			ob.go();
			cnt1++;
		},2000);
		
		var cnt=1, v=0, v1=0,
		tmr=setInterval(function(){
			l.toX(c,ad,0,h,0,w);
			l.putImageData(c,0,0);
			cnt++;
			if(cnt>1000) clearInterval(tmr);
		},40);
		
		
		function obj(x,y,w,h){
			this.w=w, this.h=h;
			this.or=[x,y,w,h];
			this.fr=[x,y,w,h];
			this.to;
			this.g=1.5;
			this.orarea=areacopy(this.or);
			this.frarea=areacopy(this.fr);
			this.goTo=function(x,y){
				//step1: 목적지를 정한다.
				this.to=[x,y,this.w,this.h];
				//step2: 현재 상태를 이전 상태로 돌린다.
				if(y<this.or[1]+50){
					areapaste(this.frarea,this.fr[0],this.fr[1],this.fr[2],this.fr[3]);
					areablank(this.or[0],this.or[1]);
				}else{
					areapaste(this.frarea,this.fr[0],this.fr[1],this.fr[2],this.fr[3]);
				}
				//step3: 이전 상태를 갱신한다.
				this.fr=[x,y,this.w,this.h];
				this.frarea=areacopy(this.to[0],this.to[1],this.to[2],this.to[3]);
				//step4: 목적지로 이동한다.
				areapaste(this.orarea,this.to[0],this.to[1],this.to[2],this.to[3]);
			};
			this.go=function(){
				var cnt=0, l=this, v=1,
				tmr=setInterval(function(){
					l.goTo(l.or[0],l.or[1]+v);
					cnt++;
					v=v+parseInt(v*l.g);
					if(cnt>100){
						clearInterval(tmr);
					}
				},100);
			};
		};
		function areacopy(){
			if(arguments.length==1){
				var x=arguments[0][0], y=arguments[0][1], 
					w=arguments[0][2], h=arguments[0][3];
			}else{
				var x=arguments[0], y=arguments[1], w=arguments[2], h=arguments[3];
			}
			//obj의 영역뿐아니라, obj가 갈 곳의 영역도 copy->초기화를 위해
			var arr=new Array();
			for(var i=y,lng=y+h;i<lng;i++){
				if(i>=367) break;
				arr[i-y]=new Array();
				for(var k=x,kng=x+w;k<kng;k++){
					if(k>=330) break;
					arr[i-y][k-x]=ad[i][k].join(",");
				}
			}
			return arr;
		};
		function areablank(fr,to){
			for(var i=to;i<to+50;i++){
				for(var k=fr;k<fr+50;k++){
					ad.pixel(k,i,255,255,255,255);
				}
			}	
		};
		function areapaste(arr,x,y,w,h){
			for(var i=y;i<y+h;i++){
				if(i>=367) break;
				for(var k=x;k<x+w;k++){
					if(k>=330) break;
					ad[i][k]=arr[i-y][k-x].split(",");
				}
			}	
		};
	
	
	
	};

	
	cp.operating1=function(weight,fnc){
		this.canvas.parentNode.style.overflow="hidden";
		var width=weight;
		var imgdata=this.getImageData(0,0,330,367), ctx=this;
		var objs=new Array();
		for(var i=0;i<376/width;i++){
			for(var k=0;k<330/width;k++){
				var x=width*k, y=width*i,
					a=cf.mkCanvas(cf.mkAbsoluteDiv(x,y,width,width,this.canvas.parentNode)),
					b=this.getImageData(x,y,width,width);
				objs.push(new obj(a,b));
			}
		}
		this.clr();
		objs.trav(function(d,n){
			objs[n].go();
		});
		
		function obj(ctx, id){
			ctx.putImageData(id,0,0);
			ctx.rotate(20*Math.PI/180);
			this.div=ctx.canvas.parentNode;
			this.xywh=cf.getxywhfromdiv(this.div);
			this.go=function(){
				var cnt=0, v=0, l=this, g=cf.getRandom(1,6),
				tmr=setInterval(function(){
					if(l.xywh.y+v<400){
						l.div.style.top=l.xywh.y+v+"px";
					}else{
						l.div.style.top=l.xywh.y+v+"px";
						clearInterval(tmr);
						stp++;
						chkstop();
					}
					l.div.style.zIndex=1;
					v=v+(cnt/2)*g;
					cnt++;
				},20);
			};
		};
		
		var stp=0;
		function chkstop(){
			var a=376/width;
			if(a>parseInt(a)) a=parseInt(a)+1; else a=parseInt(a);
			var b=330/width;
			if(b>parseInt(b)) b=parseInt(b)+1; else b=parseInt(b);
			
			if(stp==a*b){
				objs.trav(function(d,n){
					cf.killTag(d.div);
				});
				objs=undefined;
				setTimeout(function(){
					ctx.putImageData(imgdata,0,0);
					fnc();
				},1000);
			}
			
		};
		
		
	};
	cp.rot=function(){
		var cnt=0,l=this, id=this.getImageData(0,0,330,367);
		var tmr=setInterval(function(){
			l.clr();
			l.rotate(cnt*Math.PI/180);
			l.putImageData(id,0,0);
			cnt++;
		},20);
	};
	cp.trimg=function(str){
		var img=new Image(), l=this; 
		img.src=str;
		img.onload=function(){
			l.drawImage(img,0,0);
			imgdata=l.getImageData(0,0,330,367), ado=l.toXY(imgdata,330,367);
			
		};
		function trans(x,y,agl){
			var gx=165, gy=183;
			var ox=x, oy=y;
			x=cos(agl)*(ox-gx)-sin(agl)*(oy-gy)+gx;
			y=sin(agl)*(ox-gx)+cos(agl)*(oy-gy)+gy;
			x=pi(x), y=pi(y);
			return {x:x, y:y}
		};
		function pi(num){
			return parseInt(num);
		};
		function br(num){
			var a=parseInt(num/4), w=l.canvas.width;
			var x=a%w, y=parseInt(a/w), th=num%4;
			return {x:x, y:y, th:th}
		};
		function cn(br){
			var w=l.canvas.width, rslt=4*(br.x+br.y*w)+br.th;
			return rslt;
		};
		function cnbr(num){
			return cn(br(num));
		};
		function ope(a,c,w,h,agl){
			var arr=new Array();
			var xn=new Array();
			for(var i=0;i<h;i++){
				for(var k=0;k<w;k++){
					//step 1: 원래 위치에 있는 rgba정보 취득
					var da=a.getClr(k,i,w);
					//step 2: 그 정보가 어디로 가야하는지 캐치(displacement 시행)
					var tp=trans(k,i,agl); arr.push(tp);
					
					if(tp.y>=0&&tp.y<h){
						if(tp.x>=0&&tp.x<w){
							//step 3: receiver의 그 위치에 rgba정보 입력
							c.setClr(tp.x,tp.y,w,da);
					
							if(xn[tp.y]==undefined){
								xn[tp.y]=[tp.x,tp.x];
							}else{
								if(tp.x>xn[tp.y][1]){
									xn[tp.y][1]=tp.x;
								}else if(tp.x<xn[tp.y][0]){
									xn[tp.y][0]=tp.x;
								}
							}
						}
					}
				}
			}
			
	
			
			var cords=new Array(),startNum;
			xn.trav(function(d,n){
				if(d!=undefined){
					if(startNum==undefined) startNum=n;
					for(var i=d[0];i<=d[1];i++){
						var num=c.getNum(i,n,0,w);
						if(c.data[num+3]==0){
							cords.push([num,i,n]);
						}
					}
				}else{
					if(n>=startNum){
						for(var i=0;i<=w-1;i++){
							var num=c.getNum(i,n,0,w);
							if(c.data[num+3]==0){
								cords.push([num,i,n]);
							}
						}
					}
				}
			});
			c.clrCompensate(cords,w);
		};
	};
	
	
	
	
	
	function gethypotenuse(bottom,vertical){
		var a;
		a=bottom*bottom+vertical*vertical;
		return Math.sqrt(a);
	};
	function tan(dg){
		return roundXL(Math.tan(dg*(Math.PI/180)),10);
	};
	function sin(dg){
		return roundXL(Math.sin(dg*(Math.PI/180)),10);
	};
	function cos(dg){
		return roundXL(Math.cos(dg*(Math.PI/180)),10);
	};
	function pt(str){
		var a=str.split(".")[1];
		if(a==undefined){
			if(pnt>0)
				str+=".";
			a="";
		}
		var b=pnt-a.length;
		for(var i=0;i<b;i++){
			str+="0";
		}
		return str;
	};
	function datapositionY(chartHeight,max,min,data){
		var result=chartHeight*(data-min);
		result=result/(max-min);
		result=chartHeight-result;
		return result;
	};
	function getdatabyposition(chartHeight,datapositionY,max,min){
		var result=chartHeight-datapositionY;
		result=result*(max-min);
		result=result/chartHeight;
		result=result+min;

		return result;
	};
	function commify(n){
		var reg=/(^[+-]?\d+)(\d{3})/;
		n += "";
		while(reg.test(n))
			n = n.replace(reg,"$1" + "," + "$2");

		return n;
	};
	function roundXL(n,digits){
		if(n=="void")return false;
		if (digits >= 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림
		digits = Math.pow(10, digits); // 정수부 반올림
		var t = Math.round(n * digits) / digits;
		return parseFloat(t.toFixed(0));
	};
	function rommify(n,num){
		n=n*1;
		return commify(roundXL(n,num));
	};
	function datify(n,opt){
		n+="";
		var len = n.length;
		var y="";
		var m="";
		var d="";
		if(len==8){
			if(opt)
				y=n.substring(0,4);
			else
				y=n.substring(2,4);
			m=n.substring(4,6);
			d=n.substring(6);
		}else if(len==6){
			y=n.substring(0,2);
			m=n.substring(2,4);
			d=n.substring(4);
		}
		return y+"."+m+"."+d;
	};
	function timify(n){
		n+="";
		var len = n.length;
		var y="";
		var m="";
		var d="";
		if(len==8){
			y=n.substring(0,4);
			m=n.substring(4,6);
			d=n.substring(6);
		}else if(len==6){
			y=n.substring(0,2);
			m=n.substring(2,4);
			d=n.substring(4);
		}
		return y+":"+m+":"+d;
	};
	
	
	function increase_brightness(rgbcode, percent) {
		var r = parseInt(rgbcode.slice(1, 3), 16),
			g = parseInt(rgbcode.slice(3, 5), 16),
			b = parseInt(rgbcode.slice(5, 7), 16),
			HSL = rgbToHsl(r, g, b),
			newBrightness = HSL[2] + HSL[2] * (percent / 100), 
			RGB;

		RGB = hslToRgb(HSL[0], HSL[1], newBrightness);
		rgbcode = '#'
			+ convertToTwoDigitHexCodeFromDecimal(RGB[0])
			+ convertToTwoDigitHexCodeFromDecimal(RGB[1])
			+ convertToTwoDigitHexCodeFromDecimal(RGB[2]);

		return rgbcode;
	};
	function convertToTwoDigitHexCodeFromDecimal(decimal){
		var code = Math.round(decimal).toString(16);

		(code.length > 1) || (code = '0' + code);
		return code;
	};
	function rgbToHsl(r, g, b){
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min){
			h = s = 0; // achromatic
		}else{
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max){
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h, s, l];
	};
	function hslToRgb(h, s, l){
		var r, g, b;

		if(s == 0){
			r = g = b = l; // achromatic
		}else{
			function hue2rgb(p, q, t){
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [r * 255, g * 255, b * 255];
	};
	function getRandom(start,end){
		var amount=end-start;
		var rslt=Math.floor(Math.random()*(amount+1)+start);
		return rslt;

	};
		
	
	
	
	
	
	
	
	
	
	window.log=function(){
		var a=new Array();
		for(var i=0;i<arguments.length;i++)
			a.push(arguments[i]);
		console.log(a.join(" "));
	};
	window.dir=function(){
		console.dir(arguments[0]);
	};
	window.trav=function(obj,fnc){
		fnc(obj);
		for(var i=0;i<obj.childNodes.length;i++){
			trav(obj.childNodes[i],fnc);
		}
	};
	window.j=jaehyun;
	window.ielog=function(){
		if(!document.getElementById("ielog")){
			var a=document.createElement("div");
			a.style.position="fixed";
			a.style.top=0+"px";a.style.left=0+"px";a.style.width=100+"px";a.style.height=100+"px";
			a.style.backgroundColor="red";
			a.id="ielog";
			document.body.appendChild(a);
		}else{
			var a=document.getElementById("ielog");
		}
		var str="";
		for(var i=0,lng=arguments.length;i<lng;i++){
			str+=arguments[i]+" ";
		}
		a.innerHTML=str;
	};
})(window);
function jCommon(){
	this.html5;
	this.tmpBrowser=navigator.appName;
	this.tmpVersion=navigator.appVersion;
	this.tmpKit;
	
	if(this.tmpVersion.indexOf("iPad")!=-1) this.tmpKit="iPad";
	if(this.tmpVersion.indexOf("iPhone")!=-1) this.tmpKit="iPhone";
	if(this.tmpVersion.indexOf("Android")!=-1) this.tmpKit="Android";
	if(this.tmpVersion.indexOf("Linux x86_64")!=-1) this.tmpKit="Android";//회사 갤럭시탭
	
	
	if(this.tmpKit){
		if(this.tmpKit!="Android")
			this.os="iOS";
		else
			this.os="Android";
	}else{
		this.tmpKit="web";
	}
	if(this.tmpBrowserName=="IE"){
		this.workareawidth=document.documentElement.clientWidth;
		this.workareaheight=document.documentElement.clientHeight;
	}else{
		this.workareawidth=window.innerWidth;
		this.workareaheight=window.innerHeight;
	}
	
	this.ieversion;
	if(this.tmpBrowser=="Opera"||this.tmpBrowser=="Netscape"){
		if(this.tmpVersion.indexOf("Safari")!=-1){
			if(this.tmpVersion.indexOf("Chrome")!=-1){
				this.tmpBrowserName = "Chrome";
			}else{
				this.tmpBrowserName = "Safari";
			}
		}else if(this.tmpBrowser.indexOf("Opera")!=-1){
			this.tmpBrowserName = "Opera";
		}else{
			this.tmpBrowserName = "Firefox";
		}
		this.html5=true;
	}else if(this.tmpBrowser=="Microsoft Internet Explorer"){
		if(this.tmpVersion.indexOf("MSIE 6.0")!=-1){
			this.ieversion=6;
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 7.0")!=-1){
			this.ieversion=7;
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 8.0")!=-1){
			this.ieversion=8;
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 9.0")!=-1){
			this.ieversion=9;
			this.html5=true;
		}else if(this.tmpVersion.indexOf("MSIE 5.0")!=-1){
			this.ieversion=5;
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 4.0")!=-1){
			this.ieversion=4;
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 3.0")!=-1){
			this.ieversion=3;
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 2.0")!=-1){
			this.html5=false;
		}else if(this.tmpVersion.indexOf("MSIE 1.0")!=-1){
			this.html5=false;
		}else{
			this.html5=true;
		}
		this.tmpBrowserName = "IE";
	}
	if(this.tmpBrowserName=="IE"){
		this.workareawidth=document.documentElement.clientWidth;
		this.workareaheight=document.documentElement.clientHeight;
	}else{
		this.workareawidth=window.innerWidth;
		this.workareaheight=window.innerHeight;
	}
	
	this.imgPath="shinhanComplex/";
	this.eventP;
	//detect samrt device orientation
	window.onorientationchange=detectIPadOrientation;  
	function detectIPadOrientation(){
		if (orientation==0){  
			//alert('Portrait Mode, Home Button bottom');  
		}else if(orientation==90){  
			//alert('Landscape Mode, Home Button right');  
		}else if(orientation==-90){  
			//alert ('Landscape Mode, Home Button left');  
		}else if(orientation==180){  
			//alert ('Portrait Mode, Home Button top');  
		}  
	}  
	
	this.red="rgb(228,53,53)";
	this.blue="rgb(49,123,203)";
	this.yellow="rgb(240,245,33)";
	this.gray="#f9f9f9";
	this.colorset=[this.red,this.blue,this.yellow];
	//this.imgPath="http://www.w-people.co.kr/images/chart/common/";
	this.fontFamily="MalgunGothic, Arial";
	this.fibonacci=[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946];
	this.lcolor=[this.red,this.blue,"red","blue","orange","green",this.yellow];
	this.alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	
	this.getWorkareaSize;
	this.numPeriod;
	this.commify;
	this.datify;
	this.timify;
	this.roundXL;
	this.mkTag;
	this.mkDiv;
	this.mkTable;
	this.timeChecker;
	this.killTag;
	this.mkZero;
	this.mkSelect;
	this.mkTwoButtons;
	this.mkLabelSelect;
	this.mkGrid;
	this.datapositionY;
	this.getdatabyposition;
	this.mkPan;
	this.mkVCross;
	this.mkHCross;
	this.getmax;
	this.getMax;
	this.getArrMax;
	this.getmin;
	this.getMin;
	this.getArrMin;
	this.mkStr;
	this.mkArr;
	this.mkWebGrid;
	this.mkAbsoluteDiv;
	this.mkSerialButtons;
	this.calYear;
	this.calMonth;
	this.calDay;
	this.calDate;
	this.getQuadrant;
	this.getDelpx;
	this.mkTextboxEx;
	this.mkTextbox;
	this.mkTab;
	this.getElementInArray;
	this.delElementInArray;
	this.countClock;
	this.getArr;
	this.arrAllDoThis;
	this.goldenrate;
	this.abyb;
	this.degreetoradian;
	this.radiantodegree;
	this.gethypotenuse;
	this.sintodegree;
	this.percenttodegree;
	this.getDistance;
	this.getRandom;
	this.getClip;
	this.log;
	this.getOffsetLeft;
	this.getOffsetTop;
	this.getxywhfromdiv;
	this.rommify;
	this.delElinArr;
	this.mkCanvas;
	this.swing;
	this.sin;
	this.cos;
	this.getEventPos;
	this.bectorMove;
	this.jsonTraverse;

	this.getframe;
	this.mkMenu;
	this.mkMenuOption;
	this.mkLeftMenuOne;
	this.mkLeftMenuTwo;
	this.mkLeftMenuThree;
	this.complexchartFinalAction;
	
	this.initBambooScroll;
};
jCommon.prototype.getWorkareaSize=function(){
	if(this.tmpBrowserName=="IE"){
		var w=document.documentElement.clientWidth;
		var h=document.documentElement.clientHeight;
	}else{
		var w=window.innerWidth;
		var h=window.innerHeight;
	}
	return {w:w,h:h}
};
jCommon.prototype.numPeriod=function(num){
	num=num+"";
	var result = new Array();
	var tmprest="";
	var rest = (num.length%3);
	var value = parseInt(num.length/3);
	if(num.length>3){
		result[0]=num.substring(0,rest);
		tmprest=num.substring(rest);
		if(tmprest.length>3){
			for(var i=1;i<=value-1;i++){
				result[i]=tmprest.substring(0,3);
				tmprest=tmprest.substring(3);
				if(tmprest.length==3){
					result[i+1]=tmprest;
				}
			}
		}else{
			result[1]=tmprest;
		}
	}
	return result.join();
};
jCommon.prototype.commify=function(n){
	var reg=/(^[+-]?\d+)(\d{3})/;
	n += "";
	while(reg.test(n))
		n = n.replace(reg,"$1" + "," + "$2");

	return n;
};
jCommon.prototype.datify=function(n,opt){
	var len = n.length;
	n+="";
	var y="";
	var m="";
	var d="";
	if(len==8){
		if(opt)
			y=n.substring(0,4);
		else
			y=n.substring(2,4);
		m=n.substring(4,6);
		d=n.substring(6);
	}else if(len==6){
		y=n.substring(0,2);
		m=n.substring(2,4);
		d=n.substring(4);
	}
	return y+"."+m+"."+d;
};
jCommon.prototype.timify=function(n){
	var len = n.length;
	n+="";
	var y="";
	var m="";
	var d="";
	if(len==8){
		y=n.substring(0,4);
		m=n.substring(4,6);
		d=n.substring(6);
	}else if(len==6){
		y=n.substring(0,2);
		m=n.substring(2,4);
		d=n.substring(4);
	}
	return y+":"+m+":"+d;
};
jCommon.prototype.roundXL=function(n,digits){
	
	if(n=="void")return false;

	if (digits >= 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림
    digits = Math.pow(10, digits); // 정수부 반올림
    var t = Math.round(n * digits) / digits;
    return parseFloat(t.toFixed(0));
};
jCommon.prototype.mkTag=function(tagName,parent){
  var doc = document.createElement(tagName);
  parent.appendChild(doc);
  return doc;
};
jCommon.prototype.mkDiv=function(height,parent){
	var doc=document.createElement("div");
	doc.style.display="block";
	doc.style.height=height+"px";
	parent.appendChild(doc);
	return doc;
};
jCommon.prototype.mkTable=function(rowcount,cellcount,parent){
	var arrTable = new Array();
	var table = document.createElement("table");
	table.width="100%";
	table.style.textAlign="center";
	table.style.tableLayout="fixed";
	table.cellSpacing=0+"px";
	for(var i=0;i<rowcount;i++){
		arrTable[i]=new Array();
		if(this.html5){
			var tr = document.createElement("tr");
			table.appendChild(tr);
		}else{
			var tr = table.insertRow(-1);
		}

		for(var j=0;j<cellcount;j++){
			if(this.html5){
				var td = document.createElement("td");
				tr.appendChild(td);
			}else{
				var td = tr.insertCell(-1);
			}
			arrTable[i][j]=td;
		}
	}
	if(parent){
		parent.appendChild(table);
	}
	return {table:table,cells:arrTable};
};
jCommon.prototype.timeChecker=function(){
	var tmp = new Date();
	var str = "";
	str+=tmp.getFullYear()+"-";
	str+=(tmp.getMonth()+1)+"-";
	str+=tmp.getDate()+" ";
	str+=tmp.getHours()+":";
	str+=tmp.getMinutes()+":";
	str+=tmp.getSeconds()+":";
	str+=tmp.getMilliseconds()+"";

};
jCommon.prototype.killTag=function(id){
	if(typeof id=="string"){
		if(document.getElementById(id)){
			var doc = document.getElementById(id);
			doc.parentNode.removeChild(doc);
		}
	}else{
		if(id){
			id.parentNode.removeChild(id);
		}
	}
};
jCommon.prototype.clearTag=function(id){
	if(typeof id=="string"){
		if(document.getElementById(id)){
			var doc = document.getElementById(id);
			doc.innerHTML="";
		}
	}else{
		if(id){
			id.innerHTML="";
		}
	}
};
jCommon.prototype.mkZero=function(n){
	if(n<10){
		n="0"+n;
	}
	return n;
};
jCommon.prototype.mkSelect=function(start,end,selectedNum,parent){
	var doc = document.createElement("select");
	for(var i=start;i<=end;i++){
		var tmpOpt=document.createElement("option");
		doc.appendChild(tmpOpt);
		tmpOpt.innerHTML=i;
		tmpOpt.value=i;
		if(i==selectedNum)
			tmpOpt.selected="selected";
	}
	parent.appendChild(doc);
	return doc;
};
jCommon.prototype.mkTwoButtons=function(text_1,text_2,parent){
	var doc = mkTag("div",parent);
	var tbl = mkTable(1,2);
	doc.appendChild(tbl.table);
	if(html5){
		var fBtn = mkTag("input",tbl.cells[0][0]);
	}else{
		var fBtn = mkTag("button",tbl.cells[0][0]);
		fBtn.innerHTML=text_1;
	}
	if(html5){
		var sBtn = mkTag("input",tbl.cells[0][1]);
		sBtn.type="button";
		sBtn.value=text_2;
	}else{
		var sBtn = mkTag("button",tbl.cells[0][1]);
		sBtn.innerHTML=text_2;
	}
	return {div:doc,table:tbl,fBtn:fBtn,sBtn:sBtn};
};
jCommon.prototype.mkLabelSelect=function(text,start,end,selectedNum,parent){
	var doc = this.mkTag("div",parent);
	doc.style.display="inline-block";
	var tbl = this.mkTable(1,2);
	tbl.table.width="";
	tbl.table.style.display="inline-block";
	doc.appendChild(tbl.table);
	var slct = this.mkSelect(start,end,selectedNum,tbl.cells[0][1]);
	tbl.cells[0][0].innerHTML = text;
	return {div:doc,table:tbl, select:slct};
};
jCommon.prototype.mkGrid=function(rows,cells,id,parent){
	if(typeof id=="string"){
		if(document.getElementById("grid")){
			var indiv=document.getElementById("grid");
		}else{
			var indiv=this.mkTag("div",parent);
		}
	}else{
		var indiv=id;
	}
	this.clearTag(indiv);

	indiv.id="grid";
	indiv.style.border="1px solid gray";
	indiv.style.padding=5+"px";
	indiv.style.marginTop=5+"px";
	indiv.style.backgroundColor="white";

	var tb=this.mkTable(rows,cells,indiv);
	tb.table.cellPadding=1;
	tb.table.cellSpacing=2;
	tb.table.borderCollapse="collapse";
	var cls=tb.cells;
	for(var i=0,lng=cls.length;i<lng;i++){
		for(var j=0,kng=cls[0].length;j<kng;j++){
			cls[i][j].id="c"+i+""+j;
			cls[i][j].style.border="1px solid gray";
			cls[i][j].style.padding=0+"px";
			cls[i][j].style.height=cls[i][j].offsetWidth+"px";
			var m=new jMacro();
			//m.setLineBarChart(5,5,cls[i][j].offsetWidth-70,cls[i][j].offsetHeight-cls[i][j].offsetHeight/6-15,"c"+i+""+j,"line",str,5,100+((i*12+j)*2),150+((i*12+j)*2));
			m.standardChart("c"+i+""+j,cls[i][j].offsetHeight-cls[i][j].offsetHeight/6-15);
		}
	}
};
jCommon.prototype.datapositionY=function(chartHeight,max,min,data){
    var result=chartHeight*(data-min);
    result=result/(max-min);
    result=chartHeight-result;
    return result;
};
jCommon.prototype.getdatabyposition=function(chartHeight,datapositionY,max,min){
    var result=chartHeight-datapositionY;
    result=result*(max-min);
    result=result/chartHeight;
    result=result+min;
    return result;
};
jCommon.prototype.mkPan=function(hh,n,maindiv,opt,clientfnc,currentdata){
	if(!n.global){
		var ns=n;
		n=n[0];
	}

	var g=n.global;
	var x=g.x,y=g.y,w=g.width,h=g.height;
	var cf=this;
	var div=cf.mkTag("div",maindiv);
	var top=y+1,left=x+1,width=w-1,height=h+hh;
	div.style.position="absolute";
	div.style.top=top+"px";
	div.style.left=left+"px";
	div.style.width=width+"px";
	div.style.height=height+"px";
	div.onmouseout=function(){
		vCross.style.display="none";
		hCross.style.display="none";
		tip.style.display="none";
		if(ns){
			for(var i=0,lng=ns.length;i<lng;i++){
				img[i].style.display="none";
			}
		}else{
			img.style.display="none";
		}
	};
	div.style.zIndex=20;

	var arr=new Array();
	for(var i=0,lng=n.global.lane.length;i<lng;i++){
		arr[i]=n.global.lane[i].data;
	}
	
	var maxlane=this.getmax(arr,5).row,minlane=this.getmin(arr,5).row;
	
	

	if(opt){
		maxlane=this.getmax(arr).row;
		minlane=this.getmin(arr).row;
	}
	

	//세로선
	var v=cf.mkVCross(div,height,true);
	var vCross=v.vCross,vLabel=v.label;
	//가로선
	var hc=cf.mkHCross(div,width,true);
	var hCross=hc.hCross,hLabel=hc.label;
	//커서
	var img=cf.mkPanImg(ns,div);
	//툴팁
	var tip=cf.mkAbsoluteDiv(0,0,101,57,div);
	tip.style.background="url("+cf.imgPath+"img/2.png)";
	tip.style.display="none";
	var tipContent=cf.mkTable(2,2,tip);
	var tcCell=tipContent.cells;
	tipContent.table.style.fontSize=11+"px";
	tipContent.table.style.width=85+"%";
	tipContent.table.style.height=65+"%";
	tipContent.table.style.margin=5+"px";
	tipContent.table.style.marginTop=10+"px";
	tcCell[0][0].style.width=25+"px";
	tcCell[0][0].innerHTML="날짜";
	tcCell[1][0].innerHTML="종가";
	tcCell[0][1].style.textAlign="right";
	tcCell[1][1].style.textAlign="right";




	for(var i=0,lng=n.global.lane.length;i<lng;i++){
		var lane=cf.mkTag("div",div);
		lane.style.position="absolute";
		lane.style.top=0+"px";
		lane.style.left=n.global.lane[i].xposition-x-1+"px";
 
		if(i==n.global.lane.length-1){
			lane.style.width=n.global.lane[i].width-1+"px";
		}else{
			lane.style.width=n.global.lane[i].width+"px";
		}
		if(cf.html5){
			lane.style.height=height+"px";
		}else{
			lane.style.height=height-1+"px";
		}

		if(i==maxlane||i==minlane){
			
			var l;
			var d=n.global.data;
			var ln=n.global.lane[i];
			
			if(i==maxlane){
				l=this.mkMinMaxLabel("max",div,ln.data[5]);
				
				if(opt){
					l.label.style.top=cf.datapositionY(h,d.max,d.min,ln.data[3])-14+"px";
				}else{
					l.label.style.top=cf.datapositionY(h,d.max,d.min,ln.data[5])-14+"px";
				}
			}else{
				l=this.mkMinMaxLabel("min",div,ln.data[5]);
				if(opt){
					l.label.style.top=cf.datapositionY(h,d.max,d.min,ln.data[4])+"px";
				}else{
					l.label.style.top=cf.datapositionY(h,d.max,d.min,ln.data[5])+"px";
				}
			}
			l.label.style.left=n.global.lane[i].center-x-5+"px";
		}

		if(ns){
			lane.lane=new Array();
			lane.data=new Array();
			for(var j=0,lng=ns.length;j<lng;j++){
				lane.lane[j]=ns[j].global.lane[i];
				lane.data[j]=ns[j].global.data;
			}
			
		}else{
			lane.lane=n.global.lane[i];
			lane.data=n.global.data;
			lane.currentdata=currentdata[i];
		}

		lane.onmousemove=function(){
			var l=this;
			if(cf.html5){

				vCross.style.display="block";
				hCross.style.display="block";
				tip.style.display="block";
				
				if(ns){
					tip.style.display="none";
					hCross.style.display="none";
					vCross.style.left=this.lane[0].center-x-1+"px";
					vLabel.innerHTML=cf.datify(this.lane[0].data[0]);
					for(var i=0,lng=ns.length;i<lng;i++){
						img[i].style.display="block";
						img[i].style.left=this.lane[i].center-x-1-7+"px";
						img[i].style.top=cf.datapositionY(
							h,
							this.data[i].max,
							this.data[i].min,
							this.lane[i].data[5]
							)-8+"px";
					}
				}else{
					vCross.style.left=this.lane.center-x-1+"px";
					vLabel.innerHTML=cf.datify(this.lane.data[0]);

					img.style.display="block";
					img.style.left=this.lane.center-x-1-7+"px";
					var infoTop=cf.datapositionY(h,this.data.max,this.data.min,this.lane.data[5]);
					img.style.top=infoTop-8+"px";
					
					hCross.style.top=infoTop+"px";
					hLabel.innerHTML=cf.commify(this.lane.data[5]);

					cf.getQuadrant(x,y,w,h,this.lane.center,infoTop,tip);
					tcCell[0][1].innerHTML=cf.datify(this.lane.data[0]);
					tcCell[1][1].innerHTML=cf.commify(this.lane.data[5]);
				}

			}else{
				var count=0;
				var tm=setInterval(function(){
					count++;
					if(count<2){

						vCross.style.display="block";
						hCross.style.display="block";
						
						if(ns){
							vCross.style.left=l.lane[0].center-x-1+"px";
							vLabel.innerHTML=cf.datify(l.lane[0].data[0]);
							for(var i=0,lng=ns.length;i<lng;i++){
								img[i].style.display="block";
								img[i].style.left=l.lane[i].center-x-1-7+"px";
								img[i].style.top=cf.datapositionY(
									h,
									l.data[i].max,
									l.data[i].min,
									l.lane[i].data[5]
									)-8+"px";
							}
						}else{
							
							vCross.style.left=l.lane.center-x-1+"px";
							vLabel.innerHTML=cf.datify(l.lane.data[0]);

							img.style.display="block";
							img.style.left=l.lane.center-x-1-7+"px";
							var infoTop=cf.datapositionY(h,l.data.max,l.data.min,l.lane.data[5]);
							img.style.top=infoTop-8+"px";

							hCross.style.top=infoTop+"px";
							hLabel.innerHTML=cf.commify(l.lane.data[5]);

							cf.getQuadrant(x,y,w,h,l.lane.center,infoTop,tip);
							tcCell[0][1].innerHTML=cf.datify(l.lane.data[0]);
							tcCell[1][1].innerHTML=cf.commify(l.lane.data[5]);
						}
						
					}else{
						clearInterval(tm);
					}
				},10);
			}
			

			//
			if(clientfnc)
				clientfnc(this.lane.data,this.currentdata);
			
			//
		};
	}
};
jCommon.prototype.mkPanImg=function(ns,parent){
	var img;
	var cf=this;
	if(ns){
		var img=new Array();
		for(var i=0,lng=ns.length;i<lng;i++){
			img[i]=cf.mkTag("img",parent);
			img[i].src=this.imgPath+"circle"+(i+1)+".png";
			img[i].style.position="absolute";
			img[i].style.top=0+"px";
			img[i].style.left=0+"px";
			img[i].style.width=15+"px";
			img[i].style.height=15+"px";
			img[i].style.display="none";
		}
	}else{
		var img=cf.mkTag("img",parent);
		img.src=this.imgPath+"point.png";
		img.style.position="absolute";
		img.style.top=0+"px";
		img.style.left=0+"px";
		img.style.width=15+"px";
		img.style.height=15+"px";
		img.style.display="none";
	}
	return img;
};
jCommon.prototype.mkVCross=function(parent,height,opt){
	var vCross=this.mkTag("div",parent);
	vCross.style.position="absolute";
	vCross.style.top=0+"px";
	vCross.style.left=0+"px";
	vCross.style.width=1+"px";
	if(this.html5){
		vCross.style.height=height+"px";
	}else{
		vCross.style.height=height-1+"px";
	}
	vCross.style.backgroundColor="gray";
	vCross.style.display="none";
	if(opt){
		var lwidth=48;
		var padding=2;
		var a=this.mkAbsoluteDiv(-lwidth/2,height,lwidth-padding,15-padding,vCross);
		a.style.backgroundColor="white";
		a.style.border="1px solid gray";
		a.style.paddingTop=a.style.paddingLeft=padding+"px";
		a.style.overflow="hidden";
		a.style.fontSize=11+"px";
	}
	return {vCross:vCross,label:a};
};
jCommon.prototype.mkHCross=function(parent,width,opt){
	var hCross=this.mkTag("div",parent);
	hCross.style.position="absolute";
	hCross.style.top=0+"px";
	hCross.style.left=0+"px";
	hCross.style.width=width+"px";
	hCross.style.height=1+"px";
	hCross.style.backgroundColor="gray";
	hCross.style.display="none";
	if(opt){
		var lwidth=48;
		var padding=2;
		var a=this.mkAbsoluteDiv(width,-15/2,lwidth-padding,15-padding,hCross);
		a.style.backgroundColor="white";
		a.style.border="1px solid gray";
		a.style.paddingTop=a.style.paddingLeft=padding+"px";
		a.style.overflow="hidden";
		a.style.fontSize=11+"px";
	}
	return {hCross:hCross,label:a};
};
jCommon.prototype.mkMinMaxLabel=function(opt,parent,value){
	var div=this.mkTag("div",parent);
	div.style.position="absolute";
	div.style.width=70+"px";
	div.style.height=13+"px";
	div.style.zIndex=-1;
	var t=this.mkTable(1,2,div);
	t.table.cellPadding=0;
	t.table.cellSpacing=0;
	t.table.style.padding=0+"px";
	t.cells[0][0].style.width=10+"px";
	t.cells[0][1].style.width=60+"px";
	t.cells[0][0].style.height=12+"px";
	switch(opt){
		case "max":
			t.cells[0][0].style.background="url("+cf.imgPath+"arrow_max.png) no-repeat";
			t.cells[0][1].style.color=this.red;
			t.cells[0][1].innerHTML="최대:"+this.commify(value);
		break;
		case "min":
			t.cells[0][0].style.background="url("+cf.imgPath+"arrow_min.png) no-repeat";
			t.cells[0][1].style.color=this.blue;
			t.cells[0][1].innerHTML="최소:"+this.commify(value);
		break;
	}
	
	t.cells[0][1].style.textAlign="left";
	t.cells[0][1].style.fontSize=11+"px";
	return {label:div,table:t.table,cells:t.cells};
};
jCommon.prototype.getmax=function(arr,col){
	var max,row;
	var len=arr.length;
	if(col==undefined){
		col=3;
	}
	for(var i=0;i<len;i++){
		if(arr[i][col]!="void"){
			if(max==undefined){
				row=i;
				max=arr[i][col];
			}else{
				if(arr[i][col]*1>max){
					row=i;
					max=arr[i][col];
				}
			}
		}
	}
	if(max==undefined){
		return "void";
	}
	return {max:max*1,row:row};
};
jCommon.prototype.getMax=function(arr){
	var max;
	for(var i=0,lng=arr.length;i<lng;i++){
		if(max==undefined){
			max=arr[i];
		}else{
			if(arr[i]>max){
				max=arr[i]
			}
		}
	}
	return max;
};
jCommon.prototype.getArrMax=function(arr,col){
	
	var max,cnt,row;
	var len=arr.length;
	for(var i=0;i<len;i++){
		var tmp=this.getmax(arr[i],col);
		if(max==undefined){
			cnt=i;
			max=tmp.max;
			row=tmp.row;
		}else{
			if(tmp.max>max){
				cnt=i;
				max=tmp.max;
				row=tmp.row;
			}
		}
	}
	return {max:max*1,num:cnt,row:row}
};
jCommon.prototype.getStrMax=function(str,col){
	var arr=this.mkArr(str);
	var m=this.getmax(arr,5);
	var max=m.max,row=m.row;
	return {max:max*1,row:row};
};
jCommon.prototype.getmin=function(arr,col){
	
	var min,row;
	var len=arr.length;
	if(col==undefined){
		col=4;
	}
	for(var i=0;i<len;i++){
		if(arr[i][col]!="void"){
			if(min==undefined){
				row=i;
				min=arr[i][col]
			}else{
				if(arr[i][col]*1<min){
					row=i;
					min=arr[i][col]
				}
			}
		}
	}
	if(min==undefined){
		return "void";
	}
	return {min:min*1,row:row}
};
jCommon.prototype.getMin=function(arr){
	var min;
	for(var i=0,lng=arr.length;i<lng;i++){
		if(min==undefined){
			min=arr[i];
		}else{
			if(arr[i]<min){
				min=arr[i]
			}
		}
	}
	return min;
};
jCommon.prototype.getArrMin=function(arr,col){
	
	var min,cnt,row;
	var len=arr.length;
	for(var i=0;i<len;i++){
		var tmp=this.getmin(arr[i],col);
		if(min==undefined){
			cnt=i;
			min=tmp.min;
			row=tmp.row;
		}else{
			if(tmp.min<min){
				cnt=i;
				min=tmp.min;
				row=tmp.row;
			}
		}
	}
	return {min:min*1,num:cnt,row:row}
};
jCommon.prototype.getStrMin=function(str,col){
	var arr=this.mkArr(str);
	var m=this.getmin(arr,col);
	var max=m.min,row=m.row;
	return {min:min*1,row:row};
};
jCommon.prototype.mkStr=function(arr){
	var str="";
	for(var i=0,lng=arr.length;i<lng;i++){
		for(var j=0,kng=arr[0].length;j<kng;j++){
			str+=arr[i][j]+"|";
		}
		str+="&";
	}
	return str;
};
jCommon.prototype.mkArr=function(str){
	var arr=new Array();
	var tmp=str.split("|&");
	for(var i=0,lng=tmp.length;i<lng-1;i++){
		arr[i]=tmp[i].split("|");
	}
	return arr;
};
jCommon.prototype.mkWebGrid=function(rowcount,cellcount,parent){
	var arrTable = new Array();
	var table = document.createElement("table");
	table.width="100%";
	table.style.textAlign="center";
	table.style.tableLayout="fixed";
	for(var i=0;i<rowcount;i++){
		arrTable[i]=new Array();
		if(this.html5){
			var tr = document.createElement("tr");
			table.appendChild(tr);
		}else{
			var tr = table.insertRow(-1);
		}

		for(var j=0;j<cellcount;j++){
			if(this.html5){
				var td = document.createElement("td");
				tr.appendChild(td);
			}else{
				var td = tr.insertCell(-1);
			}
			arrTable[i][j]=td;
			td.info=i+","+j;
			td.onclick=function(){
				cellselect(this.info);
			};
		}
	}
	if(parent){
		parent.appendChild(table);
	}

	
	function cellclear(){
		for(var i=0,lng=arrTable.length;i<lng;i++){
			for(var j=0,kng=arrTable[0].length;j<kng;j++){
				arrTable[i][j].style.backgroundColor="";
			}
		}
	};
	function cellselect(cord){
		var tmp=cord.split(",");
		var x=tmp[0],y=tmp[1];
		cellclear();
		for(var i=0;i<=x;i++){
			for(var j=0;j<=y;j++){
				arrTable[i][j].style.backgroundColor="blue";
			}
		}
		arrTable[0][0].style.backgroundColor="blue";
	};

	return {table:table,cells:arrTable};
};
jCommon.prototype.mkAbsoluteDiv=function(x,y,w,h,p){
	var sltr=this.mkTag("div",p);
	sltr.style.position="absolute";
	sltr.style.top=y+"px";
	sltr.style.left=x+"px";
	sltr.style.width=w+"px";
	sltr.style.height=h+"px";
	//sltr.style.backgroundColor="white";
	
	sltr.onselectstart=function(){
		return false;
	};
	
	return sltr;
};
jCommon.prototype.mkSerialButtons=function(x,y,w,h,count,imgs,imgovers,parent,f){
	//var cf=new jCommon();
	var img=this.mkAbsoluteDiv(x,y,w,h,parent);
	var grid=this.mkTable(1,count,img);
	var t=grid.table;
	var cs=grid.cells;
	t.style.height=100+"%";
	t.style.width=100+"%";
	t.style.borderSpacing=0;
	//t.style.backgroundColor="white";
	/*
	
	*/
	for(var i=0;i<count;i++){
		cs[0][i].style.background=imgs[i];
		cs[0][i].info=i;
		cs[0][i].onclick=function(){
			selectabutton(this.info);
			f(this.info);
		}
	}
	selectabutton(0);
	function selectabutton(num){
		for(var i=0;i<count;i++){
			cs[0][i].style.background=imgs[i];
		}
		cs[0][num].style.background=imgovers[num];
	};
	

	return {div:img,buttons:cs[0]};
};
jCommon.prototype.calYear=function(year,int){
	return year+int;
};
jCommon.prototype.calMonth=function(year,month,int){
	var tmpmonth=month+int;
	var yearIncrease=0;
	var realmonth=tmpmonth;
	
	if(tmpmonth>11){
		realmonth=tmpmonth%12;
		yearIncrease=parseInt(tmpmonth/12);
	}else if(tmpmonth<0){
		var tmp = Math.abs(tmpmonth);
		yearIncrease--;
		while(true){
			if(tmp>12){
				tmp-=12;
				realmonth=12-tmp;
				yearIncrease--;
			}else{
				realmonth=12-tmp;
				break;
			}
		}
	}else if(tmpmonth==0){
		realmonth==0;
	}
	
	var year=this.calYear(year,yearIncrease);
	
	return {a:realmonth,b:yearIncrease,c:year};
};
jCommon.prototype.calDay=function(year,month,day,int){

	var days;
	var monthIncrease=0;
	var a=Math.abs(int);
	var realday;
	var tmpyear=year;
	var tmpmonth=month;

	if(int<0){
		if(a<day){
			realday= day + int;
		}else{
			a-=day;
			monthIncrease--;
			while(true){
				var tmon=this.calMonth(tmpyear,tmpmonth,-1);
				tmpyear -= tmon.b;
				tmpmonth = tmon.a;
				days=getdaysofthemonth(tmpyear,tmpmonth);
				if(a>=days){
					a-=days;
					monthIncrease--;
				}else{
					realday=days-a;
					break;
				}
			}
		}
	}else{
		days=getdaysofthemonth(year,month);
		realday=day+a;
		if(realday>days){
			while(true){
				monthIncrease++;
				var tmon=this.calMonth(tmpyear,tmpmonth,1);
				tmpyear+=tmon.b;
				tmpmonth=tmon.a;
				realday-=days;
				days=getdaysofthemonth(tmpyear,tmpmonth);
				if(realday<=days){
					break;
				}
			}
		}
	}

	function getdaysofthemonth(year,month){
		var count=1;
		var d=new Date();
		d.setFullYear(year);
		d.setMonth(month);
		d.setDate(count);
		while(d.getDate(count)*1==count){
			count++;
			d.setDate(count);
		}
		return count-1;
	};

	return {a:realday,b:monthIncrease};
};
jCommon.prototype.getToday=function(){
	var a=new Date();
	var y=a.getFullYear();
	var m=a.getMonth()+1;
	var d=a.getDate();
	var h=a.getHours();
	var mm=a.getMinutes();
	var s=a.getSeconds();
	function f(val){
		if(val<10){
			val="0"+val;
		}
		return val;
	}
	return [y,f(m),f(d),f(h),f(mm),f(s)];
};
jCommon.prototype.calDate=function(str,opt,int){
	
	var sl = str.length;
	var type;
	var y,m,d;
	var tmpDate;
	
	switch(sl){
		case 10:
			type=false;
		break;
		case 8:
			type=true;
		break;
	}

	tmpDate=strBreakingIntoNumber(str);
	y=tmpDate.y;
	m=tmpDate.m;
	d=tmpDate.d;

	function strBreakingIntoNumber(str){
		var y, m, d;
		if(type){
			y=str.substring(0,4)*1;
			m=str.substring(4,6)*1;
			d=str.substring(6)*1;
		}else{
			y=str.substring(0,4)*1;
			m=str.substring(5,7)*1;
			d=str.substring(8)*1;
		}
		return {y:y,m:m,d:d}
	};

	switch(opt){
		case "Y":
			y=this.calYear(y,int);
			m=m-1;
		break;
		case "M":
			var t=this.calMonth(y,m-1,int);
			y=this.calYear(y,t.b);
			m=t.a;
		break;
		case "D":
			var t=this.calDay(y,m-1,d,int);
			var s=this.calMonth(y,m-1,t.b);
			var y=this.calYear(y,s.b);
			var m=s.a;
			var d=t.a;
		break;
	}
	
	function addZero(num){
		var result=num;
		if(num<10)
			result="0"+num;
		
		return result;
	};


	var result="";
	if(type){
		result=y+""+addZero((m+1))+""+addZero(d);
	}else{
		result=y+"-"+addZero((m+1))+"-"+addZero(d);
	}

  return{a:result, y:y,m:m,d:d}

};
jCommon.prototype.getQuadrant=function(x,y,w,h,left,top,div){
	var hHalf=x+w/2;
	if(left>hHalf){
		div.style.left=(left-101-10)-x+"px";
	}else{
		div.style.left=left+10-x+"px";
	}
	var vHalf=h/2;
	if(top>vHalf){
		div.style.top=top-57-10+"px";
	}else{
		div.style.top=top+10+"px";
	}	
};
jCommon.prototype.getDelpx=function(str){
	return str.split("px")[0]*1;
};
jCommon.prototype.shrinkDiv=function(divs,limit,speed,fnc,opt){
	var cf=this;
	var cv=jVar;
	var cc=cv.complexchart;
	var cclp=cc.leftpannel;
	var ccrp=cc.rightpannel;

	var div=divs[0],s=divs[1];
	
	
	
	
	cf.menuchangebeforeaction();
	if(opt){
		var t=setInterval(function(){
			var left=cf.getDelpx(div.style.left);
			var width=cf.getDelpx(div.style.width);
			
			
			
			//console.log(cf.getDelpx(div.style.width)+" "+limit);
			
			if(cf.getDelpx(div.style.width)<=limit){
				cf.menuchangecommonaction();
				clearInterval(t);
			}else{
				if(cf.getDelpx(div.style.width)-speed<limit){
					clearInterval(t);
					div.style.left=cc.width-limit+"px";
					div.style.width=limit+"px";
					s.style.width=limit-10+"px";
					if(fnc)fnc();
					
					cf.menuchangecommonaction();
					
				}else{
					div.style.left=cf.getDelpx(div.style.left)+speed+"px";
					div.style.width=cf.getDelpx(div.style.width)-speed+"px";
					s.style.width=cf.getDelpx(s.style.width)-speed+"px";
				}
			}
		},20);
	}else{
		var t=setInterval(function(){
			if(cf.getDelpx(div.style.width)>limit){
				if(cf.getDelpx(div.style.width)-speed<limit){
					div.style.width=limit+"px";
					s.style.width=limit-cclp.wing+"px";
				}else{
					div.style.width=cf.getDelpx(div.style.width)-speed+"px";
					s.style.width=cf.getDelpx(s.style.width)-speed+"px";
				}
			}else{
				clearInterval(t);
				if(fnc)fnc();
				cf.menuchangecommonaction();
			}
		},20);
	}
		
};
jCommon.prototype.expandDiv=function(divs,limit,speed,fnc,opt){
	var cf=this;
	var cv=jVar;
	var cc=cv.complexchart;
	var cclp=cc.leftpannel;
	var ccrp=cc.rightpannel;

	var div=divs[0],s=divs[1];
	
	
	
	cf.menuchangebeforeaction();
	if(opt){
		var t=setInterval(function(){
			var left=cf.getDelpx(div.style.left);
			var width=cf.getDelpx(div.style.width);
			if(cf.getDelpx(div.style.width)>limit){
				clearInterval(t);
				cf.menuchangecommonaction();
			}else{
				if(cf.getDelpx(div.style.width)+speed>limit){
					clearInterval(t);
					div.style.left=cc.width-limit+"px";
					div.style.width=limit+"px";
					s.style.width=limit-10+"px";
					if(fnc)fnc();
					
					cf.menuchangecommonaction();
					
				}else{
					div.style.left=cf.getDelpx(div.style.left)-speed+"px";
					div.style.width=cf.getDelpx(div.style.width)+speed+"px";
					s.style.width=cf.getDelpx(s.style.width)+speed+"px";
				}
			}
		},20);
	}else{
		var t=setInterval(function(){
			if(cf.getDelpx(div.style.width)<limit){
				if(cf.getDelpx(div.style.width)+speed>limit){
					div.style.width=limit+"px";
					s.style.width=limit-cclp.wing+"px";
				}else{
					div.style.width=cf.getDelpx(div.style.width)+speed+"px";
					s.style.width=cf.getDelpx(s.style.width)+speed+"px";
				}
			}else{
				clearInterval(t);
				if(fnc)fnc();
				cf.menuchangecommonaction();
			}
		},20);
	}
		
};
jCommon.prototype.mkTextboxEx=function(p){
	var a=this.getxywhfromdiv(p);
	var doc=this.mkAbsoluteDiv(0,0,a.w,a.h,p);
	var tbl=this.mkTable(1,1,doc);
	tbl.table.style.height=a.h+"px";
	tbl.table.style.fontSize=11+"px";
	tbl.cells[0][0].style.textAlign="left";
	tbl.cells[0][0].style.paddingLeft=0+"px";
	return {div:doc,table:tbl.table,cell:tbl.cells[0][0]};
};
jCommon.prototype.mkTextbox=function(x,y,w,h,p){
	var doc=this.mkAbsoluteDiv(x,y,w,h,p);
	var tbl=this.mkTable(1,1,doc);
	tbl.table.style.height=h+"px";
	tbl.table.style.fontSize=11+"px";
	tbl.cells[0][0].style.textAlign="left";
	tbl.cells[0][0].style.paddingLeft=0+"px";
	return {div:doc,table:tbl.table,cell:tbl.cells[0][0]};
};
jCommon.prototype.mkTab=function(x,y,w,h,p,fnc){
	var cf=this;
	var tabHeight=20;

	var a=this.mkAbsoluteDiv(x,y,w,h,p);

	//tab 부분
	var b=this.mkAbsoluteDiv(0,0,w,tabHeight,a);
	var c=this.mkTable(1,2,b);
	c.table.style.height=tabHeight+"px";
	c.table.style.fontSize=13+"px";
	c.table.style.fontWeight="bold";
	c.table.style.background="url("+cf.imgPath+"img/tab_left.gif)";

	var one=c.cells[0][0],two=c.cells[0][1];
	one.innerHTML="tab1";
	one.number=0;
	two.innerHTML="tab2";
	two.style.color="#aaaaaa";
	two.number=1;

	one.onclick=function(){
		e.style.display="none";
		d.style.display="block";
		c.table.style.background="url("+cf.imgPath+"img/tab_left.gif)";
		one.style.color="black";
		two.style.color="#aaaaaa";
		fnc(this,f);
	};
	two.onclick=function(){
		d.style.display="none";
		e.style.display="block";
		c.table.style.background="url("+cf.imgPath+"img/tab_right.gif)";
		one.style.color="#aaaaaa";
		two.style.color="black";
		fnc(this,f);
	};

	
	//tab 하단 부분
	var d=this.mkAbsoluteDiv(0,tabHeight,w,h-tabHeight,a);

	var e=this.mkAbsoluteDiv(0,tabHeight,w,h-tabHeight,a);
	e.style.display="none";

	var f={
		div:a,
		tabdiv:b,
		tab:c,
		content:[d,e]
	};
	return f
	
};
jCommon.prototype.getElementInArray=function(arr,el){
	
	for(var i=0,lng=arr.length;i<lng;i++){
		
		if(arr[i]==el){
			
			return i;
		}
		
	}
	
	return -1;
};
jCommon.prototype.delElementInArray=function(arr,el){
	
	var tmp=new Array();
	
	var fn=this.getElementInArray;
	var n=arr.length;

	var a=this.getElementInArray(arr,el);

	if(a==-1){
		arr.push(el);
		return arr;
	}else{
		for(var i=0;i<n;i++){
			var t=arr.pop();
			if(t!=el)
				tmp.push(t);
		}
	}
	
	return tmp;
	
};
jCommon.prototype.countClock=function(limit,number){
	var a=number%limit;
	return a;
};
jCommon.prototype.getArr=function(arr,limit,number){
	var n=arr.length;
	var tmp=new Array();
	var count=0, ch=true;
	for(var i=0;i<n;i++){
		tmp[i]=arr.shift();
	}

	for(var i=0,lng=tmp.length;i<lng;i++){
		if(number!=tmp[i]){
			arr[count]=tmp[i];
			count++;
		}else{
			ch=false;
		}
	}

	if(ch){
		arr.push(number);
	}

	if(arr.length>limit){
		arr.shift();
	}

	return arr;
};
jCommon.prototype.arrAllDoThis=function(arr,fnc){
	for(var i=0,lng=arr.length;i<lng;i++){
		fnc(i);
	}
};
jCommon.prototype.goldenrate=function(num){
	var gr=(Math.sqrt(5)+1)/2;
	var lng, shrt;
	lng=num*gr;
	shrt=num/gr;
	return {lng:lng,shrt:shrt}
};
jCommon.prototype.abyb=function(num){
	var root=cf.roundXL(Math.sqrt(num),0);
	var square=root*root;
	var rest=num-square;
	var p,q;

	
	if(square>num){
		p=q=root;
	}else{
		if(rest<root){
			p=root;
			if(rest==0)
				q=p;
			else
				q=p+1;
		}else if(rest==root){
			p=root+1;
			q=p-1;
		}
	}
	return {width:p,height:q}
};
jCommon.prototype.degreetoradian=function(degree){
	return degree*(Math.PI/180);
};
jCommon.prototype.radiantodegree=function(radian){
	return radian*(180/Math.PI);
};
jCommon.prototype.gethypotenuse=function(bottom,vertical){
	var a;
	a=bottom*bottom+vertical*vertical;
	return Math.sqrt(a);
};
jCommon.prototype.sintodegree=function(dx,dy){
	var mn=2;
	var deg;
	var quadrant;
	var hpt=this.gethypotenuse(
		Math.abs(dx),
		Math.abs(dy)
	);
	
	if(hpt==0)
		var sin=Math.abs(dy);
	else
		var sin=Math.abs(dy)/hpt;
		
	var rad=Math.PI/180;
	for(var i=0;i<=360;i++){
		var ds=this.roundXL(Math.abs(sin-this.roundXL(Math.sin(rad*i),4)),4);
		if(ds<mn){
			deg=i;
			mn=ds;
		}
	}
	
	
	
	if(dx>=0&&dy>=0){
		quadrant=4;
	}else if(dx>=0&&dy<0){
		quadrant=1;
		deg=360-deg;
	}else if(dx<0&&dy>=0){
		quadrant=3;
		deg=180-deg;
	}else if(dx<0&&dy<0){
		quadrant=2;
		deg=180+deg;
	}


	return deg;
};
jCommon.prototype.percenttodegree = function (percent) {
    var result = 360 * percent / 100;
    return result;
};
jCommon.prototype.getDistance=function(x,y){
	//직각 삼각형에서 밑변과 높이를 알 때, 빗변을 구하는 식
	return Math.sqrt(x*x+y*y);
};
jCommon.prototype.getRandom=function(start,end){
	var amount=end-start;
	var rslt=Math.floor(Math.random()*(amount+1)+start);
	return rslt;

};
jCommon.prototype.getClip=function(start,end,data){
	var jdata=new Array();
	var count=0;
	for(var i=start;i<=end;i++){
		jdata[count]=data[i];
		count++;
	}
	return jdata;
};
jCommon.prototype.log=function(base,value){
	var a=Math.log;
	return a(value)/a(base);
};
jCommon.prototype.getOffsetLeft=function(div){
	var a=div;
	var b=document.body;
	var ol=0;
	while(a!=b){
		if(a!=null){
			ol+=a.offsetLeft;
			a=a.parentNode;
		}else{
			break;
		}
	}
	
	return ol;
};
jCommon.prototype.getOffsetTop=function(div){
	var a=div;
	var b=document.body;
	var ot=0;
	while(a!=b){
		ot+=a.offsetTop;
		a=a.parentNode;
	}
	
	return ot;
};
jCommon.prototype.rommify=function(n,num){
	n=n*1;
	return this.commify(this.roundXL(n,num));
};
jCommon.prototype.getxywhfromdiv=function(div){
	var x=this.getDelpx(div.style.left);
	var y=this.getDelpx(div.style.top);
	var w=this.getDelpx(div.style.width);
	var h=this.getDelpx(div.style.height);
	return {x:x,y:y,w:w,h:h}
};
jCommon.prototype.delElinArr=function(arr,num){
	var a=new Array();
	for(var i=0,lng=arr.length;i<lng;i++){
		if(i!=num)
			a.push(arr[i]);
	}
	return a;
};
jCommon.prototype.mkCanvas=function(div){
	var cf=this;
	var a=this.getxywhfromdiv(div);
	var canvas = document.createElement("canvas");
	
	//canvas.style.position="absolute";
	if(cf.html5){
	}else{
		G_vmlCanvasManager.initElement(canvas);
	}
	
	if(this.html5){
		if(this.tmpBrowserName!="Chrome"){
			canvas.width=a.w;
		}else{
			//어느날부턴가 혹은 원래 그런 것인지 몰겠지만....ㅜ,.ㅠ
			//캔버스 너비가 2049 이상이어야지 context.fill()이 먹는다....크롬, 실망...ㅜ,.ㅠ
			//canvas.width=2049;
			canvas.width=a.w;
		}
		canvas.height=a.h;	
	}else{
		canvas.width=a.w;
		canvas.height=a.h;
		canvas.style.width=a.w+"px";
		canvas.style.height=a.h+"px";
	}
	
		//alert(1111);
	//canvas.style.top=0+"px";
	//canvas.style.left=0+"px";
	
	var context = canvas.getContext("2d");
	div.appendChild(canvas);
	
	return context;
	
};
jCommon.prototype.swing=function(limit,num){
	var a=parseInt(num/limit);
	if(a%2==1){
		return limit-(num%limit)
	}else{
		return num%limit
	}
};
jCommon.prototype.sin=function(dg){
	return this.roundXL(Math.sin(dg*(Math.PI/180)),10);
};
jCommon.prototype.cos=function(dg){
	return this.roundXL(Math.cos(dg*(Math.PI/180)),10);
};
jCommon.prototype.getEventPos=function(e,el,p){
	var cf=this;
	var tx = cf.html5?e.pageX:event.x;
	var ty = cf.html5?e.pageY:event.y;
	
	
	var ol=cf.getOffsetLeft(el);
	var ot=cf.getOffsetTop(el);
	/*
	if(p){
		var rx=tx-ol+p.scrollLeft;
		var ry=ty-ot+p.scrollTop;
	}else{
		var rx=tx-ol;
		var ry=ty-ot;
	}
	*/
	var rx=tx-ol, ry=ty-ot;
	if(cf.ieversion<9){
		rx+=ol;ry+=ot;
	}
	
	
	if(e.toString()!="[object MouseEvent]"){
		if(cf.tmpKit=="Android"||cf.tmpKit=="iPad"||cf.tmpKit=="iPhone"){
			var touch=e.targetTouches[0];
			rx=touch.pageX;//-50;
			ry=touch.pageY;
		}
	}
	
	return {x:rx, y:ry}
};
jCommon.prototype.getxy=function(e,obj){
	var cf=this;
	var tx = cf.html5?e.pageX:event.x;
	var ty = cf.html5?e.pageY:event.y;
	
	var ol=cf.getOffsetLeft(obj);
	var ot=cf.getOffsetTop(obj);
	
	var rx=tx-ol-1;
	var ry=ty-ot-1;
	
	return {x:rx,y:ry}
};
jCommon.prototype.bectorMove=function(div,angle,distance,v,fnc){
	var cnt=0;
	var lmtCnt=Math.abs(2*distance/v);
	var px=0;
	var dx;
	var oxy=cf.getxywhfromdiv(div);
	var tmr=setInterval(function(){
		cnt==0?dx=v:dx=-(v/lmtCnt)*cnt+v;
		px+=dx;
		if(px>distance){
			dx=0;
			clearInterval(tmr);
			div.style.left=oxy.x+cf.cos(angle)*distance+"px";
			div.style.top=oxy.y+cf.sin(angle)*distance+"px";
			if(fnc)
				fnc();
		}
		dmove(div,angle,dx);
		cnt++;
	},20);
	
	function dmove(dv,agl,d){
		//현재위치에서 angle방향으로 d만큼 움직이는 함수
		var dx=cf.cos(agl)*d;
		var dy=cf.sin(agl)*d;
		
		var xy=cf.getxywhfromdiv(dv);
		dv.style.left=xy.x+dx+"px";
		dv.style.top=xy.y+dy+"px";
	};
};
jCommon.prototype.bmTo=function(div,tx,ty,v,fnc){
	var cnt=0;
	var px=0;
	var dx;
	var oxy=cf.getxywhfromdiv(div);
	
	var distance=this.gethypotenuse(tx-oxy.x,ty-oxy.y); //목적지까지의 직선의 길이=직각삼각형의 대각선 gethypotenuse(bottom,vertical)
	var angle=this.sintodegree(tx-oxy.x,ty-oxy.y);	//목적지까지의 각도 sintodegree(dx,dy)
	var lmtCnt=Math.abs(2*distance/v);
	
	//console.log(distance,angle);
	
	var tmr=setInterval(function(){
		cnt==0?dx=v:dx=-(v/lmtCnt)*cnt+v;
		px+=dx;
		if(px>distance){
			dx=0;
			clearInterval(tmr);
			div.style.left=tx+"px";
			div.style.top=ty+"px";
			if(fnc)
				fnc();
		}
		
		
		dmove(div,angle,dx);
		cnt++;
	},20);
	
	function dmove(dv,agl,d){
		//현재위치에서 angle방향으로 d만큼 움직이는 함수
		
		var dx=cf.cos(agl)*d;
		var dy=cf.sin(agl)*d;
		
		
		
		var xy=cf.getxywhfromdiv(dv);
		dv.style.left=xy.x+dx+"px";
		dv.style.top=xy.y+dy+"px";
	};
};	
jCommon.prototype.SHA1=function(msg){
 
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toLowerCase();
 
}
jCommon.prototype.encode64=function(input) {
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = utf8_encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	
	
	
	
	function utf8_encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}
	
	
	
	
	
	
	
	
	return output;
};
jCommon.prototype.mkIndicator=function(md){
	var ps={
		x:100,y:0,w:500,h:20,cw:10,ch:20
	};

	var csl=cf.mkAbsoluteDiv(0,ps.y,100,100,md);
	csl.style.textAlign="right";
	csl.innerHTML=0;
	
	var cnt=0;
	var a=cf.mkAbsoluteDiv(ps.x,ps.y,ps.w,ps.h,md);
	a.style.backgroundColor="white";
	a.addEventListener("touchstart",function(event){
		event.preventDefault();
	},false);
	a.addEventListener("touchmove",function(event){
		event.preventDefault();
		var p=cf.getEventPos(event,a).x;
		if(p<0||p>500-10){
			if(p<0){
				cr.style.left=-1+"px";
			}
			return false;
		}
		cr.style.left=p+"px";
		csl.innerHTML=p;
	},false);
	a.addEventListener("touchend",function(event){
		event.preventDefault();
	},false);
	
	
	var pin=cf.mkAbsoluteDiv(0,10,ps.w,1,a);
	pin.style.backgroundColor="red";
	
	var cr=cf.mkAbsoluteDiv(0,ps.h/2-ps.ch/2,ps.cw,ps.ch,a);
	cr.style.backgroundColor="yellow";
};
jCommon.prototype.jsonTraverse=function(json){
	var arr=new Array();
	for(var i in json){
		arr.push(json[i]);
		if(typeof json[i]=="object"&&!json[i].length){
			traverse(json[i]);
		}
	}
	return arr;
};
jCommon.prototype.jsonParser=function(json){
	var cnt=0;
	var arr=new Array();
	arr.push([cnt,"js","root"]);
	traverse("js",js,arr);
	function traverse(j,json,arr){
		cnt++;
		var thiscnt=cnt;
		for(var i in json){
			arr.push([thiscnt,i,j]);
			if(typeof json[i]=="object"&&!(json[i] instanceof Array)){
				traverse(i,json[i],arr);
			}
		}
	}
	
	//this.arr=arr;
	
	var objarr=new Array();
	function obj(id,name, parent, children,depth){
		this.id=id;
		this.name=name;
		this.parent=parent;
		this.chilren=children;
		this.depth=depth;
	};
	
	for(var i=0;i<arr.length;i++){
		var a=new obj(
			i,
			arr[i][1],
			getParent(i),
			getChildren(i),
			arr[i][0]
		);
		objarr.push(a);
	}
	return objarr;
	
	//console.log(getChildren(1));
	
	function getParent(index){
		var ct=index;
		var a=arr[index][0];
		if(a==0){
			return 0;
		}
		while(true){
			ct--;
			if(a-1==arr[ct][0]){
				return ct;
			}
		}
		
	};
	function getChildren(index){
		if(index==arr.length-1) return [];
		var rslt=new Array();
		var a=arr[index][0];
		var ct=index;
		
		if(arr[index+1][0]==a+1){
			ct++;
			while(arr[ct][0]>a){
				if(arr[ct][0]==a+1){
					rslt.push(ct);
				}
				ct++;
				if(ct==arr.length) break;
			}
		}
		return rslt;
	};

};
//==============================================================================================================
//==============================================================================================================
jCommon.prototype.pos=function(){
	//2013.8.9
	//소실점(Gx,Gy,Gz)있는 평면에서 x,y,z좌표가 있을 때, 이를 x,y평면좌표로 바꿔 줌
	var len=arguments.length;
	if(len==6){
		var Gx=arguments[0], Gy=arguments[1], Gz=arguments[2],
			x=arguments[3], y=arguments[4], z=arguments[5];
	}else if(len==2){
		var Gx=arguments[0].x, Gy=arguments[0].y, Gz=arguments[0].z,
			x=arguments[1].x, y=arguments[1].y, z=arguments[1].z;
	}
	
	//log(Gx, Gy, Gz, x, y, z);
	
	var lng=this.gethypotenuse(Gx-x,Gy-y);
	var cos=(Gx-x)/lng;
	var sin=(Gy-y)/lng;
	var r=(Gz-z)/Gz;
	z=lng/(Gz/z);
	return{x:x+cos*z,y:y+sin*z,r:r}
};
jCommon.prototype.traverse=function(el,fnc){
	//2013.8.9 el의 자식노드들을 순회하는 함수
	fnc(el);
	var a=el.childNodes.length;
	for(var i=0;i<a;i++){
		this.traverse(el.childNodes[i],fnc);
	}
};
jCommon.prototype.disPic=function(){
	//2013.8.9
	//이미지를 좌상(x1,y1)과 우상(x2,y2) 좌표에 맞춰 상하대칭으로 왜곡시키는 함수
	var len=arguments.length, args=arguments;
	if(len==6){
		var ctx=args[0], img=args[1], x1=args[2], y1=args[3], x2=args[4], y2=args[5];
	}else if(len==4){
		var ctx=args[0], img=args[1], x1=args[2].x, y1=args[2].y, 
			x2=args[3].x, y2=args[3].y;
	}
	img.onload==null? args[1].onload=a:a();
		
	function a(){
		var w=x2-x1, h=y2-y1, ow=img.width, oh=img.height, r=w/ow;
		if(w<0) w=0;
		if(parseInt(r)==1&&y1==y2){
			ctx.drawImage(img,x1,y1);
		}else{
			for(var i=0;i<ow;i++){
				var icr=r*i, a=icr*h/w, b=x1+icr, c=(oh/2-y1-a)*2, d=y1+a;
				ctx.drawImage(img,i,0,1,oh,b,d,1,c);
			}
		}
	};
};
jCommon.prototype.cube=function(ctx,pic1,pic2,z,v,fnc){
	//2013.8.9
	//정육면체 회전방식으로 이미지를 교체하는 효과를 내는 함수
	var cf=this,num=0,lng=pic1.width,l=Math.sqrt(lng/2*lng/2+lng/2*lng/2),
		Gx=pic1.width/2,Gy=pic1.height/2,Gz=z;
	
	var tmr=setInterval(function(){
		ctx.canvas.width=ctx.canvas.width;
		
		var x=lng/2+cf.sin(num-45)*l,z=lng/2+cf.cos(num-45)*l;
		var x1=lng/2+cf.sin(num+45)*l,z1=lng/2+cf.cos(num+45)*l;
		
		var x2=lng/2+cf.sin(num+225)*l,z2=lng/2+cf.cos(num+225)*l;
		var x3=lng/2+cf.sin(num+135)*l,z3=lng/2+cf.cos(num+135)*l;
		/*
		ln(x,lng,z,x,0,z,ctx,"red");
		ln(x1,lng,z1,x1,0,z1,ctx,"red");
		ln(x2,lng,z2,x2,0,z2,ctx,"red");
		ln(x3,lng,z3,x3,0,z3,ctx,"red");
		*/
		
		var w=x1-x;
		var p1=cf.pos(Gx,Gy,Gz,x,0,z), p2=cf.pos(Gx,Gy,Gz,x2,0,z2);
		cf.disPic(ctx,pic1,p1.x,p1.y,p2.x,p2.y);
		var w=x2-x;
		var p1=cf.pos(Gx,Gy,Gz,x2,0,z2), p2=cf.pos(Gx,Gy,Gz,x3,0,z3);
		cf.disPic(ctx,pic2,p1.x,p1.y,p2.x,p2.y);

		num-=v;
		if(num<-90){
			clearInterval(tmr);
			if(fnc) fnc();
		}
	},20);
};
jCommon.prototype.cubeEx=function(ctx,pic1,pic2,z,v,fnc){
	var img=new Image(), img1=new Image();
	img.src=pic1,img1.src=pic2, cf=this;
	img.onload=function(){
		setTimeout(function(){
			cf.cube(ctx,img,img1,z,v,fnc)
		},50);
	}
}
jCommon.prototype.getImgName=function(el){
	//2013.8.9
	//element의 배경이미지의 파일명을 반환함.
	var url=el.style.background;
	var a=url.split("(")[1], b=a.split(")")[0];
	return b;
};
jCommon.prototype.chgImg=function(el,str){
	//2013.8.9
	//element의 파일명을 교체해 줌.
	var url=el.style.background;
	var a=url.split("("), b=a[1].split(")"),c=b[0];
	el.style.background=a[0]+"("+str+")"+b[1];
};
jCommon.prototype.cord=function(a,b,c){
	this.x=a;
	this.y=b;
	this.z=c==undefined?0:c;
};
jCommon.prototype.posCord=function(){
	var a=this.pos(arguments[0],arguments[1]);
	return {x:a.x,y:a.y}
};

jCommon.prototype.trImg=function(ctx,strImg){
	var img=new Image(); img.src=strImg;
	img.onload=function(){
		ctx.drawImage(img,0,0);
		for(var i=0,lng=img.width;i<lng;i++){
			for(var k=0,kng=img.height;k<kng;k++){
				ctx.drawImage(img,
					i,k,1,1,
					i,kng-k+140,1,1
				);
			}
		}
		
		for(var i=0,lng=img.width;i<lng;i++){
			for(var k=0,kng=img.height;k<kng;k++){
				ctx.drawImage(img,
					i,k,1,1,
					lng-i+140,kng-k+140,1,1
				);
			}
		}
		
		for(var i=0,lng=img.width;i<lng;i++){
			for(var k=0,kng=img.height;k<kng;k++){
				ctx.drawImage(img,
					i,k,1,1,
					lng-i+140,k,1,1
				);
			}
		}
		
		var gr=ctx.createLinearGradient(0,140,0,280);
		gr.addColorStop(0,"rgba(255,255,255,0.7)");
		gr.addColorStop(1,"rgba(255,255,255,1)");
		ctx.fillStyle=gr;
		ctx.fillRect(0,140,280,140);
	};
};
jCommon.prototype.tmr=function(fnc){
	var cnt=0;
	var tmr=setInterval(function(){
		fnc(cnt,tmr);
		cnt++;
	},20);
	
};
jCommon.prototype.tq=function(tmr){
	clearInterval(tmr);
};

jCommon.prototype.clact=function(ctx,fnc){
	var l=this;
	this.tmr(function(n,t){
		l.ctxclr(ctx);
		fnc(n,t);
	});
};
jCommon.prototype.arc=function(){
	var ar=arguments;
	ar[0].beginPath();
	ar[0].arc(ar[1].x,ar[1].y,50*ar[1].r,0,Math.PI*2,false);
	ar[0].fillStyle="white";
	ar[0].fill();
	ar[0].stroke();
};
jCommon.prototype.lns=function(){
	var ar=arguments;
	var w=ar[0].canvas.width, h=ar[0].canvas.height;
	var ps=[
			[0,0],[0,h/4],[0,h/2],[0,h*3/4],
			[0,h],[w/4,h],[w/2,h],[w*3/4,h],
			[w,h],[w,h*3/4],[w,h/2],[w,h/4],
			[w,0],[w*3/4,0],[w/2,0],[w/4,0]
		];
	lns();
	function lns(){
		ps.trav(function(d,n){
			line(d[0],d[1],ar[0]);
		});
	};
	function line(x,y,ctx,clr){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(ar[1].x,ar[1].y);
		ctx.strokeStyle=clr==undefined?"#aaaaaa":clr;
		ctx.stroke();
	};
};
jCommon.prototype.dx=function(x,v,a,n){
	return x+v*n+a*n*n/2;
};

jCommon.prototype.ctxclr=function(ctx){
	ctx.canvas.width=ctx.canvas.width;
};
jCommon.prototype.ctxtest=function(){
	//2013.8.9
	//캔버스의 context가 정상적으로 동작하는지 테스트하는 함수
	var a=arguments[0];
	a.moveTo(0,0);
	a.lineTo(100,100);
	a.stroke();
};
jCommon.prototype.img=function(ctx,strImg){
	var img=new Image(); img.src=strImg;
	img.onload=function(){
		ctx.drawImage(img,0,0);
	};
};

function ajaxcallforstock(){
	var html5;
	var tmpBrowser = navigator.appName;
	var tmpVersion = navigator.appVersion;
	var ieversion=undefined;
	if(tmpBrowser=="Opera"||tmpBrowser=="Netscape"){
		if(tmpVersion.indexOf("Safari")!=-1){
			if(tmpVersion.indexOf("Chrome")!=-1){
				tmpBrowserName = "Chrome";
			}else{
				tmpBrowserName = "Safari";
			}
		}else if(tmpBrowser.indexOf("Opera")!=-1){
			tmpBrowserName = "Opera";
		}else{
			tmpBrowserName = "Firefox";
		}
		html5=true;
	}else if(tmpBrowser=="Microsoft Internet Explorer"){
		if(tmpVersion.indexOf("MSIE 6.0")!=-1){
			ieversion=6;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 7.0")!=-1){
			ieversion=7;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 8.0")!=-1){
			ieversion=8;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 5.0")!=-1){
			ieversion=5;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 4.0")!=-1){
			ieversion=4;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 3.0")!=-1){
			ieversion=3;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 2.0")!=-1){
			ieversion=2;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 1.0")!=-1){
			ieversion=1;
			html5=false;
		}else{
			html5=true;
		}
		tmpBrowserName = "IE";
	}

	this.xmlHttp;
	var j = this;

	var HTTP = {};
	HTTP._factories =[
		function(){return new XMLHttpRequest()},  // 표준
		function(){return new ActiveObject("Msxml12.XMLHTTP")},
		function(){return new ActiveXObject("Msxml13.XMLHTTP")},
		function(){return new ActiveXObject("Miscrosoft.XMLHTTP")}
	];
	HTTP.createXMLHTTPObject=function(){
		var xmlHTTP=null;
//		for(var i=0;i<HTTP._factories.length;i++){
//			try{
//				xmlHTTP = HTTP._factories[i]();
//			}catch(e){
//				continue;
//			}
//			break;
//		}
		if(html5){
			xmlHTTP=new XMLHttpRequest();
		}else{
			if(ieversion){
				if(ieversion<7){
					xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
				}else{
					xmlHTTP=new XMLHttpRequest();
				}
			}
		}
		return xmlHTTP;
	};

	this.jAjax = function(code,type,opt){

		if(!opt){
			var addr="http://www.shinhaninvest.com/sp/stock/chart_data.jsp?code="+code+"&type="+type;
		}else{
			var addr="http://www.shinhaninvest.com/sp/stock/chart_data.jsp?code="+code+"&type="+type+"&opt=true";
		}

		j.xmlHttp= HTTP.createXMLHTTPObject();
		j.xmlHttp.onreadystatechange = on_ReadyStateChange;
		j.xmlHttp.open("GET", addr, true);
		j.xmlHttp.send(null);
	};
	function on_ReadyStateChange(){
		if(j.xmlHttp.readyState==4){
			if(j.xmlHttp.status==200){
				var data = j.xmlHttp.responseText;
				j.ajaxcallback(data);
			}else{
				//ajaxcallback(xmlHttp.status);
			}

		}
	};
};
function ajaxcallforgeneral(){

	var html5;
	var tmpBrowser = navigator.appName;
	var tmpVersion = navigator.appVersion;
	var ieversion=undefined;
	if(tmpBrowser=="Opera"||tmpBrowser=="Netscape"){
		if(tmpVersion.indexOf("Safari")!=-1){
			if(tmpVersion.indexOf("Chrome")!=-1){
				tmpBrowserName = "Chrome";
			}else{
				tmpBrowserName = "Safari";
			}
		}else if(tmpBrowser.indexOf("Opera")!=-1){
			tmpBrowserName = "Opera";
		}else{
			tmpBrowserName = "Firefox";
		}
		html5=true;
	}else if(tmpBrowser=="Microsoft Internet Explorer"){
		if(tmpVersion.indexOf("MSIE 6.0")!=-1){
			ieversion=6;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 7.0")!=-1){
			ieversion=7;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 8.0")!=-1){
			ieversion=8;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 5.0")!=-1){
			ieversion=5;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 4.0")!=-1){
			ieversion=4;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 3.0")!=-1){
			ieversion=3;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 2.0")!=-1){
			ieversion=2;
			html5=false;
		}else if(tmpVersion.indexOf("MSIE 1.0")!=-1){
			ieversion=1;
			html5=false;
		}else{
			html5=true;
		}
		tmpBrowserName = "IE";
	}



	this.xmlHttp;
	var j = this;
	var HTTP = {};
	HTTP._factories =[
		function(){return new XMLHttpRequest()},  // 표준
		function(){return new ActiveObject("Msxml12.XMLHTTP")},
		function(){return new ActiveXObject("Msxml13.XMLHTTP")},
		function(){return new ActiveXObject("Miscrosoft.XMLHTTP")}
	];
	HTTP.createXMLHTTPObject=function(){
		var xmlHTTP=null;
		//xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
//		alert(xmlHTTP);
//		for(var i=0;i<HTTP._factories.length;i++){
//			try{
//				xmlHTTP = HTTP._factories[i]();
//
//			}catch(e){
//				continue;
//			}
//			break;
//		}
		if(html5){
			xmlHTTP=new XMLHttpRequest();
		}else{
			if(ieversion){
				if(ieversion<7){
					xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
				}else{
					xmlHTTP=new XMLHttpRequest();
				}
			}
		}
		return xmlHTTP;
	};
	this.jAjax = function(address){
		j.xmlHttp= HTTP.createXMLHTTPObject();
		j.xmlHttp.onreadystatechange=on_ReadyStateChange;
		j.xmlHttp.open("GET", address, true);
		j.xmlHttp.send(null);
	};
	this.post=function(addr,prm){
		j.xmlHttp= HTTP.createXMLHTTPObject();
		j.xmlHttp.onreadystatechange=on_ReadyStateChange;
		j.xmlHttp.open("POST", addr, true);
		//post일 때 반드시 설정...안해주면 안 됨...
		j.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		j.xmlHttp.send(prm);
	};
	this.file=function(addr,prm){
		j.xmlHttp= HTTP.createXMLHTTPObject();
		j.xmlHttp.onreadystatechange=on_ReadyStateChange;
		j.xmlHttp.open("POST", addr, true);
		j.xmlHttp.send(prm);
	};
	function on_ReadyStateChange(){
		if(j.xmlHttp.readyState==4){
			if(j.xmlHttp.status==200){
				var data = j.xmlHttp.responseText;
				j.ajaxcallback(data);
			}else{
				//ajaxcallback(xmlHttp.status);
			}
		}
	};
};

jCommon.prototype.cutHead=function(str,num){
	return str.substring(num);
};
jCommon.prototype.getHead=function(str,num){
	return str.substring(0,num);
};
jCommon.prototype.cutTail=function(str,num){
	return str.substring(0,str.length-num);
};
jCommon.prototype.getTail=function(str,num){
	return str.substring(str.length-num);
};
jCommon.prototype.mkOpt=function(p,ar){
	var a=document.createElement("select");
	ar.trav(function(d,n){
		var b=document.createElement("option");
		b.text=d;
		if(cf.html5)
			a.add(b,null);
		else
			a.add(b,a.options[null]);
	});
	p.appendChild(a);
	return a;
};
jCommon.prototype.insdiv=function(div,el,idx){
	var index;
	if(idx!=undefined) index=idx;
	else index=0;
	if(div.childNodes.length>0){
		div.insertBefore(el,div.children[index]);
	}else{
		div.appendChild(el);
	}
};
//2014.01 in dongbu
jCommon.prototype.getGet=function(){
	var url=document.URL, u=url.split("?")[1], a={};
	if(u){
		var arr=u.split("&");
		arr.trav(function(d,n){
			var t=d.split("=");
			a[t[0]]=t[1];
		});
	}else{
		return false;
	}
	return a;
};
jCommon.prototype.post=function(addr,prm,fnc){
	var a=new ajaxcallforgeneral();
	a.post(addr,prm);
	a.ajaxcallback=function(d){
		fnc(d)
	};
};
jCommon.prototype.tojson=function(str){
	return JSON.parse(str);
};
jCommon.prototype.jsnstr=function(jsn){
	return JSON.stringify(jsn);
};


jCommon.prototype.getel=function(str,p){
	
	var a=this.getHead(str,1),
		b=this.cutHead(str,1),
		rslt;
	
	if(p==undefined) p=document;
	
	var cnt=0;
	if(!this.html5){
		rslt=new Array();
		if(a==".")
			cf.traverse(p,function(el){
				if(el.className)
					if(el.className.indexOf(b)!=-1) rslt.push(el);
			});
		if(a=="!")
			cf.traverse(p,function(el){
				if(el.tagName==b.toUpperCase()) rslt.push(el);
			});
	}else{
		if(a==".") rslt=p.getElementsByClassName(b);
		if(a=="!") rslt=p.getElementsByTagName(b);
	}
	return rslt;
};
jCommon.prototype.emptyTbody=function(tbody){
	var ar=new Array();
	for(var i=0, lng=tbody.children.length;i<lng;i++) ar.push(tbody.children[i]);
	while(ar.length>0) this.killTag(ar.pop());
};
jCommon.prototype.tbody=function(t,r,c){
	return t.children[r].children[c]
};
jCommon.prototype.barEvent=function(event){
	if(event.preventDefault) event.preventDefault();
	else event.returnValue=false;
};
jCommon.prototype.addzero=function(num){
	var result=num;
	if(num<10)
		result="0"+num;
	return result;
};
jCommon.prototype.emptyChildren=function(el){
	while(el.children.length>0){
		el.removeChild(el.children[0]);
	};
};

//2014.04 in dongbu
jCommon.prototype.getCho=function(chr){
	var cs=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
	var chrs=["가","까","나","다","따","라","마","바","빠","사","싸","아","자","짜","차","카","타","파","하", "힣"];
	var rs;
	var unicodes=new Array();
	var comp=chr.charCodeAt(0);
	var nd="힣".charCodeAt(0);
	var st="가".charCodeAt(0);
	chrs.trav(function(d,n){unicodes.push(d.charCodeAt(0))});
	cs.trav(function(d,n){
		if(chr==d){
			rs=chr;
			return true;
		}
	});
	if(rs==undefined)
		unicodes.trav(function(d,n){
			if(comp<d){
				rs=cs[n-1];
				return true;
			}
		});
	
	if(rs==undefined) rs=chr=="힣"?"ㅎ":chr;
	return rs;
};
jCommon.prototype.getChos=function(str){
	var rs="";
	for(var i=0, lng=str.length;i<lng;i++)
		rs+=this.getCho(str[i]);
	return rs;
};

// 2014.06.07 add(mkText)
jCommon.prototype.mkText = function(text, p) {
	text = ""+ text;
	var textNode = document.createTextNode(text);
	if (p) p.appendChild(textNode);
	return textNode;
};
// 2014.06.07 add(settAttr, getAttr, setCss, addEvent)
jCommon.prototype.setAttr = function(target, attrInfo) {	
	for (var el in attrInfo) {
		if (target.setAttribute) { target.setAttribute(el, attrInfo[el]); }
		else { target[el] = attrInfo[el]; }
	}
};
jCommon.prototype.getAttr = function(target, attr) {
	attr = ""+ attr;
	var rtnVal = "";
	
	if (target.getAttribute) { rtnVal = target.getAttribute(attr); }
	else { rtnVal = target[attr]; }

	return rtnVal;
};
jCommon.prototype.setCss = function(target, css) {
	var cssInfo = target.style.cssText,
		str = ";";

	for(var el in css) {
		str += getUpper(el)+":"+css[el]+";";
	}
	target.style.cssText = cssInfo + str;

	function getUpper(str) {
		var chars = "abcdefghijklmnopqrstuvwxyz";
		for(var i=0, len=str.length; i<len; i++) {
			if(chars.indexOf(str.charAt(i))==-1) {
				var tp = str.split(str.charAt(i));
				tp = tp.join("-"+str.charAt(i).toLowerCase());
				
				return tp;
			}
		}
		
		return str;
	}
};
jCommon.prototype.addEvent = function(node, event, fnc) {
	if (node.addEventListener) node.addEventListener(event, fnc, false);
	else if (node.attachEvent) node.attachEvent("on"+ event, fnc);
	else node["on"+ event] = fnc;
};