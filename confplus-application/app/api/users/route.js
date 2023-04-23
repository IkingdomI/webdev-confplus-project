import * as repo from './repository.js';



export async function GET(request ){
    try{
        const users = await repo.readUsers();
    
    if(users){
        return Response.json(users,{status:200});
    }else{
        return Response.json({message:"no users were found"},{status:404});
    }
    
    }
    catch(error){
        console.log(error.message);

        return Response.json({message: "Internal Server Error."},{status:500});
    }
}