import * as repo from './repository.js'

export async function GET(request){
   
        try{
            const  dates= await repo.readDates();
            return Response.json(dates,{status:200});
        }catch(error){
            console.log(error.message);
    
            return Response.json({message: "Internal Server Error."},{status:500});
        }
    
}