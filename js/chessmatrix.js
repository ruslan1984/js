class ChessMatrix{
	constructor(ctx,cubWidth,img){
		this.oldX=-1,
		this.oldY=-1,
		this.oldValue=0;
		this.timer; 
		this.clicked=false;
		this.move=1;
		this.userID=1;
		this.clicked=false;
		this.drawMatrix = new DrawMatrix(ctx,cubWidth,img);
		this.moveMatrix = new MoveMatrix();
		this.client = new Client('http://localhost:8080/');
		this.getClientMatrix();
	}
	// setUserID(userID){
	// 	this.userID=userID;	
	// }
	async setUserID(){		
		let userID;
		if(	localStorage.getItem('chessUserID')!==null){
			userID= Number(localStorage.getItem('chessUserID'));
			if(userID<0){
				this.startTimer();						
			}					
		}else{			
			userID = Number(await this.client.getUserID(this.userID));
			if(userID!==0){
				localStorage.setItem('chessUserID',userID)
				if(userID<0){
					this.startTimer();						
				}
			}
		}
		this.userID=userID;	
	}
	click(x,y){
		console.log('c',this.move);
		let v= Number(this.moveMatrix.getValue(x,y));
		let us=this.userID/Math.abs(this.userID);
		let vs=v/Math.abs(v);	
			if(this.clicked){
				if(this.oldValue!==0){					
					//console.log(matrix.testMovePawn(oldX,oldY,x,y,userID));
					//console.log(oldX,oldY,x,y);					
					this.setValue(x,y,this.oldValue);
					this.setValue(this.oldX,this.oldY,0);
					this.move=-this.userID;
					this.drawMatrix.draw();
					// if(this.userID<0){
					// 	this.moveMatrix.reverseMatrix();
					// }
					this.client.setMatrix(this.getMatrix());
					this.client.setMove(this.move);
					this.clicked=false;
					this.startTimer();						
				}					
			}
			if((us===vs)&&(this.userID===this.move)&&(v!==0)){						
				this.oldValue=v;
				this.oldX = x;
				this.oldY = y;
				//console.log(oldX,oldY);
				this.clicked=true;				
			}		
	}
	setValue(x, y, value){
		this.moveMatrix.setValue(x, y, value);
		this.drawMatrix.setValue(x, y, value);
	}
	setMove(move){
		this.move=move;
	}
	setMatrix(matrix){		
		this.drawMatrix.setMatrix(matrix);
		this.moveMatrix.setMatrix(matrix);		
	}

	async getClientMatrix(){
		let mtr = JSON.parse(await this.client.getMatrix());			
		this.setMatrix(mtr);
	}

	getMatrix(){
		return this.moveMatrix.getMatrix();
	}	

	startTimer(){

		this.timer= setInterval(async ()=>{		
			//console.log('t');
		   	this.move = Number(await this.client.getMove());		

		   	//console.log('m',this.move);

		  	if(this.move===this.userID){
		  		clearInterval(this.timer);
		  		const mtr = JSON.parse(await this.client.getMatrix());
				this.setMatrix(mtr);					
				// if(this.userID<0){
				// 	this.moveMatrix.reverseMatrix();
				// }
				this.drawMatrix.draw();		
		 	}
			  
		},
		1000); 	
	}
}