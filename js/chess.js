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
			const cv = document.createElement('canvas');
			const cubWidth	= Number(desckWidth)/8;			
			cv.setAttribute('width',(desckWidth+cubWidth/2)+'px');
			cv.setAttribute('height',(desckWidth+cubWidth/2)+'px');
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
			
				await matrix.drawMatrix.draw();
			}			
			
			th.appendChild(cv);	

			const end = document.createElement('button');
			end.textContent='Завершить игру';
			end.classList.add('btn');
			footer.appendChild(end);
			end.addEventListener('click',(e)=>{	
				main.removeChild(cv);
				footer.removeChild(end);
				main.appendChild(begin);
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
	}
})();