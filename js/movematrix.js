
class MoveMatrix extends Matrix{
	constructor(){
		super();
		//this.matrix=matrix;		
		this.oldX=-1;
		this.oldY=-1;
		this.x=-1;
		this.y=-1;
		this.userID=0;
	}
	setMove(oldX,oldY,x,y){
		this.oldX=oldX;
		this.oldY=oldY;
		this.x=x;
		this.y=y;
	}
	setUserID(userID){
		this.userID=userID;
	}

	setMatrix(matrix){
		this.matrix=matrix;
	}
	testMoveRook(){
		if(((this.oldX===this.x)||(this.oldY===this.y))&&
			this.testLastPoint()&&this.testLineRook()){
			return true;
		}
		return false;
	}
	testMoveElephant(){
		if((Math.abs(this.oldX-this.x)===Math.abs(this.oldY-this.y))&&
			(this.testLastPoint())&&this.testLineElephant()){
			return true;
		}
		return false;
	}
	testMoveHorse(){
		if((((Math.abs(this.oldX-this.x)===2)&&(Math.abs(this.oldY-this.y)===1))||
		    ((Math.abs(this.oldX-this.x)===1)&&(Math.abs(this.oldY-this.y)===2)))&&
		   (this.testLastPoint())){
			return true;
		}
		return false;
	}
	testMoveQueen(){
		if((this.testMoveRook())||
		   (this.testMoveElephant())){
			return true;
		}
		return false;
	}
	testMoveKing(){
		if((Math.abs(this.oldX-this.x)<=1)&&(Math.abs(this.oldY-this.y)<=1)){
			return true;
		}
		return false;
	}
	testMovePawn(){
		const u = this.userID/Math.abs(this.userID);
		const value = this.getValue(this.x,this.y);		
		const v = value/Math.abs(value);
		if(Math.abs(this.oldX===this.x)&&(value===0)){
			if((this.oldY-this.y)===1){
				return true;
			}
			if((this.oldY===6)&&((this.oldY-this.y)===2)){
				return true;
			}
		}
		if(((this.oldY-this.y)===1)&&(Math.abs(this.oldX-this.x)===1)&&(u===-v)){
			return true;
		}
		return false;
	}
	testLastPoint(){
		const u = this.userID/Math.abs(this.userID);
		const value = this.getValue(this.x,this.y);		
		const v = value/Math.abs(value);		
		return (((u===-v)||(value===0))&&(value!==6)&&(value!==-6));
	}
	testLineRook(){
		let l=0;
		let length;
		if(this.oldX===this.x){			
			length=Math.abs(this.oldY-this.y);
			l=(this.oldY<this.y)?1:-1;
			for(let i=1;i<length;i++){				
				if(this.matrix[this.x][this.oldY+i*l]!==0){
					return false;
				}
			}
		}
		if(this.oldY===this.y){			
			length=Math.abs(this.oldX-this.x);
			l=(this.oldX<this.x)?1:-1;
				
			for(let i=1;i<length;i++){			
				if(this.matrix[this.oldX+i*l][this.y]!==0){					
					return false;
				}
			}
		}
		return true;
	}
	testLineElephant(){
		let length=Math.abs(this.oldY-this.y);
		let lx=(this.oldX<this.x)?1:-1;
		let ly=(this.oldY<this.y)?1:-1;		
		for(let i=1; i<length; i++){
			console.log(this.matrix[this.oldX+i*lx][this.oldY+i*ly]);
			if(this.matrix[this.oldX+i*lx][this.oldY+i*ly]!==0){
				return false;
			}
		}
		return true;	
	}	
}