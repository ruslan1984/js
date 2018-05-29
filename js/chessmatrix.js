class ChessMatrix{
	constructor(ctx,cubWidth,img){	
		
		this.newGame();
		this.drawMatrix = new DrawMatrix(ctx,cubWidth,img);
		this.moveMatrix = new TestTarget();		
		this.host='http://localhost:8080/';
		this.client = new Client(this.host);		
		
	}
	newGame(){
		this.oldX=-1,
		this.oldY=-1,
		this.oldValue=0;
		this.timer; 
		this.clicked=false;
		this.move=1;
		this.userID=1;
		this.clicked=false;	
		this.finish=0;
	}
	
	async getClientUserID(){		
		this.move = Number(await this.client.getMove());		
		if(localStorage.getItem('chessUserID')!==null){
			this.userID= Number(localStorage.getItem('chessUserID'));			
			if(!this.moveMatrix.compareSigns(this.userID,this.move)){
				this.startTimer();
			}
		}else{			
			this.userID = Number(await this.client.getUserID(this.userID));
			if(this.userID!==0){
				localStorage.setItem('chessUserID',this.userID);
				if(this.userID<0){
					this.startTimer();						
				}
			}
		}	
	}
	async click(x,y){
		
		

		this.finish = Number(await this.client.getFinish());		
		if(this.finish!==0){
			alert('Оппонент завершил игру');
			this.endGame();					
			return;
		}
		let v= Number(this.moveMatrix.getValue(x,y));	
			if(this.clicked&&((this.oldX !== x)||(this.oldY !== y))){
				if(this.oldValue!==0){	
					this.moveMatrix.setMove(this.moveMatrix.oldX,this.moveMatrix.oldY,x,y);
					this.moveMatrix.setUserID(this.userID);					
					if(this.moveMatrix.go(x,y)){	

						// this.move=-this.userID;
						
						 this.drawMatrix.draw();	
						// if(this.userID<0){
						// 	this.moveMatrix.reverseMatrix();					
						// }				
						// this.client.setMatrix(this.getMatrix());
						// this.client.setMove(this.move);
						// this.clicked=false;
						// this.startTimer();
						console.log(this.moveMatrix.testTarget());
					}
				}					
			}
			if((this.moveMatrix.compareSigns(this.userID,v))&&(this.userID===this.move)&&(v!==0)){						
				this.oldValue=v;
				this.moveMatrix.oldX = x;
				this.moveMatrix.oldY = y;				
				this.clicked=true;
				this.drawMatrix.drawChecked(x,y);

			}		
	}


	// go(x,y){	
	// 	let v= Number(this.getValue());		
	// 	switch (Math.abs(v)){
	// 		case 1:{				
	// 			if(this.moveMatrix.testMovePawn()){
	// 				this.setValue(x,y,v);
	// 				this.setValue(this.oldX,this.oldY,0);					
	// 				return true;
	// 			}
	// 		return false;
	// 		}
	// 		case 2:{
	// 			if(this.moveMatrix.testMoveElephant()){
	// 				this.setValue(x,y,v);
	// 				this.setValue(this.oldX,this.oldY,0);
	// 				return true
	// 			}
	// 		return false;
			
	// 		}
	// 		case 3:{
	// 			if(this.moveMatrix.testMoveHorse()){
	// 				this.setValue(x,y,v);
	// 				this.setValue(this.oldX,this.oldY,0);
	// 				return true
	// 			}
	// 		return false;
	// 		}
	// 		case 4:{
	// 			if(this.moveMatrix.testMoveRook()){
	// 				this.setValue(x,y,v);
	// 				this.setValue(this.oldX,this.oldY,0);
	// 				return true
	// 			}
	// 		return false;
	// 		}
	// 		case 5:{
	// 			if(this.moveMatrix.testMoveQueen()){
	// 				this.setValue(x,y,v);
	// 				this.setValue(this.oldX,this.oldY,0);
	// 				return true
	// 			}
	// 		return false;
	// 		}
	// 		case 6:{
	// 			if(this.moveMatrix.testMoveKing()){
	// 				this.setValue(x,y,v);
	// 				this.setValue(this.oldX,this.oldY,0);
	// 				return true
	// 			}
	// 		return false;
	// 		}
	// 		default: return false;
	// 	}		
	// }
	


	setValue(x, y, value){
		this.moveMatrix.setValue(x, y, value);
		//this.drawMatrix.setValue(x, y, value);
	}
	getValue(){		
		return this.moveMatrix.getValue(this.oldX, this.oldY);
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
		   	this.move = Number(await this.client.getMove());
		   	this.finish = Number(await this.client.getFinish());		   
		  	if(this.move===this.userID){
		  		clearInterval(this.timer);
		  		const mtr = JSON.parse(await this.client.getMatrix());
				this.setMatrix(mtr);					
				if(this.userID<0){
					this.moveMatrix.reverseMatrix();					
				}
				this.drawMatrix.draw();		
		 	}		 	
		 	if(this.finish!==0){
		 		alert('Оппонент завершил игру');
		 		this.endGame();		 	
		 		clearInterval(this.timer);		 		
		 	}
		},
		1000); 	
	}

	reverseMatrix(){		
		 this.moveMatrix.reverseMatrix();
	}
	endGame(){		
		localStorage.removeItem('chessUserID');
		if(this.finish === 0){		
			this.client.setFinish(this.userID);		
		}else {
			this.client.setFinish(0);				
		}
		
		this.newGame();	
		clearInterval(this.timer);

	}
	setHost(host){
		this.host=host;
		this.client = new Client(this.host);
	}
	
}