'use strict';
class Matrix{
	constructor(matrix){
		this.matrix = matrix;
	}
	setMatrix(matrix){
		this.matrix=matrix;		
	}
	getMatrix(){		
		return this.matrix;
	}
	setValue(x,y,value){
		this.matrix[x][y] = value;
	}	
	getValue(x,y){		
		return this.matrix[x][y];
	}	
	getReverseMatrix(){
		let matrix=this.matrix.slice();
		matrix.forEach((item)=>{
			item = item.reverse();	
		});		
		return matrix;
	}
	reverseMatrix(){		
		this.matrix.forEach((item)=>{
			item = item.reverse();	
		});		
	}	
}


