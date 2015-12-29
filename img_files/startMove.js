function css(obj, attr, value)
{
	if(arguments.length==2)
	{
		if(attr!='opacity')
		{
			return parseInt(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
		}
		else
		{
			return Math.round(100*parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]));
		}
	}
	else if(arguments.length==3)
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

var MIAOV_MOVE_TYPE={
	BUFFER: 1,
	FLEX: 2
};

function miaovStopMove(obj)
{
	clearInterval(obj.timer);
}

function miaovStartMove(obj, oTarget,timers,iType, fnCallBack, fnDuring)
{
	var fnMove=null;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	
	switch(iType)
	{
		case MIAOV_MOVE_TYPE.BUFFER:
			fnMove=miaovDoMoveBuffer;
			break;
		case MIAOV_MOVE_TYPE.FLEX:
			fnMove=miaovDoMoveFlex;
			break;
	}
	
	obj.timer=setInterval(function (){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
	}, timers);
}

function miaovDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		cur=css(obj, attr);
		if(oTarget[attr]!=cur)
		{
			bStop=false;
			
			speed=(oTarget[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			css(obj, attr, cur+speed);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}

function miaovDoMoveFlex(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		if(!obj.oSpeed)obj.oSpeed={};
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1)
		{
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
			obj.oSpeed[attr]*=0.7;
			
			css(obj, attr, cur+obj.oSpeed[attr]);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}
function getByClass(sClass)
{
	var aEle=document.getElementsByTagName('*');
	var aResult=[];
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	var i=0;
	
	for(i=0;i<aEle.length;i++)
	{
		//if(aEle[i].className==sClass)
		//if(aEle[i].className.search(sClass)!=-1)
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}
function GetByClassAll(obj,sClass)
				{
					var aEle=obj.getElementsByTagName('*');
					var aResult=[];
					var re=new RegExp('\\b'+sClass+'\\b', 'i');
					var i=0;
					
					for(i=0;i<aEle.length;i++)
					{
						//if(aEle[i].className==sClass)
						//if(aEle[i].className.search(sClass)!=-1)
						if(re.test(aEle[i].className))
						{
							aResult.push(aEle[i]);
						}
					}
					
					return aResult;
				}
function subNavTag(obj1,obj2)
	{
		var oSub1P=obj1.getElementsByTagName('p'),
		oSection=getByClass('section')[0],
		opIndex=GetByClassAll(obj2,'pIndex');
		for(i=0;i<oSub1P.length;i++)
		{
			oSub1P[i].index=i;
			oSub1P[i].onclick=function()
			{
				for(i=0;i<oSub1P.length;i++)
				{
					opIndex[i].style.display='none';
				}
				opIndex[this.index].style.display='block';
				newColor=getCss(this.parentNode,'backgroundColor') ;
				css(oSection,'backgroundColor',newColor)
			}
		}	
	}
function startMove(obj,iTarget)
{
	clearInterval(timer);
	timer=setInterval(function(){
	var iSpeed=(iTarget-obj.offsetTop)/15;
	iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(iTarget==obj.offsetTop)
		{
			clearInterval(timer);
		}
		else
		{
			obj.style.top=obj.offsetTop+iSpeed+'px';
		}
		},30);
}

function myAddEvent(obj, sEvent, fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEvent, fn);
	}
	else
	{
		obj.addEventListener(sEvent, fn, false);
	}
}
function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function getCss(obj, attr, value)
{
	if(arguments.length==2)	//获取
	{
		return getStyle(obj, attr);
	}
	else if(arguments.length==3)	//设置
	{
		obj.style[attr]=value;
	}
}
//柚园计划滚动
function youTag(obj)
{
	 oPlanOl=obj.getElementsByTagName('ol')[0],
			oPlanOlLi=oPlanOl.getElementsByTagName('li'),
			oNext=obj.getElementsByTagName('a')[1],
			oPrev=obj.getElementsByTagName('a')[0],
			iNow=0;
		oNext.onclick=function()
		{
			if(iNow!=oPlanOlLi.length-1)
			{
			iNow++;
			}
			miaovStartMove(oPlanOl,{left:-527*iNow},30,MIAOV_MOVE_TYPE.BUFFER);
		}
		oPrev.onclick=function()
		{
			if(iNow!=0)
			{
			iNow--;
			}
			miaovStartMove(oPlanOl,{left:-527*iNow},30,MIAOV_MOVE_TYPE.BUFFER);
		}
}
//关于我们
	function aboutus()
	{
	var oAboutUs=getByClass('aboutUs')[0];
	slideScroll(oAboutUs);
	}
	function product()
	{
	var oproduct=getByClass('product')[0];
	slideScroll(oproduct);
	}
	function recruitment()
	{
	var oRecruitment=getByClass('recruitment')[0];
	slideScroll(oRecruitment)
	}
function slideScroll(obj)
{
	var oText=obj.getElementsByTagName('div')[0],
		oBtn=obj.getElementsByTagName('div')[1],
		disY=0;
	
	oBtn.onmousedown=function (ev)
	{
		//alert(oText.offsetHeight);
		var oEvent=ev||event;
		disY=oEvent.clientY-oBtn.offsetTop;
		document.onmousemove=function (ev)
		{
			var oEvent=ev||event;
			var t=oEvent.clientY-disY;
			setLeft(t)
			//document.title=scalc;
		};
		
		document.onmouseup=function ()
		{
			document.onmousemove=null;
			document.onmouseup=null;
		};
		
		return false;
	}
	function setLeft(t)
	{
	if(t<0)
	{
		t=0;
	}
	else if(t>obj.offsetHeight-oBtn.offsetHeight-20)
	{
		t=obj.offsetHeight-oBtn.offsetHeight-20;
	}
	oBtn.style.top=t+'px';
	scale=(t/(obj.offsetHeight-oBtn.offsetHeight-20)).toFixed(2);
	oText.style.top=-(oText.offsetHeight-obj.offsetHeight)*scale+'px';	
	}
	function onMouseWheel(ev)
	{
		var oEvent=ev||event;
		var bDown=true;
		
		bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		
		if(bDown)
		{
			setLeft(oBtn.offsetTop+10);
		}
		else
		{
			setLeft(oBtn.offsetTop-30);
		}
		
		if(oEvent.preventDefault)
		{
			oEvent.preventDefault();
		}
		
		return false;
	}	
	myAddEvent(obj, 'mousewheel', onMouseWheel);
	myAddEvent(obj, 'DOMMouseScroll', onMouseWheel);	
}