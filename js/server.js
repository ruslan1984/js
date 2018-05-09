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
let matrix = JSON.stringify(getNewMatrix());
let move=1;
let userID=1;
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



server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});

function getNewMatrix(){
	let matrix=[];		
	for(let i=0;i<8;i++){
			matrix[i]=new Array();
			for(let j=0;j<8;j++){				
				if(j===0){
					if((i===0)||(i===7)){
						matrix[i][j]=-4;							
					}else if((i===1)||(i===6)){
						matrix[i][j]=-3;						
					}else if((i===2)||(i===5)){
						matrix[i][j]=-2;	
					}else if(i===3){
						matrix[i][j]=-5;	
					}else if(i===4){
						matrix[i][j]=-6;	
					}
					continue;
				}else if(j===1){
					matrix[i][j]=-1;	
					continue;
				}else if(j===6){
					matrix[i][j]=1;	
					continue;
				}else if(j===7){
					if((i===0)||(i===7)){
						matrix[i][j]=4;							
					}else if((i===1)||(i===6)){
						matrix[i][j]=3;						
					}else if((i===2)||(i===5)){
						matrix[i][j]=2;	
					}else if(i===3){
						matrix[i][j]=5;	
					}else if(i===4){
						matrix[i][j]=6;	
					}
					continue;
				}
				matrix[i][j]=0;
			}
		}
	return matrix;
}