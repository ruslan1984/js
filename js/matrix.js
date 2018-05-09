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
	// testMoveRook(oldX,oldY,x,y){
	// 	if(((oldX===x)||(oldY===y))&&this.testLastPoint(oldX,oldY,x,y,userID)){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// testMoveElephant(oldX,oldY,x,y){
	// 	if((Math.abs(oldX-x)===Math.abs(oldY-y))&&(this.testLastPoint(oldX,oldY,x,y,userID))){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// testMoveHorse(oldX,oldY,x,y){
	// 	if((((Math.abs(oldX-x)===2)&&(Math.abs(oldY-y)===1))||
	// 	   ((Math.abs(oldX-x)===1)&&(Math.abs(oldY-y)===2)))&&
	// 	   (this.testLastPoint(oldX,oldY,x,y,userID))){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// testMoveQueen(oldX,oldY,x,y){
	// 	if((this.testMoveRook(oldX,oldY,x,y))||
	// 	   (this.testMoveElephant(oldX,oldY,x,y))){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// testMoveKing(oldX,oldY,x,y){
	// 	if((Math.abs(oldX-x)===1)||(Math.abs(oldY-y)===1)){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// testMovePawn(oldX,oldY,x,y,userID){
	// 	const u = userID/Math.abs(userID);
	// 	const value = this.getValue(x,y);		
	// 	const v = value/Math.abs(value);
	// 	if(Math.abs(oldX===x)&&(value===0)){
	// 		if((oldY-y)===1){
	// 			return true;
	// 		}
	// 		if((oldY===6)&&((oldY-y)===2)){
	// 			return true;
	// 		}
	// 	}
	// 	if(((oldY-y)===1)&&(Math.abs(oldX-x)===1)&&(u===-v)){
	// 		return true;
	// 	}
	// 	return false;
	// }
	// testLastPoint(oldX,oldY,x,y,userID){
	// 	const u = userID/Math.abs(userID);
	// 	const value = this.getValue(x,y);		
	// 	const v = value/Math.abs(value);
	// 	return (u===-v)||(value===0);
	// }
}


