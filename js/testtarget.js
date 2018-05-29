class TestTarget extends MoveMatrix{
	constructor(){
		super();



		this.targetX=5;
		this.targetY=5;
		this.u=1;//this.getSign(this.userID);
		console.log(this.getSign(this.userID));
		// this.matrix=matrix;
	}

	testTarget(){		

		return  this.testTargetQueen()&&
				this.testTargetElephant()&&
				this.testTargetRook()&&
				this.testTargetPawn()&&
				this.testTargetHorse()&&
				this.testTargetKing();
	}
	setTarget(x,y,u){
		this.targetX=x;
		this.targetY=y;
		this.u=u;
		//this.setMatrix(matrix);
		//this.matrix=matrix;	
	}


	getLineLength(xVector,yVector){
		let lx=9;
		let ly=9;
		if(xVector===1){
			lx=8-this.targetX;
		}
		if(xVector===-1){
			lx=this.targetX+1;
		}
		if(yVector===1){
			ly=8-this.targetY;
		}
		if(yVector===-1){
			ly=this.targetY+1;
		}
		return Math.min(lx,ly);

	}
	testTargetLine(xVector,yVector){		
		const length=this.getLineLength(xVector,yVector);
		for(let i=1; i<length; i++){
			let val = this.matrix[this.targetX+i*xVector][this.targetY+i*yVector];				
			if(val !== 0){
				return val;
			}
		}
		return 0;	
	}
	testTargetStep(xVector,yVector){			
		const val = this.matrix[this.targetX+xVector][this.targetY+yVector];								
		return (val!==0)?val:0;	
	}


	testTargetLineUnit(unit){
		return !(((this.targetX<7)&&(this.testTargetLine(1,0)===unit*this.u))||
				 ((this.targetX>0)&&(this.testTargetLine(-1,0)===unit*this.u))||
				 ((this.targetY<7)&&(this.testTargetLine(0,1)===unit*this.u))||
				 ((this.targetY>0)&&(this.testTargetLine(0,-1)===unit*this.u)));
	}
	testTargetDiagonalUnit(unit){
		return !(((this.targetX<7)&&(this.targetY<7)&&(this.testTargetLine(1,1)===unit*this.u))||
				 ((this.targetX>0)&&(this.targetY>0)&&(this.testTargetLine(-1,-1)===unit*this.u))||
				 ((this.targetX<7)&&(this.targetY>0)&&(this.testTargetLine(1,-1)===unit*this.u))||
				 ((this.targetX>0)&&(this.targetY<7)&&(this.testTargetLine(-1,1)===unit*this.u)));
	}
	testTargetRook(){				
		return this.testTargetLineUnit(4);		
	}

	testTargetElephant(){		
		return this.testTargetDiagonalUnit(2);
	}

	testTargetQueen(){		
		return this.testTargetLineUnit(5)&&this.testTargetDiagonalUnit(5);			
	}


	testTargetHorse(){			
		return !(((this.targetX+2<8)&&(this.targetY+1<8)&&(this.matrix[this.targetX+2][this.targetY+1]===3*this.u))||
			((this.targetX+2<8)&&(this.targetY-1>=0)&&(this.matrix[this.targetX+2][this.targetY-1]===3*this.u))||
			((this.targetX+1<8)&&(this.targetY+2<8)&&(this.matrix[this.targetX+1][this.targetY+2]===3*this.u))||
			((this.targetX+1<8)&&(this.targetY-2>=0)&&(this.matrix[this.targetX+1][this.targetY-2]===3*this.u))||
			((this.targetX-2>=0)&&(this.targetY+1<8)&&(this.matrix[this.targetX-2][this.targetY+1]===3*this.u))||
			((this.targetX-2>=0)&&(this.targetY-1>=0)&&(this.matrix[this.targetX-2][this.targetY-1]===3*this.u))||
			((this.targetX-1>=0)&&(this.targetY+2<8)&&(this.matrix[this.targetX-1][this.targetY+2]===3*this.u))||
			((this.targetX-1>=0)&&(this.targetY-2>=0)&&(this.matrix[this.targetX-1][this.targetY-2]===3*this.u)));
			
	}
	testTargetKing(){				
		return !(((this.targetX<7)&&(this.targetY<7)&&(this.testTargetStep(1,1)===6*this.u))||
			((this.targetX>0)&&(this.targetY>0)&&(this.testTargetStep(-1,-1)===6*this.u))||
			((this.targetX<7)&&(this.targetY>0)&&(this.testTargetStep(1,-1)===6*this.u))||
			((this.targetX>0)&&(this.targetY<7)&&(this.testTargetStep(-1,1)===6*this.u))||
			((this.targetX<7)&&(this.testTargetStep(1,0)===6*this.u))||
			((this.targetX>0)&&(this.testTargetStep(-1,0)===6*this.u))||
			((this.targetY<7)&&(this.testTargetStep(0,1)===6*this.u))||
			((this.targetY>0)&&(this.testTargetStep(0,-1)===6*this.u)));		
	}
	testTargetPawn(){			
		return !(((this.targetX<7)&&(this.matrix[this.targetX+1][this.targetY+1] === 1*this.u))||		
		   ((this.targetX>0)&&(this.matrix[this.targetX-1][this.targetY+1] === 1*this.u)));
				
	}
}