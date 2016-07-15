"use strict"
;(function(document,window){
	var canvas = document.getElementById("clock"),
	    ctx = canvas.getContext("2d"),
	    center = canvas.height/2,						//中心点：画布中心点
	    radius = center*0.9;							//半径：画布高度的一半再乘以0.9

	/**
	 * 默认配置(可修改)：
	 * @type {Object}
	 */
	var config = {
		edge: [radius*0.95,radius*1.05],	//表盘边缘值过渡区： 0.95倍半径至1.05倍半径
		edgeColor: ["#333","white","#333"],				//表盘边缘过度颜色
		fastener: [radius*0.1,"#333"],					//表中心大小
		numberSize: radius*0.15,					//数字大小
		hourSize: [radius*0.5,radius*0.07],
		minuteSize: [radius*0.8,radius*0.07],
		secondSize: [radius*0.9,radius*0.02]		//三者为时针分针秒针的长宽
	};

	ctx.translate(center, center);

	function drawFace(ctx, radius) {         
	  var grad;
	  ctx.beginPath();
	  ctx.arc(0, 0, radius, 0, 2*Math.PI);
	  ctx.fillStyle = 'white';
	  ctx.fill();
	  grad = ctx.createRadialGradient(0,0,config.edge[0], 0,0,config.edge[1]);
	  grad.addColorStop(0, config.edgeColor[0]);
	  grad.addColorStop(0.5, config.edgeColor[1]);
	  grad.addColorStop(1, config.edgeColor[2]);
	  ctx.strokeStyle = grad;
	  ctx.lineWidth = config.fastener[0];
	  ctx.stroke();
	  ctx.beginPath();
	  ctx.arc(0, 0, config.fastener, 0, 2*Math.PI);
	  ctx.fillStyle = config.fastener[1];
	  ctx.fill();
	}

	function drawNumbers(ctx, radius) {

	  var ang;
	  var num,length = radius*0.85;
	  ctx.font = config.numberSize + "px arial";
	  ctx.textBaseline="middle";
	  ctx.textAlign="center";
	  for(num = 1; num < 13; num++){
	    ang = num * Math.PI / 6;      	
	    ctx.rotate(ang);
	    ctx.translate(0, -length);   		
	    ctx.rotate(-ang);							
	    ctx.fillText(num.toString(), 0, 0);			
	    ctx.translate(-length*Math.sin(ang), length*Math.cos(ang));  
	  }
	}

	function drawTime(ctx, radius){
	    var now = new Date();
	    var hour = now.getHours();
	    var minute = now.getMinutes();
	    var second = now.getSeconds();
	    //hour
	    hour=hour%12;
	    hour=(hour*Math.PI/6)+
	    (minute*Math.PI/(6*60))+   
	    (second*Math.PI/(360*60)); 
	    drawHand(ctx, hour, config.hourSize[0], config.hourSize[1]);    
	    //minute
	    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));		
	    drawHand(ctx, minute, config.minuteSize[0], config.minuteSize[1]);	
	    // second
	    second=(second*Math.PI/30);	
	    drawHand(ctx, second, config.secondSize[0], config.secondSize[1]);
	}

	function drawHand(ctx, pos, length, width) {
	    ctx.beginPath();
	    ctx.lineWidth = width;
	    ctx.lineCap = "round";
	    ctx.moveTo(0,0);
	    ctx.rotate(pos);
	    ctx.lineTo(0, -length);
	    ctx.stroke();
	    ctx.rotate(-pos);
	}

	function drawClock() {
		drawFace(ctx, radius);
		drawNumbers(ctx, radius);
		drawTime(ctx, radius);
		window.requestAnimationFrame(drawClock);
	}

	window.requestAnimationFrame(drawClock);
	//drawClock();
}(document,window));		