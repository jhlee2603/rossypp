jWidget.prototype.callBoard=function(str,fnc){	
	jW.jp("gboardreg.html","work=select&kind="+str,function(d){
		var a=d.mkArr(spt.join(""),spt[0]);
		fnc(a);	
	});
};
jWidget.prototype.callBackgroundMusic=function(){
	var bgCnt=cf.getRandom(0,jW.arBg.length-1);
	var bgm=new Audio(jW.arBg[bgCnt]);
	dir(bgm);
	bgm.play();
	
	bgm.addEventListener("ended",function(){
		bgCnt++;
		bgm.src=jW.arBg[cf.countClock(jW.arBg.length,bgCnt)];
		bgm.play();
	});
};
jWidget.prototype.callHeaderMenu=function(obj){
	var els=new Array();
	var subHeight=200;
	//obj.p.style.backgroundColor="yellow";
	obj.p.style.paddingTop=5+"px";
	obj.p.style.paddingBottom=5+"px";
	//obj.p.style.height=25+"px";
	
	var opn=false;
	var selectedMenu;
	this.menu.trav(function(d,n){
		var span=cf.mkTag("span",obj.p);
		span.num=n;
		span.innerHTML="&nbsp;&nbsp;"+d.name+"&nbsp;&nbsp;&nbsp;";
		els.push(span);
	});

	var sub=cf.mkTag("div",obj.p);
	sub.style.position="relative";
	sub.style.height=subHeight+"px";
	sub.style.display="none";
	sub.style.backgroundColor=cf.blue;
	sub.style.border="1px solid "+cf.blue;
	sub.style.overflow="hidden";
	sub.onmousemove=function(){
		opn=true;
		sub.style.display="block";
	};
	
	els.trav(function(d,n){
		d.onmousemove=function(){
			//this.style.textDecoration="underline";
			this.style.color=cf.blue;
			if(this.num!=selectedMenu){
				jW.callSubMenu({p:sub,num:this.num});
			}
			selectedMenu=this.num;
			opn=true;
			open(true);
		};
		d.onmouseout=function(){
			this.style.textDecoration="none";
			this.style.color="black";
			//obj.p.style.height=25+"px";
			opn=false;
			open(false);
		};
	});
	sub.onmouseout=function(){
		opn=false;
		open(false);
	};
	//jW.callSubMenu({p:sub, num:0});
	
	function open(opt){
		opt?
			setTimeout(function(){
				if(opn)
					sub.style.display="block";
			},200)
			:
			setTimeout(function(){
				if(!opn)
					sub.style.display="none";
			},200);
				
	};


};
jWidget.prototype.callSubMenu=function(obj){
	var sub=obj.p, num=obj.num;
	var subHeight=200;
	var SUBDVS=new Array();
	var arrVideo=[
		"//www.youtube.com/embed/vIlokFKsGHc?list=PLfKMyTOAcmAuzs3uvgtQ8pcrcqAOzjoqr?rel=0",
		"//www.youtube.com/embed/3ueL6xl9myc?list=PLfKMyTOAcmAuzs3uvgtQ8pcrcqAOzjoqr?rel=0",
		"//www.youtube.com/embed/WTWJmsFpyzI?list=PLfKMyTOAcmAuzs3uvgtQ8pcrcqAOzjoqr?rel=0",
		"//www.youtube.com/embed/8pTeZoDF27g?rel=0"
	];
	var herself=[
		"../img/rossy/herself/IMG_2987_700x467.JPG",
		"../img/rossy/herself/IMG_3252_700x467.JPG",
		"../img/rossy/herself/IMG_8882_1_500x750.jpg",
		"../img/rossy/herself/IMG_9071_700x1050.JPG",
		"../img/rossy/herself/IMG_3198_700x1050.JPG",
		"../img/rossy/herself/IMG_8863_2_700x495.jpg",
		"../img/rossy/herself/IMG_8982_1_700x430.jpg",
		"../img/rossy/herself/whoisrossypp_200x200.jpg"
	];
	var arPrts=[0,250,500,750];
	var PRTS=new Array();
	sub.innerHTML="";
	SUBDVS=new Array();
	mkPartition();
	jW.menu[num].sub.trav(function(d,n){
		var dv=cf.mkTag("div",PRTS[0]);
		dv.style.paddingTop=(n==0?10:0)+"px";
		dv.style.paddingLeft=30+"px";
		dv.style.color="white";
		dv.style.fontWeight="bold";
		dv.style.fontFamily="Book Antiqua, Courier New";
		dv.innerHTML=d;
		SUBDVS.push(dv);
		dv.onmousemove=function(){
			this.style.color="yellow";
		};
		dv.onmouseout=function(){
			this.style.color="white";
		};
		dv.onclick=function(){
			location.href="sub.html?main="+num+"&sub="+n;
		};
	});
	if(num==0){
		//PRTS[1].style.backgroundImage="url("+herself[0]+")";
		PRTS.trav(function(d,n){
			if(n!=0) mkImg(d,n);
		});
	}
	if(num==1){
		var vd=cf.mkAbsoluteDiv(10,10,230,180,PRTS[2]);
		var fr=cf.mkTag("iframe",vd);
		fr.width="227";
		fr.height="180";
		fr.src=arrVideo[cf.getRandom(0,3)];
		fr.frameborder=0;

		var cvr=cf.mkAbsoluteDiv(0,0,250,200,PRTS[2]);
		//cvr.style.backgroundColor="red";

		PRTS[1].innerHTML=jW.strIntro;
		PRTS[1].style.color="white";
		PRTS[1].style.fontSize=15+"px";
		PRTS[1].style.fontFamily="Serif";
		//PRTS[1].style.fontWeight="bold";
		PRTS[1].style.textAlign="justify";

		var tbl=cf.mkTable(7,3,PRTS[3]);
		var tt=["TITLE","TYPE","DATE"];
		tbl.table.style.height=180+"px";
		tbl.cells.trav(function(d,n){
			d.trav(function(t,m){
				t.style.color="white";
				t.style.fontSize=12+"px";
				t.style.fontWeight="bold";
				if(n==0){
					t.innerHTML=tt[m];	
					t.style.borderBottom="1px solid white";	
				}else{
					if(m==0) t.innerHTML=jW.album[n-1].title;
					if(m==1) t.innerHTML=jW.album[n-1].type;
					if(m==2) t.innerHTML=jW.album[n-1].date;
				}
			});
		});
	}
	if(num==3||num==5){
		jW.callBoard("ros_"+jW.menu[num].sub[0],function(obj){
			if(obj.length==0) return false;
			PRTS.trav(function(d,n){
				if(obj.length>=n&&n!=0&&n!=3){
					var div=cf.mkAbsoluteDiv(5,5,250-10,subHeight-10,d);
					div.style.color="white";
					div.style.fontSize=14+"px";
					div.innerHTML=strDate(obj[n-1][8])+"<br /><br />"+strSummary(obj[n-1][5]);
				}
			});
		});	
		jW.callBoard("ros_"+jW.menu[num].sub[1],function(obj){
			if(obj.length==0) return false;
			PRTS.trav(function(d,n){
				if(n==3){
					var div=cf.mkAbsoluteDiv(5,5,250-10,subHeight-10,d);
					div.style.color="white";
					div.style.fontSize=14+"px";
					div.innerHTML=strDate(obj[0][8])+"<br /><br />"+strSummary(obj[0][5]);
				}
			});
		});	
	}
	function strSummary(str){
		var lim=200;
		if(str.length>lim){
			return cf.getHead(str,lim)+"...";
		}
		return str;
	};
	function strDate(str){
		var a=cf.getHead(str,8);
		var b=cf.getTail(str,7);
		b=cf.cutTail(b,1);
		return "<b>"+cf.datify(a)+"</b>"+" ("+cf.timify(b)+")";
	};
	function mkImg(el,num){
		var bw=250-5*2, bh=200-5*2;
		var dv=cf.mkAbsoluteDiv(0+5,0+5,bw,bh,el);
		var ttl=cf.mkTag("div",dv);
		el.style.color="white";
		el.style.padding=5+"px";
		el.style.fontWeight="bold";
		el.style.fontSize=12+"px";
		ttl.innerHTML="ROSSY_"+num;
		//var img=cf.mkTag("img",dv);
		var img=new Image();
		img.src=herself[cf.getRandom(0,7)];
		img.onload=function(){
			//alert(this.width+" "+this.height);
			var w=this.width*1, h=this.height*1, r;
			var ow=160, oh=160;
			if(w>=h){
				this.width=ow;
				r=ow/w;
				this.height=h*r;
			}else{
				this.height=oh;
				r=oh/h;
				this.width=w*r;
			}
			this.style.marginLeft=(bw-this.width)/2+"px";
			this.style.marginTop=(oh-this.height)/2+"px";
		};
		dv.appendChild(img);
		var tl=cf.mkTag("div",dv);
		tl.innerHTML=jW.strPhoto[1];
	};
	function mkPartition(){
		PRTS=new Array();
		arPrts.trav(function(d,n){
			var dv=cf.mkAbsoluteDiv(d,0,250,subHeight,sub);
			PRTS.push(dv);
		});
	};
};
jWidget.prototype.callSlider=function(obj){
	var ar=[
		"* 로지피피",
		"* 드물게 피는 꽃", 
		"* 29 (Twenty Nine)", 
		"* Falling in Love", 
		"* 어른 아이", 
		"* 알로하 오에",
		"* 로맨티카",
		"* 별과 당신", 
		"* 늦지 않았길", 
		"* 몽상가들", 
		"* The Cat and I",
		"* Godspeed", 
		"* Goodbye", 
		"* 튤립", 
		"* Sunnyday in Sunnyheart",
		" &nbsp; &nbsp; &nbsp; &nbsp;"
	];
	var nf=cf.getxywhfromdiv(obj.p);
	var elf=cf.mkAbsoluteDiv(nf.w,0,nf.w,nf.h,obj.p);
	var els=cf.mkAbsoluteDiv(nf.w*2,0,nf.w,nf.h,obj.p);
	obj.p.style.overflow="hidden";
	//el.style.backgroundColor="rgba(255,255,255,0.5)";
	elf.style.color=obj.clr;
	elf.style.fontWeight="bold";
	elf.innerHTML=ar[0];
	
	els.style.color=obj.clr;
	els.style.fontWeight="bold";
	els.innerHTML=ar[1];
	
	var arcnt=1;
	
	var cnt=1;
	var f=false, s=true;
	var tmr=setInterval(function(){
		var lf=cf.getDelpx(elf.style.left)*1,
			ls=cf.getDelpx(els.style.left)*1;
		elf.style.left=(lf-cnt)+"px";
		els.style.left=(ls-cnt)+"px";
		
		if(lf<0&&ls<=0){
			elf.style.left=nf.w+"px";
			arcnt++;
			if(arcnt>ar.length-1) arcnt=0;
			elf.innerHTML=ar[arcnt];
		}
		if(ls<0&&lf<=0){
			els.style.left=nf.w+"px";
			arcnt++;
			if(arcnt>ar.length-1) arcnt=0;
			els.innerHTML=ar[arcnt];
		}
		
	},20);
	
};
jWidget.prototype.callClock=function(obj){
	obj.p.style.color=obj.clr;
	obj.p.style.fontSize=obj.fontSize+"px";
	obj.p.style.fontWeight="bold";
	print();
	var tmr=setInterval(function(){
		print();
	},500);
	function print(){
		var t=new Date(),
			hr=cf.addzero(t.getHours()), 
			mn=cf.addzero(t.getMinutes()), 
			sc=cf.addzero(t.getSeconds());
		obj.p.innerHTML=hr+":"+mn+":"+sc;
	};
};
jWidget.prototype.callBackground=function(obj){
	var a=cf.mkTag("div",document.body);
	a.style.width=obj.w+"px";//1000
	a.style.height=obj.h+"px";//667
	a.style.margin="auto";
	return a;
};
jWidget.prototype.callHeader=function(obj){
	var a=cf.mkTag("div",obj.p);
	//a.style.height=obj.h+"px";
	return a;
};
jWidget.prototype.callBody=function(obj){
	var a=cf.mkTag("div",obj.p);
	//a.style.height=obj.h+"px";
	return a;
};
jWidget.prototype.callFooter=function(obj){
	var a=cf.mkTag("div",obj.p);
	a.style.height=obj.h+"px";
	return a;
};

