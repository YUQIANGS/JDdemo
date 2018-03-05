var div = document.getElementById("container");
var ul = document.getElementById("cbl");
var lis = ul.getElementsByTagName('li');
var big = document.getElementById('big');
var lunbo = document.getElementById('lunbo');
var divs = document.getElementsByClassName('center');
var index = 1;
for(var i=0;i<lis.length;i++){
	var li = lis[i];  
    li.id = i; 
	li.onmouseover = function (event){
	var oEvent = event;
	var oFrom=oEvent.fromElement||oEvent.relatedTarget;
	if(this.contains(oFrom)){
		return;
	}else{
		    lunbo.style.display = 'none';

			for(var j=0; j<lis.length; j++){   
                divs[j].style.display = 'none';  
            }  
			divs[this.id].style.display = 'block';
    	    divs[this.id].style.boxShadow ='1px -1px 1px #999395';
	}
	};
}
big.onmouseout = function(event){
	var oEvent = event;
	var oTo=oEvent.toElement||oEvent.relatedTarget;
	if(this.contains(oTo)){
		return;
	}else{
	   lunbo.style.display = 'block';
	   for(var j=0; j<lis.length; j++){   
                divs[j].style.display = 'none';  
            }  
	}
}

var imgs = lunbo.getElementsByTagName("img");
var btn = document.getElementById("btn");
var btns = btn.getElementsByTagName("i");
var timer;
var animated = false;
function btnMouse(){
	if(animated){
			return;
	}
	for(var i=0;i<btns.length;i++){
	var button = btns[i];  
    if(this.className == 'on'){
			return;
	}
	button.onmouseover = function (event){
	var oEvent = event;
	var oFrom=oEvent.fromElement||oEvent.relatedTarget;
	if(this.contains(oFrom)){
		return;
	}else{
	            //animated = true;
                var myIndex = parseInt(this.getAttribute('index'));
                index = myIndex;
            	setTimeout(function(){
            		animate(index-1);
            	showButton();
           		},100);
	}
	};
	// button.onmouseout = function (event){
	// 	var oEvent = event;
	// 	var oTo=oEvent.toElement||oEvent.relatedTarget;
	// 	//animated = false;
	// 	if(this.contains(oTo)){
	// 		return;
	// 	}
	// };
}
}
function animate(index){
	animated = true;
	for(var j=0; j<btns.length; j++){   
                imgs[j].style.display = 'none';  
    } 
    imgs[index].style.display = 'block';
    fadeIn(imgs[index],200);
    animated = false;
}
var next = document.getElementById("next");
var pev = document.getElementById("prev");
next.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 8) {
            index = 1;
        }else {
            index += 1;   
        }
        animate(index-1);
        showButton();       
};
prev.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 8;
        }else {
            index -= 1;   
        }
        animate(index-1);
        showButton();       
};
function autoPlay(){
	if(timer){
		clearInterval(timer);
	}
	timer = setInterval(function(){
	  next.onclick(); 
      autoPlay();
	},2000);
}
function stop() {
        clearInterval(timer);
}

function showButton(){
	for(var i=0;i<btns.length;i++){
		if(btns[i].className == 'on'){
			 btns[i].className = '';
                break;
		}
	}
	btns[index-1].className = 'on';
}
function fadeIn(obj,time){//淡入函数  实现time毫秒后显示，原理是根据透明度来完成的
            var startTime=new Date(); 
            obj.style.opacity=0;//设置下初始值透明度
            obj.style.display="block";
            var timer=setInterval(function(){
                var nowTime=new Date();
                var prop=(nowTime-startTime)/time;
                if(prop>=1){
                    prop=1;//设置最终系数值
                    clearInterval(timer);
                }
                obj.style.opacity=prop;//透明度公式： 初始值+系数*（结束值-初始值）
            },5);//每隔13ms执行一次function函数
};

lunbo.onmouseout = autoPlay;
lunbo.onmouseover = stop;
btnMouse();
autoPlay();

var pos = document.getElementById("pos");
var pos_ul =document.getElementById("pos_ul");
pos.onmouseover = function (){
    pos_ul.style.display = 'block';
};
pos.onmouseout = function (event){
	var oEvent = event;
	var oTo=oEvent.toElement||oEvent.relatedTarget;
	if(this.contains(oTo)){
	 	return;
	}else{
		pos_ul.style.display = 'none';
	}
};
var a = 1;

var ssk =function(){
	var sec = document.getElementById("search");
	var ssk_timer;
	var pla_array = ["全场下单满99元抢40元观影券","洗发水套装","保险箱","好孩子婴儿推车","雷神笔记本"];
	ssk_timer = setInterval(function(){	
        sec.setAttribute("placeholder",pla_array[a]);
        a++;
        if(a==pla_array.length){
            a=0;
        }
	},4000);
	sec.onblur = function(){
		if(a == 0){
			sec.setAttribute("placeholder",pla_array[pla_array.length-1]);
		}else{
			sec.setAttribute("placeholder",pla_array[a-1]);
		}
		   ssk();
	}
	sec.onfocus = function(){
		 sec.setAttribute("placeholder","");
		 clearInterval(ssk_timer);
	}
}
ssk();

