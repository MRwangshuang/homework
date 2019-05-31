var lastTime = 0;
var ballX=new Array();
var ballY=new Array();
var lastTime = 0;
var count=5;
var Freq;
// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(480,480);
	a=random(0,1);
	b=random(0,1);
	c=random(0,1);
	d=random(0,1);
	for(var j=1;j<count;j++){
		ballX[j]=300*random(0,1);
		ballY[j]=300*random(0,1);
	}
	Freq = new Array();
	for(var i = 0;i<500;i++)
	{
		Freq[i] = 0;
	}
	push();
	stroke(255,150+100*random(0,1),100*random(0,1));
	strokeWeight(10);
	line(0,0,480,0);
	line(0,0,0,480);
	line(480,0,480,480);
	line(0,480,480,480);
	pop();
}
var mx=300;
var my=300;
var ax=0;
var ay=0;
ballX[0]=300;
ballY[0]=300;

function draw() {
	var secs = millis()/2000;
	push();
	fill(255,7);
	rect(0,0,480,480);
	pop();
	
	var tNow = getTime();
	var dt = 0.1*(tNow - lastTime);
	for(var j=0;j<count;j++){
		drawTing(ballX[j],ballY[j]);
	}
	
	if(mouseIsPressed){
		for(var j=0;j<count;j++){
			mx=mouseX;
			my=mouseY;
			ax=(mx-ballX[j])*0.05;
			ay=(my-ballY[j])*0.05;
			print(ax[j]);
		}
	}
	
	if(1){
		for(var j=0;j<count;j++){
			if(mx!=ballX[j]&&j==0){
				for(var k=0;k<100;k++){
					var dx =-0.01*(ax+j*random(0,1));
					var dy =-0.01*(ay+j*random(0,1));

					ballX[j] += dx;
					ballY[j] += dy;
					if(!(ballX[j]<450&ballX[j]>15)){
						ballX[j] -= dx;
						ax=-ax;
					}
					if(!(ballY[j]<450&ballY[j]>15)){
						ballY[j] -= dy;
						ay=-ay;
					}
					drawCircle(ballX[j],ballY[j]);
					//drawTing(ballX[j],ballY[j])
				}
				ax*=0.99;
				ay*=0.99;
				drawCircle(ballX[j],ballY[j]);
			}
			else if(j!=0){
			
					var xx = ballX[j];
					var yy = ballY[j];
					var z=2*j;
					if(mouseIsPressed){
						var dx =0.1*(mouseX-width/2-xx);
						var dy =0.1*(mouseY-height/2-yy);
						xx += dx;
						yy += dy;
						ballX[j] =xx ;
						ballY[j]=yy ;
						continue;
					}
					var dx = 0.1*(0.8*(yy-xx)+yy*z*z/9)* 0.;
					var dy = 0.1*(2.5*(xx+yy)-xx*z*z) * dt;
					var dz=0.05*(-5*z+3*yy+xx*yy*z)*dt;
					xx += dx;
					yy += dy;
					z+=dz
					if(!(ballX[j]<450&ballX[j]>15)){
						xx =random(0,1)*500;
					}
					if(!(ballY[j]<450&ballY[j]>15)){
						yy =random(0,1)*500;
						
					}
					ballX[j] = xx;
					ballY[j] = yy;
				
			}
			
			
		}
		//ballX+=1;
	}


	lastTime = tNow;
}

function drawCircle(X,Y){
	var secs = millis()/20;
	push();
	noStroke();
	fill(255,150+100*random(0,1),100*random(0,1));
	ellipse(X,Y,5*sin(secs)+20,5*sin(secs)+20);
	pop();

}

function drawTing(X,Y){
	push;
	translate(X,Y);
	var columnCount=500;
	var colunmWd = 100/columnCount;

	noStroke();
	for(var i=0;i<columnCount;i++)
	{
		var x = i*colunmWd;
		var y = 0;
		var height = Freq[i] * 0.2;
		//fill(255,50*random(0,1),100*random(0,1));
		var cl=getColor(X/100,Y/100);
		fill(cl);
		rect(x,y,colunmWd,-3*height*sin(height));
		

	}
	
	for(var j=0;j<100;j++){
		
		for(var k=0;k<10000;k++){
			var randomX=random(0,1);
			var randomY=random(0,1);
			if((cos(-randomX*2*PI)+3*exp(-randomX))/4>randomY){
				var id = floor(1000*randomX);
				Freq[id]+=1;
				break;
			}
		}
				
	}
	pop;
}


function getColor(dx,dy)
{
	var cr = color(
		constrain(200*sin((dx/dy)),0,255),
		constrain(200*sin((dy+dx)),0,255),
		constrain(100*cos((dx*dx+dy*dy)),0,255),
		100-100*sqrt(dx*dx+dy*dy));
	return cr;
}

function getSize3(dx,dy,x,y)
{
	return 0.5*sqrt(dx*dx+dy*dy)+0.5*sin(0.05*(x+y))+0.1;
}

function getTime()
{
	return millis()/1000;
}

