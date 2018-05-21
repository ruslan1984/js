class TestTarget{
	constructor(matrix,x,y,u){
		this.x=x;
		this.y=y;
		this.u=u;
		this.matrix=matrix;
	}
	testTargetLine(length,xVector,yVector){		
			for(let i=1; i<length; i++){		
				
				let val = this.matrix[this.x+i*xVector][this.y+i*yVector];				
				if(val !== 0){
					return val;
				}
			}
		return 0;	
	}
	testTargetHorse(){	

		//const u=this.getSign(this.userID);		
		if((this.x+2<8)&&(this.y+1<8)){
			if(this.matrix[this.x+2][this.y+1]===3*this.u){
				return false;
			}
		}
		if((this.x+2<8)&&(this.y-1>=0)){
			if(this.matrix[this.x+2][this.y-1]===3*this.u){
				return false;	
			}
		}
		if((this.x+1<8)&&(this.y+2<8)){			
			if(this.matrix[this.x+1][this.y+2]===3*this.u){
				return false;
			}
		}
		if((this.x+1<8)&&(this.y-2>=0)){
			if(this.matrix[this.x+1][this.y-2]===3*this.u){
				return false;	
			}
		}
		if((this.x-2>=0)&&(this.y+1<8)){
			if(this.matrix[this.x-2][this.y+1]===3*this.u){
				return false;
			}
		}
		if((this.x-2>=0)&&(this.y-1>=0)){
			if(this.matrix[this.x-2][this.y-1]===3*this.u){
				return false;					
			}
		}		
		if((this.x-1>=0)&&(this.y+2<8)){
			if(this.matrix[this.x-1][this.y+2]===3*this.u){
				return false;
			}
		}
		if((this.x-1>=0)&&(this.y-2>=0)){
			if(this.matrix[this.x-1][this.y-2]===3*this.u){
				return false;	
			}			
		}		
		return true;
	}
	testTargetKing(){

		length = 2;	
		if((this.x<7)&&(this.y<7)){			
			if(this.testTargetLine(length,1,1)===6*this.u){
				return false;			
			}	
		}
		if((this.x>0)&&(this.y>0)){									
			if(this.testTargetLine(length,-1,-1)===6*this.u){
				return false;
			}		
		}

		if((this.x<7)&&(this.y>0)){									
			if(this.testTargetLine(length,1,-1)===6*this.u){
				return false;
			}			
		}
		if((this.x>0)&&(this.y<7)){											
			if(this.testTargetLine(length,-1,1)===6*this.u){
				return false;
			}			
		}		
		if(this.x<7){						
			if(this.testTargetLine(length,1,0)===6*this.u){
				return false;
			}
		}
		if(this.x>0){
			if(this.testTargetLine(length,-1,0)===6*this.u){
				return false;
			}			
		}
		if(this.y<7)	{
			if(this.testTargetLine(length,0,1)===6*this.u){
				return false;
			}
		}
		if(this.y>0)	{
			if(this.testTargetLine(length,0,-1)===6*this.u){
				return false;
			}		
		}

		return true;
	}
}