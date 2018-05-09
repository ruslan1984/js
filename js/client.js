'use strict';
class Client{
	// constructor(host){
	// }
	async setMatrix (matrix){		
		fetch('http://localhost:8080/setmatrix',
		 	{
				method: "POST",
				body: JSON.stringify(matrix)
	      	})		  		  
		   .catch(()=>{
		  		console.log('Ошибка set');
			});
	}  

	async getMatrix(){	
		const response=await fetch('http://localhost:8080/getmatrix',
		 	{method: "POST",});
		
			// response.json().then((data)=> {        		
   //      		matrix.setMatrix(JSON.parse(data));
			// 	//matrix.reverseMatrix();	
   //      		matrix.drawMatrix();        		
	  //     		}).catch(()=>{
	  //     			console.log('Ошибка get');
	  //     	});
      	return response.json();
	}


	async setMove(move){		
		fetch('http://localhost:8080/setmove',
		 	{
				method: "POST",
				body: JSON.stringify(move)
	      	})		  		  
		   .catch(()=>{
		  		console.log('Ошибка setmove');
			});
	}  

	async getMove(){	
		const response=await fetch('http://localhost:8080/getmove',{method: "POST"});			
      	return response.json();		
	}	

	async getUserID(userID){	
		const response=await fetch('http://localhost:8080/getuserid',{method: "POST",body: JSON.stringify(userID)});
		return response.json();
	}

}
