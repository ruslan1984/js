
class DrawMatrix extends Matrix{
	constructor(ctx,cubWidth,img){
		super();
		this.setDrawMatrix(ctx,cubWidth,img);	
	}

	setDrawMatrix(ctx,cubWidth,img){
		this.ctx=ctx;
		this.cubWidth=cubWidth;
		this.figures = new Figures(ctx,cubWidth,img);
	}
	
	drawBoard(){
		for(let i=0;i<8;i++){	
			for(let j=0;j<8;j++){				
				this.ctx.fillStyle=((i+j)%2)?"#eeeeee":"#888888";
				this.ctx.fillRect(i*this.cubWidth, j*this.cubWidth, this.cubWidth, this.cubWidth);														
			}			
			this.ctx.fillStyle="#000";
			this.ctx.font="bold "+this.cubWidth/4+"px Arial";
			this.ctx.fillText(String.fromCharCode(65+i), this.cubWidth*i+this.cubWidth*0.43, this.cubWidth*8+this.cubWidth*0.3);
			this.ctx.fillText(Math.abs(i-8), this.cubWidth*8+5, this.cubWidth*i+this.cubWidth*0.6);
		}
	}
	drawMatrix(){
		this.matrix.forEach((item,i)=>{
			item.forEach((item,j)=>{				
				if(item!==0){
					this.figures.draw(i,j,item);	
				}
			});
		});
	}
	drawChecked(x,y){
		this.draw();
		this.ctx.strokeStyle="#0c0";
		this.ctx.lineWidth=3;
		this.ctx.lineJoin = "round";
		this.ctx.strokeRect(x*this.cubWidth+1, y*this.cubWidth+1, this.cubWidth-2, this.cubWidth-2);	
	}
	draw(){
		this.drawBoard();		
		this.drawMatrix();					
	}
}
