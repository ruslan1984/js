'use strict';

class Figures{
	constructor(ctx,cubWidth,img){
		this.setDraw(ctx,cubWidth,img);
	}
	setDraw(ctx,cubWidth,img){
		this.pawnBlack = new Figure(ctx,cubWidth,img,440,0,100,95);		
		this.kingBlack = new Figure(ctx,cubWidth,img,365,0,80,90);
		this.queenBlack = new Figure(ctx,cubWidth,img,274,0,80,90);		
		this.horseBlack = new Figure(ctx,cubWidth,img,90,0,80,90);
		this.elephantBlack = new Figure(ctx,cubWidth,img,0,0, 80,90);
		this.rookBlack = new Figure(ctx,cubWidth,img,185,0,80,90);
		this.pawnWhite = new Figure(ctx,cubWidth,img,443,90,100,95);
		this.kingWhite = new Figure(ctx,cubWidth,img,365,90,80,90);
		this.queenWhite = new Figure(ctx,cubWidth,img,274,90,80,90);		
		this.horseWhite = new Figure(ctx,cubWidth,img,90,90,80,90);
		this.elephantWhite = new Figure(ctx,cubWidth,img,0,90, 85,90);
		this.rookWhite = new Figure(ctx,cubWidth,img,185,90,80,90);
	}
	draw(x,y,item){
		switch(item){
			case 1:
				this.pawnWhite.draw(x,y);
			break;
			case 2:
				this.rookWhite.draw(x,y);
			break;
			case 3:
				this.horseWhite.draw(x,y);
			break;
			case 4:
				this.elephantWhite.draw(x,y);
			break;
			case 5:
				this.queenWhite.draw(x,y);
			break;
			case 6:
				this.kingWhite.draw(x,y);
			break;
			case -1:
				this.pawnBlack.draw(x,y);
			break;
			case -2:
				this.rookBlack.draw(x,y);
			break;
			case -3:
				this.horseBlack.draw(x,y);
			break;
			case -4:
				this.elephantBlack.draw(x,y);
			break;
			case -5:
				this.queenBlack.draw(x,y);
			break;
			case -6:
				this.kingBlack.draw(x,y);
			break;			
		}
	}
}
