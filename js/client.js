'use strict';
class Client{
	constructor(host){
		this.host=host;
	}
	async setMatrix (matrix){		
		fetch(this.host+'setmatrix',
		 	{
				method: "POST",
				body: JSON.stringify(matrix)
	      	})		  		  
		   .catch(()=>{
		  		console.log('Ошибка set');
			});
	}  

	async getMatrix(){	
		const response=await fetch(this.host+'getmatrix',
		 	{method: "POST",});
      	return response.json();
	}


	async setMove(move){		
		fetch(this.host+'setmove',
		 	{
				method: "POST",
				body: JSON.stringify(move)
	      	})		  		  
		   .catch(()=>{
		  		console.log('Ошибка setmove');
			});
	}  

	async setUserID(userID){		
		fetch(this.host+'setuserid',
		 	{
				method: "POST",
				body: JSON.stringify(userID)
	      	})		  		  
		   .catch(()=>{
		  		console.log('Ошибка setmove');
			});
	}  

	async getMove(){	
		const response=await fetch(this.host+'getmove',{method: "POST"});			
      	return response.json();		
	}	

	async setFinish(finish){		
		fetch(this.host+'setfinish',{
			method: "POST",
			body: JSON.stringify(finish)
		}).catch(()=>{
			console.log('Ошибка setmove');
		});
	}  

	async getFinish(){	
		const response=await fetch(this.host+'getfinish',{method: "POST"});			
      	return response.json();		
	}	


	async getUserID(userID){	
		const response=await fetch(this.host+'getuserid',{method: "POST",body: JSON.stringify(userID)});
		return response.json();
	}
}
