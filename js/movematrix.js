//import * from 'js/testtarget.js';

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

	go(x,y){	

		let v= Number(this.getValue(this.oldX,this.oldY));		
		switch (Math.abs(v)){
			case 1:{	
				console.log(this.testMovePawn());
			
				if(this.testMovePawn()){

					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);					
					return true;
				}
			return false;
			}
			case 2:{
				if(this.testMoveElephant()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			
			}
			case 3:{
				if(this.testMoveHorse()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 4:{
				if(this.testMoveRook()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 5:{
				if(this.testMoveQueen()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 6:{
				if(this.testMoveKing()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			default: return false;
		}		
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
		x=0;
		y=0;	
		let u=this.getSign(this.userID);	
		u=1;	
		const target = new TestTarget(this.matrix,x,y,u);
		let length = 0;
		let length1 = 0;


		if(x<7){			
			if(this.matrix[x+1][y+1] === 1*u){
				return false;						
			}

			length = 8-x; 
			const val = target.testTargetLine(length,1,0);
			if((val===4*u)||(val===5*u)){
				return false;
			}
		}
		if(x>0){
			if(this.matrix[x-1][y+1] === 1*u){
				return false;			
			}
			length = x+1; 
			const val = target.testTargetLine(length,-1,0);
			if((val===4*u)||(val===5*u)){
				return false;
			}			
		}
		if(y<7)	{
			length = 8-y; 
			const val =target.testTargetLine(length,0,1);
			if((val===4*u)||(val===5*u)){
				return false;
			}
		}
		if(y>0)	{
			length = y+1; 
			const val = target.testTargetLine(length,0,-1);
			if((val===4*u)||(val===5*u)){
				return false;
			}		
		}

		if((x<7)&&(y<7)){
			length1 = Math.min(8-x, 8-y);
			const val1 =target.testTargetLine(length1,1,1);	
			if((val1===2*u)||(val1===5*u)){
				return false;
			}	
		}
		if((x>0)&&(y>0)){
			length1 = Math.min(x+1, y+1);
			const val1 = target.testTargetLine(length1,-1,-1);	
			if((val1===2*u)||(val1===5*u)){
				return false;
			}		
		}

		if((x<7)&&(y>0)){
			length1 = Math.min(8-x, y+1);
			const val1 = target.testTargetLine(length1,1,-1);			
			if((val1===2*u)||(val1===5*u)){
				return false;
			}			
		}

		if((x>0)&&(y<7)){
			length1 = Math.min(x+1, 8-y);		
			const val1 =target.testTargetLine(length1,-1,1);	
			if((val1===2*u)||(val1===5*u)){
				return false;
			}			
		}
		if(!target.testTargetHorse()){
			return false;
		}	
		if(!target.testTargetKing()){
			return false;
		}

		return true;
	}


	// testTargetLine(length,x,y,xVector,yVector){		
	// 		for(let i=1; i<length; i++){		
				
	// 			let val = this.matrix[x+i*xVector][y+i*yVector];				
	// 			if(val !== 0){
	// 				return val;
	// 			}
	// 		}
	// 	return 0;	
	// }
	// testTargetHorse(x,y){	

	// 	const u=this.getSign(this.userID);		
	// 	if((x+2<8)&&(y+1<8)){
	// 		if(this.matrix[x+2][y+1]===3*u){
	// 			return false;
	// 		}
	// 	}
	// 	if((x+2<8)&&(y-1>=0)){
	// 		if(this.matrix[x+2][y-1]===3*u){
	// 			return false;	
	// 		}
	// 	}
	// 	if((x+1<8)&&(y+2<8)){			
	// 		if(this.matrix[x+1][y+2]===3*u){
	// 			return false;
	// 		}
	// 	}
	// 	if((x+1<8)&&(y-2>=0)){
	// 		if(this.matrix[x+1][y-2]===3*u){
	// 			return false;	
	// 		}
	// 	}
	// 	if((x-2>=0)&&(y+1<8)){
	// 		if(this.matrix[x-2][y+1]===3*u){
	// 			return false;
	// 		}
	// 	}
	// 	if((x-2>=0)&&(y-1>=0)){
	// 		if(this.matrix[x-2][y-1]===3*u){
	// 			return false;					
	// 		}
	// 	}		
	// 	if((x-1>=0)&&(y+2<8)){
	// 		if(this.matrix[x-1][y+2]===3*u){
	// 			return false;
	// 		}
	// 	}
	// 	if((x-1>=0)&&(y-2>=0)){
	// 		if(this.matrix[x-1][y-2]===3*u){
	// 			return false;	
	// 		}			
	// 	}		
	// 	return true;
	// }

};

// class TestTarget{
// 	constructor(x,y,u){
// 		this.x=x;
// 		this.y=y;
// 		this.u=u;
// 	}
// 	testTargetLine(length,xVector,yVector){		
// 			for(let i=1; i<length; i++){		
				
// 				let val = this.matrix[this.x+i*xVector][this.y+i*yVector];				
// 				if(val !== 0){
// 					return val;
// 				}
// 			}
// 		return 0;	
// 	}
// 	testTargetHorse(){	

// 		const u=this.getSign(this.userID);		
// 		if((x+2<8)&&(y+1<8)){
// 			if(this.matrix[this.x+2][this.y+1]===3*this.u){
// 				return false;
// 			}
// 		}
// 		if((x+2<8)&&(y-1>=0)){
// 			if(this.matrix[this.x+2][this.y-1]===3*this.u){
// 				return false;	
// 			}
// 		}
// 		if((x+1<8)&&(y+2<8)){			
// 			if(this.matrix[this.x+1][this.y+2]===3*this.u){
// 				return false;
// 			}
// 		}
// 		if((x+1<8)&&(y-2>=0)){
// 			if(this.matrix[this.x+1][this.y-2]===3*this.u){
// 				return false;	
// 			}
// 		}
// 		if((x-2>=0)&&(y+1<8)){
// 			if(this.matrix[this.x-2][this.y+1]===3*this.u){
// 				return false;
// 			}
// 		}
// 		if((x-2>=0)&&(y-1>=0)){
// 			if(this.matrix[this.x-2][this.y-1]===3*this.u){
// 				return false;					
// 			}
// 		}		
// 		if((x-1>=0)&&(y+2<8)){
// 			if(this.matrix[this.x-1][this.y+2]===3*this.u){
// 				return false;
// 			}
// 		}
// 		if((x-1>=0)&&(y-2>=0)){
// 			if(this.matrix[this.x-1][this.y-2]===3*this.u){
// 				return false;	
// 			}			
// 		}		
// 		return true;
// 	}
// 	testTargetKing(){

// 	}
// }