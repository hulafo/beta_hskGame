
let xhr = new XMLHttpRequest();
let cells=[];
let pos = 0;
let point=[];
let fl=0;
let erR=[];
let pointEl = document.querySelector('.point');
let erEl = document.querySelector('.erR');
let id1=document.getElementById('id0');
let id2=document.getElementById('id1');
let id3=document.getElementById('id2');
let id4=document.getElementById('id3');


xhr.open('GET','json/hsk-level-1.json',false);
xhr.send();
if (xhr.status != 200) {
	alert(xhr.status + ': '+ xhr.statusText);
}else{
	console.log(xhr.responseText)
}

let text = JSON.parse(xhr.responseText);
let hanziArr = [];
let div = document.querySelector('.container')

let bl = document.createElement('span');
for (let key in text) {
	hanziArr.push(text[key].hanzi);
	//console.log(text[key].hanzi);
}
function createGr(el){
		for (var i = 0; i < 4; i++) {
			
				let crD=document.createElement('div');
				crD.setAttribute('class','cell');
				crD.setAttribute('id','id'+i);
				//crD.setAttribute('data-col',i);
				cells.push(crD);
				el.appendChild(crD);
			
		}

	}
let div2 = document.querySelector('.translate');
var blR;


var id;
/// bug in this function
function input(){
	//key = key==149 || key>=146 ? key-10 : key + 2;
	let keys = [];
	let key=149;
	while(keys.length<4){
		const k = Math.floor(Math.random()*key);
		if (!keys.includes(k)) {
			keys.push(k)
		}

	}
	console.log(keys);

	id1.innerHTML = text[keys[0]].translations[0];

	id2.innerHTML = text[keys[1]].translations[0];

	id3.innerHTML = text[keys[2]].translations[0];

	id4.innerHTML = text[keys[3]].translations[0];
	//id2.innerHTML = text[key+2].translations[0];
	//id3.innerHTML = text[key+3].translations[0];
	//id4.innerHTML = text[key+4].translations[0];

}

function hanziRun(){
	for (let key in text) {
		hanziArr.push(text[key].hanzi);
		//putHanzi(text[key].hanzi);
		//console.log(text[key].hanzi);
    }
    let key=Math.floor(Math.random()*149);
    let rw=Math.floor(Math.random()*4);
    blR= document.getElementById('id'+rw);
    console.log("keeeeeeeeeeeey"+key);
    input();
    bl.innerHTML=text[key].hanzi;
/////////////////TEST HANZI ////////////////////////////
	console.log(key);
	//div2.innerHTML = text[key].translations[0];
///////////////////////////////////////////////////////
	blR.innerHTML = text[key].translations[0];
	removeOnCLK();

	if(blR.innerText===text[key].translations[0]){
		blR.setAttribute('onclick','clk()');

	}
///////////////////////////////////////////////////////
	console.log(key); 
//////////////////////////////////////////////////////
	div.appendChild(bl);
    bl.style.visibility='visible';
	id= setInterval(frame,10);
	
}

function removeOnCLK(){
	id1.removeAttribute('onclick');//////////////// I must change this function
    id2.removeAttribute('onclick');
    id3.removeAttribute('onclick');
    id4.removeAttribute('onclick');
	id1.setAttribute('onclick','findErr()');
	id2.setAttribute('onclick','findErr()');
	id3.setAttribute('onclick','findErr()');
	id4.setAttribute('onclick','findErr()');

}
hanziRun()
function findErr(){
	var myAudio = document.createElement("audio");
	//blR.style.backgroundColor='red';
	erR.push(point.length-1);
	erEl.innerHTML='-'+erR.length;
	myAudio.src = "error.wav";
	myAudio.play();
}

function clk(){
        pos=0;
        blR.innerHTML='';
       /* let han=document.createElement('div');
		han.innerHTML=bl.innerText;
		div2.appendChild(han);*/
        let key=Math.floor(Math.random()*149);
        let rw=Math.floor(Math.random()*4);
        blR= document.getElementById('id'+rw);
        input(key);
        fl+=1;
        point.push(fl);
		pointEl.innerHTML=point.length;
        removeOnCLK();
		blR.setAttribute('onclick','clk()');
       
        bl.innerHTML=hanziArr[key];
		blR.innerHTML = text[key].translations[0];
		
		var myAudio = document.createElement("audio");
		myAudio.src = "coin.wav";
		myAudio.play();
		//myAudio.pause();
	    bl.style.left=Math.floor(Math.random()*315)+'px';
		bl.style.visibility='visible';
		div.appendChild(bl);
		console.log(point);
        //rw=1;
}
console.log(point.length);
let sum=0;
function stop(){
	
}
function frame(){
	if (pos === 490) {
		pos=0;
		clearInterval(id)
		removeOnCLK();
		blR.innerHTML='';
        bl.style.visibility='hidden';
        bl.style.left=Math.floor(Math.random()*315)+'px';
        sum+=1;
        findErr();

        hanziRun();
	}else{
		pos++;
        bl.style.top=pos+'px';

	}
    console.log(sum);
    //if(sum==4){
    //	alert('STOP');
    //}
	
}


