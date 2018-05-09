'use strict';
( ()=>{

	
	Node.prototype.desck= async function(w){
		let oldX=-1,
			oldY=-1,
			oldValue=0;
		let timer; 
		let clicked=false;

		//const client = new Client('http://localhost:8080/');
		const cv = document.createElement('canvas');
		const cubWidth	= Number(w)/8;			
		cv.setAttribute('width',(w+10)+'px');
		cv.setAttribute('height',(w+10)+'px');
		const ctx = cv.getContext('2d');		
		const img = new Image();

		img.src="img/figures.png";
				
		const matrix=new ChessMatrix(ctx,cubWidth,img);		

		// let move   = 1;
		// let userID = 1;

		//console.log(localStorage.getItem('chessUserID'));
		// if(	localStorage.getItem('chessUserID')!==null){
		// 	userID= Number(localStorage.getItem('chessUserID'));
		// 	if(userID<0){
		// 		startTimer();						
		// 	}					
		// }else{
		// 	console.log(userID);
		// 	userID = Number(await client.getUserID(userID));
		// 	if(userID!==0){
		// 		localStorage.setItem('chessUserID',userID)
		// 		if(userID<0){
		// 			startTimer();						
		// 		}
		// 	}else{
		// 		alert('Сессия занята');
		// 	}
		// }
		matrix.setUserID();
		matrix.drawMatrix.drawBoard();	
		img.onload = async function() {				
			//const mtr = JSON.parse(await client.getMatrix());			
			//matrix.setMatrix(mtr);
			matrix.drawMatrix.draw();

			// if(matrix.userID<0){
			// 	matrix.drawMatrix.reverseMatrix();
			// }
			
		}
		
		this.appendChild(cv);		
		cv.addEventListener('click',(e)=>{	
			let x = Math.floor(e.offsetX/cubWidth);
			let y = Math.floor(e.offsetY/cubWidth);		
			matrix.click(x,y);
			// let x = Math.floor(e.offsetX/cubWidth);
			// let y = Math.floor(e.offsetY/cubWidth);
			// let v= Number(matrix.moveMatrix.getValue(x,y));
			// let us=matrix.userID/Math.abs(matrix.userID);
			// let vs=v/Math.abs(v);	
			// if(clicked){
			// 	if(oldValue!==0){
					
			// 		//console.log(matrix.testMovePawn(oldX,oldY,x,y,userID));
			// 		console.log(oldX,oldY,x,y);					
			// 		matrix.moveMatrix.setValue(x,y,oldValue);
			// 		matrix.moveMatrix.setValue(oldX,oldY,0);
			// 		matrix.move=-matrix.userID;
			// 		matrix.drawMatrix.draw();
			// 		if(userID<0){
			// 			matrix.moveMatrix.reverseMatrix();
			// 		}
			// 		client.setMatrix(matrix.getMatrix());
			// 		client.setMove(matrix.move);
			// 		clicked=false;
			// 		matrix.startTimer();						
			// 	}					
			// }
			// if((us===vs)&&(matrix.userID===matrix.move)&&(v!==0)){						
			// 	oldValue=v;
			// 	oldX = x;
			// 	oldY = y;
			// 	//console.log(oldX,oldY);
			// 	clicked=true;				
			// }		
		});	

		// function startTimer(){
		// 	timer=setInterval(async function(){
		// 	  	move = Number(await client.getMove());			  		  	
		// 	  	if(move===userID){
		// 	  		clearInterval(timer);
		// 	  		const mtr = JSON.parse(await client.getMatrix());
		// 			matrix.setMatrix(mtr);					
		// 			if(userID<0){
		// 				matrix.moveMatrix.reverseMatrix();
		// 			}
		// 			matrix.drawMatrix.draw();		
		// 	  	}
				  
		// 	},
		// 	1000); 	
		// }



	const stop=document.querySelector('.stop');
	stop.addEventListener('click',()=>{
		clearInterval(timer);
	});

	const get=document.querySelector('.get');
	get.addEventListener('click',async ()=>{
		const response1 = await getMove();		
		response1.json().then(
		 	(data)=>{
		 		move=Number(data);		
			 	
		});			
	});

	const start = document.querySelector('.start');

	start.addEventListener('click',()=>{		
		timer = setInterval(async function(){
			 const response1 = await getMove();
			 response1.json().then(
			 	(data)=>{
			 		move=Number(data);
			 		if(move===userID){

			 		}			 		
			 	});
			},
			1000);
		});

	}
	

	const d=document.querySelector('#desck');

	d.desck(200);	
	


	/*
	 ч 
	 	0,0, 80,90 		слон
	 	185,0,80,90		ладья
	  	90,0,80,90		конь
	  	365,0,80,90		кароль
	  	274,0,80,90		ферзь	
	  	440,0,100,95	пешка

	 б
	  	0,90, 85,90 		слон
	 	185,90,80,90		ладья
	  	90,90,80,90		конь
	  	365,90,80,90		кароль
	  	274,90,80,90		ферзь	
	  	443,90,100,95	пешка
	
	*/



})();