class ChessMatrix{
	constructor(ctx,cubWidth,img){
		this.drawMatrix = new DrawMatrix(ctx,cubWidth,img);
		this.moveMatrix = new MoveMatrix();		
	}

	setMatrix(matrix){
		this.drawMatrix.setMatrix(matrix);
		this.moveMatrix.setMatrix(matrix);
	}
	setDrawMatrix(ctx,cubWidth,img){

	}

}