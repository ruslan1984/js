const restify = require('restify');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.pre((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', '*');
    if (request.method !== 'OPTIONS') {
        return next();
    }
    response.send();
});
let matrix =  JSON.stringify(getNewMatrix());
let move=1;
let userID=1;
let finish=0;
server.post('/getmatrix', (request, response, next) => {       
    response.send(matrix);    
    next();    
});

server.post('/setmatrix', (request, response, next) => {
    matrix = request.body;
    response.send();    
    next(); 
});

server.post('/getmove', (request, response, next) => {   	 
    response.send(JSON.stringify(move));    
    next();   	
});

server.post('/setmove', (request, response, next) => {	
    move = Number(request.body);
    //if(move===0){
   		// 	move=1;
   		//	userID=1;
	//	matrix=JSON.stringify(getNewMatrix());
    //}
    response.send();
    next();     
});

server.post('/getuserid', (request, response, next) => { 	
	response.send(JSON.stringify(userID));
	if(userID>0){
		userID = -userID;
	}else{
		userID = 0;
	}       
    next();        
});

server.post('/setuserid', (request, response, next) => { 	
	userID = Number(request.body);
	response.send();	
    next();        
});

server.post('/getfinish', (request, response, next) => { 	
	response.send(JSON.stringify(finish));	
    next();        
});

server.post('/setfinish', (request, response, next) => { 		
	finish = Number(request.body);	
	if(finish===0){
		finish=0;
		userID=1;
		move=1;
		matrix=JSON.stringify(getNewMatrix());
	}	
	response.send();	
    next();        
});



server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});




function getNewMatrix(){
	let matrix=[];		
	// for(let i=0;i<8;i++){
	// 		matrix[i]=new Array();
	// 		for(let j=0;j<8;j++){				
	// 			if(j===0){
	// 				if((i===0)||(i===7)){
	// 					matrix[i][j]=-4;							
	// 				}else if((i===1)||(i===6)){
	// 					matrix[i][j]=-3;						
	// 				}else if((i===2)||(i===5)){
	// 					matrix[i][j]=-2;	
	// 				}else if(i===3){
	// 					matrix[i][j]=-5;	
	// 				}else if(i===4){
	// 					matrix[i][j]=-6;	
	// 				}
	// 				continue;
	// 			}else if(j===1){
	// 				matrix[i][j]=-1;	
	// 				continue;
	// 			}else if(j===6){
	// 				matrix[i][j]=1;	
	// 				continue;
	// 			}else if(j===7){
	// 				if((i===0)||(i===7)){
	// 					matrix[i][j]=4;							
	// 				}else if((i===1)||(i===6)){
	// 					matrix[i][j]=3;						
	// 				}else if((i===2)||(i===5)){
	// 					matrix[i][j]=2;	
	// 				}else if(i===3){
	// 					matrix[i][j]=5;	
	// 				}else if(i===4){
	// 					matrix[i][j]=6;	
	// 				}
	// 				continue;
	// 			}
	// 			matrix[i][j]=0;
	// 		}
	// 	}
	
for(let i=0;i<8;i++){
		matrix[i]=new Array();
		for(let j=0;j<8;j++){
			matrix[i][j]=0;
	}}	
		matrix[5][5]=-6;
		matrix[6][7]=1;	
		matrix[4][7]=1;	
		matrix[3][3]=6;	
		matrix[1][3]=2;
		matrix[5][4]=3;
		matrix[6][6]=4;
		matrix[1][1]=5;
	
		
	return matrix;
}