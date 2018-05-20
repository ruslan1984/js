'use strict';

class Figures{
	constructor(ctx,cubWidth,img){
		this.setDraw(ctx,cubWidth,img);
	}
	setDraw(ctx,cubWidth,img){
		this.pawnWhite = new Figure(ctx,cubWidth,img,449,93,90,84);
		this.kingWhite = new Figure(ctx,cubWidth,img,365,93,80,84);
		this.queenWhite = new Figure(ctx,cubWidth,img,274,93,80,84);		
		this.horseWhite = new Figure(ctx,cubWidth,img,90,93,80,84);
		this.elephantWhite = new Figure(ctx,cubWidth,img,0,93,85,84);
		this.rookWhite = new Figure(ctx,cubWidth,img,185,93,80,84);	
		this.pawnBlack = new Figure(ctx,cubWidth,img,449,3,90,84);		
		this.kingBlack = new Figure(ctx,cubWidth,img,365,3,80,84);
		this.queenBlack = new Figure(ctx,cubWidth,img,274,3,80,84);		
		this.horseBlack = new Figure(ctx,cubWidth,img,90,3,80,84);
		this.elephantBlack = new Figure(ctx,cubWidth,img,0,3, 80,84);
		this.rookBlack = new Figure(ctx,cubWidth,img,185,3,80,84);

		this.test = new Figure(ctx,cubWidth,img,185,3,180,184);

		
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

			case 9:
				this.test.draw(x,y);
			break;		
		}
	}
}
