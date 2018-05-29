'use strict';
class Matrix{
	constructor(){
		this.matrix = [];
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
		if (x<0||y<0||x>7||y>7){
			throw new SyntaxError("Данные некорректны");
		}
		return this.matrix[x][y];	
			
		
	}	
	getReverseMatrix(){
		let matrix=this.matrix.slice();
		matrix.forEach((item)=>{
			item = item.reverse();	
		});		
		return matrix;
	}
	getСoordinate(figure){
		for(let i=0;i<8;i++){
			for(let j=0;j<8;j++){
				if(this.matrix[i][j]===figure){										
					return [i,j];					
				}				
			}
		}
	}
	reverseMatrix(){		
		this.matrix.forEach((item)=>{
			item = item.reverse();	
		});		
	}
	getSign(a){
		return a/Math.abs(a);
	}
	compareSigns(a,b){
		let a1=a/Math.abs(a);
		let b1=b/Math.abs(b);	
		return (a1===b1);
	}
}


