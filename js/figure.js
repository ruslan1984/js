'use strict';

class Figure{
	constructor(ctx,cubWidth,img,x,y,w,h){
		this.ctx=ctx;
		this.cubWidth=cubWidth;
		this.img=img;
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}
	draw(x,y){
		this.ctx.drawImage(this.img,this.x,this.y, this.w,this.h,this.cubWidth*x,this.cubWidth*y,this.cubWidth,this.cubWidth);
	}
}