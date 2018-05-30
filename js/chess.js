'use strict';
( ()=>{
	Node.prototype.chess= async function(desckWidth){
		const header = document.createElement('header');
		const headerText = document.createElement('h1');
		headerText.textContent="Шахматы";
		header.appendChild(headerText);
		const main = document.createElement('main');
		const footer = document.createElement('footer');
		const begin = document.createElement('button');
		const cv = document.createElement('canvas');
		const end = document.createElement('button');
		begin.textContent='Начать игру';
		begin.classList.add('btn');
		this.appendChild(header);
		this.appendChild(main);
		this.appendChild(footer);		
		if(localStorage.getItem('chessUserID')===null){
			drawBegin();
		}else{
			drawDesk(main);
		}

		function drawBegin(){
			main.appendChild(begin);
			begin.addEventListener('click',()=>{				
				main.removeChild(begin);
				drawDesk(main);
			});
		}


		async function drawDesk(th){
			
			const cubWidth	= Number(desckWidth)/8;			
			cv.setAttribute('width',(desckWidth+cubWidth/2)+'px');
			cv.setAttribute('height',(desckWidth+cubWidth/2)+'px');
			const ctx = cv.getContext('2d');		
			const img = new Image();
			img.src="img/figures.png";
			const matrix=new ChessMatrix(ctx,cubWidth,img,endGame);
			matrix.getClientUserID().then(()=>{				
				matrix.drawMatrix.drawBoard(matrix.userID);		
			});
			img.onload = async function() {	
				const client = new Client('http://localhost:8080/');
				const mtr = JSON.parse(await client.getMatrix());			
				matrix.setDrawMatrix(mtr);
				if(matrix.userID<0){
					matrix.reverseMatrix();					
				}
				matrix.drawMatrix.draw(matrix.userID);
			}			
			
			th.appendChild(cv);	

			
			end.textContent='Завершить игру';
			end.classList.add('btn');
			footer.appendChild(end);
			end.addEventListener('click',(e)=>{	
				endGame();
				matrix.endGame();
			});
			cv.addEventListener('click',(e)=>{	
				let x = Math.floor(e.offsetX/cubWidth);
				let y = Math.floor(e.offsetY/cubWidth);
				if((x<8)&&(y<8)){
					matrix.click(x,y);
				}
				
			});
		}

		function endGame(){
			console.log(main);
			main.removeChild(cv);
			footer.removeChild(end);
			//main.appendChild(begin);
			main.innerHTML="Игра завершена";
			
		}

	}
})();