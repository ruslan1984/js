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
	getNewMatrix(){
	let matrix=[];		
	for(let i=0;i<8;i++){
			matrix[i]=new Array();
			for(let j=0;j<8;j++){				
				if(j===0){
					if((i===0)||(i===7)){
						matrix[i][j]=-4;							
					}else if((i===1)||(i===6)){
						matrix[i][j]=-3;						
					}else if((i===2)||(i===5)){
						matrix[i][j]=-2;	
					}else if(i===3){
						matrix[i][j]=-5;	
					}else if(i===4){
						matrix[i][j]=-6;	
					}
					continue;
				}else if(j===1){
					matrix[i][j]=-1;	
					continue;
				}else if(j===6){
					matrix[i][j]=1;	
					continue;
				}else if(j===7){
					if((i===0)||(i===7)){
						matrix[i][j]=4;							
					}else if((i===1)||(i===6)){
						matrix[i][j]=3;						
					}else if((i===2)||(i===5)){
						matrix[i][j]=2;	
					}else if(i===3){
						matrix[i][j]=5;	
					}else if(i===4){
						matrix[i][j]=6;	
					}
					continue;
				}
				matrix[i][j]=0;
			}
		}
	return matrix;
	}
}


