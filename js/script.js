'use strict';
( ()=>{

	
	Node.prototype.desck= async function(desckWidth){
		const cv = document.createElement('canvas');
		const cubWidth	= Number(desckWidth)/8;			
		cv.setAttribute('width',(desckWidth+10)+'px');
		cv.setAttribute('height',(desckWidth+10)+'px');
		const ctx = cv.getContext('2d');		
		const img = new Image();
		img.src="img/figures.png";
		const matrix=new ChessMatrix(ctx,cubWidth,img);
		matrix.getClientUserID();
		matrix.drawMatrix.drawBoard();	
		img.onload = async function() {				
			const client = new Client('http://localhost:8080/');
			const mtr = JSON.parse(await client.getMatrix());			
			matrix.setMatrix(mtr);
			if(matrix.userID<0){
				matrix.reverseMatrix();			
			}
			matrix.drawMatrix.draw();
		}			
		
		this.appendChild(cv);		
		cv.addEventListener('click',(e)=>{	
			let x = Math.floor(e.offsetX/cubWidth);
			let y = Math.floor(e.offsetY/cubWidth);		
			matrix.click(x,y);
			
		});

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