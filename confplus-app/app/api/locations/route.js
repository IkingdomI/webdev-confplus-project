import * as repo from './repository.js'

export async function GET(request){
   
        try{
            const  locations= await repo.readLocations();
            return Response.json(locations,{status:200});
        }catch(error){
            console.log(error.message);
    
            return Response.json({message: "Internal Server Error."},{status:500});
        }
    
}