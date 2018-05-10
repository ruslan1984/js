'use strict';
( ()=>{
	Node.prototype.chess= async function(desckWidth){
		const header = document.createElement('header');
		const headerText = document.createElement('h1');
		headerText.textContent="Шахматы";
		header.appendChild(headerText);
		const main = document.createElement('main');
		const footer = document.createElement('footer');
		this.appendChild(header);
		this.appendChild(main);
		this.appendChild(footer);
		if(localStorage.getItem('chessUserID')===null){
			const begin = document.createElement('button');
			begin.textContent='Начать игру';
			begin.classList.add('btn');
			main.appendChild(begin);
			begin.addEventListener('click',()=>{
				drawDesk(main);
				main.removeChild(begin);
			});
		}else{
			drawDesk(main);
		}

		function drawDesk(th){
			const cv = document.createElement('canvas');
			const cubWidth	= Number(desckWidth)/8;			
			cv.setAttribute('width',(desckWidth+15)+'px');
			cv.setAttribute('height',(desckWidth+15)+'px');
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
			
			th.appendChild(cv);	

			const end = document.createElement('button');
			end.textContent='Завершить игру';
			end.classList.add('btn');
			footer.appendChild(end);
			end.addEventListener('click',(e)=>{	
				matrix.endGame();
			});
			cv.addEventListener('click',(e)=>{	
				let x = Math.floor(e.offsetX/cubWidth);
				let y = Math.floor(e.offsetY/cubWidth);				
				matrix.click(x,y);				
			});
		}
	}
})();