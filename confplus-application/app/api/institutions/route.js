import * as repo from './repository.js'

export async function GET(request){
    try{
        const institutions = await repo.readInstitutions();
        return Response.json(institutions,{status:200});
    }catch(error){
        console.log(error.message);

        return Response.json({message: "Internal Server Error."},{status:500});
    }
}