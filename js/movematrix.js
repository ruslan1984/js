
class MoveMatrix extends Matrix{
	constructor(){
		super();		
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
			if(this.matrix[this.oldX+i*lx][this.oldY+i*ly]!==0){
				return false;
			}
		}
		return true;	
	}
	testTarget(x,y){	
		x=4;
		y=2;		
		const u=this.getSign(this.userID);		
		let length = 0;
		if(x<7){
			if(this.matrix[x+1][y-1]===1*u){
				return false;						
			}

			length = 8-x; 
			for(let i=1;i<=length;i++){				
				if(this.matrix[x-i][y]===4*u){
					return false;
				}
			}
		}
		if(x>0){
			if(this.matrix[x-1][y-1]===1*u){
				return false;			
			}
			length = Math.abs(x-8); 
			for(let i=1;i<length;i++){				
				if(this.matrix[x+i][y]===4*u){
					return false;
				}
			}
		}	

		if(y<7)	{
			length = 8-x; 
			for(let i=1;i<=length;i++){				
				if(this.matrix[x][y-i]===4*u){
					return false;
				}
			}
		}
		if(y>0)	{
			length = Math.abs(x-8); 
			for(let i=1;i<length;i++){				
				if(this.matrix[x][y+i]===4*u){
					return false;
				}
			}			
		}

		return true;
	}	

};