import * as repo from '../repository.js';



export async function GET(request, {params}){
    try{
        const {id} = params;
        const user = await repo.readUser(id);
    
    if(user){
        return Response.json(user,{status:200});
    }else{
        return Response.json({message:"ID not found"},{status:404});
    }
    
    }
    catch(error){
        console.log(error.message);

        return Response.json({message: "Internal Server Error."},{status:500});
    }
}