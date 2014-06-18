function jWidget(){
	this.menu=[
		{name:"PROFILE", sub:["INTRO","PHOTO","ROSSY ONLY"]},
		{name:"ALBUM", sub:["Romantica","29","Aloha Oe","Cozy Rossy","Vanilla Way","The DEMO"]},
		{name:"VIDEO", sub:["MUSIC VIDEO","LIVE SHOW","ROSSY TV"]},
		{name:"FROM ROSSY", sub:["DIARY","ART WORK"]},
		{name:"PRESS", sub:["RADIO","TV","PAPERS","MAGAZINES"]},
		{name:"NOTIFICATION", sub:["SCHEDULE", "Administrator"]},
		{name:"SUPPORT", sub:["PURCHASE","DONATION"]},
	];
	this.strIntro="My name is RossyPP, which is a short form for Rossy Punky, Perfume. Thanks for listening to me, my song, and visiting us here in my brand new web site. This web site is made to meet guys and girls who like my song in more free and convenient way. I hope you have a good time in my web house, and feel free to contact me anytime, when you want me to do something for you.";
	this.strPhoto=[
		"ROSSY's on her way to where she began.",
		"Nobody can be me, well, and vice versa. When I was young, I've tried hard to be who others wanted me to be."
	];
	this.album=[
		objAlbum("the DEMO","20060425","EP",
				["Time Travel","TV Boi","Thomas","푸른꽃(title)","Image Cooler","Love Song","Image Cooler(Eng Ver.)"]),
		objAlbum("Vanilla way","20071115","EP",
				["Vanilla Way","Heavenly You","Love Fixer"]),
		objAlbum("Cozy Rossy Mini","20091015","EP",
				["Sugar Honey","Falling In Love(Title)","검은 방","Fairy Dust","튤립"]),
		objAlbum("Aloha Oe","20111021","LP",
				["Hello","고양이와의 대화(Title)","어른아이","Falling In Love(Title)","튤립","별과 당신","꽃잎","Love Fixer","Subiaco","Good Bye"]),
		objAlbum("29","20120611","EP",
				["29(Title)","물","동행","29(5월5시)"]),
		objAlbum("Romantica","20130208","EP",
				["늦지않았길(Title)","드물게 피는 꽃","몽상가들","낭만의 계절","노래해볼까"])
	];
	this.arBg=[
		"http://www.rossypp.com/ros/img/mp3/01_03.mp3",
		"http://www.rossypp.com/ros/img/mp3/01_04.mp3",
		"http://www.rossypp.com/ros/img/mp3/01_05.mp3",
		"http://www.rossypp.com/ros/img/mp3/02_01.mp3",
		"http://www.rossypp.com/ros/img/mp3/03_02.mp3"
	];
	function objAlbum(title,date,type,list){
		var obj={
			title:title,
			date:date,
			type:type,
			list:list
		}
		return obj;
	};
};