jWidget.prototype.jp=function(addr,prm,fnc){
	var a=new ajaxcallforgeneral();
	a.post(addr,prm);
	a.ajaxcallback=function(d){
		fnc(d);
	};
};
jWidget.prototype.jf=function(addr,prm,fnc){
	var a=new ajaxcallforgeneral();
	a.file(addr,prm);
	a.ajaxcallback=function(d){
		fnc(d);
	};
};
jWidget.prototype.mkBoard=function(tbName,p){
	
	var tb_name=tbName;
	var tb_w=750;
	
	var a=cf.mkTag("div",p);
	a.style.width=tb_w+"px";
	a.style.margin="auto";
	
	var arList=["title","headmenu","table","footmenu","paging","search"];
	var arTable=["header","note","list"];
	var arHdr=["num","title","writer","date","click"];
	var arCont=["hdrmenu","body","ftmenu","prv/nxt"];
	
	var wnum=50, wwriter=110, wdate=50, wclick=50;
	var wtitle=tb_w-wnum-wwriter-wdate-wclick;
	var arsp=[wnum,wtitle,wwriter,wdate,wclick];
	var lnpd=8;
	
	var lst=cf.mkTag("div",a);
	var or=new Array(), nt=new Array(), rply=new Array(), opor=or;
	var arNote=new Array();
	var currentPage=0, pageUnit=15, unit=7, rlp=0;
	var srchTerm="전체기간", srchOpt="제목+내용", srchString="";
	
	jW.jp("gboardreg.html","work=select&kind="+tb_name,function(d){
		//p.style.height="";
		init(d);
	});
	
	function setContent(a,b){
	
		var eldt=a, nth=b;
	
		lst.innerHTML="";
		arCont.trav(function(d,n){
			var c=cf.mkTag("div",lst);
		});
		
		var rowid=eldt[0], rowtitle=eldt[4], rowdate=cf.datify(eldt[8].substring(0,8))+" "+cf.timify(eldt[8].substring(8,14)),
			rowcont=cr(eldt[5]), rowip=eldt[7], rowboardname=eldt[2], rowwriter=eldt[3],
			rowclick=eldt[9];
		var rowrply=mkRowReply();
		var row={
			id:rowid, title:rowtitle, date:rowdate, cont:rowcont, ip:rowip, boardname:rowboardname,
			writer:rowwriter, click:rowclick, rply:rowrply, nth:nth
		};
		
		setHdrmenu();
		setBody();
		setFtmenu();
		setPrvnxt();
		function setHdrmenu(){
			var hdrmenu=lst.childNodes[0];
			hdrmenu.style.height=30+"px";
			hdrmenu.style.position="relative";
			
			var w=hdrmenu.offsetWidth;
			var left=cf.mkAbsoluteDiv(0,0,w/2,30,hdrmenu);
			var btnPrv=cf.mkTag("button",left);
			btnPrv.innerHTML="이전글";
			btnPrv.onclick=function(){
				if(nth-1>-1)
					setContent(or[nth-1],nth-1,or,rply);
			};
			var btnNxt=cf.mkTag("button",left);
			btnNxt.innerHTML="다음글";
			btnNxt.onclick=function(){
				if(nth+1<or.length)
					setContent(or[nth+1],nth+1,or,rply);
			};
			
			var right=cf.mkAbsoluteDiv(w/2,0,w/2,30,hdrmenu);
			right.style.textAlign="right";
			var btnLst=cf.mkTag("button",right);
			btnLst.innerHTML="목록보기";
			btnLst.onclick=function(){
				setListPage();
			};
		};
		function setBody(){
			var body=lst.childNodes[1];
			body.style.padding=15+"px";
			body.style.border="1px solid gray";
			body.style.fontSize=12+"px";
			body.style.marginBottom=8+"px";
			body.style.wordBreak="break-all";
			
			
			//header1
			var hdr=cf.mkTag("div",body);
			hdr.style.position="relative";
			hdr.style.borderBottom="1px dashed gray";
			hdr.style.paddingBottom=10+"px";
			hdr.style.marginBottom=10+"px";
			
			var w=hdr.offsetWidth;
			var hdrLeft=cf.mkTag("span",hdr);
			hdrLeft.style.width=w/2+"px";
			hdrLeft.style.display="inline-block";
			hdrLeft.innerHTML="<b>"+cr(rowtitle)+"</b>"+" | "+rowboardname;
			
			var hdrRight=cf.mkTag("span",hdr);
			hdrRight.style.width=w/2+"px";
			hdrRight.style.display="inline-block";
			hdrRight.style.textAlign="right";
			//hdrRight.innerHTML=rowdate+" | 수정 | 삭제";
			var rhdrmenu1=cf.mkTag("span",hdrRight);
			rhdrmenu1.innerHTML=rowdate;
			cf.mkTag("span",hdrRight).innerHTML=" | ";
			var rhdrmenu2=cf.mkTag("span",hdrRight);
			rhdrmenu2.innerHTML="수정";
			rhdrmenu2.onmousemove=function(){
				this.style.textDecoration="underline";
			};
			rhdrmenu2.onmouseout=function(){
				this.style.textDecoration="none";
			};
			rhdrmenu2.onclick=updateclick;
			
			cf.mkTag("span",hdrRight).innerHTML=" | ";
			
			var rhdrmenu3=cf.mkTag("span",hdrRight);
			rhdrmenu3.innerHTML="삭제";
			rhdrmenu3.onmousemove=function(){
				this.style.textDecoration="underline";
			};
			rhdrmenu3.onmouseout=function(){
				this.style.textDecoration="none";
			};
			rhdrmenu3.onclick=deleteclick;
			
			//header2
			var hdr1=cf.mkTag("div",body);
			hdr1.style.position="relative";
			hdr1.style.paddingBottom=10+"px";
			hdr1.style.marginBottom=10+"px";
			
			var w=hdr1.offsetWidth;
			var hdr1Left=cf.mkTag("span",hdr1);
			hdr1Left.style.width=w/2+"px";
			hdr1Left.style.display="inline-block";
			hdr1Left.style.fontWeight="bold";
			hdr1Left.innerHTML=cr(rowwriter);
			
			var hdr1Right=cf.mkTag("span",hdr1);
			hdr1Right.style.width=w/2+"px";
			hdr1Right.style.display="inline-block";
			hdr1Right.style.textAlign="right";
			hdr1Right.innerHTML=rowip;
			
			//content
			var cont=cf.mkTag("div",body);
			cont.style.paddingTop=50+"px";
			cont.style.paddingBottom=50+"px";
			cont.style.fontSize=14+"px";
			cont.innerHTML=rowcont;
			
			//footer
			var ft=cf.mkTag("div",body);
			ft.style.textAlign="right";
			ft.style.paddingTop=20+"px";
			ft.style.paddingBottom=20+"px";
			ft.style.color="#aaaaaa";
			ft.innerHTML="예의에 어긋나는 글은 삼가합시다. - 깨끗한 게시판 캠페인";
			
			//reply input
			var rphdr=cf.mkTag("div",body);
			rphdr.innerHTML="<b>댓글 "+rowrply.length+ " 개</b> | <b>"+"조회수 "+rowclick+"</b>";
			
			var rp=cf.mkTag("div",body);
			//rp.bg();
			rp.style.position="relative";
			rp.style.padding=20+"px";
			rp.style.height=110+"px";
			
			var rnm=mkInput("이름",rp);
			var rpw=mkInput("비밀번호",rp,100,true);
			var br=cf.mkTag("br",rp);
			
			
			var ta=cf.mkTag("textarea",rp);
			ta.style.position="absolute";
			ta.style.width=(tb_w-20*4-90)+"px";
			ta.style.height=90+"px";
			var btnRp=cf.mkTag("button",rp);
			btnRp.style.position="absolute";
			btnRp.innerHTML="댓글입력";
			btnRp.style.left=(tb_w-20*2-90)+"px";
			btnRp.style.width=90+"px";
			btnRp.style.height=95+"px";
			btnRp.onclick=function(){
				this.disabled=true;
				if(rnm.value==""){
					alert("이름을 입력하세요.");
					rnm.focus();
					this.disabled=false;
					return false;
				}
				if(rpw.value==""){
					alert("비밀번호를 입력하세요.\n수정, 삭제시 사용됩니다.");
					rpw.focus();
					this.disabled=false;
					return false;
				}
				if(ta.value==""){
					alert("내용을 입력하세요.");
					ta.focus();
					this.disabled=false;
					return false;
				}
				var a=cod(tb_name), b=cod(rnm.value), c=cod(rpw.value), d=cod(""), f=cod(ta.value), w=cod("insert");
				var prm=mkURL(w, a, rowid, b, c, d, f);
				jW.jp("gboardreg.html",prm,function(d){
					var ap=d.mkArr(spt.join(""),spt[0]);
					//원글과 댓글 분리
					//rply=new Array();
					rply=ap;
					rowrply=mkRowReply();
					
					cf.insdiv(rp1,mkRp1(rowrply[0]));
					rp1.style.display="block";
					
					rphdr.innerHTML="<b>댓글 "+rowrply.length+ " 개</b> | <b>"+"조회수 "+rowclick+"</b>";
					
					btnRp.disabled=false;
				});
				rpw.value="";
				ta.value="";
			};
			
			//reply output
			var rp1=cf.mkTag("div",body);
			rp1.bg("#eeeeee");
			rp1.style.padding=10+"px";
			if(rowrply.length==0) rp1.style.display="none";
			rowrply.trav(function(d,n){
				rp1.appendChild(mkRp1(d));
			});
			
			function mkRp1(d){
				var a=document.createElement("div");
				a.style.paddingBottom=15+"px";
				a.style.paddingTop=15+"px";
				a.style.borderBottom="1px dotted gray";
				a.identity=d[0];
				
				var f=cf.mkTag("div",a);
				f.innerHTML="<b>"+cr(d[3])+"</b> "+rowdate+"<br /><br />";
				var s=cf.mkTag("div",a);
				s.innerHTML+=cr(d[5]);
				
				var t=cf.mkTag("div",a); t.style.textAlign="right";
				var sp=cf.mkTag("span",t); sp.style.color="gray";
				sp.innerHTML="삭제";
				sp.onmousemove=function(){
					this.style.textDecoration="underline";
				};
				sp.onmouseout=function(){
					this.style.textDecoration="none";
				};
				sp.onclick=function(){
					var pw=prompt("비밀번호를 입력하세요.");
					var id=d[0];
					jW.jp("gboardreg.html","work=pwcheck&id="+id+"&password="+pw,function(d){
						if(d=="true"){
							jW.jp("gboardreg.html","kind="+tb_name+"&work=rpdelete&id="+id,function(d){
								var ap=d.mkArr(spt.join(""),spt[0]);
								rply=ap;
								rowrply=mkRowReply();
								for(var i=0, lng=rp1.childNodes.length;i<lng;i++){
									if(rp1.childNodes[i].identity==id){
										cf.killTag(rp1.childNodes[i]);
										break;
									}
								}
								rphdr.innerHTML="<b>댓글 "+rowrply.length+ " 개</b> | <b>"+"조회수 "+rowclick+"</b>";
							});
						}else{
							alert("비밀번호가 맞지 않습니다.");
						}
					});
				};
				
				return a;
			};
			
		};
		function mkRowReply(){
			var a=new Array();
			rply.trav(function(d,n){
				if(d[1]==rowid){
					a.push(d);
				}
			});
			return a;
		};
		function setFtmenu(){
			var ftmenu=lst.childNodes[2];
			ftmenu.style.textAlign="right";
			ftmenu.style.marginBottom=50+"px";
			
			var btn1=cf.mkTag("button",ftmenu);
			btn1.innerHTML="새글쓰기";
			btn1.onclick=function(){
				lst.innerHTML="";
				writingtool(true);
			};
			//var btn2=cf.mkTag("button",ftmenu);
			//btn2.innerHTML="답글쓰기";
			
			var btn3=cf.mkTag("button",ftmenu);
			btn3.innerHTML="수정하기";
			btn3.onclick=updateclick;
			var btn4=cf.mkTag("button",ftmenu);
			btn4.innerHTML="삭제하기";
			btn4.onclick=deleteclick;
			
			var btn5=cf.mkTag("button",ftmenu);
			btn5.innerHTML="목록보기";
			btn5.onclick=function(){
				setListPage(or,rply);
			};
		};
		function setPrvnxt(){
			var prvnxt=lst.childNodes[3];
			prvnxt.style.borderTop="1px solid gray";
			prvnxt.style.fontSize=12+"px";
			prvnxt.style.paddingBottom=50+"px";
			
			var prv=cf.mkTag("div",prvnxt);
			prv.style.paddingTop=8+"px";
			prv.style.paddingBottom=8+"px";
			prv.style.borderBottom="1px solid gray";
			
			var w=prv.offsetWidth;
			
			var prvleft=cf.mkTag("span",prv);
			prvleft.style.display="inline-block";
			prvleft.style.width=w*2/3+"px";
			
			var prvright=cf.mkTag("span",prv);
			prvright.style.display="inline-block";
			prvright.style.textAlign="right";
			prvright.style.width=w/3+"px";
			
			if(nth-1>-1){
				var prvleft1=cf.mkTag("span",prvleft);
				prvleft1.innerHTML="이전글&nbsp;&nbsp;&nbsp;&nbsp;";
				var prvleft2=cf.mkTag("span",prvleft);
				
				prvleft2.innerHTML=shorten(cr(or[nth-1][4]),60);
				
				
				
				prvleft2.onmousemove=function(){
					this.style.textDecoration="underline";
				};
				prvleft2.onmouseout=function(){
					this.style.textDecoration="none";
				};
				prvleft2.onclick=function(){
					setContent(or[nth-1],nth-1,or,rply);
				};
				prvright.innerHTML=shorten(cr(or[nth-1][3]),10)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+dpDate(or[nth-1][8]);
			}else{
				prv.style.display="none";
			}
			var nxt=cf.mkTag("div",prvnxt);
			nxt.style.paddingTop=8+"px";
			nxt.style.paddingBottom=8+"px";
			nxt.style.borderBottom="1px solid gray";
			
			var nxtleft=cf.mkTag("span",nxt);
			nxtleft.style.display="inline-block";
			nxtleft.style.width=w*2/3+"px";
			
			var nxtright=cf.mkTag("span",nxt);
			nxtright.style.display="inline-block";
			nxtright.style.textAlign="right";
			nxtright.style.width=w/3+"px";
			
			if(nth+1<or.length){
				var nxtleft1=cf.mkTag("span",nxtleft);
				nxtleft1.innerHTML="다음글&nbsp;&nbsp;&nbsp;&nbsp;";
				var nxtleft2=cf.mkTag("span",nxtleft);
				
				nxtleft2.innerHTML=shorten(cr(or[nth+1][4]),60);
				
				
				
				nxtleft2.onmousemove=function(){
					this.style.textDecoration="underline";
				};
				nxtleft2.onmouseout=function(){
					this.style.textDecoration="none";
				};
				nxtleft2.onclick=function(){
					setContent(or[nth+1],nth+1,or,rply);
				};
				
				nxtright.innerHTML=shorten(cr(or[nth+1][3]),10)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+dpDate(or[nth+1][8]);
			}else{
				nxt.style.display="none";
			}
		};
		function updateclick(){
			var pw=prompt("비밀번호를 입력하세요.");
			jW.jp("gboardreg.html","work=pwcheck&id="+rowid+"&password="+pw,function(d){
				if(d=="true"){
					lst.innerHTML="";
					writingtool(false,row);
				}else{
					alert("비밀번호가 맞지 않습니다.");
				}
			});
		};
		function deleteclick(){
			var pw=prompt("비밀번호를 입력하세요.");
			jW.jp("gboardreg.html","work=pwcheck&id="+rowid+"&password="+pw,function(d){
				if(d=="true"){
					jW.jp("gboardreg.html","work=delete&kind="+tb_name+"&id="+rowid,function(d){
						init(d);
					});
				}else{
					alert("비밀번호가 맞지 않습니다.");
				}
			});
		};
	};
	function setListPage(){
		lst.innerHTML="";
		var term, opt, strSrch, btnSrch;
		arList.trav(function(d,n){
			var c=cf.mkTag("div",lst);
			if(d=="table"){
				arTable.trav(function(t,m){
					var f=cf.mkTag("div",c);
				});
			}
		});
		var pgDt=splitDataPerPage(opor);
		setTitle();
		setHdmn();
		setFtmn(function(){
			writeclick();
		});
		setPg(opor);
		setSrch(srchAct);
		
		setList(pgDt[currentPage]);
		
		function srchAct(d){
			d.disabled=true;
			//a-제1조건, b-제2조건, c-검색어, d-button obj
			//1조건 - 기간(전체, 1일, 1주, 1개월, 6개월, 1년);
			
			var a=srchTerm, b=srchOpt, c=srchString;
			
			if(a=="전체기간"){
				var r1=or;
			}else if(a=="1일"){
				var r1=compDate(or,"D",0);
			}else if(a=="1주"){
				var r1=compDate(or,"D",-6);
			}else if(a=="1개월"){
				var r1=compDate(or,"M",-1);
			}else if(a=="6개월"){
				var r1=compDate(or,"M",-6);
			}else if(a=="1년"){
				var r1=compDate(or,"Y",-1);
			}
			//2조건 - 대상(제목+내용, 제목만, 글작성자, 댓글내용, 대글작성자
			var r2;
			if(c!=""){
				r2=compStr(r1,rply,c,b);
			}else{
				r2=r1;
			}
			
			//data reset and renew the list and paging indicator;
			opor=r2;
			//currentPage=0;
			pgDt=splitDataPerPage(opor);
			setPg(opor);
			setList(pgDt[currentPage]);
			////////////////////////////////////////////////////
			
			d.disabled=false;
		}
		function pgclick(el){
			el.style.textDecoration="underline";
			currentPage=el.pg;
			setList(pgDt[el.pg]);
		};
		function splitDataPerPage(dt){
			//데이터를 page별로 쪼개는 부분
			var pgDt=new Array();
			var pg=0;
			pgDt[pg]=new Array();
			dt.trav(function(d,n){
				if(n>0&&n%pageUnit==0){
					pg++;
					pgDt[pg]=new Array();
				}
				pgDt[pg].push(d);
			});
			return pgDt;
		};
		function writeclick(){
			lst.innerHTML="";
			writingtool(or,rply,true);
		};
		function noteclick(){
			lst.innerHTML="";
		};
		function ttlclick(){
			//var srch={a:term.value, b:opt.value, c:strSrch.value, d:btnSrch, f:currentPage};
			var l=this;
			//click수 증가... l.dt, dt, or에 모두 동기화
			jW.jp("gboardreg.html","work=clickupdate&id="+this.dt[0],function(d){
				l.dt=d.mkArr(spt.join(""),spt[0])[0];
				or.trav(function(t,m){
					if(t[0]==l.dt[0]){
						or[m]=l.dt;
						return true;
					}
				});
				setContent(l.dt,l.num);
			});
		};
		function writerclick(){
		};
		function setSrch(fnc){
			var srch=lst.childNodes[5];
			srch.style.textAlign="center";
			srch.style.paddingBottom=50+"px";
			
			term=cf.mkOpt(srch,["전체기간","1일","1주","1개월","6개월","1년"]);
			opt=cf.mkOpt(srch,["제목+내용","제목만","글작성자","댓글내용","댓글작성자"]);
			strSrch=cf.mkTag("input",srch);
			term.value=srchTerm;
			opt.value=srchOpt;
			strSrch.value=srchString;
			
			btnSrch=cf.mkTag("button",srch);
			btnSrch.innerHTML="검색";
			btnSrch.onclick=function(){
				srchTerm=term.value, srchOpt=opt.value, srchString=strSrch.value;
				currentPage=0, rlp=0;
				fnc(this);
			};
		};
		function setPg(dt){
			
			var l=dt.length/pageUnit, rl, max=0;
			if(l>parseInt(l)){
				rl=parseInt(l)+1;
			}else{
				rl=parseInt(l);
			}
			
			max=parseInt(rl/unit);
		
			var pg=lst.childNodes[4];
			
			//초기화
			pg.innerHTML="";
			
			pg.style.textAlign="center";
			pg.style.fontSize=12+"px";
			pg.style.marginBottom=10+"px";
			
			var prv=cf.mkTag("span",pg);
			prv.style.display="inline-block";
			prv.style.width=50+"px";
			prv.innerHTML="◀이전";
			prv.onmousemove=function(){
				this.style.cursor="pointer";
			};
			prv.onclick=function(){
				var t=rlp;
				rlp--;
				if(rlp<0) rlp=0;
				if(t!=rlp){
					//log(rlp);
					setNumbers(false);
				}
			};
			
			var md=cf.mkTag("span",pg);
			var ns=new Array();
			
			setNumbers();
			
			function setNumbers(opt){
				ns.trav(function(d,n){
					cf.killTag(d);
				});
				ns=new Array();
				
				var sn=rlp*unit+0, en=rlp==max?rl:(rlp+1)*unit;
				for(var i=sn;i<en;i++){
					var n=cf.mkTag("span",md);
					n.style.display="inline-block";
					n.style.width=20+"px";
					n.style.fontWeight="bold";
					n.innerHTML=i+1;
					n.onmousemove=function(){
						this.style.cursor="pointer";
					};
					n.pg=i;
					n.onclick=function(){
						ns.trav(function(d,n){
							d.style.textDecoration="none";
						})
						pgclick(this);
					};
					
					if(opt==undefined){
						var cn=currentPage;
					}else{
						var cn=opt?sn:en-1;
					}
					if(i==cn){
						n.style.textDecoration="underline";
						if(opt!=undefined)
							pgclick(n);	
					}
					
					ns.push(n);
				}
			};

			var nxt=cf.mkTag("span",pg);
			nxt.style.display="inline-block";
			nxt.style.width=50+"px";
			nxt.innerHTML="다음▶";
			nxt.onmousemove=function(){
				this.style.cursor="pointer";
			};
			nxt.onclick=function(){
				var t=rlp;
				rlp++;
				if(rlp>max) rlp=max;
				if(t!=rlp){
					//log(rlp);
					setNumbers(true);
				}
			};
		};
		function setFtmn(fnc){
			var ftmn=lst.childNodes[3];
			ftmn.style.textAlign="right";
			ftmn.style.marginBottom=30+"px";
			var btn=cf.mkTag("button",ftmn);
			btn.innerHTML="글쓰기";
			btn.onclick=fnc;
		};
		function setHdmn(){
			var hdmn=lst.childNodes[1];
			hdmn.style.marginBottom=10+"px";
			hdmn.style.textAlign="right";
			hdmn.style.fontSize=11+"px";
			
			var m1=cf.mkTag("span",hdmn);
			m1.innerHTML="제목순";
			m1.onmousemove=mousemove;m1.onmouseout=mouseout;
			m1.asc=true;
			m1.onclick=function(){click(0)};
			cf.mkTag("span",hdmn).innerHTML=" | ";
			var m2=cf.mkTag("span",hdmn);
			m2.innerHTML="날짜순";
			m2.onmousemove=mousemove;m2.onmouseout=mouseout;
			m2.asc=false;
			m2.onclick=function(){click(1)};
			cf.mkTag("span",hdmn).innerHTML=" | ";
			var m3=cf.mkTag("span",hdmn);
			m3.innerHTML="클릭순";
			m3.asc=false;
			m3.onmousemove=mousemove;m3.onmouseout=mouseout;
			m3.onclick=function(){click(2)};
			
			function mousemove(){
				this.style.textDecoration="underline";
			};
			function mouseout(){
				this.style.textDecoration="none";
			};
			function click(opt){
				if(opt==0){
					this.asc?or.asc(4):or.desc(4);
					setListPage();
				}
				if(opt==1){
					this.asc?or.asc(8):or.desc(8);
					setListPage();
				}
				if(opt==2){
					this.asc?or.asc(9,true):or.desc(9,true);
					setListPage();
				}
				this.asc=this.asc?false:true;
			};
			
		};
		function setTitle(){
			var ttl=lst.childNodes[0];
			ttl.style.border="5px solid pink";
			ttl.style.padding=10+"px";
			ttl.style.marginBottom=30+"px";
			ttl.innerHTML=p.bn;
		};
		function setList(dt){
			var lstTable=lst.childNodes[2];
			lstTable.style.marginBottom=5+"px";
			
			//초기화
			lstTable.childNodes[0].innerHTML="";
			lstTable.childNodes[1].innerHTML="";
			lstTable.childNodes[2].innerHTML="";
			
			//table header
			lstTable.childNodes[0].appendChild(tblhdr());
			
			//table note
			
			arNote.trav(function(d,n){
				lstTable.childNodes[1].appendChild(tblnote(d));
			});
			
			//table row
			dt.trav(function(d,n){
				var arRow=[d[0],d[4],d[3],"20"+cf.datify(d[8].substring(0,8)),d[9]];
				lstTable.childNodes[2].appendChild(tblrow(arRow,d,currentPage*pageUnit+n));
			});
		};
		function tblhdr(){
			var a=document.createElement("div");
			a.style.paddingTop=lnpd+"px";
			a.style.paddingBottom=lnpd+"px";
			a.style.borderTop="3px solid gray";
			a.style.borderBottom="1px solid gray";
			a.style.fontSize=11+"px";
			
			
			arHdr.trav(function(d,n){
				var b=cf.mkTag("span",a);
				b.style.display="inline-block";
				b.style.width=arsp[n]+"px";
				b.style.textAlign="center";
				b.innerHTML=d;
			});
			
			return a;
		};
		function tblnote(ar){
			var a=document.createElement("div");
			a.style.paddingTop=lnpd+"px";
			a.style.paddingBottom=lnpd+"px";
			a.style.borderBottom="1px solid gray";
			a.style.fontSize=11+"px";
			
			ar.trav(function(d,n){
				var b=cf.mkTag("span",a);
				b.style.display="inline-block";
				b.style.width=arsp[n]+"px";
				b.style.textAlign="center";
				if(n==1||n==2)
					b.style.fontSize=13+"px";
				if(n==1){
					b.style.fontWeight="bold";
					b.style.textAlign="left";
					b.onmousemove=function(){
						this.style.textDecoration="underline";
					};
					b.onmouseout=function(){
						this.style.textDecoration="none";
					};
					b.onclick=noteclick;
				}
				b.innerHTML=d;
			});
			
			return a;
		};
		function tblrow(arRow,dt,num){
			var a=document.createElement("div");
			a.style.paddingTop=lnpd+"px";
			a.style.paddingBottom=lnpd+"px";
			a.style.borderBottom="1px solid gray";
			a.style.fontSize=11+"px";
			
			var cnt=0;
			rply.trav(function(d,n){
				if(arRow[0]==d[1]){
					cnt++;
				}
			});
			
			arRow.trav(function(d,n){
				var b=cf.mkTag("span",a);
				b.style.display="inline-block";
				b.style.width=arsp[n]+"px";
				b.style.textAlign="center";
				
				if(n==1||n==2)
					b.style.fontSize=13+"px";
				if(n==1){
					b.style.textAlign="left";
					b.onmousemove=function(){
						this.style.textDecoration="underline";
					};
					b.onmouseout=function(){
						this.style.textDecoration="none";
					};
					b.dt=dt;
					b.num=num;
					b.onclick=ttlclick;
					var ttl=shorten(d,50);
					if(cnt!=0)
						b.innerHTML=cr(ttl)+" ["+cnt+"]";
					else
						b.innerHTML=cr(ttl);
					if(curchk(arRow[3]))
						b.innerHTML+="<span style='display:inline-block;width:10px;height:9px;background-image:url(ico-new.gif)'> </span>";
				}else if(n==2){
					var ttl=shorten(d,10);
					b.innerHTML=cr(ttl);
				}else{
					b.innerHTML=cr(d);
				}
			});
			
			return a;
		};
	};
	
	function shorten(str,num){
		var rslt;
		if(str.length>num){
			rslt=str.substring(0,num)+"...";
		}else{
			rslt=str;
		}
		return rslt;
	};
	function curchk(str){
		var a=cf.getToday();
		var td=""+a[0]+"."+a[1]+"."+a[2];
		if(str==td){
			return true;
		}
		return false;
	};
	function init(d){
		var a=d.mkArr(spt.join(""),spt[0]);
		//원글과 댓글, 공지 분리
		or=new Array(); rply=new Array(); nt=new Array();
		a.trav(function(d,n){
			if(d[1]<=0)
				or.push(d);
			else
				rply.push(d);
				
			if(d[1]==-1)
				nt.push(d);
		});
		
		nt.trav(function(d,n){
			arNote.push(["공지",d[4],d[3],"20"+cf.datify(d[8].substring(0,8)),d[9]]);
		});
		
		opor=or;
		
		setListPage();
	};
	function writingtool(opt,row){
		var cv=cf.mkTag("div",lst);
		var t=splitdiv(cv);
		var a=t.a, b=t.b;
		a.style.fontWeight="bold";
		a.innerHTML=opt?"새글쓰기":"수정하기";
		b.style.textAlign="right";
		var btn=cf.mkTag("button",b);
		btn.innerHTML="목록보기";
		btn.onclick=function(){
			setListPage(or,rply);
		};
		
		var blst=cf.mkTag("div",lst);
		blst.style.padding=30+"px";
		blst.style.fontSize=13+"px";
		blst.bg("#eeeeee");
		
		var b=cf.mkTag("div",blst);
		var nm=mkInput("이름",b);
		if(!opt){
			nm.value=row.writer;
			nm.disabled=true;
		}
		
		var pw=mkInput("비밀번호",b,100,true);
		
		var tl=mkInput("<br />제목",b,tb_w-100);
		if(!opt) tl.value=row.title;
		
		var ta=mkTextarea("<br />",b,tb_w-70,400);
		if(!opt) ta.value=rcr(row.cont);
		
		var aw=cf.mkTag("div",lst);
		aw.style.textAlign="center";
		var btnw=cf.mkTag("button",aw);
		btnw.innerHTML=opt?"저장하기":"수정하기";
		btnw.onclick=function(){
			this.disabled=true;
			if(nm.value==""){
				alert("이름을 입력하세요.");
				nm.focus();
				this.disabled=false;
				return false;
			}
			if(pw.value==""){
				alert("비밀번호를 입력하세요.\n수정, 삭제시 사용됩니다.");
				pw.focus();
				this.disabled=false;
				return false;
			}
			if(tl.value==""){
				alert("제목을 입력하세요.");
				tl.focus();
				this.disabled=false;
				return false;
			};
			if(ta.value==""){
				alert("내용을 입력하세요.");
				ta.focus();
				this.disabled=false;
				return false;
			};
			
			if(opt){
				dbinsert("insert",tb_name,0,nm.value,pw.value,tl.value,ta.value,function(d){
					lst.innerHTML="";
					or=new Array(); rply=new Array(); nt=new Array();
					init(d);
				});
			}else{
				dbinsert("update",tb_name,row.id,nm.value,pw.value,tl.value,ta.value,function(d){
					var a=d.mkArr(spt.join(""),spt[0]);
					setContent(a[0],row.nth,or,rply);
				});
			}
			
			
		};
		var btnc=cf.mkTag("button",aw);
		btnc.innerHTML="취소하기";
		btnc.onclick=function(){
			setListPage(or,rply);
		};
	};
	function dbinsert(work, dbTable, id, writer, password, title, content, fnc){
		var a=cod(dbTable), b=cod(writer), c=cod(password), d=cod(title), f=cod(content), w=cod(work);
		var prm=mkURL(w, a, id, b, c, d, f);
		jW.jp("gboardreg.html",prm,function(d){
			fnc(d)
		});
	};
	function mkURL(work, dbTable, id, writer, password, title, content){
		var str="";
		str+="work="+work;
		str+="&id="+id;
		str+="&kind="+dbTable;
		str+="&writer="+writer;
		str+="&title="+title;
		str+="&cont="+content;
		str+="&password="+password;
		return str;
	};
	function mkTextarea(str,p,w,h){
		var strCn=cf.mkTag("span",p); 
		strCn.innerHTML=str+"<br />";
		
		var cn=cf.mkTag("textarea",p); 
		cn.style.width=w+"px"; cn.style.height=h+"px";
		return cn;
	};
	function mkInput(str,p,w,opt){
		var span=cf.mkTag("span",p); 
		span.innerHTML=str;
		var np=cf.mkTag("input",p); 
		if(opt)
			np.type="password";
		if(w)
			np.style.width=w+"px";
		return np;
	};
	function cod(str){
		return encodeURIComponent(str);
	};
	function cr(str){
		while(str.indexOf("<")!=-1){
			str=str.replace("<","&lt;");
		}
		//img tag permission
		str=str.replace("&lt;img ","<img ");
		while(str.indexOf("\n")!=-1){
			str=str.replace("\n","<br />");
		}
		return str;
	};
	function rcr(str){
		while(str.indexOf("<br />")!=-1){
			str=str.replace("<br />","\n");
		}
		return str;
	};
	function dpDate(str){
		var a=str.substring(0,8);
		var b=str.substring(8,14);
		return cf.datify(a)+" "+cf.timify(b);
	};
	function addZero(num){
		var rslt;
		if(num<10)
			rslt="0"+num;
		else 
			rslt=num+"";
		return rslt;
	};
	function mkDate(str){
		var a=str;
		var b=cf.getHead(a,4);
		var c=cf.getHead(cf.cutHead(a,4),2);
		var d=cf.getTail(a,2);
		return b+"-"+c+"-"+d;
	};
	function compDate(dt,opt,num){
		var t=new Date();
		var today=t.getFullYear()+"-"+addZero(t.getMonth()*1+1)+"-"+addZero(t.getDate());
		var a=cf.calDate(today,opt,num), av=new Date(a.a).valueOf();
		var rslt=new Array();
		dt.trav(function(d,n){
			var dv=new Date(mkDate(d[8].substring(0,8))).valueOf();
			if(dv>=av)
				rslt.push(d);
		});
		return rslt;
	};
	function compStr(ar,rply,str,opt){
		var rslt=new Array();
		if(opt=="제목+내용"){
			ar.trav(function(d,n){
				if(d[4].indexOf(str)!=-1||d[5].indexOf(str)!=-1)
					rslt.push(d);
			});
		}else if(opt=="제목만"){
			ar.trav(function(d,n){
				if(d[4].indexOf(str)!=-1)
					rslt.push(d);
			});
		}else if(opt=="글작성자"){
			ar.trav(function(d,n){
				if(d[3].indexOf(str)!=-1)
					rslt.push(d);
			});
		}else if(opt=="댓글내용"){
			var tar=new Array();
			rply.trav(function(d,n){
				if(d[5].indexOf(str)!=-1){
					var chk=true;
					tar.trav(function(t,m){
						if(t==d[1]){
							chk=false;
							return true;
						}
					});
					if(chk){
						tar.push(d[1]);
					}
				}
			});
			ar.trav(function(d,n){
				tar.trav(function(t,m){
					if(d[0]==t){
						rslt.push(d);
					}
				});
			});
		}else if(opt=="댓글작성자"){
			var tar=new Array();
			rply.trav(function(d,n){
				if(d[3].indexOf(str)!=-1){
					var chk=true;
					tar.trav(function(t,m){
						if(t==d[1]){
							chk=false;
							return true;
						}
					});
					if(chk){
						tar.push(d[1]);
					}
				}
			});
			ar.trav(function(d,n){
				tar.trav(function(t,m){
					if(d[0]==t){
						rslt.push(d);
					}
				});
			});
		}
		return rslt;
	};
	function splitdiv(el){
		var w=el.offsetWidth;
		var a=cf.mkTag("span",el);
		a.style.display="inline-block";
		a.style.width=w/2+"px";
		var b=cf.mkTag("span",el);
		b.style.display="inline-block";
		b.style.left=w/2+"px";
		b.style.width=w/2+"px";
		return {a:a, b:b};
	};
};
// 랭크업
jWidget.prototype.callRankup = function(obj) {
	var frag = document.createDocumentFragment(), 
		rankup = cf.mkTag("div", frag),
		albumObj = this.album,
		albumList = getTotalAlbumList(),
		rankupList = getFavoriteAlbum(albumList),
		title = cf.mkTag("div", rankup),
		ulTag = cf.mkTag("ul", rankup);
	
	cf.setCss(title, {padding: "5px 0px 10px 0px", textAlign: "center", fontSize: "18px", fontWeight: "bold"});
	cf.setCss(ulTag, {padding: "0px", margin: "0px", listStyle: "none"});
	
	title.innerHTML = "RANK-UP 인기순위";
	
	rankupList.trav(function(d, n) {
		var liTag = cf.mkTag("li", ulTag),
			rankObj = cf.mkTag("span", liTag),
			titleObj = cf.mkTag("span", liTag),
			aTag = cf.mkTag("a", titleObj),
			countObj = cf.mkTag("span", liTag),
			songName = (d.title.length > 16) ? d.title.substring(0,14) +".." : d.title;
		
		cf.setCss(rankObj, {display: "inline-block", width: "10%", paddingLeft: "5%", textAlign: "center", verticalAlign: "middle"});
		cf.setCss(titleObj, {display: "inline-block", width: "58%", paddingLeft: "7%"});
		cf.setCss(countObj, {display: "inline-block", width: "15%", paddingRight: "5%", textAlign: "right", verticalAlign: "middle"});
		aTag.setAttribute("href", "#");
		aTag.setAttribute("title", d.title);
		cf.setCss(aTag, {display:"block", height: "20px", fontSize: "12px", color:"black", textDecoration: "none", lineHeight: "2em"});
		
		cf.addEvent(aTag, "mouseover", function(e) {
			mouseOver(e);
		});
		cf.addEvent(aTag, "mouseout", function(e) {
			mouseOut(e);
		});
		cf.addEvent(aTag, "focus", function(e) {
			mouseOver(e);
		});
		cf.addEvent(aTag, "focusout", function(e) {
			mouseOut(e);
		});
		
		aTag.innerHTML = songName;
		rankObj.innerHTML = n+1;
		countObj.innerHTML = 1000 - (n-5);
	});
	
	obj.p.appendChild(frag);
	
	// 모든 노래를 가져온다.
	function getTotalAlbumList() {
		var albumList = [];
		albumObj.trav(function(d1, n1) {
			var list = d1.list;
			list.trav(function(d2, n2) {
				var obj = {
					title: d2
				};
				albumList.push(obj);
			});
		});
		return albumList;
	}
	
	// 인기있는 10개의 리스트만 가져온다.
	function getFavoriteAlbum(totList) {
		var favoriteList = [];
		totList.trav(function(d, n) {
			if (n >9) return false;
			favoriteList.push(d);
		});
		return favoriteList;
	}
	
	// 마우스오버, Focus
	function mouseOver(e) {
		var obj = e.target;
		cf.setCss(obj, {
			textDecoration: "underline",
			color: "#4948FF"
		});
	}
	// 마우스아웃, Focusout
	function mouseOut(e) {
		var obj = e.target;
		cf.setCss(obj, {
			textDecoration: "none",
			color: "#000000"
		});
	}
};
