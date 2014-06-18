jWidget.prototype.callUpload=function(p){
	cf.setCss(p,{
		//height:300+"px",
		//backgroundColor:cf.red
	});

	var cover=cf.mkTag("div",p);
	cf.setCss(cover,{
		width:600+"px",
		margin:"auto",
		textAlign:"center"
	});


	var title=cf.mkTag("input",cover);
	title.type="text";
	title.placeholder="제목을 입력하세요";
	cf.setCss(title,{
		verticalAlign:"top",
		width:595+"px",
		height:20+"px",
		fontSize:15+"px",
		marginBottom:5+"px"
	});

	var img_cvr=cf.mkTag("div",cover);
	cf.setCss(img_cvr,{
		position:"relative",
		height:300+"px",
		marginBottom:5+"px",
		border:"1px solid gray",
		background:"url(back.jpg)"		
	});
	var img=new Image();
	cf.setCss(img,{
		width:600+"px",
		height:300+"px"
	});
	img_cvr.appendChild(img);

	var dv=cf.mkAbsoluteDiv(0,0,60,0,img_cvr);
	cf.setCss(dv,{
		overflow:"hidden",
		textAlign:"center",
		height:25+"px",
		color:"white",
		//backgroundColor:"gray",
		background:"url(find.jpg) no-repeat",
		padding:5+"px"
	});
	//dv.onclick=function(){};
	//dv.innerHTML="FILE";
	var ipt=cf.mkTag("input",dv);
	ipt.type="file";
	cf.setCss(ipt,{
		position:"absolute",
		top:-100+"px",
		left:-100+"px",
		width:500+"px",
		height:500+"px",
		backgroundColor:"rgba(100,100,100,0)",
		opacity:0
	});
	ipt.onchange=function(){
		var fr=new FileReader();
		fr.readAsDataURL(ipt.files[0]);
		fr.onload=function(e){
			img.src=e.target.result;
			log(img.width, img.height);
		};
	};

	var ft=cf.mkTag("div",cover);
	cf.setCss(ft,{
		textAlign:"left"
	});

	var text=cf.mkTag("textarea",ft);
	text.placeholder="내용을 입력하세요";
	cf.setCss(text,{
		verticalAlign:"top",
		height:95+"px",
		width:495+"px"
	});
	var snd=cf.mkTag("div",ft);
	cf.setCss(snd,{
		display:"inline-block",
		width:94+"px",
		height:100+"px",
		marginLeft:5+"px",
		background:"url(send.jpg)"
	});
	//snd.innerHTML="SEND";
	snd.onclick=function(){
		if(ipt.files.length==0){
			alert("사진을 선택하세요");
			return false;
		}
		if(title.value==""){
			alert("제목을 입력하세요.");
			title.focus();
			return false;
		}
		if(text.value==""){
			alert("내용을 입력하세요.");
			text.focus();
			return false;
		}
		
		var fdt=new FormData();
		fdt.append("file",ipt.files[0]);
		fdt.append("boardname","rossy");
		fdt.append("boardid",getId());
		fdt.append("nth",0);
		fdt.append("ext",ipt.files[0].name.split(".")[1]);
		fdt.append("title",cod(title.value));
		fdt.append("cont",cod(text.value));
		jW.jf("filereg.html",fdt,function(d){
			log(d);
			title.value="";
			text.value="";
			text.innerHTML="";
			ipt.value="";
			img.src="";
		});
	};
	var spc=cf.mkTag("div",cover);
	cf.setCss(spc,{
		height:100+"px"
	});

	function cod(str){
		str=str.split("'").join("\\'");
		return str;
	};
	function getId(){
		var t=new Date();
		return cf.getToday().join("")+"("+t.getMilliseconds()+")";
	};

};
