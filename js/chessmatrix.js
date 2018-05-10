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
		this.host='http://localhost:8080/';
		this.client = new Client(this.host);
	}
	
	async getClientUserID(){		
		this.move = Number(await this.client.getMove());
		if(localStorage.getItem('chessUserID')!==null){
			this.userID= Number(localStorage.getItem('chessUserID'));			
			if(!this.compareSigns(this.userID,this.move)){
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
	click(x,y){	
		let v= Number(this.moveMatrix.getValue(x,y));
		// let us=this.userID/Math.abs(this.userID);
		// let vs=v/Math.abs(v);	
			if(this.clicked){
				if(this.oldValue!==0){	
					this.moveMatrix.setMove(this.oldX,this.oldY,x,y);
					this.moveMatrix.setUserID(this.userID);
					if(this.go(x,y)){						class ChessMatrix{
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
		this.host='http://localhost:8080/';
		this.client = new Client(this.host);
	}
	
	async getClientUserID(){		
		this.move = Number(await this.client.getMove());
		if(localStorage.getItem('chessUserID')!==null){
			this.userID= Number(localStorage.getItem('chessUserID'));			
			if(!this.compareSigns(this.userID,this.move)){
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
	click(x,y){	
		let v= Number(this.moveMatrix.getValue(x,y));
		// let us=this.userID/Math.abs(this.userID);
		// let vs=v/Math.abs(v);	
			if(this.clicked){
				if(this.oldValue!==0){	
					this.moveMatrix.setMove(this.oldX,this.oldY,x,y);
					this.moveMatrix.setUserID(this.userID);
					if(this.go(x,y)){						
						this.move=-this.userID;
						this.drawMatrix.draw();	
						if(this.userID<0){
							this.moveMatrix.reverseMatrix();					
						}				
						this.client.setMatrix(this.getMatrix());
						this.client.setMove(this.move);
						this.clicked=false;
						this.startTimer();
					}
				}					
			}
			if((this.compareSigns(this.userID,v))&&(this.userID===this.move)&&(v!==0)){						
				this.oldValue=v;
				this.oldX = x;
				this.oldY = y;				
				this.clicked=true;				
			}		
	}
	go(x,y){
		let v= Number(this.getValue());		
		switch (Math.abs(v)){
			case 1:{				
				if(this.moveMatrix.testMovePawn()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);					
					return true;
				}
			return false;
			}
			case 2:{
				if(this.moveMatrix.testMoveElephant()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			
			}
			case 3:{
				if(this.moveMatrix.testMoveHorse()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 4:{
				if(this.moveMatrix.testMoveRook()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 5:{
				if(this.moveMatrix.testMoveQueen()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 6:{
				if(this.moveMatrix.testMoveKing()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			default: return false;
		}		
	}
	

	setValue(x, y, value){
		this.moveMatrix.setValue(x, y, value);
		this.drawMatrix.setValue(x, y, value);
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
		  	if(this.move===this.userID){
		  		clearInterval(this.timer);
		  		const mtr = JSON.parse(await this.client.getMatrix());
				this.setMatrix(mtr);					
				if(this.userID<0){
					this.moveMatrix.reverseMatrix();					
				}
				this.drawMatrix.draw();		
		 	}
		 	if(this.move===0){
		 		this.endGame();
		 		clearInterval(this.timer);
		 		alert('Ваш оппонент завершил');
		 	}
		},
		1000); 	
	}

	reverseMatrix(){		
		 this.moveMatrix.reverseMatrix();
	}
	endGame(){
		localStorage.removeItem('chessUserID');
		this.client.setMove(0);		
	}
	setHost(host){
		this.host=host;
		this.client = new Client(this.host);
	}
	compareSigns(a,b){
		let a1=a/Math.abs(a);
		let b1=b/Math.abs(b);	
		return (a1===b1);
	}
}
						this.move=-this.userID;
						this.drawMatrix.draw();	
						if(this.userID<0){
							this.moveMatrix.reverseMatrix();					
						}				
						this.client.setMatrix(this.getMatrix());
						this.client.setMove(this.move);
						this.clicked=false;
						this.startTimer();
					}
				}					
			}
			if((this.compareSigns(this.userID,v))&&(this.userID===this.move)&&(v!==0)){						
				this.oldValue=v;
				this.oldX = x;
				this.oldY = y;				
				this.clicked=true;				
			}		
	}
	go(x,y){
		let v= Number(this.getValue());		
		switch (Math.abs(v)){
			case 1:{				
				if(this.moveMatrix.testMovePawn()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);					
					return true;
				}
			return false;
			}
			case 2:{
				if(this.moveMatrix.testMoveElephant()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			
			}
			case 3:{
				if(this.moveMatrix.testMoveHorse()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 4:{
				if(this.moveMatrix.testMoveRook()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 5:{
				if(this.moveMatrix.testMoveQueen()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			case 6:{
				if(this.moveMatrix.testMoveKing()){
					this.setValue(x,y,v);
					this.setValue(this.oldX,this.oldY,0);
					return true
				}
			return false;
			}
			default: return false;
		}		
	}
	

	setValue(x, y, value){
		this.moveMatrix.setValue(x, y, value);
		this.drawMatrix.setValue(x, y, value);
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
			console.log('t');
		   	this.move = Number(await this.client.getMove());
		  	if(this.move===this.userID){
		  		clearInterval(this.timer);
		  		const mtr = JSON.parse(await this.client.getMatrix());
				this.setMatrix(mtr);					
				if(this.userID<0){
					this.moveMatrix.reverseMatrix();					
				}
				this.drawMatrix.draw();		
		 	}
		 	if(this.move===0){
		 		this.endGame();
		 		clearInterval(this.timer);
		 		alert('Ваш оппонент завершил');
		 	}
		},
		1000); 	
	}

	reverseMatrix(){		
		 this.moveMatrix.reverseMatrix();
	}
	endGame(){
		localStorage.removeItem('chessUserID');
		this.client.setMove(0);		
	}
	setHost(host){
		this.host=host;
		this.client = new Client(this.host);
	}
	compareSigns(a,b){
		let a1=a/Math.abs(a);
		let b1=b/Math.abs(b);	
		return (a1===b1);
	}
}