//右侧的tab选项卡
function tab(){
	var tab_select = document.getElementById("tab-select");
	var a = tab_select.getElementsByTagName("a");
	var uls = document.getElementsByClassName("tab-ul");
	function changeul(index){
		for(var i=0;i<uls.length;i++){
			uls[i].style.display = 'none';
		}
		uls[index].style.display = 'block';
	}

    function showBottom(index){
    	for(var i=0;i<a.length-1;i++){
		if(a[i].className == 'tab-on'){
			 a[i].className = '';
                break;
			}
		}
		a[index].className = 'tab-on';
    }
   for(var i=0;i<a.length-1;i++){
   	   var aa = a[i];
   	   aa.id = i;
   	  aa.onmouseover = function(){
    		changeul(this.id);
    		showBottom(this.id);
    	}
   }
    
	
}
tab();

//实现滑动到一定位置时固定导航条
var search = document.getElementById("search1");
var myDate = new Date();
window.onscroll = function(){
scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
if(scrollTop>700){
	search.className = 'search-fixed';
}else{
	search.className = 'search';
}
}

//商品列表里的选项卡
function shop_tab(){
	var shop_lb = document.getElementById('shop-lb');
	var imgs = shop_lb.getElementsByTagName('img');
	var spans = shop_lb.getElementsByTagName('span');
	for(var i=0;i<imgs.length;i++){
		var span = spans[i];
		span.id = i;
		span.onmouseover = function(){
             for(var j=0;j<imgs.length;j++){
             	imgs[j].style.display = 'none';
             	spans[j].className = '';
             }
                imgs[this.id].style.display = 'block';
                fadeIn(imgs[this.id],100);
                spans[this.id].className = 'shop-on';
		}
	}
}
shop_tab();

//京东秒杀倒计时
function djTime(){
	var djk = document.getElementById("date");
	var spans = djk.getElementsByTagName("span");
	Today = new Date();   
	var NowHour = Today.getHours();   
	var NowMinute = Today.getMinutes();           
	var NowSecond = Today.getSeconds();
	H = (23 - NowHour)%2;  
	M = 59 - NowMinute;   
	S = 59 - NowSecond;
	if(M<10){
		M = '0'+M;
	}
	if(S<10){
		S = '0'+S;
	}  
	spans[0].innerHTML = '0'+H;
	spans[1].innerHTML = M;
	spans[2].innerHTML = S;
	setTimeout(djTime,100);
	
}
djTime();

//实现商品列表的滚动
function shop_lunbo(){
	var prev1 = document.getElementById("shop-prev");
	var next1 = document.getElementById("shop-next");
	var list = document.getElementById("List-lunbo");
	var list_timer;
	next1.onclick = function() {
       gundong(-20);
	};  
	prev1.onclick = function() {
       gundong(20);
	};
	function gundong(speed){
		list_timer= setInterval(function(){
			list.style.left = list.offsetLeft+speed+'px';
			if(list.offsetLeft%1000 == 0){
				clearInterval(list_timer);
			}else if(list.offsetLeft <= -4000){
				list.style.left = '-1000px';
			}else if(list.offsetLeft >= -1000){
				list.style.left = '-4000px';
			}
		},10);
	}
}

shop_lunbo();

//实现话费机票的js特效
function right_tab(){
	var right_tab = document.getElementById("right-tab");
	var as = right_tab.getElementsByTagName("a");
	var tabs = document.getElementsByClassName("rg-tab-on");
	var ul = document.getElementById("right-ul");
	right_tab.onmouseover = function(){
			right_tab.style.top = '-34px';
	};
	for(var i=0;i<as.length;i++){
		var a = as[i];
			a.id = i;
		a.onmouseover = function(event){
			var oEvent = event;
			var oFrom=oEvent.fromElement||oEvent.relatedTarget;
			if(this.contains(oFrom)){
			return;
			}else{
			for(var j=0;j<as.length;j++){
				tabs[j].style.display = 'none';
				as[j].style.borderBottom = '0';
			}
			tabs[this.id].style.display = 'block';
			}
		}
		ul.onmouseout = function(event){

			var oEvent = event;
			var oTo=oEvent.toElement||oEvent.relatedTarget;
			if(this.contains(oTo)){
			return;
			}else{
				right_tab.style.top = '0';
			for(var j=0;j<as.length;j++){
				tabs[j].style.display = 'none';
				as[j].style.borderBottom = '1px solid #e6e6e6';
			}
			}
		}

	}
}
right_tab();