class ChessMatrix extends TestTarget{
	constructor(ctx,cubWidth,img){	
		super();		
		this.newGame();
		this.drawMatrix = new DrawMatrix(ctx,cubWidth,img);		
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
		this.setUserID(1);
		//console.log(this.userID);
		this.clicked=false;	
		this.finish=0;
	}
	
	async getClientUserID(){		
		this.move = Number(await this.client.getMove());		
		if(localStorage.getItem('chessUserID')!==null){
			this.setUserID(Number(localStorage.getItem('chessUserID')));			
			if(!this.compareSigns(this.userID,this.move)){
				this.startTimer();
			}
		}else{			
			this.setUserID(Number(await this.client.getUserID(this.userID)));
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
			const v = Number(this.getValue(x,y));
			
			if(this.clicked&&((this.oldX !== x)||(this.oldY !== y))){

				if(this.oldValue!==0){

					this.setMove(this.oldX,this.oldY,x,y);
					this.setUserID(this.userID);					
					if(this.targetGo(x,y)){				
						 this.move=-this.userID;
						
						 this.drawMatrix.draw();	
						 if(this.userID<0){
						 	this.reverseMatrix();					
						 }				
						 this.client.setMatrix(this.getMatrix());
						 this.client.setMove(this.move);
						 this.clicked=false;
						 this.startTimer();
						//console.log(this.testTarget());
					}
				}					
			}
			if((this.compareSigns(this.userID,v))&&(this.userID===this.move)&&(v!==0)){					
				this.oldValue = v;
				this.oldX = x;
				this.oldY = y;				
				this.clicked=true;
				this.setFigure(v);
				this.drawMatrix.drawChecked(x,y);

			}		
	}


	setDrawValue(x, y, value){
		this.setValue(x, y, value);
		this.drawMatrix.setValue(x, y, value);
	}	
	setDrawMatrix(matrix){		
		this.drawMatrix.setMatrix(matrix);
		this.setMatrix(matrix);		
	}

	async getClientMatrix(){
		let mtr = JSON.parse(await this.client.getMatrix());			
		this.setDrawMatrix(mtr);
	}	

	startTimer(){
		this.timer= setInterval(async ()=>{
		   	this.move = Number(await this.client.getMove());
		   	this.finish = Number(await this.client.getFinish());		   
		  	if(this.move===this.userID){
		  		clearInterval(this.timer);
		  		const mtr = JSON.parse(await this.client.getMatrix());
				this.setDrawMatrix(mtr);					
				if(this.userID<0){
					this.reverseMatrix();					
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