
class DrawMatrix extends Matrix{
	constructor(ctx,cubWidth,img){
		super();
		this.setDrawMatrix(ctx,cubWidth,img)
		this.matrix = [];		
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
			this.ctx.fillText(String.fromCharCode(65+i), this.cubWidth*i+5, this.cubWidth*8+10);
			this.ctx.fillText(Math.abs(i-8), this.cubWidth*8+5, this.cubWidth*i+10);
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
	draw(){
		this.drawBoard();		
		this.drawMatrix();					
	}
}
