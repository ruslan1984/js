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
	setNewMatrix(){	
		// for(let i=0;i<8;i++){
		// 	this.matrix[i]=new Array();
		// 	for(let j=0;j<8;j++){				
		// 		if(j===0){
		// 			if((i===0)||(i===7)){
		// 				this.matrix[i][j]=-4;							
		// 			}else if((i===1)||(i===6)){
		// 				this.matrix[i][j]=-3;						
		// 			}else if((i===2)||(i===5)){
		// 				this.matrix[i][j]=-2;	
		// 			}else if(i===3){
		// 				this.matrix[i][j]=-5;	
		// 			}else if(i===4){
		// 				this.matrix[i][j]=-6;	
		// 			}
		// 			continue;
		// 		}else if(j===1){
		// 			this.matrix[i][j]=-1;	
		// 			continue;
		// 		}else if(j===6){
		// 			this.matrix[i][j]=1;	
		// 			continue;
		// 		}else if(j===7){
		// 			if((i===0)||(i===7)){
		// 				this.matrix[i][j]=4;							
		// 			}else if((i===1)||(i===6)){
		// 				this.matrix[i][j]=3;						
		// 			}else if((i===2)||(i===5)){
		// 				this.matrix[i][j]=2;	
		// 			}else if(i===3){
		// 				this.matrix[i][j]=5;	
		// 			}else if(i===4){
		// 				this.matrix[i][j]=6;	
		// 			}
		// 			continue;
		// 		}
		// 		this.matrix[i][j]=0;
		// 	}
		// }	
	for(let i=0;i<8;i++){
		this.matrix[i]=new Array();
		for(let j=0;j<8;j++){
			this.matrix[i][j]=0;
		}
	}	
		this.matrix[3][4]=1;	
		this.matrix[2][2]=-6;
		this.matrix[6][6]=6;
		this.matrix[5][5]=-1;	
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


